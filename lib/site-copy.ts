// src/lib/site-copy.ts
import { Boxes, LayoutGrid, ShoppingCart, Globe } from "lucide-react";
export const SUPPORTED_LANGS = ["en", "fr", "de", "lb"] as const;
export type Lang = (typeof SUPPORTED_LANGS)[number];

interface DeepRecord {
  [key: string]: string | DeepRecord;
}

/**
 * Copy:
 * - Keeps existing keys
 * - Adds missing keys requested:
 *   - home.services.digitalSystems.*
 *   - home.platformsBlock.*
 *   - home.platforms.(erp/customApps/ecommerce/websites).(title/desc)
 * - Adds Services page key: services.recommendedStartingPoint
 * - Safe fallback: requested lang -> en -> key
 */
export const copy: Record<Lang, DeepRecord> = {
  en: {
    common: {
      brand: "AI Automation",
      nav: {
        home: "Home",
        services: "Services",
        howItWorks: "How It Works",
        about: "About",
        contact: "Contact",
        privacy: "Privacy Policy",
        terms: "Terms of Service",
      },
      buttons: {
        learnMore: "Learn More",
        close: "Close",
        getStarted: "Get Started",
        viewServices: "View Our Services",
        getFreeAudit: "Get Free Audit",
        getFreeConsultation: "Get Free Consultation",
      },
      footer: {
        brandShort: "AI",
        brandName: "Lux AI Consultancy & Automation",
        description:
          "Transforming businesses through intelligent automation. We help companies implement AI solutions to boost efficiency, reduce costs, and scale smarter.",
        quickLinks: "Quick Links",
        aboutUs: "About Us",
        services: "Services",
        useCases: "Use Cases",
        howItWorks: "How It Works",
        contactInfo: "Contact Info",
        email: "mfg@moolasisayjemere.com",
        emailRaw: "mfg@moolasisayjemere.com",
        phone: "+352 691 833 894",
        phoneRaw: "+352691833894",
        location: "Belvaux, Luxumbourg",
        socialTitle: "Connect with us",
        rights: "All rights reserved.",
        privacy: "Privacy Policy",
        terms: "Terms of Service",
      },
    },

    home: {
      hero: {
        line1: "Automate Your",
        line2: "Business with",
        line3: "AI-Powered Solutions",
        subtitle:
          "Boost efficiency, reduce costs, and scale smarter through AI. Transform your workflows with intelligent automation that works 24/7.",
        ctaAudit: "Get a Free Automation Audit",
        ctaHow: "Learn How It Works",
        imageAlt: "AI Automation Illustration",
      },
      stats: {
        businessesAutomated: "Businesses Automated",
        workflowAccuracy: "Workflow Accuracy",
        automatedOperations: "Automated Operations",
      },
      trusted: {
        title: "Trusted by Teams Transforming Operations with AI Automation",
        subtitle:
          "We design and integrate AI-powered automation systems that modernize real business operations—securely, reliably, and at scale.",
        outcomes:
          "Typical outcomes: less manual work, faster support, cleaner data flow, and admin-controlled operations.",
      },

      capabilities: {
        publicChatbots: {
          name: "Public Website Chatbots",
          desc: "24/7 lead capture, FAQs, and customer guidance",
        },
        protectedChatbots: {
          name: "Protected Chatbots",
          desc: "Secure, authenticated AI assistants for customers and teams",
        },
        adminKb: {
          name: "Admin Knowledge Base Management",
          desc: "Client-controlled AI knowledge, updates, and response rules",
        },
        integrationAutomation: {
          name: "System Integration & Automation",
          desc: "WhatsApp, email, APIs, webhooks, n8n, Make, Zapier",
        },
      },

      servicesBlock: {
        title: "Transform Your Business Operations",
        subtitle:
          "From workflow automation to intelligent chatbots, we deliver AI solutions that reduce manual work, improve accuracy, and drive measurable business results.",
        cta: "View All Services",
      },

      services: {
        digitalStrategy: {
          title: "AI Strategy & Consulting",
          description: "A clear starting point for your AI journey",
          detail:
            "We help you identify the highest-impact AI opportunities, define what to automate first, and build a realistic roadmap with measurable ROI.",
          bestFor:
            "Best for: Leadership teams, first-time AI adopters, complex organizations",
        },
        workflowAutomation: {
          title: "AI Workflow Automation",
          description: "Streamline repetitive tasks and operational processes",
          detail:
            "We automate time-consuming, rule-based workflows using AI systems that adapt to how your business actually operates—reducing errors, increasing speed, and freeing teams to focus on higher-value work.",
          bestFor:
            "Best for: Operations, finance, HR, manufacturing, logistics, and back-office teams",
        },

        chatbots: {
          title: "AI-Powered Chatbots",
          description:
            "Intelligent automation for customer and internal support",
          detail:
            "Our AI chatbots handle conversations across websites, portals, WhatsApp, and internal tools—resolving common issues instantly and escalating complex cases when needed.",
          bestFor:
            "Best for: Customer support, sales, onboarding, and internal IT or HR teams",
        },

        processOptimization: {
          title: "Process Optimization",
          description: "Analyze and improve how work actually flows",
          detail:
            "We use AI and data analysis to uncover inefficiencies, identify bottlenecks, and redesign workflows to be faster, leaner, and more reliable.",
          bestFor:
            "Best for: Operations leadership, process improvement, and cost reduction initiatives",
        },

        predictiveAnalytics: {
          title: "Predictive Analytics",
          description: "Data-driven insights for proactive decision-making",
          detail:
            "We turn historical and real-time data into forecasts that help you anticipate trends, reduce risk, and act before problems or opportunities arise.",
          bestFor:
            "Best for: Executives, planning teams, finance, sales, and supply chain",
        },
      },

      platformsBlock: {
        title: "Platforms We Build & Modernize",
        subtitle:
          "Beyond automation, we build and modernize the core platforms your business runs on—fully integrated, secure, and automation-ready.",
      },

      platforms: {
        erp: {
          title: "ERP Systems",
          desc: "Modern ERP platforms with role-based modules, approvals, reporting, and clean data flow across teams.",
        },
        customApps: {
          title: "Custom Business Applications",
          desc: "Tailored internal tools and portals designed around your workflows—secure, scalable, and easy to maintain.",
        },
        ecommerce: {
          title: "E-commerce Platforms",
          desc: "Order processing, inventory sync, fulfillment automation, and AI-assisted customer self-service.",
        },
        websites: {
          title: "Websites & Customer Portals",
          desc: "High-converting websites plus authenticated portals with chatbots, knowledge bases, and admin-controlled content.",
        },
      },
      // trusted: {
      //   title: "Trusted by Teams Transforming Operations with AI Automation",
      //   subtitle:
      //     "We design and build AI automation—from chatbots to ERP and custom apps—so your operations run faster, cleaner, and more securely.",
      //   outcomes:
      //     "Typical outcomes: less manual work, faster support, cleaner data flow, admin-controlled operations.",
      // },
      // capabilities: {
      //   publicChatbots: {
      //     name: "Public Website Chatbots",
      //     desc: "Lead capture + FAQs 24/7",
      //   },
      //   protectedChatbots: {
      //     name: "Protected Chatbots",
      //     desc: "Authenticated user access",
      //   },
      //   adminKb: {
      //     name: "Admin KB Management",
      //     desc: "Consistent updates & control",
      //   },
      //   erpApps: {
      //     name: "ERP & Business Web Apps",
      //     desc: "Back-office + reporting",
      //   },
      //   ecommerceInventory: {
      //     name: "E-commerce & Inventory",
      //     desc: "Orders + stock management",
      //   },
      //   integrationAutomation: {
      //     name: "System Integration & Automation",
      //     desc: "APIs, webhooks, n8n/Make/Zapier",
      //   },
      // },

      // servicesBlock: {
      //   title: "Transform Your Business Operations",
      //   subtitle:
      //     "From workflow automation to intelligent chatbots, we deliver AI solutions that reduce manual work, improve accuracy, and drive measurable business results.",
      //   cta: "View All Services",
      // },

      // services: {
      //   workflowAutomation: {
      //     title: "AI Workflow Automation",
      //     description: "Streamline repetitive tasks and processes",
      //     detail:
      //       "We automate time-consuming, rule-based, and repetitive workflows using AI systems that adapt to how your business operates. This reduces human error, speeds up execution, and frees your team to focus on higher-value work.",
      //     bestFor:
      //       "Best for: Operations, finance, HR, manufacturing, logistics, back-office teams",
      //   },
      //   chatbots: {
      //     title: "AI-Powered Chatbots",
      //     description: "Intelligent customer service automation",
      //     detail:
      //       "Our AI chatbots handle customer conversations across websites, apps, and messaging platforms. They understand natural language, resolve common issues instantly, and escalate complex cases when needed.",
      //     bestFor:
      //       "Best for: Customer support, sales, onboarding, internal IT helpdesks",
      //   },
      //   processOptimization: {
      //     title: "Process Optimization",
      //     description: "Analyze and improve business workflows",
      //     detail:
      //       "We use AI and data analysis to uncover inefficiencies in your existing processes, identify bottlenecks, and recommend smarter, faster ways to operate.",
      //     bestFor:
      //       "Best for: Process improvement, operations leadership, cost reduction initiatives",
      //   },
      //   predictiveAnalytics: {
      //     title: "Predictive Analytics",
      //     description: "Data-driven insights for better decisions",
      //     detail:
      //       "We turn your data into actionable forecasts, helping you anticipate trends, reduce risk, and make proactive strategic decisions instead of reactive ones.",
      //     bestFor:
      //       "Best for: Executives, planning teams, finance, sales, and supply chain",
      //   },

      //   // ✅ NEW (requested)
      //   // digitalSystems: {
      //   //   title: "Digital Systems & Business Platforms",
      //   //   description: "Build modern ERP, e-commerce, and custom business apps",
      //   //   detail:
      //   //     "We design and build the digital systems that run your business—ERP portals, e-commerce back offices, customer dashboards, and internal tools. We integrate your data, automate workflows, and deliver secure, role-based experiences your team can actually use.",
      //   //   bestFor:
      //   //     "Best for: ERP modernization, operational dashboards, order & inventory systems, internal tools, customer portals",
      //   // },
      // },

      // // ✅ NEW (requested)
      // platformsBlock: {
      //   title: "Platforms We Build & Modernize",
      //   subtitle:
      //     "From ERP to e-commerce and internal tools, we create secure, scalable platforms with clean integrations and automation-ready workflows.",
      // },
      // platforms: {
      //   erp: {
      //     title: "ERP Systems",
      //     desc: "Modernize operations with role-based modules, reporting, approvals, and clean data flow across teams.",
      //   },
      //   customApps: {
      //     title: "Custom Business Apps",
      //     desc: "Tailored portals and internal tools to fit your workflow—built fast, secure, and easy to maintain.",
      //   },
      //   ecommerce: {
      //     title: "E-commerce Platforms",
      //     desc: "Order processing, inventory sync, fulfillment automation, and customer self-service with AI support.",
      //   },
      //   websites: {
      //     title: "Websites & Customer Portals",
      //     desc: "High-converting sites plus authenticated portals—chatbots, knowledge base, and admin-controlled content.",
      //   },
      // },

      teamBlock: {
        title: "Meet Our Team",
        subtitle:
          "The people behind our AI automation solutions — dedicated to transforming workflows and unlocking business efficiency.",
      },
      team: {
        molla: {
          name: "Molla Sisay",
          role: "AI Automation Strategist",
          quote:
            "I help businesses simplify complex processes and design automation systems that enhance efficiency and reduce bottlenecks.",
          tags: {
            tag1: "Process Automation",
            tag2: "Workflow Design",
            tag3: "System Analysis",
          },
        },
        fikre: {
          name: "Fikremariam Mekonnen",
          role: "AI & Integrations Engineer",
          quote:
            "I specialize in building scalable integrations and automation systems that work reliably in real business environments.",
          tags: {
            tag1: "API Integrations",
            tag2: "Automation Engineering",
            tag3: "AI Systems",
          },
        },
        dereje: {
          name: "Dereje Masresha",
          role: "Full-Stack & AI Solutions Developer",
          quote:
            "My work focuses on building intelligent automation tools and seamless user experiences powered by AI.",
          tags: {
            tag1: "Full-Stack Dev",
            tag2: "AI Chatbots",
            tag3: "Automation Platforms",
          },
        },
      },
      testimonialsBlock: {
        title: "What Our Clients Say",
        subtitle:
          "Real results from businesses that have transformed their operations with AI automation.",
      },
      testimonials: {
        t1: {
          quote:
            "AI automation reduced our email response time by 70% and freed up our team to focus on strategic initiatives.",
          author: "Sarah Johnson",
          role: "CEO, TechCorp",
        },
        t2: {
          quote:
            "The workflow automation saved us 15 hours per week on invoice processing. ROI was immediate and truly impressive.",
          author: "Michael Chen",
          role: "Operations Manager, InnovateLabs",
        },
        t3: {
          quote:
            "Our AI chatbot now handles 80% of customer queries instantly. Customer satisfaction has never been higher.",
          author: "Lisa Rodriguez",
          role: "Customer Success Director, DataFlow",
        },
      },
      finalCta: {
        title: "Ready to Automate Your Business?",
        subtitle:
          "Join the businesses already saving time and money with AI automation. Get your free consultation today.",
        button: "Start Your Automation Journey",
      },
    },

    contact: {
      modal: {
        title: "Not Implemented",
        body: "This is a template. Backend functionality is not implemented.",
        close: "Close",
      },
      hero: {
        title: "Let's Automate Something Together",
        subtitle:
          "Ready to transform your business with AI automation? Tell us about your challenges and we'll create a custom solution.",
      },
      form: {
        title: "Get Started with AI Automation",
        fullName: "Full Name *",
        email: "Email Address *",
        company: "Company Name *",
        task: "Task to Automate *",
        sending: "Sending...",
        submit: "Get Free Consultation",
        placeholders: {
          name: "John Doe",
          email: "john@company.com",
          company: "Your Company Inc.",
          task: "Describe the process you'd like to automate (e.g., invoice processing, customer support, data entry, etc.)",
        },
      },
      sidebar: { title: "Get in Touch" },
      whyTitle: "Why Choose Us?",
      why: {
        i1: "Free initial consultation",
        i2: "Custom solutions for your needs",
        i3: "24/7 ongoing support",
        i4: "Proven track record",
      },
      info: {
        email: {
          icon: "ri-mail-line",
          title: "Email Us",
          content: "mfg@moolasisayjemere.com",
          description: "Get in touch for project inquiries",
        },
        phone: {
          icon: "ri-phone-line",
          title: "Call Us",
          content: "+352 691 833 894",
          description: "Mon-Fri 9AM-6PM PST",
        },
        visit: {
          icon: "ri-map-pin-line",
          title: "Visit Us",
          content: "San Francisco, CA",
          description: "Schedule an in-person meeting",
        },
      },
      testimonialsBlock: {
        title: "What Our Clients Say",
        subtitle:
          "Real results from businesses that transformed with AI automation",
      },
      testimonials: {
        t1: {
          quote:
            "AI automation reduced our invoice processing time by 70% and eliminated errors completely. The ROI was visible within the first month.",
          author: "Sarah Johnson",
          role: "Operations Manager",
        },
        t2: {
          quote:
            "The chatbot handles 90% of our customer inquiries automatically. Our team can now focus on strategic initiatives instead of repetitive tasks.",
          author: "Michael Chen",
          role: "CEO",
        },
        t3: {
          quote:
            "Predictive analytics helped us identify market trends 3 months early. This gave us a competitive advantage that increased revenue by 25%.",
          author: "Emily Rodriguez",
          role: "VP of Operations",
        },
      },
    },
    about: {
      hero: {
        title: "About Our Mission",
        subtitle:
          "We help businesses adopt AI and automation in a practical way—reducing manual work, improving data flow, and building secure systems teams can trust.",
      },

      stats: {
        businessesAutomated: "Pilots & Internal Builds",
        tasksProcessed: "Automations Designed",
        workflowAccuracy: "Testing Accuracy Target",
        supportAvailable: "Support Available",
      },

      vision: {
        title: "Our Vision",
        p1: "We believe AI should be useful, secure, and measurable—not hype.",
        p2: "Our goal is to help teams modernize operations with clean integrations, reliable automations, and strong governance.",
        imageAlt: "Our Vision",
        tags: {
          tag1: "Practical AI",
          tag2: "Automation & Integration",
          tag3: "Strategy & Consulting",
          tag4: "Security & Governance",
        },
      },

      journey: {
        title: "Our Journey",
        subtitle:
          "We’re building the foundation for reliable AI automation—designed for real business operations.",
      },

      timeline: {
        foundation: {
          label: "Phase 1",
          title: "Founded with a Clear Mission",
          description:
            "We started Lux AI Consultancy & Automation to help businesses implement AI in practical, measurable ways.",
        },
        research: {
          label: "Phase 2",
          title: "Research & Architecture",
          description:
            "We focused on researching real business automation needs and designing scalable architectures using AI, integrations, and workflow automation.",
        },
        building: {
          label: "Now",
          title: "Building the Core Systems",
          description:
            "We’re developing reusable automation frameworks, AI knowledge systems, and admin controls to support secure deployments.",
        },
        next: {
          label: "Next",
          title: "Early Access & Client Rollouts",
          description:
            "We’re preparing early access engagements and onboarding our first clients with clear scope, governance, and measurable ROI targets.",
        },
      },

      cta: {
        title: "Want to Automate Your Operations?",
        subtitle:
          "Tell us your workflow challenges—we’ll suggest a clear starting point and the fastest path to measurable results.",
        button: "Talk to Our Team",
      },
    },

    howItWorks: {
      hero: {
        title: "How It Works",
        subtitle:
          "A clear, practical process to take you from idea → working AI automation (securely and fast).",
      },
      process: {
        title: "Simple, reliable delivery",
        subtitle:
          "We focus on real operations—chatbots, integrations, and workflows that reduce manual work and improve speed.",
      },
      steps: {
        s1: {
          title: "Discover & Prioritize",
          description:
            "We learn your operations, identify the highest-ROI automations, and agree on a realistic plan.",
          d1: "Workflow mapping (what happens today)",
          d2: "Data & system audit (ERP/CRM/email/WhatsApp/APIs)",
          d3: "Use-case prioritization + ROI estimate",
          d4: "Roadmap + success metrics",
          imageAlt: "Discovery and prioritization",
        },
        s2: {
          title: "Build & Integrate",
          description:
            "We implement the automation, connect your tools, and set guardrails so it works reliably in production.",
          d1: "Chatbot / workflow build (n8n, Make, Zapier, custom code)",
          d2: "Integrations (APIs, webhooks, DB, ERP/CRM)",
          d3: "Testing: edge cases + permissions",
          d4: "Launch + team handover",
          imageAlt: "Build and integrate",
        },
        s3: {
          title: "Monitor & Improve",
          description:
            "We track performance, refine responses and workflows, and continuously improve results.",
          d1: "Monitoring & reporting dashboard",
          d2: "Knowledge base updates + prompt tuning",
          d3: "Automation optimization & error reduction",
          d4: "Ongoing support & iterations",
          imageAlt: "Monitor and improve",
        },
      },

      features: {
        title: "Why this works",
        subtitle:
          "Practical delivery, clear ROI, and systems that match how businesses actually operate.",
        f1: {
          title: "Fast, structured kickoff",
          description:
            "Clear scope + first working automation quickly (often 2–3 weeks).",
        },
        f2: {
          title: "Secure by design",
          description:
            "Access control, audit logs, and safe data handling from day one.",
        },
        f3: {
          title: "Built around your tools",
          description:
            "We integrate with what you already use—no unnecessary rebuild.",
        },
        f4: {
          title: "Measurable outcomes",
          description:
            "Track time saved, faster responses, fewer errors, and cleaner data flow.",
        },
      },

      faqs: {
        title: "FAQs",
        subtitle: "Common questions before we start",
        q1: {
          q: "What do we need to start?",
          a: "A short call + access to the tools you want integrated (email/WhatsApp/CRM/ERP). We can begin with a lightweight audit first.",
        },
        q2: {
          q: "Can you start small?",
          a: "Yes. We often start with one workflow or chatbot pilot, prove ROI, then expand in phases.",
        },
        q3: {
          q: "Do you support multi-language?",
          a: "Yes—English, French, German, and Luxembourgish (plus more if needed).",
        },
      },

      cta: {
        title: "Ready to automate smarter?",
        subtitle:
          "Start with a free automation audit and get a clear plan in days.",
        primary: "Get Free Audit",
        secondary: "View Our Services",
      },
    },
    services: {
      hero: {
        title: "Our AI Services",
        subtitle:
          "Comprehensive AI automation solutions designed to transform your business operations and drive unprecedented growth",
      },
      gridCta: { learnMore: "Learn More" },

      // ✅ NEW (needed by your ServicesPage)
      recommendedStartingPoint: "Recommended starting point",

      modal: {
        keyFeatures: "Key Features",
        expectedBenefits: "Expected Benefits",
        getStarted: "Get Started",
        close: "Close",
        whatItIsLabel: "What it is:",
        coreFeaturesLabel: "Core features:",
        recommendedAddOnsLabel: "Recommended add-ons",
        impactLabel: "Impact",
      },

      list: {
        s1: {
          title: "AI Workflow Automation",
          description:
            "Streamline your business processes with intelligent automation that learns and adapts to your workflow patterns.",
          benefits: "Reduce manual work by 80% and increase accuracy by 95%",
          f1: "Process Mining",
          f2: "Automated Decision Making",
          f3: "Workflow Optimization",
          f4: "Real-time Monitoring",
          imageAlt: "AI workflow automation",

          whatItIs:
            "AI-driven automation that learns from your workflows and continuously improves how tasks are executed.",
          howItHelps: {
            h1: "Eliminates repetitive manual tasks",
            h2: "Improves speed and consistency",
            h3: "Scales operations without increasing headcount",
          },
          recommendedAddOns: {
            r1: "RPA (Robotic Process Automation)",
            r2: "API & system integrations (ERP, CRM, databases)",
            r3: "Exception handling & human-in-the-loop workflows",
            r4: "Compliance & audit automation",
          },
        },

        s2: {
          title: "AI-Powered Chatbots",
          description:
            "Deploy intelligent conversational agents that provide 24/7 customer support with human-like interactions.",
          benefits:
            "Handle 90% of customer inquiries instantly and improve satisfaction rates",
          f1: "Natural Language Processing",
          f2: "Multi-language Support",
          f3: "Integration Ready",
          f4: "Learning Capabilities",
          imageAlt: "AI-powered chatbots",

          whatItIs:
            "Conversational AI that understands user intent and delivers fast, accurate responses across multiple channels.",
          howItHelps: {
            h1: "24/7 customer and internal support",
            h2: "Faster response times",
            h3: "Lower support costs",
          },
          recommendedAddOns: {
            r1: "Voice bots (call center automation)",
            r2: "CRM and ticketing system integration",
            r3: "Sales and lead-qualification bots",
            r4: "Internal knowledge-base assistants",
          },
        },

        s3: {
          title: "Process Optimization",
          description:
            "Analyze and enhance your existing processes using AI-driven insights and recommendations.",
          benefits:
            "Optimize efficiency by 60% and reduce operational costs significantly",
          f1: "Performance Analytics",
          f2: "Bottleneck Detection",
          f3: "Resource Allocation",
          f4: "Continuous Improvement",
          imageAlt: "Process optimization",

          whatItIs:
            "AI-powered analysis of how work actually flows through your organization—not how it’s supposed to work.",
          howItHelps: {
            h1: "Identifies hidden inefficiencies",
            h2: "Improves resource utilization",
            h3: "Reduces delays and operational costs",
          },
          recommendedAddOns: {
            r1: "Process re-engineering recommendations",
            r2: "KPI tracking dashboards",
            r3: "Change impact simulation",
            r4: "Cross-department workflow alignment",
          },
        },

        s4: {
          title: "Predictive Analytics",
          description:
            "Leverage machine learning to forecast trends, identify opportunities, and make data-driven decisions.",
          benefits:
            "Increase forecast accuracy by 85% and identify opportunities 3 months earlier",
          f1: "Trend Forecasting",
          f2: "Risk Assessment",
          f3: "Market Analysis",
          f4: "Strategic Planning",
          imageAlt: "Predictive analytics",

          whatItIs:
            "Machine learning models that analyze historical and real-time data to predict future outcomes.",
          howItHelps: {
            h1: "Anticipates risks and opportunities",
            h2: "Improves planning accuracy",
            h3: "Enables proactive decision-making",
          },
          recommendedAddOns: {
            r1: "Demand forecasting",
            r2: "Predictive maintenance",
            r3: "Customer behavior modeling",
            r4: "Scenario planning & simulations",
          },
        },

        s5: {
          title: "AI Strategy & Consulting",
          description:
            "A clear roadmap to help you decide where to start with AI, what to automate first, and how to get measurable ROI.",
          benefits:
            "Move faster with clarity: align stakeholders, reduce risk, and focus investment on the highest-impact automations.",
          f1: "AI Readiness Assessment",
          f2: "Automation Roadmap & Prioritization",
          f3: "ROI & Feasibility Analysis",
          f4: "AI Governance & Ethics",
          imageAlt: "AI strategy and consulting",

          whatItIs:
            "A strategic engagement that defines the best AI opportunities and the right implementation plan for your organization.",
          howItHelps: {
            h1: "Clarifies high-ROI automation opportunities",
            h2: "Creates a phased rollout plan your teams can follow",
            h3: "Reduces implementation risk with governance and guardrails",
          },
          recommendedAddOns: {
            r1: "Executive workshops & stakeholder alignment",
            r2: "Data readiness and architecture review",
            r3: "Pilot selection + success metrics",
            r4: "Change management support",
          },
        },
      },

      why: {
        title: "Why Choose Our AI Solutions?",
        subtitle:
          "We combine cutting-edge technology with human expertise to deliver results that matter",
        fast: {
          title: "Fast Implementation",
          description:
            "Deploy AI solutions in weeks, not months, with our proven methodology",
        },
        secure: {
          title: "Secure & Reliable",
          description: "Enterprise-grade security with 99.9% uptime guarantee",
        },
        support: {
          title: "24/7 Support",
          description: "Dedicated support team available around the clock",
        },
      },
      cta: {
        title: "Ready to Get Started?",
        subtitle:
          "Let's discuss how our AI solutions can transform your business operations",
        primary: "Get Free Consultation",
        secondary: "Learn How It Works",
      },

      platformsBlock: {
        title: "Platforms We Build & Modernize",
        subtitle:
          "Beyond AI workflows, we modernize the core systems your business runs on—so data flows cleanly, teams move faster, and automation becomes easy.",
        bullets: {
          b1: "Integrated with your existing tools (ERP/CRM/email/WhatsApp/APIs)",
          b2: "Secure, role-based access with audit-friendly design",
          b3: "Automation-ready data + workflows (built to scale)",
        },
      },

      platforms: {
        erp: {
          title: "ERP Systems",
          desc: "Modern ERP platforms with role-based modules, approvals, reporting, and clean data flow across teams.",
          points: {
            p1: "Role-based modules & approvals",
            p2: "Reporting dashboards & audit trails",
            p3: "Clean integrations and data governance",
          },
        },
        customApps: {
          title: "Custom Business Applications",
          desc: "Tailored internal tools and portals designed around your workflows—secure, scalable, and easy to maintain.",
          points: {
            p1: "Internal tools, admin portals, dashboards",
            p2: "Secure authentication & permissions",
            p3: "Built for maintainability and scale",
          },
        },
        ecommerce: {
          title: "E-commerce Platforms",
          desc: "Order processing, inventory sync, fulfillment automation, and AI-assisted customer self-service.",
          points: {
            p1: "Inventory sync + fulfillment automation",
            p2: "Order workflows + operational dashboards",
            p3: "AI support for customer self-service",
          },
        },
        websites: {
          title: "Websites & Customer Portals",
          desc: "High-converting websites plus authenticated portals with chatbots, knowledge bases, and admin-controlled content.",
          points: {
            p1: "Authenticated portals & customer dashboards",
            p2: "Chatbots + knowledge base integration",
            p3: "Admin-controlled content & access",
          },
        },
      },
    },

    legal: {
      privacy: {
        title: "Privacy Policy",
        sections: {
          metaDate: "Effective date: December 22, 2025",
          metaCompany: "Lux AI Consultation & Automation",
          metaDomain: "luxaiautomation.com",
          downloadPdf: "Download PDF",
          contactLabel: "Email:",
          emailCta: "Email us",

          s1t: "1. Introduction",
          s1b: "Lux AI Consultation & Automation, based in Luxembourg (EU), values your privacy. This Privacy Policy explains how we handle your information when you use our website. We are committed to protecting your personal data in accordance with the General Data Protection Regulation (GDPR).",

          s2t: "2. Information We Collect",
          s2b1: "We collect personal information only when you contact us directly. If you use our contact form, we may collect your name, email address, and the content of your message. This information is used solely to respond to your inquiry and is never sold or shared with third parties.",
          s2b2: "We do not use analytics, tracking, or advertising cookies. Only essential cookies are used to ensure basic site functionality, such as remembering your theme preference (light or dark mode).",

          s3t: "3. How We Use Your Information",
          s3b: "Any information you provide is used exclusively to respond to your inquiry or request. We do not use your data for marketing purposes and do not share it with third parties.",

          s4t: "4. Cookies",
          s4b: "We use only essential cookies required for the proper functioning of the website. These cookies do not track your activity. You can disable cookies in your browser settings, but some site features may not work correctly.",

          s5t: "5. Data Security",
          s5b: "We implement reasonable technical and organizational measures to protect your personal data from unauthorized access, loss, or misuse. However, no method of data transmission or storage is completely secure.",

          s6t: "6. Third-Party Links",
          s6b: "Our website may include links to third-party websites. LuxAI Automation is not responsible for the privacy practices or content of those external sites. We encourage you to review their privacy policies before providing any personal data.",

          s7t: "7. Changes to This Policy",
          s7b: "We may update this Privacy Policy from time to time. Any changes will be posted on this page with a revised effective date. Continued use of the website indicates acceptance of the updated policy.",

          s8t: "8. Your Rights & Contact Information",
          s8b: "Under GDPR, you have the right to access, rectify, or request the deletion of your personal data. For privacy-related questions or requests, please contact us at contact@luxaiautomation.com.",
          end: "By using this website, you acknowledge and agree to this Privacy Policy.",
        },
      },

      terms: {
        title: "Terms & Conditions",
        sections: {
          metaDate: "Effective date: December 22, 2025",
          metaCompany: "Lux AI Consultancy & Automation",
          metaDomain: "luxaiautomation.com",

          downloadPdf: "Download PDF",

          s1t: "1. Ownership and Acceptance of Terms",
          s1b: "This website and its content are owned and operated by Lux AI Consultancy & Automation. By accessing or using this website, you agree to be bound by these Terms & Conditions. If you do not agree, you must discontinue use of the website.",

          s2t: "2. Right to Use the Website",
          s2b: "Lux AI Consultancy & Automation grants you a limited, non-exclusive, non-transferable right to access and use this website for lawful, personal, and professional informational purposes only. This right does not include resale or commercial exploitation of the website or its content.",

          s3t: "3. Intellectual Property",
          s3b: "All content on this website, including text, visuals, logos, layouts, and code, is the property of Lux AI Consultancy & Automation or its licensors and is protected by intellectual property laws. You may not copy, reproduce, distribute, modify, or publicly display any content without prior written permission.",

          s4t: "4. Prohibited Use",
          s4b: "You may not use automated systems, scraping tools, bots, or any other methods to access, monitor, or copy content from the website. You may not attempt to interfere with the website’s operation, security, or infrastructure, or use the website for unlawful or harmful activities.",

          s5t: "5. Content Accuracy and Availability",
          s5b: "The content on this website is provided for general informational purposes only. While we strive to keep information accurate and up to date, Lux AI Consultancy & Automation makes no guarantees regarding completeness, accuracy, or availability, and reserves the right to modify or remove content at any time.",

          s6t: "6. Disclaimer of Warranties",
          s6b: "The website and its content are provided on an “as is” and “as available” basis. Lux AI Consultancy & Automation disclaims all warranties, express or implied, including warranties of accuracy, fitness for a particular purpose, and non-infringement.",

          s7t: "7. Limitation of Liability",
          s7b: "To the maximum extent permitted by law, Lux AI Consultancy & Automation shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising from your use of, or inability to use, this website or its content.",

          s8t: "8. Third-Party Links",
          s8b: "This website may contain links to third-party websites. These links are provided for convenience only. Lux AI Consultancy & Automation does not control and is not responsible for the content, policies, or practices of any third-party sites.",

          s9t: "9. Feedback and Submissions",
          s9b: "Any feedback, ideas, or suggestions you submit to LuxAI Automation through this website will be treated as non-confidential and may be used by Lux AI Consultancy & Automation without restriction or compensation.",

          s10t: "10. Changes to These Terms",
          s10b: "Lux AI Consultancy & Automation reserves the right to update or modify these Terms & Conditions at any time. Changes take effect immediately upon posting. Continued use of the website constitutes acceptance of the revised terms.",

          s11t: "11. Governing Law",
          s11b: "These Terms & Conditions are governed by applicable laws, without regard to conflict of law principles.",

          contactLabel: "Email:",
          emailCta: "Contact us",

          end: "If you have any questions about these Terms & Conditions, please reach out to us.",
        },
      },
    },
  },

  fr: {
    common: {
      brand: "AI Automation",
      nav: {
        home: "Accueil",
        services: "Services",
        howItWorks: "Comment ça marche",
        about: "À propos",
        contact: "Contact",
        privacy: "Politique de confidentialité",
        terms: "Conditions d’utilisation",
      },
      buttons: {
        learnMore: "En savoir plus",
        close: "Fermer",
        getStarted: "Commencer",
        viewServices: "Voir nos services",
        getFreeAudit: "Obtenir un audit gratuit",
        getFreeConsultation: "Obtenir une consultation gratuite",
      },
      footer: {
        brandShort: "AI",
        brandName: "Lux AI Consultancy & Automation",
        description:
          "Transformer les entreprises grâce à l’automatisation intelligente. Nous aidons les sociétés à déployer des solutions IA pour gagner en efficacité, réduire les coûts et évoluer plus intelligemment.",
        quickLinks: "Liens rapides",
        aboutUs: "À propos",
        services: "Services",
        useCases: "Cas d’usage",
        howItWorks: "Comment ça marche",
        contactInfo: "Contact",
        email: "mfg@moolasisayjemere.com",
        emailRaw: "mfg@moolasisayjemere.com",
        phone: "+352 691 833 894",
        phoneRaw: "+352691833894",
        location: "Belvaux, Luxumbourg",
        socialTitle: "Connectez-vous avec nous",
        rights: "Tous droits réservés.",
        privacy: "Politique de confidentialité",
        terms: "Conditions d’utilisation",
      },
    },

    home: {
      hero: {
        line1: "Automatisez votre",
        line2: "entreprise avec",
        line3: "des solutions alimentées par l’IA",
        subtitle:
          "Améliorez l’efficacité, réduisez les coûts et évoluez plus intelligemment grâce à l’IA. Transformez vos flux de travail avec une automatisation intelligente disponible 24h/24 et 7j/7.",
        ctaAudit: "Obtenir un audit d’automatisation gratuit",
        ctaHow: "Voir comment ça fonctionne",
        imageAlt: "Illustration d’automatisation par IA",
      },
      stats: {
        businessesAutomated: "Entreprises automatisées",
        workflowAccuracy: "Précision des processus",
        automatedOperations: "Opérations automatisées",
      },
      trusted: {
        title:
          "Adopté par des équipes qui transforment leurs opérations grâce à l’IA",
        subtitle:
          "Nous concevons et intégrons des systèmes d’automatisation pilotés par l’IA pour moderniser les opérations métiers, de manière sécurisée, fiable et évolutive.",
        outcomes:
          "Résultats typiques : moins de travail manuel, support plus rapide, flux de données plus propres et opérations contrôlées par l’administrateur.",
      },

      capabilities: {
        publicChatbots: {
          name: "Chatbots pour sites publics",
          desc: "Génération de leads, FAQ et assistance 24/7",
        },
        protectedChatbots: {
          name: "Chatbots sécurisés",
          desc: "Assistants IA avec accès utilisateur authentifié",
        },
        adminKb: {
          name: "Gestion de base de connaissances (Admin)",
          desc: "Contrôle client du savoir IA, mises à jour et règles de réponse",
        },
        integrationAutomation: {
          name: "Intégration & automatisation des systèmes",
          desc: "WhatsApp, e-mail, API, webhooks, n8n, Make, Zapier",
        },
      },

      servicesBlock: {
        title: "Transformez vos opérations métier",
        subtitle:
          "De l’automatisation des workflows aux chatbots intelligents, nous livrons des solutions IA qui réduisent le travail manuel, améliorent la précision et génèrent des résultats mesurables.",
        cta: "Voir tous les services",
      },

      services: {
        digitalStrategy: {
          title: "Stratégie & conseil en IA",
          description: "Un point de départ clair pour votre transformation IA",
          detail:
            "Nous vous aidons à identifier les opportunités IA à fort impact, définir quoi automatiser en priorité et construire une feuille de route réaliste avec un ROI mesurable.",
          bestFor:
            "Idéal pour : directions, entreprises débutant avec l’IA, organisations complexes",
        },

        workflowAutomation: {
          title: "Automatisation des workflows par IA",
          description:
            "Optimisez les tâches répétitives et les processus opérationnels",
          detail:
            "Nous automatisons les workflows répétitifs et basés sur des règles grâce à des systèmes IA qui s’adaptent à la réalité de vos opérations, réduisant les erreurs et accélérant l’exécution.",
          bestFor:
            "Idéal pour : opérations, finance, RH, industrie, logistique et back-office",
        },

        chatbots: {
          title: "Chatbots alimentés par l’IA",
          description:
            "Automatisation intelligente du support client et interne",
          detail:
            "Nos chatbots IA gèrent les conversations sur les sites web, portails, WhatsApp et outils internes, avec escalade humaine lorsque nécessaire.",
          bestFor:
            "Idéal pour : support client, ventes, onboarding, équipes IT ou RH",
        },

        processOptimization: {
          title: "Optimisation des processus",
          description: "Analysez et améliorez la réalité de vos workflows",
          detail:
            "Nous utilisons l’IA et l’analyse de données pour identifier les inefficacités et repenser les processus afin de les rendre plus rapides et fiables.",
          bestFor:
            "Idéal pour : responsables opérationnels, amélioration continue, réduction des coûts",
        },

        predictiveAnalytics: {
          title: "Analytique prédictive",
          description: "Des insights pour décider de manière proactive",
          detail:
            "Nous transformons vos données en prévisions exploitables afin d’anticiper les risques et opportunités.",
          bestFor:
            "Idéal pour : dirigeants, planification, finance, ventes et supply chain",
        },
      },

      platformsBlock: {
        title: "Plateformes que nous concevons et modernisons",
        subtitle:
          "Au-delà de l’automatisation, nous construisons et modernisons les plateformes clés de votre entreprise, intégrées, sécurisées et prêtes pour l’IA.",
      },

      platforms: {
        erp: {
          title: "Systèmes ERP",
          desc: "ERP modernes avec modules par rôle, validations, reporting et flux de données fiables entre équipes.",
        },
        customApps: {
          title: "Applications métier sur mesure",
          desc: "Outils internes et portails adaptés à vos workflows, sécurisés, évolutifs et maintenables.",
        },
        ecommerce: {
          title: "Plateformes e-commerce",
          desc: "Traitement des commandes, synchronisation des stocks, automatisation logistique et support client assisté par IA.",
        },
        websites: {
          title: "Sites web & portails clients",
          desc: "Sites performants et portails sécurisés avec chatbots, base de connaissances et contenu administrable.",
        },
      },

      // trusted: {
      //   title:
      //     "Adopté par des équipes qui transforment leurs opérations grâce à l’automatisation par l’IA",
      //   subtitle:
      //     "Nous concevons et développons des solutions d’automatisation par l’IA — des chatbots aux ERP et aux applications sur mesure — afin que vos opérations soient plus rapides, plus efficaces et plus sécurisées.",
      //   outcomes:
      //     "Résultats typiques : moins de travail manuel, support plus rapide, flux de données plus propre, opérations contrôlées par l’administrateur.",
      // },
      // capabilities: {
      //   publicChatbots: {
      //     name: "Chatbots pour sites publics",
      //     desc: "Génération de leads + FAQ 24/7",
      //   },
      //   protectedChatbots: {
      //     name: "Chatbots sécurisés",
      //     desc: "Accès utilisateurs authentifié",
      //   },
      //   adminKb: {
      //     name: "Gestion de base de connaissances (admin)",
      //     desc: "Mises à jour et contrôle cohérents",
      //   },
      //   erpApps: {
      //     name: "ERP & applications métiers web",
      //     desc: "Back-office + reporting",
      //   },
      //   ecommerceInventory: {
      //     name: "E-commerce & stock",
      //     desc: "Commandes + gestion d’inventaire",
      //   },
      //   integrationAutomation: {
      //     name: "Intégration & automatisation",
      //     desc: "API, webhooks, n8n/Make/Zapier",
      //   },
      // },

      // servicesBlock: {
      //   title: "Transformez vos opérations",
      //   subtitle:
      //     "De l’automatisation des flux de travail aux chatbots intelligents, nous proposons des solutions d’IA qui réduisent le travail manuel, améliorent la précision et génèrent des résultats commerciaux mesurables.",
      //   cta: "Voir tous les services",
      // },

      // services: {
      //   workflowAutomation: {
      //     title: "Automatisation des workflows par IA",
      //     description: "Rationalisez les tâches et processus répétitifs",
      //     detail:
      //       "Nous automatisons les workflows répétitifs et basés sur des règles avec des systèmes IA adaptés à votre fonctionnement. Cela réduit les erreurs, accélère l’exécution et libère vos équipes pour des tâches à plus forte valeur.",
      //     bestFor:
      //       "Idéal pour : opérations, finance, RH, industrie, logistique, équipes back-office",
      //   },
      //   chatbots: {
      //     title: "Chatbots alimentés par l’IA",
      //     description: "Automatisation intelligente du service client",
      //     detail:
      //       "Nos chatbots IA gèrent les conversations sur sites web, applications et messageries. Ils comprennent le langage naturel, résolvent les demandes courantes instantanément et escaladent les cas complexes.",
      //     bestFor:
      //       "Idéal pour : support client, ventes, onboarding, assistance IT interne",
      //   },
      //   processOptimization: {
      //     title: "Optimisation des processus",
      //     description: "Analysez et améliorez vos workflows",
      //     detail:
      //       "Nous utilisons l’IA et l’analyse de données pour détecter les inefficacités, identifier les goulots d’étranglement et recommander des façons plus rapides et plus intelligentes d’opérer.",
      //     bestFor:
      //       "Idéal pour : amélioration continue, direction des opérations, réduction des coûts",
      //   },
      //   predictiveAnalytics: {
      //     title: "Analytique prédictive",
      //     description: "Des insights data pour de meilleures décisions",
      //     detail:
      //       "Nous transformons vos données en prévisions actionnables pour anticiper les tendances, réduire les risques et prendre des décisions proactives.",
      //     bestFor:
      //       "Idéal pour : dirigeants, planification, finance, ventes, supply chain",
      //   },

      //   // ✅ NEW (requested)
      //   // digitalSystems: {
      //   //   title: "Systèmes digitaux & plateformes métiers",
      //   //   description:
      //   //     "Construire des ERP modernes, du e-commerce et des applications métiers sur mesure",
      //   //   detail:
      //   //     "Nous concevons et développons les systèmes qui font tourner votre entreprise : portails ERP, back offices e-commerce, dashboards clients et outils internes. Nous intégrons vos données, automatisons les workflows et livrons des expériences sécurisées avec gestion des rôles.",
      //   //   bestFor:
      //   //     "Idéal pour : modernisation ERP, dashboards opérationnels, commandes & stock, outils internes, portails clients",
      //   // },
      // },

      // // ✅ NEW (requested)
      // platformsBlock: {
      //   title: "Plateformes que nous construisons et modernisons",
      //   subtitle:
      //     "De l’ERP au e-commerce et aux outils internes, nous créons des plateformes sécurisées, évolutives et prêtes pour l’automatisation.",
      // },
      // platforms: {
      //   erp: {
      //     title: "Systèmes ERP",
      //     desc: "Modernisez vos opérations : modules par rôles, reporting, validations et circulation propre des données.",
      //   },
      //   customApps: {
      //     title: "Applications métiers sur mesure",
      //     desc: "Portails et outils internes adaptés à vos processus—rapides, sécurisés et faciles à maintenir.",
      //   },
      //   ecommerce: {
      //     title: "Plateformes e-commerce",
      //     desc: "Traitement des commandes, synchronisation du stock, automatisation de la logistique et self-service client.",
      //   },
      //   websites: {
      //     title: "Sites web & portails clients",
      //     desc: "Sites performants + portails authentifiés : chatbots, base de connaissances et contenus contrôlés par admin.",
      //   },
      // },

      teamBlock: {
        title: "Rencontrez notre équipe",
        subtitle:
          "Les personnes derrière nos solutions d’automatisation par IA — dédiées à transformer les workflows et à libérer l’efficacité opérationnelle.",
      },
      team: {
        molla: {
          name: "Molla Sisay",
          role: "Stratège en automatisation IA",
          quote:
            "J’aide les entreprises à simplifier des processus complexes et à concevoir des systèmes d’automatisation qui améliorent l’efficacité et réduisent les goulots d’étranglement.",
          tags: {
            tag1: "Automatisation des processus",
            tag2: "Conception de workflows",
            tag3: "Analyse système",
          },
        },
        fikre: {
          name: "Fikremariam Mekonnen",
          role: "Ingénieur IA & intégrations",
          quote:
            "Je conçois des intégrations et des systèmes d’automatisation évolutifs, fiables et adaptés à des environnements métiers réels.",
          tags: {
            tag1: "Intégrations API",
            tag2: "Ingénierie d’automatisation",
            tag3: "Systèmes IA",
          },
        },
        dereje: {
          name: "Dereje Masresha",
          role: "Développeur full-stack & solutions IA",
          quote:
            "Je développe des outils d’automatisation intelligents et des expériences utilisateur fluides, propulsés par l’IA.",
          tags: {
            tag1: "Dév. full-stack",
            tag2: "Chatbots IA",
            tag3: "Plateformes d’automatisation",
          },
        },
      },
      testimonialsBlock: {
        title: "Ce que disent nos clients",
        subtitle:
          "Des résultats concrets d’entreprises qui ont transformé leurs opérations grâce à l’automatisation par IA.",
      },
      testimonials: {
        t1: {
          quote:
            "L’automatisation IA a réduit notre temps de réponse email de 70 % et a libéré l’équipe pour se concentrer sur des initiatives stratégiques.",
          author: "Sarah Johnson",
          role: "CEO, TechCorp",
        },
        t2: {
          quote:
            "L’automatisation des workflows nous a fait gagner 15 heures par semaine sur le traitement des factures. Le ROI a été immédiat.",
          author: "Michael Chen",
          role: "Responsable des opérations, InnovateLabs",
        },
        t3: {
          quote:
            "Notre chatbot IA gère désormais 80 % des demandes clients instantanément. La satisfaction client n’a jamais été aussi élevée.",
          author: "Lisa Rodriguez",
          role: "Directrice Customer Success, DataFlow",
        },
      },
      finalCta: {
        title: "Prêt à automatiser votre entreprise ?",
        subtitle:
          "Rejoignez les entreprises qui économisent déjà du temps et de l’argent grâce à l’automatisation IA. Obtenez votre consultation gratuite dès aujourd’hui.",
        button: "Démarrer votre projet d’automatisation",
      },
    },

    contact: {
      modal: {
        title: "Non implémenté",
        body: "Ceci est un modèle. La fonctionnalité backend n’est pas implémentée.",
        close: "Fermer",
      },
      hero: {
        title: "Automatisons quelque chose ensemble",
        subtitle:
          "Prêt à transformer votre entreprise avec l’automatisation IA ? Décrivez vos défis et nous créerons une solution sur mesure.",
      },
      form: {
        title: "Démarrer avec l’automatisation IA",
        fullName: "Nom complet *",
        email: "Adresse e-mail *",
        company: "Nom de l’entreprise *",
        task: "Tâche à automatiser *",
        sending: "Envoi...",
        submit: "Obtenir une consultation gratuite",
        placeholders: {
          name: "Jean Dupont",
          email: "jean@entreprise.com",
          company: "Votre Entreprise SAS",
          task: "Décrivez le processus à automatiser (ex. traitement des factures, support client, saisie de données, etc.)",
        },
      },
      sidebar: { title: "Nous contacter" },
      whyTitle: "Pourquoi nous choisir ?",
      why: {
        i1: "Consultation initiale gratuite",
        i2: "Solutions sur mesure",
        i3: "Support continu 24/7",
        i4: "Résultats prouvés",
      },
      info: {
        email: {
          icon: "ri-mail-line",
          title: "Écrivez-nous",
          content: "mfg@moolasisayjemere.com",
          description: "Pour toute demande de projet",
        },
        phone: {
          icon: "ri-phone-line",
          title: "Appelez-nous",
          content: "+352 691 833 894",
          description: "Lun-Ven 9h-18h (PST)",
        },
        visit: {
          icon: "ri-map-pin-line",
          title: "Rendez-nous visite",
          content: "San Francisco, CA",
          description: "Planifiez une rencontre",
        },
      },
      testimonialsBlock: {
        title: "Ce que disent nos clients",
        subtitle: "Des résultats concrets grâce à l’automatisation IA",
      },
      testimonials: {
        t1: {
          quote:
            "L’automatisation IA a réduit de 70 % notre temps de traitement des factures et a éliminé les erreurs. Le ROI a été visible dès le premier mois.",
          author: "Sarah Johnson",
          role: "Responsable des opérations",
        },
        t2: {
          quote:
            "Le chatbot traite automatiquement 90 % des demandes clients. L’équipe peut enfin se concentrer sur des initiatives stratégiques.",
          author: "Michael Chen",
          role: "CEO",
        },
        t3: {
          quote:
            "L’analytique prédictive nous a permis d’identifier des tendances 3 mois en avance, augmentant le chiffre d’affaires de 25 %.",
          author: "Emily Rodriguez",
          role: "VP Opérations",
        },
      },
    },

    about: {
      hero: {
        title: "À propos de notre mission",
        subtitle:
          "Nous aidons les entreprises à mettre en place l’IA pour automatiser des tâches, améliorer la décision et accélérer la croissance grâce à des solutions d’automatisation intelligente.",
      },
      stats: {
        businessesAutomated: "Entreprises automatisées",
        tasksProcessed: "Tâches traitées",
        workflowAccuracy: "Précision des processus",
        supportAvailable: "Support disponible",
      },
      vision: {
        title: "Notre vision pour l’avenir",
        p1: "Nous imaginons un monde où l’intelligence artificielle s’intègre naturellement à la créativité humaine pour libérer des niveaux inédits de productivité et d’innovation.",
        p2: "Notre mission est de démocratiser l’automatisation IA, en la rendant accessible à toutes les tailles d’entreprises tout en conservant l’humain au cœur de la croissance.",
        imageAlt: "Notre vision",
        tags: {
          tag1: "Innovation IA",
          tag2: "Optimisation des processus",
          tag3: "Design centré humain",
        },
      },
      journey: {
        title: "Notre parcours",
        subtitle:
          "D’une petite startup à une agence leader en automatisation IA : voici notre évolution.",
      },
      timeline: {
        "2020": {
          title: "Création de l’entreprise",
          description: "Une vision : démocratiser l’automatisation IA",
        },
        "2021": {
          title: "Premier grand client",
          description:
            "Automatisation réussie du traitement des factures pour une entreprise du Fortune 500",
        },
        "2022": {
          title: "Lancement du chatbot IA",
          description:
            "Lancement de notre plateforme de chatbot alimentée par l’IA",
        },
        "2023": {
          title: "Analytique prédictive",
          description:
            "Introduction de capacités avancées d’analytique prédictive",
        },
        "2024": {
          title: "Expansion internationale",
          description:
            "Déploiement de services pour accompagner des entreprises partout dans le monde",
        },
      },
      cta: {
        title: "Prêt à transformer votre entreprise ?",
        subtitle:
          "Rejoignez les entreprises qui ont déjà révolutionné leurs opérations grâce à l’automatisation IA.",
        button: "Démarrer",
      },
    },

    howItWorks: {
      hero: {
        title: "Comment ça marche",
        subtitle:
          "Un processus clair et concret pour passer de l’idée → à une automatisation IA opérationnelle (en toute sécurité et rapidement).",
      },
      process: {
        title: "Une mise en œuvre simple et fiable",
        subtitle:
          "Nous nous concentrons sur les opérations réelles — chatbots, intégrations et workflows qui réduisent le travail manuel et améliorent la vitesse.",
      },
      steps: {
        s1: {
          title: "Découvrir & Prioriser",
          description:
            "Nous analysons vos opérations, identifions les automatisations au meilleur ROI et convenons d’un plan réaliste.",
          d1: "Cartographie des workflows (ce qui se passe aujourd’hui)",
          d2: "Audit des données et des systèmes (ERP/CRM/e-mail/WhatsApp/API)",
          d3: "Priorisation des cas d’usage + estimation du ROI",
          d4: "Feuille de route + indicateurs de succès",
          imageAlt: "Découverte et priorisation",
        },
        s2: {
          title: "Construire & Intégrer",
          description:
            "Nous mettons en œuvre l’automatisation, connectons vos outils et définissons des garde-fous pour un fonctionnement fiable en production.",
          d1: "Création de chatbot / workflow (n8n, Make, Zapier, code sur mesure)",
          d2: "Intégrations (API, webhooks, base de données, ERP/CRM)",
          d3: "Tests : cas limites + permissions",
          d4: "Lancement + transfert à l’équipe",
          imageAlt: "Construire et intégrer",
        },
        s3: {
          title: "Surveiller & Améliorer",
          description:
            "Nous suivons les performances, affinons les réponses et les workflows, et améliorons continuellement les résultats.",
          d1: "Tableau de bord de monitoring & reporting",
          d2: "Mises à jour de la base de connaissances + ajustement des prompts",
          d3: "Optimisation des automatisations & réduction des erreurs",
          d4: "Support continu & itérations",
          imageAlt: "Surveiller et améliorer",
        },
      },

      features: {
        title: "Pourquoi ça fonctionne",
        subtitle:
          "Une mise en œuvre pragmatique, un ROI clair et des systèmes alignés sur le fonctionnement réel des entreprises.",
        f1: {
          title: "Démarrage rapide et structuré",
          description:
            "Périmètre clair + première automatisation opérationnelle rapidement (souvent 2 à 3 semaines).",
        },
        f2: {
          title: "Sécurisé dès la conception",
          description:
            "Contrôle d’accès, journaux d’audit et gestion sûre des données dès le premier jour.",
        },
        f3: {
          title: "Conçu autour de vos outils",
          description:
            "Nous intégrons ce que vous utilisez déjà — pas de reconstruction inutile.",
        },
        f4: {
          title: "Résultats mesurables",
          description:
            "Suivez le temps gagné, des réponses plus rapides, moins d’erreurs et un flux de données plus propre.",
        },
      },

      faqs: {
        title: "FAQ",
        subtitle: "Questions fréquentes avant de commencer",
        q1: {
          q: "De quoi avons-nous besoin pour démarrer ?",
          a: "Un bref appel + l’accès aux outils que vous souhaitez intégrer (e-mail/WhatsApp/CRM/ERP). Nous pouvons commencer par un audit léger.",
        },
        q2: {
          q: "Peut-on commencer petit ?",
          a: "Oui. Nous commençons souvent par un pilote (un workflow ou un chatbot), prouvons le ROI, puis étendons par phases.",
        },
        q3: {
          q: "Proposez-vous le multi-langue ?",
          a: "Oui — anglais, français, allemand et luxembourgeois (et plus si nécessaire).",
        },
      },

      cta: {
        title: "Prêt à automatiser plus intelligemment ?",
        subtitle:
          "Commencez par un audit d’automatisation gratuit et obtenez un plan clair en quelques jours.",
        primary: "Obtenir un audit gratuit",
        secondary: "Voir nos services",
      },
    },

    services: {
      hero: {
        title: "Nos services IA",
        subtitle:
          "Des solutions complètes d’automatisation IA conçues pour transformer vos opérations et accélérer votre croissance",
      },
      gridCta: { learnMore: "En savoir plus" },

      // ✅ NEW
      recommendedStartingPoint: "Point de départ recommandé",

      modal: {
        keyFeatures: "Fonctionnalités clés",
        expectedBenefits: "Bénéfices attendus",
        getStarted: "Commencer",
        close: "Fermer",
        whatItIsLabel: "Qu’est-ce que c’est :",
        coreFeaturesLabel: "Fonctionnalités principales :",
        recommendedAddOnsLabel: "Extensions recommandées",
        impactLabel: "Impact",
      },

      list: {
        s1: {
          title: "Automatisation des workflows par IA",
          description:
            "Rationalisez vos processus métier grâce à une automatisation intelligente qui apprend et s’adapte à vos schémas de travail.",
          benefits:
            "Réduisez le travail manuel de 80 % et augmentez la précision jusqu’à 95 %",
          f1: "Process Mining",
          f2: "Décision automatisée",
          f3: "Optimisation des workflows",
          f4: "Monitoring en temps réel",
          imageAlt: "Automatisation des workflows par IA",

          whatItIs:
            "Automatisation pilotée par l’IA qui apprend de vos workflows et améliore continuellement l’exécution des tâches.",
          howItHelps: {
            h1: "Élimine les tâches manuelles répétitives",
            h2: "Améliore la vitesse et la cohérence",
            h3: "Permet de scaler sans augmenter les effectifs",
          },
          recommendedAddOns: {
            r1: "RPA (Automatisation robotisée des processus)",
            r2: "Intégrations API & systèmes (ERP, CRM, bases de données)",
            r3: "Gestion des exceptions & workflows avec validation humaine",
            r4: "Automatisation de la conformité et des audits",
          },
        },

        s2: {
          title: "Chatbots alimentés par l’IA",
          description:
            "Déployez des agents conversationnels intelligents pour un support client 24/7 avec des interactions naturelles.",
          benefits:
            "Traitez jusqu’à 90 % des demandes instantanément et améliorez la satisfaction client",
          f1: "Traitement du langage naturel (NLP)",
          f2: "Support multilingue",
          f3: "Prêt à intégrer",
          f4: "Capacités d’apprentissage",
          imageAlt: "Chatbots IA",

          whatItIs:
            "IA conversationnelle qui comprend l’intention des utilisateurs et fournit des réponses rapides et précises sur plusieurs canaux.",
          howItHelps: {
            h1: "Support client et interne 24/7",
            h2: "Temps de réponse considérablement réduits",
            h3: "Baisse des coûts de support",
          },
          recommendedAddOns: {
            r1: "Voice bots pour centres d’appels",
            r2: "Intégration CRM et systèmes de tickets",
            r3: "Bots de vente et qualification de leads",
            r4: "Assistants basés sur une base de connaissances interne",
          },
        },

        s3: {
          title: "Optimisation des processus",
          description:
            "Analysez et améliorez vos processus existants grâce à des insights et recommandations basés sur l’IA.",
          benefits:
            "Améliorez l’efficacité jusqu’à 60 % et réduisez significativement les coûts opérationnels",
          f1: "Analytique de performance",
          f2: "Détection des goulots d’étranglement",
          f3: "Allocation des ressources",
          f4: "Amélioration continue",
          imageAlt: "Optimisation des processus",

          whatItIs:
            "Analyse pilotée par l’IA de la manière dont le travail circule réellement dans votre organisation.",
          howItHelps: {
            h1: "Identifie les inefficacités cachées",
            h2: "Optimise l’utilisation des ressources",
            h3: "Réduit les retards et les coûts opérationnels",
          },
          recommendedAddOns: {
            r1: "Recommandations de réingénierie des processus",
            r2: "Tableaux de bord KPI",
            r3: "Simulation de l’impact des changements",
            r4: "Alignement des workflows inter-départements",
          },
        },

        s4: {
          title: "Analytique prédictive",
          description:
            "Exploitez le machine learning pour prévoir les tendances, identifier les opportunités et prendre de meilleures décisions.",
          benefits:
            "Augmentez la précision des prévisions de 85 % et identifiez les opportunités plus tôt",
          f1: "Prévision des tendances",
          f2: "Évaluation des risques",
          f3: "Analyse de marché",
          f4: "Planification stratégique",
          imageAlt: "Analytique prédictive",

          whatItIs:
            "Modèles de machine learning analysant les données historiques et en temps réel pour prédire les résultats futurs.",
          howItHelps: {
            h1: "Anticipe les risques et opportunités",
            h2: "Améliore la précision de la planification",
            h3: "Permet des décisions proactives",
          },
          recommendedAddOns: {
            r1: "Prévision de la demande",
            r2: "Maintenance prédictive",
            r3: "Modélisation du comportement client",
            r4: "Scénarios et simulations",
          },
        },

        s5: {
          title: "Stratégie & conseil en IA",
          description:
            "Une feuille de route claire pour savoir par où commencer avec l’IA et maximiser le ROI.",
          benefits:
            "Avancez plus vite avec clarté, moins de risques et des investissements ciblés",
          f1: "Évaluation de la maturité IA",
          f2: "Roadmap d’automatisation et priorisation",
          f3: "Analyse ROI et faisabilité",
          f4: "Gouvernance et éthique IA",
          imageAlt: "Stratégie et conseil en IA",

          whatItIs:
            "Un accompagnement stratégique pour identifier les meilleures opportunités IA et définir le bon plan d’implémentation.",
          howItHelps: {
            h1: "Clarifie les opportunités à fort ROI",
            h2: "Structure un déploiement progressif et maîtrisé",
            h3: "Réduit les risques grâce à la gouvernance",
          },
          recommendedAddOns: {
            r1: "Ateliers exécutifs et alignement des parties prenantes",
            r2: "Audit de la préparation des données",
            r3: "Sélection de pilotes et indicateurs de succès",
            r4: "Accompagnement du changement",
          },
        },
      },

      why: {
        title: "Pourquoi choisir nos solutions IA ?",
        subtitle:
          "Technologie de pointe + expertise humaine pour des résultats concrets",
        fast: {
          title: "Implémentation rapide",
          description:
            "Déployez en quelques semaines grâce à une méthodologie éprouvée",
        },
        secure: {
          title: "Sécurisé & fiable",
          description: "Sécurité entreprise et disponibilité 99,9 %",
        },
        support: {
          title: "Support 24/7",
          description: "Une équipe dédiée disponible à tout moment",
        },
      },
      cta: {
        title: "Prêt à démarrer ?",
        subtitle:
          "Discutons de la transformation de vos opérations grâce à l’IA",
        primary: "Obtenir une consultation gratuite",
        secondary: "Comment ça marche",
      },
    },

    legal: {
      privacy: {
        title: "Politique de confidentialité",
        sections: {
          metaDate: "Date d’entrée en vigueur : 22 décembre 2025",
          metaCompany: "Lux AI Consultation & Automation",
          metaDomain: "luxaiautomation.com",
          downloadPdf: "Télécharger le PDF",
          contactLabel: "Email :",
          emailCta: "Nous contacter par email",

          s1t: "1. Introduction",
          s1b: "Lux AI Consultation & Automation, basée au Luxembourg (UE), accorde une grande importance à votre vie privée. Cette Politique de confidentialité explique comment nous traitons vos informations lorsque vous utilisez notre site web. Nous nous engageons à protéger vos données personnelles conformément au Règlement Général sur la Protection des Données (RGPD).",

          s2t: "2. Informations que nous collectons",
          s2b1: "Nous collectons des informations personnelles uniquement lorsque vous nous contactez directement. Si vous utilisez notre formulaire de contact, nous pouvons collecter votre nom, votre adresse e-mail et le contenu de votre message. Ces informations sont utilisées exclusivement pour répondre à votre demande et ne sont jamais vendues ni partagées avec des tiers.",
          s2b2: "Nous n’utilisons pas de cookies d’analyse, de suivi ou de publicité. Seuls des cookies essentiels sont utilisés afin d’assurer le bon fonctionnement du site, comme la mémorisation de votre préférence de thème (clair ou sombre).",

          s3t: "3. Utilisation de vos informations",
          s3b: "Toute information que vous fournissez est utilisée exclusivement pour répondre à votre demande ou requête. Nous n’utilisons pas vos données à des fins marketing et ne les partageons pas avec des tiers.",

          s4t: "4. Cookies",
          s4b: "Nous utilisons uniquement des cookies essentiels nécessaires au bon fonctionnement du site web. Ces cookies ne suivent pas votre activité. Vous pouvez désactiver les cookies dans les paramètres de votre navigateur, mais certaines fonctionnalités du site peuvent ne pas fonctionner correctement.",

          s5t: "5. Sécurité des données",
          s5b: "Nous mettons en œuvre des mesures techniques et organisationnelles raisonnables afin de protéger vos données personnelles contre tout accès non autorisé, perte ou utilisation abusive. Toutefois, aucune méthode de transmission ou de stockage des données n’est totalement sécurisée.",

          s6t: "6. Liens vers des sites tiers",
          s6b: "Notre site web peut contenir des liens vers des sites web tiers. LuxAI Automation n’est pas responsable des pratiques de confidentialité ni du contenu de ces sites externes. Nous vous encourageons à consulter leurs politiques de confidentialité avant de fournir des données personnelles.",

          s7t: "7. Modifications de cette politique",
          s7b: "Nous pouvons mettre à jour cette Politique de confidentialité de temps à autre. Toute modification sera publiée sur cette page avec une date d’entrée en vigueur révisée. La poursuite de l’utilisation du site vaut acceptation de la politique mise à jour.",

          s8t: "8. Vos droits et informations de contact",
          s8b: "Conformément au RGPD, vous disposez du droit d’accès, de rectification ou de suppression de vos données personnelles. Pour toute question ou demande relative à la confidentialité, veuillez nous contacter à l’adresse contact@luxaiautomation.com.",
          end: "En utilisant ce site web, vous reconnaissez et acceptez cette Politique de confidentialité.",
        },
      },
      terms: {
        title: "Conditions générales",
        sections: {
          metaDate: "Date d’entrée en vigueur : 22 décembre 2025",
          metaCompany: "Lux AI Consultancy & Automation",
          metaDomain: "luxaiautomation.com",

          downloadPdf: "Télécharger le PDF",

          s1t: "1. Propriété et acceptation des conditions",
          s1b: "Ce site web et son contenu sont détenus et exploités par Lux AI Consultancy & Automation. En accédant à ce site ou en l’utilisant, vous acceptez d’être lié par les présentes Conditions générales. Si vous n’êtes pas d’accord, vous devez cesser d’utiliser le site.",

          s2t: "2. Droit d’utilisation du site web",
          s2b: "Lux AI Consultancy & Automation vous accorde un droit limité, non exclusif et non transférable d’accéder à ce site web et de l’utiliser uniquement à des fins légales, personnelles et professionnelles d’information. Ce droit n’inclut pas la revente ni l’exploitation commerciale du site ou de son contenu.",

          s3t: "3. Propriété intellectuelle",
          s3b: "L’ensemble du contenu de ce site web, y compris les textes, visuels, logos, mises en page et le code, est la propriété de Lux AI Consultancy & Automation ou de ses concédants de licence et est protégé par les lois sur la propriété intellectuelle. Vous ne pouvez pas copier, reproduire, distribuer, modifier ou afficher publiquement tout contenu sans autorisation écrite préalable.",

          s4t: "4. Utilisation interdite",
          s4b: "Vous ne pouvez pas utiliser de systèmes automatisés, d’outils de scraping, de robots ou toute autre méthode pour accéder, surveiller ou copier le contenu du site web. Vous ne pouvez pas tenter d’interférer avec le fonctionnement, la sécurité ou l’infrastructure du site, ni utiliser le site à des fins illégales ou nuisibles.",

          s5t: "5. Exactitude et disponibilité du contenu",
          s5b: "Le contenu de ce site web est fourni uniquement à titre informatif général. Bien que nous nous efforcions de maintenir des informations exactes et à jour, Lux AI Consultancy & Automation ne garantit ni l’exhaustivité, ni l’exactitude, ni la disponibilité du contenu et se réserve le droit de le modifier ou de le supprimer à tout moment.",

          s6t: "6. Exclusion de garanties",
          s6b: "Le site web et son contenu sont fournis « en l’état » et « selon disponibilité ». Lux AI Consultancy & Automation décline toute garantie, expresse ou implicite, y compris les garanties d’exactitude, d’adéquation à un usage particulier et de non-violation des droits.",

          s7t: "7. Limitation de responsabilité",
          s7b: "Dans la mesure maximale autorisée par la loi, Lux AI Consultancy & Automation ne saurait être tenue responsable de tout dommage direct, indirect, accessoire, consécutif ou punitif résultant de l’utilisation ou de l’impossibilité d’utiliser ce site web ou son contenu.",

          s8t: "8. Liens vers des sites tiers",
          s8b: "Ce site web peut contenir des liens vers des sites web tiers. Ces liens sont fournis uniquement à titre de commodité. Lux AI Consultancy & Automation n’exerce aucun contrôle et n’est pas responsable du contenu, des politiques ou des pratiques de ces sites tiers.",

          s9t: "9. Commentaires et soumissions",
          s9b: "Tout commentaire, idée ou suggestion que vous soumettez à LuxAI Automation via ce site web sera traité comme non confidentiel et pourra être utilisé par Lux AI Consultancy & Automation sans restriction ni compensation.",

          s10t: "10. Modifications des présentes conditions",
          s10b: "Lux AI Consultancy & Automation se réserve le droit de mettre à jour ou de modifier les présentes Conditions générales à tout moment. Les modifications prennent effet dès leur publication. L’utilisation continue du site web vaut acceptation des conditions révisées.",

          s11t: "11. Droit applicable",
          s11b: "Les présentes Conditions générales sont régies par les lois applicables, sans tenir compte des règles relatives aux conflits de lois.",

          contactLabel: "Email :",
          emailCta: "Nous contacter",

          end: "Si vous avez des questions concernant ces Conditions générales, veuillez nous contacter.",
        },
      },
    },
  },

  de: {
    common: {
      brand: "AI Automation",
      nav: {
        home: "Start",
        services: "Services",
        howItWorks: "So funktioniert’s",
        about: "Über uns",
        contact: "Kontakt",
        privacy: "Datenschutz",
        terms: "Nutzungsbedingungen",
      },
      buttons: {
        learnMore: "Mehr erfahren",
        close: "Schließen",
        getStarted: "Loslegen",
        viewServices: "Services ansehen",
        getFreeAudit: "Kostenlosen Audit erhalten",
        getFreeConsultation: "Kostenlose Beratung",
      },
      footer: {
        brandShort: "AI",
        brandName: "Lux AI Consultancy & Automation",
        description:
          "Wir transformieren Unternehmen durch intelligente Automatisierung. Wir helfen Firmen, KI-Lösungen einzuführen, um Effizienz zu steigern, Kosten zu senken und smarter zu skalieren.",
        quickLinks: "Schnellzugriff",
        aboutUs: "Über uns",
        services: "Services",
        useCases: "Anwendungsfälle",
        howItWorks: "So funktioniert’s",
        contactInfo: "Kontakt",
        email: "mfg@moolasisayjemere.com",
        emailRaw: "mfg@moolasisayjemere.com",
        phone: "+352 691 833 894",
        phoneRaw: "+352691833894",
        location: "Belvaux, Luxumbourg",
        socialTitle: "Verbinden Sie sich mit uns",
        rights: "Alle Rechte vorbehalten.",
        privacy: "Datenschutzerklärung",
        terms: "Nutzungsbedingungen",
      },
    },

    home: {
      hero: {
        line1: "Automatisieren Sie Ihr",
        line2: "Business mit",
        line3: "KI-gestützten Lösungen",
        subtitle:
          "Steigern Sie Effizienz, senken Sie Kosten und skalieren Sie smarter mit KI. Transformieren Sie Ihre Workflows mit intelligenter Automatisierung – rund um die Uhr.",
        ctaAudit: "Kostenlosen Automatisierungs-Audit erhalten",
        ctaHow: "So funktioniert’s",
        imageAlt: "Illustration zur KI-Automatisierung",
      },
      stats: {
        businessesAutomated: "Automatisierte Unternehmen",
        workflowAccuracy: "Workflow-Genauigkeit",
        automatedOperations: "Automatisierter Betrieb",
      },
      trusted: {
        title: "Vertrauen von Teams, die ihre Abläufe mit KI automatisieren",
        subtitle:
          "Wir entwickeln und integrieren KI-gestützte Automatisierungssysteme, um reale Geschäftsprozesse sicher, zuverlässig und skalierbar zu modernisieren.",
        outcomes:
          "Typische Ergebnisse: weniger manuelle Arbeit, schnellerer Support, saubere Datenflüsse und administrierbare Abläufe.",
      },

      capabilities: {
        publicChatbots: {
          name: "Öffentliche Website-Chatbots",
          desc: "Lead-Erfassung, FAQs und Support rund um die Uhr",
        },
        protectedChatbots: {
          name: "Geschützte Chatbots",
          desc: "KI-Assistenten mit authentifiziertem Benutzerzugang",
        },
        adminKb: {
          name: "Admin-Wissensdatenbank",
          desc: "Kundengesteuerte KI-Inhalte, Updates und Antwortlogik",
        },
        integrationAutomation: {
          name: "Systemintegration & Automatisierung",
          desc: "WhatsApp, E-Mail, APIs, Webhooks, n8n, Make, Zapier",
        },
      },

      servicesBlock: {
        title: "Transformieren Sie Ihre Geschäftsabläufe",
        subtitle:
          "Von Workflow-Automatisierung bis hin zu intelligenten Chatbots liefern wir KI-Lösungen mit messbarem Geschäftsnutzen.",
        cta: "Alle Services ansehen",
      },

      services: {
        digitalStrategy: {
          title: "KI-Strategie & Beratung",
          description: "Ein klarer Einstieg in Ihre KI-Transformation",
          detail:
            "Wir identifizieren die wirkungsvollsten KI-Potenziale, priorisieren Automatisierungen und erstellen eine realistische Roadmap mit messbarem ROI.",
          bestFor:
            "Ideal für: Führungsteams, KI-Einsteiger, komplexe Organisationen",
        },

        workflowAutomation: {
          title: "KI-Workflow-Automatisierung",
          description: "Automatisierung repetitiver Aufgaben und Prozesse",
          detail:
            "Wir automatisieren regelbasierte und zeitaufwändige Workflows mit KI-Systemen, die sich an Ihre tatsächlichen Abläufe anpassen.",
          bestFor:
            "Ideal für: Operations, Finance, HR, Industrie, Logistik und Backoffice",
        },

        chatbots: {
          title: "KI-Chatbots",
          description: "Intelligente Automatisierung für Support & Service",
          detail:
            "Unsere KI-Chatbots bearbeiten Anfragen über Websites, Portale, WhatsApp und interne Systeme – mit Eskalation bei Bedarf.",
          bestFor:
            "Ideal für: Kundenservice, Vertrieb, Onboarding, IT- und HR-Teams",
        },

        processOptimization: {
          title: "Prozessoptimierung",
          description: "Workflows analysieren und verbessern",
          detail:
            "Wir nutzen KI-Analysen, um Ineffizienzen zu identifizieren und Prozesse gezielt zu optimieren.",
          bestFor:
            "Ideal für: Prozessverantwortliche, Effizienzprogramme, Kostensenkung",
        },

        predictiveAnalytics: {
          title: "Predictive Analytics",
          description: "Datenbasierte Prognosen für bessere Entscheidungen",
          detail:
            "Wir machen aus Daten verwertbare Prognosen, um Risiken frühzeitig zu erkennen.",
          bestFor:
            "Ideal für: Management, Planung, Finance, Vertrieb und Supply Chain",
        },
      },

      platformsBlock: {
        title: "Plattformen, die wir entwickeln und modernisieren",
        subtitle:
          "Neben Automatisierung bauen wir zentrale Business-Plattformen – integriert, sicher und bereit für KI.",
      },

      platforms: {
        erp: {
          title: "ERP-Systeme",
          desc: "Moderne ERP-Lösungen mit rollenbasierten Modulen, Freigaben, Reporting und sauberem Datenfluss.",
        },
        customApps: {
          title: "Individuelle Business-Apps",
          desc: "Maßgeschneiderte interne Tools und Portale – sicher, skalierbar und wartungsfreundlich.",
        },
        ecommerce: {
          title: "E-Commerce-Plattformen",
          desc: "Bestellabwicklung, Lagerabgleich, Automatisierung und KI-gestützter Kundenservice.",
        },
        websites: {
          title: "Websites & Kundenportale",
          desc: "Conversion-starke Websites und geschützte Portale mit Chatbots und Wissensdatenbanken.",
        },
      },

      // trusted: {
      //   title:
      //     "Vertrauenswürdig für Teams, die ihre Abläufe mit KI-Automatisierung transformieren",
      //   subtitle:
      //     "Wir konzipieren und entwickeln KI-Automatisierung — von Chatbots bis hin zu ERP-Systemen und individuellen Anwendungen — damit Ihre Abläufe schneller, effizienter und sicherer funktionieren.",
      //   outcomes:
      //     "Typische Ergebnisse: weniger manuelle Arbeit, schnellerer Support, sauberere Datenflüsse, admin-kontrollierte Abläufe.",
      // },
      // capabilities: {
      //   publicChatbots: {
      //     name: "Website-Chatbots (öffentlich)",
      //     desc: "Lead-Erfassung + FAQs 24/7",
      //   },
      //   protectedChatbots: {
      //     name: "Geschützte Chatbots",
      //     desc: "Authentifizierter Benutzerzugang",
      //   },
      //   adminKb: {
      //     name: "Admin-KB-Management",
      //     desc: "Konsistente Updates & Kontrolle",
      //   },
      //   erpApps: {
      //     name: "ERP & Business-Web-Apps",
      //     desc: "Backoffice + Reporting",
      //   },
      //   ecommerceInventory: {
      //     name: "E-Commerce & Lager",
      //     desc: "Bestellungen + Bestandsverwaltung",
      //   },
      //   integrationAutomation: {
      //     name: "Integration & Automatisierung",
      //     desc: "APIs, Webhooks, n8n/Make/Zapier",
      //   },
      // },

      // servicesBlock: {
      //   title: "Transformieren Sie Ihre Geschäftsprozesse",
      //   subtitle:
      //     "Von Workflow-Automatisierung bis hin zu intelligenten Chatbots liefern wir KI-Lösungen, die manuelle Arbeit reduzieren, die Genauigkeit verbessern und messbare Geschäftsergebnisse erzielen.",
      //   cta: "Alle Services ansehen",
      // },

      // services: {
      //   workflowAutomation: {
      //     title: "KI-Workflow-Automatisierung",
      //     description: "Wiederkehrende Aufgaben und Prozesse optimieren",
      //     detail:
      //       "Wir automatisieren zeitaufwändige, regelbasierte und repetitive Workflows mit KI-Systemen, die sich an Ihr Business anpassen. Das reduziert Fehler, beschleunigt Abläufe und schafft Kapazität für wertvollere Aufgaben.",
      //     bestFor:
      //       "Ideal für: Operations, Finance, HR, Manufacturing, Logistik, Backoffice-Teams",
      //   },
      //   chatbots: {
      //     title: "KI-Chatbots",
      //     description: "Intelligente Automatisierung im Kundenservice",
      //     detail:
      //       "Unsere KI-Chatbots übernehmen Gespräche auf Websites, Apps und Messaging-Plattformen. Sie verstehen natürliche Sprache, lösen Standardfragen sofort und eskalieren komplexe Fälle.",
      //     bestFor:
      //       "Ideal für: Customer Support, Sales, Onboarding, interne IT-Helpdesks",
      //   },
      //   processOptimization: {
      //     title: "Prozessoptimierung",
      //     description: "Workflows analysieren und verbessern",
      //     detail:
      //       "Wir nutzen KI und Datenanalyse, um Ineffizienzen sichtbar zu machen, Engpässe zu finden und schnellere, smartere Abläufe zu empfehlen.",
      //     bestFor:
      //       "Ideal für: Prozessverbesserung, Operations-Leitung, Kostenreduktion",
      //   },
      //   predictiveAnalytics: {
      //     title: "Predictive Analytics",
      //     description: "Datenbasierte Insights für bessere Entscheidungen",
      //     detail:
      //       "Wir machen aus Ihren Daten verwertbare Prognosen, damit Sie Trends früher erkennen, Risiken reduzieren und proaktiv entscheiden.",
      //     bestFor:
      //       "Ideal für: Führungskräfte, Planung, Finance, Sales, Supply Chain",
      //   },

      //   // ✅ NEW (requested)
      //   // digitalSystems: {
      //   //   title: "Digitale Systeme & Business-Plattformen",
      //   //   description:
      //   //     "Moderne ERP-, E-Commerce- und individuelle Business-Apps entwickeln",
      //   //   detail:
      //   //     "Wir entwickeln die Systeme, die Ihr Geschäft tragen: ERP-Portale, E-Commerce-Backoffice, Kundendashboards und interne Tools. Mit sauberen Integrationen, automatisierten Workflows und sicherem Rollenmodell.",
      //   //   bestFor:
      //   //     "Ideal für: ERP-Modernisierung, operative Dashboards, Order & Inventory, interne Tools, Kundenportale",
      //   // },
      // },

      // // ✅ NEW (requested)
      // platformsBlock: {
      //   title: "Plattformen, die wir bauen & modernisieren",
      //   subtitle:
      //     "Von ERP bis E-Commerce und internen Tools: sichere, skalierbare Plattformen mit sauberen Integrationen und automatisierungsfähigen Workflows.",
      // },
      // platforms: {
      //   erp: {
      //     title: "ERP-Systeme",
      //     desc: "Modernisieren Sie Abläufe mit Rollenmodulen, Reporting, Freigaben und sauberem Datenfluss.",
      //   },
      //   customApps: {
      //     title: "Individuelle Business-Apps",
      //     desc: "Portale & interne Tools passend zu Ihrem Workflow—schnell, sicher und wartbar.",
      //   },
      //   ecommerce: {
      //     title: "E-Commerce-Plattformen",
      //     desc: "Bestellungen, Lager-Sync, Fulfillment-Automatisierung und Self-Service mit KI-Support.",
      //   },
      //   websites: {
      //     title: "Websites & Kundenportale",
      //     desc: "Konvertierende Websites + authentifizierte Portale—Chatbots, Knowledge Base und Admin-Content.",
      //   },
      // },

      teamBlock: {
        title: "Unser Team",
        subtitle:
          "Die Menschen hinter unseren KI-Automationslösungen – mit Fokus auf effiziente Workflows und echte Business-Resultate.",
      },
      team: {
        molla: {
          name: "Molla Sisay",
          role: "KI-Automation Strategist",
          quote:
            "Ich helfe Unternehmen, komplexe Prozesse zu vereinfachen und Automationssysteme zu entwerfen, die Effizienz steigern und Engpässe reduzieren.",
          tags: {
            tag1: "Prozessautomatisierung",
            tag2: "Workflow-Design",
            tag3: "Systemanalyse",
          },
        },
        fikre: {
          name: "Fikremariam Mekonnen",
          role: "KI- & Integrationsingenieur",
          quote:
            "Ich entwickle skalierbare Integrationen und Automationssysteme, die in realen Business-Umgebungen zuverlässig funktionieren.",
          tags: {
            tag1: "API-Integrationen",
            tag2: "Automation Engineering",
            tag3: "KI-Systeme",
          },
        },
        dereje: {
          name: "Dereje Masresha",
          role: "Full-Stack & KI-Lösungsentwickler",
          quote:
            "Ich baue intelligente Automations-Tools und nahtlose User Experiences – unterstützt durch KI.",
          tags: {
            tag1: "Full-Stack",
            tag2: "KI-Chatbots",
            tag3: "Automationsplattformen",
          },
        },
      },
      testimonialsBlock: {
        title: "Was unsere Kunden sagen",
        subtitle:
          "Echte Ergebnisse von Unternehmen, die ihre Abläufe mit KI-Automatisierung transformiert haben.",
      },
      testimonials: {
        t1: {
          quote:
            "KI-Automatisierung hat unsere E-Mail-Antwortzeit um 70 % reduziert und dem Team Raum für strategische Aufgaben gegeben.",
          author: "Sarah Johnson",
          role: "CEO, TechCorp",
        },
        t2: {
          quote:
            "Die Workflow-Automatisierung spart uns 15 Stunden pro Woche bei der Rechnungsverarbeitung. Der ROI war sofort sichtbar.",
          author: "Michael Chen",
          role: "Operations Manager, InnovateLabs",
        },
        t3: {
          quote:
            "Unser KI-Chatbot beantwortet 80 % der Kundenanfragen sofort. Die Kundenzufriedenheit ist so hoch wie nie.",
          author: "Lisa Rodriguez",
          role: "Customer Success Director, DataFlow",
        },
      },
      finalCta: {
        title: "Bereit, Ihr Business zu automatisieren?",
        subtitle:
          "Schließen Sie sich Unternehmen an, die bereits Zeit und Kosten mit KI-Automatisierung sparen. Jetzt kostenlose Beratung sichern.",
        button: "Automatisierung starten",
      },
    },

    contact: {
      modal: {
        title: "Nicht implementiert",
        body: "Dies ist ein Template. Backend-Funktionalität ist nicht implementiert.",
        close: "Schließen",
      },
      hero: {
        title: "Lassen Sie uns gemeinsam automatisieren",
        subtitle:
          "Bereit, Ihr Business mit KI-Automatisierung zu transformieren? Beschreiben Sie Ihre Herausforderungen – wir erstellen eine maßgeschneiderte Lösung.",
      },
      form: {
        title: "Starten Sie mit KI-Automatisierung",
        fullName: "Vollständiger Name *",
        email: "E-Mail-Adresse *",
        company: "Firmenname *",
        task: "Zu automatisierende Aufgabe *",
        sending: "Wird gesendet...",
        submit: "Kostenlose Beratung erhalten",
        placeholders: {
          name: "Max Mustermann",
          email: "max@firma.com",
          company: "Ihre Firma GmbH",
          task: "Beschreiben Sie den Prozess, den Sie automatisieren möchten (z. B. Rechnungsverarbeitung, Support, Datenerfassung usw.)",
        },
      },
      sidebar: { title: "Kontakt" },
      whyTitle: "Warum wir?",
      why: {
        i1: "Kostenloses Erstgespräch",
        i2: "Individuelle Lösungen",
        i3: "24/7 Support",
        i4: "Nachweisliche Erfolge",
      },
      info: {
        email: {
          icon: "ri-mail-line",
          title: "E-Mail",
          content: "mfg@moolasisayjemere.com",
          description: "Kontakt für Projektanfragen",
        },
        phone: {
          icon: "ri-phone-line",
          title: "Telefon",
          content: "+352 691 833 894",
          description: "Mo–Fr 9–18 Uhr (PST)",
        },
        visit: {
          icon: "ri-map-pin-line",
          title: "Besuchen",
          content: "San Francisco, CA",
          description: "Termin vor Ort vereinbaren",
        },
      },
      testimonialsBlock: {
        title: "Was unsere Kunden sagen",
        subtitle: "Echte Ergebnisse durch KI-Automatisierung",
      },
      testimonials: {
        t1: {
          quote:
            "KI-Automatisierung hat unsere Rechnungsverarbeitung um 70 % beschleunigt und Fehler vollständig eliminiert. Der ROI war bereits im ersten Monat sichtbar.",
          author: "Sarah Johnson",
          role: "Operations Manager",
        },
        t2: {
          quote:
            "Der Chatbot bearbeitet 90 % der Kundenanfragen automatisch. Das Team kann sich wieder auf strategische Themen konzentrieren.",
          author: "Michael Chen",
          role: "CEO",
        },
        t3: {
          quote:
            "Predictive Analytics hat uns Trends 3 Monate früher erkennen lassen. Das brachte einen Wettbewerbsvorteil und 25 % Umsatzplus.",
          author: "Emily Rodriguez",
          role: "VP Operations",
        },
      },
    },

    about: {
      hero: {
        title: "Über unsere Mission",
        subtitle:
          "Wir helfen Unternehmen, KI einzusetzen, um Aufgaben zu automatisieren, Entscheidungen zu verbessern und Wachstum durch intelligente Automatisierung zu beschleunigen.",
      },
      stats: {
        businessesAutomated: "Automatisierte Unternehmen",
        tasksProcessed: "Verarbeitete Aufgaben",
        workflowAccuracy: "Workflow-Genauigkeit",
        supportAvailable: "Support verfügbar",
      },
      vision: {
        title: "Unsere Vision für die Zukunft",
        p1: "Wir sehen eine Zukunft, in der KI nahtlos mit menschlicher Kreativität zusammenarbeitet – für neue Levels an Produktivität und Innovation.",
        p2: "Unsere Mission ist es, KI-Automatisierung zu demokratisieren und für Unternehmen jeder Größe zugänglich zu machen – ohne den menschlichen Faktor zu verlieren.",
        imageAlt: "Unsere Vision",
        tags: {
          tag1: "KI-Innovation",
          tag2: "Prozessoptimierung",
          tag3: "Human-Centered Design",
        },
      },
      journey: {
        title: "Unsere Reise",
        subtitle:
          "Vom kleinen Startup zur führenden KI-Automationsagentur – so sind wir gewachsen.",
      },
      timeline: {
        "2020": {
          title: "Gründung",
          description:
            "Start mit der Vision, KI-Automatisierung zu demokratisieren",
        },
        "2021": {
          title: "Erster Großkunde",
          description:
            "Rechnungsverarbeitung für ein Fortune-500-Unternehmen automatisiert",
        },
        "2022": {
          title: "KI-Chatbot Launch",
          description: "Start unserer KI-Chatbot-Plattform",
        },
        "2023": {
          title: "Predictive Analytics",
          description:
            "Einführung fortschrittlicher Predictive-Analytics-Funktionen",
        },
        "2024": {
          title: "Globale Expansion",
          description: "Weltweite Ausweitung der Dienstleistungen",
        },
      },
      cta: {
        title: "Bereit für den nächsten Schritt?",
        subtitle:
          "Schließen Sie sich Unternehmen an, die ihre Abläufe bereits mit KI-Automatisierung revolutioniert haben.",
        button: "Jetzt starten",
      },
    },

    howItWorks: {
      hero: {
        title: "So funktioniert’s",
        subtitle:
          "Ein klarer, praxisnaher Prozess, der Sie von der Idee → zur funktionierenden KI-Automatisierung führt (sicher und schnell).",
      },
      process: {
        title: "Einfache, zuverlässige Umsetzung",
        subtitle:
          "Wir fokussieren echte Abläufe — Chatbots, Integrationen und Workflows, die manuelle Arbeit reduzieren und Prozesse beschleunigen.",
      },
      steps: {
        s1: {
          title: "Entdecken & Priorisieren",
          description:
            "Wir verstehen Ihre Abläufe, identifizieren Automatisierungen mit dem höchsten ROI und vereinbaren einen realistischen Plan.",
          d1: "Workflow-Mapping (was heute passiert)",
          d2: "Daten- & Systemaudit (ERP/CRM/E-Mail/WhatsApp/APIs)",
          d3: "Use-Case-Priorisierung + ROI-Schätzung",
          d4: "Roadmap + Erfolgskennzahlen",
          imageAlt: "Entdecken und priorisieren",
        },
        s2: {
          title: "Bauen & Integrieren",
          description:
            "Wir implementieren die Automatisierung, verbinden Ihre Tools und setzen Guardrails, damit es in Produktion zuverlässig läuft.",
          d1: "Chatbot-/Workflow-Build (n8n, Make, Zapier, Custom Code)",
          d2: "Integrationen (APIs, Webhooks, DB, ERP/CRM)",
          d3: "Tests: Edge Cases + Berechtigungen",
          d4: "Launch + Team-Übergabe",
          imageAlt: "Bauen und integrieren",
        },
        s3: {
          title: "Überwachen & Verbessern",
          description:
            "Wir tracken die Performance, optimieren Antworten und Workflows und verbessern die Ergebnisse kontinuierlich.",
          d1: "Monitoring- & Reporting-Dashboard",
          d2: "Knowledge-Base-Updates + Prompt-Tuning",
          d3: "Automatisierungs-Optimierung & Fehlerreduktion",
          d4: "Laufender Support & Iterationen",
          imageAlt: "Überwachen und verbessern",
        },
      },

      features: {
        title: "Warum das funktioniert",
        subtitle:
          "Pragmatische Umsetzung, klarer ROI und Systeme, die zu realen Geschäftsprozessen passen.",
        f1: {
          title: "Schneller, strukturierter Start",
          description:
            "Klarer Scope + erste funktionierende Automatisierung schnell (oft 2–3 Wochen).",
        },
        f2: {
          title: "Sicherheit by Design",
          description:
            "Zugriffskontrolle, Audit-Logs und sichere Datenverarbeitung von Tag eins an.",
        },
        f3: {
          title: "Rund um Ihre Tools gebaut",
          description:
            "Wir integrieren, was Sie bereits nutzen — kein unnötiger Neuaufbau.",
        },
        f4: {
          title: "Messbare Ergebnisse",
          description:
            "Zeitersparnis, schnellere Antworten, weniger Fehler und sauberere Datenflüsse messen.",
        },
      },

      faqs: {
        title: "FAQs",
        subtitle: "Häufige Fragen vor dem Start",
        q1: {
          q: "Was brauchen wir zum Start?",
          a: "Ein kurzer Call + Zugriff auf die Tools, die integriert werden sollen (E-Mail/WhatsApp/CRM/ERP). Wir können zuerst mit einem leichten Audit beginnen.",
        },
        q2: {
          q: "Können wir klein starten?",
          a: "Ja. Wir starten oft mit einem Pilot (ein Workflow oder Chatbot), beweisen den ROI und skalieren dann in Phasen.",
        },
        q3: {
          q: "Unterstützen Sie mehrere Sprachen?",
          a: "Ja — Englisch, Französisch, Deutsch und Luxemburgisch (und mehr bei Bedarf).",
        },
      },

      cta: {
        title: "Bereit, smarter zu automatisieren?",
        subtitle:
          "Starten Sie mit einem kostenlosen Automatisierungs-Audit und erhalten Sie in wenigen Tagen einen klaren Plan.",
        primary: "Kostenloses Audit erhalten",
        secondary: "Unsere Services ansehen",
      },
    },

    services: {
      hero: {
        title: "Unsere KI-Services",
        subtitle:
          "Umfassende KI-Automatisierung, die Prozesse transformiert und Wachstum beschleunigt",
      },
      gridCta: { learnMore: "Mehr erfahren" },

      // ✅ NEW
      recommendedStartingPoint: "Empfohlener Startpunkt",

      modal: {
        keyFeatures: "Kernfunktionen",
        expectedBenefits: "Erwartete Vorteile",
        getStarted: "Loslegen",
        close: "Schließen",
        whatItIsLabel: "Was es ist:",
        coreFeaturesLabel: "Kernfunktionen:",
        recommendedAddOnsLabel: "Empfohlene Add-ons",
        impactLabel: "Impact",
      },

      list: {
        s1: {
          title: "KI-Workflow-Automatisierung",
          description:
            "Optimieren Sie Geschäftsprozesse mit intelligenter Automatisierung, die sich an Ihre Workflows anpasst.",
          benefits:
            "Reduzieren Sie manuelle Arbeit um 80 % und steigern Sie die Genauigkeit auf 95 %",
          f1: "Process Mining",
          f2: "Automatisierte Entscheidungen",
          f3: "Workflow-Optimierung",
          f4: "Echtzeit-Monitoring",
          imageAlt: "KI-Workflow-Automatisierung",

          whatItIs:
            "KI-gestützte Automatisierung, die aus Ihren Workflows lernt und die Ausführung kontinuierlich verbessert.",
          howItHelps: {
            h1: "Eliminiert repetitive manuelle Aufgaben",
            h2: "Erhöht Geschwindigkeit und Konsistenz",
            h3: "Skaliert ohne zusätzliches Personal",
          },
          recommendedAddOns: {
            r1: "RPA (Robotic Process Automation)",
            r2: "API- & Systemintegrationen (ERP, CRM, Datenbanken)",
            r3: "Exception-Handling & Human-in-the-loop-Workflows",
            r4: "Compliance- & Audit-Automatisierung",
          },
        },

        s2: {
          title: "KI-Chatbots",
          description:
            "Intelligente Chatbots für 24/7 Kundenservice mit natürlichen Dialogen.",
          benefits:
            "Beantworten Sie bis zu 90 % der Anfragen sofort und steigern Sie die Zufriedenheit",
          f1: "Natural Language Processing",
          f2: "Mehrsprachige Unterstützung",
          f3: "Integrationsbereit",
          f4: "Lernfähig",
          imageAlt: "KI-Chatbots",

          whatItIs:
            "Conversational AI, die Nutzerintentionen versteht und präzise Antworten liefert.",
          howItHelps: {
            h1: "24/7 Support für Kunden und Mitarbeiter",
            h2: "Schnellere Reaktionszeiten",
            h3: "Niedrigere Support-Kosten",
          },
          recommendedAddOns: {
            r1: "Voice Bots für Callcenter",
            r2: "CRM- & Ticketing-Integration",
            r3: "Sales- und Lead-Qualifizierungs-Bots",
            r4: "Interne Wissensassistenten",
          },
        },

        s3: {
          title: "Prozessoptimierung",
          description:
            "Verbessern Sie bestehende Prozesse mit KI-gestützten Analysen und Empfehlungen.",
          benefits:
            "Steigern Sie die Effizienz um bis zu 60 % und senken Sie Kosten deutlich",
          f1: "Performance-Analytik",
          f2: "Engpass-Erkennung",
          f3: "Ressourcen-Allokation",
          f4: "Kontinuierliche Verbesserung",
          imageAlt: "Prozessoptimierung",

          whatItIs:
            "KI-Analyse, wie Arbeit tatsächlich in Ihrer Organisation abläuft.",
          howItHelps: {
            h1: "Findet versteckte Ineffizienzen",
            h2: "Optimiert den Ressourceneinsatz",
            h3: "Reduziert Verzögerungen und Betriebskosten",
          },
          recommendedAddOns: {
            r1: "Prozess-Reengineering-Empfehlungen",
            r2: "KPI-Dashboards",
            r3: "Change-Impact-Simulation",
            r4: "Abteilungsübergreifende Workflow-Abstimmung",
          },
        },

        s4: {
          title: "Predictive Analytics",
          description:
            "Nutzen Sie Machine Learning zur Prognose von Trends und besseren Entscheidungen.",
          benefits: "85 % genauere Prognosen und frühere Erkennung von Chancen",
          f1: "Trend-Forecasting",
          f2: "Risikoanalyse",
          f3: "Marktanalyse",
          f4: "Strategische Planung",
          imageAlt: "Predictive Analytics",

          whatItIs:
            "ML-Modelle zur Vorhersage zukünftiger Ergebnisse anhand von Daten.",
          howItHelps: {
            h1: "Antizipiert Risiken und Chancen",
            h2: "Verbessert die Planungsgenauigkeit",
            h3: "Ermöglicht proaktive Entscheidungen",
          },
          recommendedAddOns: {
            r1: "Nachfrageprognosen",
            r2: "Predictive Maintenance",
            r3: "Kundenverhaltensmodelle",
            r4: "Szenario-Simulationen",
          },
        },

        s5: {
          title: "KI-Strategie & Beratung",
          description:
            "Eine klare Roadmap, um KI sinnvoll einzusetzen und messbaren ROI zu erzielen.",
          benefits: "Schneller starten, Risiken senken und gezielt investieren",
          f1: "KI-Reifegradanalyse",
          f2: "Automatisierungs-Roadmap",
          f3: "ROI- & Machbarkeitsanalyse",
          f4: "KI-Governance & Ethik",
          imageAlt: "KI-Strategie & Beratung",

          whatItIs:
            "Strategische Beratung zur Definition der besten KI-Initiativen.",
          howItHelps: {
            h1: "Identifiziert Automatisierungen mit hohem ROI",
            h2: "Erstellt einen klaren Umsetzungsplan",
            h3: "Minimiert Risiken durch Governance",
          },
          recommendedAddOns: {
            r1: "Executive-Workshops",
            r2: "Daten- & Architektur-Review",
            r3: "Pilotdefinition & KPIs",
            r4: "Change-Management-Unterstützung",
          },
        },
      },

      why: {
        title: "Warum unsere KI-Lösungen?",
        subtitle:
          "Modernste Technologie + Expertise für Ergebnisse, die zählen",
        fast: {
          title: "Schnelle Umsetzung",
          description: "In Wochen deployen – nicht in Monaten",
        },
        secure: {
          title: "Sicher & zuverlässig",
          description: "Enterprise-Security und 99,9 % Verfügbarkeit",
        },
        support: {
          title: "24/7 Support",
          description: "Ein Team, das immer erreichbar ist",
        },
      },
      cta: {
        title: "Bereit zu starten?",
        subtitle: "Lassen Sie uns über Ihre Ziele sprechen",
        primary: "Kostenlose Beratung",
        secondary: "So funktioniert’s",
      },
    },

    legal: {
      privacy: {
        title: "Datenschutzerklärung",
        sections: {
          metaDate: "Gültig ab: 22. Dezember 2025",
          metaCompany: "Lux AI Consultation & Automation",
          metaDomain: "luxaiautomation.com",
          downloadPdf: "PDF herunterladen",
          contactLabel: "E-Mail:",
          emailCta: "E-Mail senden",

          s1t: "1. Einleitung",
          s1b: "Lux AI Consultation & Automation mit Sitz in Luxemburg (EU) legt großen Wert auf den Schutz Ihrer Privatsphäre. Diese Datenschutzerklärung erläutert, wie wir Ihre Informationen bei der Nutzung unserer Website verarbeiten. Wir verpflichten uns, Ihre personenbezogenen Daten gemäß der Datenschutz-Grundverordnung (DSGVO) zu schützen.",

          s2t: "2. Erhobene Informationen",
          s2b1: "Wir erheben personenbezogene Daten nur, wenn Sie uns direkt kontaktieren. Wenn Sie unser Kontaktformular nutzen, können wir Ihren Namen, Ihre E-Mail-Adresse sowie den Inhalt Ihrer Nachricht erfassen. Diese Informationen werden ausschließlich zur Beantwortung Ihrer Anfrage verwendet und niemals verkauft oder an Dritte weitergegeben.",
          s2b2: "Wir verwenden keine Analyse-, Tracking- oder Werbe-Cookies. Es werden ausschließlich technisch notwendige Cookies eingesetzt, um grundlegende Funktionen der Website sicherzustellen, wie z. B. die Speicherung Ihrer Designpräferenz (Hell- oder Dunkelmodus).",

          s3t: "3. Verwendung Ihrer Informationen",
          s3b: "Alle von Ihnen bereitgestellten Informationen werden ausschließlich zur Bearbeitung Ihrer Anfrage verwendet. Wir nutzen Ihre Daten nicht zu Marketingzwecken und geben sie nicht an Dritte weiter.",

          s4t: "4. Cookies",
          s4b: "Wir verwenden nur essenzielle Cookies, die für den ordnungsgemäßen Betrieb der Website erforderlich sind. Diese Cookies verfolgen Ihre Aktivitäten nicht. Sie können Cookies in den Einstellungen Ihres Browsers deaktivieren, jedoch könnten dadurch einige Funktionen der Website eingeschränkt sein.",

          s5t: "5. Datensicherheit",
          s5b: "Wir setzen angemessene technische und organisatorische Maßnahmen ein, um Ihre personenbezogenen Daten vor unbefugtem Zugriff, Verlust oder Missbrauch zu schützen. Dennoch ist keine Methode der Datenübertragung oder -speicherung vollkommen sicher.",

          s6t: "6. Links zu Drittanbietern",
          s6b: "Unsere Website kann Links zu Websites Dritter enthalten. LuxAI Automation übernimmt keine Verantwortung für die Datenschutzpraktiken oder Inhalte dieser externen Websites. Wir empfehlen, deren Datenschutzerklärungen zu lesen, bevor Sie personenbezogene Daten bereitstellen.",

          s7t: "7. Änderungen dieser Erklärung",
          s7b: "Wir behalten uns vor, diese Datenschutzerklärung gelegentlich zu aktualisieren. Änderungen werden auf dieser Seite mit einem aktualisierten Gültigkeitsdatum veröffentlicht. Die weitere Nutzung der Website gilt als Zustimmung zur aktualisierten Erklärung.",

          s8t: "8. Ihre Rechte & Kontaktinformationen",
          s8b: "Gemäß DSGVO haben Sie das Recht auf Auskunft, Berichtigung oder Löschung Ihrer personenbezogenen Daten. Bei Fragen oder Anliegen zum Datenschutz kontaktieren Sie uns bitte unter contact@luxaiautomation.com.",
          end: "Durch die Nutzung dieser Website bestätigen Sie, dass Sie diese Datenschutzerklärung gelesen und akzeptiert haben.",
        },
      },
      terms: {
        title: "Allgemeine Geschäftsbedingungen",
        sections: {
          metaDate: "Gültig ab: 22. Dezember 2025",
          metaCompany: "Lux AI Consultancy & Automation",
          metaDomain: "luxaiautomation.com",

          downloadPdf: "PDF herunterladen",

          s1t: "1. Eigentum und Zustimmung zu den Bedingungen",
          s1b: "Diese Website und ihre Inhalte werden von Lux AI Consultancy & Automation betrieben und sind deren Eigentum. Durch den Zugriff auf diese Website oder deren Nutzung erklären Sie sich mit diesen Allgemeinen Geschäftsbedingungen einverstanden. Wenn Sie nicht zustimmen, müssen Sie die Nutzung der Website einstellen.",

          s2t: "2. Nutzungsrecht der Website",
          s2b: "Lux AI Consultancy & Automation gewährt Ihnen ein begrenztes, nicht exklusives und nicht übertragbares Recht, diese Website ausschließlich für rechtmäßige, persönliche und berufliche Informationszwecke zu nutzen. Dieses Recht umfasst nicht den Weiterverkauf oder die kommerzielle Nutzung der Website oder ihrer Inhalte.",

          s3t: "3. Geistiges Eigentum",
          s3b: "Alle Inhalte dieser Website, einschließlich Texte, Grafiken, Logos, Layouts und Code, sind Eigentum von Lux AI Consultancy & Automation oder deren Lizenzgebern und durch Gesetze zum Schutz des geistigen Eigentums geschützt. Eine Vervielfältigung, Verbreitung, Veränderung oder öffentliche Darstellung ohne vorherige schriftliche Genehmigung ist nicht gestattet.",

          s4t: "4. Unzulässige Nutzung",
          s4b: "Es ist untersagt, automatisierte Systeme, Scraping-Tools, Bots oder andere Methoden zu verwenden, um auf Inhalte der Website zuzugreifen, diese zu überwachen oder zu kopieren. Ebenso ist es untersagt, den Betrieb, die Sicherheit oder die Infrastruktur der Website zu beeinträchtigen oder die Website für rechtswidrige oder schädliche Zwecke zu nutzen.",

          s5t: "5. Genauigkeit und Verfügbarkeit der Inhalte",
          s5b: "Die Inhalte dieser Website dienen ausschließlich allgemeinen Informationszwecken. Obwohl wir bemüht sind, die Informationen aktuell und korrekt zu halten, übernimmt Lux AI Consultancy & Automation keine Gewähr für Vollständigkeit, Genauigkeit oder Verfügbarkeit und behält sich das Recht vor, Inhalte jederzeit zu ändern oder zu entfernen.",

          s6t: "6. Haftungsausschluss",
          s6b: "Die Website und ihre Inhalte werden „wie sie sind“ und „wie verfügbar“ bereitgestellt. Lux AI Consultancy & Automation schließt alle ausdrücklichen oder stillschweigenden Garantien aus, einschließlich Garantien für Genauigkeit, Eignung für einen bestimmten Zweck und Nichtverletzung von Rechten.",

          s7t: "7. Haftungsbeschränkung",
          s7b: "Soweit gesetzlich zulässig, haftet Lux AI Consultancy & Automation nicht für direkte, indirekte, zufällige, Folgeschäden oder Strafschadensersatz, die aus der Nutzung oder der Unmöglichkeit der Nutzung dieser Website oder ihrer Inhalte entstehen.",

          s8t: "8. Links zu Drittanbietern",
          s8b: "Diese Website kann Links zu Websites Dritter enthalten. Diese Links dienen lediglich der Benutzerfreundlichkeit. Lux AI Consultancy & Automation hat keinen Einfluss auf und übernimmt keine Verantwortung für Inhalte, Richtlinien oder Praktiken dieser Drittanbieter.",

          s9t: "9. Feedback und Einsendungen",
          s9b: "Jegliches Feedback, Ideen oder Vorschläge, die Sie über diese Website an LuxAI Automation übermitteln, gelten als nicht vertraulich und dürfen von Lux AI Consultancy & Automation uneingeschränkt und ohne Vergütung verwendet werden.",

          s10t: "10. Änderungen dieser Bedingungen",
          s10b: "Lux AI Consultancy & Automation behält sich das Recht vor, diese Allgemeinen Geschäftsbedingungen jederzeit zu ändern oder zu aktualisieren. Änderungen treten mit der Veröffentlichung in Kraft. Die fortgesetzte Nutzung der Website gilt als Zustimmung zu den geänderten Bedingungen.",

          s11t: "11. Anwendbares Recht",
          s11b: "Diese Allgemeinen Geschäftsbedingungen unterliegen den anwendbaren gesetzlichen Bestimmungen, ohne Berücksichtigung kollisionsrechtlicher Grundsätze.",

          contactLabel: "E-Mail:",
          emailCta: "Kontakt aufnehmen",

          end: "Wenn Sie Fragen zu diesen Allgemeinen Geschäftsbedingungen haben, kontaktieren Sie uns bitte.",
        },
      },
    },
  },

  lb: {
    common: {
      brand: "AI Automation",
      nav: {
        home: "Start",
        services: "Servicer",
        howItWorks: "Wéi et funktionéiert",
        about: "Iwwer eis",
        contact: "Kontakt",
        privacy: "Privatsphär",
        terms: "Bedingungen",
      },
      buttons: {
        learnMore: "Méi gewuer ginn",
        close: "Zoumaachen",
        getStarted: "Ufaangen",
        viewServices: "Servicer kucken",
        getFreeAudit: "Gratis Audit kréien",
        getFreeConsultation: "Gratis Consultatioun",
      },
      footer: {
        brandShort: "AI",
        brandName: "Lux AI Consultancy & Automation",
        description:
          "Mir transforméiere Betriber duerch intelligent Automatiséierung. Mir hëllefen Entreprisen, KI-Léisungen anzeféieren, fir d’Effizienz ze steigeren, Käschten ze reduzéieren an méi intelligent ze skaliéieren.",
        quickLinks: "Schnell Links",
        aboutUs: "Iwwer eis",
        services: "Servicer",
        useCases: "Use Cases",
        howItWorks: "Wéi et funktionéiert",
        contactInfo: "Kontakt",
        email: "mfg@moolasisayjemere.com",
        emailRaw: "mfg@moolasisayjemere.com",
        phone: "+352 691 833 894",
        phoneRaw: "+352691833894",
        location: "Belvaux, Luxumbourg",
        socialTitle: "Verbannt Iech mat eis",
        rights: "All Rechter virbehalen.",
        privacy: "Dateschutz",
        terms: "Notzungsbedingungen",
      },
    },

    home: {
      hero: {
        line1: "Automatiséiert Är",
        line2: "Entreprise mat",
        line3: "KI-ugedriwwene Léisungen",
        subtitle:
          "Steigert d’Effizienz, reduzéiert d’Käschten a skaliéiert méi intelligent mat KI. Transforméiert Är Workflows mat intelligenter Automatiséierung – 24/7.",
        ctaAudit: "Gratis Automatiséierungs-Audit kréien",
        ctaHow: "Kuckt wéi et funktionéiert",
        imageAlt: "Illustratioun: KI Automatiséierung",
      },
      stats: {
        businessesAutomated: "Entreprisen automatiséiert",
        workflowAccuracy: "Workflow-Genauegkeet",
        automatedOperations: "Automatiséiert Operatiounen",
      },
      trusted: {
        title: "Vertraut vu Teams, déi hir Operatioune mat KI automatiséieren",
        subtitle:
          "Mir entwéckelen an integréieren KI-ugedriwwe Automatiséierungssystemer fir Betribsprozesser sécher, zouverlässeg a skaléierbar ze moderniséieren.",
        outcomes:
          "Typesch Resultater: manner manuell Aarbecht, méi séiere Support, propper Dateflëss an Admin-kontrolléiert Operatiounen.",
      },

      capabilities: {
        publicChatbots: {
          name: "Ëffentlech Website-Chatbots",
          desc: "Lead-Erfaassung, FAQen a Support 24/7",
        },
        protectedChatbots: {
          name: "Geschützte Chatbots",
          desc: "KI-Assistenten mat authentifizéierte Benotzer",
        },
        adminKb: {
          name: "Admin Knowledge Base",
          desc: "Client-kontrolléiert KI-Wëssen, Updates a Reegelen",
        },
        integrationAutomation: {
          name: "System-Integratioun & Automatiséierung",
          desc: "WhatsApp, E-Mail, APIs, Webhooks, n8n, Make, Zapier",
        },
      },

      servicesBlock: {
        title: "Transforméiert Är Business-Operatiounen",
        subtitle:
          "Vun Workflow-Automatiséierung bis intelligent Chatbots liwwere mir KI-Léisungen mat reellem Business-Impakt.",
        cta: "All Servicer kucken",
      },

      services: {
        digitalStrategy: {
          title: "KI Strategie & Consulting",
          description: "E kloeren Startpunkt fir Är KI-Rees",
          detail:
            "Mir hëllefen Iech déi héich-ROI KI-Chancen ze identifizéieren, Prioritéiten ze setzen an eng realistesch Roadmap opzebauen.",
          bestFor:
            "Ideal fir: Leadership-Teams, KI-Ufänger, komplex Organisatiounen",
        },

        workflowAutomation: {
          title: "KI Workflow-Automatiséierung",
          description: "Automatiséiert widderhuelend Aufgaben a Prozesser",
          detail:
            "Mir automatiséieren regelbaséiert Workflows mat KI-Systemer, déi sech un Är reell Operatioune upassen.",
          bestFor:
            "Ideal fir: Operatiounen, Finance, HR, Industrie, Logistik, Backoffice",
        },

        chatbots: {
          title: "KI-Chatbots",
          description: "Intelligent Automatiséierung fir Support a Service",
          detail:
            "Eis KI-Chatbots bedreiwen Gespréicher iwwer Websäiten, Portalen, WhatsApp an intern Systemer.",
          bestFor:
            "Ideal fir: Clientsservice, Verkaf, Onboarding, IT- a HR-Teams",
        },

        processOptimization: {
          title: "Prozess-Optimiséierung",
          description: "Workflows analyséieren a verbesseren",
          detail:
            "Mat KI-Analysen identifizéiere mir Ineffizienzen a verbesseren Prozesser gezielt.",
          bestFor:
            "Ideal fir: Operatiounsleedung, Effizienzprogrammer, Käschtereduktioun",
        },

        predictiveAnalytics: {
          title: "Predictiv Analysen",
          description: "Datebaséiert Prognosen fir besser Entscheedungen",
          detail:
            "Mir transforméieren Date zu Prognosen fir Risiken a Chancen fréi z’erkennen.",
          bestFor:
            "Ideal fir: Management, Planung, Finance, Verkaf a Supply Chain",
        },
      },

      platformsBlock: {
        title: "Plattformen déi mir bauen a moderniséieren",
        subtitle:
          "Nieft Automatiséierung entwéckele mir zentral Business-Plattformen – sécher, integréiert a KI-bereet.",
      },

      platforms: {
        erp: {
          title: "ERP-Systemer",
          desc: "Modern ERP-Plattformen mat Rollen, Validatiounen, Reporting a propperem Datefloss.",
        },
        customApps: {
          title: "Custom Business Apps",
          desc: "Moossgeschneidert intern Tools a Portalen – sécher, skaléierbar a liicht ze pflegen.",
        },
        ecommerce: {
          title: "E-Commerce Plattformen",
          desc: "Bestellungen, Lager-Sync, Automatiséierung a KI-gestëtzte Clientsservice.",
        },
        websites: {
          title: "Websäiten & Client-Portalen",
          desc: "Staark Websäiten an authentifizéiert Portale mat Chatbots a Knowledge Base.",
        },
      },

      // trusted: {
      //   title:
      //     "Vertraut vu Teams, déi hir Operatiounen mat KI-Automatiséierung transforméieren",
      //   subtitle:
      //     "Mir entwéckelen a bauen KI-Automatiséierung — vu Chatbots bis ERP-Systemer an individuell Uwendungen — sou datt Är Operatiounen méi séier, méi propper an méi sécher lafen.",
      //   outcomes:
      //     "Typesch Resultater: manner manuell Aarbecht, méi séiere Support, méi propper Dateflëss, Admin-kontrolléiert Operatiounen.",
      // },
      // capabilities: {
      //   publicChatbots: {
      //     name: "Website-Chatbots (ëffentlech)",
      //     desc: "Lead-Erfaassung + FAQen 24/7",
      //   },
      //   protectedChatbots: {
      //     name: "Geschützte Chatbots",
      //     desc: "Authentifizéierte Benotzer-Zougang",
      //   },
      //   adminKb: {
      //     name: "Admin-KB-Management",
      //     desc: "Konsequent Updates & Kontroll",
      //   },
      //   erpApps: {
      //     name: "ERP & Business-Web-Apps",
      //     desc: "Backoffice + Reporting",
      //   },
      //   ecommerceInventory: {
      //     name: "E-Commerce & Lager",
      //     desc: "Bestellungen + Bestandsmanagement",
      //   },
      //   integrationAutomation: {
      //     name: "Integratioun & Automatiséierung",
      //     desc: "APIs, Webhooks, n8n/Make/Zapier",
      //   },
      // },

      // servicesBlock: {
      //   title: "Transforméiert Är Business-Operatiounen",
      //   subtitle:
      //     "Vun der Automatiséierung vu Workflows bis zu intelligente Chatbots liwwere mir KI-Léisungen, déi manuell Aarbecht reduzéieren, d’Genauegkeet verbesseren an moossbar Geschäftserfolleger bréngen.",
      //   cta: "All Servicer kucken",
      // },

      // services: {
      //   workflowAutomation: {
      //     title: "KI Workflow-Automatiséierung",
      //     description: "Widderhuelend Aufgaben a Prozesser vereinfachen",
      //     detail:
      //       "Mir automatiséieren Zäit-intensiv, regelbaséiert a widderhuelend Workflows mat KI-Systemer, déi sech un Är Entreprise upassen. Dat reduzéiert Feeler, beschleunegt d’Ausféierung a fräimacht Zäit fir méi wäertvoll Aarbecht.",
      //     bestFor:
      //       "Ideal fir: Operatiounen, Finance, HR, Industrie, Logistik, Backoffice-Teams",
      //   },
      //   chatbots: {
      //     title: "KI-Chatbots",
      //     description: "Intelligent Automatiséierung am Clientsservice",
      //     detail:
      //       "Eis KI-Chatbots behandelen Gespréicher op Websites, Apps a Messagerie. Si verstoen natierlech Sprooch, léisen Standardfroen direkt a eskaléieren komplex Fäll.",
      //     bestFor: "Ideal fir: Support, Sales, Onboarding, intern IT-Helpdesks",
      //   },
      //   processOptimization: {
      //     title: "Prozess-Optimiséierung",
      //     description: "Workflows analyséieren an verbesseren",
      //     detail:
      //       "Mir benotzen KI an Date-Analys fir Ineffizienzen ze fannen, Engpäss z’identifizéieren an méi séier, méi intelligent Prozesser ze recommandéieren.",
      //     bestFor:
      //       "Ideal fir: Prozess-Verbesserung, Operatiouns-Leedung, Käschtereduktioun",
      //   },
      //   predictiveAnalytics: {
      //     title: "Predictiv Analysen",
      //     description: "Date-Insights fir besser Entscheedungen",
      //     detail:
      //       "Mir maachen aus Ären Donnéeën Prognosen, fir Trends fréi ze erkennen, Risiken ze reduzéieren an proaktiv Entscheedungen ze huelen.",
      //     bestFor:
      //       "Ideal fir: Executives, Planung, Finance, Sales, Supply Chain",
      //   },

      //   // ✅ NEW (requested)
      //   // digitalSystems: {
      //   //   title: "Digital Systemer & Business-Plattformen",
      //   //   description:
      //   //     "Moderne ERP, E-Commerce an personaliséiert Business-Apps bauen",
      //   //   detail:
      //   //     "Mir bauen d’Systemer, déi Är Entreprise droen: ERP-Portalen, E-Commerce Backoffice, Client-Dashboards an intern Tools. Mat propper Integratiounen, automatiséierte Workflows a séchere Rollen (role-based access).",
      //   //   bestFor:
      //   //     "Ideal fir: ERP-Moderniséierung, operativ Dashboards, Bestellung & Lager, intern Tools, Client-Portalen",
      //   // },
      // },

      // // ✅ NEW (requested)
      // platformsBlock: {
      //   title: "Plattformen déi mir bauen & moderniséieren",
      //   subtitle:
      //     "Vun ERP bis E-Commerce an intern Tools: sécher, skaléierbar Plattformen mat propper Integratiounen an automatiséierungsbereete Workflows.",
      // },
      // platforms: {
      //   erp: {
      //     title: "ERP Systemer",
      //     desc: "Moderniséiert Operatiounen mat Rollenmoduler, Reporting, Approvals an engem propperen Datefloss.",
      //   },
      //   customApps: {
      //     title: "Custom Business Apps",
      //     desc: "Portalen an intern Tools no Ärem Workflow—séier, sécher a gutt ze ënnerhalen.",
      //   },
      //   ecommerce: {
      //     title: "E-Commerce Plattformen",
      //     desc: "Bestellungen, Lager-Sync, Fulfillment-Automatiséierung a Self-Service mat KI-Support.",
      //   },
      //   websites: {
      //     title: "Websites & Client-Portalen",
      //     desc: "Staark Websites + authentifizéiert Portalen—Chatbots, Knowledge Base an Admin-Content.",
      //   },
      // },

      teamBlock: {
        title: "Eist Team",
        subtitle:
          "D’Leit hannert eise KI-Automatiséierungs-Léisungen — fokusséiert op effizient Workflows a staark Business-Resultater.",
      },
      team: {
        molla: {
          name: "Molla Sisay",
          role: "KI-Automatiséierungs-Strateg",
          quote:
            "Ech hëllefen Entreprisen, komplex Prozesser ze vereinfachen an Automatiséierungs-Systemer ze designen, déi d’Effizienz erhéijen an Engpäss reduzéieren.",
          tags: {
            tag1: "Prozess-Automatiséierung",
            tag2: "Workflow-Design",
            tag3: "System-Analys",
          },
        },
        fikre: {
          name: "Fikremariam Mekonnen",
          role: "KI & Integratiounen Engineer",
          quote:
            "Ech bauen skaléierbar Integratiounen an Automatiséierungs-Systemer, déi zouverlässeg am Business-Alldag funktionéieren.",
          tags: {
            tag1: "API-Integratiounen",
            tag2: "Automatiséierungs-Engineering",
            tag3: "KI-Systemer",
          },
        },
        dereje: {
          name: "Dereje Masresha",
          role: "Full-Stack & KI-Léisungs-Entwéckler",
          quote:
            "Ech entwéckelen intelligent Automatiséierungs-Tools a nahtlos User Experiences – ugedriwwe vun KI.",
          tags: {
            tag1: "Full-Stack",
            tag2: "KI-Chatbots",
            tag3: "Automatiséierungs-Plattformen",
          },
        },
      },
      testimonialsBlock: {
        title: "Wat eis Clienten soen",
        subtitle:
          "Reell Resultater vun Entreprisen, déi hir Operatioune mat KI-Automatiséierung verbessert hunn.",
      },
      testimonials: {
        t1: {
          quote:
            "KI-Automatiséierung huet eis E-Mail-Äntwertzäit ëm 70% reduzéiert an eisem Team méi Zäit fir strategesch Initiativen ginn.",
          author: "Sarah Johnson",
          role: "CEO, TechCorp",
        },
        t2: {
          quote:
            "Workflow-Automatiséierung huet eis 15 Stonnen pro Woch bei der Rechnungsveraarbechtung gespuert. De ROI war direkt ze gesinn.",
          author: "Michael Chen",
          role: "Operations Manager, InnovateLabs",
        },
        t3: {
          quote:
            "Eise KI-Chatbot behandelt 80% vun de Clientefroen direkt. D’Zefriddenheet ass esou héich wéi nach ni.",
          author: "Lisa Rodriguez",
          role: "Customer Success Director, DataFlow",
        },
      },
      finalCta: {
        title: "Bereet fir Är Entreprise ze automatiséieren?",
        subtitle:
          "Maacht mat bei de Betriber, déi scho Zäit a Suen mat KI-Automatiséierung spueren. Kritt Är gratis Consultatioun haut.",
        button: "Automatiséierung starten",
      },
    },

    contact: {
      modal: {
        title: "Net ëmgesat",
        body: "Dëst ass eng Template. Backend-Funktioun ass net ëmgesat.",
        close: "Zoumaachen",
      },
      hero: {
        title: "Loosst eis zesumme automatiséieren",
        subtitle:
          "Bereet Är Entreprise mat KI-Automatiséierung ze transforméieren? Beschreift Är Erausfuerderungen, mir bauen eng passend Léisung.",
      },
      form: {
        title: "Start mat KI-Automatiséierung",
        fullName: "Vollen Numm *",
        email: "E-Mail-Adress *",
        company: "Entreprise *",
        task: "Aufgab fir ze automatiséieren *",
        sending: "Schécken...",
        submit: "Gratis Consultatioun kréien",
        placeholders: {
          name: "Max Mustermann",
          email: "max@firma.com",
          company: "Är Entreprise",
          task: "Beschreift de Prozess, deen Dir automatiséiere wëllt (z. B. Rechnungen, Support, Datenerfaassung, etc.)",
        },
      },
      sidebar: { title: "Kontakt" },
      whyTitle: "Firwat mir?",
      why: {
        i1: "Gratis éischt Consultatioun",
        i2: "Moossgeschneidert Léisungen",
        i3: "24/7 Support",
        i4: "Bewisen Erfolleger",
      },
      info: {
        email: {
          icon: "ri-mail-line",
          title: "E-Mail",
          content: "hello@aiautomation.com",
          description: "Fir Projet-Ufroen",
        },
        phone: {
          icon: "ri-phone-line",
          title: "Telefon",
          content: "+352 691 833 894",
          description: "Mé–Fr 9–18 Auer (PST)",
        },
        visit: {
          icon: "ri-map-pin-line",
          title: "Besich",
          content: "San Francisco, CA",
          description: "Rendez-vous ausmaachen",
        },
      },
      testimonialsBlock: {
        title: "Wat eis Clienten soen",
        subtitle: "Reell Resultater duerch KI-Automatiséierung",
      },
      testimonials: {
        t1: {
          quote:
            "KI-Automatiséierung huet eis Rechnungsveraarbechtung ëm 70% beschleunegt an Feeler eliminéiert. De ROI war am éischte Mount sichtbar.",
          author: "Sarah Johnson",
          role: "Operations Manager",
        },
        t2: {
          quote:
            "De Chatbot behandelt 90% vun de Clientefroen automatesch. Eist Team kann sech op strategesch Themen konzentréieren.",
          author: "Michael Chen",
          role: "CEO",
        },
        t3: {
          quote:
            "Predictiv Analysen hunn eis Trends 3 Méint méi fréi gewisen. Dat huet eise Revenue ëm 25% erhéicht.",
          author: "Emily Rodriguez",
          role: "VP Operations",
        },
      },
    },

    about: {
      hero: {
        title: "Iwwer eis Missioun",
        subtitle:
          "Mir hëllefen Entreprisen, KI anzeféieren fir Aufgaben ze automatiséieren, Entscheedungen ze verbesseren an de Wuesstem duerch intelligent Automatiséierung ze beschleunegen.",
      },
      stats: {
        businessesAutomated: "Entreprisen automatiséiert",
        tasksProcessed: "Aufgaben veraarbecht",
        workflowAccuracy: "Workflow-Genauegkeet",
        supportAvailable: "Support verfügbar",
      },
      vision: {
        title: "Eis Visioun fir d’Zukunft",
        p1: "Mir stellen eis eng Welt vir, wou KI an d’mënschlech Kreativitéit nahtlos zesummespillen – fir nei Niveauen u Produktivitéit an Innovatioun.",
        p2: "Eis Missioun ass KI-Automatiséierung zougänglech ze maachen – fir all Gréissten u Betriber – a gläichzäiteg de mënschleche Faktor ze behalen.",
        imageAlt: "Eis Visioun",
        tags: {
          tag1: "KI-Innovatioun",
          tag2: "Prozess-Optimiséierung",
          tag3: "Human-Centered Design",
        },
      },
      journey: {
        title: "Eis Rees",
        subtitle:
          "Vun engem klenge Startup zu enger féierender KI-Automatiséierungs-Agentur — esou hu mir eis entwéckelt.",
      },
      timeline: {
        "2020": {
          title: "Grënnung",
          description:
            "Start mat der Visioun KI-Automatiséierung ze demokratiséieren",
        },
        "2021": {
          title: "Éischte grousse Client",
          description:
            "Rechnungsveraarbechtung fir eng Fortune-500-Firma automatiséiert",
        },
        "2022": {
          title: "KI-Chatbot Launch",
          description: "Start vun eiser KI-Chatbot-Plattform",
        },
        "2023": {
          title: "Predictiv Analysen",
          description:
            "Fortgeschratt Predictive-Analytics-Funktiounen agefouert",
        },
        "2024": {
          title: "Global Expansioun",
          description: "Servicer weltwäit ausgebaut",
        },
      },
      cta: {
        title: "Bereet fir Är Entreprise ze transforméieren?",
        subtitle:
          "Maacht mat bei de Betriber, déi hir Operatiounen scho mat KI-Automatiséierung revolutionéiert hunn.",
        button: "Starten",
      },
    },

    howItWorks: {
      hero: {
        title: "Wéi et funktionéiert",
        subtitle:
          "E kloeren, praktesche Prozess fir Iech vun der Iddi → zu enger funktionéierender AI-Automatisatioun ze bréngen (sécher a séier).",
      },
      process: {
        title: "Einfach an zouverlässeg Ëmsetzung",
        subtitle:
          "Mir konzentréieren eis op real Operatiounen — Chatbots, Integratiounen a Workflows déi manuell Aarbecht reduzéieren an d’Vitesse verbesseren.",
      },
      steps: {
        s1: {
          title: "Entdecken & Prioriséieren",
          description:
            "Mir léieren Är Operatiounen kennen, identifizéieren déi héchst-ROI Automatisatiounen a stëmmen e realistesche Plang of.",
          d1: "Workflow-Mapping (wat haut geschitt)",
          d2: "Donnéeën- & Systemaudit (ERP/CRM/E-Mail/WhatsApp/APIs)",
          d3: "Use-Case Prioriséierung + ROI-Schätzung",
          d4: "Roadmap + Erfollegs-Metriken",
          imageAlt: "Entdecken an prioriséieren",
        },
        s2: {
          title: "Bauen & Integréieren",
          description:
            "Mir implementéieren d’Automatisatioun, verbannen Är Tools a setzen Guardrails, esou datt et an der Produktioun zouverlässeg leeft.",
          d1: "Chatbot-/Workflow-Build (n8n, Make, Zapier, Custom Code)",
          d2: "Integratiounen (APIs, Webhooks, DB, ERP/CRM)",
          d3: "Testing: Edge Cases + Berechtegungen",
          d4: "Launch + Iwwergab un d’Equipe",
          imageAlt: "Bauen an integréieren",
        },
        s3: {
          title: "Iwwerwaachen & Verbesseren",
          description:
            "Mir verfolgen d’Performance, verfeineren Äntwerten a Workflows a verbesseren d’Resultater kontinuéierlech.",
          d1: "Monitoring- & Reporting-Dashboard",
          d2: "Knowledge-Base Updates + Prompt-Tuning",
          d3: "Automatisatiouns-Optimiséierung & Feelerreduktioun",
          d4: "Lafende Support & Iteratiounen",
          imageAlt: "Iwwerwaachen an verbesseren",
        },
      },

      features: {
        title: "Firwat dat funktionéiert",
        subtitle:
          "Praktesch Ëmsetzung, kloer ROI, a Systemer déi mam reelle Betrib ofgestëmmt sinn.",
        f1: {
          title: "Séier, strukturéiert Kickoff",
          description:
            "Kloere Scope + éischt funktionéierend Automatisatioun séier (dacks 2–3 Wochen).",
        },
        f2: {
          title: "Sécherheet by Design",
          description:
            "Zougangskontroll, Audit-Logs a sécher Date-Handhabung vun Dag 1 un.",
        },
        f3: {
          title: "Ronderëm Är Tools gebaut",
          description:
            "Mir integréieren dat, wat Dir schonn benotzt — keng onnéideg Neibau-Aarbecht.",
        },
        f4: {
          title: "Moossbar Resultater",
          description:
            "Zäit gespuert, méi séier Äntwerten, manner Feeler a méi propper Date-Flëss.",
        },
      },

      faqs: {
        title: "FAQs",
        subtitle: "Heefeg Froen ier mir starten",
        q1: {
          q: "Wat brauche mir fir ze starten?",
          a: "E kuerze Call + Zougang zu den Tools, déi Dir integréiere wëllt (E-Mail/WhatsApp/CRM/ERP). Mir kënnen och mat engem liichten Audit ufänken.",
        },
        q2: {
          q: "Kënne mir kleng ufänken?",
          a: "Jo. Mir starten dacks mat engem Pilot (ee Workflow oder Chatbot), beweisen de ROI, an erweideren dann a Phasen.",
        },
        q3: {
          q: "Ënnerstëtzt Dir Multi-Language?",
          a: "Jo — Englesch, Franséisch, Däitsch a Lëtzebuergesch (a méi, wann néideg).",
        },
      },

      cta: {
        title: "Bereet, méi intelligent ze automatiséieren?",
        subtitle:
          "Start mat engem gratis Automatisatiouns-Audit a kréien an e puer Deeg e kloere Plang.",
        primary: "Gratis Audit kréien",
        secondary: "Eis Servicer kucken",
      },
    },

    services: {
      hero: {
        title: "Eis KI-Servicer",
        subtitle:
          "Komplett KI-Automatiséierung fir Är Operatiounen ze transforméieren an de Wuesstem ze beschleunegen",
      },
      gridCta: { learnMore: "Méi gewuer ginn" },

      // ✅ NEW
      recommendedStartingPoint: "Empfohlene Startpunkt",

      modal: {
        keyFeatures: "Haapt-Features",
        expectedBenefits: "Erwaart Virdeeler",
        getStarted: "Ufaangen",
        close: "Zoumaachen",
        whatItIsLabel: "Wat et ass:",
        coreFeaturesLabel: "Haapt-Features:",
        recommendedAddOnsLabel: "Empfohl Add-ons",
        impactLabel: "Impact",
      },

      list: {
        s1: {
          title: "KI Workflow-Automatiséierung",
          description:
            "Optiméiert Är Prozesser mat intelligenter Automatiséierung déi sech un Är Workflows upasst.",
          benefits: "80% manner manuell Aarbecht an 95% méi Genauegkeet",
          f1: "Process Mining",
          f2: "Automatiséiert Entscheedungen",
          f3: "Workflow-Optimiséierung",
          f4: "Echtzäit-Monitoring",
          imageAlt: "KI Workflow-Automatiséierung",

          whatItIs:
            "KI-ugedriwwe Automatiséierung déi vun Äre Workflows léiert an sech permanent verbessert.",
          howItHelps: {
            h1: "Eliminéiert widderhuelend manuell Aufgaben",
            h2: "Verbessert d’Vitesse an d’Konsequenz",
            h3: "Skaléiert ouni méi Personal",
          },
          recommendedAddOns: {
            r1: "RPA (Robotic Process Automation)",
            r2: "API- & Systemintegratiounen (ERP, CRM, Datebanken)",
            r3: "Exception-Handling & Human-in-the-loop Workflows",
            r4: "Compliance- & Audit-Automatiséierung",
          },
        },

        s2: {
          title: "KI-Chatbots",
          description:
            "Intelligent Chatbots fir 24/7 Clientsservice mat natierleche Gespréicher.",
          benefits: "90% vun de Clientefroen direkt beäntweren",
          f1: "Natural Language Processing",
          f2: "Méigesproochegkeet",
          f3: "Integratiounsbereet",
          f4: "Léierfäeg",
          imageAlt: "KI-Chatbots",

          whatItIs:
            "Conversational KI déi d’Intentioun versteet a korrekt Äntwerten liwwert.",
          howItHelps: {
            h1: "24/7 Support fir Clienten an intern Teams",
            h2: "Méi séier Äntwertzäiten",
            h3: "Manner Support-Käschten",
          },
          recommendedAddOns: {
            r1: "Voice Bots fir Callcenter",
            r2: "CRM- & Ticketing-Integratioun",
            r3: "Sales- & Lead-Qualifikatioun Bots",
            r4: "Intern Knowledge-Base Assistenten",
          },
        },

        s3: {
          title: "Prozess-Optimiséierung",
          description:
            "Analyséiert a verbessert Är Prozesser mat KI-ugedriwwe Insights.",
          benefits: "Bis zu 60% méi Effizienz a manner Käschten",
          f1: "Performance-Analytik",
          f2: "Engpass-Erkennung",
          f3: "Ressourcen-Allokatioun",
          f4: "Kontinuéierlech Verbesserung",
          imageAlt: "Prozess-Optimiséierung",

          whatItIs:
            "KI-Analys wéi d’Aarbecht an der Entreprise wierklech leeft.",
          howItHelps: {
            h1: "Fënnt verstoppt Ineffizienzen",
            h2: "Optiméiert Ressourcennotzung",
            h3: "Reduzéiert Verspéidungen an Käschten",
          },
          recommendedAddOns: {
            r1: "Prozess-Reengineering Recommandatiounen",
            r2: "KPI Dashboards",
            r3: "Change-Impact Simulatioun",
            r4: "Workflow-Alignement tëscht Teams",
          },
        },

        s4: {
          title: "Predictiv Analysen",
          description: "ML-baséiert Prognosen fir besser Entscheedungen.",
          benefits: "85% besser Forecasts an Chancen 3 Méint méi fréi",
          f1: "Trend-Forecasting",
          f2: "Risiko-Aschätzung",
          f3: "Maart-Analys",
          f4: "Strategesch Planung",
          imageAlt: "Predictiv Analysen",

          whatItIs:
            "Machine-Learning Modeller fir zukünfteg Resultater viraus ze soen.",
          howItHelps: {
            h1: "Antizipéiert Risiken a Chancen",
            h2: "Verbessert d’Planungsgenauegkeet",
            h3: "Erméiglecht proaktiv Entscheedungen",
          },
          recommendedAddOns: {
            r1: "Demand Forecasting",
            r2: "Predictive Maintenance",
            r3: "Client-Verhalensmodelléierung",
            r4: "Szenario-Planung",
          },
        },

        s5: {
          title: "KI Strategie & Consulting",
          description:
            "Eng kloer Strategie fir KI richteg anzesetzen an ROI ze maximéieren.",
          benefits: "Méi séier Entscheedungen, manner Risiko, méi Impakt",
          f1: "KI-Readiness Assessment",
          f2: "Automatiséierungs-Roadmap",
          f3: "ROI- & Machbarkeets-Analyse",
          f4: "KI-Governance & Ethik",
          imageAlt: "KI Strategie & Consulting",

          whatItIs:
            "Strategesch Begleedung fir déi bescht KI-Initiativen ze definéieren.",
          howItHelps: {
            h1: "Schaaft Kloerheet iwwer héich-ROI Automatiséierungen",
            h2: "Definéiert e phased Rollout-Plang",
            h3: "Reduzéiert Risiko duerch Governance",
          },
          recommendedAddOns: {
            r1: "Executive Workshops",
            r2: "Data-Readiness Review",
            r3: "Pilot-Auswiel & KPIs",
            r4: "Change-Management Support",
          },
        },
      },

      why: {
        title: "Firwat eis KI-Léisungen?",
        subtitle: "Modern Technologie + Expertise fir Resultater déi zielen",
        fast: {
          title: "Séier Ëmsetzung",
          description: "Deploy an Wochen – net Méint",
        },
        secure: {
          title: "Sécher & zouverlässeg",
          description: "Enterprise-Sécherheet an 99,9% Uptime",
        },
        support: {
          title: "24/7 Support",
          description: "E Team dat ëmmer do ass",
        },
      },
      cta: {
        title: "Bereet fir unzefänken?",
        subtitle: "Loosst eis iwwer Är Ziler schwätzen",
        primary: "Gratis Consultatioun",
        secondary: "Wéi et funktionéiert",
      },
    },

    legal: {
      privacy: {
        title: "Dateschutzpolitik",
        sections: {
          metaDate: "A Kraaft zënter: 22. Dezember 2025",
          metaCompany: "Lux AI Consultation & Automation",
          metaDomain: "luxaiautomation.com",
          downloadPdf: "PDF eroflueden",
          contactLabel: "E-Mail:",
          emailCta: "E-Mail schécken",

          s1t: "1. Aféierung",
          s1b: "Lux AI Consultation & Automation, mat Sëtz zu Lëtzebuerg (EU), respektéiert Är Privatsphär. Dës Dateschutzpolitik erkläert, wéi mir Är Informatioune behandelen, wann Dir eis Websäit benotzt. Mir engagéieren eis, Är perséinlech Donnéeën am Aklang mat der General Dateschutzveruerdnung (GDPR) ze schützen.",

          s2t: "2. Informatiounen déi mir sammelen",
          s2b1: "Mir sammelen nëmme perséinlech Donnéeën, wann Dir eis direkt kontaktéiert. Wann Dir eise Kontaktformular benotzt, kënne mir Ären Numm, Är E-Mail-Adress an den Inhalt vun Ärer Noriicht sammelen. Dës Informatioune ginn ausschliisslech benotzt, fir op Är Ufro ze äntweren, a ginn ni verkaaft oder mat Drëttpersounen gedeelt.",
          s2b2: "Mir benotze keng Analyse-, Tracking- oder Reklammecookies. Nëmme wesentlech Cookies ginn agesat, fir déi grondleeënd Fonctionalitéit vun der Websäit ze garantéieren, wéi z. B. d’Späichere vun Ärer Designpräferenz (hellen oder donkele Modus).",

          s3t: "3. Wéi mir Är Informatioune benotzen",
          s3b: "All Informatiounen, déi Dir eis gitt, ginn ausschliisslech benotzt, fir op Är Ufro oder Demande ze reagéieren. Mir benotzen Är Donnéeën net fir Marketingzwecker a ginn se net un Drëttpersoune weider.",

          s4t: "4. Cookies",
          s4b: "Mir benotzen nëmme noutwenneg Cookies, déi fir de korrekte Fonctionnement vun der Websäit erfuerderlech sinn. Dës Cookies verfollegen Är Aktivitéiten net. Dir kënnt Cookies an den Astellunge vun Ärem Browser deaktivéieren, mee e puer Funktioune vun der Websäit kéinten dann net richteg funktionéieren.",

          s5t: "5. Datesécherheet",
          s5b: "Mir setzen raisonnabel technesch an organisatoresch Moossnamen an, fir Är perséinlech Donnéeën géint onerlaabten Zougang, Verloscht oder Mëssbrauch ze schützen. Trotzdem ass keng Method vun der Dateiwwerdroung oder -späicherung komplett sécher.",

          s6t: "6. Linken op Drëttsäiten",
          s6b: "Eis Websäit kann Linken op extern Websäite vu Drëttpersoune enthalen. LuxAI Automation ass net responsabel fir d’Dateschutzpraktiken oder den Inhalt vun dëse Säiten. Mir recommandéieren, hir Dateschutzpolitiken ze liesen, éier Dir perséinlech Donnéeën ugitt.",

          s7t: "7. Ännerungen un dëser Politik",
          s7b: "Mir kënnen dës Dateschutzpolitik vun Zäit zu Zäit aktualiséieren. All Ännerunge ginn op dëser Säit mat engem neien A-Kraaft-Datum publizéiert. D’Weiderbenotzung vun der Websäit gëllt als Akzeptanz vun der aktualiséierter Politik.",

          s8t: "8. Är Rechter & Kontaktinformatiounen",
          s8b: "No der GDPR hutt Dir d’Recht op Zougang, Korrektur oder Läschung vun Äre perséinlechen Donnéeën. Fir Froen oder Ufroen am Zesummenhang mam Dateschutz, kontaktéiert eis w.e.g. ënner contact@luxaiautomation.com.",
          end: "Mat der Benotzung vun dëser Websäit bestätegt Dir, datt Dir dës Dateschutzpolitik gelies hutt an akzeptéiert.",
        },
      },
      terms: {
        title: "Allgemeng Geschäftsbedéngungen",
        sections: {
          metaDate: "A Kraaft zënter: 22. Dezember 2025",
          metaCompany: "Lux AI Consultancy & Automation",
          metaDomain: "luxaiautomation.com",

          downloadPdf: "PDF eroflueden",

          s1t: "1. Besëtz an Akzeptanz vun de Bedéngungen",
          s1b: "Dës Websäit an hire Contenu gehéieren a ginn bedriwwe vu Lux AI Consultancy & Automation. Mat dem Zougrëff op dës Websäit oder hir Benotzung sidd Dir mat dësen Allgemeng Geschäftsbedéngungen averstanen. Wann Dir net averstane sidd, musst Dir d’Benotzung vun der Websäit ophalen.",

          s2t: "2. Recht op d’Benotzung vun der Websäit",
          s2b: "Lux AI Consultancy & Automation gëtt Iech e limitéiert, net-exklusivt an net-iwwerdroobart Recht, dës Websäit ausschliisslech fir gesetzlech, perséinlech a professionell Informatiounszwecker ze benotzen. Dëst Recht ëmfaasst keng Weiderverkaaf oder kommerziell Notzung vun der Websäit oder hirem Contenu.",

          s3t: "3. Intellektuell Eegentum",
          s3b: "All Contenu op dëser Websäit, inklusiv Texter, Visualen, Logoen, Layouten an Code, ass Eegentum vu Lux AI Consultancy & Automation oder hiren Lizenzgeber a gëtt duerch Gesetzer iwwer intellektuell Eegentum geschützt. Ouni schrëftlech Virauserlaabnis däerf kee Contenu kopéiert, reproduzéiert, verdeelt, geännert oder ëffentlech gewise ginn.",

          s4t: "4. Verbueden Notzung",
          s4b: "Et ass net erlaabt, automatiséiert Systemer, Scraping-Tools, Bots oder aner Methoden ze benotzen, fir op Contenu vun der Websäit zouzegräifen, en ze iwwerwaachen oder ze kopéieren. Et ass och verbueden, de Fonctionnement, d'Sécherheet oder d’Infrastruktur vun der Websäit ze stéieren oder d’Websäit fir illegal oder schiedlech Aktivitéiten ze benotzen.",

          s5t: "5. Genauegkeet an Disponibilitéit vum Contenu",
          s5b: "De Contenu vun dëser Websäit gëtt nëmme fir allgemeng Informatiounszwecker zur Verfügung gestallt. Och wa mir eis beméien, d’Informatiounen aktuell a korrekt ze halen, gëtt vu Lux AI Consultancy & Automation keng Garantie fir Vollstännegkeet, Genauegkeet oder Disponibilitéit iwwerholl, an de Contenu ka zu all Moment geännert oder ewechgeholl ginn.",

          s6t: "6. Haftungsausschloss",
          s6b: "D’Websäit an hire Contenu ginn „sou wéi se sinn“ an „sou wéi se disponibel sinn“ ugebueden. Lux AI Consultancy & Automation schléisst all ausdrécklech oder implizit Garantie aus, inklusiv Garantien iwwer Genauegkeet, Eegnung fir e bestëmmte Zweck an Net-Verletzung vu Rechter.",

          s7t: "7. Haftungsbegrenzung",
          s7b: "Am gréisstméigleche gesetzleche Kader ass Lux AI Consultancy & Automation net haftbar fir direkt, indirekt, zoufälleg, folgeschiedlech oder strofrechtlech Schieden, déi aus der Benotzung oder der Onméiglechkeet vun der Benotzung vun dëser Websäit oder hirem Contenu entstinn.",

          s8t: "8. Linken op Drëttsäiten",
          s8b: "Dës Websäit kann Linken op Websäite vun Drëttpersounen enthalen. Dës Linke ginn nëmme fir d’Bequemlechkeet zur Verfügung gestallt. Lux AI Consultancy & Automation huet keng Kontroll iwwer an ass net responsabel fir den Inhalt, d’Politiken oder d’Praktike vun dëse Säiten.",

          s9t: "9. Feedback an Andreiwungen",
          s9b: "All Feedback, Iddien oder Virschléi, déi Dir iwwer dës Websäit un LuxAI Automation schéckt, gëllen als net vertraulech a kënnen ouni Restriktioun oder Kompensatioun vu Lux AI Consultancy & Automation benotzt ginn.",

          s10t: "10. Ännerunge vun dëse Bedéngungen",
          s10b: "Lux AI Consultancy & Automation behält sech d’Recht vir, dës Allgemeng Geschäftsbedéngungen zu all Moment z’änneren oder z’aktualiséieren. Ännerunge trieden direkt nom Publizéieren a Kraaft. D’Weiderbenotzung vun der Websäit gëllt als Akzeptanz vun de geännerten Bedéngungen.",

          s11t: "11. Uwendbaart Recht",
          s11b: "Dës Allgemeng Geschäftsbedéngungen ënnerleien den uwendbare gesetzleche Bestëmmungen, ouni Berécksiichtegung vu Kollisiounsrecht-Prinzipien.",

          contactLabel: "E-Mail:",
          emailCta: "Kontakt ophuelen",

          end: "Wann Dir Froen zu dësen Allgemeng Geschäftsbedéngungen hutt, kontaktéiert eis w.e.g.",
        },
      },
    },
  },
} as const;

// Helper to traverse nested keys like "about.hero.title"
function getByKey(obj: unknown, key: string): unknown {
  return key.split(".").reduce<unknown>((acc, part) => {
    if (acc && typeof acc === "object" && part in (acc as any)) {
      return (acc as any)[part];
    }
    return undefined;
  }, obj);
}

/**
 * Translate by key.
 * Fallback order: requested lang -> en -> key
 */
export function t<T = string>(lang: Lang, key: string): T {
  const value = getByKey(copy[lang], key) ?? getByKey(copy.en, key);

  if (value !== undefined && value !== null) {
    return value as T;
  }

  return key as unknown as T;
}

/** Optional: text direction (all are LTR here) */
export function dir(_lang: Lang): "ltr" | "rtl" {
  return "ltr";
}
