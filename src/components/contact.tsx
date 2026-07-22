"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, AtSign, Mail, MapPin, MessageSquareText, Send, UserRound } from "lucide-react";
import { useState, type FormEvent, type ReactNode } from "react";
import { GitHubLogo, LinkedInLogo } from "@/components/brand-icons";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { portfolio } from "@/data/portfolio";

type ContactDetail = {
  icon: ReactNode;
  label: string;
  value: string;
  href?: string;
  accent: string;
};

const fieldClass = "peer mt-2 block w-full rounded-2xl border border-white/[.08] bg-[#070918]/75 px-4 py-3.5 text-sm text-white outline-none transition-[border-color,background-color,box-shadow] duration-300 placeholder:text-slate-600 hover:border-white/[.13] focus:border-cyan-300/35 focus:bg-[#090c1d]/90 focus:shadow-[0_0_0_3px_rgba(34,211,238,.055),0_0_24px_rgba(59,130,246,.07)]";

export function Contact() {
  const [sent, setSent] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name"));
    const email = String(form.get("email"));
    const requestedSubject = String(form.get("subject"));
    const subject = encodeURIComponent(`${requestedSubject} — from ${name}`);
    const body = encodeURIComponent(`${String(form.get("message"))}\n\nFrom: ${name} <${email}>`);
    setSent(true);
    window.location.href = `mailto:${portfolio.email}?subject=${subject}&body=${body}`;
  }

  const details: ContactDetail[] = [
    { icon: <Mail className="size-[18px]" />, label: "Email", value: portfolio.email, href: `mailto:${portfolio.email}`, accent: "text-violet-300" },
    { icon: <LinkedInLogo className="size-[18px]" />, label: "LinkedIn", value: "Let’s connect", href: portfolio.social.linkedin, accent: "text-blue-300" },
    { icon: <GitHubLogo className="size-[18px]" />, label: "GitHub", value: "Explore my code", href: portfolio.social.github, accent: "text-slate-200" },
    { icon: <MapPin className="size-[18px]" />, label: "Location", value: portfolio.location, accent: "text-cyan-300" },
  ];

  return (
    <section id="contact" className="section-shell scroll-mt-20 pb-24 sm:pb-32">
      <Reveal>
        <SectionHeading eyebrow="05 / Contact" title="Let’s create something exceptional." description="Have a product idea, an engineering challenge, or an opportunity worth discussing? Open a channel and tell me about it." />
      </Reveal>

      <Reveal>
        <div className="relative mx-auto max-w-[82.75rem] overflow-hidden rounded-[2rem] border border-white/[.085] bg-[#080a19]/90 shadow-[0_36px_110px_rgba(0,0,0,.4),0_0_70px_rgba(91,33,182,.08),inset_0_1px_0_rgba(255,255,255,.05)] sm:rounded-[2.25rem]">
          <div className="pointer-events-none absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.025)_1px,transparent_1px)] [background-size:42px_42px] [mask-image:linear-gradient(to_bottom,black,transparent_78%)]" />
          <div className="pointer-events-none absolute -left-32 -top-36 size-[28rem] rounded-full bg-violet-600/15 blur-[120px]" />
          <div className="pointer-events-none absolute -bottom-40 right-[-6rem] size-[26rem] rounded-full bg-cyan-500/[.08] blur-[120px]" />
          <div className="absolute inset-x-[16%] top-0 h-px bg-gradient-to-r from-transparent via-violet-300/70 to-transparent shadow-[0_0_24px_rgba(139,92,246,.5)]" />

          <div className="relative grid lg:grid-cols-[.88fr_1.12fr]">
            <div className="flex flex-col border-b border-white/[.065] p-6 sm:p-9 lg:border-b-0 lg:border-r lg:p-11">
              <div className="flex items-center justify-between gap-4">
                <span className="inline-flex items-center gap-2 rounded-full border border-emerald-300/15 bg-emerald-400/[.055] px-3 py-2 font-mono text-[10px] uppercase tracking-[.08em] text-emerald-300">
                  <span className="relative flex size-2">
                    <motion.span className="absolute inline-flex size-full rounded-full bg-emerald-400" animate={{ scale: [1, 1.9], opacity: [.65, 0] }} transition={{ duration: 1.8, repeat: Infinity }} />
                    <span className="relative inline-flex size-2 rounded-full bg-emerald-400 shadow-[0_0_10px_#34d399]" />
                  </span>
                  Available to connect
                </span>
                <span className="font-mono text-[9px] uppercase tracking-[.18em] text-slate-700">Channel 05</span>
              </div>

              <div className="mt-9">
                <p className="font-mono text-[10px] uppercase tracking-[.22em] text-violet-300">Start a conversation</p>
                <h3 className="mt-3 max-w-md text-3xl font-extrabold leading-tight tracking-[-.035em] text-white sm:text-[2.15rem]">Your next idea deserves a strong technical foundation.</h3>
                <p className="mt-4 max-w-md text-sm leading-7 text-slate-400">Share the context, goal, and timeline. I’ll respond with a clear next step—usually within 24 hours.</p>
              </div>

              <div className="mt-9 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                {details.map((detail, index) => {
                  const content = (
                    <>
                      <span className={`grid size-11 shrink-0 place-items-center rounded-2xl border border-white/[.08] bg-white/[.04] shadow-[inset_0_1px_0_rgba(255,255,255,.04)] ${detail.accent}`}>{detail.icon}</span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-mono text-[9px] uppercase tracking-[.18em] text-slate-600">0{index + 1} / {detail.label}</span>
                        <span className="mt-1 block truncate text-sm font-medium text-slate-300 transition-colors group-hover:text-white">{detail.value}</span>
                      </span>
                      {detail.href && <ArrowUpRight className="size-3.5 shrink-0 text-slate-700 transition-[color,transform] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-cyan-300" />}
                    </>
                  );
                  const className = "group flex min-w-0 items-center gap-3 rounded-2xl border border-transparent bg-white/[.018] p-2.5 transition-[background-color,border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-white/[.07] hover:bg-white/[.04]";
                  return detail.href ? (
                    <a key={detail.label} href={detail.href} target={detail.href.startsWith("http") ? "_blank" : undefined} rel={detail.href.startsWith("http") ? "noreferrer" : undefined} className={className}>{content}</a>
                  ) : <div key={detail.label} className={className}>{content}</div>;
                })}
              </div>

              <div className="mt-auto hidden items-center gap-3 pt-10 font-mono text-[9px] uppercase tracking-[.16em] text-slate-700 lg:flex">
                <span className="h-px flex-1 bg-gradient-to-r from-white/[.08] to-transparent" />
                Secure direct channel
              </div>
            </div>

            <div className="p-4 sm:p-7 lg:p-8 xl:p-10">
              <form onSubmit={handleSubmit} className="relative overflow-hidden rounded-[1.65rem] border border-white/[.08] bg-[#070918]/85 shadow-[0_24px_70px_rgba(0,0,0,.28),inset_0_1px_0_rgba(255,255,255,.04)]">
                <div className="flex h-12 items-center justify-between border-b border-white/[.065] px-4 sm:px-5">
                  <div className="flex items-center gap-2">
                    <span className="flex gap-1.5" aria-hidden="true"><span className="size-2 rounded-full bg-violet-400/70" /><span className="size-2 rounded-full bg-blue-400/60" /><span className="size-2 rounded-full bg-cyan-300/70" /></span>
                    <span className="ml-2 font-mono text-[9px] text-slate-600">new-message.tsx</span>
                  </div>
                  <span className="rounded-md border border-white/[.06] bg-white/[.025] px-2 py-1 font-mono text-[8px] uppercase tracking-wider text-slate-600">Encrypted</span>
                </div>

                <div className="p-5 sm:p-7">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <label className="group text-xs font-semibold text-slate-400" htmlFor="contact-name">
                      <span className="flex items-center gap-2"><UserRound className="size-3.5 text-violet-300" />Your name</span>
                      <input id="contact-name" required name="name" autoComplete="name" className={fieldClass} placeholder="How should I address you?" />
                    </label>
                    <label className="group text-xs font-semibold text-slate-400" htmlFor="contact-email">
                      <span className="flex items-center gap-2"><AtSign className="size-3.5 text-blue-300" />Email address</span>
                      <input id="contact-email" required name="email" type="email" autoComplete="email" className={fieldClass} placeholder="you@example.com" />
                    </label>
                  </div>

                  <label className="mt-5 block text-xs font-semibold text-slate-400" htmlFor="contact-subject">
                    <span className="flex items-center gap-2"><MessageSquareText className="size-3.5 text-cyan-300" />Subject</span>
                    <input id="contact-subject" required name="subject" className={fieldClass} placeholder="What would you like to build?" />
                  </label>

                  <label className="mt-5 block text-xs font-semibold text-slate-400" htmlFor="contact-message">
                    <span className="flex items-center justify-between gap-2"><span className="flex items-center gap-2"><Mail className="size-3.5 text-violet-300" />Project brief</span><span className="font-mono text-[8px] font-normal uppercase tracking-widest text-slate-700">Required</span></span>
                    <textarea id="contact-message" required name="message" rows={5} className={`${fieldClass} resize-none`} placeholder="Share a few details about the idea, timeline, and desired outcome..." />
                  </label>

                  <motion.button
                    whileHover={{ y: -2, scale: 1.01 }}
                    whileTap={{ scale: .985 }}
                    type="submit"
                    className="group relative mt-6 inline-flex h-13 w-full items-center justify-center gap-3 overflow-hidden rounded-2xl border border-violet-300/25 bg-[linear-gradient(110deg,#6d28d9,#4338ca_52%,#0891b2)] px-6 font-mono text-xs font-semibold uppercase tracking-[.08em] text-white shadow-[0_12px_36px_rgba(91,33,182,.32),0_0_26px_rgba(59,130,246,.14),inset_0_1px_0_rgba(255,255,255,.2)] transition-[border-color,box-shadow] hover:border-cyan-200/45 hover:shadow-[0_15px_42px_rgba(91,33,182,.42),0_0_32px_rgba(34,211,238,.22)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/80"
                  >
                    <span className="absolute inset-y-[-50%] left-[-25%] w-1/4 -skew-x-12 bg-gradient-to-r from-transparent via-white/25 to-transparent blur-sm transition-transform duration-700 group-hover:translate-x-[520%]" />
                    <span aria-live="polite">{sent ? "Opening your email app…" : "Transmit message"}</span>
                    <span className="grid size-7 place-items-center rounded-lg border border-white/15 bg-white/10 transition-transform group-hover:translate-x-1"><Send className="size-3.5" /></span>
                  </motion.button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
