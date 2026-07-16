import About from "@/components/sections/about";
import Stats from "@/components/sections/stats";

export const metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <div className="bg-background text-foreground overflow-x-hidden">
      <About />
      <Stats />
    </div>
  );
}
