// Everything the quote form asks lives in this file. Labels and options can
// be edited or added freely: the form, its validation and the WhatsApp
// message all read from here, so nothing else needs to change.
//
// Field types: "single" (pick one), "multi" (pick several), "text",
// "textarea", "checkbox". `summary` is the short label used in the message.
import { FlaskConical, House, Mountain, Sprout } from "lucide-react";

export const OTHER_CITY = "مدينة أخرى";
export const NO_BUDGET = "أفضّل عدم التحديد";
export const INDIVIDUAL = "فرد";

export const SERVICES = [
  {
    id: "plants",
    title: "شتلات ونباتات",
    short: "شتلات",
    desc: "أشجار ونخيل وشجيرات وأزهار وعشب",
    Icon: Sprout,
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
    id: "landscape",
    title: "تنسيق حدائق ولاندسكيب",
    short: "لاندسكيب",
    desc: "تصميم وتنفيذ المساحات الخارجية",
    Icon: Mountain,
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
    id: "indoor",
    title: "نباتات داخلية",
    short: "نباتات داخلية",
    desc: "للمنازل والمكاتب والمنشآت",
    Icon: House,
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
    id: "supplies",
    title: "أسمدة ومبيدات وأدوات",
    short: "مستلزمات زراعية",
    desc: "مستلزمات العناية بالنباتات",
    Icon: FlaskConical,
    fields: [
      { id: "products", label: "ما المنتجات التي تحتاجها؟", summary: "المنتجات", type: "multi", required: true,
        options: ["أسمدة", "مبيدات", "تربة وبيتموس", "أدوات زراعية", "أخرى"] },
      { id: "use", label: "حجم الطلب", summary: "حجم الطلب", type: "single", required: true,
        options: ["للاستخدام المنزلي", "كميات للمشاريع أو الجملة"] },
      { id: "details", label: "أسماء المنتجات أو وصف المشكلة", summary: "التفاصيل", type: "text",
        placeholder: "مثال: سماد للنخيل، أو اصفرار في أوراق الليمون", maxLength: 120 },
    ],
  },
];

export const PROJECT_FIELDS = [
  { id: "customerType", label: "تطلب بصفتك", summary: "نوع العميل", type: "single", required: true,
    options: [INDIVIDUAL, "شركة أو منشأة", "مقاول أو مطوّر عقاري", "صاحب مزرعة", "جهة حكومية"] },
  { id: "city", label: "أين موقع المشروع؟", summary: "المدينة", type: "single", required: true,
    options: ["الرياض", "جدة", "الدمام والخبر", "مكة المكرمة", "المدينة المنورة", "القصيم", OTHER_CITY] },
  { id: "otherCity", label: "اسم المدينة", type: "text", required: true, placeholder: "مثال: أبها", maxLength: 40,
    showIf: (a) => a["project.city"] === OTHER_CITY },
  { id: "district", label: "الحي", type: "text", placeholder: "مثال: النرجس", maxLength: 40,
    showIf: (a) => Boolean(a["project.city"]) && a["project.city"] !== OTHER_CITY },
  { id: "timeline", label: "متى تحتاجه؟", summary: "الموعد", type: "single", required: true,
    options: [
      { label: "عاجل — خلال أسبوع", short: "عاجل" },
      { label: "خلال شهر", short: "خلال شهر" },
      { label: "خلال 1 – 3 أشهر", short: "1 – 3 أشهر" },
      { label: "لاحقاً — أستفسر عن الأسعار", short: "استفسار أسعار" },
    ] },
  { id: "budget", label: "الميزانية التقريبية", summary: "الميزانية", type: "single",
    hint: "تساعدنا على اقتراح الخيار الأنسب لميزانيتك.",
    options: ["أقل من 5,000 ريال", "5,000 – 20,000 ريال", "20,000 – 100,000 ريال", "أكثر من 100,000 ريال", NO_BUDGET] },
];

export const CONTACT_FIELDS = [
  { id: "name", label: "الاسم", type: "text", required: true, minLength: 2, maxLength: 60,
    placeholder: "اسمك الكريم", autoComplete: "name" },
  { id: "company", label: "اسم الشركة أو الجهة", type: "text", maxLength: 80, autoComplete: "organization",
    showIf: (a) => Boolean(a["project.customerType"]) && a["project.customerType"] !== INDIVIDUAL },
  { id: "notes", label: "ملاحظات إضافية", type: "textarea", maxLength: 400,
    placeholder: "أي تفاصيل تساعدنا: أنواع محددة، مقاسات، موعد التسليم…" },
  { id: "hasFiles", label: "لدي صور للموقع أو مخطط أو جدول كميات، وسأرسلها في المحادثة", type: "checkbox" },
];

export const STEPS = [
  { id: "service", label: "الخدمة", title: "ماذا تحتاج؟", intro: "اختر خدمة أو أكثر، ثم نكمل بأسئلة سريعة." },
  { id: "details", label: "التفاصيل", title: "تفاصيل طلبك", intro: "اختيارات سريعة تساعدنا على تجهيز عرض دقيق." },
  { id: "project", label: "المشروع", title: "عن مشروعك", intro: "الموقع والتوقيت يحددان تكلفة التوصيل والتنفيذ." },
  { id: "contact", label: "الإرسال", title: "راجع وأرسل", intro: "آخر خطوة، وسيُفتح واتساب برسالة جاهزة تراجعها قبل الإرسال." },
];

export const option = (opt) => (typeof opt === "string" ? { label: opt } : opt);
export const isVisible = (field, answers) => !field.showIf || field.showIf(answers);

const isEmpty = (v) => v == null || (Array.isArray(v) ? v.length === 0 : String(v).trim() === "");
const clean = (v) => String(v ?? "").replace(/[*_~`]/g, "").trim();

// Returns { "scope.field": "message" } for every required field left empty.
export function fieldErrors(fields, scope, answers) {
  const errors = {};
  for (const field of fields) {
    if (!isVisible(field, answers)) continue;
    const key = `${scope}.${field.id}`;
    const value = answers[key];
    if (field.required && isEmpty(value)) {
      errors[key] = field.type === "multi" ? "اختر خياراً واحداً على الأقل" :
        field.type === "single" ? "اختر إجابة للمتابعة" : "هذا الحقل مطلوب";
    } else if (field.minLength && clean(value).length < field.minLength) {
      errors[key] = `اكتب ${field.label} (${field.minLength} أحرف على الأقل)`;
    }
  }
  return errors;
}

export function stepErrors(stepId, services, answers) {
  if (stepId === "service") return services.length ? {} : { services: "اختر خدمة واحدة على الأقل" };
  if (stepId === "details") {
    return SERVICES.filter((s) => services.includes(s.id))
      .reduce((all, s) => ({ ...all, ...fieldErrors(s.fields, s.id, answers) }), {});
  }
  if (stepId === "project") return fieldErrors(PROJECT_FIELDS, "project", answers);
  return fieldErrors(CONTACT_FIELDS, "contact", answers);
}

// The WhatsApp message. The first two lines are what shows in the chat list
// and the notification, so they carry the triage summary: what, where, when.
export function buildMessage({ services, answers, requestId }) {
  const get = (key) => answers[key];
  const chosen = SERVICES.filter((s) => services.includes(s.id));
  const city = get("project.city") === OTHER_CITY ? clean(get("project.otherCity")) : get("project.city");
  const district = clean(get("project.district")).replace(/^حي\s+/, "");
  const timeline = PROJECT_FIELDS.find((f) => f.id === "timeline").options.map(option)
    .find((o) => o.label === get("project.timeline"));
  const budget = get("project.budget");
  const customerType = get("project.customerType");

  const row = (label, value) => {
    const text = Array.isArray(value) ? value.join("، ") : clean(value);
    return text ? `- ${label}: ${text}` : null;
  };
  const lines = ["السلام عليكم، أرغب في عرض سعر."];
  // A section is only written once it has at least one answer, so the live
  // preview never shows an empty heading.
  const section = (title, rows) => {
    const filled = rows.filter(Boolean);
    if (filled.length) lines.push("", `*${title}*`, ...filled);
  };

  const summary = [chosen.map((s) => s.short).join(" + "), city, timeline?.short].filter(Boolean).join(" · ");
  if (summary) lines.push(`*${summary}*`);
  if (requestId) lines.push("", `*رقم الطلب:* ${requestId}`);

  section("بيانات العميل", [
    row("الاسم", get("contact.name")),
    customerType && customerType !== INDIVIDUAL ? row("الجهة", get("contact.company")) : null,
    row("نوع العميل", customerType),
    row("الموقع", [city, district && `حي ${district}`].filter(Boolean).join("، ")),
  ]);
  for (const service of chosen) {
    section(service.title, service.fields.map((field) => row(field.summary, get(`${service.id}.${field.id}`))));
  }
  section("التوقيت والميزانية", [
    row("الموعد", timeline?.label),
    budget !== NO_BUDGET ? row("الميزانية", budget) : null,
  ]);

  const notes = clean(get("contact.notes"));
  if (notes) lines.push("", "*ملاحظات*", notes);
  if (get("contact.hasFiles")) lines.push("", "📎 لدي صور أو مخطط أو جدول كميات، سأرسلها في هذه المحادثة.");

  return lines.join("\n");
}

export function makeRequestId(date = new Date()) {
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  return `HS-${mm}${dd}-${Math.floor(1000 + Math.random() * 9000)}`;
}
