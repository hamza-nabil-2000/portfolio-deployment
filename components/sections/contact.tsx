import {
  ArrowUpRight,
  Github,
  Linkedin,
  Mail,
  MessageCircle,
} from "lucide-react";
import ContactForm from "@/components/contact-form";
import { CONTACT_EMAIL, CONTACT_WHATSAPP } from "@/lib/contact";

export default function Contact() {
  return (
    <section
      id="contact"
      className="pt-16 md:pt-20 pb-40 md:pb-44 px-4 sm:px-6 lg:px-8 border-t border-border/50"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Heading */}
        <div className="flex items-center gap-3 mt-8 md:mt-12 mb-8 md:mb-12">
          <div className="shrink-0 p-2 md:p-3 rounded-lg bg-primary/10">
            <Mail
              className="text-primary w-7 h-7 md:w-8 md:h-8"
              aria-hidden="true"
            />
          </div>

          <h2 className="min-w-0 break-words text-2xl sm:text-3xl md:text-4xl font-bold neon-text-gradient">
            Contact
          </h2>
        </div>

        {/* Contact Form */}
        <div className="overflow-hidden rounded-2xl border border-primary/20 bg-card shadow-xl shadow-primary/5">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
