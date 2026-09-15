import { z } from "zod";

export const CONTACT_EMAIL = "hamzapk@gmail.com";
export const CONTACT_WHATSAPP = "923318213810";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Enter at least 2 characters for your name.").max(100, "Keep your name under 100 characters."),
  email: z.string().trim(),
  phone: z.string().trim(),
  subject: z.string().trim().min(3, "Enter a subject of at least 3 characters.").max(120, "Keep your subject within 120 characters."),
  message: z.string().trim().min(1, "Please enter a message.").max(2000, "Keep your message within 2,000 characters."),
  method: z.enum(["email", "whatsapp"], { errorMap: () => ({ message: "Choose Email or WhatsApp." }) }),
}).superRefine((data, context) => {
  const field = data.method === "email" ? "email" : "phone";
  if (!data[field]) {
    context.addIssue({ code: z.ZodIssueCode.custom, path: [field], message: data.method === "email" ? "Enter your email address to continue by email." : "Enter your WhatsApp / phone number to continue by WhatsApp." });
  } else if (data.method === "email") {
    if (!z.string().email().max(254).safeParse(data.email).success) {
      context.addIssue({ code: z.ZodIssueCode.custom, path: ["email"], message: "Enter a valid email address, such as name@example.com." });
    }
  } else {
    const digits = data.phone.replace(/\D/g, "");
    if (!/^\+?\d(?:[\d -]*\d)?$/.test(data.phone) || digits.length < 7 || digits.length > 15 || /^(\d)\1+$/.test(digits)) {
      context.addIssue({ code: z.ZodIssueCode.custom, path: ["phone"], message: "Enter a valid phone number with 7–15 digits; +, spaces and hyphens are allowed." });
    }
  }
});

export type ContactValues = z.infer<typeof contactSchema>;

// Parse again at the handoff boundary: invalid data must never open a draft.
export function createContactUrl(values: ContactValues): string {
  const data = contactSchema.parse(values);
  const body = [
    `Name: ${data.name}`,
    data.method === "email" ? `Email: ${data.email}` : `WhatsApp / Phone: ${data.phone}`,
    `Subject: ${data.subject}`,
    "",
    "Message:",
    data.message,
  ].join("\n");

  if (data.method === "email") {
    return `https://mail.google.com/mail/?${new URLSearchParams({ view: "cm", fs: "1", to: CONTACT_EMAIL, su: data.subject, body })}`;
  }
  return `https://wa.me/${CONTACT_WHATSAPP}?${new URLSearchParams({ text: body })}`;
}
