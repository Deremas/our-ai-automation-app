// app/data/knowledge.ts

export type Lang = "en" | "fr" | "de" | "lb";

export type KBAnswer = {
  intent: string;
  tags?: string[];
  question: Record<Lang, string>;
  answer: Record<Lang, string>;
};

export const BUSINESS_KB = {
  meta: {
    version: "1.1.0",
    docId: "mfg_kb_v1",
    supportedLanguages: ["en", "fr", "de", "lb"] as const,
    defaultLanguage: "en" as const,
    lastUpdated: "2025-12-15",
  },

  company: {
    name: "MFG Automation",

    oneLiner: {
      en: "We help businesses integrate AI and automate workflows across their tools and systems.",
      fr: "Nous aidons les entreprises à intégrer l’IA et à automatiser leurs workflows à travers leurs outils et systèmes.",
      de: "Wir helfen Unternehmen dabei, KI zu integrieren und Workflows über ihre Tools und Systeme hinweg zu automatisieren.",
      lb: "Mir hëllefen Entreprisen AI z’integréieren an Workflows iwwer hir Tools a Systemer ze automatiséieren.",
    },

    positioning: {
      en: "AI Integration + Automation for operations, sales, support, and back-office.",
      fr: "Intégration IA + automatisation pour les opérations, les ventes, le support et le back-office.",
      de: "KI-Integration + Automatisierung für Betrieb, Vertrieb, Support und Backoffice.",
      lb: "AI-Integratioun + Automatisatioun fir Operatiounen, Verkaf, Support an Back-Office.",
    },
  },

  services: [
    // 1) Website chatbots (expanded with public/protected/admin role)
    {
      id: "services.chatbots",
      name: {
        en: "AI Chatbots for Websites",
        fr: "Chatbots IA pour sites web",
        de: "KI-Chatbots für Websites",
        lb: "AI-Chatbots fir Websäiten",
      },
      outcomes: {
        en: [
          "24/7 lead capture",
          "faster support",
          "better customer experience",
        ],
        fr: [
          "capture de leads 24/7",
          "support plus rapide",
          "meilleure expérience client",
        ],
        de: [
          "Lead-Erfassung rund um die Uhr",
          "schnellerer Support",
          "besseres Kundenerlebnis",
        ],
        lb: [
          "Leads 24/7 erfassen",
          "méi schnelle Support",
          "besser Clientserfarung",
        ],
      },
      includes: {
        en: [
          "Multilingual chat (EN/FR/DE/LB)",
          "FAQ + knowledge base answers (RAG-ready)",
          "Lead capture and handoff to humans",
          "Integration with CRM/helpdesk",
          "Public chatbot mode (available to any visitor)",
          "Protected chatbot mode (only for authenticated users)",
          "Admin role tools to update knowledge base content consistently",
        ],
        fr: [
          "Chat multilingue (EN/FR/DE/LB)",
          "Réponses FAQ + base de connaissances (prêt pour RAG)",
          "Capture de leads et transfert à un humain",
          "Intégration avec CRM/helpdesk",
          "Mode chatbot public (accessible à tout visiteur)",
          "Mode chatbot protégé (réservé aux utilisateurs authentifiés)",
          "Outils/role admin pour mettre à jour la base de connaissances de façon cohérente",
        ],
        de: [
          "Mehrsprachiger Chat (EN/FR/DE/LB)",
          "FAQ- und Wissensdatenbank-Antworten (RAG-fähig)",
          "Lead-Erfassung und Übergabe an Menschen",
          "Integration mit CRM/Helpdesk",
          "Öffentlicher Chatbot-Modus (für alle Besucher verfügbar)",
          "Geschützter Chatbot-Modus (nur für authentifizierte Nutzer)",
          "Admin-Rollen-Tools zur konsistenten Pflege der Knowledge Base",
        ],
        lb: [
          "Méisproochege Chat (EN/FR/DE/LB)",
          "FAQ- a Knowledge-Base-Äntwerten (RAG-ready)",
          "Lead-Capture an Iwwergab un e Mënsch",
          "Integratioun mat CRM/Helpdesk",
          "Public Chatbot-Modus (fir all Visiteur verfügbar)",
          "Protected Chatbot-Modus (nëmme fir authentifizéiert Benotzer)",
          "Admin-Roll Tools fir d’Knowledge Base konsequent ze aktualiséieren",
        ],
      },
      notes: {
        en: [
          "Public vs protected chatbots: choose the access level based on your use case (marketing vs customer portal vs internal ops).",
          "Admin updates: keep answers consistent across teams by updating a single knowledge base used by the assistant.",
        ],
        fr: [
          "Chatbot public vs protégé : choisissez le niveau d’accès selon le besoin (marketing vs portail client vs interne).",
          "Mises à jour admin : gardez des réponses cohérentes en mettant à jour une base unique utilisée par l’assistant.",
        ],
        de: [
          "Öffentlich vs geschützt: Zugriff je nach Use Case (Marketing vs Kundenportal vs intern).",
          "Admin-Updates: konsistente Antworten durch eine zentrale Knowledge Base.",
        ],
        lb: [
          "Public vs protected: Zougang jee no Use Case (Marketing vs Client-Portal vs intern).",
          "Admin-Updates: konsequent Äntwerten iwwer eng zentral Knowledge Base.",
        ],
      },
      keywords: [
        "chatbot",
        "public chatbot",
        "protected chatbot",
        "authenticated",
        "admin role",
        "knowledge base",
        "rag",
        "support",
        "lead capture",
      ],
    },

    // 2) Integration service (same as before)
    {
      id: "services.integrations",
      name: {
        en: "AI + System Integration",
        fr: "IA + intégration de systèmes",
        de: "KI + Systemintegration",
        lb: "AI + System-Integratioun",
      },
      outcomes: {
        en: ["connected systems", "less manual work", "clean data flow"],
        fr: [
          "systèmes connectés",
          "moins de travail manuel",
          "flux de données propre",
        ],
        de: [
          "verbundene Systeme",
          "weniger manuelle Arbeit",
          "sauberer Datenfluss",
        ],
        lb: [
          "verbonnen Systemer",
          "manner manuell Aarbecht",
          "propperen Datefloss",
        ],
      },
      includes: {
        en: [
          "CRM/ERP integration (HubSpot/Salesforce/others)",
          "Email/calendar automation",
          "APIs, webhooks, middleware",
          "Automation platforms (n8n/Make/Zapier) + custom code",
        ],
        fr: [
          "Intégration CRM/ERP (HubSpot/Salesforce/autres)",
          "Automatisation email/calendrier",
          "APIs, webhooks, middleware",
          "Plateformes (n8n/Make/Zapier) + code sur mesure",
        ],
        de: [
          "CRM/ERP-Integration (HubSpot/Salesforce/weitere)",
          "E-Mail/Kalender-Automation",
          "APIs, Webhooks, Middleware",
          "Plattformen (n8n/Make/Zapier) + Custom Code",
        ],
        lb: [
          "CRM/ERP-Integratioun (HubSpot/Salesforce/anerer)",
          "E-Mail/Kalenner-Automatisatioun",
          "APIs, Webhooks, Middleware",
          "Plattformen (n8n/Make/Zapier) + Custom Code",
        ],
      },
      keywords: [
        "integration",
        "crm",
        "erp",
        "api",
        "webhook",
        "n8n",
        "zapier",
        "make",
      ],
    },

    // 3) Workflow automation (same as before)
    {
      id: "services.workflows",
      name: {
        en: "Workflow Automation",
        fr: "Automatisation des workflows",
        de: "Workflow-Automatisierung",
        lb: "Workflow-Automatisatioun",
      },
      outcomes: {
        en: ["reduced cost", "fewer errors", "faster delivery"],
        fr: ["coûts réduits", "moins d’erreurs", "livraison plus rapide"],
        de: ["geringere Kosten", "weniger Fehler", "schnellere Umsetzung"],
        lb: ["manner Käschten", "manner Feeler", "méi séier Liwwerung"],
      },
      includes: {
        en: [
          "Sales ops automation (lead routing, follow-ups)",
          "Support automation (ticket triage, auto-replies)",
          "Document workflows (intake, extraction, approvals)",
          "Monitoring and dashboards",
        ],
        fr: [
          "Automatisation sales ops (routage des leads, relances)",
          "Automatisation support (tri des tickets, réponses automatiques)",
          "Workflows documents (intake, extraction, validations)",
          "Monitoring et dashboards",
        ],
        de: [
          "Sales-Ops-Automation (Lead-Routing, Follow-ups)",
          "Support-Automation (Ticket-Triage, Auto-Antworten)",
          "Dokumenten-Workflows (Intake, Extraktion, Freigaben)",
          "Monitoring und Dashboards",
        ],
        lb: [
          "Sales-Ops Automatisatioun (Lead-Routing, Follow-ups)",
          "Support Automatisatioun (Ticket-Triage, Auto-Äntwerten)",
          "Dokument-Workflows (Intake, Extraktioun, Approvals)",
          "Monitoring an Dashboards",
        ],
      },
      keywords: [
        "workflow",
        "automation",
        "tickets",
        "documents",
        "monitoring",
        "dashboards",
      ],
    },

    // 4) NEW: Custom business web apps (ERP, ecommerce, inventory, cafe management, etc.)
    {
      id: "services.business_apps",
      name: {
        en: "Custom Business Web Apps (ERP, E-commerce, Admin Platforms)",
        fr: "Applications web métier sur mesure (ERP, e-commerce, plateformes admin)",
        de: "Individuelle Business-Web-Apps (ERP, E-Commerce, Admin-Plattformen)",
        lb: "Moossgeschneidert Business-Web-Apps (ERP, E-Commerce, Admin-Plattformen)",
      },
      outcomes: {
        en: [
          "centralized operations",
          "admin-controlled workflows",
          "better visibility and reporting",
          "reduced manual effort",
        ],
        fr: [
          "opérations centralisées",
          "workflows contrôlés par admin",
          "meilleure visibilité et reporting",
          "moins de travail manuel",
        ],
        de: [
          "zentralisierte Abläufe",
          "admin-gesteuerte Workflows",
          "mehr Transparenz und Reporting",
          "weniger manuelle Arbeit",
        ],
        lb: [
          "zentral Operatiounen",
          "admin-kontrolléiert Workflows",
          "méi Iwwerbléck a Reporting",
          "manner manuell Aarbecht",
        ],
      },
      includes: {
        en: [
          "ERP-style business apps (operations, back-office, reporting)",
          "E-commerce features (catalog, orders, customer workflows)",
          "Inventory/stock management (items, stock levels, movements)",
          "Centralized, admin-controlled cafe management app (menu, orders, stock, staff workflows)",
          "Role-based access (admin/manager/staff/customer)",
          "Automation + integrations (payments, CRM, accounting, notifications)",
        ],
        fr: [
          "Applications type ERP (opérations, back-office, reporting)",
          "Fonctionnalités e-commerce (catalogue, commandes, workflows clients)",
          "Gestion de stock (articles, niveaux de stock, mouvements)",
          "Application de gestion de café centralisée contrôlée par admin (menu, commandes, stock, équipe)",
          "Accès par rôles (admin/manager/employé/client)",
          "Automatisation + intégrations (paiements, CRM, compta, notifications)",
        ],
        de: [
          "ERP-ähnliche Business-Apps (Betrieb, Backoffice, Reporting)",
          "E-Commerce-Funktionen (Katalog, Bestellungen, Kundenprozesse)",
          "Inventar-/Bestandsmanagement (Artikel, Bestand, Bewegungen)",
          "Zentrale, admin-gesteuerte Café-Management-App (Menü, Bestellungen, Bestand, Team-Workflows)",
          "Rollenbasierter Zugriff (Admin/Manager/Mitarbeiter/Kunde)",
          "Automatisierung + Integrationen (Zahlungen, CRM, Buchhaltung, Benachrichtigungen)",
        ],
        lb: [
          "ERP-ähnlech Business-Apps (Operatiounen, Back-Office, Reporting)",
          "E-Commerce Features (Katalog, Bestellungen, Client-Workflows)",
          "Stock/Inventar-Management (Artikelen, Stock-Stand, Beweegungen)",
          "Zentral, admin-kontrolléiert Café-Management-App (Menu, Bestellungen, Stock, Staff-Workflows)",
          "Role-based Access (Admin/Manager/Staff/Client)",
          "Automatisatioun + Integratiounen (Payments, CRM, Accounting, Notifikatiounen)",
        ],
      },
      notes: {
        en: [
          "We build business web apps when you need a centralized system instead of scattered spreadsheets and manual processes.",
          "Apps can include an admin panel for managing data, content, roles, and knowledge-base updates for assistants.",
        ],
        fr: [
          "Nous créons des apps métier quand vous avez besoin d’un système central plutôt que des fichiers dispersés et des processus manuels.",
          "Les apps peuvent inclure un panneau admin pour gérer données, contenu, rôles et mises à jour de base de connaissances.",
        ],
        de: [
          "Wir bauen Business-Apps, wenn Sie ein zentrales System statt verstreuter Tabellen und manueller Prozesse brauchen.",
          "Optional mit Admin-Panel für Daten, Inhalte, Rollen und Knowledge-Base-Updates für Assistenten.",
        ],
        lb: [
          "Mir bauen Business-Apps wann Dir e zentral System braucht amplaz verspreete Tabellen a manuell Prozesser.",
          "Mat engem Admin-Panel fir Daten, Contenu, Rollen an Knowledge-Base-Updates fir Assistenten.",
        ],
      },
      keywords: [
        "erp",
        "business app",
        "web app",
        "ecommerce",
        "inventory",
        "stock management",
        "cafe management",
        "admin panel",
        "roles",
        "rbac",
      ],
    },
  ] as const,

  industries: {
    list: {
      en: [
        "Professional services",
        "E-commerce",
        "Logistics",
        "Healthcare (non-clinical workflows)",
        "Manufacturing",
        "Real estate",
      ],
      fr: [
        "Services professionnels",
        "E-commerce",
        "Logistique",
        "Santé (workflows non-cliniques)",
        "Industrie / fabrication",
        "Immobilier",
      ],
      de: [
        "Professionelle Dienstleistungen",
        "E-Commerce",
        "Logistik",
        "Gesundheitswesen (nicht-klinische Workflows)",
        "Fertigung",
        "Immobilien",
      ],
      lb: [
        "Professionell Servicer",
        "E-Commerce",
        "Logistik",
        "Gesondheetsberäich (net-klinesch Workflows)",
        "Industrie",
        "Immobiljen",
      ],
    },
  },

  process: {
    steps: {
      en: [
        "Discovery (goals, tools, pain points)",
        "Solution design (architecture + integrations)",
        "Build & test (automation + AI assistant)",
        "Deploy (security + monitoring)",
        "Support & iteration",
      ],
      fr: [
        "Découverte (objectifs, outils, points de douleur)",
        "Conception de solution (architecture + intégrations)",
        "Build & test (automatisation + assistant IA)",
        "Déploiement (sécurité + monitoring)",
        "Support & itération",
      ],
      de: [
        "Discovery (Ziele, Tools, Pain Points)",
        "Lösungsdesign (Architektur + Integrationen)",
        "Build & Test (Automatisierung + KI-Assistent)",
        "Deployment (Sicherheit + Monitoring)",
        "Support & Iteration",
      ],
      lb: [
        "Discovery (Ziler, Tools, Pain Points)",
        "Léisungsdesign (Architektur + Integratiounen)",
        "Build & Test (Automatisatioun + AI-Assistent)",
        "Deploy (Sécherheet + Monitoring)",
        "Support & Iteratioun",
      ],
    },
  },

  leadQuestions: {
    list: {
      en: [
        "What industry are you in?",
        "Which tools do you use (CRM/ERP/helpdesk/email)?",
        "What do you want to automate first?",
        "Roughly how many users/requests per month?",
      ],
      fr: [
        "Dans quel secteur êtes-vous ?",
        "Quels outils utilisez-vous (CRM/ERP/helpdesk/email) ?",
        "Que voulez-vous automatiser en premier ?",
        "Environ combien d’utilisateurs/de demandes par mois ?",
      ],
      de: [
        "In welcher Branche sind Sie tätig?",
        "Welche Tools nutzen Sie (CRM/ERP/Helpdesk/E-Mail)?",
        "Was möchten Sie zuerst automatisieren?",
        "Wie viele Nutzer/Anfragen pro Monat ungefähr?",
      ],
      lb: [
        "A wéi enger Branche sidd Dir?",
        "Wéi eng Tools benotzt Dir (CRM/ERP/Helpdesk/E-Mail)?",
        "Wat wëllt Dir als éischt automatiséieren?",
        "Ongeféier wéi vill Benotzer/Ufroen pro Mount?",
      ],
    },
  },

  contact: {
    email: "hello@aiautomation.com",
    formUrl: "/contact",
    note: {
      en: "Preferred: share details via our contact form or email so we can follow up with specifics.",
      fr: "Idéalement : partagez les détails via notre formulaire de contact ou par email afin que nous puissions répondre précisément.",
      de: "Bevorzugt: Teilen Sie Details über unser Kontaktformular oder per E-Mail, damit wir gezielt nachfassen können.",
      lb: "Am léifsten: d’Detailer iwwer eise Contact-Formulaire oder per E-Mail schécken, fir datt mir konkret kënne follow-up maachen.",
    },
    cta: {
      en: "Share your goal, tools, and your name/email/company so we can propose a simple plan. You can also use the contact form at /contact or email hello@aiautomation.com for more detail.",
      fr: "Partagez votre objectif, vos outils et votre nom/email/entreprise afin que nous proposions un plan simple. Vous pouvez aussi utiliser /contact ou écrire à hello@aiautomation.com.",
      de: "Teilen Sie Ihr Ziel, Ihre Tools sowie Ihren Namen/E-Mail/Firma, damit wir einen einfachen Plan vorschlagen können. Nutzen Sie /contact oder schreiben Sie an hello@aiautomation.com.",
      lb: "Deelt äert Zil, är Tools an ären Numm/E-Mail/Firma, da proposéiere mir e simple Plang. Dir kënnt och /contact benotzen oder un hello@aiautomation.com schreiwen.",
    },
  },

  qa: [
    {
      intent: "services.chatbots.public_vs_protected",
      tags: ["public chatbot", "protected chatbot", "auth", "login", "roles"],
      question: {
        en: "Do you offer public and protected chatbots?",
        fr: "Proposez-vous des chatbots publics et protégés ?",
        de: "Bietet ihr öffentliche und geschützte Chatbots an?",
        lb: "Bitt dir public an protected Chatbots un?",
      },
      answer: {
        en: "Yes. We can build a public chatbot for any website visitor (great for FAQs and lead capture) and a protected chatbot for authenticated users (great for customer portals or internal teams). We can also add role-based access and an admin panel to manage the knowledge base.",
        fr: "Oui. Nous pouvons créer un chatbot public pour tout visiteur (idéal pour FAQ et leads) et un chatbot protégé pour les utilisateurs authentifiés (idéal pour portails clients ou équipes internes). Nous pouvons aussi ajouter un accès par rôles et un panneau admin pour gérer la base de connaissances.",
        de: "Ja. Wir können einen öffentlichen Chatbot für alle Besucher (ideal für FAQs und Leads) und einen geschützten Chatbot für authentifizierte Nutzer (ideal für Kundenportale oder interne Teams) bauen. Zusätzlich sind rollenbasierter Zugriff und ein Admin-Panel für die Knowledge Base möglich.",
        lb: "Jo. Mir kënnen e public Chatbot fir all Visiteur (super fir FAQen a Leads) an e protected Chatbot fir authentifizéiert Benotzer (super fir Client-Portaler oder intern Teams) bauen. Mir kënnen och Role-based Access an en Admin-Panel fir d’Knowledge Base derbäi maachen.",
      },
    },

    {
      intent: "services.business_apps.what_you_build",
      tags: [
        "erp",
        "ecommerce",
        "inventory",
        "stock",
        "cafe management",
        "admin panel",
        "web app",
      ],
      question: {
        en: "What kinds of business web apps can you build?",
        fr: "Quels types d’applications web métier pouvez-vous développer ?",
        de: "Welche Arten von Business-Web-Apps könnt ihr bauen?",
        lb: "Wat fir Business-Web-Apps kënnt dir bauen?",
      },
      answer: {
        en: "We build custom business web apps such as ERP-style systems, e-commerce workflows, inventory/stock management tools, and centralized admin-controlled platforms (for example a cafe management app with menu, orders, stock, and staff workflows). We also add integrations and automation so your data flows across tools cleanly.",
        fr: "Nous développons des applications web métier sur mesure : systèmes type ERP, workflows e-commerce, outils de gestion de stock, et plateformes centralisées contrôlées par admin (par exemple une app de gestion de café : menu, commandes, stock, équipe). Nous ajoutons aussi des intégrations et de l’automatisation pour que les données circulent proprement entre vos outils.",
        de: "Wir bauen individuelle Business-Web-Apps: ERP-ähnliche Systeme, E-Commerce-Workflows, Inventar-/Bestandsmanagement und zentrale admin-gesteuerte Plattformen (z. B. eine Café-Management-App mit Menü, Bestellungen, Bestand und Team-Workflows). Zusätzlich integrieren und automatisieren wir Tools für sauberen Datenfluss.",
        lb: "Mir bauen moossgeschneidert Business-Web-Apps: ERP-ähnlech Systemer, E-Commerce-Workflows, Stock/Inventar-Management an zentral admin-kontrolléiert Plattformen (z. B. eng Café-Management-App mat Menu, Bestellungen, Stock a Staff-Workflows). Mir maachen och Integratiounen an Automatisatioun, fir datt d’Daten propper tëscht Tools fléissen.",
      },
    },
  ] as const satisfies readonly KBAnswer[],
} as const;
