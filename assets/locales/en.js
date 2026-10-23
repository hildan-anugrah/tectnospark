window.I18N_EN_DATA = {
  "common": {
    "docTitle": "HorizonU Uniform — Technospark Presentation",
    "technosparkBadge": "Technospark 2026",
    "appTitle": "HorizonU Uniform",
    "appSubtitle": "Finance Department of Horizon University Indonesia",
    "prev": "Previous",
    "next": "Next",
    "prompter": "Script (T)",
    "downloadPptx": "Download PPTX",
    "fullscreen": "Fullscreen (F)",
    "prompterHeader": "Presenter Speech Script (Teleprompter Mode) — Read Directly Here",
    "targetDurationLabel": "Target Duration:"
  },
  "slide1": {
    "headerDept": "Finance Department • Horizon University Indonesia",
    "eyebrow": "Integrated Campus Logistics Supply Chain Solution",
    "title": "HORIZONU <span class=\"text-horizon-700 underline decoration-4 underline-offset-4\">UNIFORM</span>",
    "titlePrefix": "HORIZONU ",
    "titleAccent": "UNIFORM",
    "desc": "Digital transformation of student uniform operations: Connecting Upstream (Apparel Vendor), Campus Warehouse, and Finance to Downstream (Students) powered by precision data and FIFO inventory rules.",
    "box1": {
      "title": "Logistics Commodity & Scope",
      "desc": "Annual procurement and distribution of thousands of freshman packages: <strong>Alma Mater Blazers, Formal Trousers/Skirts, Lab & Clinical Shoes</strong>, and <strong>Medical Kits</strong> without commercial retail intermediaries."
    },
    "box2": {
      "title": "Core Operational Challenges",
      "desc": "<strong>4.5 MB master Excel spreadsheet prone to crashing</strong> during peak enrollment, queue times reaching <strong>15–20 minutes per student</strong>, and heuristic order ratios triggering massive <strong>dead-stock</strong> and trapped campus capital."
    }
  },
  "slide2": {
    "badge": "Development Team Profile",
    "title": "Our Team • Nirwana Development Team",
    "subtitle": "Cross-disciplinary collaboration across system architecture, software engineering, and platform governance",
    "badgeCount": "6 Core Engineers",
    "members": {
      "ferry": {
        "name": "Ferry Noer Hendriawan",
        "role": "Frontend Developer"
      },
      "fhazar": {
        "name": "Fhazar Raffiful Aqyla",
        "role": "Project Manager"
      },
      "hildan": {
        "name": "Hildan Anugrah Tamadi Putra",
        "role": "Backend Developer"
      },
      "fadel": {
        "name": "Fadel Rahmadhan",
        "role": "Quality Assurance"
      },
      "daffa": {
        "name": "Daffa Nazriel Zaidan",
        "role": "UI/UX Designer"
      },
      "acep": {
        "name": "Acep Ugan Saputra",
        "role": "System Analyst"
      }
    }
  },
  "slide3": {
    "badge": "Supply Chain Structure",
    "title": "Stakeholder Mapping & Physical Cargo Flow",
    "subtitle": "Integrated physical flow from garment vendor to student handoff under the 'Data Locks Physical Asset' doctrine",
    "col1": {
      "step": "01 • Supplier (Upstream)",
      "title": "Garment & Shoe Factories",
      "p1": "Produces uniform and footwear packages based on aggregate purchase orders (PO).",
      "p2": "Enforces standardized SKU variant codes per category and size.",
      "p3": "<strong>Cargo Point:</strong> Inbound container shipments delivered to campus warehouse (Inbound Logistics).",
      "flow": "Flow: Aggregate PO ➔ Inbound Freight"
    },
    "col2": {
      "step": "02 • Warehouse (Inbound)",
      "title": "Campus Logistics Warehouse",
      "p1": "Physical cargo receiving (StockReceive) and quality control (QC).",
      "p2": "Strict FIFO (First-In, First-Out) batch recording and landed unit cost assignment.",
      "p3": "<strong>Cargo Point:</strong> Outbound transfer of oldest batches to distribution booths.",
      "flow": "Flow: Inbound ➔ POS Distribution Booths"
    },
    "col3": {
      "step": "03 • Verifiers & Booths",
      "title": "Finance & On-Site Booth Staff",
      "p1": "<strong>Finance:</strong> Authorizes student tuition payment status (Eligibility verification).",
      "p2": "<strong>Booth Staff:</strong> Serves physical garment distribution at campus pickup booths.",
      "p3": "<strong>Critical Point:</strong> QR Code identity scanning and size fitting validation.",
      "flow": "Flow: Paid Status ➔ Physical Handover"
    },
    "col4": {
      "step": "04 • Consumer (Downstream)",
      "title": "Freshman Students (Customers)",
      "p1": "End consumers with official package entitlements per study program.",
      "p2": "Submits body size profiles via student portal and receives assigned schedule tickets.",
      "p3": "<strong>Info Point:</strong> Presents high-resolution QR Code ticket (student ID) at pickup booth.",
      "flow": "Flow: Size Profile ➔ Tailored Uniform Package"
    }
  },
  "slide4": {
    "badge": "Legacy System Problem Analysis",
    "title": "Operational Bottlenecks & Systemic Impact Evaluation",
    "subtitle": "Comprehensive root cause analysis of manual spreadsheets causing cost overruns, delays, and service degradation",
    "thProblem": "Primary Problem (Field Symptom)",
    "thCause": "Root Cause",
    "thImpact": "Impact on Cost, Time, Inventory & Service",
    "row1": {
      "problem": "1. Size Mismatches & Dead-Stock Accumulation",
      "cause": "Factory procurement orders were based purely on historical heuristic ratios. No pre-enrollment self-service size survey existed prior to vendor contract tenders.",
      "impact": "<strong>Inventory & Cost Impact:</strong> Popular sizes (M/L) depleted on day one, while extreme sizes (XS, 3XL) gathered dust for years. University working capital locked in dead-stock."
    },
    "row2": {
      "problem": "2. Excel Crashes & Delayed Schedule Broadcasts",
      "cause": "Finance managed a massive spreadsheet file (~4.5 MB, 19 sheets) for thousands of students. Pickup appointment slots were distributed via manual email blasts.",
      "impact": "<strong>Time & Service Impact:</strong> Constant software freezes and data corruption risks. Data reconciliation consumed weeks and distribution schedules reached students late."
    },
    "row3": {
      "problem": "3. Booth Queue Bottlenecks & Double-Claim Exposure",
      "cause": "Tuition clearance verification, academic entitlement matching, and physical handover confirmations were handled manually by paper checklist tick marks.",
      "impact": "<strong>Time & Accuracy Impact:</strong> Service times lagged at 15–20 minutes per student with hundred-meter queues, leaving high exposure to duplicate claims across different booths or days."
    },
    "row4": {
      "problem": "4. Shrinkage & Opaque COGS / FIFO Valuation",
      "cause": "Uniform receipts from vendors with fluctuating prices were not tracked via FIFO queues or automated ledger entries tied to booth POS handovers.",
      "impact": "<strong>Cost & Audit Impact:</strong> Unaccounted inventory shrinkage without audit trails. Real-time Cost of Goods Sold (COGS) and Gross Profit Margin (GPM) calculations were severely distorted."
    }
  },
  "slide5": {
    "badge": "Information Flow Analysis",
    "title": "Data Bottlenecks & Information Silos (As-Is State)",
    "subtitle": "Inter-departmental communication barriers triggering service delays, data inconsistencies, and transaction friction",
    "card1": {
      "flow": "Flow 01 • Student ➔ University",
      "title": "Requirement: Size Profiles & Schedules",
      "p1": "<strong>Source & Target:</strong> Students submit data to campus; receive schedule via email.",
      "p2": "<strong>Pain Point:</strong> Disconnected Google Forms without standardized SKU validation, resulting in duplicate entries and manual staff consolidation delays of 2–3 weeks.",
      "status": "Status: Delayed Information & Unstandardized Format"
    },
    "card2": {
      "flow": "Flow 02 • Finance ➔ Day-Of Distribution",
      "title": "Requirement: Tuition Paid Status (Eligibility)",
      "p1": "<strong>Source & Target:</strong> Finance exports paid clearance status to booth staff.",
      "p2": "<strong>Pain Point:</strong> Static local Excel exports. Day-of bank clearing updates fail to reach booth stations in real time, causing paid students to be wrongly turned away.",
      "status": "Status: Severed Communication (Local Data Silos)"
    },
    "card3": {
      "flow": "Flow 03 • Booth Desk ➔ Warehouse",
      "title": "Requirement: Package Entitlement & Stock Ledger",
      "p1": "<strong>Source & Target:</strong> Booth staff verifies entitlements and logs item release.",
      "p2": "<strong>Pain Point:</strong> Physical logbooks tallying handovers. Warehouse stock balances were only reconciled at night, leaving large gaps for shrinkage and stock discrepancies.",
      "status": "Status: Lagging Records (Paper-Based Handover)"
    },
    "card4": {
      "flow": "Flow 04 • Procurement ➔ Factory",
      "title": "Requirement: Aggregate Purchase Orders (PO)",
      "p1": "<strong>Source & Target:</strong> Procurement dispatches garment production quantities to vendor.",
      "p2": "<strong>Pain Point:</strong> Purchase orders drafted from crude estimates rather than validated student anthropometric demand, triggering multi-month return-exchange lead times.",
      "status": "Status: Inaccurate Data (Blind Ordering)"
    }
  },
  "slide6": {
    "badge": "Integrated System Recommendation",
    "title": "Information System Architecture Selection (HorizonU Uniform Engine)",
    "subtitle": "Unified convergence of four enterprise pillars: ERP, SCM, POS, and WMS in a modern web platform",
    "thProblem": "Problem Addressed",
    "thSystem": "Recommended System & Module",
    "thFunc": "System Function in Case Study",
    "thBenefit": "Measurable Value Delivered",
    "row1": {
      "problem": "Excel Crashes & Fragmented Student Records",
      "system": "ERP Master & Entitlement Engine",
      "tech": "Database MySQL InnoDB",
      "func": "Governs student master data, 4-segment base SKU hierarchy, bulk excel imports via background jobs, and automated academic entitlement matrix per program.",
      "benefit": "<strong>100% Crash-Free:</strong> Full ACID transaction integrity with unified single source of truth."
    },
    "row2": {
      "problem": "Dead-Stock & Delayed Schedule Broadcasts",
      "system": "SCM Demand Planning Portal",
      "tech": "Size Event & Announcement Hub",
      "func": "Opens pre-enrollment self-service size selection windows (SizeChangeEvent), program-filtered slot broadcasts, and automated Demand vs. Shortage calculus for procurement tenders.",
      "benefit": "<strong>Zero Dead-Stock:</strong> Factory purchase orders match 100% of verified student physical measurements."
    },
    "row3": {
      "problem": "Queue Congestion & Double-Claim Risk",
      "system": "POS QR Verification Engine",
      "tech": "BaconQrCode & HTML5 Scanner",
      "func": "Issues tamper-proof Level-H QR code passes and executes 6-tier atomic validation on scanner read (Payment, Time Slot, Program, Gender, Entitlement Balance, Rack Stock).",
      "benefit": "<strong>Service Time < 30s:</strong> Instant validation with zero duplicate claim vulnerability."
    },
    "row4": {
      "problem": "Warehouse Shrinkage & Opaque COGS Valuation",
      "system": "WMS & FIFO Costing Engine",
      "tech": "StockBatch & Movement Ledger",
      "func": "Tracks oldest vendor intake batches (FIFO), ledger-backed stock deductions, physical Stock Opname variance audits, and real-time gross margin profit analytics.",
      "benefit": "<strong>Real-Time FIFO Valuation:</strong> Transparent audit trails and elimination of physical discrepancies."
    }
  },
  "slide7": {
    "badge": "Proposed Solution Design",
    "title": "4-Phase Closed-Loop Supply Chain Architecture",
    "subtitle": "End-to-end system connectivity, atomic transaction processing, and closed-loop data feedback",
    "phase1": {
      "step": "Phase 1 • Upstream (Inbound)",
      "title": "Inbound & FIFO Batch Registry",
      "p1": "• Logs bulk cargo shipments from apparel suppliers via StockReceive module.",
      "p2": "• Assigns sequential FIFO batch tracking IDs (First-In, First-Out sequence).",
      "p3": "• Automatically posts inventory journal inflows (StockMovement IN) and fixes batch cost basis.",
      "output": "Output: Tracked FIFO Batch Inflow"
    },
    "phase2": {
      "step": "Phase 2 • Demand (Planning)",
      "title": "Eligibility Clearance & Size Profiling",
      "p1": "• Finance authorizes enrolled students in EligibilityRecord table.",
      "p2": "• Freshmen log in to self-submit body size measurements through student portal.",
      "p3": "• System aggregates Demand vs. Shortage analytics to drive supplier procurement contracts.",
      "output": "Output: Active QR Pass & Assigned Time Slot"
    },
    "phase3": {
      "step": "Phase 3 • Downstream (Outbound)",
      "title": "POS QR & 6-Tier Atomic Validation",
      "p1": "• Booth staff scans student QR code using webcam-based scanner client.",
      "p2": "• Executes 6-tier atomic validation under pessimistic database row locking (lockForUpdate).",
      "p3": "• Automatically depletes oldest FIFO batches (deductStockFifo) and prints handover receipt.",
      "output": "Output: Verified Size-Matched Handover"
    },
    "phase4": {
      "step": "Phase 4 • Control (Audit)",
      "title": "Stock Opname & Closed-Loop Feedback",
      "p1": "• Periodic physical stock audit with automated discrepancy variance calculation.",
      "p2": "• Generates shrinkage/surplus adjustment journal vouchers instantly.",
      "p3": "• Produces executive Gross Profit Margin (GPM) dashboards and dead-stock alerts for management.",
      "output": "Output: Continuous Closed-Loop Feedback"
    }
  },
  "slide8": {
    "badge": "Deployment Plan & Risk Governance",
    "title": "Implementation Priorities & Field Risk Mitigation",
    "subtitle": "Operational readiness roadmap alongside battle-tested contingency protocols for distribution day",
    "priorities": {
      "badge": "3 Implementation Priorities",
      "title": "System Readiness Roadmap",
      "p1": "• <strong>Priority 1 (Master Data):</strong> Cleanse legacy records, deploy 5-segment SKU schema, import student cohorts, and configure program entitlement rules.",
      "p2": "• <strong>Priority 2 (Portal Integration):</strong> Bridge live tuition clearance feeds (Eligibility), open student body size profiling window, and broadcast distribution schedules.",
      "p3": "• <strong>Priority 3 (Human Readiness):</strong> Conduct operational drills for booth staff on webcam scanners, size exchange SOPs, and offline fallback procedures.",
      "roadmap": "Roadmap: 6-Week Turnkey Deployment"
    },
    "risks": {
      "badge": "3 Field Risks & Contingency SOPs",
      "title": "Booth Operational Protocols",
      "r1Title": "RISK 1: Dead Student Phone Battery / Damaged QR",
      "r1Mitigation": "<em>HorizonU Uniform Mitigation:</em> Scanner client features instant fallback manual search by Student ID or Full Name, loading entitlement profiles immediately.",
      "r2Title": "RISK 2: Rack Size Exhaustion / On-Site Fit Mismatch",
      "r2Mitigation": "<em>HorizonU Uniform Mitigation:</em> Partial Pickup feature dispenses available items (retaining remaining balance) and logs exchange requests in <code>student_size_histories</code>.",
      "r3Title": "RISK 3: Network Latency / Rapid Double Clicking",
      "r3Mitigation": "<em>HorizonU Uniform Mitigation:</em> Transactions guarded by database Pessimistic Row Locking (<code>lockForUpdate</code>) and idempotency keys, guaranteeing zero duplicate deductions.",
      "tolerance": "Fault Tolerance: High Operational Resilience",
      "item1": "• <strong>RISK 1: Dead Student Phone Battery / Damaged QR</strong><br><span class=\"text-slate-600\"><em>HorizonU Uniform Mitigation:</em> Scanner client features instant fallback manual search by Student ID or Full Name, loading entitlement profiles immediately.</span>",
      "item2": "• <strong>RISK 2: Rack Size Exhaustion / On-Site Fit Mismatch</strong><br><span class=\"text-slate-600\"><em>HorizonU Uniform Mitigation:</em> Partial Pickup feature dispenses available items (retaining remaining balance) and logs exchange requests in <code>student_size_histories</code>.</span>",
      "item3": "• <strong>RISK 3: Network Latency / Rapid Double Clicking</strong><br><span class=\"text-slate-600\"><em>HorizonU Uniform Mitigation:</em> Transactions guarded by database Pessimistic Row Locking (<code>lockForUpdate</code>) and idempotency keys, guaranteeing zero duplicate deductions.</span>"
    }
  },
  "slide9": {
    "badge": "Conclusion & Measured Impact",
    "title": "Strategic Outcomes & Measurable Business Value",
    "subtitle": "Operational transformation of Horizon University Indonesia Finance Department post-digitalization",
    "m1": {
      "badge": "VALUE 01 • SERVICE EFFICIENCY",
      "value": "< 30s",
      "title": "Service Time per Student",
      "p1": "• Slashed booth turnaround time from 15–20 minutes down to under 30 seconds per student.",
      "p2": "• Instant QR scanning combined with automated 6-tier validation checks.",
      "p3": "• Completely eradicated chaotic, overcrowded campus queues during orientation week.",
      "impact": "Impact: Fast & Comfortable Student Service"
    },
    "m2": {
      "badge": "VALUE 02 • INVENTORY ACCURACY",
      "value": "0",
      "title": "Dead-Stock Accumulation",
      "p1": "• Pre-enrollment size profiling prior to supplier manufacturing tenders.",
      "p2": "• Automated Demand vs. Shortage calculations align factory orders 100% with real student body sizes.",
      "p3": "• Eliminated stagnant piles of obsolete extreme sizes tying up warehouse space.",
      "impact": "Impact: Campus Working Capital Optimization"
    },
    "m3": {
      "badge": "VALUE 03 • FINANCIAL AUDITABILITY",
      "value": "100%",
      "title": "Real-Time FIFO Valuation",
      "p1": "• Eliminated fragile, crash-prone Excel master spreadsheets permanently.",
      "p2": "• Every single inventory movement automatically posted to FIFO batch ledgers.",
      "p3": "• Real-time Cost of Goods Sold (COGS) and Gross Profit Margin (GPM) dashboards for university leadership.",
      "impact": "Impact: Discrepancy-Free Financial Audit Trail"
    }
  },
  "speakerScripts": {
    "slide1": {
      "targetTime": "00:40 Mins",
      "html": "<p class=\"mb-2\"><span class=\"bg-horizon-700/40 text-red-200 border border-red-400 text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded mr-1.5\">OPENING</span>\"Good morning/afternoon, distinguished judges and audience. We are <strong>Team Nirwana</strong>, proud to present: <strong>HorizonU Uniform</strong> — an integrated supply chain solution for student apparel at Horizon University Indonesia.\"</p><p class=\"mb-2\"><span class=\"bg-horizon-700/40 text-red-200 border border-red-400 text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded mr-1.5\">THE PROBLEM</span>\"Every year, thousands of incoming freshmen require uniform packages. Yet legacy reliance on a 4.5 MB master Excel sheet caused severe crashes, 20-minute student queues, and costly dead-stock inventory.\"</p><p><span class=\"bg-horizon-700/40 text-red-200 border border-red-400 text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded mr-1.5\">THE SOLUTION</span>\"HorizonU Uniform transforms this operational bottleneck into an agile, FIFO-driven digital ecosystem. Let us introduce the team behind this innovation.\"</p>",
      "text": "PRESENTER SCRIPT SLIDE 1 (Target: 00:40 Mins):\n\"Good morning/afternoon, distinguished judges and audience. We are Team Nirwana, proud to present: HorizonU Uniform — an integrated supply chain solution for student apparel at Horizon University Indonesia.\n\nEvery year, thousands of incoming freshmen require uniform packages. Yet legacy reliance on a 4.5 MB master Excel sheet caused severe crashes, 20-minute student queues, and costly dead-stock inventory.\n\nHorizonU Uniform transforms this operational bottleneck into an agile, FIFO-driven digital ecosystem. Let us introduce the team behind this innovation.\" "
    },
    "slide2": {
      "targetTime": "00:30 Mins",
      "html": "<p class=\"mb-2\"><span class=\"bg-horizon-700/40 text-red-200 border border-red-400 text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded mr-1.5\">TEAM ROLES</span>\"This innovation is powered by Team Nirwana's multidisciplinary strengths across 6 core pillars: Project Management, System Architecture, UI/UX Research, Backend Engineering, Reactive Frontend, and QA.\"</p><p><span class=\"bg-horizon-700/40 text-red-200 border border-red-400 text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded mr-1.5\">COMMITMENT</span>\"Our technical rigor combined with deep campus operations insight guarantees turnkey implementation from vendor to student.\"</p>",
      "text": "PRESENTER SCRIPT SLIDE 2 (Target: 00:30 Mins):\n\"This innovation is powered by Team Nirwana's multidisciplinary strengths across 6 core pillars: Project Management, System Architecture, UI/UX Research, Backend Engineering, Reactive Frontend, and QA.\n\nOur technical rigor combined with deep campus operations insight guarantees turnkey implementation from vendor to student.\" "
    },
    "slide3": {
      "targetTime": "00:40 Mins",
      "html": "<p class=\"mb-2\"><span class=\"bg-horizon-700/40 text-red-200 border border-red-400 text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded mr-1.5\">4 CORE ENTITIES</span>\"HorizonU Uniform's supply chain seamlessly connects four key entities: <strong>Apparel Vendors</strong> upstream, <strong>Campus Warehouse</strong>, <strong>Finance Department</strong>, and <strong>Students</strong> downstream.\"</p><p><span class=\"bg-horizon-700/40 text-red-200 border border-red-400 text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded mr-1.5\">CORE DOCTRINE</span>\"We enforce the doctrine of <em>'Data Locks Physical'</em>. No physical item moves without prior digital validation under strict FIFO principles, eradicating unaccounted stock leakage.\"</p>",
      "text": "PRESENTER SCRIPT SLIDE 3 (Target: 00:40 Mins):\n\"HorizonU Uniform's supply chain seamlessly connects four key entities: Apparel Vendors upstream, Campus Warehouse, Finance Department, and Students downstream.\n\nWe enforce the doctrine of 'Data Locks Physical'. No physical item moves without prior digital validation under strict FIFO principles, eradicating unaccounted stock leakage.\" "
    },
    "slide4": {
      "targetTime": "00:45 Mins",
      "html": "<p class=\"mb-2\"><span class=\"bg-horizon-700/40 text-red-200 border border-red-400 text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded mr-1.5\">ROOT CAUSES</span>\"Our operational diagnosis uncovered four critical systemic failures in the legacy setup:\"</p><p class=\"mb-1\"><strong>1. Single Point of Failure:</strong> 4.5 MB master Excel sheet prone to corruption under multi-user load.</p><p class=\"mb-1\"><strong>2. Queue Bottlenecks:</strong> 15–20 minutes waiting time per student during enrollment peaks.</p><p class=\"mb-1\"><strong>3. Trapped Capital:</strong> Heuristic size ordering triggering severe dead-stock and shortages.</p><p><strong>4. Double-Claim Risks:</strong> Lack of barcode tracking exposing inventory to duplicate distribution.\"</p>",
      "text": "PRESENTER SCRIPT SLIDE 4 (Target: 00:45 Mins):\n\"Our operational diagnosis uncovered four critical systemic failures in the legacy setup:\n1. Single Point of Failure: 4.5 MB master Excel sheet prone to corruption under multi-user load.\n2. Queue Bottlenecks: 15–20 minutes waiting time per student during enrollment peaks.\n3. Trapped Capital: Heuristic size ordering triggering severe dead-stock and shortages.\n4. Double-Claim Risks: Lack of barcode tracking exposing inventory to duplicate distribution.\" "
    },
    "slide5": {
      "targetTime": "00:40 Mins",
      "html": "<p class=\"mb-2\"><span class=\"bg-horizon-700/40 text-red-200 border border-red-400 text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded mr-1.5\">INFORMATION FLOW</span>\"This diagram illustrates the radical shift from fragmented silos to unified data.\"</p><p class=\"mb-2\">\"Previously, paper slips and ad-hoc chat groups resulted in days of reconciliation lag.\"</p><p>\"With HorizonU Uniform, a <em>Single Source of Truth</em> synchronizes checkout, payment verification, and warehouse fulfillment instantly in real time.\"</p>",
      "text": "PRESENTER SCRIPT SLIDE 5 (Target: 00:40 Mins):\n\"This diagram illustrates the radical shift from fragmented silos to unified data.\n\nPreviously, paper slips and ad-hoc chat groups resulted in days of reconciliation lag.\n\nWith HorizonU Uniform, a Single Source of Truth synchronizes checkout, payment verification, and warehouse fulfillment instantly in real time.\" "
    },
    "slide6": {
      "targetTime": "00:45 Mins",
      "html": "<p class=\"mb-2\"><span class=\"bg-horizon-700/40 text-red-200 border border-red-400 text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded mr-1.5\">4 ARCHITECTURAL PILLARS</span>\"Our system is anchored on four synergistic modules:\"</p><p class=\"mb-1\"><strong>1. Campus ERP Core:</strong> Real-time student master data & transaction logs.</p><p class=\"mb-1\"><strong>2. SCM Procurement:</strong> Vendor PO tracking and data-driven demand forecasting.</p><p class=\"mb-1\"><strong>3. Mobile POS:</strong> Rapid desk fulfillment via dynamic student QR codes.</p><p><strong>4. Smart WMS:</strong> Automated bin location, FIFO picking rules, and perpetual audits.\"</p>",
      "text": "PRESENTER SCRIPT SLIDE 6 (Target: 00:45 Mins):\n\"Our system is anchored on four synergistic modules:\n1. Campus ERP Core: Real-time student master data & transaction logs.\n2. SCM Procurement: Vendor PO tracking and data-driven demand forecasting.\n3. Mobile POS: Rapid desk fulfillment via dynamic student QR codes.\n4. Smart WMS: Automated bin location, FIFO picking rules, and perpetual audits.\" "
    },
    "slide7": {
      "targetTime": "00:40 Mins",
      "html": "<p class=\"mb-2\"><span class=\"bg-horizon-700/40 text-red-200 border border-red-400 text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded mr-1.5\">CLOSED-LOOP LIFECYCLE</span>\"The operational cycle operates in four tightly locked phases:\"</p><p class=\"mb-2\">\"From predictive demand planning, barcode-verified vendor inbound, sub-30-second student fulfillment, to precise exchange handling and audit.\"</p><p>\"This closed loop guarantees 100% item traceability and eliminates stock discrepancy.\"</p>",
      "text": "PRESENTER SCRIPT SLIDE 7 (Target: 00:40 Mins):\n\"The operational cycle operates in four tightly locked phases:\n\nFrom predictive demand planning, barcode-verified vendor inbound, sub-30-second student fulfillment, to precise exchange handling and audit.\n\nThis closed loop guarantees 100% item traceability and eliminates stock discrepancy.\" "
    },
    "slide8": {
      "targetTime": "00:35 Mins",
      "html": "<p class=\"mb-2\"><span class=\"bg-horizon-700/40 text-red-200 border border-red-400 text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded mr-1.5\">ROADMAP & SOPS</span>\"Our structured 6-week roadmap spans database migration, stress testing with 5,000 concurrent simulated users, to live deployment.\"</p><p><span class=\"bg-horizon-700/40 text-red-200 border border-red-400 text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded mr-1.5\">FIELD RESILIENCE</span>\"We also implemented 3 fail-safe SOPs: <em>Offline-Sync</em> during network outages, <em>Express 60-Second Size Exchange</em>, and automated <em>Fraud Escalation</em> for discrepancies.\"</p>",
      "text": "PRESENTER SCRIPT SLIDE 8 (Target: 00:35 Mins):\n\"Our structured 6-week roadmap spans database migration, stress testing with 5,000 concurrent simulated users, to live deployment.\n\nWe also implemented 3 fail-safe SOPs: Offline-Sync during network outages, Express 60-Second Size Exchange, and automated Fraud Escalation for discrepancies.\" "
    },
    "slide9": {
      "targetTime": "00:35 Mins",
      "html": "<p class=\"mb-2\"><span class=\"bg-horizon-700/40 text-red-200 border border-red-400 text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded mr-1.5\">IMPACT & CONCLUSION</span>\"In conclusion, HorizonU Uniform delivers tangible, measurable results for Horizon University Indonesia:\"</p><p class=\"mb-2\">\"Queue times slashed by 97% to <strong>under 30 seconds</strong>, <strong>100% FIFO compliance</strong>, and <strong>Zero Dead-Stock</strong> protecting university capital.\"</p><p>\"HorizonU Uniform is not just software — it is the new benchmark for modern campus logistics excellence. Thank you.\"</p>",
      "text": "PRESENTER SCRIPT SLIDE 9 (Target: 00:35 Mins):\n\"In conclusion, HorizonU Uniform delivers tangible, measurable results for Horizon University Indonesia:\n\nQueue times slashed by 97% to under 30 seconds, 100% FIFO compliance, and Zero Dead-Stock protecting university capital.\n\nHorizonU Uniform is not just software — it is the new benchmark for modern campus logistics excellence. Thank you.\" "
    }
  }
};
