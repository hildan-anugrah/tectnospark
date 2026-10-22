import { toPng } from 'html-to-image';
import html2canvas from 'html2canvas';
import PptxGenJS from 'pptxgenjs';
import enTranslation from '../../assets/locales/en.json';

/**
 * 100% Pixel-Perfect PPTX Generator using DOM & CSS Capture.
 * Uses native browser SVG foreignObject rasterization (html-to-image) for 100% pixel-perfect text placement,
 * with fallback to html2canvas.
 * Always exports in English with Speaker Notes attached.
 */
async function captureSlideImage(slideEl) {
  try {
    // 1. Try html-to-image first (native browser rasterizer, zero font/text shifting)
    const dataUrl = await toPng(slideEl, {
      width: 1440,
      height: 810,
      pixelRatio: 2,
      backgroundColor: '#ffffff',
      cacheBust: true
    });
    return dataUrl;
  } catch (err) {
    console.warn('html-to-image fallback to html2canvas:', err);
    // 2. Fallback to html2canvas
    const canvas = await html2canvas(slideEl, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      logging: false,
      width: 1440,
      height: 810,
      windowWidth: 1440,
      windowHeight: 810,
      x: 0,
      y: 0,
      scrollX: 0,
      scrollY: 0
    });
    return canvas.toDataURL('image/png');
  }
}

export async function exportToPptx(setExportingProgress) {
  try {
    // 1. Ensure all custom fonts and font-metrics are fully loaded before capture
    if (document.fonts && document.fonts.ready) {
      if (setExportingProgress) setExportingProgress('Preparing typography & graphics...');
      await document.fonts.ready;
    }

    const pptx = new PptxGenJS();
    pptx.defineLayout({ name: 'HORIZON_WIDE_16_9', width: 13.333, height: 7.5 });
    pptx.layout = 'HORIZON_WIDE_16_9';

    // Find export container
    const exportContainer = document.getElementById('export-stage-container');
    if (!exportContainer) {
      throw new Error('Export container not found in DOM');
    }

    // Get all 9 export slide stages
    const slideElements = exportContainer.querySelectorAll('.export-slide-panel');
    const totalSlides = slideElements.length;

    for (let i = 0; i < totalSlides; i++) {
      const slideNum = i + 1;
      if (setExportingProgress) {
        setExportingProgress(`Rendering Slide ${slideNum} of ${totalSlides}...`);
      }

      const slideEl = slideElements[i];

      // Temporarily display flex for capture
      slideEl.style.display = 'flex';

      // Force layout reflow so dimensions & fonts are computed
      void slideEl.offsetWidth;
      await new Promise((resolve) => setTimeout(resolve, 60));

      const imgData = await captureSlideImage(slideEl);

      slideEl.style.display = 'none';

      // Add to PowerPoint
      const pptxSlide = pptx.addSlide();
      pptxSlide.background = { fill: 'FFFFFF' };

      // Full-bleed 16:9 widescreen placement
      pptxSlide.addImage({
        data: imgData,
        x: 0,
        y: 0,
        w: 13.333,
        h: 7.5
      });

      // Attach English Speaker Notes
      const speakerNotes = enTranslation.speakerScripts?.[`slide${slideNum}`]?.text || '';
      if (speakerNotes) {
        pptxSlide.addNotes(speakerNotes);
      }
    }

    if (setExportingProgress) {
      setExportingProgress('Saving PowerPoint Presentation...');
    }

    const fileName = 'HorizonU_Uniform_SCM_Presentation_Technospark.pptx';
    await pptx.writeFile({ fileName });

    return true;
  } catch (error) {
    console.error('Failed to export PPTX:', error);
    throw error;
  }
}
