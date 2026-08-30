import {
  BusinessConfig,
  ServiceItem,
  CityItem,
  TrustPillar,
  WhyReason,
  StepItem,
  FAQItem,
  BeforeAfterItem,
  ReviewItem,
  ProofItem,
} from '../types';

export const BUSINESS_CONFIG: BusinessConfig = {
  name: 'خدمة بيت',
  descriptor: 'خدمات منزلية متكاملة',
  phone: '966535025900', // Unified phone number for Khidma Beit
  formattedPhoneDisplay: '053 502 5900',
  whatsappNumber: '966535025900', // Unified WhatsApp number
  region: 'المنطقة الشرقية بالمملكة العربية السعودية',
  email: null, // Left null until provided by client
  address: null, // Left null until provided by client (مثال: حي الشاطئ، الدمام)
  addressCity: 'الدمام', // المدينة الرئيسية — عدّلها بعد إضافة نشاطك على خرائط جوجل
  postalCode: null, // الرمز البريدي عند توفره
  licenseNumber: null, // Left null until provided by client
  socialLinks: null,
  yearsExperience: null,
  guaranteeNote: null,
  // الموقع الجغرافي التقريبي — استبدله بإحداثيات عنوانك الفعلي بعد نشر النشاط على خرائط جوجل
  geo: {
    latitude: 26.4207,
    longitude: 50.0888,
  },
  // رابط ملف نشاطك على خرائط جوجل (بعد إنشائه). تُستخدم القيمة أدناه تلقائياً إن تُركت null
  mapsUrl: null,
  mapsEmbedUrl: null,
  openingHours: {
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    opens: '08:00',
    closes: '23:00',
    description: 'يومياً من 8 صباحاً حتى 11 مساءً',
  },
};

export const CITIES_DATA: CityItem[] = [
  {
    id: 'dammam',
    slug: 'dammam',
    nameAr: 'الدمام',
    nameEn: 'Dammam',
    isPopular: true,
    descriptionNote: 'تغطية شاملة لجميع أحياء ومخططات الدمام',
    popularDistricts: [
      'حي الشاطئ',
      'حي المزروعية',
      'حي الفاخرية',
      'حي طيبة',
      'حي المنار',
      'حي الفردوس',
      'حي النورس',
      'حي الفيصلية',
      'حي الجوهرة',
    ],
  },
  {
    id: 'khobar',
    slug: 'khobar',
    nameAr: 'الخبر',
    nameEn: 'Khobar',
    isPopular: true,
    descriptionNote: 'خدمة سريعة في كافة مناطق وأحياء الخبر',
    popularDistricts: [
      'حي العليا',
      'حي الحزام الأخضر',
      'حي الحزام الذهبي',
      'حي العقربية',
      'حي الراكة',
      'حي التحلية',
      'حي العزيزية',
      'حي الكورنيش',
    ],
  },
  {
    id: 'qatif',
    slug: 'qatif',
    nameAr: 'القطيف',
    nameEn: 'Qatif',
    descriptionNote: 'خدمات فورية تغطي القطيف وتوابعها',
    popularDistricts: ['حي الشاطئ', 'حي المجيدية', 'حي الناصرة', 'حي دانة الرامس', 'عنك', 'تاروت'],
  },
  {
    id: 'dhahran',
    slug: 'dhahran',
    nameAr: 'الظهران',
    nameEn: 'Dhahran',
    descriptionNote: 'خدمات منزلية متخصصة في الظهران',
    popularDistricts: ['حي الدوحة', 'حي الدانة', 'حي القصور', 'حي السلمانية', 'حي الجامعة'],
  },
  {
    id: 'saihat',
    slug: 'saihat',
    nameAr: 'سيهات',
    nameEn: 'Saihat',
    descriptionNote: 'تغطية منتظمة لجميع أحياء سيهات',
    popularDistricts: ['حي المنتزه', 'حي الغدير', 'حي الفردوس', 'حي الزهور', 'حي النمر الجنوبي'],
  },
  {
    id: 'jubail',
    slug: 'jubail',
    nameAr: 'الجبيل',
    nameEn: 'Jubail',
    descriptionNote: 'خدمات الجبيل الصناعية والبلد',
    popularDistricts: ['الجبيل الصناعية', 'حي الفناتير', 'حي جلمودة', 'حي الدفي', 'حي الحمراء', 'حي البلد'],
  },
  {
    id: 'al-ahsa',
    slug: 'al-ahsa',
    nameAr: 'الأحساء',
    nameEn: 'Al-Ahsa',
    descriptionNote: 'خدمات الهفوف والمبرز وكافة مدن الأحساء',
    popularDistricts: ['الهفوف', 'المبرز', 'حي الخالدية', 'حي السليمانية', 'حي المزروع', 'حي الشهابية'],
  },
];

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'home-cleaning',
    slug: 'home-cleaning',
    name: 'تنظيف المنازل والشقق',
    shortDescription: 'تنظيف عميق ومتكامل للمنازل والشقق يشمل الغرف، الأرضيات، المطابخ، والحمامات بأحدث أجهزة البخار والتعقيم.',
    iconName: 'Home',
    category: 'نظافة عامة',
    categorySlug: 'cleaning',
    highlights: [
      'تنظيف وتلميع كافة الأرضيات والأسطح',
      'تعقيم عميق للمطابخ والحمامات',
      'إزالة الغبار من الشبابيك والأبواب والزوايا',
    ],
  },
  {
    id: 'villa-cleaning',
    slug: 'villa-cleaning',
    name: 'تنظيف الفلل والقصور',
    shortDescription: 'حلول متكاملة للفلل والمباني الكبيرة قبل أو بعد السكن، تشمل الواجهات، الأحواش، والأسطح الزجاجية.',
    iconName: 'Building2',
    category: 'نظافة عامة',
    categorySlug: 'cleaning',
    highlights: [
      'تنظيف شامل للمساحات الكبيرة والملاحق',
      'غسيل وجلي الأرضيات والسلالم الرخامية',
      'تنظيف واجهات وأحواش الفلل الخارجية',
    ],
  },
  {
    id: 'sofa-cleaning',
    slug: 'sofa-cleaning',
    name: 'تنظيف الكنب والمجالس',
    shortDescription: 'غسيل وتعقيم احترافي لأطقم الكنب والمجالس العربية بأجهزة الحقن والشفط لإزالة أصعب البقع واستعادة رونق الأقمشة.',
    iconName: 'Armchair',
    category: 'مفروشات',
    categorySlug: 'furniture',
    highlights: [
      'إزالة البقع العنيدة والروائح الكريهة',
      'مواد آمنة تحافظ على ألوان وجودة القماش',
      'تجفيف سريع بدون ترك أي رطوبة',
    ],
  },
  {
    id: 'carpet-cleaning',
    slug: 'carpet-cleaning',
    name: 'تنظيف السجاد والموكيت',
    shortDescription: 'عناية متقدمة بالسجاد والموكيت بالموقع باستخدام رغوة جافة وتقنيات استخلاص الأتربة العميقة وتعقيم الألياف.',
    iconName: 'Layers',
    category: 'مفروشات',
    categorySlug: 'furniture',
    highlights: [
      'تنظيف عميق للألياف وقواعد السجاد',
      'التخلص من البكتيريا ومسببات الحساسية',
      'تعطير وتعقيم يدوم طويلاً',
    ],
  },
  {
    id: 'ac-cleaning',
    slug: 'ac-cleaning',
    name: 'غسيل وصيانة المكيفات',
    shortDescription: 'غسيل وحدات التكييف السبليت والدولابي بالموقع مع فحص الفريون وتنظيف الفلاتر ومجاري تصريف المياه لتحسين التبريد.',
    iconName: 'Wind',
    category: 'تكييف ومياه',
    categorySlug: 'ac_water',
    highlights: [
      'غسيل الوحدة الداخلية والخارجية بالضغط',
      'فحص مستوى الفريون وكفاءة التبريد',
      'عزل كامل لمنع تسرب المياه أثناء الغسيل',
    ],
  },
  {
    id: 'tank-cleaning',
    slug: 'tank-cleaning',
    name: 'تنظيف وتعقيم الخزانات',
    shortDescription: 'تفريغ وتنظيف الخزانات الأرضية والعلوية مع إزالة الرواسب والطحالب والتعقيم بمواد معتمدة لضمان نقاء المياه.',
    iconName: 'Droplets',
    category: 'تكييف ومياه',
    categorySlug: 'ac_water',
    highlights: [
      'إزالة الرواسب والشوائب من القاع والجدران',
      'تعقيم كيميائي آمن ومطابق للاشتراطات',
      'فحص العزل وسلامة العوامة والغطاء',
    ],
  },
  {
    id: 'pest-control',
    slug: 'pest-control',
    name: 'مكافحة الحشرات والآفات',
    shortDescription: 'برامج إبادة ورش آمنة بدون مغادرة المنزل لمكافحة الصراصير، النمل الأبيض، بق الفراش، والقوارض مع فحص وقائي.',
    iconName: 'ShieldAlert',
    category: 'مكافحة وصرف',
    categorySlug: 'pest_drain',
    highlights: [
      'مبيدات معتمدة وعديمة الرائحة وآمنة للأسرة',
      'حقن الجحور ومصائد احترافية للقوارض',
      'إرشادات وضمان للمتابعة بعد الرش',
    ],
  },
  {
    id: 'drain-cleaning',
    slug: 'drain-cleaning',
    name: 'تسليك الصرف والبيارات',
    shortDescription: 'تسليك فوري وفعّال لانسدادات شبكات الصرف الصحي والمجاري المنزلية باستخدام سيارات الضغط والنيتروجين وسوست التسليك.',
    iconName: 'Wrench',
    category: 'مكافحة وصرف',
    categorySlug: 'pest_drain',
    highlights: [
      'فتح فوري للانسدادات المستعصية والدهون',
      'أجهزة ضغط وسوست كهربائية متطورة',
      'تنظيف وتطهير فتحات الصرف لعدم تكرار الانسداد',
    ],
  },
];

export const TRUST_PILLARS: TrustPillar[] = [
  {
    id: 'coverage',
    title: 'تغطية واسعة في المنطقة الشرقية',
    description: 'نخدم الدمام، الخبر، القطيف، الظهران، سيهات، الجبيل، والأحساء.',
    iconName: 'MapPin',
  },
  {
    id: 'instant-contact',
    title: 'خدمة عبر واتساب واتصال مباشر',
    description: 'تواصل فوري وسهل دون نماذج تسجيل طويلة أو إجراءات معقدة.',
    iconName: 'MessageSquare',
  },
  {
    id: 'multiple-services',
    title: 'خدمات منزلية متعددة',
    description: 'حلول متكاملة للمنزل تشمل التنظيف والمكيفات والخزانات والمكافحة والصرف.',
    iconName: 'Sparkles',
  },
  {
    id: 'clear-details',
    title: 'تفاصيل واضحة للخدمة',
    description: 'تحديد نوع الخدمة المطلوبة واحتياجاتك قبل البدء بالتنسيق والتنفيذ.',
    iconName: 'CheckCircle2',
  },
];

export const QUICK_SERVICE_PILLS = [
  { label: 'تنظيف', serviceName: 'تنظيف منازل' },
  { label: 'كنب', serviceName: 'تنظيف كنب' },
  { label: 'سجاد', serviceName: 'تنظيف سجاد وموكيت' },
  { label: 'خزانات', serviceName: 'تنظيف خزانات مياه' },
  { label: 'مكيفات', serviceName: 'تنظيف مكيفات' },
  { label: 'مكافحة حشرات', serviceName: 'مكافحة حشرات' },
  { label: 'صرف صحي', serviceName: 'تسليك صرف صحي وبيارات' },
];

export const WHY_REASONS: WhyReason[] = [
  {
    id: 'direct-contact',
    title: 'تواصل مباشر وسريع',
    description: 'اطلب الخدمة مباشرة عبر محادثة واتساب أو اتصال هاتفي في أي وقت.',
    iconName: 'PhoneCall',
  },
  {
    id: 'all-in-one',
    title: 'خدمات متعددة في مكان واحد',
    description: 'بدل البحث عن مزودين مختلفين، نوفر باقة شاملة من الاحتياجات المنزلية الأساسية.',
    iconName: 'LayoutGrid',
  },
  {
    id: 'eastern-coverage',
    title: 'تغطية في المنطقة الشرقية',
    description: 'جاهزون لخدمتكم في الدمام، الخبر، القطيف، الظهران، سيهات، الجبيل، والأحساء.',
    iconName: 'MapPinCheck',
  },
  {
    id: 'clear-scope',
    title: 'تفاصيل واضحة قبل التنفيذ',
    description: 'نوضح تفاصيل العمل المطلوب حسب حجم المكان وطبيعة الخدمة قبل بدء التنفيذ.',
    iconName: 'FileText',
  },
];

export const HOW_IT_WORKS_STEPS: StepItem[] = [
  {
    number: '01',
    title: 'اختر الخدمة',
    description: 'حدد الخدمة أو مجموعة الخدمات التي يحتاجها منزلك من قائمة خدماتنا.',
  },
  {
    number: '02',
    title: 'أرسل طلبك عبر واتساب أو اتصل بنا',
    description: 'تواصل معنا مباشرة واذكر موقعك بالمنطقة الشرقية وتفاصيل الخدمة المطلوبة.',
  },
  {
    number: '03',
    title: 'يتم التنسيق معك لتحديد التفاصيل والموعد',
    description: 'نتفق معك على الموعد المناسب وتفاصيل الخدمة لترتيب الزيارة فوراً.',
  },
];

export const FAQS_DATA: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'هل تخدمون جميع مدن المنطقة الشرقية؟',
    answer: 'نعم، نغطي المدن الرئيسية في المنطقة الشرقية: الدمام، الخبر، القطيف، الظهران، سيهات، الجبيل، والأحساء.',
  },
  {
    id: 'faq-2',
    question: 'كيف أطلب الخدمة؟',
    answer: 'طلب الخدمة بسيط ومباشر: اضغط على زر الواتساب أو زر الاتصال في الموقع، وحدد الخدمة المطلوبة ومدينتك، وسيتم التنسيق معك فوراً لتأكيد التفاصيل.',
  },
  {
    id: 'faq-3',
    question: 'هل يمكن معرفة السعر قبل الزيارة؟',
    answer: 'نعم، عند تواصلك عبر واتساب وتوضيح نوع الخدمة وتفاصيل المكان (مثل المساحة أو عدد الغرف أو الوحدات)، يتم إفادتك بتقدير التكلفة وطبيعة العمل قبل التنسيق.',
  },
  {
    id: 'faq-4',
    question: 'هل تقدمون خدمة تنظيف للمنازل والفلل؟',
    answer: 'نعم، نوفر تنظيفاً للشقق والمنازل والفلل سواء كان تنظيفاً دورياً معتاداً أو تنظيفاً شاملاً بعد التشطيب أو قبل الانتقال للسكن.',
  },
  {
    id: 'faq-5',
    question: 'هل توفرون مكافحة حشرات؟',
    answer: 'نعم، نقدم خدمات مكافحة الحشرات والقوارض في المنازل والمباني بالمنطقة الشرقية باستخدام مواد مخصصة وإرشادات وقائية واضحة.',
  },
  {
    id: 'faq-6',
    question: 'هل تقدمون تسليك للصرف الصحي والبيارات؟',
    answer: 'نعم، تتوفر خدمات تسليك انسدادات الصرف الصحي والبيارات وشبكات التصريف المنزلية بمعدات مخصصة لحل المشكلة بسرعة.',
  },
];

// REAL CLIENT DATA STUBS - Safe empty states per instructions
// Zero fake reviews, fake ratings, fake license numbers, or fake before-after items
export const BEFORE_AFTER_DATA: BeforeAfterItem[] = [];
export const REVIEWS_DATA: ReviewItem[] = [];
export const PROOF_ITEMS_DATA: ProofItem[] = [];
