"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { Check, CheckCircle2, Loader2, Mail, MessageCircle, Send } from "lucide-react";
import { contactSchema, createContactUrl, type ContactValues } from "@/lib/contact";

const initialValues: ContactValues = { name: "", email: "", phone: "", subject: "", message: "", method: "email" };
type Field = Exclude<keyof ContactValues, "method">;
const fields: { name: Field; label: string; placeholder: string; type?: string; autoComplete?: string; maxLength: number; minLength?: number }[] = [
  { name: "name", label: "Full Name", placeholder: "Your full name", autoComplete: "name", maxLength: 100, minLength: 2 },
  { name: "email", label: "Email Address", placeholder: "you@example.com", type: "email", autoComplete: "email", maxLength: 254 },
  { name: "phone", label: "WhatsApp / Phone Number", placeholder: "+92 331 8213810", type: "tel", autoComplete: "tel", maxLength: 30 },
  { name: "subject", label: "Subject", placeholder: "What would you like to discuss?", maxLength: 120, minLength: 3 },
  { name: "message", label: "Message", placeholder: "Tell me a little about your opportunity, project or question…", maxLength: 2000 },
];

export default function ContactForm() {
  const [values, setValues] = useState(initialValues);
  const [touched, setTouched] = useState<Partial<Record<keyof ContactValues, boolean>>>({});
  const [status, setStatus] = useState<{ kind: "success" | "error"; text: string } | null>(null);
  const [busy, setBusy] = useState(false);
  const locked = useRef(false);
  const lastDraft = useRef<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  const result = contactSchema.safeParse(values);
  const errors = result.success ? {} : result.error.flatten().fieldErrors;
  const alreadyOpened = result.success && lastDraft.current === createContactUrl(values);

  function update(name: keyof ContactValues, value: string) {
    setValues(previous => ({ ...previous, [name]: value }));
    setStatus(null);
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setTouched({ name: true, email: true, phone: true, subject: true, message: true, method: true });
    if (locked.current) return;
    const validation = contactSchema.safeParse(values);
    if (!validation.success) {
      setStatus({ kind: "error", text: "Please correct the highlighted fields before continuing." });
      return;
    }
    const url = createContactUrl(validation.data);
    if (lastDraft.current === url) return;
    locked.current = true;
    setBusy(true);
    setStatus(null);
    try {
      // Open synchronously during the user's gesture to avoid popup blocking.
      const draft = window.open("about:blank", "_blank");
      if (!draft) throw new Error("Popup blocked");
      draft.opener = null;
      draft.location.replace(url);
      lastDraft.current = url;
      setStatus({ kind: "success", text: `${values.method === "email" ? "Gmail" : "WhatsApp"} opened with your draft. Review it and press Send there to deliver your message.` });
    } catch {
      setStatus({ kind: "error", text: "The draft could not open. Allow pop-ups for this site, then try again. Your message is still here." });
    } finally {
      timer.current = setTimeout(() => { locked.current = false; setBusy(false); }, 700);
    }
  }

  return (
    <form onSubmit={submit} noValidate aria-label="Contact form" aria-busy={busy} className="min-w-0 p-5 sm:p-8 lg:p-10">
      <div className="mb-7">
        <h3 className="text-xl sm:text-2xl font-bold">Let’s start a conversation</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Choose how you’d like to connect, then leave a few details.</p>
      </div>
      <fieldset disabled={busy} className="min-w-0">
        <legend className="mb-3 text-sm font-semibold">Preferred Contact Method <span className="text-primary" aria-hidden="true">*</span></legend>
        <div className="grid grid-cols-2 gap-2 rounded-xl border border-border bg-muted/60 p-1.5">
          {(["email", "whatsapp"] as const).map(method => {
            const Icon = method === "email" ? Mail : MessageCircle;
            return (
              <label key={method} className="min-w-0 cursor-pointer">
                <input className="peer sr-only" type="radio" name="method" value={method} checked={values.method === method} onChange={() => update("method", method)} required aria-describedby="contact-method-hint" />
                <span className="flex min-h-12 items-center justify-center gap-2 rounded-lg border border-transparent px-2 text-sm font-semibold text-muted-foreground transition-all hover:text-foreground peer-checked:border-primary/30 peer-checked:bg-card peer-checked:text-primary peer-checked:shadow-sm peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ring">
                  <Icon size={18} aria-hidden="true" />{method === "email" ? "Email" : "WhatsApp"}
                  {values.method === method && <Check size={15} aria-hidden="true" />}
                </span>
              </label>
            );
          })}
        </div>
        <p id="contact-method-hint" className="mt-3 text-xs leading-relaxed text-muted-foreground" aria-live="polite">{values.method === "email" ? "Your Email Address is Required." : "Your Phone Number is Required."}</p>
      </fieldset>

      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
        {fields.map(field => {
          if ((field.name === "email" && values.method !== "email") || (field.name === "phone" && values.method !== "whatsapp")) return null;
          const required = true;
          const error = touched[field.name] ? errors[field.name]?.[0] : undefined;
          const id = `contact-${field.name}`;
          const shared = {
            id, name: field.name, value: values[field.name], required, disabled: busy,
            maxLength: field.maxLength, minLength: field.minLength, placeholder: field.placeholder,
            onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => update(field.name, event.target.value),
            onBlur: () => setTouched(previous => ({ ...previous, [field.name]: true })),
            "aria-invalid": Boolean(error),
            "aria-describedby": [error ? `${id}-error` : "", field.name === "message" ? "contact-message-count" : ""].filter(Boolean).join(" ") || undefined,
            className: "w-full min-w-0 rounded-xl border border-border bg-background/70 px-4 py-3 text-base text-foreground placeholder:text-muted-foreground/80 transition-colors hover:border-primary/40 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/25 aria-invalid:border-destructive aria-invalid:focus:ring-destructive/25 disabled:opacity-60",
          };
          return (
            <div key={field.name} className="sm:col-span-2">
              <label htmlFor={id} className="mb-2 block text-sm font-medium">{field.label} {required ? <span aria-hidden="true" className="text-primary">*</span> : <span className="text-xs font-normal text-muted-foreground">(optional)</span>}</label>
              {field.name === "message" ? <textarea {...shared} rows={5} className={`${shared.className} resize-y min-h-36`} /> : <input {...shared} type={field.type || "text"} autoComplete={field.autoComplete} />}
              {field.name === "message" && <p id="contact-message-count" className="mt-1 text-right text-xs text-muted-foreground">{values.message.length.toLocaleString()} / 2,000</p>}
              {error && <p id={`${id}-error`} className="mt-1.5 text-sm text-destructive" aria-live="polite">{error}</p>}
            </div>
          );
        })}
      </div>

      <p id="contact-submit-hint" className="mt-5 text-xs leading-relaxed text-muted-foreground">{alreadyOpened ? "Draft already opened. Edit your message to prepare a new one." : "Complete all required (*) fields with valid details to enable Send Message. You’ll review and send your draft in the selected app."}</p>
      <button type="submit" disabled={!result.success || busy || alreadyOpened} aria-describedby="contact-submit-hint" className="mt-4 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-accent px-6 py-3 font-semibold text-primary-foreground shadow-lg shadow-primary/15 transition-all enabled:hover:shadow-primary/30 enabled:active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-45">
        {busy ? <Loader2 size={18} className="animate-spin" aria-hidden="true" /> : <Send size={18} aria-hidden="true" />}
        {busy ? "Opening draft…" : "Send Message"}
      </button>
      <div aria-live="polite" aria-atomic="true">
        {status && <div role={status.kind === "error" ? "alert" : "status"} className={`mt-4 flex items-start gap-2 rounded-xl border p-4 text-sm leading-relaxed ${status.kind === "error" ? "border-destructive/30 bg-destructive/5 text-destructive" : "border-primary/25 bg-primary/5 text-foreground"}`}>
          {status.kind === "success" && <CheckCircle2 size={19} className="mt-0.5 shrink-0 text-primary" aria-hidden="true" />}{status.text}
        </div>}
      </div>
    </form>
  );
}
