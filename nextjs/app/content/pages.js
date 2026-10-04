// Copy for the services index, the service detail chrome, the quote page and
// the blog index. Page-specific wording only; anything shared lives in ui.js.
export const PAGES = {
  ar: {
    servicesIndex: {
      title: "خدماتنا",
      metaTitle: "خدماتنا الزراعية",
      description:
        "خدمات حقول السلام الزراعية: توريد الشتلات، تنسيق الحدائق، أعمال اللاندسكيب، النباتات الداخلية، الأسمدة والمبيدات، والأدوات الزراعية. اطلب عرض سعر عبر واتساب.",
      eyebrow: "ما نقدمه لك",
      heading: { pre: "كل ما يحتاجه مشروعك", em: "الزراعي في مكان واحد", br: true },
      intro: "ستة مجالات تغطي احتياجات الأفراد والمشاريع، من الشتلة الأولى حتى صيانة المساحة الخضراء.",
      imageAlt: "مشتل حقول السلام",
      ctaTitle: "لست متأكداً أي خدمة تناسبك؟",
      ctaText: "أرسل تفاصيل مشروعك ويساعدك فريقنا على تحديد الخيار المناسب، مع عرض سعر واضح وبدون التزام.",
    },
    service: {
      eyebrow: "من خدماتنا",
      quoteForService: "اطلب عرض سعر لهذه الخدمة",
      whatItIncludes: "ما تشمله الخدمة",
      whoFor: "لمن هذه الخدمة؟",
      faqEyebrow: "أسئلة شائعة",
      faqAbout: (title) => `عن ${title}`,
      faqText: "لم تجد إجابة سؤالك؟ أرسل تفاصيل طلبك وسنوضّح لك كل ما تحتاجه قبل أي التزام.",
      otherEyebrow: "خدمات أخرى",
      otherTitle: "قد تحتاج أيضاً",
      allServices: "كل الخدمات",
      ctaTitle: (title) => `جاهز للبدء في ${title}؟`,
      ctaText: "أرسل تفاصيل مشروعك في أقل من دقيقتين، ويصلك عرض سعر يناسب احتياجك وميزانيتك.",
      whatsapp: (title) => `السلام عليكم، أرغب في الاستفسار عن خدمة ${title}.`,
    },
    quote: {
      title: "طلب عرض سعر",
      description:
        "أرسل تفاصيل طلبك في أقل من دقيقتين واحصل على عرض سعر لتوريد الشتلات وتنسيق الحدائق والنباتات الداخلية والمستلزمات الزراعية عبر واتساب.",
      eyebrow: "عرض سعر مجاني وبدون التزام",
      heading: { pre: "اطلب عرض سعر", em: "في أقل من دقيقتين", br: true },
      intro: "أجب عن أسئلة سريعة، وستصلنا تفاصيل طلبك عبر واتساب ليجهّز فريقنا عرضاً يناسب مشروعك وميزانيتك.",
      points: ["4 خطوات سريعة", "بدون أي التزام", "رد مباشر عبر واتساب"],
      imageAlt: "مشتل حقول السلام",
      whatsapp: "السلام عليكم، أرغب في الاستفسار عن خدمات ومنتجات حقول السلام.",
    },
    blog: {
      title: "المدونة",
      description:
        "مقالات ونصائح من حقول السلام عن العناية بالنباتات، اختيار الشتلات المناسبة، تنسيق الحدائق، وأعمال اللاندسكيب في المملكة العربية السعودية.",
      eyebrow: "من المدونة",
      heading: { pre: "معرفة تساعدك", em: "على النمو", br: true },
      imageAlt: "مشتل حقول السلام",
    },
  },

  en: {
    servicesIndex: {
      title: "Services",
      metaTitle: "Our Agricultural Services",
      description:
        "Huqool Alsalam's agricultural services: seedling supply, garden design, landscaping, indoor plants, fertilizers and pesticides, and garden tools. Request a quote on WhatsApp.",
      eyebrow: "What we offer",
      heading: { pre: "Everything your project needs,", em: "in one place", br: true },
      intro: "Six areas covering the needs of individuals and projects, from the first seedling to maintaining the finished green space.",
      imageAlt: "The Huqool Alsalam nursery",
      ctaTitle: "Not sure which service you need?",
      ctaText: "Send us your project details and our team will help you work out the right option, with a clear quote and no obligation.",
    },
    service: {
      eyebrow: "Our services",
      quoteForService: "Get a quote for this service",
      whatItIncludes: "What the service includes",
      whoFor: "Who is it for?",
      faqEyebrow: "Common questions",
      faqAbout: (title) => `About ${String(title).toLowerCase()}`,
      faqText: "Did not find your answer? Send us your details and we will explain everything you need to know before any commitment.",
      otherEyebrow: "Other services",
      otherTitle: "You may also need",
      allServices: "All services",
      ctaTitle: (title) => `Ready to start with ${String(title).toLowerCase()}?`,
      ctaText: "Send us your project details in under two minutes and get a quote that fits your needs and your budget.",
      whatsapp: (title) => `Hello, I would like to ask about your ${String(title).toLowerCase()} service.`,
    },
    quote: {
      title: "Request a quote",
      description:
        "Send us your details in under two minutes and get a quote for seedling supply, garden design, indoor plants and growing supplies over WhatsApp.",
      eyebrow: "A free quote, with no obligation",
      heading: { pre: "Get a quote in", em: "under two minutes", br: true },
      intro: "Answer a few quick questions and your details reach us on WhatsApp, so our team can prepare a quote that fits your project and budget.",
      points: ["4 quick steps", "No obligation", "A direct reply on WhatsApp"],
      imageAlt: "The Huqool Alsalam nursery",
      whatsapp: "Hello, I would like to ask about Huqool Alsalam's products and services.",
    },
    blog: {
      title: "Blog",
      description:
        "Articles and advice from Huqool Alsalam on caring for plants, choosing the right seedlings, garden design and landscaping across Saudi Arabia.",
      eyebrow: "From the blog",
      heading: { pre: "Knowledge that helps", em: "you grow", br: true },
      imageAlt: "The Huqool Alsalam nursery",
    },
  },
};

export const pages = (locale) => PAGES[locale] || PAGES.ar;
