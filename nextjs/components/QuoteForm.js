"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Check, CircleCheck, MessageCircle, RotateCcw, ShieldCheck } from "lucide-react";
import { whatsappLink } from "@/app/site";
import { config } from "@/app/i18n";
import { ENQUIRY_WHATSAPP } from "@/app/content/ui";
import { buildMessage, getQuoteSchema, isVisible, makeRequestId, option, stepErrors } from "./quoteOptions";

// The draft is keyed per language on purpose. Answers are stored as the option
// labels themselves, so an Arabic draft restored into the English form would
// produce a half-translated request that fails validation against options it
// no longer matches.
const draftKey = (locale) => `hs-quote-draft-v1-${locale}`;
const DRAFT_TTL = 7 * 24 * 60 * 60 * 1000;

export default function QuoteForm({ locale = "ar" }) {
  const schema = useMemo(() => getQuoteSchema(locale), [locale]);
  const { SERVICES, PROJECT_FIELDS, CONTACT_FIELDS, STEPS, form } = schema;
  // In RTL "next" points left and "back" points right; in LTR it is the other
  // way round. The icons follow reading direction, not a fixed side.
  const rtl = config(locale).dir === "rtl";
  const NextIcon = rtl ? ArrowLeft : ArrowRight;
  const BackIcon = rtl ? ArrowRight : ArrowLeft;
  const DRAFT_KEY = draftKey(locale);

  const [step, setStep] = useState(0);
  const [services, setServices] = useState([]);
  const [answers, setAnswers] = useState({});
  const [requestId, setRequestId] = useState("");
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);
  const [ready, setReady] = useState(false);
  const cardRef = useRef(null);
  const headingRef = useRef(null);
  const initialised = useRef(false);

  // Restore an unfinished draft, then apply a ?service= preselection from the
  // service cards on the home page. Runs after mount so SSR output matches.
  // Guarded to run once: it consumes the URL parameter, so a second run (React
  // Strict Mode re-runs effects in development) would see a clean URL and
  // wipe the preselection.
  useEffect(() => {
    if (initialised.current) return;
    initialised.current = true;
    let draft = null;
    try { draft = JSON.parse(localStorage.getItem(DRAFT_KEY) || "null"); } catch {}
    const fresh = draft && Date.now() - draft.savedAt < DRAFT_TTL;
    let nextServices = fresh ? draft.services || [] : [];
    let nextStep = fresh ? Math.min(draft.step || 0, STEPS.length - 1) : 0;
    if (fresh) setAnswers(draft.answers || {});
    setRequestId((fresh && draft.requestId) || makeRequestId());

    const wanted = new URLSearchParams(window.location.search).get("service");
    if (SERVICES.some((s) => s.id === wanted)) {
      // Only restart at step 1 when the link adds a service the draft doesn't
      // already have, so a refresh mid-form keeps the customer's place.
      if (!nextServices.includes(wanted)) {
        nextServices = [...nextServices, wanted];
        nextStep = 0;
      }
      // Consume the parameter so a later refresh can't re-apply it.
      window.history.replaceState(null, "", window.location.pathname);
    }
    setServices(nextServices);
    setStep(nextStep);
    setReady(true);
  }, [DRAFT_KEY, SERVICES, STEPS.length]);

  useEffect(() => {
    if (!ready || sent) return;
    try {
      localStorage.setItem(DRAFT_KEY, JSON.stringify({ step, services, answers, requestId, savedAt: Date.now() }));
    } catch {}
  }, [DRAFT_KEY, ready, sent, step, services, answers, requestId]);

  const message = useMemo(
    () => buildMessage(schema, { services, answers, requestId }),
    [schema, services, answers, requestId],
  );
  const waUrl = whatsappLink(message);
  const current = STEPS[step];
  const isLast = step === STEPS.length - 1;
  const hasProgress = services.length > 0 || Object.keys(answers).length > 0;

  const smooth = () => (window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth");

  // Move focus to the new step's heading, and bring the card back into view
  // when the user pressed "next" from further down the page.
  const focusStep = () => requestAnimationFrame(() => {
    headingRef.current?.focus({ preventScroll: true });
    const top = cardRef.current?.getBoundingClientRect().top ?? 0;
    if (top < 100) cardRef.current.scrollIntoView({ behavior: smooth(), block: "start" });
  });

  const focusFirstError = (errs) => requestAnimationFrame(() => {
    const el = document.querySelector(`[data-field="${CSS.escape(Object.keys(errs)[0])}"]`);
    el?.scrollIntoView({ behavior: smooth(), block: "center" });
    el?.querySelector("input, textarea")?.focus({ preventScroll: true });
  });

  const goTo = (index) => { setErrors({}); setStep(index); focusStep(); };

  const next = () => {
    const errs = stepErrors(schema, current.id, services, answers);
    if (Object.keys(errs).length) { setErrors(errs); focusFirstError(errs); return; }
    goTo(step + 1);
  };

  const clearError = (key) => setErrors((e) => {
    if (!e[key]) return e;
    const { [key]: _, ...rest } = e;
    return rest;
  });

  const setAnswer = (key, value) => { setAnswers((a) => ({ ...a, [key]: value })); clearError(key); };

  const toggleService = (id) => {
    setServices((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));
    clearError("services");
  };

  // The send control is a real wa.me link, so the site-wide Google Ads
  // listener records the conversion. An invalid attempt calls
  // preventDefault, which that listener respects.
  const onSend = (event) => {
    for (let i = 0; i < STEPS.length; i++) {
      const errs = stepErrors(schema, STEPS[i].id, services, answers);
      if (Object.keys(errs).length) {
        event.preventDefault();
        setErrors(errs);
        setStep(i);
        focusFirstError(errs);
        return;
      }
    }
    setSent(true);
    try { localStorage.removeItem(DRAFT_KEY); } catch {}
    focusStep();
  };

  const reset = () => {
    setServices([]);
    setAnswers({});
    setErrors({});
    setStep(0);
    setSent(false);
    setRequestId(makeRequestId());
    try { localStorage.removeItem(DRAFT_KEY); } catch {}
    focusStep();
  };

  const fieldProps = { answers, errors, onChange: setAnswer, form };

  return (
    <div className="container quote-layout">
      <div className="quote-card" ref={cardRef}>
        {sent ? (
          <div className="quote-sent" role="status">
            <span className="quote-sent-icon"><CircleCheck aria-hidden="true" strokeWidth={1.6} /></span>
            <h2 ref={headingRef} tabIndex={-1}>{form.sentTitle}</h2>
            <p>{form.sentText}</p>
            <p className="quote-sent-id">{form.sentId} <strong dir="ltr">{requestId}</strong></p>
            <div className="quote-sent-actions">
              <a className="button button-outline" href={waUrl} target="_blank" rel="noopener noreferrer" data-no-conversion>
                {form.sentReopen}
              </a>
              <button type="button" className="quote-back" onClick={reset}>{form.sentAgain}</button>
            </div>
          </div>
        ) : (
          <>
            <div className="quote-card-head">
              <ol className="quote-progress" aria-label={form.stepsAria}>
                {STEPS.map((s, i) => {
                  const state = i < step ? "done" : i === step ? "current" : "todo";
                  const inner = (
                    <>
                      <span className="qp-num">{i < step ? <Check aria-hidden="true" /> : i + 1}</span>
                      <span className="qp-label">{s.label}</span>
                    </>
                  );
                  return (
                    <li key={s.id} className={`qp-${state}`} aria-current={state === "current" ? "step" : undefined}>
                      {state === "done"
                        ? <button type="button" onClick={() => goTo(i)} aria-label={form.backTo(s.title)}>{inner}</button>
                        : <span>{inner}</span>}
                    </li>
                  );
                })}
              </ol>
              {hasProgress && (
                <button type="button" className="quote-reset" aria-label={form.restart} title={form.restart}
                  onClick={() => window.confirm(form.restartConfirm) && reset()}>
                  <RotateCcw aria-hidden="true" /><span className="quote-reset-text">{form.restart}</span>
                </button>
              )}
            </div>
            <div className="quote-bar" aria-hidden="true">
              <span style={{ inlineSize: `${((step + 1) / STEPS.length) * 100}%` }} />
            </div>

            <div className="quote-step" key={current.id}>
              <p className="quote-step-count">{form.stepCount(step + 1, STEPS.length)}</p>
              <h2 ref={headingRef} tabIndex={-1}>{current.title}</h2>
              <p className="quote-step-intro">{current.intro}</p>

              {current.id === "service" && (
                <>
                  <fieldset className="service-choices" data-field="services"
                    aria-describedby={errors.services ? "services-err" : undefined}>
                    <legend className="screen-reader-text">{form.servicesLegend}</legend>
                    {SERVICES.map(({ id, title, desc, Icon }) => (
                      <label className="service-choice" key={id}>
                        <input className="choice-input" type="checkbox" checked={services.includes(id)}
                          onChange={() => toggleService(id)} />
                        <span className="service-choice-face">
                          <span className="service-choice-icon"><Icon aria-hidden="true" strokeWidth={1.7} /></span>
                          <span className="service-choice-text"><strong>{title}</strong><small>{desc}</small></span>
                          <span className="service-choice-tick" aria-hidden="true"><Check /></span>
                        </span>
                      </label>
                    ))}
                  </fieldset>
                  {errors.services && <p className="q-error" id="services-err" role="alert">{errors.services}</p>}
                </>
              )}

              {current.id === "details" && SERVICES.filter((s) => services.includes(s.id)).map((s) => (
                <section className="quote-group" key={s.id} aria-labelledby={`group-${s.id}`}>
                  <h3 className="quote-group-title" id={`group-${s.id}`}>
                    <span className="quote-group-icon"><s.Icon aria-hidden="true" strokeWidth={1.7} /></span>{s.title}
                  </h3>
                  <Fields fields={s.fields} scope={s.id} {...fieldProps} />
                </section>
              ))}

              {current.id === "project" && <Fields fields={PROJECT_FIELDS} scope="project" {...fieldProps} />}

              {current.id === "contact" && (
                <>
                  <Fields fields={CONTACT_FIELDS} scope="contact" {...fieldProps} />
                  <p className="quote-phone-note">
                    <ShieldCheck aria-hidden="true" />{form.phoneNote}
                  </p>
                  <details className="quote-preview-inline">
                    <summary>{form.previewToggle}</summary>
                    <WhatsAppPreview message={message} form={form} />
                  </details>
                </>
              )}
            </div>

            <div className="quote-nav">
              {step > 0
                ? <button type="button" className="quote-back" aria-label={form.previous} onClick={() => goTo(step - 1)}><BackIcon aria-hidden="true" /><span className="quote-back-text">{form.previous}</span></button>
                : <span />}
              {isLast ? (
                <a className="button button-gold quote-next" href={waUrl} target="_blank" rel="noopener noreferrer" onClick={onSend}>
                  <MessageCircle aria-hidden="true" />{form.send}
                </a>
              ) : (
                <button type="button" className="button button-gold quote-next" onClick={next}>
                  {form.next}<NextIcon aria-hidden="true" />
                </button>
              )}
            </div>
          </>
        )}
      </div>

      <aside className="quote-aside" aria-label={form.previewAria}>
        <WhatsAppPreview message={message} form={form} />
        <ul className="quote-assurances">
          {form.assurances.map((item) => <li key={item}><Check aria-hidden="true" />{item}</li>)}
        </ul>
        <a className="quote-direct" href={whatsappLink(ENQUIRY_WHATSAPP[locale] || ENQUIRY_WHATSAPP.ar)} target="_blank" rel="noopener noreferrer">
          {form.directPrompt} <strong>{form.directCta}</strong>
        </a>
      </aside>
    </div>
  );
}

function Fields({ fields, scope, answers, errors, onChange, form }) {
  return fields.filter((field) => isVisible(field, answers)).map((field) => {
    const name = `${scope}.${field.id}`;
    const props = { name, field, form, value: answers[name], error: errors[name], onChange: (v) => onChange(name, v) };
    if (field.type === "single" || field.type === "multi") return <ChoiceField key={name} {...props} />;
    if (field.type === "checkbox") return <CheckField key={name} {...props} />;
    return <TextField key={name} {...props} />;
  });
}

function Optional({ field, form }) {
  return field.required ? null : <span className="q-optional">{form.optional}</span>;
}

function ChoiceField({ name, field, form, value, error, onChange }) {
  const multi = field.type === "multi";
  const selected = multi ? value || [] : value || "";
  const errId = `${name}-err`;
  return (
    <fieldset className="q-field" data-field={name} aria-describedby={error ? errId : undefined}>
      <legend className="q-label">{field.label}<Optional field={field} form={form} /></legend>
      {field.hint && <p className="q-hint">{field.hint}</p>}
      <div className="chips">
        {field.options.map(option).map(({ label }) => {
          const checked = multi ? selected.includes(label) : selected === label;
          return (
            <label className="chip" key={label}>
              <input className="choice-input" type={multi ? "checkbox" : "radio"} name={name} value={label}
                checked={checked} aria-invalid={error ? true : undefined}
                onChange={() => onChange(multi ? (checked ? selected.filter((v) => v !== label) : [...selected, label]) : label)}
                // A radio can't be unchecked by clicking it again; allow that
                // for optional questions so a stray tap can be undone.
                onClick={() => { if (!multi && checked && !field.required) onChange(""); }} />
              <span className="chip-face">{multi && <Check className="chip-check" aria-hidden="true" />}{label}</span>
            </label>
          );
        })}
      </div>
      {error && <p className="q-error" id={errId} role="alert">{error}</p>}
    </fieldset>
  );
}

function TextField({ name, field, form, value, error, onChange }) {
  const id = `q-${name.replace(".", "-")}`;
  const errId = `${id}-err`;
  const area = field.type === "textarea";
  const Tag = area ? "textarea" : "input";
  return (
    <div className="q-field" data-field={name}>
      <label className="q-label" htmlFor={id}>{field.label}<Optional field={field} form={form} /></label>
      <Tag id={id} className="q-input" value={value || ""} maxLength={field.maxLength} placeholder={field.placeholder}
        autoComplete={field.autoComplete || "off"} rows={area ? 4 : undefined} type={area ? undefined : "text"}
        aria-invalid={error ? true : undefined} aria-describedby={error ? errId : undefined}
        onChange={(e) => onChange(e.target.value)} />
      {area && field.maxLength && <p className="q-count" aria-hidden="true">{(value || "").length} / {field.maxLength}</p>}
      {error && <p className="q-error" id={errId} role="alert">{error}</p>}
    </div>
  );
}

function CheckField({ name, field, value, onChange }) {
  return (
    <label className="q-check" data-field={name}>
      <input className="choice-input" type="checkbox" checked={Boolean(value)} onChange={(e) => onChange(e.target.checked)} />
      <span className="q-check-box" aria-hidden="true"><Check /></span>
      <span>{field.label}</span>
    </label>
  );
}

function WhatsAppPreview({ message, form }) {
  return (
    <div className="wa-preview">
      <div className="wa-head">
        <span className="wa-avatar"><MessageCircle aria-hidden="true" /></span>
        <span><strong>{form.previewTitle}</strong><small>{form.previewSub}</small></span>
      </div>
      <div className="wa-chat">
        <p className="wa-bubble">{renderWhatsApp(message)}</p>
      </div>
    </div>
  );
}

// Renders WhatsApp's *bold* markup as React nodes (never as HTML).
function renderWhatsApp(text) {
  return text.split("\n").flatMap((line, i) => [
    ...line.split(/(\*[^*\n]+\*)/g).map((part, j) =>
      part.length > 2 && part.startsWith("*") && part.endsWith("*")
        ? <strong key={`${i}-${j}`}>{part.slice(1, -1)}</strong>
        : part),
    "\n",
  ]);
}
