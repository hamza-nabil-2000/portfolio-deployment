import Contact from "@/components/sections/contact";

export const metadata = {
  title: "Contact",
};

export default function ContactPage() {
  return (
    <div className="bg-background text-foreground overflow-x-hidden">
      <Contact />
    </div>
  );
}
