// Chrome shared by every page: navigation, footer, buttons, breadcrumbs and
// the blog's own labels. Page-specific copy lives beside the page it belongs
// to; this file holds only what more than one page uses.
//
// The English is written as English, not translated word for word from the
// Arabic. A literal translation of marketing copy reads like a machine wrote
// it, which costs more trust than having no English at all.

export const UI = {
  ar: {
    brandName: "حقول السلام",
    brandAria: "حقول السلام - الرئيسية",
    logoAlt: "شعار شركة حقول السلام",

    nav: [
      ["/#top", "الرئيسية"],
      ["/#about", "من نحن"],
      ["/services", "خدماتنا"],
      ["/#projects", "مشاريعنا"],
      ["/blog", "المدونة"],
    ],
    navAria: "القائمة الرئيسية",
    openMenu: "فتح القائمة",
    closeMenu: "إغلاق القائمة",
    quoteCta: "اطلب عرض السعر",
    whatsappCta: "راسلنا على واتساب",
    whatsappAria: "تواصل معنا عبر واتساب",
    switchLanguage: "English",
    switchShort: "EN",
    switchLanguageAria: "Switch to English",

    footerIntro: "حقول السلام — حلول متكاملة للشتلات والحدائق والمشاريع الزراعية.",
    quickLinks: "روابط سريعة",
    contactUs: "تواصل معنا",
    quoteLink: "طلب عرض سعر",
    whatsappLabel: "واتساب:",
    mapLink: "موقعنا على الخريطة",
    rights: "جميع الحقوق محفوظة.",
    tagline: "نزرع الثقة، ونصنع الفرق.",
    developedBy: "تم التطوير بواسطة",

    breadcrumbAria: "مسار التنقل",
    home: "الرئيسية",
    services: "خدماتنا",
    blog: "المدونة",

    serviceDetails: "تفاصيل الخدمة",
    readArticle: "اقرأ المقال",
    allArticles: "كل المقالات",
    backToBlog: "العودة إلى المدونة",
    readingTime: (n) => `${n} دقائق قراءة`,
    alsoRead: "اقرأ أيضاً",
    otherArticles: "مقالات أخرى",
    emptyBlogTitle: "مقالات جديدة قريباً",
    emptyBlogHome: "سيظهر هنا أحدث محتوى المدونة بمجرد نشره.",
    emptyBlogText:
      "نجهّز محتوى يساعدك في العناية بنباتاتك وتخطيط مساحتك الخضراء. حتى ذلك الحين، تواصل معنا مباشرة لأي استفسار.",
    requestQuote: "اطلب عرض سعر",
    articleAsideTitle: "هل تحتاج مساعدة في مشروعك؟",
    articleAsideText: "أرسل تفاصيل طلبك في أقل من دقيقتين، ويصلك عرض سعر يناسب احتياجك.",
  },

  en: {
    brandName: "Huqool Alsalam",
    brandAria: "Huqool Alsalam - Home",
    logoAlt: "Huqool Alsalam company logo",

    nav: [
      ["/#top", "Home"],
      ["/#about", "About"],
      ["/services", "Services"],
      ["/#projects", "Our Work"],
      ["/blog", "Blog"],
    ],
    navAria: "Main menu",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    quoteCta: "Get a quote",
    whatsappCta: "Message us on WhatsApp",
    whatsappAria: "Contact us on WhatsApp",
    switchLanguage: "العربية",
    switchShort: "عربي",
    switchLanguageAria: "التبديل إلى العربية",

    footerIntro:
      "Huqool Alsalam — complete solutions for seedlings, gardens and agricultural projects.",
    quickLinks: "Quick links",
    contactUs: "Contact us",
    quoteLink: "Request a quote",
    whatsappLabel: "WhatsApp:",
    mapLink: "Find us on the map",
    rights: "All rights reserved.",
    tagline: "We grow trust, and make the difference.",
    developedBy: "Developed by",

    breadcrumbAria: "Breadcrumb",
    home: "Home",
    services: "Services",
    blog: "Blog",

    serviceDetails: "Service details",
    readArticle: "Read the article",
    allArticles: "All articles",
    backToBlog: "Back to the blog",
    readingTime: (n) => `${n} min read`,
    alsoRead: "Read next",
    otherArticles: "More articles",
    emptyBlogTitle: "New articles coming soon",
    emptyBlogHome: "The latest blog content will appear here as soon as it is published.",
    emptyBlogText:
      "We are preparing content to help you care for your plants and plan your green space. In the meantime, get in touch with any question.",
    requestQuote: "Get a quote",
    articleAsideTitle: "Need help with your project?",
    articleAsideText:
      "Send us your details in under two minutes and get a quote that fits what you need.",
  },
};

export const ui = (locale) => UI[locale] || UI.ar;

// Default WhatsApp opener per language, so an English visitor does not start
// an Arabic conversation they cannot read.
export const DEFAULT_WHATSAPP = {
  ar: "السلام عليكم، أرغب في الاستفسار عن خدمات ومنتجات حقول السلام وطلب عرض سعر.",
  en: "Hello, I would like to ask about Huqool Alsalam's products and services and request a quote.",
};

export const ENQUIRY_WHATSAPP = {
  ar: "السلام عليكم، أرغب في الاستفسار عن خدمات حقول السلام.",
  en: "Hello, I would like to ask about Huqool Alsalam's services.",
};
