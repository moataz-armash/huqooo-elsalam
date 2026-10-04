// Everything the quote form asks lives in this file. Labels and options can
// be edited or added freely: the form, its validation and the WhatsApp
// message all read from here, so nothing else needs to change.
//
// Field types: "single" (pick one), "multi" (pick several), "text",
// "textarea", "checkbox". `summary` is the short label used in the message.
//
// The schema is built per language by getQuoteSchema(locale). Answers are
// stored as the option labels themselves, so the sentinel values that showIf
// compares against ("another city", "individual") are language-specific and
// have to come from the same schema that produced the options. Building both
// together is what keeps them in step.
import { FlaskConical, House, Mountain, Sprout } from "lucide-react";

const CONTENT = {
  ar: {
    otherCity: "مدينة أخرى",
    noBudget: "أفضّل عدم التحديد",
    individual: "فرد",
    services: [
      {
        id: "plants", title: "شتلات ونباتات", short: "شتلات",
        desc: "أشجار ونخيل وشجيرات وأزهار وعشب", Icon: Sprout,
        fields: [
          { id: "types", label: "ما الأنواع التي تحتاجها؟", summary: "الأنواع", type: "multi", required: true,
            options: ["نخيل", "أشجار ظل وزينة", "أشجار مثمرة", "شجيرات وأسيجة", "أزهار موسمية", "عشب ونجيل", "نباتات متسلقة", "أخرى"] },
          { id: "quantity", label: "الكمية التقريبية", summary: "الكمية", type: "single", required: true,
            hint: "إجمالي عدد الشتلات تقريباً.",
            options: ["أقل من 20", "20 – 100", "100 – 500", "أكثر من 500"] },
          { id: "size", label: "الحجم المفضّل", summary: "الحجم", type: "single",
            options: ["شتلات صغيرة", "متوسطة", "كبيرة وجاهزة", "أحجام مختلفة"] },
          { id: "delivery", label: "طريقة الاستلام", summary: "الاستلام", type: "single", required: true,
            options: ["توصيل للموقع", "توصيل مع الزراعة", "استلام من المشتل"] },
        ],
      },
      {
        id: "landscape", title: "تنسيق حدائق ولاندسكيب", short: "لاندسكيب",
        desc: "تصميم وتنفيذ المساحات الخارجية", Icon: Mountain,
        fields: [
          { id: "siteType", label: "نوع الموقع", summary: "نوع الموقع", type: "single", required: true,
            options: ["فيلا أو منزل", "مجمع سكني", "مبنى تجاري أو مكتبي", "استراحة أو مزرعة", "مشروع عام أو حكومي"] },
          { id: "area", label: "المساحة التقريبية", summary: "المساحة", type: "single", required: true,
            hint: "التقدير يكفي، ونتأكد من المقاسات عند المعاينة.",
            options: ["أقل من 100 م²", "100 – 500 م²", "500 – 2,000 م²", "أكثر من 2,000 م²", "لا أعرف"] },
          { id: "state", label: "حالة الموقع حالياً", summary: "الحالة", type: "single", required: true,
            options: ["أرض فارغة", "حديقة قائمة تحتاج تجديد", "صيانة دورية"] },
          { id: "scope", label: "ما الذي يشمله المشروع؟", summary: "المطلوب", type: "multi",
            options: ["تصميم", "زراعة", "عشب طبيعي", "عشب صناعي", "شبكة ري", "إضاءة", "ممرات ورصف", "جدار أخضر"] },
        ],
      },
      {
        id: "indoor", title: "نباتات داخلية", short: "نباتات داخلية",
        desc: "للمنازل والمكاتب والمنشآت", Icon: House,
        fields: [
          { id: "space", label: "نوع المكان", summary: "المكان", type: "single", required: true,
            options: ["منزل", "مكتب أو شركة", "فندق أو مطعم أو مقهى", "معرض أو متجر"] },
          { id: "count", label: "عدد النباتات التقريبي", summary: "العدد", type: "single", required: true,
            options: ["أقل من 10", "10 – 30", "30 – 100", "أكثر من 100"] },
          { id: "pots", label: "الأصص", summary: "الأصص", type: "single",
            options: ["مع أصص وديكور", "النباتات فقط"] },
          { id: "care", label: "العناية بالنباتات", summary: "العناية", type: "single",
            options: ["توريد وتركيب فقط", "مع عناية دورية"] },
        ],
      },
      {
        id: "supplies", title: "أسمدة ومبيدات وأدوات", short: "مستلزمات زراعية",
        desc: "مستلزمات العناية بالنباتات", Icon: FlaskConical,
        fields: [
          { id: "products", label: "ما المنتجات التي تحتاجها؟", summary: "المنتجات", type: "multi", required: true,
            options: ["أسمدة", "مبيدات", "تربة وبيتموس", "أدوات زراعية", "أخرى"] },
          { id: "use", label: "حجم الطلب", summary: "حجم الطلب", type: "single", required: true,
            options: ["للاستخدام المنزلي", "كميات للمشاريع أو الجملة"] },
          { id: "details", label: "أسماء المنتجات أو وصف المشكلة", summary: "التفاصيل", type: "text",
            placeholder: "مثال: سماد للنخيل، أو اصفرار في أوراق الليمون", maxLength: 120 },
        ],
      },
    ],
    cities: ["الرياض", "جدة", "الدمام والخبر", "مكة المكرمة", "المدينة المنورة", "القصيم"],
    project: {
      customerType: { label: "تطلب بصفتك", summary: "نوع العميل",
        options: ["شركة أو منشأة", "مقاول أو مطوّر عقاري", "صاحب مزرعة", "جهة حكومية"] },
      city: { label: "أين موقع المشروع؟", summary: "المدينة" },
      otherCity: { label: "اسم المدينة", placeholder: "مثال: أبها" },
      district: { label: "الحي", placeholder: "مثال: النرجس" },
      timeline: { label: "متى تحتاجه؟", summary: "الموعد",
        options: [
          { label: "عاجل — خلال أسبوع", short: "عاجل" },
          { label: "خلال شهر", short: "خلال شهر" },
          { label: "خلال 1 – 3 أشهر", short: "1 – 3 أشهر" },
          { label: "لاحقاً — أستفسر عن الأسعار", short: "استفسار أسعار" },
        ] },
      budget: { label: "الميزانية التقريبية", summary: "الميزانية",
        hint: "تساعدنا على اقتراح الخيار الأنسب لميزانيتك.",
        options: ["أقل من 5,000 ريال", "5,000 – 20,000 ريال", "20,000 – 100,000 ريال", "أكثر من 100,000 ريال"] },
    },
    contact: {
      name: { label: "الاسم", placeholder: "اسمك الكريم" },
      company: { label: "اسم الشركة أو الجهة" },
      notes: { label: "ملاحظات إضافية", placeholder: "أي تفاصيل تساعدنا: أنواع محددة، مقاسات، موعد التسليم…" },
      hasFiles: { label: "لدي صور للموقع أو مخطط أو جدول كميات، وسأرسلها في المحادثة" },
    },
    steps: [
      { id: "service", label: "الخدمة", title: "ماذا تحتاج؟", intro: "اختر خدمة أو أكثر، ثم نكمل بأسئلة سريعة." },
      { id: "details", label: "التفاصيل", title: "تفاصيل طلبك", intro: "اختيارات سريعة تساعدنا على تجهيز عرض دقيق." },
      { id: "project", label: "المشروع", title: "عن مشروعك", intro: "الموقع والتوقيت يحددان تكلفة التوصيل والتنفيذ." },
      { id: "contact", label: "الإرسال", title: "راجع وأرسل", intro: "آخر خطوة، وسيُفتح واتساب برسالة جاهزة تراجعها قبل الإرسال." },
    ],
    errors: {
      multi: "اختر خياراً واحداً على الأقل",
      single: "اختر إجابة للمتابعة",
      text: "هذا الحقل مطلوب",
      services: "اختر خدمة واحدة على الأقل",
      minLength: (label, n) => `اكتب ${label} (${n} أحرف على الأقل)`,
    },
    message: {
      opening: "السلام عليكم، أرغب في عرض سعر.",
      requestId: "رقم الطلب:",
      customer: "بيانات العميل",
      name: "الاسم",
      organisation: "الجهة",
      customerType: "نوع العميل",
      location: "الموقع",
      timingBudget: "التوقيت والميزانية",
      when: "الموعد",
      budget: "الميزانية",
      notes: "ملاحظات",
      files: "📎 لدي صور أو مخطط أو جدول كميات، سأرسلها في هذه المحادثة.",
      districtPrefix: "حي ",
      districtStrip: /^حي\s+/,
      separator: "، ",
    },
    form: {
      stepCount: (i, n) => `الخطوة ${i} من ${n}`,
      stepsAria: "خطوات الطلب",
      backTo: (title) => `العودة إلى: ${title}`,
      restart: "ابدأ من جديد",
      restartConfirm: "هل تريد مسح إجاباتك والبدء من جديد؟",
      servicesLegend: "الخدمات المطلوبة",
      optional: "اختياري",
      previous: "السابق",
      next: "التالي",
      send: "أرسل الطلب عبر واتساب",
      phoneNote: "يصلنا رقمك تلقائياً مع رسالة واتساب، فلا حاجة لكتابته.",
      previewToggle: "معاينة الرسالة قبل الإرسال",
      previewTitle: "معاينة رسالتك",
      previewSub: "هذا ما يصلنا عبر واتساب",
      previewAria: "معاينة الطلب",
      sentTitle: "تم تجهيز طلبك",
      sentText: "أكمل الإرسال من واتساب بالضغط على زر الإرسال هناك، وسيراجع فريقنا طلبك ويرد عليك بعرض السعر.",
      sentId: "رقم طلبك",
      sentReopen: "لم يُفتح واتساب؟ افتحه من هنا",
      sentAgain: "إرسال طلب جديد",
      assurances: [
        "عرض سعر مجاني وبدون أي التزام",
        "تراجع الرسالة في واتساب قبل إرسالها",
        "يصلنا رقمك تلقائياً مع الرسالة",
      ],
      directPrompt: "تفضّل الحديث مباشرة؟",
      directCta: "راسلنا على واتساب",
    },
  },

  en: {
    otherCity: "Another city",
    noBudget: "I would rather not say",
    individual: "Individual",
    services: [
      {
        id: "plants", title: "Seedlings and plants", short: "Seedlings",
        desc: "Trees, palms, shrubs, flowers and turf", Icon: Sprout,
        fields: [
          { id: "types", label: "Which types do you need?", summary: "Types", type: "multi", required: true,
            options: ["Palms", "Shade and ornamental trees", "Fruit trees", "Shrubs and hedging", "Seasonal flowers", "Turf and lawn grass", "Climbing plants", "Other"] },
          { id: "quantity", label: "Approximate quantity", summary: "Quantity", type: "single", required: true,
            hint: "Roughly how many seedlings in total.",
            options: ["Fewer than 20", "20 – 100", "100 – 500", "More than 500"] },
          { id: "size", label: "Preferred size", summary: "Size", type: "single",
            options: ["Small seedlings", "Medium", "Large and established", "A mix of sizes"] },
          { id: "delivery", label: "How would you like to receive them?", summary: "Delivery", type: "single", required: true,
            options: ["Delivery to site", "Delivery with planting", "Collection from the nursery"] },
        ],
      },
      {
        id: "landscape", title: "Garden design and landscaping", short: "Landscaping",
        desc: "Designing and building outdoor spaces", Icon: Mountain,
        fields: [
          { id: "siteType", label: "Type of site", summary: "Site type", type: "single", required: true,
            options: ["Villa or house", "Residential compound", "Commercial or office building", "Rest house or farm", "Public or government project"] },
          { id: "area", label: "Approximate area", summary: "Area", type: "single", required: true,
            hint: "An estimate is fine; we confirm measurements on site.",
            options: ["Under 100 m²", "100 – 500 m²", "500 – 2,000 m²", "Over 2,000 m²", "Not sure"] },
          { id: "state", label: "Current state of the site", summary: "Site state", type: "single", required: true,
            options: ["Bare ground", "Existing garden needing renewal", "Ongoing maintenance"] },
          { id: "scope", label: "What does the project involve?", summary: "Scope", type: "multi",
            options: ["Design", "Planting", "Natural turf", "Artificial turf", "Irrigation system", "Lighting", "Pathways and paving", "Green wall"] },
        ],
      },
      {
        id: "indoor", title: "Indoor plants", short: "Indoor plants",
        desc: "For homes, offices and institutions", Icon: House,
        fields: [
          { id: "space", label: "Type of space", summary: "Space", type: "single", required: true,
            options: ["Home", "Office or company", "Hotel, restaurant or cafe", "Showroom or shop"] },
          { id: "count", label: "Approximate number of plants", summary: "Number", type: "single", required: true,
            options: ["Fewer than 10", "10 – 30", "30 – 100", "More than 100"] },
          { id: "pots", label: "Pots", summary: "Pots", type: "single",
            options: ["With pots and finish", "Plants only"] },
          { id: "care", label: "Plant care", summary: "Care", type: "single",
            options: ["Supply and install only", "With ongoing care"] },
        ],
      },
      {
        id: "supplies", title: "Fertilizers, pesticides and tools", short: "Growing supplies",
        desc: "Supplies for looking after plants", Icon: FlaskConical,
        fields: [
          { id: "products", label: "Which products do you need?", summary: "Products", type: "multi", required: true,
            options: ["Fertilizers", "Pesticides", "Soil and peat moss", "Garden tools", "Other"] },
          { id: "use", label: "Order size", summary: "Order size", type: "single", required: true,
            options: ["For home use", "Project or wholesale quantities"] },
          { id: "details", label: "Product names, or describe the problem", summary: "Details", type: "text",
            placeholder: "For example: fertilizer for palms, or yellowing lemon leaves", maxLength: 120 },
        ],
      },
    ],
    cities: ["Riyadh", "Jeddah", "Dammam and Khobar", "Makkah", "Madinah", "Qassim"],
    project: {
      customerType: { label: "You are enquiring as", summary: "Customer type",
        options: ["A company or institution", "A contractor or developer", "A farm owner", "A government body"] },
      city: { label: "Where is the project?", summary: "City" },
      otherCity: { label: "City name", placeholder: "For example: Abha" },
      district: { label: "District", placeholder: "For example: Al Narjis" },
      timeline: { label: "When do you need it?", summary: "Timing",
        options: [
          { label: "Urgent — within a week", short: "Urgent" },
          { label: "Within a month", short: "Within a month" },
          { label: "Within 1 – 3 months", short: "1 – 3 months" },
          { label: "Later — just asking about prices", short: "Price enquiry" },
        ] },
      budget: { label: "Approximate budget", summary: "Budget",
        hint: "It helps us suggest the option that fits what you want to spend.",
        options: ["Under SAR 5,000", "SAR 5,000 – 20,000", "SAR 20,000 – 100,000", "Over SAR 100,000"] },
    },
    contact: {
      name: { label: "Name", placeholder: "Your name" },
      company: { label: "Company or organisation name" },
      notes: { label: "Anything else", placeholder: "Anything that helps us: specific types, measurements, a deadline…" },
      hasFiles: { label: "I have photos of the site, a drawing or a bill of quantities, and will send them in the chat" },
    },
    steps: [
      { id: "service", label: "Service", title: "What do you need?", intro: "Choose one service or more, then a few quick questions." },
      { id: "details", label: "Details", title: "About your request", intro: "Quick choices that help us prepare an accurate quote." },
      { id: "project", label: "Project", title: "About your project", intro: "Location and timing determine delivery and installation costs." },
      { id: "contact", label: "Send", title: "Review and send", intro: "Last step. WhatsApp opens with a ready message for you to check before sending." },
    ],
    errors: {
      multi: "Choose at least one option",
      single: "Choose an answer to continue",
      text: "This field is required",
      services: "Choose at least one service",
      minLength: (label, n) => `Enter your ${String(label).toLowerCase()} (at least ${n} characters)`,
    },
    message: {
      opening: "Hello, I would like a quote.",
      requestId: "Request no:",
      customer: "Customer details",
      name: "Name",
      organisation: "Organisation",
      customerType: "Customer type",
      location: "Location",
      timingBudget: "Timing and budget",
      when: "Timing",
      budget: "Budget",
      notes: "Notes",
      files: "📎 I have photos, a drawing or a bill of quantities and will send them in this chat.",
      districtPrefix: "",
      districtStrip: /^district\s+/i,
      separator: ", ",
    },
    form: {
      stepCount: (i, n) => `Step ${i} of ${n}`,
      stepsAria: "Request steps",
      backTo: (title) => `Back to: ${title}`,
      restart: "Start over",
      restartConfirm: "Clear your answers and start over?",
      servicesLegend: "Services required",
      optional: "optional",
      previous: "Back",
      next: "Next",
      send: "Send on WhatsApp",
      phoneNote: "Your number reaches us automatically with the WhatsApp message, so there is no need to type it.",
      previewToggle: "Preview the message before sending",
      previewTitle: "Preview your message",
      previewSub: "This is what reaches us on WhatsApp",
      previewAria: "Request preview",
      sentTitle: "Your request is ready",
      sentText: "Finish sending from WhatsApp by pressing send there. Our team will review your request and come back with a quote.",
      sentId: "Your request number",
      sentReopen: "WhatsApp did not open? Open it here",
      sentAgain: "Send another request",
      assurances: [
        "A free quote with no obligation",
        "You review the message in WhatsApp before sending",
        "Your number reaches us automatically with the message",
      ],
      directPrompt: "Prefer to talk directly?",
      directCta: "Message us on WhatsApp",
    },
  },
};

// Builds the full question schema for one language. Everything downstream -
// validation, the WhatsApp message, the form chrome - reads from the object
// this returns, so there is never a mix of two languages in one request.
export function getQuoteSchema(locale) {
  const c = CONTENT[locale] || CONTENT.ar;
  const OTHER_CITY = c.otherCity;
  const INDIVIDUAL = c.individual;
  const NO_BUDGET = c.noBudget;

  const PROJECT_FIELDS = [
    { id: "customerType", label: c.project.customerType.label, summary: c.project.customerType.summary,
      type: "single", required: true, options: [INDIVIDUAL, ...c.project.customerType.options] },
    { id: "city", label: c.project.city.label, summary: c.project.city.summary,
      type: "single", required: true, options: [...c.cities, OTHER_CITY] },
    { id: "otherCity", label: c.project.otherCity.label, type: "text", required: true,
      placeholder: c.project.otherCity.placeholder, maxLength: 40,
      showIf: (a) => a["project.city"] === OTHER_CITY },
    { id: "district", label: c.project.district.label, type: "text",
      placeholder: c.project.district.placeholder, maxLength: 40,
      showIf: (a) => Boolean(a["project.city"]) && a["project.city"] !== OTHER_CITY },
    { id: "timeline", label: c.project.timeline.label, summary: c.project.timeline.summary,
      type: "single", required: true, options: c.project.timeline.options },
    { id: "budget", label: c.project.budget.label, summary: c.project.budget.summary,
      type: "single", hint: c.project.budget.hint, options: [...c.project.budget.options, NO_BUDGET] },
  ];

  const CONTACT_FIELDS = [
    { id: "name", label: c.contact.name.label, type: "text", required: true, minLength: 2, maxLength: 60,
      placeholder: c.contact.name.placeholder, autoComplete: "name" },
    { id: "company", label: c.contact.company.label, type: "text", maxLength: 80, autoComplete: "organization",
      showIf: (a) => Boolean(a["project.customerType"]) && a["project.customerType"] !== INDIVIDUAL },
    { id: "notes", label: c.contact.notes.label, type: "textarea", maxLength: 400,
      placeholder: c.contact.notes.placeholder },
    { id: "hasFiles", label: c.contact.hasFiles.label, type: "checkbox" },
  ];

  return {
    locale,
    SERVICES: c.services,
    PROJECT_FIELDS,
    CONTACT_FIELDS,
    STEPS: c.steps,
    OTHER_CITY,
    INDIVIDUAL,
    NO_BUDGET,
    errors: c.errors,
    message: c.message,
    form: c.form,
  };
}

export const option = (opt) => (typeof opt === "string" ? { label: opt } : opt);
export const isVisible = (field, answers) => !field.showIf || field.showIf(answers);

const isEmpty = (v) => v == null || (Array.isArray(v) ? v.length === 0 : String(v).trim() === "");
const clean = (v) => String(v ?? "").replace(/[*_~`]/g, "").trim();

// Returns { "scope.field": "message" } for every required field left empty.
export function fieldErrors(schema, fields, scope, answers) {
  const errors = {};
  for (const field of fields) {
    if (!isVisible(field, answers)) continue;
    const key = `${scope}.${field.id}`;
    const value = answers[key];
    if (field.required && isEmpty(value)) {
      errors[key] = schema.errors[field.type] || schema.errors.text;
    } else if (field.minLength && clean(value).length < field.minLength) {
      errors[key] = schema.errors.minLength(field.label, field.minLength);
    }
  }
  return errors;
}

export function stepErrors(schema, stepId, services, answers) {
  if (stepId === "service") return services.length ? {} : { services: schema.errors.services };
  if (stepId === "details") {
    return schema.SERVICES.filter((s) => services.includes(s.id))
      .reduce((all, s) => ({ ...all, ...fieldErrors(schema, s.fields, s.id, answers) }), {});
  }
  if (stepId === "project") return fieldErrors(schema, schema.PROJECT_FIELDS, "project", answers);
  return fieldErrors(schema, schema.CONTACT_FIELDS, "contact", answers);
}

// The WhatsApp message. The first two lines are what shows in the chat list
// and the notification, so they carry the triage summary: what, where, when.
//
// The message is written in the language the customer used, so an English
// enquiry arrives in English. That is deliberate - replying in the language
// someone wrote in matters more than keeping every message uniform.
export function buildMessage(schema, { services, answers, requestId }) {
  const m = schema.message;
  const get = (key) => answers[key];
  const chosen = schema.SERVICES.filter((s) => services.includes(s.id));
  const city = get("project.city") === schema.OTHER_CITY ? clean(get("project.otherCity")) : get("project.city");
  const district = clean(get("project.district")).replace(m.districtStrip, "");
  const timeline = schema.PROJECT_FIELDS.find((f) => f.id === "timeline").options.map(option)
    .find((o) => o.label === get("project.timeline"));
  const budget = get("project.budget");
  const customerType = get("project.customerType");

  const row = (label, value) => {
    const text = Array.isArray(value) ? value.join(m.separator) : clean(value);
    return text ? `- ${label}: ${text}` : null;
  };
  const lines = [m.opening];
  // A section is only written once it has at least one answer, so the live
  // preview never shows an empty heading.
  const section = (title, rows) => {
    const filled = rows.filter(Boolean);
    if (filled.length) lines.push("", `*${title}*`, ...filled);
  };

  const summary = [chosen.map((s) => s.short).join(" + "), city, timeline?.short].filter(Boolean).join(" · ");
  if (summary) lines.push(`*${summary}*`);
  if (requestId) lines.push("", `*${m.requestId}* ${requestId}`);

  section(m.customer, [
    row(m.name, get("contact.name")),
    customerType && customerType !== schema.INDIVIDUAL ? row(m.organisation, get("contact.company")) : null,
    row(m.customerType, customerType),
    row(m.location, [city, district && `${m.districtPrefix}${district}`].filter(Boolean).join(m.separator)),
  ]);
  for (const service of chosen) {
    section(service.title, service.fields.map((field) => row(field.summary, get(`${service.id}.${field.id}`))));
  }
  section(m.timingBudget, [
    row(m.when, timeline?.label),
    budget !== schema.NO_BUDGET ? row(m.budget, budget) : null,
  ]);

  const notes = clean(get("contact.notes"));
  if (notes) lines.push("", `*${m.notes}*`, notes);
  if (get("contact.hasFiles")) lines.push("", m.files);

  return lines.join("\n");
}

export function makeRequestId(date = new Date()) {
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  return `HS-${mm}${dd}-${Math.floor(1000 + Math.random() * 9000)}`;
}
