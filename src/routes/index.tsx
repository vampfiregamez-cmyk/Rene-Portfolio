import { createFileRoute } from "@tanstack/react-router";
import { ArrowDown, ArrowUpRight, Camera, ChevronRight, Menu, X } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "René — Creative Developer" },
      { name: "description", content: "René is a creative developer building memorable digital experiences with code, strategy, and disciplined craft." },
      { property: "og:title", content: "René — Creative Developer" },
      { property: "og:description", content: "A cinematic portfolio about code, craft, and ideas worth remembering." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Portfolio,
});

const navItems = ["home", "about", "projects", "skills", "contact"];
const skillGroups = [
  { number: "01", title: "Languages", items: ["Add your languages"] },
  { number: "02", title: "Frameworks", items: ["Add your frameworks"] },
  { number: "03", title: "Tools", items: ["Add your tools"] },
  { number: "04", title: "Other", items: ["Add your specialties"] },
];

function useReveals() {
  useEffect(() => {
    const nodes = document.querySelectorAll<HTMLElement>(".reveal");
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")),
      { threshold: 0.14 },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);
}

function PhotoSlot({ label, className = "", index }: { label: string; className?: string; index: string }) {
  return (
    <div className={`group relative overflow-hidden border border-line bg-card grain ${className}`}>
      <div className="absolute inset-0 halftone opacity-60 transition-transform duration-700 group-hover:scale-105" />
      <div className="absolute inset-x-0 top-1/3 h-px -rotate-6 bg-primary/70" />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6 text-center">
        <Camera aria-hidden="true" className="h-6 w-6 text-primary" />
        <span className="technical text-[10px] text-muted-foreground">{label}</span>
        <span className="text-xs text-muted-foreground">Your photography goes here</span>
      </div>
      <span className="technical absolute left-3 top-3 text-[9px] text-primary">Frame / {index}</span>
      <span className="absolute bottom-0 right-0 h-12 w-1 bg-primary transition-[height] duration-500 group-hover:h-24" />
    </div>
  );
}

function SectionHeading({ number, eyebrow, children }: { number: string; eyebrow: string; children: ReactNode }) {
  return (
    <div className="reveal mb-12 grid grid-cols-[auto_minmax(0,1fr)] items-end gap-5 border-b border-line pb-5 md:mb-20 md:gap-10">
      <span className="display-type text-5xl text-primary md:text-7xl">{number}</span>
      <div className="min-w-0">
        <p className="technical mb-2 text-[9px] text-muted-foreground md:text-[10px]">{eyebrow}</p>
        <h2 className="display-type text-5xl text-foreground sm:text-7xl md:text-8xl">{children}</h2>
      </div>
    </div>
  );
}

function Portfolio() {
  useReveals();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <main className="bg-background text-foreground">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-background/85 backdrop-blur-xl">
        <div className="mx-auto grid h-16 max-w-[1480px] grid-cols-[minmax(0,1fr)_auto] items-center px-5 md:h-20 md:px-10">
          <a href="#home" className="display-type min-w-0 text-2xl text-foreground" aria-label="René, home">R<span className="text-primary">/</span></a>
          <nav className="hidden items-center gap-8 md:flex" aria-label="Main navigation">
            {navItems.map((item, i) => <a key={item} href={`#${item}`} className="technical group relative py-3 text-[9px] text-muted-foreground transition-colors hover:text-foreground"><span className="mr-2 text-primary">0{i + 1}</span>{item}<span className="absolute inset-x-0 bottom-1 h-px origin-left scale-x-0 bg-primary transition-transform group-hover:scale-x-100" /></a>)}
          </nav>
          <Button variant="ghost" size="icon" className="text-foreground md:hidden" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>{menuOpen ? <X /> : <Menu />}</Button>
        </div>
        {menuOpen && <nav className="border-t border-line bg-background px-5 py-6 md:hidden" aria-label="Mobile navigation">{navItems.map((item, i) => <a key={item} href={`#${item}`} onClick={() => setMenuOpen(false)} className="grid grid-cols-[auto_1fr_auto] items-center gap-4 border-b border-line py-4"><span className="technical text-[9px] text-primary">0{i + 1}</span><span className="display-type text-3xl">{item}</span><ChevronRight className="h-4 w-4 text-muted-foreground" /></a>)}</nav>}
      </header>

      <section id="home" ref={heroRef} className="relative min-h-[100svh] overflow-hidden px-5 pb-10 pt-24 md:px-10 md:pb-12 md:pt-28">
        <div className="absolute inset-y-0 left-[8%] w-px bg-line" /><div className="absolute inset-y-0 right-[8%] w-px bg-line" />
        <div className="relative mx-auto grid min-h-[calc(100svh-8rem)] max-w-[1480px] grid-cols-1 items-end gap-7 lg:grid-cols-12">
          <div className="relative z-10 lg:col-span-7 lg:pb-16">
            <p className="technical mb-6 flex items-center gap-3 text-[10px] text-muted-foreground"><span className="h-px w-10 bg-primary" />Creative developer / Nairobi, Kenya</p>
            <h1 className="display-type text-[clamp(6rem,22vw,18rem)] text-foreground">RE<span className="text-primary">N</span>É</h1>
            <div className="mt-5 grid max-w-2xl grid-cols-[auto_minmax(0,1fr)] gap-5 border-t border-line pt-5 md:mt-8 md:gap-8">
              <span className="technical text-[9px] text-primary">V.01</span>
              <div><p className="text-xl font-medium leading-snug sm:text-2xl md:text-3xl">I build things worth remembering.</p><p className="mt-3 max-w-lg text-sm leading-6 text-muted-foreground">Code, strategy, and visual instinct—shaped into digital experiences with intent.</p></div>
            </div>
          </div>
          <div className="relative h-[44svh] min-h-80 lg:col-span-5 lg:h-[72svh]" style={{ transform: `translateY(${Math.min(scrollY * 0.07, 34)}px)` }}>
            <PhotoSlot label="Primary portrait / vertical crop" index="A-01" className="h-full [clip-path:polygon(12%_0,100%_0,100%_88%,88%_100%,0_100%,0_12%)]" />
            <div className="technical absolute -left-4 bottom-16 z-10 bg-primary px-4 py-2 text-[9px] text-primary-foreground md:-left-10">Subject / René</div>
            <div className="absolute -right-2 top-8 h-24 w-2 bg-primary md:-right-5" />
          </div>
        </div>
        <a href="#about" className="technical absolute bottom-7 left-5 z-20 flex items-center gap-3 text-[9px] text-muted-foreground md:left-10">Scroll to enter <ArrowDown className="h-4 w-4 text-primary" /></a>
      </section>

      <div className="overflow-hidden border-y border-line bg-primary py-2 text-primary-foreground"><div className="technical flex w-max animate-[marquee_22s_linear_infinite] whitespace-nowrap text-[9px]"><span className="pr-8">CREATIVE DEVELOPMENT — DIGITAL CRAFT — STRATEGIC THINKING — CHESS MINDSET — VISUAL SYSTEMS — </span><span className="pr-8" aria-hidden="true">CREATIVE DEVELOPMENT — DIGITAL CRAFT — STRATEGIC THINKING — CHESS MINDSET — VISUAL SYSTEMS — </span></div></div>

      <section id="about" className="px-5 py-24 md:px-10 md:py-36"><div className="mx-auto max-w-[1480px]"><SectionHeading number="01" eyebrow="Character profile / Origin">Behind the code</SectionHeading>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="reveal lg:col-span-4"><PhotoSlot label="Secondary portrait / landscape" index="B-02" className="aspect-[4/5] lg:aspect-[3/4]" /><p className="technical mt-4 text-[9px] text-muted-foreground">Image optional — composition remains intact</p></div>
          <div className="reveal lg:col-span-5 lg:col-start-6"><p className="display-type text-4xl leading-none sm:text-5xl md:text-6xl">A developer driven by <span className="text-primary">curiosity</span>, precision, and the long game.</p><p className="mt-8 max-w-xl text-base leading-8 text-muted-foreground">I care about the details people feel before they notice: a clear path, a deliberate interaction, a system that holds together. This space is ready for your real story—short, direct, and unmistakably yours.</p><blockquote className="mt-10 border-l-2 border-primary pl-6 text-lg italic leading-8 text-foreground">“Build with intent. Move with patience. Make every decision count.”</blockquote></div>
          <aside className="reveal border-t border-line pt-5 lg:col-span-2 lg:col-start-11 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0"><p className="technical mb-8 text-[9px] text-primary">Profile data</p>{[["Focus","Meaningful digital products"],["Mindset","Strategic / curious"],["Interests","Code / chess / image"],["Status","Building the next move"]].map(([key,value]) => <div key={key} className="border-b border-line py-4"><p className="technical text-[8px] text-muted-foreground">{key}</p><p className="mt-2 text-sm leading-5">{value}</p></div>)}</aside>
        </div>
      </div></section>

      <section id="projects" className="border-y border-line bg-card px-5 py-24 md:px-10 md:py-36"><div className="mx-auto max-w-[1480px]"><SectionHeading number="02" eyebrow="Selected work / Archive">Projects</SectionHeading>
        <div className="reveal group relative min-h-[430px] overflow-hidden border border-line bg-background p-6 md:min-h-[540px] md:p-12">
          <div className="absolute inset-0 halftone opacity-40 transition-transform duration-700 group-hover:scale-105" /><div className="absolute -right-24 top-1/2 h-px w-[70%] -rotate-12 bg-primary/60" />
          <div className="relative z-10 flex min-h-[380px] flex-col justify-between md:min-h-[440px]"><div className="flex items-start justify-between"><span className="technical text-[9px] text-primary">Archive status / 000</span><span className="display-type text-5xl text-line md:text-8xl">待</span></div><div className="max-w-2xl"><p className="display-type text-6xl sm:text-7xl md:text-9xl">First move<br/><span className="text-primary">incoming.</span></p><p className="mt-6 max-w-lg text-sm leading-7 text-muted-foreground">The project archive is intentionally quiet—for now. Real work will appear here with context, technology, source, and live links.</p></div><div className="technical flex items-center gap-3 text-[9px] text-muted-foreground"><span className="h-px w-12 bg-primary" />Projects coming soon</div></div>
        </div>
      </div></section>

      <section id="skills" className="px-5 py-24 md:px-10 md:py-36"><div className="mx-auto max-w-[1480px]"><SectionHeading number="03" eyebrow="Capabilities / Toolkit">Working set</SectionHeading>
        <div className="grid border-t border-line md:grid-cols-2 lg:grid-cols-4">{skillGroups.map((group) => <article key={group.title} className="reveal group min-h-64 border-b border-line p-6 transition-colors hover:bg-card md:border-r lg:min-h-80"><div className="flex items-center justify-between"><span className="technical text-[9px] text-primary">{group.number}</span><ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-primary" /></div><h3 className="display-type mt-14 text-4xl md:mt-20 md:text-5xl">{group.title}</h3><div className="mt-7">{group.items.map((item) => <p key={item} className="border-t border-line py-3 text-sm text-muted-foreground">{item}</p>)}</div></article>)}</div>
        <p className="reveal mt-6 technical text-[9px] text-muted-foreground">Only verified tools belong here. Replace these prompts with your actual stack.</p>
      </div></section>

      <section className="overflow-hidden border-y border-line"><div className="mx-auto grid max-w-[1480px] md:grid-cols-[1.15fr_.85fr]"><PhotoSlot label="Editorial photograph / wide crop" index="C-03" className="aspect-[5/4] border-y-0 border-l-0 md:aspect-[5/3]" /><div className="reveal flex flex-col justify-between bg-primary p-8 text-primary-foreground md:p-12"><span className="technical text-[9px]">Interlude / Personal frame</span><p className="display-type my-16 text-5xl sm:text-6xl lg:text-8xl">Beyond the<br/>terminal.</p><p className="max-w-md text-sm leading-7 opacity-80">A place for the images, places, and observations that shape how you see—and therefore how you build.</p></div></div></section>

      <section id="contact" className="relative overflow-hidden px-5 py-24 md:px-10 md:py-36"><div className="absolute inset-0 halftone opacity-30" /><div className="relative mx-auto max-w-[1480px]"><p className="reveal technical mb-7 text-[10px] text-primary">04 / Contact / Your move</p><h2 className="reveal display-type max-w-6xl text-[clamp(4.5rem,15vw,12rem)]">Let’s build the<br/><span className="text-primary">next chapter.</span></h2><div className="reveal mt-12 flex flex-col items-start justify-between gap-8 border-t border-line pt-7 md:flex-row md:items-end"><p className="max-w-md text-sm leading-7 text-muted-foreground">Have a project, an opportunity, or an idea worth exploring? The board is open.</p><a href="mailto:hello@example.com" className="group inline-flex min-h-12 items-center gap-4 border border-primary bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-transparent hover:text-foreground">Start a conversation <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" /></a></div></div></section>

      <footer className="border-t border-line px-5 py-7 md:px-10"><div className="technical mx-auto grid max-w-[1480px] grid-cols-[minmax(0,1fr)_auto] gap-4 text-[8px] text-muted-foreground"><span className="truncate">René / Creative Developer</span><a href="#home" className="flex shrink-0 items-center gap-2 transition-colors hover:text-primary">Back to top <ArrowDown className="h-3 w-3 rotate-180" /></a></div></footer>
    </main>
  );
}