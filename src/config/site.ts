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
  ogImage: '/og-image.png',
  logo: '/Logo.png',
  founder: {
    name: {
      ar: 'المهندس أيهم سيف',
      en: 'Eng. Ayham Seif',
    },
    title: {
      ar: 'مؤسس',
      en: 'Founder',
    },
    experience: '12+ Years',
    bio: {
      ar: 'يتمتع بخبرة تزيد عن 12 عامًا في هندسة البرمجيات، هندسة الحلول، تطوير الأنظمة، القيادة التقنية، البنية التحتية، وقواعد البيانات، مع خبرة عملية في بناء وإدارة البرمجيات من تحليل المتطلبات وتصميم الحلول إلى التطوير والاختبار والنشر والتشغيل والدعم المستمر.',
      en: 'With over 12 years of experience in software engineering, solution architecture, system development, technical leadership, infrastructure, DevOps, and databases—hands-on across the full software lifecycle from requirements analysis and solution design through development, testing, deployment, operations, and continuous support.',
    },
  },
  contact: {
    email: 'contact@botech-live.com',
    emails: {
      info: 'info@botech-live.com',
      contact: 'contact@botech-live.com',
      support: 'support@botech-live.com',
      raseed: 'raseed@botech-live.com',
      clover: 'clover@botech-live.com',
      founder: 'ayham@botech-live.com',
    },
    formEndpoint: 'https://script.google.com/macros/s/AKfycbxY-4Ap6dVDpUup4js46EqtMY4v64HChn7uJL-YfKZREz9PEbdqjIFL6crLT-v_bMmS/exec',
    recaptchaSiteKey: '6Lduj7ctAAAAAM9Md-zQzBNgqQoHuTjyn-BXihGX',
    phone: '+963 940 716 331',
    phoneRaw: '963940716331',
    whatsapp: 'https://wa.me/963940716331',
    social: {
      raseedFacebook: 'https://www.facebook.com/RaseedApp',
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
      { key: 'clover', href: '/clover', label: { ar: 'Clover', en: 'Clover' }, description: { ar: 'منظومة نقاط بيع ومتجر إلكتروني متصل', en: 'Connected POS & online store system' } },
    ],
    footer: {
      company: [
        { key: 'about', href: '/about', label: { ar: 'من نحن', en: 'About' } },
        { key: 'services', href: '/services', label: { ar: 'خدماتنا', en: 'Services' } },
        { key: 'work', href: '/work', label: { ar: 'أعمالنا', en: 'Work' } },
        { key: 'contact', href: '/contact', label: { ar: 'تواصل معنا', en: 'Contact' } },
        { key: 'delete-account', href: '/delete-account', label: { ar: 'حذف حساب Raseed', en: 'Delete Raseed Account' } },
      ],
      products: [
        { key: 'raseed', href: '/raseed', label: { ar: 'Raseed', en: 'Raseed' } },
        { key: 'clover', href: '/clover', label: { ar: 'Clover', en: 'Clover' } },
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
      status: 'available' as const,
      logo: '/assets/raseed/raseed-logo-256.png',
      tagline: {
        ar: 'اخدم زبائنك أسرع، وأدر تحويلاتك باحتراف',
        en: 'Serve customers faster, manage transfers professionally',
      },
      description: {
        ar: 'تطبيق لإدارة تحويلات الرصيد اليومية، مصمم لنقاط بيع الرصيد ومراكز خدمة الموبايل في سوريا. يساعدك على التحويل بشكل أسرع، بأخطاء أقل، مع سجل واضح لكل التحويلات اليومية.',
        en: 'A balance transfer manager built for mobile phone shops, recharge stores, and payment points in Syria. Serve customers faster, cut down mistakes, and keep your whole day organized from one Android device.',
      },
      shortDescription: {
        ar: 'إدارة تحويلات الرصيد اليومية لنقاط بيع الرصيد في سوريا',
        en: 'Manage daily balance transfers for mobile recharge shops in Syria',
      },
      features: [
        {
          key: 'fast-transfer',
          title: { ar: 'تحويل بنقرة واحدة', en: 'One-Tap Transfers' },
          description: { ar: 'أرسل الرصيد بنقرة واحدة بدل كتابة أكواد USSD في كل مرة', en: 'Send balance with one tap instead of typing USSD codes every time' },
        },
        {
          key: 'dual-sim',
          title: { ar: 'سيريتل و MTN', en: 'Syriatel & MTN' },
          description: { ar: 'يعمل مع الشبكتين الرئيسيتين في سوريا، يختار الشريحة الصحيحة تلقائياً', en: 'Works with both major networks in Syria, picks the right SIM automatically' },
        },
        {
          key: 'balance-check',
          title: { ar: 'استعلام سريع عن الرصيد', en: 'Quick Balance Check' },
          description: { ar: 'تحقق من رصيدك في ثوانٍ، بدون البحث عن الأكواد', en: 'Check any balance in seconds, without hunting for codes' },
        },
        {
          key: 'daily-reports',
          title: { ar: 'تقارير يومية', en: 'Daily Reports' },
          description: { ar: 'سجل كامل للتحويلات وسجل واضح بكل ما نفّذته في يومك', en: 'A clear record of every transfer by the end of the day' },
        },
        {
          key: 'offline',
          title: { ar: 'يعمل دون إنترنت', en: 'Works Offline' },
          description: { ar: 'بعد التفعيل يعمل التطبيق بشكل كامل دون إنترنت', en: 'After activation, the app works fully without an internet connection' },
        },
        {
          key: 'free-trial',
          title: { ar: 'نسخة تجريبية مجانية', en: 'Free Trial' },
          description: { ar: 'جرّب التطبيق مجاناً قبل أن تقرر شراء الترخيص', en: 'Try the app free before you decide to buy a license' },
        },
        {
          key: 'activation',
          title: { ar: 'تفعيل آمن', en: 'Secure Activation' },
          description: { ar: 'اطلب التفعيل من داخل التطبيق وببساطة', en: 'Request activation from inside the app — simple and safe' },
        },
        {
          key: 'arabic-ui',
          title: { ar: 'واجهة عربية بسيطة', en: 'Simple Arabic Interface' },
          description: { ar: 'مصمم للاستخدام السهل من قبل موظفي المحل، لا يحتاج تعليم', en: 'Built for daily use by shop staff. No learning curve' },
        },
        {
          key: 'support',
          title: { ar: 'دعم فني وتحديثات مستمرة', en: 'Support & Updates' },
          description: { ar: 'فريقنا معك عند الحاجة، ونطوّر التطبيق باستمرار', en: 'Our team is here whenever you need help, and we keep improving' },
        },
      ],
      platforms: ['android'],
      downloadLinks: {
        android: '',
        apk: '',
        apkPure: 'https://apkpure.com/p/com.BlueOrbitTechnologies.Raseed',
        googlePlay: 'https://play.google.com/store/apps/details?id=com.BlueOrbitTechnologies.Raseed',
      },
      social: {
        facebook: 'https://www.facebook.com/RaseedApp',
      },
      screenshots: [
        '/assets/raseed/1.jpg',
        '/assets/raseed/2.jpg',
        '/assets/raseed/3.jpg',
        '/assets/raseed/4.jpg',
        '/assets/raseed/5.jpg',
      ],
      screenshotsThumbs: [
        '/assets/raseed/shots/s1.jpg',
        '/assets/raseed/shots/s2.jpg',
        '/assets/raseed/shots/s3.jpg',
        '/assets/raseed/shots/s4.jpg',
        '/assets/raseed/shots/s5.jpg',
      ],
      videos: [
        { src: '/assets/raseed/raseed-account-setup.mp4', title: { ar: 'فتح حساب بسهولة', en: 'Easy Account Setup' }, poster: '/assets/raseed/shots/s2.jpg' },
        { src: '/assets/raseed/raseed-fast-transfer.mp4', title: { ar: 'سرعة التحويل', en: 'Fast Transfers' }, poster: '/assets/raseed/shots/s3.jpg' },
        { src: '/assets/raseed/raseed-transfer-report.mp4', title: { ar: 'سجل التحويلات', en: 'Transfer History & Reports' }, poster: '/assets/raseed/shots/s4.jpg' },
        { src: '/assets/raseed/raseed-customize-ui.mp4', title: { ar: 'خصص شكل رصيد', en: 'Customize Raseed Look' }, poster: '/assets/raseed/shots/s5.jpg' },
      ],
    },
    clover: {
      name: 'Clover',
      status: 'available' as const,
      logo: '/assets/clover/clover-logo-512.png',
      tagline: {
        ar: 'منظومة نقاط بيع ومتجر إلكتروني متصل',
        en: 'Connected POS & online store system',
      },
      description: {
        ar: 'Clover منظومة واحدة تجمع Clover Flow POS لإدارة البيع والمخزون والعملاء والحسابات، وClover Market كقناة بيع إلكترونية متصلة. تعمل محليًا عند انقطاع الإنترنت، وتدعم الدولار والليرة، وتناسب المتاجر التي تبيع بالجملة والتجزئة.',
        en: 'Clover brings Clover Flow POS for sales, inventory, customers, and accounts together with Clover Market as a connected online sales channel. It keeps working locally during outages, supports USD and SYP, and fits stores selling wholesale and retail.',
      },
      shortDescription: {
        ar: 'نقطة بيع، مخزون، حسابات، تقارير ومتجر إلكتروني متصل — في منظومة واحدة',
        en: 'POS, inventory, accounts, reports, and a connected online store — in one system',
      },
      // The commercial benefits shown on product surfaces. Every entry maps
      // to a capability that exists in Clover Flow POS or Clover Market.
      features: [
        {
          key: 'fast-sales',
          title: { ar: 'مبيعات أسرع وأسهل', en: 'Faster, easier sales' },
          description: {
            ar: 'شاشة بيع سريعة بالباركود أو باللمس، مع الإجماليات والخصومات والضرائب وطرق الدفع وطباعة الفاتورة.',
            en: 'A quick checkout screen with barcode or touch entry, totals, discounts, taxes, payment methods, and receipt printing.',
          },
        },
        {
          key: 'inventory',
          title: { ar: 'إدارة المخزون والكميات', en: 'Inventory & quantities' },
          description: {
            ar: 'منتجات وأسعار وكميات وتصنيفات، مع تنبيهات نقص وحركة مخزون مرتبطة بالمبيعات والمشتريات.',
            en: 'Products, prices, quantities, and categories, with low-stock alerts and stock movement tied to sales and purchases.',
          },
        },
        {
          key: 'customers-debts',
          title: { ar: 'العملاء والديون والحسابات', en: 'Customers, debts & accounts' },
          description: {
            ar: 'ملف لكل زبون مع رصيده وديونه ومدفوعاته، بدل دفتر الحسابات الورقي.',
            en: 'A file for every customer with their balance, debts, and payments — instead of a paper ledger.',
          },
        },
        {
          key: 'currencies',
          title: { ar: 'دعم الدولار والليرة السورية', en: 'USD and Syrian Pound support' },
          description: {
            ar: 'سعّر بالدولار أو الليرة، مع معدل صرف تلقائي أو يدوي، وتقريب مستقل لكل عملة.',
            en: 'Price in USD or SYP with an automatic or manual exchange rate and independent rounding per currency.',
          },
        },
        {
          key: 'reports',
          title: { ar: 'تقارير ومتابعة أداء المتجر', en: 'Reports and performance tracking' },
          description: {
            ar: 'تقارير للمبيعات والمخزون والعملاء والديون والمصروفات، مع الأرباح والخسائر والتدفق النقدي.',
            en: 'Reports for sales, inventory, customers, debts, and expenses, plus profit and loss and cash flow.',
          },
        },
        {
          key: 'offline',
          title: { ar: 'يعمل حتى عند انقطاع الإنترنت', en: 'Keeps working without internet' },
          description: {
            ar: 'يستمر البيع دون اتصال، ويحفظ العمليات محلياً ثم يزامنها تلقائياً عند عودة الإنترنت.',
            en: 'Keep selling during an outage — work is saved locally and synced automatically once the connection is back.',
          },
        },
        {
          key: 'market',
          title: { ar: 'متجر إلكتروني متصل', en: 'A connected online store' },
          description: {
            ar: 'Clover Market يفتح قناة بيع إلكترونية إضافية، وطلباته تصل إلى Clover Flow POS كفاتورة.',
            en: 'Clover Market adds an online sales channel, and its orders arrive in Clover Flow POS as an invoice.',
          },
        },
      ],
      storeTypes: [
        { key: 'grocery', label: { ar: 'بقالة', en: 'Grocery' } },
        { key: 'supermarket', label: { ar: 'سوبرماركت', en: 'Supermarket' } },
        { key: 'groceries', label: { ar: 'مواد غذائية', en: 'Groceries' } },
        { key: 'clothing', label: { ar: 'ملابس', en: 'Clothing' } },
        { key: 'electronics', label: { ar: 'إلكترونيات', en: 'Electronics' } },
        { key: 'accessories', label: { ar: 'إكسسوارات', en: 'Accessories' } },
        { key: 'household', label: { ar: 'أدوات منزلية', en: 'Household goods' } },
        { key: 'retail', label: { ar: 'متاجر التجزئة', en: 'Retail stores' } },
      ],
      platforms: ['windows', 'android', 'web'],
      downloadLinks: {},
      // Real product screenshots live here (see ASSETS.md). The page renders
      // the gallery only when the files are present, so no broken images ship.
      screenshots: [],
      screenshotsThumbs: [],
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
      description: { ar: 'إدارة تحويلات الرصيد اليومية لنقاط بيع الرصيد في سوريا', en: 'Manage daily balance transfers for mobile recharge shops in Syria' },
      image: '/assets/raseed/shots/s3.jpg',
      url: '/raseed',
    },
    {
      key: 'clover',
      name: 'Clover',
      type: { ar: 'منتج — منظومة نقاط بيع ومتجر إلكتروني متصل', en: 'Product — Connected POS & online store system' },
      description: { ar: 'نقطة بيع، مخزون، حسابات، تقارير ومتجر إلكتروني متصل من مكان واحد', en: 'POS, inventory, accounts, reports, and a connected online store in one place' },
      image: '/assets/clover/clover-logo-512.png',
      url: '/clover',
    },
  ],
};

export type SiteConfig = typeof siteConfig;
