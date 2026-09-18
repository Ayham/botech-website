import type { Locale } from './config';

export const translations = {
  ar: {
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
      allProducts: 'جميع المنتجات',
    },
    nav: {
      home: 'الرئيسية',
      services: 'خدماتنا',
      products: 'منتجاتنا',
      work: 'أعمالنا',
      about: 'من نحن',
      contact: 'تواصل معنا',
      raseed: 'Raseed — رصيد',
      clover: 'Clover Flow',
      deleteAccount: 'حذف حساب Raseed',
    },
    hero: {
      title: 'نحوّل الأفكار إلى حلول تقنية عملية',
      subtitle: 'نطوّر المواقع والتطبيقات والأنظمة البرمجية المصممة لتلبية احتياجات الأعمال، من الفكرة والتصميم إلى التطوير والنشر والدعم.',
      ctaPrimary: 'استكشف خدماتنا',
      ctaSecondary: 'تعرف على منتجاتنا',
      scrollDown: 'ابدأ التصفح',
    },
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
        title: 'خبرة تصنع الفرق',
        name: 'المهندس أيهم سيف',
        role: 'مؤسس',
        experience: '12+ سنة خبرة',
        bio: 'يتمتع بخبرة تزيد عن 12 عامًا في هندسة البرمجيات، هندسة الحلول، تطوير الأنظمة، القيادة التقنية، البنية التحتية، وقواعد البيانات، مع خبرة عملية في بناء وإدارة البرمجيات من تحليل المتطلبات وتصميم الحلول إلى التطوير والاختبار والنشر والتشغيل والدعم المستمر.',
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
      available: 'متاح الآن',
    },
    work: {
      title: 'أعمالنا',
      subtitle: 'مشاريع ومنتجات قمنا ببنائها وتطويرها.',
      projects: 'المشاريع',
      products: 'المنتجات',
      viewProject: 'عرض المشروع',
      caseStudy: 'دراسة حالة',
      technologies: 'التقنيات المستخدمة',
    },
    contact: {
      title: 'تواصل معنا',
      subtitle: 'نرحب بتواصلكم للاستفسارات، الشراكات، أو طلب الخدمات التقنية.',
      form: {
        title: 'أرسل رسالة',
        success: 'تم إرسال رسالتك بنجاح. سنرد عليك في أقرب وقت.',
        error: 'فشل الإرسال، يرجى المحاولة مرة أخرى أو التواصل مباشرة عبر البريد الإلكتروني.',
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
      ctaHeadingStart: 'مستعد لـ',
      ctaHeadingHighlight: 'بدء مشروعك',
      ctaHeadingEnd: '؟',
    },
    whyBotech: {
      title: 'لماذا BOTech؟',
      subtitle: 'ما يميز نهجنا في بناء الحلول التقنية.',
    },
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
    raseed: {
      hero: {
        subtitle: 'تطبيق إدارة تحويلات الرصيد اليومية',
        description: 'تطبيق لإدارة تحويلات الرصيد اليومية، مصمم لنقاط بيع الرصيد ومراكز خدمة الموبايل في سوريا. يساعدك على التحويل بشكل أسرع، بأخطاء أقل، مع سجل واضح لكل التحويلات.',
        ctaDownload: 'حمّل التطبيق مجاناً',
        ctaContact: 'تواصل معنا',
      },
      stats: [
        { value: 'مجاني', label: 'جرّبه بدون دفع مسبق' },
        { value: 'بدون إنترنت', label: 'يعمل بعد التفعيل' },
        { value: 'شريحتان', label: 'MTN وسيريتل' },
        { value: 'عربي', label: 'واجهة بسيطة وواضحة' },
      ],
      features: { title: 'مميزات صممت لعملك' },
      howItWorks: {
        title: 'كيف يعمل',
        steps: [
          { step: '01', title: 'حمّل التطبيق', desc: 'حمّل رصيد من هذا الموقع مباشرة على جهاز الأندرويد في محلك' },
          { step: '02', title: 'جرّبه مجاناً', desc: 'ابدأ فوراً بالنسخة التجريبية المجانية وجرّب التحويلات والتقارير' },
          { step: '03', title: 'اطلب التفعيل', desc: 'عندما تقرر المتابعة، أرسل طلب التفعيل من داخل التطبيق ونتواصل معك' },
        ],
      },
      screenshots: 'شاهد Raseed في صور',
      screenshotsSubtitle: 'صور تعرض التطبيق بالواقع، مصممة للمشاركة والتعريف بالتطبيق',
      screenshotsItems: [
        { title: 'رصيد — فكرة', desc: '' },
        { title: 'سجّل دخولك', desc: '' },
        { title: 'تشكيلة ملونة', desc: '' },
        { title: 'صديقك يومياً', desc: '' },
        { title: 'حمّل الآن', desc: '' },
      ],
      videos: { title: 'شاهد التطبيق بالعمل' },
      comparison: {
        title: 'التحويل اليدوي مقابل رصيد',
        subtitle: 'شاهد الفرق في كل خطوة من عملك اليومي',
        manualHeader: 'التحويل اليدوي',
        appHeader: 'مع رصيد',
        rows: [
          { label: 'سرعة التحويل', manual: 'كتابة الكود يدوياً', app: 'تحويل بنقرة واحدة' },
          { label: 'اختيار الشريحة', manual: 'تبديل يدوي', app: 'تلقائي' },
          { label: 'الاستعلام عن الرصيد', manual: 'أكواد لكل شبكة', app: 'ضغطة واحدة' },
          { label: 'سجل المعاملات', manual: 'لا يوجد', app: 'تقارير يومية' },
          { label: 'دون إنترنت', manual: 'لا', app: 'نعم، بعد التفعيل' },
          { label: 'خطر الأخطاء', manual: 'عالٍ', app: 'أقل بكثير' },
          { label: 'الواجهة', manual: 'أكواد معقدة', app: 'عربية بسيطة' },
          { label: 'الدعم الفني', manual: 'لا يوجد', app: 'فريقنا متاح' },
        ],
      },
      pricing: {
        title: 'أسعار بسيطة وواضحة',
        subtitle: 'اختر المدة الأنسب لعملك. النسخة التجريبية مجانية دائماً قبل الشراء.',
        currency: 'ل.س',
        per: 'سنة',
        plans: [
          {
            name: 'سنة واحدة',
            price: '1,200',
            description: 'مثالي للمحلات الجديدة التي تريد تجربة رصيد بأقل تكلفة.',
            features: ['جميع ميزات التطبيق', 'نسخة تجريبية مجانية', 'تفعيل على جهاز واحد', 'تحديثات طوال السنة'],
          },
          {
            name: 'سنتان',
            price: '2,000',
            description: 'أفضل توازن بين السعر والقيمة على المدى الطويل.',
            features: ['جميع ميزات التطبيق', 'دعم بأولوية', 'تحديثات طوال المدة', 'وفّر 400 ل.س'],
            popular: true,
          },
          {
            name: 'ثلاث سنوات',
            price: '3,000',
            description: 'الخيار الأفضل للمحلات الراسخة الباحثة عن استثمار طويل الأمد.',
            features: ['جميع ميزات التطبيق', 'دعم بأولوية', 'السعر ثابت لثلاث سنوات', 'وفّر 600 ل.س'],
          },
        ],
      },
      faq: {
        title: 'الأسئلة الشائعة',
        subtitle: 'كل ما تحتاج معرفته عن رصيد',
        items: [
          { q: 'ما هو رصيد؟', a: 'تطبيق أندرويد لإدارة تحويلات الرصيد اليومية، مصمم خصيصاً لنقاط بيع الرصيد في سوريا. يساعدك على التحويل بشكل أسرع، بأخطاء أقل، مع سجل واضح بكل التحويلات.' },
          { q: 'لمن هذا التطبيق؟', a: 'نقاط بيع الرصيد، مراكز خدمة الموبايل، وكل من ينجز عدداً كبيراً من التحويلات يومياً ويحتاج سرعة وتنظيم.' },
          { q: 'هل يدعم شبكتي سيريتل و MTN؟', a: 'نعم، يدعم رصيد الشبكتين الرئيسيتين في سوريا بالكامل مع اختيار تلقائي للشريحة الصحيحة.' },
          { q: 'هل يعمل دون إنترنت؟', a: 'بعد التفعيل يعمل التطبيق بشكل كامل دون إنترنت. الإنترنت مطلوب فقط عند التفعيل.' },
          { q: 'كيف تعمل النسخة التجريبية؟', a: 'التطبيق يأتي مع نسخة تجريبية مجانية تتيح لك تجربة كل الميزات قبل شراء أي ترخيص.' },
          { q: 'كيف أطلب التفعيل؟', a: 'من داخل التطبيق: أرسل طلب التفعيل، وسيصل طلبك مباشرة إلى الإدارة ونتواصل معك.' },
          { q: 'هل التحديثات مشمولة؟', a: 'نعم، جميع التحديثات مشمولة خلال مدة الترخيص دون أي تكلفة إضافية.' },
          { q: 'هل يمكن نقل الترخيص لجهاز آخر؟', a: 'الترخيص مرتبط بجهاز واحد. للنقل تواصل مع الدعم الفني ونساعدك.' },
        ],
      },
      download: {
        title: 'احصل على Raseed',
        subtitle: 'جرّب رصيد مجاناً. حمّل التطبيق، جرّب النسخة المجانية، واطلب التفعيل من داخل التطبيق.',
        ctaPrimary: 'تواصل عبر واتساب',
        ctaContact: 'أرسل رسالة',
        downloadApk: 'تحميل مباشر',
        apkPure: 'تحميل من APKPure',
        googlePlay: 'تحميل من Google Play',
        comingSoon: 'قريباً',
      },
      whyChoose: {
        title: 'لماذا محلات الرصيد تختار رصيد؟',
        subtitle: 'أدوات عملية تجعل يوم عملك أسرع وأقل أخطاء وأكثر تنظيماً',
        items: [
          { title: 'خدمة أسرع للزبائن', desc: 'أنجز التحويل بنقرة واحدة والزبون أمامك' },
          { title: 'وقت انتظار أقل', desc: 'لم يعد كل زبون يستغرق دقائق بسبب كتابة الأكواد' },
          { title: 'أخطاء أقل', desc: 'قلّل أخطاء الأرقام والشريحة الخاطئة' },
          { title: 'استعلام أسهل', desc: 'اعرف رصيدك بدون البحث عن الأكواد' },
          { title: 'تقارير يومية', desc: 'سجل واضح بكل تحويلات محلك بآخر اليوم' },
          { title: 'دعم الشريحتين', desc: 'اختيار تلقائي للشريحة الصحيحة في كل مرة' },
          { title: 'يعمل دون إنترنت', desc: 'استخدم التطبيق كاملاً دون إنترنت بعد التفعيل' },
          { title: 'واجهة عربية بسيطة', desc: 'مصمم ليستخدمه أي مستخدم بدون تعقيد' },
        ],
      },
    },
    clover: {
      hero: {
        subtitle: 'قريباً',
        description: 'منصة لإدارة نقاط البيع والأعمال، مصممة لتبسيط عمليات البيع والمخزون وإدارة العمل. نعمل حالياً على بناء Clover Flow.',
      },
      comingSoon: {
        title: 'Clover Flow قريباً',
        subtitle: 'نحن بصدد تطوير منصة متكاملة لإدارة نقاط البيع والأعمال. تابعونا لمعرفة موعد الإطلاق.',
        modulesTitle: 'ما نعمل عليه',
        modulesSubtitle: 'وهيكل النظام الأساسي',
        contactTitle: 'هذا ما نبنيه حالياً',
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
      features: { title: 'المميزات الرئيسية' },
      howItWorks: {
        title: 'كيف يعمل',
        steps: [],
      },
      screenshots: 'لقطات الشاشة',
      platforms: { title: 'المنصات', android: '', web: '' },
      download: { title: '', android: '', web: '', comingSoon: '' },
      faq: { title: 'الأسئلة الشائعة', items: [] },
    },
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
      raseedTitle: 'Raseed | رصيد — إدارة تحويلات الرصيد في سوريا',
      raseedDesc: 'تطبيق Raseed لإدارة تحويلات الرصيد اليومية لنقاط بيع الرصيد في سوريا.',
      cloverTitle: 'Clover Flow | إدارة نقاط البيع والأعمال — قريباً',
      cloverDesc: 'منصة لإدارة نقاط البيع والأعمال، مصممة لتبسيط عمليات البيع والمخزون وإدارة العمل.',
      deleteAccountTitle: 'حذف حساب Raseed | Blue Orbit Technologies',
      deleteAccountDesc: 'اطلب حذف حسابك من تطبيق Raseed، أو أرسل طلب الحذف من هذه الصفحة بعد التحقق من ملكية البريد الإلكتروني.',
    },
    deleteAccount: {
      title: 'حذف حساب Raseed',
      subtitle: 'هذه الصفحة مخصصة لطلب حذف حسابك من تطبيق Raseed.',
      badge: 'طلب حذف الحساب',
      whatsDeletedTitle: 'ما الذي سيتم حذفه؟',
      whatsDeleted: [
        'ملف الحساب والبريد الإلكتروني المرتبط فيه',
        'الأجهزة المرتبطة بالحساب',
        'التراخيص والاشتراكات النشطة',
        'سجل التحويلات والمدفوعات والإشعارات',
      ],
      irreversibleTitle: 'إجراء نهائي',
      irreversible: 'حذف الحساب إجراء نهائي ولا يمكن التراجع عنه بعد اكتماله. لا يمكن استعادة الحساب أو بياناته بأي شكل.',
      inAppTitle: 'من داخل التطبيق',
      inAppDesc: 'يمكنك حذف حسابك مباشرة من إعدادات الحساب داخل تطبيق Raseed دون الحاجة لهذه الصفحة.',
      webTitle: 'من هذه الصفحة',
      webDesc: 'أدخل البريد الإلكتروني المرتبط بحسابك. سنرسل رمز تحقق إلى بريدك لتأكيد ملكية الحساب قبل تنفيذ الحذف، ولن يتم حذف أي شيء قبل التحقق.',
      optionsTitle: 'كيف تريد حذف حسابك؟',
      formTitle: 'طلب حذف الحساب',
      emailLabel: 'البريد الإلكتروني المرتبط بحساب Raseed',
      emailPlaceholder: 'name@example.com',
      emailHint: 'أدخل نفس البريد المستخدم عند تفعيل الحساب',
      requestBtn: 'طلب حذف الحساب',
      codeTitle: 'أدخل رمز التحقق',
      codeSent: 'تم إرسال رمز التحقق إلى بريدك الإلكتروني:',
      codeLabel: 'رمز التحقق من 6 أرقام',
      codePlaceholder: '000000',
      codeHint: 'الرمز صالح لمدة قصيرة، وعادة يصل خلال دقائق. تحقق من مجلد الرسائل غير المرغوب فيها (Spam).',
      confirmBtn: 'تأكيد حذف الحساب',
      backBtn: 'تعديل البريد الإلكتروني',
      doneTitle: 'تم حذف الحساب',
      doneSubtitle: 'تم حذف حساب Raseed والبيانات المرتبطة به تنفيذاً لطلبك.',
      doneExtra: 'إذا بقي التطبيق مثبتاً على جهازك، سجّل الدخول بحساب جديد عند الحاجة. لأي استفسار، تواصل معنا عبر ',
      supportEmail: 'الدعم الفني',
      deleteAnother: 'إرسال طلب آخر',
      invalidEmail: 'يرجى إدخال بريد إلكتروني صحيح',
      emailRequired: 'البريد الإلكتروني مطلوب',
      codeRequired: 'يرجى إدخال رمز التحقق',
      errorTitle: 'لم يتم تنفيذ الطلب',
      errors: {
        invalid_input: 'إدخال غير صحيح، يرجى التحقق من البيانات.',
        account_not_found: 'لم يتم العثور على حساب Raseed مرتبط بهذا البريد الإلكتروني. إذا كنت متأكداً من البريد، استخدم خيار الحذف من داخل التطبيق أو تواصل مع الدعم الفني.',
        rate_limited: 'تم إرسال رمز تحقق مؤخراً لهذا البريد. انتظر دقيقة ثم حاول مرة أخرى.',
        email_send_failed: 'تعذر إرسال رمز التحقق إلى هذا البريد حالياً. حاول لاحقاً، أو استخدم خيار الحذف من داخل التطبيق.',
        invalid_code: 'رمز التحقق غير صحيح أو منتهي الصلاحية. تحقق من البريد وحاول مرة أخرى.',
        too_many_attempts: 'تجاوزت عدد المحاولات المسموح بها. اطلب رمزاً جديداً من البداية.',
        verify_failed: 'تعذر تأكيد ملكية الحساب. أعد المحاولة أو تواصل مع الدعم الفني.',
        deletion_not_configured: 'خدمة حذف الحساب غير مهيأة حالياً. استخدم خيار الحذف من داخل التطبيق أو تواصل مع الدعم الفني.',
        deletion_failed: 'فشل تنفيذ الحذف. لم يتم حذف بيانات الحساب، تواصل مع الدعم الفني.',
        not_found: 'إجراء غير معروف، يرجى إعادة تحميل الصفحة.',
        method_not_allowed: 'إجراء غير مدعوم.',
        network: 'تعذر الاتصال بالخادم. تحقق من اتصالك بالإنترنت وحاول مرة أخرى.',
        not_configured: 'خدمة حذف الحساب غير متاحة حالياً من هذه الصفحة. استخدم خيار الحذف من داخل التطبيق.',
      },
      securityNote: 'أمانك أولاً: لن يُحذف الحساب أبداً بسبب إدخال البريد الإلكتروني وحده. الحذف يتم فقط بعد تأكيد رمز التحقق المرسل إلى بريدك الإلكتروني.',
      appDeleteNote: 'الحذف من داخل التطبيق الأولوية الأسرع والأكثر أماناً، لأنه يتحقق من جلستك مباشرة.',
    },
  },

  en: {
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
      allProducts: 'All Products',
    },
    nav: {
      home: 'Home',
      services: 'Services',
      products: 'Products',
      work: 'Work',
      about: 'About',
      contact: 'Contact',
      raseed: 'Raseed',
      clover: 'Clover Flow',
      deleteAccount: 'Delete Raseed Account',
    },
    hero: {
      title: 'Turning ideas into practical technology solutions',
      subtitle: 'We build websites, applications, and software systems designed for business needs—from concept and design through development, deployment, and ongoing support.',
      ctaPrimary: 'Explore Services',
      ctaSecondary: 'View Products',
      scrollDown: 'Get started',
    },
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
        bio: 'With over 12 years of experience in software engineering, solution architecture, system development, technical leadership, infrastructure, DevOps, and databases—hands-on across the full software lifecycle from requirements analysis and solution design through development, testing, deployment, operations, and continuous support.',
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
      available: 'Available Now',
    },
    work: {
      title: 'Our Work',
      subtitle: 'Projects and products we have built and developed.',
      projects: 'Projects',
      products: 'Products',
      viewProject: 'View Project',
      caseStudy: 'Case Study',
      technologies: 'Technologies Used',
    },
    contact: {
      title: 'Contact Us',
      subtitle: 'We welcome your inquiries, partnerships, or requests for technology services.',
      form: {
        title: 'Send a Message',
        success: "Your message has been sent successfully. We'll get back to you soon.",
        error: 'Failed to send. Please try again or contact us directly via email.',
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
      ctaHeadingStart: 'Ready to ',
      ctaHeadingHighlight: 'start your project',
      ctaHeadingEnd: '?',
    },
    whyBotech: {
      title: 'Why BOTech?',
      subtitle: 'What sets our approach to building technology solutions apart.',
    },
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
    raseed: {
      hero: {
        subtitle: 'Daily balance transfer management app',
        description: 'A balance transfer manager built for mobile phone shops, recharge stores, and payment points in Syria. Serve customers faster, cut down mistakes, and keep your whole day organized from one Android device.',
        ctaDownload: 'Download Free',
        ctaContact: 'Contact Us',
      },
      stats: [
        { value: 'Free trial', label: 'No upfront payment required' },
        { value: 'Offline', label: 'Works after activation' },
        { value: 'Dual SIM', label: 'MTN & Syriatel' },
        { value: 'Arabic', label: 'Simple, clear interface' },
      ],
      features: { title: 'Features built for your business' },
      howItWorks: {
        title: 'How It Works',
        steps: [
          { step: '01', title: 'Download the App', desc: 'Download Raseed straight from this website onto the Android device in your shop' },
          { step: '02', title: 'Try It Free', desc: 'Start right away with the free trial and test transfers and reports' },
          { step: '03', title: 'Request Activation', desc: "When you're ready, send an activation request from inside the app and we'll get in touch" },
        ],
      },
      screenshots: 'See Raseed in Pictures',
      screenshotsSubtitle: 'Promotional visuals showing the app in action, made for sharing and getting to know Raseed',
      screenshotsItems: [
        { title: 'Raseed — The Idea', desc: '' },
        { title: 'Sign In', desc: '' },
        { title: 'A Colorful Collection', desc: '' },
        { title: 'Your Daily Buddy', desc: '' },
        { title: 'Download Now', desc: '' },
      ],
      videos: { title: 'See the App in Action' },
      comparison: {
        title: 'Manual Transfers vs Raseed',
        subtitle: 'See the difference in every step of your daily work',
        manualHeader: 'Manual',
        appHeader: 'With Raseed',
        rows: [
          { label: 'Transfer Speed', manual: 'Type code manually', app: 'One-tap transfer' },
          { label: 'SIM Selection', manual: 'Manual switching', app: 'Automatic' },
          { label: 'Balance Check', manual: 'Codes per network', app: 'One tap' },
          { label: 'Transaction Log', manual: 'None', app: 'Daily reports' },
          { label: 'Offline', manual: 'No', app: 'Yes, after activation' },
          { label: 'Error Risk', manual: 'High', app: 'Much lower' },
          { label: 'Interface', manual: 'Complex codes', app: 'Simple Arabic' },
          { label: 'Support', manual: 'None', app: 'Our team' },
        ],
      },
      pricing: {
        title: 'Simple, Clear Pricing',
        subtitle: 'Choose the plan that fits your work. The free trial is always available before you buy.',
        currency: 'SYP',
        per: '/year',
        plans: [
          {
            name: 'One Year',
            price: '1,200',
            description: 'Ideal for new shops wanting to try Raseed at the lowest cost.',
            features: ['All app features', 'Free trial included', 'Activation on one device', 'Updates all year'],
          },
          {
            name: 'Two Years',
            price: '2,000',
            description: 'The best balance between price and long-term value.',
            features: ['All app features', 'Priority support', 'Updates for full period', 'Save 400 SYP'],
            popular: true,
          },
          {
            name: 'Three Years',
            price: '3,000',
            description: 'Perfect for established businesses looking for the best long-term investment.',
            features: ['All app features', 'Priority support', 'Price locked for 3 years', 'Save 600 SYP'],
          },
        ],
      },
      faq: {
        title: 'Frequently Asked Questions',
        subtitle: 'Everything you need to know about Raseed',
        items: [
          { q: 'What is Raseed?', a: "An Android app for managing daily balance transfers, built specifically for mobile phone shops, recharge stores, and payment points in Syria. It helps you transfer faster, with fewer mistakes, and a clear record of every transaction." },
          { q: 'Who is this app for?', a: "Mobile phone shops, recharge stores, balance transfer agents, payment points—anyone who handles a high volume of transfers daily and needs speed and organization." },
          { q: 'Does it support Syriatel and MTN?', a: 'Yes, Raseed fully supports both major networks in Syria with automatic SIM selection.' },
          { q: 'Does it work offline?', a: 'After activation, the app works completely offline. Internet is only required for activation.' },
          { q: 'How does the free trial work?', a: 'The app includes a free trial that lets you try every feature before buying any license.' },
          { q: 'How do I request activation?', a: 'From inside the app: send an activation request and it goes directly to the admin, who will contact you.' },
          { q: 'Are updates included?', a: 'Yes, all updates are included for the duration of your license at no extra cost.' },
          { q: 'Can I move my license to another device?', a: 'A license is tied to one device. If you need to move it, contact support and we will help you.' },
        ],
      },
      download: {
        title: 'Get Raseed',
        subtitle: 'Try Raseed for free. Download the app, start the free trial, and request activation from inside the app when you are ready.',
        ctaPrimary: 'WhatsApp',
        ctaContact: 'Send a Message',
        downloadApk: 'Direct Download',
        apkPure: 'Download from APKPure',
        googlePlay: 'Download from Google Play',
        comingSoon: 'Coming Soon',
      },
      whyChoose: {
        title: 'Why Mobile Shops Choose Raseed',
        subtitle: 'Practical tools that make your working day faster, safer, and better organized',
        items: [
          { title: 'Faster Customer Service', desc: 'Complete the transfer in one tap while your customer waits' },
          { title: 'Less Waiting Time', desc: 'No more minutes per customer spent typing codes' },
          { title: 'Fewer Mistakes', desc: 'Cut down wrong numbers and wrong SIM mistakes' },
          { title: 'Easier Balance Inquiry', desc: 'Check any balance in seconds without hunting for codes' },
          { title: 'Daily Reports', desc: 'A clear record of every transfer by the end of the day' },
          { title: 'Dual SIM Support', desc: 'Automatic selection of the right SIM every time' },
          { title: 'Offline After Activation', desc: 'Use the app fully offline after activation' },
          { title: 'Simple Arabic Interface', desc: 'Built so your whole shop can use it without a learning curve' },
        ],
      },
    },
    clover: {
      hero: {
        subtitle: 'Coming Soon',
        description: 'A platform for POS and business management, designed to simplify sales, inventory, and operations. We are currently building Clover Flow.',
      },
      comingSoon: {
        title: 'Clover Flow Coming Soon',
        subtitle: 'We are building an integrated platform for POS and business management. Stay tuned for launch.',
        modulesTitle: "What we're building",
        modulesSubtitle: 'The core system architecture',
        contactTitle: 'This is what we are building now',
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
      features: { title: 'Key Features' },
      howItWorks: {
        title: 'How It Works',
        steps: [],
      },
      screenshots: 'Screenshots',
      platforms: { title: 'Platforms', android: '', web: '' },
      download: { title: '', android: '', web: '', comingSoon: '' },
      faq: { title: 'FAQ', items: [] },
    },
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
      raseedTitle: 'Raseed | Balance Transfer App for Syria',
      raseedDesc: 'Raseed helps mobile phone shops in Syria manage daily balance transfers with fewer mistakes and clear daily reports.',
      cloverTitle: 'Clover Flow | POS & Business Management — Coming Soon',
      cloverDesc: 'A platform for POS and business management, designed to simplify sales, inventory, and operations. Coming soon.',
      deleteAccountTitle: 'Delete Raseed Account | Blue Orbit Technologies',
      deleteAccountDesc: 'Request deletion of your Raseed account, or send a deletion request from this page after verifying ownership of the account email.',
    },
    deleteAccount: {
      title: 'Delete Raseed Account',
      subtitle: 'This page is for requesting deletion of your Raseed account.',
      badge: 'Account deletion request',
      whatsDeletedTitle: 'What gets deleted?',
      whatsDeleted: [
        'The account profile and the linked email address',
        'Devices linked to the account',
        'Active licenses and subscriptions',
        'Transfer history, payments, and notifications',
      ],
      irreversibleTitle: 'Final action',
      irreversible: 'Account deletion is permanent and cannot be undone. The account and its data cannot be recovered in any way.',
      inAppTitle: 'From inside the app',
      inAppDesc: 'You can delete your account directly from the account settings inside the Raseed app, without using this page.',
      webTitle: 'From this page',
      webDesc: 'Enter the email linked to your account. We will send a verification code to your email to confirm you own the account before deletion. Nothing is deleted before verification.',
      optionsTitle: 'How would you like to delete your account?',
      formTitle: 'Account deletion request',
      emailLabel: 'Email linked to your Raseed account',
      emailPlaceholder: 'name@example.com',
      emailHint: 'Use the same email you used when activating the account',
      requestBtn: 'Request account deletion',
      codeTitle: 'Enter the verification code',
      codeSent: 'A verification code was sent to your email:',
      codeLabel: '6-digit verification code',
      codePlaceholder: '000000',
      codeHint: 'The code is valid for a short time and usually arrives within minutes. Check your spam folder if needed.',
      confirmBtn: 'Confirm account deletion',
      backBtn: 'Change email address',
      doneTitle: 'Account deleted',
      doneSubtitle: 'Your Raseed account and linked data have been deleted as requested.',
      doneExtra: 'If the app is still installed on your device, sign in with a new account whenever needed. For any questions, contact us at ',
      supportEmail: 'technical support',
      deleteAnother: 'Submit another request',
      invalidEmail: 'Please enter a valid email address',
      emailRequired: 'Email is required',
      codeRequired: 'Please enter the verification code',
      errorTitle: 'Request not processed',
      errors: {
        invalid_input: 'Invalid input, please check the entered data.',
        account_not_found: 'No Raseed account linked to this email was found. If you are sure about the email, use the delete option inside the app or contact support.',
        rate_limited: 'A verification code was recently sent to this email. Wait a minute and try again.',
        email_send_failed: 'We could not send a verification code to this email right now. Try again later, or use the delete option inside the app.',
        invalid_code: 'The verification code is incorrect or expired. Check your email and try again.',
        too_many_attempts: 'Too many attempts. Please request a new code from the start.',
        verify_failed: 'Could not confirm account ownership. Try again or contact support.',
        deletion_not_configured: 'The account deletion service is not configured yet. Use the delete option inside the app or contact support.',
        deletion_failed: 'Deletion failed. No account data was removed. Please contact support.',
        not_found: 'Unknown action, please reload the page.',
        method_not_allowed: 'Unsupported action.',
        network: 'Could not reach the server. Check your internet connection and try again.',
        not_configured: 'Account deletion is not available from this page right now. Use the delete option inside the app.',
      },
      securityNote: 'Your security comes first: the account is never deleted from the email alone. Deletion happens only after confirming the verification code sent to your email.',
      appDeleteNote: 'Deleting from inside the app is the fastest and safest option, since it verifies your session directly.',
    },
  },
} satisfies Record<Locale, Translations>;

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
    allProducts: string;
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
    deleteAccount: string;
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
    available: string;
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
    ctaHeadingStart: string;
    ctaHeadingHighlight: string;
    ctaHeadingEnd: string;
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
      subtitle: string;
      description: string;
      ctaDownload: string;
      ctaContact: string;
    };
    stats: { value: string; label: string }[];
    features: { title: string };
    howItWorks: {
      title: string;
      steps: { step: string; title: string; desc: string }[];
    };
    screenshots: string;
    screenshotsSubtitle: string;
    screenshotsItems: { title: string; desc: string }[];
    videos: { title: string };
    comparison: {
      title: string;
      subtitle: string;
      manualHeader: string;
      appHeader: string;
      rows: { label: string; manual: string; app: string }[];
    };
    pricing: {
      title: string;
      subtitle: string;
      currency: string;
      per: string;
      plans: {
        name: string;
        price: string;
        description: string;
        features: string[];
        popular?: boolean;
      }[];
    };
    faq: {
      title: string;
      subtitle: string;
      items: { q: string; a: string }[];
    };
    download: {
      title: string;
      subtitle: string;
      ctaPrimary: string;
      ctaContact: string;
      downloadApk: string;
      apkPure: string;
      googlePlay: string;
      comingSoon: string;
    };
    whyChoose: {
      title: string;
      subtitle: string;
      items: { title: string; desc: string }[];
    };
  };
  clover: {
    hero: {
      subtitle: string;
      description: string;
    };
    comingSoon: {
      title: string;
      subtitle: string;
      modulesTitle: string;
      modulesSubtitle: string;
      contactTitle: string;
    };
    modules: {
      title: string;
      items: { name: string; desc: string }[];
    };
    features: { title: string };
    howItWorks: {
      title: string;
      steps: { step: string; title: string; desc: string }[];
    };
    screenshots: string;
    platforms: { title: string; android: string; web: string };
    download: { title: string; android: string; web: string; comingSoon: string };
    faq: { title: string; items: { q: string; a: string }[] };
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
    deleteAccountTitle: string;
    deleteAccountDesc: string;
  };
  deleteAccount: {
    title: string;
    subtitle: string;
    badge: string;
    whatsDeletedTitle: string;
    whatsDeleted: string[];
    irreversibleTitle: string;
    irreversible: string;
    inAppTitle: string;
    inAppDesc: string;
    webTitle: string;
    webDesc: string;
    optionsTitle: string;
    formTitle: string;
    emailLabel: string;
    emailPlaceholder: string;
    emailHint: string;
    requestBtn: string;
    codeTitle: string;
    codeSent: string;
    codeLabel: string;
    codePlaceholder: string;
    codeHint: string;
    confirmBtn: string;
    backBtn: string;
    doneTitle: string;
    doneSubtitle: string;
    doneExtra: string;
    supportEmail: string;
    deleteAnother: string;
    invalidEmail: string;
    emailRequired: string;
    codeRequired: string;
    errorTitle: string;
    errors: {
      invalid_input: string;
      account_not_found: string;
      rate_limited: string;
      email_send_failed: string;
      invalid_code: string;
      too_many_attempts: string;
      verify_failed: string;
      deletion_not_configured: string;
      deletion_failed: string;
      not_found: string;
      method_not_allowed: string;
      network: string;
      not_configured: string;
    };
    securityNote: string;
    appDeleteNote: string;
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
