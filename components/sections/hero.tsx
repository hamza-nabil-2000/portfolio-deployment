"use client";

import Image from "next/image";
import { Sparkles, Linkedin, Mail, Phone, MapPin, Github } from "lucide-react";

const emailDraftUrl =
  "https://mail.google.com/mail/?view=cm&fs=1&to=hamzapk@gmail.com";
const address = "CB-1023 Hamza Street, Afshan Colony, Rawalpindi";
const mapsUrl = "https://maps.app.goo.gl/bTykdoirGvFGB9Pr9";
const rawPhoneNumber = "+92 331 8213810";
const phoneNumber = rawPhoneNumber.replace(/[a-zA-Z]/g, "");
const phoneTelUrl = `tel:+${phoneNumber.replace(/\D/g, "")}`;

export default function Hero() {
  return (
    <section
      id="home"
      className="pt-24 sm:pt-32 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden min-h-[85vh] sm:min-h-[90vh] flex items-center"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-primary/5 rounded-full blur-3xl animate-pulse animation-delay-4000 -translate-x-1/2 -translate-y-1/2"></div>
      </div>

      <div className="w-full min-w-0 max-w-6xl mx-auto relative animate-fade-in-up">
        <div className="md:hidden flex flex-col items-center text-center mb-6 space-y-4">
          <div className="relative w-40 sm:w-48">
            <div className="classic-portrait-frame">
              <Image
                src="/pfp.jpeg"
                alt="Hamza Nabil"
                width={881}
                height={881}
                sizes="(max-width: 640px) 10rem, 12rem"
                className="classic-portrait-image"
                priority
              />
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold leading-tight break-words">
            Hamza <span className="neon-text">Nabil</span>
          </h1>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 text-primary text-sm animate-glow-pulse select-none">
            <Sparkles size={16} />
            <span>IT Support Engineer</span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="min-w-0 space-y-6 order-2 md:order-1">
            <h1 className="hidden md:block text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight break-words">
              Hamza <span className="neon-text">Nabil</span>
            </h1>
            <div className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 text-primary text-sm animate-glow-pulse select-none">
              <Sparkles size={16} />
              <span>IT Support Engineer</span>
            </div>
            <p className="text-lg sm:text-xl text-muted-foreground animate-slide-in text-justify">
              Keeping people productive through reliable IT support and
              practical problem-solving
            </p>
            <div className="space-y-3">
              <p className="text-base sm:text-lg text-foreground/80 leading-relaxed animate-slide-in animation-delay-200 text-justify">
                IT Support Engineer with hands-on experience troubleshooting
                hardware, software, networking, system configuration, and user
                access issues. I provide reliable technical support and keep
                day-to-day system operations running smoothly. My background
                spans software development and QA, backed by a BS in Information
                Technology.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 pt-4 animate-slide-in animation-delay-400 w-full">
              <a
                href="https://linkedin.com/in/hamza-nabeel"
                target="_blank"
                rel="noopener noreferrer"
                className="neon-button inline-flex items-center justify-center gap-2 w-full min-w-0 text-center whitespace-normal text-sm xl:text-xs [--button-padding-inline:0.5rem]"
              >
                <Linkedin className="w-4 h-4 lg:w-5 lg:h-5 flex-shrink-0" />
                <span>LINKEDIN</span>
              </a>

              <a
                href="https://github.com/hamza-nabil-2000"
                target="_blank"
                rel="noopener noreferrer"
                className="neon-button inline-flex items-center justify-center gap-2 w-full min-w-0 text-center whitespace-normal text-sm xl:text-xs [--button-padding-inline:0.5rem]"
              >
                <Github className="w-4 h-4 lg:w-5 lg:h-5 flex-shrink-0" />
                <span>GITHUB</span>
              </a>

              <a
                href={emailDraftUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="neon-button inline-flex items-center justify-center gap-2 w-full min-w-0 text-center whitespace-normal text-sm xl:text-xs [--button-padding-inline:0.5rem]"
              >
                <Mail className="w-4 h-4 lg:w-5 lg:h-5 flex-shrink-0" />
                <span>EMAIL ME</span>
              </a>

              <a
                href="https://wa.me/923318213810"
                target="_blank"
                rel="noopener noreferrer"
                className="neon-button inline-flex items-center justify-center gap-2 w-full min-w-0 text-center whitespace-normal text-sm xl:text-xs [--button-padding-inline:0.5rem]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-4 h-4 lg:w-5 lg:h-5 flex-shrink-0"
                >
                  <path d="M20.52 3.48A11.9 11.9 0 0012 0C5.37 0 .02 5.35 0 12c0 2.11.55 4.1 1.51 5.84L0 24l6.33-1.66A11.94 11.94 0 0012 24c6.62 0 12-5.38 12-12 0-3.2-1.24-6.1-3.48-8.52zM12 22a9.96 9.96 0 01-5.2-1.5l-.37-.22-3.76 1 1-3.66-.24-.38A9.97 9.97 0 012 12c0-5.52 4.48-10 10-10s10 4.48 10 10-4.48 10-10 10zm5.56-7.73c-.3-.15-1.77-.88-2.04-.98-.27-.1-.47-.15-.67.15-.2.3-.77.98-.95 1.18-.18.2-.36.23-.66.08-.3-.15-1.27-.47-2.42-1.5-.89-.79-1.49-1.76-1.66-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.34.45-.51.15-.17.2-.3.3-.5.1-.2.05-.38-.02-.53-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.5h-.57c-.2 0-.52.07-.8.36-.27.3-1.04 1.02-1.04 2.49s1.07 2.89 1.22 3.09c.15.2 2.11 3.22 5.12 4.51.72.31 1.28.5 1.72.64.72.23 1.38.2 1.9.12.58-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.08-.12-.3-.2-.63-.35z" />
                </svg>

                <span>WHATSAPP</span>
              </a>
            </div>
          </div>

          <div className="min-w-0 order-1 md:order-2 flex flex-col justify-center h-full">
            <div className="hidden md:block relative mb-8">
              <div className="classic-portrait-frame max-w-full w-64 lg:w-72">
                <Image
                  src="/pfp.jpeg"
                  alt="Hamza Nabil"
                  width={590}
                  height={881}
                  sizes="(max-width: 1024px) 16rem, 18rem"
                  className="classic-portrait-image"
                  priority
                />
              </div>
            </div>

            <div className="relative animate-scale-in animation-delay-600">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl blur-3xl animate-pulse"></div>
              <div className="relative neon-card p-5 sm:p-6 space-y-4">
                <div className="flex items-center gap-3 group cursor-pointer">
                  <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors flex-shrink-0">
                    <Phone size={20} className="text-primary" />
                  </div>
                  <a
                    href={phoneTelUrl}
                    title="Call"
                    aria-label={`Call ${phoneNumber}`}
                    className="min-w-0 break-words relative z-10 text-foreground text-sm hover:text-primary transition-colors"
                  >
                    {phoneNumber}
                  </a>
                </div>
                <div className="flex items-center gap-3 group cursor-pointer">
                  <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors flex-shrink-0">
                    <MapPin size={20} className="text-primary" />
                  </div>
                  <a
                    href={mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Open in Google Maps"
                    aria-label={`Open ${address} in Google Maps`}
                    className="min-w-0 break-words relative z-10 text-foreground text-sm hover:text-primary transition-colors"
                  >
                    {address}
                  </a>
                </div>
                <div className="flex items-center gap-3 group cursor-pointer">
                  <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors flex-shrink-0">
                    <Mail size={20} className="text-primary" />
                  </div>
                  <a
                    href={emailDraftUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Send Email"
                    aria-label="Send Email"
                    className="min-w-0 break-words relative z-10 text-foreground text-sm hover:text-primary transition-colors"
                  >
                    hamzapk@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce hidden sm:block">
        <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-scroll"></div>
        </div>
      </div>
    </section>
  );
}
