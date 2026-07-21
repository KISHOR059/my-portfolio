"use client";

import { motion } from "framer-motion";
import { ContactRound as Linkedin, GitFork as Github, Mail, MapPin, Send } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { portfolio } from "@/data/portfolio";

export function Contact() {
  const [sent, setSent] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const subject = encodeURIComponent(`Portfolio enquiry from ${String(form.get("name"))}`);
    const body = encodeURIComponent(`${String(form.get("message"))}\n\nFrom: ${String(form.get("name"))} <${String(form.get("email"))}>`);
    setSent(true);
    window.location.href = `mailto:${portfolio.email}?subject=${subject}&body=${body}`;
  }

  const details = [
    { icon: Mail, label: "Email", value: portfolio.email, href: `mailto:${portfolio.email}` },
    { icon: Linkedin, label: "LinkedIn", value: "Let’s connect", href: portfolio.social.linkedin },
    { icon: Github, label: "GitHub", value: "See my code", href: portfolio.social.github },
    { icon: MapPin, label: "Location", value: portfolio.location },
  ];

  return (
    <section id="contact" className="section-shell scroll-mt-20 pb-24 sm:pb-32">
      <Reveal><SectionHeading eyebrow="05 / Contact" title="Have an idea? Let’s make it real." description="I’m always open to thoughtful conversations, interesting product challenges, and meaningful collaborations." /></Reveal>
      <Reveal>
        <div className="glass-card relative overflow-hidden rounded-[2rem] p-5 sm:p-8 lg:p-10">
          <div className="absolute -right-24 -top-24 size-80 rounded-full bg-violet-600/10 blur-[100px]" />
          <div className="grid gap-10 lg:grid-cols-[.75fr_1.25fr] lg:gap-14">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-300/15 bg-emerald-400/[.06] px-3 py-2 text-xs text-emerald-300"><span className="size-2 rounded-full bg-emerald-400 shadow-[0_0_10px_#34d399]" /> Usually replies within 24 hours</span>
              <h3 className="mt-7 max-w-sm text-2xl font-bold tracking-tight text-white">Let&apos;s build something people remember.</h3>
              <p className="mt-3 max-w-sm text-sm leading-6 text-slate-400">Tell me what you&apos;re working on, where you&apos;re stuck, or simply say hello.</p>
              <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                {details.map(({ icon: Icon, label, value, href }) => {
                  const content = <><span className="grid size-10 place-items-center rounded-xl border border-white/[.07] bg-white/[.04] text-cyan-300"><Icon className="size-4" /></span><span><span className="block text-[10px] uppercase tracking-widest text-slate-600">{label}</span><span className="mt-0.5 block text-sm text-slate-300">{value}</span></span></>;
                  return href ? <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="flex items-center gap-3 rounded-2xl p-2 transition-colors hover:bg-white/[.035]">{content}</a> : <div key={label} className="flex items-center gap-3 rounded-2xl p-2">{content}</div>;
                })}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="relative rounded-3xl border border-white/[.07] bg-[#070a18]/70 p-5 sm:p-7">
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="form-label">Your name<input required name="name" autoComplete="name" className="form-input" placeholder="Kishor" /></label>
                <label className="form-label">Email address<input required name="email" type="email" autoComplete="email" className="form-input" placeholder="you@example.com" /></label>
              </div>
              <label className="form-label mt-5">Subject<input required name="subject" className="form-input" placeholder="A new project" /></label>
              <label className="form-label mt-5">Tell me about it<textarea required name="message" rows={5} className="form-input resize-none" placeholder="A few details about your idea, timeline, and goals..." /></label>
              <motion.button whileHover={{ scale: 1.015 }} whileTap={{ scale: 0.985 }} type="submit" className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-blue-500 text-sm font-semibold text-white shadow-[0_0_30px_rgba(124,58,237,.28)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300">{sent ? "Opening your email app…" : "Send message"}<Send className="size-4" /></motion.button>
            </form>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
