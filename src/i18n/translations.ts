import type { Locale } from './config';

export const translations = {
  ar: {
    // Common
    common: {
      loading: 'جاري التحميل...',
      error: 'حدث خطأ',
      retry: 'إعادة المحاولة',
      readMore: 'اقرأ المزيد',
      learnMore: 'تعرف أكثر',
      contactUs: 'تواصل معنا',
      getStarted: 'ابدأ الآن',
      explore: 'استكشف',
      download: 'تحميل',
      viewDemo: 'عرض تجريبي',
      backToHome: 'العودة للرئيسية',
      language: 'اللغة',
      arabic: 'العربية',
      english: 'English',
      theme: 'السمة',
      light: 'فاتح',
      dark: 'داكن',
      search: 'بحث',
      menu: 'القائمة',
      close: 'إغلاق',
      open: 'فتح',
      next: 'التالي',
      previous: 'السابق',
      submit: 'إرسال',
      sending: 'جاري الإرسال...',
      sent: 'تم الإرسال',
      required: 'مطلوب',
      optional: 'اختياري',
      name: 'الاسم',
      email: 'البريد الإلكتروني',
      phone: 'الهاتف',
      message: 'الرسالة',
      subject: 'الموضوع',
      company: 'الشركة',
      website: 'الموقع الإلكتروني',
    },

    // Navigation
    nav: {
      home: 'الرئيسية',
      services: 'خدماتنا',
      products: 'منتجاتنا',
      work: 'أعمالنا',
      about: 'من نحن',
      contact: 'تواصل معنا',
      raseed: 'Raseed — رصيد',
      clover: 'Clover Flow',
    },

    // Hero
    hero: {
      title: 'نحوّل الأفكار إلى حلول تقنية عملية',
      subtitle: 'نطوّر المواقع والتطبيقات والأنظمة البرمجية المصممة لتلبية احتياجات الأعمال، من الفكرة والتصميم إلى التطوير والنشر والدعم.',
      ctaPrimary: 'استكشف خدماتنا',
      ctaSecondary: 'تعرف على منتجاتنا',
      scrollDown: 'اسحب لأسفل',
    },

    // About
    about: {
      title: 'من نحن',
      subtitle: 'Blue Orbit Technologies — شركة تقنية تبني الحلول والمنتجات البرمجية.',
      description: 'نحن شركة تقنية متخصصة في تطوير الحلول البرمجية المخصصة، والمنتجات المستقلة، والتطبيقات التي تخدم احتياجات الأعمال الحقيقية. نؤمن بأن التقنية يجب أن تكون أداة عملية لحل المشكلات، لا هدفًا بحد ذاتها.',
      whatWeBuild: 'ما نبنيه',
      whatWeBuildItems: [
        'مواقع وتطبيقات ويب حديثة',
        'تطبيقات جوال (Android)',
        'أنظمة أعمال وإدارة (ERP, CRM, POS)',
        'برمجيات مخصصة حسب الطلب',
        'تكامل أنظمة وواجهات API',
        'حلول سحابية و Offline-first',
      ],
      founder: {
        title: 'المؤسس والقيادة التقنية',
        name: 'المهندس أيهم سيف',
        role: 'مؤسس',
        experience: '12+ سنة خبرة',
        bio: 'يتمتع بخبرة تزيد عن 12 عامًا في هندسة البرمجيات، هندسة الحلول، تطوير الأنظمة، القيادة التقنية، البنية التحتية، DevOps، وقواعد البيانات، مع خبرة عملية في بناء وإدارة البرمجيات من تحليل المتطلبات وتصميم الحلول إلى التطوير والاختبار والنشر والتشغيل والدعم المستمر. يمتلك خبرة واسعة في تطوير حلول وأنظمة المؤسسات، SaaS، ERP، CRM، HR، Finance، POS، E-commerce، CMS، أنظمة المصادقة، أتمتة العمليات، وتكامل الخدمات.',
      },
      methodology: {
        title: 'كيف نعمل',
        steps: [
          { step: '01', title: 'المتطلبات', desc: 'فهم عميق للاحتياجات وسياق العمل' },
          { step: '02', title: 'التحليل', desc: 'دراسة الجدوى التقنية وتصميم الحلول' },
          { step: '03', title: 'البنية التحتية', desc: 'اختيار التقنيات المناسبة وتصميم النظام' },
          { step: '04', title: 'التطوير', desc: 'بناء الحل بمعايير جودة عالية' },
          { step: '05', title: 'الاختبار', desc: 'اختبار شامل للوظائف والأداء' },
          { step: '06', title: 'النشر', desc: 'إطلاق سلس في بيئة الإنتاج' },
          { step: '07', title: 'الدعم المستمر', desc: 'صيانة، تحديثات، وتحسين مستمر' },
        ],
      },
    },

    // Services
    services: {
      title: 'خدماتنا',
      subtitle: 'نقدم مجموعة متكاملة من الخدمات التقنية المصممة لتلبية احتياجات الأعمال المختلفة.',
      viewAll: 'عرض جميع الخدمات',
      categories: {
        development: 'التطوير',
        consulting: 'الاستشارات',
        infrastructure: 'البنية التحتية',
      },
    },

    // Products
    products: {
      title: 'منتجاتنا',
      subtitle: 'نطور منتجاتنا البرمجية الخاصة التي تحل مشكلات حقيقية في السوق.',
      ourProducts: 'منتجاتنا',
      exploreProduct: 'استكشف المنتج',
      features: 'المميزات',
      platforms: 'المنصات المدعومة',
      download: 'تحميل التطبيق',
      screenshots: 'لقطات من التطبيق',
      comingSoon: 'قريباً',
    },

    // Work
    work: {
      title: 'أعمالنا',
      subtitle: 'مشاريع ومنتجات قمنا ببنائها وتطويرها.',
      projects: 'المشاريع',
      products: 'المنتجات',
      viewProject: 'عرض المشروع',
      caseStudy: 'دراسة حالة',
      technologies: 'التقنيات المستخدمة',
    },

    // Contact
    contact: {
      title: 'تواصل معنا',
      subtitle: 'نرحب بتواصلكم للاستفسارات، الشراكات، أو طلب الخدمات التقنية.',
      form: {
        title: 'أرسل رسالة',
        success: 'تم إرسال رسالتك بنجاح، سنرد عليك في أقرب وقت.',
        error: 'فشل الإرسال، يرجى المحاولة مرة أخرى أو التواصل المباشر.',
      },
      info: {
        title: 'معلومات التواصل',
        email: 'البريد الإلكتروني',
        phone: 'الهاتف',
        whatsapp: 'واتساب',
        address: 'العنوان',
        socialMedia: 'وسائل التواصل',
      },
      cta: 'مستعد للبدء؟',
      ctaDesc: 'تواصل معنا لمناقشة مشروعك القادم.',
    },

    // Why BOTech
    whyBotech: {
      title: 'لماذا BOTech؟',
      subtitle: 'ما يميز نهجنا في بناء الحلول التقنية.',
    },

    // Footer
    footer: {
      tagline: 'نحوّل الأفكار إلى حلول تقنية عملية',
      company: 'الشركة',
      products: 'المنتجات',
      services: 'الخدمات',
      resources: 'الموارد',
      legal: 'القانونية',
      privacy: 'سياسة الخصوصية',
      terms: 'شروط الاستخدام',
      copyright: 'جميع الحقوق محفوظة',
      madeWith: 'صنع بـ',
      followUs: 'تابعنا',
    },

    // Raseed
    raseed: {
      hero: {
        title: 'Raseed — رصيد',
        subtitle: 'تطبيق تحويل الرصيد لنقاط البيع',
        description: 'تطبيق يساعد نقاط بيع الرصيد على تنفيذ عمليات التحويل بشكل أسرع وتنظيم العمليات المرتبطة بها.',
        ctaDownload: 'تحميل للتطبيق',
        ctaContact: 'تواصل للمبيعات',
      },
      features: {
        title: 'المميزات الرئيسية',
        fastTransfer: 'تحويل سريع',
        fastTransferDesc: 'تنفيذ عمليات تحويل الرصيد في ثوانٍ معدودة',
        operationsLog: 'سجل العمليات',
        operationsLogDesc: 'تتبع ومراجعة جميع عمليات التحويل بتفاصيل كاملة',
        contacts: 'إدارة جهات الاتصال',
        contactsDesc: 'حفظ وتنظيم أرقام العملاء والموردين للوصول السريع',
        balance: 'متابعة الرصيد',
        balanceDesc: 'مراقبة الأرصدة المتاحة مع تنبيهات الرصيد المنخفض',
        offline: 'دعم العمل دون اتصال',
        offlineDesc: 'يعمل بدون إنترنت مع مزامنة تلقائية عند توفره',
        auth: 'مصادقة آمنة',
        authDesc: 'حماية الحساب بـ PIN أو البصمة الحيوية',
      },
      howItWorks: {
        title: 'كيف يعمل',
        steps: [
          { step: '01', title: 'تسجيل الدخول', desc: 'دخول آمن بـ PIN أو بصمة' },
          { step: '02', title: 'اختيار العملية', desc: 'تحويل رصيد، استعلام، أو دفع' },
          { step: '03', title: 'إدخال البيانات', desc: 'الرقم، المبلغ، والملاحظات' },
          { step: '04', title: 'التأكيد والإرسال', desc: 'مراجعة التفاصيل وتنفيذ العملية' },
          { step: '05', title: 'الإيصال والسجل', desc: 'حصول على إيصال وحفظ في السجل' },
        ],
      },
      screenshots: 'لقطات الشاشة',
      download: {
        title: 'احصل على Raseed',
        android: 'تحميل من متجر Google Play',
        apk: 'تحميل APK مباشر',
        comingSoon: 'متاح قريباً على المتجر',
      },
      faq: {
        title: 'أسئلة شائعة',
        items: [
          { q: 'هل يعمل التطبيق بدون إنترنت؟', a: 'نعم، يعمل في وضع عدم الاتصال وتتم المزامنة عند توفر الإنترنت.' },
          { q: 'ما أنظمة التشغيل المدعومة؟', a: 'Android 8.0 وأحدث.' },
          { q: 'كيف تتم حماية البيانات؟', a: 'تشفير محلي، مصادقة PIN/بصمة، وعدم تخزين بيانات حساسة في السحابة.' },
        ],
      },
    },

    // Clover
    clover: {
      hero: {
        title: 'Clover Flow',
        subtitle: 'إدارة نقاط البيع والأعمال',
        description: 'منصة متكاملة لإدارة المبيعات، المخزون، العملاء، والفروع — مصممة للبساطة والسرعة.',
        ctaDemo: 'جرب العرض التجريبي',
        ctaContact: 'تواصل للمبيعات',
      },
      features: {
        title: 'المميزات الرئيسية',
        pos: 'نقطة بيع (POS)',
        posDesc: 'واجهة بيع سريعة تدعم النقد، البطاقات، والأجل',
        inventory: 'إدارة المخزون',
        inventoryDesc: 'تتبع الكميات، التنبيهات، ونقل المخزون بين الفروع',
        products: 'إدارة المنتجات',
        productsDesc: 'منتجات، تنويعات، باركود، وأسعار متعددة',
        barcode: 'الباركود',
        barcodeDesc: 'مسح وطباعة الباركود، بحث سريع بالمسح',
        customers: 'العملاء',
        customersDesc: 'ملفات العملاء، سجل المشتريات، والحد الائتماني',
        stores: 'الفروع',
        storesDesc: 'إدارة متعددة الفروع مع صلاحيات مستخدمين',
        offline: 'Offline-First',
        offlineDesc: 'عمل كامل دون إنترنت، مزامنة ذكية عند الاتصال',
        reports: 'التقارير',
        reportsDesc: 'مبيعات، مخزون، أداء، وتقارير مالية يومية/شهرية',
      },
      modules: {
        title: 'وحدات النظام',
        items: [
          { name: 'المبيعات', desc: 'نقطة البيع، الفواتير، المرتجعات' },
          { name: 'المخزون', desc: 'المنتجات، التحويلات، الجرد' },
          { name: 'العملاء', desc: 'الملفات، الولاء، الحسابات' },
          { name: 'الفروع', desc: 'المستخدمون، الصلاحيات، الإعدادات' },
          { name: 'التقارير', desc: 'لوحة تحكم، تصدير، مجدولة' },
          { name: 'الإعدادات', desc: 'الضرائب، الطابعات، النسخ الاحتياطي' },
        ],
      },
      screenshots: 'لقطات الشاشة',
      platforms: {
        title: 'المنصات',
        android: 'تطبيق Android للمبيعات الميدانية',
        web: 'لوحة تحكم ويب للإدارة',
      },
      faq: {
        title: 'أسئلة شائعة',
        items: [
          { q: 'هل يدعم عدة فروع؟', a: 'نعم، يدعم إدارة غير محدودة للفروع مع صلاحيات تفصيلية.' },
          { q: 'هل يعمل بدون إنترنت؟', a: 'نعم، معمارية Offline-first مع مزامنة تلقائية عند توفر الاتصال.' },
          { q: 'هل يمكن تخصيصه؟', a: 'نعم، نقدم تخصيصات حسب احتياج العميل المؤسسي.' },
        ],
      },
      howItWorks: {
        title: 'كيف يعمل',
        steps: [
          { step: '01', title: 'تسجيل الدخول', desc: 'دخول آمن ببصمة أو رمز PIN' },
          { step: '02', title: 'اختيار الفرع', desc: 'اختر الفرع الذي ستعمل عليه' },
          { step: '03', title: 'بدء البيع', desc: 'أضف المنتجات، اختر العميل، وطريقة الدفع' },
          { step: '04', title: 'إتمام العملية', desc: 'اطبع الفاتورة أو أرسلها للعميل' },
          { step: '05', title: 'المزامنة', desc: 'تتم مزامنة البيانات تلقائياً عند الاتصال' },
        ],
      },
      download: {
        title: 'احصل على Clover Flow',
        android: 'تحميل تطبيق Android',
        web: 'الدخول للوحة التحكم',
        comingSoon: 'متاح قريباً',
      },
    },

    // SEO / Meta
    seo: {
      homeTitle: 'Blue Orbit Technologies | حلول تقنية وبرمجية',
      homeDesc: 'نحوّل الأفكار إلى حلول تقنية عملية. نطوّر المواقع والتطبيقات والأنظمة البرمجية المصممة لتلبية احتياجات الأعمال.',
      aboutTitle: 'من نحن | Blue Orbit Technologies',
      aboutDesc: 'تعرف على Blue Orbit Technologies، فريق التأسيس، ومنهجية العمل في بناء الحلول التقنية.',
      servicesTitle: 'خدماتنا | Blue Orbit Technologies',
      servicesDesc: 'خدمات تقنية متكاملة: تطوير المواقع، تطبيقات الجوال، الأنظمة المخصصة، التكامل، والحلول السحابية.',
      workTitle: 'أعمالنا | Blue Orbit Technologies',
      workDesc: 'مشاريع ومنتجات Blue Orbit Technologies: Raseed، Clover Flow، وحلول تقنية مخصصة.',
      contactTitle: 'تواصل معنا | Blue Orbit Technologies',
      contactDesc: 'تواصل مع Blue Orbit Technologies للاستفسارات، الشراكات، أو طلب خدمات تقنية.',
      raseedTitle: 'Raseed | رصيد - حلول تحويل الرصيد لنقاط البيع',
      raseedDesc: 'تطبيق Raseed يساعد نقاط بيع الرصيد على تنفيذ عمليات التحويل بشكل أسرع وتنظيم العمليات.',
      cloverTitle: 'Clover Flow | POS & Business Management',
      cloverDesc: 'منصة لإدارة نقاط البيع والأعمال، مصممة لتبسيط عمليات البيع والمخزون وإدارة العمل.',
    },
  },

  en: {
    // Common
    common: {
      loading: 'Loading...',
      error: 'An error occurred',
      retry: 'Retry',
      readMore: 'Read more',
      learnMore: 'Learn more',
      contactUs: 'Contact us',
      getStarted: 'Get started',
      explore: 'Explore',
      download: 'Download',
      viewDemo: 'View demo',
      backToHome: 'Back to home',
      language: 'Language',
      arabic: 'العربية',
      english: 'English',
      theme: 'Theme',
      light: 'Light',
      dark: 'Dark',
      search: 'Search',
      menu: 'Menu',
      close: 'Close',
      open: 'Open',
      next: 'Next',
      previous: 'Previous',
      submit: 'Submit',
      sending: 'Sending...',
      sent: 'Sent',
      required: 'Required',
      optional: 'Optional',
      name: 'Name',
      email: 'Email',
      phone: 'Phone',
      message: 'Message',
      subject: 'Subject',
      company: 'Company',
      website: 'Website',
    },

    // Navigation
    nav: {
      home: 'Home',
      services: 'Services',
      products: 'Products',
      work: 'Work',
      about: 'About',
      contact: 'Contact',
      raseed: 'Raseed',
      clover: 'Clover Flow',
    },

    // Hero
    hero: {
      title: 'Turning ideas into practical technology solutions',
      subtitle: 'We build websites, applications, and software systems designed for business needs—from concept and design through development, deployment, and ongoing support.',
      ctaPrimary: 'Explore Services',
      ctaSecondary: 'View Products',
      scrollDown: 'Scroll down',
    },

    // About
    about: {
      title: 'About Us',
      subtitle: 'Blue Orbit Technologies — A technology company building software solutions and products.',
      description: 'We are a technology company specializing in custom software solutions, independent products, and applications that serve real business needs. We believe technology should be a practical tool for solving problems—not an end in itself.',
      whatWeBuild: 'What We Build',
      whatWeBuildItems: [
        'Modern web sites and applications',
        'Mobile apps (Android)',
        'Business systems (ERP, CRM, POS)',
        'Custom software on demand',
        'Systems integration & APIs',
        'Cloud & Offline-first solutions',
      ],
      founder: {
        title: 'Founder & Technical Leadership',
        name: 'Eng. Ayham Seif',
        role: 'Founder',
        experience: '12+ years experience',
        bio: 'With over 12 years of experience in software engineering, solution architecture, system development, technical leadership, infrastructure, DevOps, and databases—hands-on across the full software lifecycle from requirements analysis and solution design through development, testing, deployment, operations, and continuous support. Extensive experience building enterprise solutions, SaaS, ERP, CRM, HR, Finance, POS, E-commerce, CMS, authentication systems, process automation, and service integration.',
      },
      methodology: {
        title: 'How We Work',
        steps: [
          { step: '01', title: 'Requirements', desc: 'Deep understanding of needs and business context' },
          { step: '02', title: 'Analysis', desc: 'Technical feasibility and solution design' },
          { step: '03', title: 'Architecture', desc: 'Technology selection and system design' },
          { step: '04', title: 'Development', desc: 'Build with high quality standards' },
          { step: '05', title: 'Testing', desc: 'Comprehensive functional and performance testing' },
          { step: '06', title: 'Deployment', desc: 'Smooth production launch' },
          { step: '07', title: 'Ongoing Support', desc: 'Maintenance, updates, continuous improvement' },
        ],
      },
    },

    // Services
    services: {
      title: 'Services',
      subtitle: 'We offer a comprehensive range of technology services designed for diverse business needs.',
      viewAll: 'View all services',
      categories: {
        development: 'Development',
        consulting: 'Consulting',
        infrastructure: 'Infrastructure',
      },
    },

    // Products
    products: {
      title: 'Our Products',
      subtitle: 'We build our own software products that solve real market problems.',
      ourProducts: 'Our Products',
      exploreProduct: 'Explore Product',
      features: 'Features',
      platforms: 'Supported Platforms',
      download: 'Download App',
      screenshots: 'App Screenshots',
      comingSoon: 'Coming Soon',
    },

    // Work
    work: {
      title: 'Our Work',
      subtitle: 'Projects and products we have built and developed.',
      projects: 'Projects',
      products: 'Products',
      viewProject: 'View Project',
      caseStudy: 'Case Study',
      technologies: 'Technologies Used',
    },

    // Contact
    contact: {
      title: 'Contact Us',
      subtitle: 'We welcome your inquiries, partnerships, or requests for technology services.',
      form: {
        title: 'Send a Message',
        success: 'Your message has been sent successfully. We\'ll get back to you soon.',
        error: 'Failed to send. Please try again or contact us directly.',
      },
      info: {
        title: 'Contact Information',
        email: 'Email',
        phone: 'Phone',
        whatsapp: 'WhatsApp',
        address: 'Address',
        socialMedia: 'Social Media',
      },
      cta: 'Ready to start?',
      ctaDesc: 'Get in touch to discuss your next project.',
    },

    // Why BOTech
    whyBotech: {
      title: 'Why BOTech?',
      subtitle: 'What sets our approach to building technology solutions apart.',
    },

    // Footer
    footer: {
      tagline: 'Turning ideas into practical technology solutions',
      company: 'Company',
      products: 'Products',
      services: 'Services',
      resources: 'Resources',
      legal: 'Legal',
      privacy: 'Privacy Policy',
      terms: 'Terms of Service',
      copyright: 'All rights reserved',
      madeWith: 'Made with',
      followUs: 'Follow us',
    },

    // Raseed
    raseed: {
      hero: {
        title: 'Raseed',
        subtitle: 'Balance Transfer App for POS',
        description: 'An app that helps retail balance points execute transfers faster and organize related operations.',
        ctaDownload: 'Download App',
        ctaContact: 'Contact Sales',
      },
      features: {
        title: 'Key Features',
        fastTransfer: 'Fast Transfers',
        fastTransferDesc: 'Execute balance transfers in seconds',
        operationsLog: 'Operations Log',
        operationsLogDesc: 'Track and review all transfers with full details',
        contacts: 'Contacts Management',
        contactsDesc: 'Save and organize customer and vendor numbers',
        balance: 'Balance Tracking',
        balanceDesc: 'Monitor available balances with low-balance alerts',
        offline: 'Offline Support',
        offlineDesc: 'Works offline with automatic sync when online',
        auth: 'Secure Authentication',
        authDesc: 'PIN or biometric account protection',
      },
      howItWorks: {
        title: 'How It Works',
        steps: [
          { step: '01', title: 'Sign In', desc: 'Secure PIN or biometric login' },
          { step: '02', title: 'Choose Action', desc: 'Transfer, inquiry, or payment' },
          { step: '03', title: 'Enter Details', desc: 'Number, amount, and notes' },
          { step: '04', title: 'Confirm & Send', desc: 'Review details and execute' },
          { step: '05', title: 'Receipt & Log', desc: 'Get receipt and auto-save to log' },
        ],
      },
      screenshots: 'Screenshots',
      download: {
        title: 'Get Raseed',
        android: 'Download from Google Play',
        apk: 'Direct APK Download',
        comingSoon: 'Coming soon to store',
      },
      faq: {
        title: 'FAQ',
        items: [
          { q: 'Does the app work offline?', a: 'Yes, works offline with automatic sync when connectivity returns.' },
          { q: 'What OS versions are supported?', a: 'Android 8.0 and above.' },
          { q: 'How is data protected?', a: 'Local encryption, PIN/biometric auth, no sensitive cloud storage.' },
        ],
      },
    },

    // Clover
    clover: {
      hero: {
        title: 'Clover Flow',
        subtitle: 'POS & Business Management',
        description: 'An integrated platform for sales, inventory, customers, and branches—designed for simplicity and speed.',
        ctaDemo: 'Try Demo',
        ctaContact: 'Contact Sales',
      },
      features: {
        title: 'Key Features',
        pos: 'Point of Sale (POS)',
        posDesc: 'Fast sales interface supporting cash, card, and credit',
        inventory: 'Inventory Management',
        inventoryDesc: 'Track quantities, alerts, and inter-branch transfers',
        products: 'Product Management',
        productsDesc: 'Products, variants, barcodes, and multi-pricing',
        barcode: 'Barcode Support',
        barcodeDesc: 'Scan and print barcodes, quick search by scan',
        customers: 'Customers',
        customersDesc: 'Customer profiles, purchase history, credit limits',
        stores: 'Multi-Store',
        storesDesc: 'Unlimited branches with granular user permissions',
        offline: 'Offline-First',
        offlineDesc: 'Fully functional offline, smart sync when online',
        reports: 'Reports & Analytics',
        reportsDesc: 'Sales, inventory, performance, daily/monthly financials',
      },
      modules: {
        title: 'System Modules',
        items: [
          { name: 'Sales', desc: 'POS, invoices, returns' },
          { name: 'Inventory', desc: 'Products, transfers, stock counts' },
          { name: 'Customers', desc: 'Profiles, loyalty, accounts' },
          { name: 'Branches', desc: 'Users, permissions, settings' },
          { name: 'Reports', desc: 'Dashboard, export, scheduled' },
          { name: 'Settings', desc: 'Taxes, printers, backup' },
        ],
      },
      screenshots: 'Screenshots',
      platforms: {
        title: 'Platforms',
        android: 'Android app for field sales',
        web: 'Web dashboard for management',
      },
      faq: {
        title: 'FAQ',
        items: [
          { q: 'Does it support multiple branches?', a: 'Yes, unlimited branches with granular permissions.' },
          { q: 'Does it work offline?', a: 'Yes, offline-first architecture with automatic sync on connectivity.' },
          { q: 'Can it be customized?', a: 'Yes, we offer customization for enterprise clients.' },
        ],
      },
      howItWorks: {
        title: 'How It Works',
        steps: [
          { step: '01', title: 'Sign In', desc: 'Secure biometric or PIN login' },
          { step: '02', title: 'Select Branch', desc: 'Choose the branch you\'ll work on' },
          { step: '03', title: 'Start Selling', desc: 'Add products, select customer, and payment method' },
          { step: '04', title: 'Complete Sale', desc: 'Print receipt or send to customer' },
          { step: '05', title: 'Sync', desc: 'Data syncs automatically when online' },
        ],
      },
      download: {
        title: 'Get Clover Flow',
        android: 'Download Android App',
        web: 'Access Web Dashboard',
        comingSoon: 'Coming soon',
      },
    },

    // SEO / Meta
    seo: {
      homeTitle: 'Blue Orbit Technologies | Technology Solutions',
      homeDesc: 'Turning ideas into practical technology solutions. We build websites, apps, and software systems for business needs.',
      aboutTitle: 'About | Blue Orbit Technologies',
      aboutDesc: 'Learn about Blue Orbit Technologies, the founding team, and our approach to building technology solutions.',
      servicesTitle: 'Services | Blue Orbit Technologies',
      servicesDesc: 'Comprehensive technology services: web development, mobile apps, custom systems, integration, and cloud solutions.',
      workTitle: 'Work | Blue Orbit Technologies',
      workDesc: 'Projects and products by Blue Orbit Technologies: Raseed, Clover Flow, and custom technology solutions.',
      contactTitle: 'Contact | Blue Orbit Technologies',
      contactDesc: 'Contact Blue Orbit Technologies for inquiries, partnerships, or technology services.',
      raseedTitle: 'Raseed | Balance Transfer App for POS',
      raseedDesc: 'Raseed helps retail balance points execute transfers faster and organize operations.',
      cloverTitle: 'Clover Flow | POS & Business Management',
      cloverDesc: 'A platform for POS and business management, designed to simplify sales, inventory, and operations.',
    },
  },
} as const satisfies Record<Locale, Translations>;

export type Translations = {
  common: {
    loading: string;
    error: string;
    retry: string;
    readMore: string;
    learnMore: string;
    contactUs: string;
    getStarted: string;
    explore: string;
    download: string;
    viewDemo: string;
    backToHome: string;
    language: string;
    arabic: string;
    english: string;
    theme: string;
    light: string;
    dark: string;
    search: string;
    menu: string;
    close: string;
    open: string;
    next: string;
    previous: string;
    submit: string;
    sending: string;
    sent: string;
    required: string;
    optional: string;
    name: string;
    email: string;
    phone: string;
    message: string;
    subject: string;
    company: string;
    website: string;
  };
  nav: {
    home: string;
    services: string;
    products: string;
    work: string;
    about: string;
    contact: string;
    raseed: string;
    clover: string;
  };
  hero: {
    title: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
    scrollDown: string;
  };
  about: {
    title: string;
    subtitle: string;
    description: string;
    whatWeBuild: string;
    whatWeBuildItems: string[];
    founder: {
      title: string;
      name: string;
      role: string;
      experience: string;
      bio: string;
    };
    methodology: {
      title: string;
      steps: { step: string; title: string; desc: string }[];
    };
  };
  services: {
    title: string;
    subtitle: string;
    viewAll: string;
    categories: {
      development: string;
      consulting: string;
      infrastructure: string;
    };
  };
  products: {
    title: string;
    subtitle: string;
    ourProducts: string;
    exploreProduct: string;
    features: string;
    platforms: string;
    download: string;
    screenshots: string;
    comingSoon: string;
  };
  work: {
    title: string;
    subtitle: string;
    projects: string;
    products: string;
    viewProject: string;
    caseStudy: string;
    technologies: string;
  };
  contact: {
    title: string;
    subtitle: string;
    form: {
      title: string;
      success: string;
      error: string;
    };
    info: {
      title: string;
      email: string;
      phone: string;
      whatsapp: string;
      address: string;
      socialMedia: string;
    };
    cta: string;
    ctaDesc: string;
  };
  whyBotech: {
    title: string;
    subtitle: string;
  };
  footer: {
    tagline: string;
    company: string;
    products: string;
    services: string;
    resources: string;
    legal: string;
    privacy: string;
    terms: string;
    copyright: string;
    madeWith: string;
    followUs: string;
  };
  raseed: {
    hero: {
      title: string;
      subtitle: string;
      description: string;
      ctaDownload: string;
      ctaContact: string;
    };
    features: {
      title: string;
      fastTransfer: string;
      fastTransferDesc: string;
      operationsLog: string;
      operationsLogDesc: string;
      contacts: string;
      contactsDesc: string;
      balance: string;
      balanceDesc: string;
      offline: string;
      offlineDesc: string;
      auth: string;
      authDesc: string;
    };
    howItWorks: {
      title: string;
      steps: { step: string; title: string; desc: string }[];
    };
    screenshots: string;
    download: {
      title: string;
      android: string;
      apk: string;
      comingSoon: string;
    };
    faq: {
      title: string;
      items: { q: string; a: string }[];
    };
  };
  clover: {
    hero: {
      title: string;
      subtitle: string;
      description: string;
      ctaDemo: string;
      ctaContact: string;
    };
    features: {
      title: string;
      pos: string;
      posDesc: string;
      inventory: string;
      inventoryDesc: string;
      products: string;
      productsDesc: string;
      barcode: string;
      barcodeDesc: string;
      customers: string;
      customersDesc: string;
      stores: string;
      storesDesc: string;
      offline: string;
      offlineDesc: string;
      reports: string;
      reportsDesc: string;
    };
    modules: {
      title: string;
      items: { name: string; desc: string }[];
    };
    howItWorks: {
      title: string;
      steps: { step: string; title: string; desc: string }[];
    };
    screenshots: string;
    platforms: {
      title: string;
      android: string;
      web: string;
    };
    download: {
      title: string;
      android: string;
      web: string;
      comingSoon: string;
    };
    faq: {
      title: string;
      items: { q: string; a: string }[];
    };
  };
  seo: {
    homeTitle: string;
    homeDesc: string;
    aboutTitle: string;
    aboutDesc: string;
    servicesTitle: string;
    servicesDesc: string;
    workTitle: string;
    workDesc: string;
    contactTitle: string;
    contactDesc: string;
    raseedTitle: string;
    raseedDesc: string;
    cloverTitle: string;
    cloverDesc: string;
  };
};

export function getTranslations(locale: Locale): Translations {
  return translations[locale];
}

export function t(locale: Locale, key: string): string {
  const keys = key.split('.');
  let value: any = translations[locale];
  for (const k of keys) {
    value = value?.[k];
    if (value === undefined) break;
  }
  return value || key;
}