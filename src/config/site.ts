export const siteConfig = {
  name: 'Blue Orbit Technologies',
  shortName: 'BOTech',
  tagline: {
    ar: 'نحوّل الأفكار إلى حلول تقنية عملية',
    en: 'Turning ideas into practical technology solutions',
  },
  description: {
    ar: 'نطوّر المواقع والتطبيقات والأنظمة البرمجية المصممة لتلبية احتياجات الأعمال، من الفكرة والتصميم إلى التطوير والنشر والدعم.',
    en: 'We build websites, applications, and software systems designed for business needs—from concept and design through development, deployment, and ongoing support.',
  },
  url: 'https://botech-live.com',
  ogImage: '/assets/brand/og-image.jpg',
  founder: {
    name: {
      ar: 'المهندس أيهم سيف',
      en: 'Eng. Ayham Seif',
    },
    title: {
      ar: 'مؤسس',
      en: 'Founder',
    },
    experience: '12+ years',
    bio: {
      ar: 'يتمتع بخبرة تزيد عن 12 عامًا في هندسة البرمجيات، هندسة الحلول، تطوير الأنظمة، القيادة التقنية، البنية التحتية، DevOps، وقواعد البيانات، مع خبرة عملية في بناء وإدارة البرمجيات من تحليل المتطلبات وتصميم الحلول إلى التطوير والاختبار والنشر والتشغيل والدعم المستمر.',
      en: 'With over 12 years of experience in software engineering, solution architecture, system development, technical leadership, infrastructure, DevOps, and databases—hands-on across the full software lifecycle from requirements analysis and solution design through development, testing, deployment, operations, and continuous support.',
    },
  },
  contact: {
    email: 'info@botech-live.com',
    whatsapp: '+966500000000',
    phone: '+966500000000',
    address: {
      ar: 'الرياض، المملكة العربية السعودية',
      en: 'Riyadh, Saudi Arabia',
    },
    social: {
      facebook: 'https://facebook.com/botechlive',
      youtube: 'https://youtube.com/@botechlive',
      linkedin: 'https://linkedin.com/company/botechlive',
      twitter: 'https://x.com/botechlive',
      github: 'https://github.com/botechlive',
    },
  },
  navigation: {
    main: [
      { key: 'home', href: '/', label: { ar: 'الرئيسية', en: 'Home' } },
      { key: 'services', href: '/services', label: { ar: 'خدماتنا', en: 'Services' } },
      { key: 'products', href: '/products', label: { ar: 'منتجاتنا', en: 'Products' } },
      { key: 'work', href: '/work', label: { ar: 'أعمالنا', en: 'Work' } },
      { key: 'about', href: '/about', label: { ar: 'من نحن', en: 'About' } },
      { key: 'contact', href: '/contact', label: { ar: 'تواصل معنا', en: 'Contact' } },
    ],
    products: [
      { key: 'raseed', href: '/raseed', label: { ar: 'Raseed — رصيد', en: 'Raseed' }, description: { ar: 'تطبيق تحويل الرصيد لنقاط البيع', en: 'Balance transfer app for POS' } },
      { key: 'clover', href: '/clover', label: { ar: 'Clover Flow', en: 'Clover Flow' }, description: { ar: 'إدارة نقاط البيع والأعمال', en: 'POS & Business Management' } },
    ],
    footer: {
      company: [
        { key: 'about', href: '/about', label: { ar: 'من نحن', en: 'About' } },
        { key: 'services', href: '/services', label: { ar: 'خدماتنا', en: 'Services' } },
        { key: 'work', href: '/work', label: { ar: 'أعمالنا', en: 'Work' } },
        { key: 'contact', href: '/contact', label: { ar: 'تواصل معنا', en: 'Contact' } },
      ],
      products: [
        { key: 'raseed', href: '/raseed', label: { ar: 'Raseed', en: 'Raseed' } },
        { key: 'clover', href: '/clover', label: { ar: 'Clover Flow', en: 'Clover Flow' } },
      ],
      legal: [
        { key: 'privacy', href: '/privacy', label: { ar: 'سياسة الخصوصية', en: 'Privacy Policy' } },
        { key: 'terms', href: '/terms', label: { ar: 'شروط الاستخدام', en: 'Terms of Service' } },
      ],
    },
  },
  products: {
    raseed: {
      name: 'Raseed',
      nameAr: 'رصيد',
      tagline: {
        ar: 'تطبيق تحويل الرصيد لنقاط البيع',
        en: 'Balance Transfer App for POS',
      },
      description: {
        ar: 'تطبيق يساعد نقاط بيع الرصيد على تنفيذ عمليات التحويل بشكل أسرع وتنظيم العمليات المرتبطة بها.',
        en: 'An app that helps balance retail points execute transfers faster and organize related operations.',
      },
      shortDescription: {
        ar: 'تنفيذ عمليات تحويل الرصيد بسرعة وتنظيم العمليات.',
        en: 'Fast balance transfers and organized operations for retail points.',
      },
      features: [
        {
          key: 'fast-transfer',
          title: { ar: 'تحويل سريع', en: 'Fast Transfers' },
          description: { ar: 'تنفيذ عمليات تحويل الرصيد في ثوانٍ', en: 'Execute balance transfers in seconds' },
        },
        {
          key: 'operations-log',
          title: { ar: 'سجل العمليات', en: 'Operations Log' },
          description: { ar: 'تتبع ومراجعة جميع عمليات التحويل', en: 'Track and review all transfer operations' },
        },
        {
          key: 'contacts',
          title: { ar: 'إدارة جهات الاتصال', en: 'Contacts Management' },
          description: { ar: 'حفظ وتنظيم أرقام العملاء والموردين', en: 'Save and organize customer and vendor numbers' },
        },
        {
          key: 'balance-tracking',
          title: { ar: 'متابعة الرصيد', en: 'Balance Tracking' },
          description: { ar: 'مراقبة الأرصدة المتاحة والتنبيهات', en: 'Monitor available balances with alerts' },
        },
        {
          key: 'offline-support',
          title: { ar: 'دعم العمل دون اتصال', en: 'Offline Support' },
          description: { ar: 'يعمل بدون إنترنت مع مزامنة عند التوفر', en: 'Works offline with sync when online' },
        },
        {
          key: 'auth-security',
          title: { ar: 'مصادقة آمنة', en: 'Secure Authentication' },
          description: { ar: 'تسجيل دخول محمي بـ PIN/بصمة', en: 'PIN/biometric protected login' },
        },
      ],
      platforms: ['android'],
      downloadLinks: {
        android: 'https://play.google.com/store/apps/details?id=com.botech.raseed',
        apk: 'https://botech-live.com/downloads/raseed.apk',
      },
      screenshots: [
        '/assets/raseed/screenshot-1.png',
        '/assets/raseed/screenshot-2.png',
        '/assets/raseed/screenshot-3.png',
      ],
    },
    clover: {
      name: 'Clover Flow',
      tagline: {
        ar: 'إدارة نقاط البيع والأعمال',
        en: 'POS & Business Management',
      },
      description: {
        ar: 'منصة لإدارة نقاط البيع والأعمال، مصممة لتبسيط عمليات البيع والمخزون وإدارة العمل.',
        en: 'A platform for POS and business management, designed to simplify sales, inventory, and operations.',
      },
      shortDescription: {
        ar: 'منصة متكاملة لإدارة المبيعات والمخزون والعملاء.',
        en: 'Integrated platform for sales, inventory, and customer management.',
      },
      features: [
        {
          key: 'pos',
          title: { ar: 'نقطة البيع (POS)', en: 'Point of Sale' },
          description: { ar: 'واجهة بيع سريعة وسهلة الاستخدام', en: 'Fast, easy-to-use sales interface' },
        },
        {
          key: 'inventory',
          title: { ar: 'إدارة المخزون', en: 'Inventory Management' },
          description: { ar: 'تتبع المنتجات، الكميات، والتنبيهات', en: 'Track products, quantities, and alerts' },
        },
        {
          key: 'products',
          title: { ar: 'إدارة المنتجات', en: 'Product Management' },
          description: { ar: 'إضافة وتعديل المنتجات مع الباركود', en: 'Add/edit products with barcode support' },
        },
        {
          key: 'barcode',
          title: { ar: 'دعم الباركود', en: 'Barcode Support' },
          description: { ar: 'مسح وإنشاء الباركود للمنتجات', en: 'Scan and generate product barcodes' },
        },
        {
          key: 'customers',
          title: { ar: 'إدارة العملاء', en: 'Customer Management' },
          description: { ar: 'سجل العملاء، المشتريات، والرصيد', en: 'Customer records, purchases, and credit' },
        },
        {
          key: 'stores',
          title: { ar: 'إدارة الفروع', en: 'Multi-Store Management' },
          description: { ar: 'إدارة عدة فروع من لوحة تحكم واحدة', en: 'Manage multiple branches from one dashboard' },
        },
        {
          key: 'offline',
          title: { ar: 'عمل بدون إنترنت', en: 'Offline-First' },
          description: { ar: 'يعمل بالكامل دون اتصال مع مزامنة سحابية', en: 'Fully functional offline with cloud sync' },
        },
        {
          key: 'reports',
          title: { ar: 'تقارير وتحليلات', en: 'Reports & Analytics' },
          description: { ar: 'تقارير المبيعات، المخزون، والأداء', en: 'Sales, inventory, and performance reports' },
        },
      ],
      platforms: ['android', 'web'],
      downloadLinks: {
        android: 'https://play.google.com/store/apps/details?id=com.botech.clover',
        web: 'https://clover.botech-live.com',
      },
      screenshots: [
        '/assets/clover/screenshot-1.png',
        '/assets/clover/screenshot-2.png',
        '/assets/clover/screenshot-3.png',
      ],
    },
  },
  services: [
    {
      key: 'web-development',
      title: { ar: 'تصميم وتطوير المواقع الإلكترونية', en: 'Web Design & Development' },
      description: { ar: 'تطوير مواقع حديثة وسريعة ومتجاوبة مع مختلف الأجهزة.', en: 'Modern, fast, responsive websites built for all devices.' },
      icon: 'globe',
    },
    {
      key: 'mobile-development',
      title: { ar: 'تطوير تطبيقات الهاتف المحمول', en: 'Mobile App Development' },
      description: { ar: 'تطوير تطبيقات Android حسب احتياجات المشروع.', en: 'Android apps tailored to project requirements.' },
      icon: 'smartphone',
    },
    {
      key: 'system-development',
      title: { ar: 'تطوير الأنظمة والبرمجيات', en: 'System & Software Development' },
      description: { ar: 'تطوير الأنظمة الإدارية والتجارية والبرمجيات المخصصة.', en: 'Custom business systems and administrative software.' },
      icon: 'server',
    },
    {
      key: 'custom-solutions',
      title: { ar: 'الحلول البرمجية المخصصة', en: 'Custom Software Solutions' },
      description: { ar: 'حلول يتم تصميمها حسب طبيعة العمل بدل الاعتماد على نظام عام لا يناسب الاحتياج.', en: 'Solutions designed around your business—not generic off-the-shelf software.' },
      icon: 'puzzle',
    },
    {
      key: 'integration',
      title: { ar: 'تكامل الأنظمة والخدمات', en: 'Systems Integration' },
      description: { ar: 'ربط الأنظمة والخدمات وواجهات API عند الحاجة.', en: 'Connect systems, services, and APIs as needed.' },
      icon: 'link',
    },
    {
      key: 'cloud-offline',
      title: { ar: 'الحلول السحابية والعمل دون اتصال', en: 'Cloud & Offline Solutions' },
      description: { ar: 'تطوير حلول يمكنها العمل مع الاتصال المحدود أو بدون اتصال، مع المزامنة عند توفره.', en: 'Solutions that work with limited or no connectivity, syncing when online.' },
      icon: 'cloud',
    },
    {
      key: 'automation',
      title: { ar: 'الأتمتة والحلول الذكية', en: 'Automation & Smart Solutions' },
      description: { ar: 'أتمتة العمليات المتكررة وتطوير حلول تساعد على تحسين سير العمل.', en: 'Automate repetitive tasks and build solutions that improve workflows.' },
      icon: 'zap',
    },
    {
      key: 'hosting-domains',
      title: { ar: 'خدمات النطاقات والاستضافة', en: 'Domains & Hosting' },
      description: { ar: 'المساعدة في تسجيل وإدارة النطاقات وخدمات الاستضافة المناسبة للمشروع.', en: 'Domain registration, management, and suitable hosting for your project.' },
      icon: 'database',
    },
    {
      key: 'deployment-support',
      title: { ar: 'النشر والصيانة والدعم التقني', en: 'Deployment, Maintenance & Support' },
      description: { ar: 'إعداد المشاريع للنشر وتحديثها وصيانتها ودعمها بعد الإطلاق.', en: 'Production deployment, updates, maintenance, and post-launch support.' },
      icon: 'wrench',
    },
    {
      key: 'security',
      title: { ar: 'أمان التطبيقات وحماية البيانات', en: 'App Security & Data Protection' },
      description: { ar: 'تطبيق ممارسات مناسبة لحماية التطبيقات والبيانات ضمن نطاق المشروع.', en: 'Appropriate security practices for application and data protection.' },
      icon: 'shield',
    },
  ],
  whyBotech: [
    {
      key: 'tailored',
      title: { ar: 'حلول مصممة حسب الحاجة', en: 'Tailored Solutions' },
      description: { ar: 'نبدأ من طبيعة العمل واحتياجاته بدل فرض حل جاهز.', en: 'We start from your business needs—not a pre-made solution.' },
    },
    {
      key: 'ux',
      title: { ar: 'تجربة استخدام عملية', en: 'Practical UX' },
      description: { ar: 'نهتم بأن يكون النظام واضحًا وسريعًا وسهل الاستخدام.', en: 'We prioritize clarity, speed, and ease of use.' },
    },
    {
      key: 'scalable',
      title: { ar: 'حلول قابلة للتطوير', en: 'Scalable Architecture' },
      description: { ar: 'نبني الأنظمة بطريقة تسمح بتطويرها مع نمو المشروع.', en: 'Systems built to grow with your business.' },
    },
    {
      key: 'offline-first',
      title: { ar: 'العمل في ظروف اتصال مختلفة', en: 'Varied Connectivity' },
      description: { ar: 'عند الحاجة، يمكن تصميم حلول Offline-first والمزامنة مع الخوادم.', en: 'Offline-first architecture with server sync when needed.' },
    },
    {
      key: 'full-lifecycle',
      title: { ar: 'من الفكرة إلى التشغيل', en: 'Full Lifecycle' },
      description: { ar: 'تحليل → تصميم → تطوير → اختبار → نشر → صيانة ودعم.', en: 'Analysis → Design → Development → Testing → Deployment → Support.' },
    },
  ],
  work: [
    {
      key: 'raseed',
      name: 'Raseed',
      nameAr: 'رصيد',
      type: { ar: 'منتج — تطبيق جوال', en: 'Product — Mobile App' },
      description: { ar: 'تطبيق تحويل الرصيد لنقاط البيع', en: 'Balance transfer app for retail points' },
      image: '/assets/raseed/cover.jpg',
      url: '/raseed',
    },
    {
      key: 'clover',
      name: 'Clover Flow',
      type: { ar: 'منتج — منصة POS وإدارة أعمال', en: 'Product — POS & Business Platform' },
      description: { ar: 'إدارة المبيعات، المخزون، والعملاء', en: 'Sales, inventory, and customer management' },
      image: '/assets/clover/cover.jpg',
      url: '/clover',
    },
  ],
};

export type SiteConfig = typeof siteConfig;