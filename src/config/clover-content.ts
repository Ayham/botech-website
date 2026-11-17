import type { Locale } from '@/i18n/config';

export type CloverIconName =
  | 'pos'
  | 'store'
  | 'cloud-off'
  | 'currency'
  | 'inventory'
  | 'users'
  | 'wallet'
  | 'chart'
  | 'barcode'
  | 'receipt'
  | 'truck'
  | 'qr'
  | 'monitor'
  | 'smartphone'
  | 'globe'
  | 'check'
  | 'arrow'
  | 'whatsapp'
  | 'refresh'
  | 'cart'
  | 'package'
  | 'tag';

export interface CloverIconItem {
  icon: CloverIconName;
  title: string;
  description: string;
}

export interface CloverFeatureGroup {
  key: string;
  icon: CloverIconName;
  title: string;
  description: string;
  items: string[];
}

export interface CloverSpotlight {
  key: string;
  icon: CloverIconName;
  eyebrow: string;
  title: string;
  description: string;
  points: string[];
  image?: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  panel?: 'currency';
}

export interface CloverPlatform {
  key: string;
  icon: CloverIconName;
  title: string;
  subtitle: string;
  description: string;
}

export interface CloverStep {
  title: string;
  description: string;
}

export interface CloverFaqItem {
  q: string;
  a: string;
}

export interface CloverPageContent {
  hero: {
    eyebrow: string;
    title: string;
    lead: string;
    primaryCta: string;
    secondaryCta: string;
    whatsappNote: string;
    chips: string[];
    visual: {
      src: string;
      alt: string;
      width: number;
      height: number;
    };
    visualLabel: string;
    visualCaption: string;
    offlineBadge: string;
  };
  pillars: CloverIconItem[];
  pain: {
    eyebrow: string;
    title: string;
    subtitle: string;
    items: CloverIconItem[];
  };
  ecosystem: {
    eyebrow: string;
    title: string;
    subtitle: string;
    pos: {
      title: string;
      role: string;
      description: string;
      items: string[];
    };
    market: {
      title: string;
      role: string;
      description: string;
      items: string[];
    };
    connector: string;
    note: string;
  };
  features: {
    eyebrow: string;
    title: string;
    subtitle: string;
    groups: CloverFeatureGroup[];
  };
  spotlights: {
    eyebrow: string;
    title: string;
    subtitle: string;
    items: CloverSpotlight[];
  };
  platforms: {
    eyebrow: string;
    title: string;
    subtitle: string;
    items: CloverPlatform[];
    note: string;
  };
  market: {
    eyebrow: string;
    title: string;
    subtitle: string;
    lead: string;
    features: CloverIconItem[];
    flowTitle: string;
    flow: CloverStep[];
    statuses: string[];
    statusesLabel: string;
    image: {
      src: string;
      alt: string;
      width: number;
      height: number;
    };
    imageLabel: string;
    note: string;
  };
  integration: {
    eyebrow: string;
    title: string;
    subtitle: string;
    steps: CloverStep[];
  };
  storeTypes: {
    eyebrow: string;
    title: string;
    subtitle: string;
    note: string;
  };
  pricing: {
    eyebrow: string;
    title: string;
    lead: string;
    items: CloverIconItem[];
    whatsappCta: string;
    whatsappNote: string;
    contactCta: string;
    note: string;
  };
  faq: {
    eyebrow: string;
    title: string;
    subtitle: string;
    items: CloverFaqItem[];
  };
  currencyPanel: {
    title: string;
    rateLabel: string;
    usdLabel: string;
    sypLabel: string;
    note: string;
  };
  finalCta: {
    title: string;
    subtitle: string;
    whatsappCta: string;
    contactCta: string;
  };
  backToProducts: string;
}

export const cloverContent: Record<Locale, CloverPageContent> = {
  ar: {
    hero: {
      eyebrow: 'Clover Flow POS + Clover Market',
      title: 'كل ما يحتاجه متجرك، في منظومة واحدة.',
      lead: 'نقطة بيع سريعة، مخزون مضبوط، حسابات عملاء، أسعار بالدولار والليرة، ومتجر إلكتروني متصل — في نظام واحد يعمل حتى عند انقطاع الإنترنت.',
      primaryCta: 'اطلب عرضًا يناسب متجرك',
      secondaryCta: 'استكشف المنظومة',
      whatsappNote: 'نناقش احتياج متجرك عبر واتساب، دون أسعار ثابتة على الموقع.',
      chips: ['بيع سريع', 'مخزون', 'ديون', 'دولار / ليرة', 'بدون إنترنت'],
      visual: {
        src: '/assets/clover/generic-hero.svg',
        alt: 'رسم عام لمنظومة نقاط بيع متصلة، دون التركيز على نوع متجر محدد',
        width: 1376,
        height: 768,
      },
      visualLabel: 'Clover',
      visualCaption: 'نقطة البيع، المخزون، الحسابات والمتجر الإلكتروني — متصلة في مكان واحد.',
      offlineBadge: 'بدون إنترنت',
    },
    pillars: [
      {
        icon: 'pos',
        title: 'نقطة بيع واحدة',
        description: 'البيع والدفع والفاتورة في شاشة واضحة وسريعة.',
      },
      {
        icon: 'store',
        title: 'متجر إلكتروني متصل',
        description: 'طلبات Clover Market تصل إلى Clover Flow POS.',
      },
      {
        icon: 'cloud-off',
        title: 'يعمل دون إنترنت',
        description: 'حفظ محلي ومزامنة تلقائية عند عودة الاتصال.',
      },
      {
        icon: 'currency',
        title: 'دولار وليرة',
        description: 'سعر صرف واضح في كل عملية، تتحكم به أنت.',
      },
    ],
    pain: {
      eyebrow: 'مبني لواقع المتجر',
      title: 'تحديات يومية، وحلول داخل النظام.',
      subtitle: 'صُمم Clover حول طريقة عمل المتاجر فعليًا، لا حول قائمة مزايا نظرية.',
      items: [
        {
          icon: 'cloud-off',
          title: 'انقطاع الإنترنت',
          description: 'استمر في البيع؛ تُحفظ العمليات محليًا وتُزامن عند عودة الاتصال.',
        },
        {
          icon: 'currency',
          title: 'الدولار والليرة',
          description: 'سعّر بأي عملة، واعرض المقابل وفق معدل صرف تحدّده أنت.',
        },
        {
          icon: 'users',
          title: 'البيع بالدين',
          description: 'حساب لكل عميل، مع الديون والدفعات والرصيد المتبقي.',
        },
        {
          icon: 'package',
          title: 'الجملة والتجزئة',
          description: 'اشترِ بالطرد أو الشوال، وبِع بالقطعة أو الكيلو.',
        },
        {
          icon: 'inventory',
          title: 'ضبط المخزون',
          description: 'كميات وتصنيفات وتنبيهات نقص، مرتبطة بالمبيعات والمشتريات.',
        },
        {
          icon: 'monitor',
          title: 'أكثر من جهاز',
          description: 'نفس الحساب على الحاسوب أو Android أو المتصفح.',
        },
      ],
    },
    ecosystem: {
      eyebrow: 'المنظومة',
      title: 'منظومة واحدة، وقناتا بيع.',
      subtitle: 'Clover Flow POS يدير المتجر من الداخل. Clover Market يفتح لك واجهة بيع إلكترونية متصلة به.',
      pos: {
        title: 'Clover Flow POS',
        role: 'قلب المتجر',
        description: 'البيع، المخزون، العملاء، الديون، المصروفات والتقارير.',
        items: ['شاشة بيع بالباركود', 'مخزون وكميات', 'حسابات وديون', 'تقارير ومزامنة'],
      },
      market: {
        title: 'Clover Market',
        role: 'قناة بيع إضافية',
        description: 'واجهة متجر إلكترونية تعرض منتجاتك وتستقبل طلبات العملاء.',
        items: ['واجهة بهوية متجرك', 'منتجات وأسعار', 'طلبات وحالات', 'توصيل وQR'],
      },
      connector: 'طلبات Market تصل إلى Flow POS',
      note: 'Clover Market لا يستبدل نقطة البيع؛ هو قناة إضافية تعمل معها.',
    },
    features: {
      eyebrow: 'قدرات Clover Flow POS',
      title: 'كل ما تحتاجه لإدارة المتجر، مجموع في مكان واحد.',
      subtitle: 'مجموعات واضحة تغطي دورة العمل اليومية: من إضافة المنتج إلى الفاتورة والتقرير.',
      groups: [
        {
          key: 'sales',
          icon: 'receipt',
          title: 'البيع والدفع',
          description: 'شاشة كاشير سريعة، من الباركود حتى طباعة الفاتورة.',
          items: [
            'بيع بالباركود أو باللمس',
            'إجماليات وخصومات وضرائب',
            'طرق دفع متعددة',
            'سجل مبيعات وطباعة فواتير',
          ],
        },
        {
          key: 'inventory',
          icon: 'inventory',
          title: 'المنتجات والمخزون',
          description: 'اعرف ما لديك، وما ينقص، وما يتحرك.',
          items: [
            'منتجات وأسعار وكميات وتصنيفات',
            'تنبيهات نقص المخزون',
            'حركة مخزون من المبيعات والمشتريات',
            'باركود للمنتجات',
          ],
        },
        {
          key: 'customers',
          icon: 'users',
          title: 'العملاء والحسابات',
          description: 'بدل دفتر الديون: حساب واضح لكل عميل.',
          items: [
            'ملفات عملاء وأرصدة',
            'بيع بالدين وتسجيل الدفعات',
            'كشف حساب لكل عميل',
            'متابعة الديون المستحقة',
          ],
        },
        {
          key: 'currency',
          icon: 'currency',
          title: 'الأسعار والعملات',
          description: 'دولار وليرة، بمعدل صرف تحت سيطرتك.',
          items: [
            'عرض بالدولار والليرة',
            'معدل صرف تلقائي أو يدوي',
            'تعديل المعدل حسب السوق',
            'تقريب مستقل لكل عملة',
          ],
        },
        {
          key: 'expenses',
          icon: 'wallet',
          title: 'المشتريات والمصروفات',
          description: 'الأرقام التي توضح أين تذهب أموال المتجر.',
          items: [
            'تسجيل المشتريات وربطها بالمخزون',
            'مصروفات المتجر',
            'تقارير الأرباح والخسائر',
            'التدفق النقدي ورأس المال',
          ],
        },
        {
          key: 'reports',
          icon: 'chart',
          title: 'التقارير والمزامنة',
          description: 'صورة كاملة عن المتجر، وبيانات محفوظة.',
          items: [
            'تقارير مبيعات ومخزون وعملاء وديون',
            'سجل مبيعات كامل',
            'حفظ محلي ومزامنة سحابية',
            'استعادة البيانات من السحابة',
          ],
        },
      ],
    },
    spotlights: {
      eyebrow: 'داخل النظام',
      title: 'تفاصيل تصنع فرقًا في يوم العمل.',
      subtitle: 'ثلاث قدرات عملية، مشروحة كما ستستخدمها في المتجر.',
      items: [
        {
          key: 'offline',
          icon: 'cloud-off',
          eyebrow: 'Offline-first',
          title: 'الإنترنت ينقطع. البيع لا.',
          description:
            'يعمل Clover Flow POS محليًا أولًا: تُحفظ العملية على الجهاز، ثم تُزامن مع السحابة عند عودة الاتصال. لا تنتظر شبكة لإتمام الفاتورة.',
          points: ['حفظ محلي فوري', 'مزامنة تلقائية في الخلفية', 'معالجة التعارضات واستعادة النسخ'],
          image: {
            src: '/assets/clover/generic-offline.svg',
            alt: 'رسم عام لأجهزة تعمل محلياً وتتزامن عند عودة الاتصال',
            width: 1024,
            height: 1024,
          },
        },
        {
          key: 'units',
          icon: 'package',
          eyebrow: 'وحدات البيع',
          title: 'اشترِ بالجملة، وبِع بالقطعة.',
          description:
            'عرّف الطرد أو الشوال أو الكرتون وعدد القطع داخله، ثم بِع بالقطعة أو الكيلو أو العلبة. Clover يضبط الكميات والأسعار تلقائيًا.',
          points: ['وحدات مثل الطرد والشوال والكرتون', 'بيع بالقطعة أو الكيلو أو العلبة', 'سعر منفصل لكل وحدة'],
          image: {
            src: '/assets/clover/generic-units.svg',
            alt: 'رسم عام لوحدات وتعبئات قابلة للقياس، دون نوع متجر محدد',
            width: 1024,
            height: 1024,
          },
        },
        {
          key: 'currency',
          icon: 'currency',
          eyebrow: 'العملتان',
          title: 'سعران واضحان في كل فاتورة.',
          description:
            'اختر عملة البيع، واعرض المبلغ بالدولار والليرة وفق معدل الصرف المعتمد. حدّث المعدل تلقائيًا أو يدويًا واضبط التقريب.',
          points: ['عملة بيع قابلة للاختيار', 'تحديث تلقائي أو يدوي للمعدل', 'تقريب مستقل لكل عملة'],
          panel: 'currency',
        },
      ],
    },
    platforms: {
      eyebrow: 'أجهزة التشغيل',
      title: 'اعمل من الجهاز الذي يناسب متجرك.',
      subtitle: 'نفس الحساب والبيانات، بغض النظر عن الجهاز الذي تفتح منه Clover.',
      items: [
        {
          key: 'windows',
          icon: 'monitor',
          title: 'Windows',
          subtitle: 'عبر المتصفح',
          description: 'افتح Clover Flow POS من متصفح الحاسوب على Windows.',
        },
        {
          key: 'android',
          icon: 'smartphone',
          title: 'Android',
          subtitle: 'تطبيق',
          description: 'استخدم التطبيق على الهاتف أو الجهاز اللوحي.',
        },
        {
          key: 'web',
          icon: 'globe',
          title: 'Web',
          subtitle: 'من أي جهاز',
          description: 'ادخل من متصفح حديث دون تثبيت نظام منفصل.',
        },
      ],
      note: 'يتطلب اتصالًا أوليًا لتسجيل الدخول والمزامنة، ثم يستمر البيع محليًا عند الانقطاع.',
    },
    market: {
      eyebrow: 'Clover Market',
      title: 'متجرك الإلكتروني، متصل بنقطة البيع.',
      subtitle: 'قناة بيع إضافية تمنح عملاءك تجربة شراء واضحة، وتمنحك طلبات تصل إلى النظام الذي تديره.',
      lead: 'اعرض منتجاتك وأسعارها في واجهة تحمل هوية متجرك، واستقبل الطلبات، وحدّث حالتها حتى التسليم. وعندما يصبح الطلب جاهزًا، أرسله إلى Clover Flow POS كفاتورة.',
      features: [
        {
          icon: 'store',
          title: 'واجهة بهوية متجرك',
          description: 'صفحة متجر إلكترونية باسمك وملف تعريفي وQR.',
        },
        {
          icon: 'tag',
          title: 'منتجات وأسعار',
          description: 'اعرض المنتجات والأسعار المتاحة للعملاء.',
        },
        {
          icon: 'cart',
          title: 'تجربة شراء واضحة',
          description: 'تصفح، سلة، وبيانات توصيل، ثم إتمام الطلب.',
        },
        {
          icon: 'receipt',
          title: 'طلبات وحالات',
          description: 'استلم الطلبات وحدّث حالتها من القبول حتى التسليم.',
        },
        {
          icon: 'truck',
          title: 'توصيل وحد أدنى',
          description: 'اضبط رسوم التوصيل والحد الأدنى للطلب.',
        },
        {
          icon: 'qr',
          title: 'تحويل إلى فاتورة POS',
          description: 'أرسل طلب Market إلى نقطة البيع دون إعادة إدخال.',
        },
      ],
      flowTitle: 'كيف يصل الطلب إلى المتجر؟',
      flow: [
        {
          title: 'يتصفح العميل',
          description: 'يستعرض منتجات متجرك وأسعارها من واجهة Market.',
        },
        {
          title: 'يُتمّ الطلب',
          description: 'يضيف إلى السلة ويحدد بيانات التوصيل.',
        },
        {
          title: 'يدير المتجر الطلب',
          description: 'قبول أو رفض، ثم تحديث الحالة حتى التسليم.',
        },
        {
          title: 'تصل الفاتورة إلى POS',
          description: 'تحويل الطلب إلى فاتورة دون إعادة كتابة.',
        },
      ],
      statusesLabel: 'مسار الطلب',
      statuses: ['قيد الانتظار', 'تم القبول', 'قيد التجهيز', 'جاهز', 'في الطريق إليك', 'تم التسليم'],
      image: {
        src: '/assets/clover/generic-market.svg',
        alt: 'رسم عام لواجهة متجر إلكتروني وسلة شراء',
        width: 1024,
        height: 1024,
      },
      imageLabel: 'طلب جديد',
      note: 'Clover Market قناة إضافية. نقطة البيع تبقى مركز إدارة المتجر.',
    },
    integration: {
      eyebrow: 'الترابط',
      title: 'من طلب إلكتروني إلى فاتورة، دون إعادة كتابة.',
      subtitle: 'دورة واحدة تصل بين العميل، والمتجر، ونقطة البيع.',
      steps: [
        {
          title: 'انشر المنتجات',
          description: 'أضف منتجاتك وأسعارها في Clover Market.',
        },
        {
          title: 'استقبل الطلب',
          description: 'يطلب العميل من واجهة متجرك الإلكترونية.',
        },
        {
          title: 'أدر الحالة',
          description: 'اقبل الطلب وحدّث مراحله حتى التسليم.',
        },
        {
          title: 'أنشئ الفاتورة',
          description: 'أرسل الطلب إلى Clover Flow POS.',
        },
      ],
    },
    storeTypes: {
      eyebrow: 'الأنشطة',
      title: 'مناسب لمتاجر متنوعة.',
      subtitle: 'بقالة، سوبرماركت، مواد غذائية، ملابس، إلكترونيات، إكسسوارات، أدوات منزلية، وتجزئة.',
      note: 'الوحدات والعملات قابلة للضبط حسب نشاطك، والتقارير تتبع حركة متجرك الفعلية.',
    },
    pricing: {
      eyebrow: 'الأسعار',
      title: 'السعر يُحدَّد حسب متجرك، لا حسب قائمة جاهزة.',
      lead: 'لا نعرض أرقامًا على الموقع لأن احتياج كل متجر يختلف. تواصل معنا عبر واتساب، وسنوضح الخيارات المناسبة لطريقة عملك.',
      items: [
        {
          icon: 'store',
          title: 'حجم المتجر وعدد الأجهزة',
          description: 'نحدد معك ما يناسب نقطة البيع وعدد الكاشيرات.',
        },
        {
          icon: 'globe',
          title: 'الفروع وطريقة التشغيل',
          description: 'نناقش احتياجك إن كنت تدير أكثر من فرع أو جهاز.',
        },
        {
          icon: 'users',
          title: 'التدريب والدعم',
          description: 'نوضح ما تحتاجه لتشغيل الفريق بثقة.',
        },
      ],
      whatsappCta: 'تحدث معنا عبر واتساب',
      whatsappNote: 'محادثة مباشرة، دون التزام.',
      contactCta: 'أرسل طلبًا من صفحة التواصل',
      note: 'لا توجد أسعار أو باقات معروضة على هذه الصفحة.',
    },
    faq: {
      eyebrow: 'أسئلة متكررة',
      title: 'أسئلة قبل أن تبدأ.',
      subtitle: 'إجابات مباشرة عن طريقة عمل Clover في المتجر.',
      items: [
        {
          q: 'هل يعمل Clover بدون إنترنت؟',
          a: 'نعم. يعمل Clover Flow POS محليًا أولًا، ويحفظ العمليات على الجهاز ثم يزامنها تلقائيًا عند عودة الاتصال. المزامنة نفسها تحتاج اتصالًا.',
        },
        {
          q: 'هل يدعم الدولار والليرة السورية؟',
          a: 'نعم. يمكنك البيع بالدولار أو الليرة، مع معدل صرف تلقائي أو يدوي، وعرض المبلغ وفق المعدل المعتمد.',
        },
        {
          q: 'هل يمكن البيع بالدين ومتابعة الحسابات؟',
          a: 'نعم. لكل عميل حساب ورصيد، ويمكن تسجيل الديون والدفعات ومتابعة المتبقي.',
        },
        {
          q: 'ما الفرق بين Clover Flow POS وClover Market؟',
          a: 'Flow POS هو نظام إدارة المتجر ونقطة البيع. Market قناة بيع إلكترونية إضافية تعرض منتجاتك وتستقبل الطلبات وترسلها إلى Flow POS.',
        },
        {
          q: 'هل تصل طلبات Market إلى نقطة البيع؟',
          a: 'نعم. يمكن تحويل طلب Market إلى فاتورة داخل Clover Flow POS دون إعادة إدخال الطلب.',
        },
        {
          q: 'هل يعمل على Windows وAndroid؟',
          a: 'نعم. يمكنك استخدامه من متصفح الحاسوب على Windows، ومن تطبيق Android، ومن المتصفح على أجهزة أخرى.',
        },
        {
          q: 'هل يمكن استخدامه على أكثر من جهاز؟',
          a: 'يمكن فتح نفس الحساب على أكثر من جهاز، وتتزامن البيانات عبر السحابة. نناقش معك إعداد الفروع أو نقاط البيع عند التواصل.',
        },
        {
          q: 'هل يدعم وحدات الجملة والتجزئة؟',
          a: 'نعم. يمكن تعريف وحدات مثل الطرد والشوال والكرتون، والبيع بالقطعة أو الكيلو أو العلبة.',
        },
        {
          q: 'كيف أعرف السعر؟',
          a: 'الأسعار تُحدد حسب احتياج المتجر. تواصل معنا عبر واتساب لنتحدث عن الخيارات المناسبة.',
        },
      ],
    },
    currencyPanel: {
      title: 'عرض مزدوج',
      rateLabel: 'معدل الصرف',
      usdLabel: 'دولار أمريكي',
      sypLabel: 'ليرة سورية',
      note: 'اختر عملة البيع، واعرض المقابل وفق المعدل المعتمد.',
    },
    finalCta: {
      title: 'جاهز ترى Clover على متجرك؟',
      subtitle: 'احكِ لنا عن متجرك، وسنوضح لك كيف تعمل المنظومة مع احتياجك.',
      whatsappCta: 'ابدأ المحادثة على واتساب',
      contactCta: 'صفحة التواصل',
    },
    backToProducts: 'العودة إلى المنتجات',
  },
  en: {
    hero: {
      eyebrow: 'Clover Flow POS + Clover Market',
      title: 'Everything your store needs, in one connected system.',
      lead: 'Fast checkout, controlled inventory, customer accounts, USD and SYP pricing, and an online storefront — connected in one system that keeps working when the internet drops.',
      primaryCta: 'Request a setup for your store',
      secondaryCta: 'Explore the system',
      whatsappNote: 'Tell us about your store on WhatsApp. No fixed prices on this page.',
      chips: ['Fast checkout', 'Inventory', 'Debts', 'USD / SYP', 'Works offline'],
      visual: {
        src: '/assets/clover/generic-hero.svg',
        alt: 'Generic illustration of a connected point-of-sale setup, not tied to a specific store type',
        width: 1376,
        height: 768,
      },
      visualLabel: 'Clover',
      visualCaption: 'Checkout, inventory, accounts, and your online storefront — connected in one place.',
      offlineBadge: 'Works offline',
    },
    pillars: [
      {
        icon: 'pos',
        title: 'One checkout',
        description: 'Sales, payment, and receipts in one clear, fast screen.',
      },
      {
        icon: 'store',
        title: 'A connected online store',
        description: 'Clover Market orders arrive in Clover Flow POS.',
      },
      {
        icon: 'cloud-off',
        title: 'Works offline',
        description: 'Saved locally, then synced automatically when you reconnect.',
      },
      {
        icon: 'currency',
        title: 'USD and SYP',
        description: 'A clear exchange rate on every sale, under your control.',
      },
    ],
    pain: {
      eyebrow: 'Built for real stores',
      title: 'Daily challenges, handled inside the system.',
      subtitle: 'Clover is shaped around how stores actually work — not a theoretical feature list.',
      items: [
        {
          icon: 'cloud-off',
          title: 'Internet outages',
          description: 'Keep selling; work is saved locally and syncs when the connection returns.',
        },
        {
          icon: 'currency',
          title: 'USD and Syrian Pound',
          description: 'Price in either currency and show the equivalent at the rate you set.',
        },
        {
          icon: 'users',
          title: 'Credit sales',
          description: 'An account for every customer, with debts, payments, and remaining balance.',
        },
        {
          icon: 'package',
          title: 'Wholesale and retail',
          description: 'Buy by parcel or bag, sell by piece or kilogram.',
        },
        {
          icon: 'inventory',
          title: 'Inventory control',
          description: 'Quantities, categories, and low-stock alerts tied to sales and purchases.',
        },
        {
          icon: 'monitor',
          title: 'More than one device',
          description: 'The same account on a computer, Android device, or in the browser.',
        },
      ],
    },
    ecosystem: {
      eyebrow: 'The system',
      title: 'One system, two sales channels.',
      subtitle: 'Clover Flow POS runs the store from the inside. Clover Market opens a connected online storefront.',
      pos: {
        title: 'Clover Flow POS',
        role: 'The heart of the store',
        description: 'Sales, inventory, customers, debts, expenses, and reports.',
        items: ['Barcode checkout', 'Inventory and quantities', 'Accounts and debts', 'Reports and sync'],
      },
      market: {
        title: 'Clover Market',
        role: 'An additional sales channel',
        description: 'An online storefront that shows your products and receives customer orders.',
        items: ['Your storefront identity', 'Products and prices', 'Orders and statuses', 'Delivery and QR'],
      },
      connector: 'Market orders arrive in Flow POS',
      note: 'Clover Market does not replace the checkout. It is an additional channel that works with it.',
    },
    features: {
      eyebrow: 'Clover Flow POS capabilities',
      title: 'Everything you need to run the store, gathered in one place.',
      subtitle: 'Clear groups covering the daily cycle: from adding a product to the receipt and the report.',
      groups: [
        {
          key: 'sales',
          icon: 'receipt',
          title: 'Sales and payment',
          description: 'A fast checkout screen, from barcode to printed receipt.',
          items: [
            'Barcode or touch checkout',
            'Totals, discounts, and taxes',
            'Multiple payment methods',
            'Sales history and receipts',
          ],
        },
        {
          key: 'inventory',
          icon: 'inventory',
          title: 'Products and inventory',
          description: 'Know what you have, what is running low, and what is moving.',
          items: [
            'Products, prices, quantities, and categories',
            'Low-stock alerts',
            'Stock movement from sales and purchases',
            'Product barcodes',
          ],
        },
        {
          key: 'customers',
          icon: 'users',
          title: 'Customers and accounts',
          description: 'Instead of a paper debt book: a clear account for every customer.',
          items: [
            'Customer profiles and balances',
            'Credit sales and payment records',
            'A statement for every customer',
            'Outstanding debt tracking',
          ],
        },
        {
          key: 'currency',
          icon: 'currency',
          title: 'Pricing and currencies',
          description: 'USD and SYP, with an exchange rate you control.',
          items: [
            'Display in USD and SYP',
            'Automatic or manual exchange rate',
            'Adjust the rate to the market',
            'Independent rounding per currency',
          ],
        },
        {
          key: 'expenses',
          icon: 'wallet',
          title: 'Purchases and expenses',
          description: 'The numbers that show where the store’s money goes.',
          items: [
            'Record purchases and link them to inventory',
            'Store expenses',
            'Profit and loss reports',
            'Cash flow and capital',
          ],
        },
        {
          key: 'reports',
          icon: 'chart',
          title: 'Reports and sync',
          description: 'A complete picture of the store, with data kept safe.',
          items: [
            'Sales, inventory, customer, and debt reports',
            'A complete sales history',
            'Local storage and cloud sync',
            'Restore data from the cloud',
          ],
        },
      ],
    },
    spotlights: {
      eyebrow: 'Inside the system',
      title: 'Details that make a difference in the working day.',
      subtitle: 'Three practical capabilities, explained as you would use them in the store.',
      items: [
        {
          key: 'offline',
          icon: 'cloud-off',
          eyebrow: 'Offline-first',
          title: 'The internet drops. The selling does not.',
          description:
            'Clover Flow POS works locally first: the transaction is saved on the device, then synced to the cloud when the connection returns. You never wait on a network to finish a receipt.',
          points: ['Instant local save', 'Automatic background sync', 'Conflict handling and snapshot restore'],
          image: {
            src: '/assets/clover/generic-offline.svg',
            alt: 'Generic illustration of local devices syncing when the connection returns',
            width: 1024,
            height: 1024,
          },
        },
        {
          key: 'units',
          icon: 'package',
          eyebrow: 'Selling units',
          title: 'Buy wholesale. Sell by the piece.',
          description:
            'Define a parcel, bag, or carton and how many pieces it contains, then sell by the piece, kilogram, or box. Clover keeps quantities and prices in line automatically.',
          points: ['Units such as parcel, bag, and carton', 'Sell by piece, kilogram, or box', 'A separate price for each unit'],
          image: {
            src: '/assets/clover/generic-units.svg',
            alt: 'Generic illustration of packaging units and measurements, not tied to a specific store type',
            width: 1024,
            height: 1024,
          },
        },
        {
          key: 'currency',
          icon: 'currency',
          eyebrow: 'Two currencies',
          title: 'Two clear prices on every receipt.',
          description:
            'Choose the sale currency and show the amount in USD and SYP at the approved exchange rate. Update the rate automatically or manually, with rounding for each currency.',
          points: ['Selectable sale currency', 'Automatic or manual rate updates', 'Independent rounding per currency'],
          panel: 'currency',
        },
      ],
    },
    platforms: {
      eyebrow: 'Where it runs',
      title: 'Work from the device that fits your store.',
      subtitle: 'The same account and data, whichever device you open Clover on.',
      items: [
        {
          key: 'windows',
          icon: 'monitor',
          title: 'Windows',
          subtitle: 'In the browser',
          description: 'Open Clover Flow POS from a desktop browser on Windows.',
        },
        {
          key: 'android',
          icon: 'smartphone',
          title: 'Android',
          subtitle: 'The app',
          description: 'Use the app on a phone or tablet.',
        },
        {
          key: 'web',
          icon: 'globe',
          title: 'Web',
          subtitle: 'Any device',
          description: 'Sign in from a modern browser without installing a separate system.',
        },
      ],
      note: 'An initial connection is needed to sign in and sync. After that, selling continues locally during an outage.',
    },
    market: {
      eyebrow: 'Clover Market',
      title: 'Your online store, connected to the checkout.',
      subtitle: 'An additional sales channel that gives customers a clear shopping experience and delivers orders into the system you already run.',
      lead: 'Show your products and prices on a storefront that carries your identity, receive orders, and update their status through delivery. When an order is ready, send it to Clover Flow POS as an invoice.',
      features: [
        {
          icon: 'store',
          title: 'Your own storefront',
          description: 'An online store page with your name, profile, and QR code.',
        },
        {
          icon: 'tag',
          title: 'Products and prices',
          description: 'Show the products and prices available to customers.',
        },
        {
          icon: 'cart',
          title: 'A clear shopping flow',
          description: 'Browse, add to cart, enter delivery details, and place the order.',
        },
        {
          icon: 'receipt',
          title: 'Orders and statuses',
          description: 'Receive orders and move them from acceptance to delivery.',
        },
        {
          icon: 'truck',
          title: 'Delivery and minimums',
          description: 'Set the delivery fee and minimum order value.',
        },
        {
          icon: 'qr',
          title: 'Send to a POS invoice',
          description: 'Turn a Market order into a checkout invoice without retyping.',
        },
      ],
      flowTitle: 'How does the order reach the store?',
      flow: [
        {
          title: 'The customer browses',
          description: 'They explore your products and prices in the Market storefront.',
        },
        {
          title: 'They place the order',
          description: 'They add items to the cart and enter delivery details.',
        },
        {
          title: 'The store manages it',
          description: 'Accept or reject, then update the status through delivery.',
        },
        {
          title: 'The invoice reaches POS',
          description: 'Convert the order into an invoice without retyping.',
        },
      ],
      statusesLabel: 'Order journey',
      statuses: ['Pending', 'Accepted', 'Processing', 'Ready', 'Out for delivery', 'Delivered'],
      image: {
        src: '/assets/clover/generic-market.svg',
        alt: 'Generic illustration of an online storefront and shopping cart',
        width: 1024,
        height: 1024,
      },
      imageLabel: 'New order',
      note: 'Clover Market is an additional channel. The checkout remains the center of store operations.',
    },
    integration: {
      eyebrow: 'The connection',
      title: 'From an online order to an invoice, without retyping.',
      subtitle: 'One cycle linking the customer, the store, and the checkout.',
      steps: [
        {
          title: 'Publish products',
          description: 'Add your products and prices to Clover Market.',
        },
        {
          title: 'Receive the order',
          description: 'The customer orders from your online storefront.',
        },
        {
          title: 'Manage the status',
          description: 'Accept the order and update each stage through delivery.',
        },
        {
          title: 'Create the invoice',
          description: 'Send the order to Clover Flow POS.',
        },
      ],
    },
    storeTypes: {
      eyebrow: 'Store types',
      title: 'Built for a wide range of stores.',
      subtitle: 'Grocery, supermarket, food, clothing, electronics, accessories, household goods, and retail.',
      note: 'Units and currencies can be configured for your business, and reports follow your store’s actual activity.',
    },
    pricing: {
      eyebrow: 'Pricing',
      title: 'The price is shaped around your store, not a fixed list.',
      lead: 'We do not show numbers on this page because every store is different. Talk to us on WhatsApp and we will explain the options that fit how you work.',
      items: [
        {
          icon: 'store',
          title: 'Store size and devices',
          description: 'We work out what fits your checkout and number of cashiers.',
        },
        {
          icon: 'globe',
          title: 'Branches and operation',
          description: 'We discuss your needs if you run more than one branch or device.',
        },
        {
          icon: 'users',
          title: 'Training and support',
          description: 'We explain what your team needs to run it with confidence.',
        },
      ],
      whatsappCta: 'Talk to us on WhatsApp',
      whatsappNote: 'A direct conversation, with no obligation.',
      contactCta: 'Send a request from the contact page',
      note: 'No prices or packages are shown on this page.',
    },
    faq: {
      eyebrow: 'FAQ',
      title: 'Questions before you start.',
      subtitle: 'Direct answers about how Clover works in a store.',
      items: [
        {
          q: 'Does Clover work without internet?',
          a: 'Yes. Clover Flow POS works locally first, saving transactions on the device and syncing automatically when the connection returns. The sync itself needs a connection.',
        },
        {
          q: 'Does it support USD and the Syrian Pound?',
          a: 'Yes. You can sell in USD or SYP with an automatic or manual exchange rate, and show the amount at the approved rate.',
        },
        {
          q: 'Can I sell on credit and track accounts?',
          a: 'Yes. Every customer has an account and balance, and you can record debts, payments, and the remaining amount.',
        },
        {
          q: 'What is the difference between Clover Flow POS and Clover Market?',
          a: 'Flow POS is the store management and checkout system. Market is an additional online sales channel that shows your products, receives orders, and sends them to Flow POS.',
        },
        {
          q: 'Do Market orders reach the checkout?',
          a: 'Yes. A Market order can be converted into an invoice inside Clover Flow POS without entering the order again.',
        },
        {
          q: 'Does it run on Windows and Android?',
          a: 'Yes. You can use it from a desktop browser on Windows, from the Android app, and from a browser on other devices.',
        },
        {
          q: 'Can it be used on more than one device?',
          a: 'The same account can be opened on more than one device, with data synced through the cloud. We can discuss branch or checkout setup when you contact us.',
        },
        {
          q: 'Does it support wholesale and retail units?',
          a: 'Yes. You can define units such as parcel, bag, and carton, and sell by the piece, kilogram, or box.',
        },
        {
          q: 'How do I find out the price?',
          a: 'Pricing is based on what the store needs. Talk to us on WhatsApp and we will go through the suitable options.',
        },
      ],
    },
    currencyPanel: {
      title: 'Dual display',
      rateLabel: 'Exchange rate',
      usdLabel: 'US Dollar',
      sypLabel: 'Syrian Pound',
      note: 'Choose the sale currency and show the equivalent at the approved rate.',
    },
    finalCta: {
      title: 'Ready to see Clover in your store?',
      subtitle: 'Tell us about your store and we will explain how the system fits what you need.',
      whatsappCta: 'Start the conversation on WhatsApp',
      contactCta: 'Contact page',
    },
    backToProducts: 'Back to Products',
  },
};
