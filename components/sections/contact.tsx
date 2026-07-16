import { Mail, Linkedin } from "lucide-react";

const emailDraftUrl =
  "https://mail.google.com/mail/?view=cm&fs=1&to=hamzapk@gmail.com";

export default function Contact() {
  return (
    <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 border-t border-border/50">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mt-8 md:mt-12 mb-8 md:mb-12">
          <div className="p-2 md:p-3 rounded-lg bg-primary/10">
            <Mail className="text-primary w-7 h-7 md:w-8 md:h-8" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold neon-text-gradient">
            Contact
          </h2>
        </div>
        <div className="neon-card p-6 sm:p-8 md:p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6 neon-text-gradient">
            Get In Touch
          </h2>
          <p className="text-base sm:text-lg text-foreground/80 mb-6 md:mb-8 max-w-2xl mx-auto text-justify">
            I am open to Quality Assurance Opportunities where I can
            contribute through Reliable Manual testing, Automation with
            Playwright or Selenium, and thoughtful collaboration with Product
            and Engineering teams.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a
              href={emailDraftUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="neon-button inline-flex items-center gap-2 text-lg"
            >
              <Mail size={24} />
              EMAIL ME
            </a>
            <a
              href="https://wa.me/03318213810"
              target="_blank"
              rel="noopener noreferrer"
              className="neon-button inline-flex items-center gap-2 text-lg"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path d="M20.52 3.48A11.9 11.9 0 0012 0C5.37 0 .02 5.35 0 12c0 2.11.55 4.1 1.51 5.84L0 24l6.33-1.66A11.94 11.94 0 0012 24c6.62 0 12-5.38 12-12 0-3.2-1.24-6.1-3.48-8.52zM12 22a9.96 9.96 0 01-5.2-1.5l-.37-.22-3.76 1 1-3.66-.24-.38A9.97 9.97 0 012 12c0-5.52 4.48-10 10-10s10 4.48 10 10-4.48 10-10 10zm5.56-7.73c-.3-.15-1.77-.88-2.04-.98-.27-.1-.47-.15-.67.15-.2.3-.77.98-.95 1.18-.18.2-.36.23-.66.08-.3-.15-1.27-.47-2.42-1.5-.89-.79-1.49-1.76-1.66-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.34.45-.51.15-.17.2-.3.3-.5.1-.2.05-.38-.02-.53-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.5h-.57c-.2 0-.52.07-.8.36-.27.3-1.04 1.02-1.04 2.49s1.07 2.89 1.22 3.09c.15.2 2.11 3.22 5.12 4.51.72.31 1.28.5 1.72.64.72.23 1.38.2 1.9.12.58-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.08-.12-.3-.2-.63-.35z" />
              </svg>
              WHATSAPP
            </a>
            <a
              href="https://linkedin.com/in/hamza-nabeel"
              target="_blank"
              rel="noopener noreferrer"
              className="neon-button inline-flex items-center gap-2 text-lg"
            >
              <Linkedin size={24} />
              LINKEDIN
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
