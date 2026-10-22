import html2canvas from 'html2canvas';
import PptxGenJS from 'pptxgenjs';
import enTranslation from '../../assets/locales/en.json';

/**
 * 100% Pixel-Perfect PPTX Generator using DOM & CSS Capture
 * Captures each slide's exact CSS, fonts, line widths, borders, and Neo-Brutalist shadows.
 * Always exports in English with Speaker Notes attached.
 */
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

      // Capture DOM with exact CSS styling at Retina 2x scale
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

      slideEl.style.display = 'none';

      const imgData = canvas.toDataURL('image/png');

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
