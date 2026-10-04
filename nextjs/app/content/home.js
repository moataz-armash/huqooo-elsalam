// Home page copy. Headings are stored as { pre, em, br } rather than JSX so
// this file stays plain data: the page renders pre, an optional line break,
// then em inside <em>.
export const HOME = {
  ar: {
    metaTitle: "حقول السلام | توريد الشتلات وتنسيق الحدائق واللاندسكيب",
    metaDescription:
      "حقول السلام لتوريد الشتلات الزراعية وتنسيق الحدائق وأعمال اللاندسكيب والنباتات الداخلية والمستلزمات الزراعية في الرياض والمملكة العربية السعودية، بأفضل قيمة مقابل السعر.",
    keywords: [
      "توريد شتلات", "شتلات زراعية", "تنسيق حدائق", "لاندسكيب",
      "نباتات داخلية", "مشاتل الرياض", "أسمدة ومبيدات", "حقول السلام",
    ],
    heroImageAlt: "مشتل حقول السلام لتوريد الشتلات وتنسيق الحدائق",
    twitterTitle: "حقول السلام | حلول زراعية متكاملة",

    heroEyebrow: "حلول زراعية متكاملة للمشاريع والحدائق",
    heroTitle: "أفضل قيمة مقابل السعر في توريد الشتلات بالمملكة",
    heroCopy:
      "نوفر مجموعة متنوعة من الشتلات والنباتات والخدمات الزراعية بأسعار تنافسية، مع حلول تناسب الفلل والحدائق والمزارع والمشاريع السكنية والتجارية.",
    heroServicesLink: "تعرّف على خدماتنا",
    heroTrust: "أرسل متطلبات مشروعك، وسنساعدك في اختيار الحل المناسب.",
    heroScroll: "مرر للاستكشاف",

    servicesEyebrow: "ما نقدمه لك",
    servicesHeading: { pre: "كل ما يحتاجه مشروعك", em: "الزراعي في مكان واحد", br: true },
    servicesText:
      "نوفر مجموعة متكاملة من المنتجات والخدمات الزراعية لتلبية احتياجات الأفراد والمشاريع بمختلف أحجامها.",
    serviceDetails: "تفاصيل الخدمة",
    allServicesDetailed: "كل الخدمات بالتفصيل",
    talkToAdvisor: "تحدث مع مستشار زراعي",

    valueEyebrow: "حلول مدروسة لمختلف الاحتياجات",
    valueHeading: { pre: "قيمة أفضل", em: "لمشروعك", br: true },
    valueText:
      "نحرص في حقول السلام على تقديم حلول زراعية تحقق أفضل قيمة ممكنة، من خلال توفير المنتجات والخدمات المناسبة بأسعار تنافسية تتوافق مع احتياجات المشروع.",
    valueCta: "احصل على عرض سعر مخصص",
    stamp: ["من", "الأرض", "نبدأ"],

    reasonsEyebrow: "لماذا حقول السلام؟",
    reasonsHeading: { pre: "لماذا يختارنا", em: "عملاؤنا؟", br: true },
    reasonsAction: "ابدأ محادثة الآن",
    reasons: [
      ["01", "قيمة أفضل مقابل السعر", "حلول وخيارات تناسب احتياجات وميزانية مشروعك.", "value"],
      ["02", "حلول زراعية متكاملة", "من الشتلات والنباتات إلى تنسيق الحدائق واللاندسكيب.", "leaf"],
      ["03", "خيارات لمختلف المشاريع", "نخدم الفلل والحدائق والمزارع والمشاريع المختلفة.", "projects"],
      ["04", "اهتمام باحتياجات العميل", "نساعدك على اختيار الحل المناسب لمشروعك.", "refresh"],
      ["05", "سرعة وسهولة التواصل", "تواصل مباشر وسريع عبر واتساب.", "message"],
      ["06", "مرونة في الكميات", "خيارات تناسب الاحتياجات المختلفة والمشاريع بمختلف أحجامها.", "sliders"],
    ],

    projectsEyebrow: "من أعمالنا",
    projectsHeading: { pre: "شاهد جانبًا", em: "من أعمالنا", br: true },
    projectsText:
      "نماذج من مشاريعنا وخدماتنا في مجال تنسيق الحدائق واللاندسكيب وتوريد النباتات والشتلات.",
    projects: [
      ["/images/landscape-project-v2.webp", "توريد وتنسيق", "حدائق تنمو بالحياة"],
      ["/images/nursery-hero-v2.webp", "لاندسكيب", "مساحات تليق بك"],
      ["/images/nursery-care-v2.webp", "نباتات داخلية", "طبيعة في كل زاوية"],
    ],
    projectMessage: (title) => `السلام عليكم، أرغب في مشاهدة تفاصيل عمل ${title}.`,

    processEyebrow: "بكل وضوح وسهولة",
    processHeading: { pre: "كيف تبدأ", em: "معنا؟", br: true },
    processText: "من أول رسالة وحتى استلام طلبك، نرافقك بخطوات واضحة وسريعة.",
    processCta: "ابدأ طلب عرض السعر",
    steps: [
      ["01", "أرسل متطلباتك", "املأ نموذجاً قصيراً، ويصلنا طلبك عبر واتساب.", "send"],
      ["02", "نراجع احتياجات مشروعك", "يساعدك فريقنا في تحديد الخيارات المناسبة.", "search"],
      ["03", "تحصل على عرض السعر", "نقدم لك عرضًا بناءً على المنتجات أو الخدمات المطلوبة.", "file"],
      ["04", "نبدأ تنفيذ طلبك", "نعمل على توفير احتياجاتك ومتابعة طلبك.", "sparkles"],
    ],

    faqEyebrow: "نجيب عن أسئلتك",
    faqHeading: { pre: "الأسئلة الأكثر", em: "شيوعًا", br: true },
    faqText: "لم تجد إجابة سؤالك؟ تواصل معنا مباشرة، وسنكون سعداء بمساعدتك.",
    faqAction: "اسألنا عبر واتساب",
    faqs: [
      ["هل توفرون الشتلات للمشاريع الكبيرة؟", "نعم، نوفر خيارات تناسب المشاريع بمختلف أحجامها وفق الاحتياجات والكميات المطلوبة."],
      ["هل تقدمون خدمات تنسيق الحدائق؟", "نعم، نقدم خدمات تنسيق الحدائق وأعمال اللاندسكيب وفق متطلبات المشروع."],
      ["كيف يمكنني الحصول على عرض سعر؟", "املأ نموذج طلب عرض السعر في أقل من دقيقتين، وسيصلنا طلبك عبر واتساب بكل التفاصيل. ويمكنك أيضاً مراسلتنا مباشرة عبر واتساب."],
      ["هل تتوفر أنواع مختلفة من الشتلات؟", "نوفر خيارات متنوعة من الشتلات والنباتات حسب المتاح واحتياجات المشروع."],
      ["هل توفرون مستلزمات زراعية؟", "نعم، نوفر مجموعة من الأدوات والمستلزمات والمنتجات الزراعية."],
    ],

    locationEyebrow: "موقعنا",
    locationHeading: { pre: "زورونا في ", em: "حقول السلام", br: false },
    locationText: "تصفح موقعنا على الخريطة، واستخدم أزرار التكبير والتصغير للوصول إلينا بسهولة.",
    locationMapTitle: "موقع شركة حقول السلام على الخريطة",
    locationCta: "فتح الموقع في خرائط Google",

    blogEyebrow: "من المدونة",
    blogHeading: { pre: "معرفة تساعدك", em: "على النمو", br: true },

    finalEyebrow: "جاهزون لمساعدتك",
    finalHeading: { pre: "لنبدأ مشروعك", em: "الأخضر", br: true },
    finalText:
      "سواء كنت تحتاج إلى توريد شتلات، أو تنسيق حديقة، أو تنفيذ أعمال لاندسكيب، تواصل مع فريق حقول السلام وأرسل تفاصيل احتياجات مشروعك.",
    finalPhoneLabel: "واتساب",
  },

  en: {
    metaTitle: "Huqool Alsalam | Seedling Supply, Garden Design & Landscaping",
    metaDescription:
      "Huqool Alsalam supplies agricultural seedlings and delivers garden design, landscaping, indoor plants and growing supplies across Riyadh and Saudi Arabia, at the best value for money.",
    keywords: [
      "seedling supply Riyadh", "agricultural seedlings", "garden design Riyadh", "landscaping Saudi Arabia",
      "indoor plants office", "plant nursery Riyadh", "fertilizers and pesticides", "Huqool Alsalam",
    ],
    heroImageAlt: "The Huqool Alsalam nursery, supplying seedlings and garden design",
    twitterTitle: "Huqool Alsalam | Complete Agricultural Solutions",

    heroEyebrow: "Complete agricultural solutions for projects and gardens",
    heroTitle: "The best value for money in seedling supply across the Kingdom",
    heroCopy:
      "We supply a wide range of seedlings, plants and agricultural services at competitive prices, with solutions suited to villas, gardens, farms, and residential and commercial projects.",
    heroServicesLink: "See what we do",
    heroTrust: "Send us your project requirements and we will help you choose the right solution.",
    heroScroll: "Scroll to explore",

    servicesEyebrow: "What we offer",
    servicesHeading: { pre: "Everything your project needs,", em: "in one place", br: true },
    servicesText:
      "A complete range of agricultural products and services, covering the needs of individuals and projects of every size.",
    serviceDetails: "Service details",
    allServicesDetailed: "All services in detail",
    talkToAdvisor: "Talk to an advisor",

    valueEyebrow: "Considered solutions for every requirement",
    valueHeading: { pre: "Better value", em: "for your project", br: true },
    valueText:
      "At Huqool Alsalam we focus on delivering the best possible value: the right products and services, at competitive prices, matched to what your project actually needs.",
    valueCta: "Get a tailored quote",
    stamp: ["It", "starts", "with land"],

    reasonsEyebrow: "Why Huqool Alsalam?",
    reasonsHeading: { pre: "Why our clients", em: "choose us", br: true },
    reasonsAction: "Start a conversation",
    reasons: [
      ["01", "Better value for money", "Solutions and options that fit your needs and your budget.", "value"],
      ["02", "Complete agricultural solutions", "From seedlings and plants to garden design and landscaping.", "leaf"],
      ["03", "Options for every project", "We serve villas, gardens, farms and projects of all kinds.", "projects"],
      ["04", "Attentive to what you need", "We help you choose the solution that suits your project.", "refresh"],
      ["05", "Fast, easy communication", "Direct, quick contact over WhatsApp.", "message"],
      ["06", "Flexible quantities", "Options to suit different needs and projects of every size.", "sliders"],
    ],

    projectsEyebrow: "Our work",
    projectsHeading: { pre: "A look at", em: "what we do", br: true },
    projectsText:
      "A sample of our projects in garden design, landscaping and the supply of plants and seedlings.",
    projects: [
      ["/images/landscape-project-v2.webp", "Supply and design", "Gardens that come alive"],
      ["/images/nursery-hero-v2.webp", "Landscaping", "Spaces worthy of you"],
      ["/images/nursery-care-v2.webp", "Indoor plants", "Nature in every corner"],
    ],
    projectMessage: (title) => `Hello, I would like to see more about your work: ${title}.`,

    processEyebrow: "Clear and straightforward",
    processHeading: { pre: "How to start", em: "with us", br: true },
    processText: "From your first message to receiving your order, we guide you through clear, quick steps.",
    processCta: "Start your quote request",
    steps: [
      ["01", "Send your requirements", "Fill in a short form and your request reaches us on WhatsApp.", "send"],
      ["02", "We review your project", "Our team helps you identify the right options.", "search"],
      ["03", "You receive your quote", "We prepare a quote based on the products or services you need.", "file"],
      ["04", "We begin your order", "We source what you need and keep you updated throughout.", "sparkles"],
    ],

    faqEyebrow: "Your questions, answered",
    faqHeading: { pre: "Frequently asked", em: "questions", br: true },
    faqText: "Did not find your answer? Contact us directly and we will be glad to help.",
    faqAction: "Ask us on WhatsApp",
    faqs: [
      ["Do you supply seedlings for large projects?", "Yes. We provide options for projects of every size, according to the types and quantities required."],
      ["Do you offer garden design services?", "Yes. We design and carry out garden and landscaping work according to the requirements of the project."],
      ["How do I get a quote?", "Fill in the quote form in under two minutes and your request reaches us on WhatsApp with all the details. You can also message us directly on WhatsApp."],
      ["Are different types of seedlings available?", "We offer a varied selection of seedlings and plants, subject to availability and what the project needs."],
      ["Do you supply growing equipment?", "Yes. We stock a range of agricultural tools, supplies and products."],
    ],

    locationEyebrow: "Find us",
    locationHeading: { pre: "Visit us at ", em: "Huqool Alsalam", br: false },
    locationText: "Browse our location on the map, and zoom in or out to find your way to us easily.",
    locationMapTitle: "Huqool Alsalam location on the map",
    locationCta: "Open in Google Maps",

    blogEyebrow: "From the blog",
    blogHeading: { pre: "Knowledge that helps", em: "you grow", br: true },

    finalEyebrow: "Ready to help",
    finalHeading: { pre: "Let us start your", em: "green project", br: true },
    finalText:
      "Whether you need seedlings supplied, a garden designed, or landscaping carried out, get in touch with the Huqool Alsalam team and send us your project details.",
    finalPhoneLabel: "WhatsApp",
  },
};

export const home = (locale) => HOME[locale] || HOME.ar;
