"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import QRCode from "react-qr-code";

// ── Types ────────────────────────────────────────────────────────────────────

interface SocialLink {
  label: string;
  username: string;
  url: string;
  icon: React.ReactNode;
  color: string;
  featured?: boolean;
}

interface LinkGroup {
  heading: string;
  links: SocialLink[];
}

// ── Link Data ────────────────────────────────────────────────────────────────

const linkGroups: LinkGroup[] = [
  {
    heading: "Social Media",
    links: [
      {
        label: "YouTube",
        username: "@CodewithMohsin1",
        url: "https://www.youtube.com/@CodewithMohsin1",
        color: "#FF0000",
        featured: true,
        icon: (
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
          </svg>
        ),
      },
      {
        label: "Instagram",
        username: "@mohsinraza3541",
        url: "https://www.instagram.com/mohsinraza3541/",
        color: "#E4405F",
        icon: (
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162S8.597 18.163 12 18.163s6.162-2.759 6.162-6.162S15.403 5.838 12 5.838zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
          </svg>
        ),
      },
      {
        label: "Facebook",
        username: "mohsin.raza.166438",
        url: "https://www.facebook.com/mohsin.raza.166438",
        color: "#1877F2",
        icon: (
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
        ),
      },
      {
        label: "Twitter / X",
        username: "@raza75828",
        url: "https://x.com/raza75828",
        color: "#ffffff",
        icon: (
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.741l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        ),
      },
      {
        label: "Threads",
        username: "@mohsinraza3541",
        url: "https://www.threads.com/@mohsinraza3541",
        color: "#aaaaaa",
        icon: (
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
            <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.858-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.783 3.631 2.698 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.964-.065-1.19.408-2.285 1.33-3.082.88-.76 2.119-1.207 3.583-1.291a13.853 13.853 0 0 1 3.02.142c-.126-.742-.375-1.332-.75-1.757-.513-.586-1.312-.883-2.371-.887h-.018c-.796 0-1.583.214-2.491.675l-.928-1.808c1.287-.661 2.445-.995 3.544-.995h.023c1.6.006 2.884.513 3.717 1.468.787.905 1.157 2.156 1.1 3.718a7.233 7.233 0 0 1 1.588 1.214c.981 1.044 1.526 2.396 1.526 3.907-.001 3.633-2.905 6.343-7.066 6.371zM10.77 13.86c-.027-.002-.056-.004-.084-.004-1.624.087-2.428.882-2.386 1.871.038.895.789 1.538 1.945 1.538.07 0 .14-.002.21-.006.971-.053 1.647-.42 2.01-1.09.314-.579.461-1.395.428-2.427a11.765 11.765 0 0 0-2.123.118z" />
          </svg>
        ),
      },
      {
        label: "LinkedIn",
        username: "Mohsin Raza",
        url: "https://www.linkedin.com/in/mohsin-raza-a514392b6/",
        color: "#0A66C2",
        icon: (
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
        ),
      },
    ],
  },
  {
    heading: "Contact & Chat",
    links: [
      {
        label: "WhatsApp",
        username: "Chat with me",
        url: "https://wa.me/923452615590",
        color: "#25D366",
        icon: (
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
          </svg>
        ),
      },
      {
        label: "WhatsApp Channel",
        username: "Follow my channel",
        url: "https://www.whatsapp.com/channel/0029VbAREQZDDmFZxWSUQS1o",
        color: "#25D366",
        icon: (
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
            <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.975-1.418A9.953 9.953 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18a7.95 7.95 0 0 1-4.073-1.117l-.29-.173-3.005.857.842-3.083-.19-.298A7.942 7.942 0 0 1 4 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8zm4.406-5.965c-.234-.117-1.385-.683-1.6-.761-.214-.078-.37-.117-.527.117-.156.234-.605.761-.741.917-.137.156-.273.176-.508.059-.234-.117-.99-.365-1.885-1.164-.697-.622-1.168-1.39-1.305-1.624-.136-.234-.014-.36.102-.477.105-.104.234-.273.352-.41.117-.136.156-.234.234-.39.078-.157.039-.293-.02-.41-.059-.117-.527-1.27-.722-1.738-.19-.457-.383-.394-.527-.402l-.449-.008c-.156 0-.41.059-.625.293-.214.234-.82.8-.82 1.953s.84 2.266.957 2.422c.117.156 1.652 2.52 4.003 3.535.56.242 1.996.644 2.65.695.654.05 1.366-.234 1.56-.508.195-.273.195-.508.136-.558-.058-.059-.214-.117-.449-.234z" />
          </svg>
        ),
      },
    ],
  },
  {
    heading: "Dev & Web",
    links: [
      {
        label: "GitHub",
        username: "@Mohsinraza23",
        url: "https://github.com/Mohsinraza23",
        color: "#f0f6fc",
        icon: (
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
            <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
          </svg>
        ),
      },
      {
        label: "Website",
        username: "technova-zeta.vercel.app",
        url: "https://technova-zeta.vercel.app/",
        color: "#00ff88",
        icon: (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
            <circle cx="12" cy="12" r="10" />
            <line x1="2" y1="12" x2="22" y2="12" />
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
          </svg>
        ),
      },
    ],
  },
];

const stats = [
  { label: "Subscribers", value: 5000, suffix: "+" },
  { label: "Videos", value: 150, suffix: "+" },
  { label: "Projects", value: 20, suffix: "+" },
];

// ── Skills Data ───────────────────────────────────────────────────────────────
const skills = [
  { name: "Claude Code", pct: 95, color: "#00ff88" },
  { name: "OpenAI / Tools", pct: 90, color: "#00ccff" },
  { name: "Agentic AI", pct: 93, color: "#c084fc" },
  { name: "Next.js", pct: 90, color: "#94a3b8" },
  { name: "Python", pct: 96, color: "#3b82f6" },
  { name: "AI / ML", pct: 80, color: "#f59e0b" },
];

// ── Skills Section ────────────────────────────────────────────────────────────

function SkillsSection({ light }: { light?: boolean }) {
  const [animated, setAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setAnimated(true); observer.disconnect(); }
    }, { threshold: 0.2 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="w-full flex flex-col gap-2.5 animate-fade-in-up"
      style={{ animationDelay: "0.9s", animationFillMode: "both" }}>
      <div className="flex items-center gap-3 px-1">
        <span className="section-label text-slate-500">Skills</span>
        <div className="flex-1 h-px" style={{ background: "rgba(0,255,136,0.1)" }} />
      </div>
      <div className="glass rounded-2xl p-5 w-full flex flex-col gap-4"
        style={{ border: "1px solid rgba(0,255,136,0.15)" }}>
        {skills.map(skill => (
          <div key={skill.name} className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <span className="text-xs font-mono font-semibold" style={{ color: light ? "#1e293b" : "#ffffff" }}>{skill.name}</span>
              <span className="text-xs font-mono font-bold" style={{ color: light && skill.color === "#94a3b8" ? "#64748b" : skill.color }}>{skill.pct}%</span>
            </div>
            <div className="w-full rounded-full h-2"
              style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.04)" }}>
              <div className="h-full rounded-full" style={{
                width: animated ? `${skill.pct}%` : "0%",
                background: `linear-gradient(90deg, ${skill.color}, ${skill.color}99)`,
                boxShadow: `0 0 8px ${skill.color}66`,
                transition: "width 1.4s cubic-bezier(0.4,0,0.2,1)",
              }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Contact Form ──────────────────────────────────────────────────────────────

function ContactForm() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [msg, setMsg] = useState("");
  const [sent, setSent] = useState(false);

  function handleWhatsApp() {
    if (!msg.trim()) return;
    const text = name.trim()
      ? `Hi Mohsin! I'm ${name.trim()}. ${msg.trim()}`
      : `Hi Mohsin! ${msg.trim()}`;
    window.open(`https://wa.me/923452615590?text=${encodeURIComponent(text)}`, "_blank");
    setSent(true);
    setTimeout(() => { setSent(false); setName(""); setMsg(""); setOpen(false); }, 2500);
  }

  function handleEmail() {
    if (!msg.trim()) return;
    const subj = name.trim() ? `Message from ${name.trim()}` : "Message from Visitor";
    window.open(`mailto:mohsinraza2248@gmail.com?subject=${encodeURIComponent(subj)}&body=${encodeURIComponent(msg.trim())}`, "_blank");
  }

  return (
    <div className="w-full animate-fade-in-up" style={{ animationDelay: "1.55s", animationFillMode: "both" }}>
      <div className="flex items-center gap-3 px-1 mb-2.5">
        <span className="section-label text-slate-500">Contact</span>
        <div className="flex-1 h-px" style={{ background: "rgba(0,255,136,0.1)" }} />
      </div>
      <div className="glass rounded-2xl w-full overflow-hidden" style={{ border: "1px solid rgba(0,255,136,0.15)" }}>
        <button onClick={() => setOpen(o => !o)}
          className="w-full flex items-center gap-4 px-5 py-4"
          style={{ background: "rgba(0,255,136,0.03)", transition: "background 0.2s" }}
          onMouseEnter={e => (e.currentTarget.style.background = "rgba(0,255,136,0.07)")}
          onMouseLeave={e => (e.currentTarget.style.background = "rgba(0,255,136,0.03)")}>
          <span className="flex items-center justify-center w-10 h-10 rounded-lg flex-shrink-0"
            style={{ background: "rgba(0,255,136,0.12)", border: "1px solid rgba(0,255,136,0.25)" }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="#00ff88" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          </span>
          <div className="flex-1 text-left">
            <p className="text-sm font-bold text-white font-mono">Send a Message</p>
            <p className="text-xs font-mono mt-0.5 text-slate-500">via WhatsApp or Email</p>
          </div>
          <svg viewBox="0 0 24 24" fill="none" stroke="#00ff88" strokeWidth="2" strokeLinecap="round" className="w-4 h-4 flex-shrink-0"
            style={{ transition: "transform 0.3s", transform: open ? "rotate(180deg)" : "rotate(0deg)", opacity: 0.7 }}>
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>

        <div style={{ maxHeight: open ? "500px" : "0px", overflow: "hidden", transition: "max-height 0.45s cubic-bezier(0.4,0,0.2,1)" }}>
          <div className="px-5 pb-5 flex flex-col gap-3" style={{ borderTop: "1px solid rgba(0,255,136,0.08)" }}>
            {sent ? (
              <div className="py-8 flex flex-col items-center gap-3">
                <span className="text-3xl" style={{ color: "#00ff88" }}>✓</span>
                <p className="text-sm font-mono font-semibold" style={{ color: "#00ff88" }}>Message sent on WhatsApp!</p>
              </div>
            ) : (
              <>
                <input value={name} onChange={e => setName(e.target.value)}
                  placeholder="Your name (optional)"
                  className="w-full rounded-xl px-4 py-2.5 text-sm font-mono text-white placeholder-slate-600 outline-none"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(0,255,136,0.15)", marginTop: 12 }} />
                <textarea value={msg} onChange={e => setMsg(e.target.value)}
                  placeholder="Your message..."
                  rows={3}
                  className="w-full rounded-xl px-4 py-2.5 text-sm font-mono text-white placeholder-slate-600 outline-none resize-none"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(0,255,136,0.15)" }} />
                <div className="flex gap-2">
                  <button onClick={handleWhatsApp}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-mono font-semibold"
                    style={{ background: "rgba(37,211,102,0.15)", border: "1px solid rgba(37,211,102,0.4)", color: "#25D366", transition: "all 0.2s" }}>
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
                    </svg>
                    WhatsApp
                  </button>
                  <button onClick={handleEmail}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-mono font-semibold"
                    style={{ background: "rgba(0,255,136,0.08)", border: "1px solid rgba(0,255,136,0.3)", color: "#00ff88", transition: "all 0.2s" }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                    Email
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Animated Counter ─────────────────────────────────────────────────────────

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      let start = 0;
      const step = Math.ceil(target / (1400 / 16));
      timerRef.current = setInterval(() => {
        start += step;
        if (start >= target) {
          setCount(target);
          clearInterval(timerRef.current!);
        } else {
          setCount(start);
        }
      }, 16);
    });
    if (ref.current) observer.observe(ref.current);
    return () => {
      observer.disconnect();
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [target]);

  // Only show K format once count actually reaches 1000+
  const display = count >= 1000 ? `${(count / 1000).toFixed(1)}K` : count;

  return <span ref={ref}>{display}{suffix}</span>;
}

// ── Typing animation ─────────────────────────────────────────────────────────

const TYPING_TEXTS = ["Creator · Dev · Educator", "Building with AI & Code", "Sharing knowledge daily"];

function useTypingText(speed = 65, pause = 2000) {
  const [displayed, setDisplayed] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = TYPING_TEXTS[textIndex];
    let timeout: ReturnType<typeof setTimeout>;
    if (!deleting && charIndex < current.length) {
      timeout = setTimeout(() => setCharIndex(c => c + 1), speed);
    } else if (!deleting && charIndex === current.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIndex > 0) {
      timeout = setTimeout(() => setCharIndex(c => c - 1), speed / 2);
    } else {
      setDeleting(false);
      setTextIndex(i => (i + 1) % TYPING_TEXTS.length);
    }
    setDisplayed(current.slice(0, charIndex));
    return () => clearTimeout(timeout);
  }, [charIndex, deleting, textIndex, speed, pause]);

  return displayed;
}

// ── Toast ────────────────────────────────────────────────────────────────────

interface Toast { id: number; label: string; color: string }

function ToastContainer({ toasts }: { toasts: Toast[] }) {
  return (
    <div className="fixed top-5 left-1/2 z-50 flex flex-col gap-2 pointer-events-none"
      style={{ transform: "translateX(-50%)", width: "max-content", maxWidth: "calc(100vw - 32px)" }}>
      {toasts.map(t => (
        <div key={t.id}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium shadow-lg"
          style={{
            background: "rgba(0,0,0,0.85)",
            border: `1px solid ${t.color}66`,
            color: "#fff",
            backdropFilter: "blur(12px)",
            animation: "toastIn 0.3s ease forwards",
            boxShadow: `0 0 20px ${t.color}33`,
          }}>
          <span style={{ color: t.color, fontSize: 16 }}>↗</span>
          Opening {t.label}...
        </div>
      ))}
    </div>
  );
}

// ── Matrix Rain ──────────────────────────────────────────────────────────────

function MatrixRain({ hide }: { hide: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const cols = Math.floor(canvas.width / 20);
    const drops = Array(cols).fill(1);
    const chars = "01アイウエオカキクケコサシスセソ";

    const draw = () => {
      ctx.fillStyle = "rgba(0,0,0,0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "rgba(0,255,136,0.12)";
      ctx.font = "13px monospace";

      drops.forEach((y, i) => {
        const char = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(char, i * 20, y * 20);
        if (y * 20 > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      });
    };

    const interval = setInterval(draw, 60);
    const onResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);
    return () => { clearInterval(interval); window.removeEventListener("resize", onResize); };
  }, []);

  if (hide) return null;
  return (
    <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" style={{ opacity: 0.4 }} />
  );
}

// ── Glowing Orbs ─────────────────────────────────────────────────────────────

function GlowOrbs() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <div className="absolute rounded-full"
        style={{ width: 500, height: 500, top: "-15%", left: "-10%", background: "radial-gradient(circle, rgba(0,255,136,0.08) 0%, transparent 70%)", animation: "float 8s ease-in-out infinite" }} />
      <div className="absolute rounded-full"
        style={{ width: 400, height: 400, bottom: "10%", right: "-10%", background: "radial-gradient(circle, rgba(0,204,255,0.07) 0%, transparent 70%)", animation: "float 10s ease-in-out infinite", animationDelay: "3s" }} />
      <div className="absolute rounded-full"
        style={{ width: 300, height: 300, top: "40%", right: "20%", background: "radial-gradient(circle, rgba(0,255,136,0.05) 0%, transparent 70%)", animation: "float 7s ease-in-out infinite", animationDelay: "1.5s" }} />
    </div>
  );
}

// ── Ripple Button ─────────────────────────────────────────────────────────────

function LinkButton({ link, onToast, light }: { link: SocialLink; onToast: (label: string, color: string) => void; light?: boolean }) {
  const btnRef = useRef<HTMLAnchorElement>(null);
  const [copiedUrl, setCopiedUrl] = useState(false);

  // Fix invisible light-colored icons in light mode
  const displayColor = light
    ? (link.color === "#ffffff" || link.color === "#f0f6fc" || link.color === "#aaaaaa"
      ? "#374151" : link.color)
    : link.color;

  function handleCopy(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(link.url).then(() => {
      setCopiedUrl(true);
      setTimeout(() => setCopiedUrl(false), 2000);
    });
  }

  function handleClick(e: React.MouseEvent<HTMLAnchorElement>) {
    const btn = btnRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const ripple = document.createElement("span");
    const size = Math.max(rect.width, rect.height);
    ripple.style.cssText = `position:absolute;width:${size}px;height:${size}px;
      left:${e.clientX - rect.left - size / 2}px;top:${e.clientY - rect.top - size / 2}px;
      background:rgba(0,255,136,0.15);border-radius:50%;transform:scale(0);
      animation:ripple 0.6s linear;pointer-events:none;`;
    btn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 650);
    onToast(link.label, link.color);
  }

  if (link.featured) {
    return (
      <a ref={btnRef} href={link.url} target="_blank" rel="noopener noreferrer"
        onClick={handleClick}
        className="group block rounded-2xl p-5 relative overflow-hidden cursor-pointer"
        style={{
          background: "linear-gradient(135deg, rgba(255,0,0,0.14), rgba(200,0,0,0.08))",
          border: "1px solid rgba(255,60,60,0.35)",
          transition: "all 0.3s ease",
        }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)";
          (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 32px rgba(255,0,0,0.25)";
          (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,60,60,0.7)";
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
          (e.currentTarget as HTMLElement).style.boxShadow = "none";
          (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,60,60,0.35)";
        }}>
        {/* Shimmer sweep */}
        <div className="absolute inset-0 pointer-events-none"
          style={{
            background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.06) 50%, transparent 60%)",
            backgroundSize: "200% 100%",
            animation: "shimmer 3s infinite",
          }} />
        <div className="flex items-center gap-4">
          <span className="flex items-center justify-center w-12 h-12 rounded-xl flex-shrink-0"
            style={{ background: "rgba(255,0,0,0.18)", border: "1px solid rgba(255,0,0,0.35)", color: "#FF0000" }}>
            {link.icon}
          </span>
          <div className="flex-1 text-left">
            <div className="flex items-center gap-2 flex-wrap">
              <p className="link-label text-white">{link.label}</p>
              <span className="text-[9px] font-mono px-2 py-0.5 rounded-full uppercase tracking-wider"
                style={{ background: "rgba(255,0,0,0.18)", border: "1px solid rgba(255,60,60,0.3)", color: "#ff7777" }}>
                Subscribe
              </span>
            </div>
            <p className="text-xs font-mono mt-0.5" style={{ color: "rgba(255,100,100,0.7)" }}>{link.username}</p>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <button onClick={handleCopy}
              title="Copy link"
              className="flex items-center justify-center w-7 h-7 rounded-lg opacity-40 group-hover:opacity-100"
              style={{ background: copiedUrl ? "rgba(255,68,68,0.2)" : "rgba(255,255,255,0.08)", border: copiedUrl ? "1px solid rgba(255,68,68,0.5)" : "1px solid rgba(255,255,255,0.12)", transition: "all 0.2s" }}>
              {copiedUrl ? (
                <svg viewBox="0 0 24 24" fill="none" stroke="#FF4444" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" stroke="#FF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5" style={{ opacity: 0.7 }}>
                  <rect x="9" y="9" width="13" height="13" rx="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
              )}
            </button>
            <svg viewBox="0 0 24 24" fill="none" stroke="#FF4444" strokeWidth="2" className="w-5 h-5 opacity-70 flex-shrink-0 transition-transform group-hover:translate-x-1">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </a>
    );
  }

  return (
    <a ref={btnRef} href={link.url} target="_blank" rel="noopener noreferrer"
      onClick={handleClick}
      className="group block rounded-xl px-5 py-4 relative overflow-hidden cursor-pointer"
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(0,255,136,0.1)",
        backdropFilter: "blur(16px)",
        transition: "all 0.3s ease",
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
        (e.currentTarget as HTMLElement).style.borderColor = `${displayColor}88`;
        (e.currentTarget as HTMLElement).style.boxShadow = `0 6px 24px ${displayColor}22`;
        (e.currentTarget as HTMLElement).style.background = light ? `#ffffff` : `${displayColor}08`;
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
        (e.currentTarget as HTMLElement).style.borderColor = light ? "rgba(0,0,0,0.07)" : "rgba(0,255,136,0.1)";
        (e.currentTarget as HTMLElement).style.boxShadow = light ? "0 2px 12px rgba(0,0,0,0.06)" : "none";
        (e.currentTarget as HTMLElement).style.background = light ? "#ffffff" : "rgba(255,255,255,0.03)";
      }}>
      {/* Shimmer */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.04) 50%, transparent 60%)",
          backgroundSize: "200% 100%",
          animation: "shimmer 3.5s infinite",
        }} />
      <div className="flex items-center gap-4">
        <span className="flex items-center justify-center w-10 h-10 rounded-lg flex-shrink-0"
          style={{ background: displayColor + "18", border: `1px solid ${displayColor}44`, color: displayColor }}>
          {link.icon}
        </span>
        <div className="flex-1 text-left">
          <p className="link-label text-white">{link.label}</p>
          <p className="link-sub text-slate-500 mt-0.5">{link.username}</p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <button onClick={handleCopy}
            title="Copy link"
            className="flex items-center justify-center w-7 h-7 rounded-lg opacity-40 group-hover:opacity-100"
            style={{ background: copiedUrl ? `${displayColor}22` : "rgba(255,255,255,0.06)", border: copiedUrl ? `1px solid ${displayColor}66` : "1px solid rgba(255,255,255,0.1)", transition: "all 0.2s" }}>
            {copiedUrl ? (
              <svg viewBox="0 0 24 24" fill="none" stroke={displayColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke={displayColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5" style={{ opacity: 0.6 }}>
                <rect x="9" y="9" width="13" height="13" rx="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
            )}
          </button>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
            className="w-4 h-4 flex-shrink-0 transition-transform group-hover:translate-x-1"
            style={{ color: link.color + "66" }}>
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </a>
  );
}

// ── Certifications Panel ──────────────────────────────────────────────────────

const certGroups = [
  {
    label: "PIAIC",
    color: "#00ff88",
    certs: [
      { src: "/certificates/piaic.jpg", title: "Agentic AI Level 1 Developer", date: "Jan 30, 2026" },
      { src: "/certificates/piaic2.jpg", title: "Agentic AI Level 1 Developer", date: "Jan 30, 2026" },
    ],
  },
  {
    label: "Microsoft",
    color: "#0099ff",
    certs: [
      { src: "/certificates/microsoft-azure.png", title: "Azure AI Engineer Associate", date: "May 1, 2026" },
      { src: "/certificates/microsoft.jpg", title: "Introduction to GitHub Copilot", date: "Jun 6, 2024" },
    ],
  },
  {
    label: "Others",
    color: "#aaaaaa",
    certs: [
      { src: "/certificates/kodekloud-docker.png", title: "Docker for Beginners — KodeKloud", date: "Jan 25, 2026" },
      { src: "/certificates/codsoft.jpg", title: "Web Development Internship", date: "May 3, 2024" },
      { src: "/certificates/coursera.jpg", title: "TypeScript Arrays — Coursera", date: "May 2, 2024" },
      { src: "/certificates/greatlearning.jpg", title: "Intro to TypeScript — Great Learning", date: "Apr 2024" },
      { src: "/certificates/proprofs.jpg", title: "TypeScript Test 100/100 — ProProfs", date: "May 23, 2024" },
    ],
  },
];

function CertificationsPanel() {
  const [open, setOpen] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  return (
    <>
      {/* Fullscreen preview */}
      {preview && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.92)", backdropFilter: "blur(12px)" }}
          onClick={() => setPreview(null)}>
          <Image src={preview} alt="Certificate preview"
            width={0} height={0} sizes="100vw"
            style={{ maxWidth: "100%", maxHeight: "90vh", width: "auto", height: "auto", borderRadius: 12, boxShadow: "0 0 60px rgba(0,255,136,0.2)" }}
            onClick={e => e.stopPropagation()} />
          <button onClick={() => setPreview(null)}
            className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center text-white text-lg"
            style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)" }}>
            ✕
          </button>
        </div>
      )}

      <div className="w-full animate-fade-in-up" style={{ animationDelay: "1.5s", animationFillMode: "both" }}>
        {/* Section label */}
        <div className="flex items-center gap-3 px-1 mb-2.5">
          <span className="section-label text-slate-500">Certifications</span>
          <div className="flex-1 h-px" style={{ background: "rgba(0,255,136,0.1)" }} />
        </div>

        {/* Main card — same glass style as profile card */}
        <div className="glass rounded-2xl w-full overflow-hidden"
          style={{ border: "1px solid rgba(0,255,136,0.15)" }}>

          {/* Header row — clickable toggle */}
          <button
            onClick={() => setOpen(o => !o)}
            className="w-full flex items-center gap-4 px-5 py-4 text-left"
            style={{ background: "rgba(0,255,136,0.03)", transition: "background 0.2s" }}
            onMouseEnter={e => (e.currentTarget.style.background = "rgba(0,255,136,0.07)")}
            onMouseLeave={e => (e.currentTarget.style.background = "rgba(0,255,136,0.03)")}>

            {/* Trophy icon */}
            <span className="flex items-center justify-center w-10 h-10 rounded-lg flex-shrink-0"
              style={{ background: "rgba(0,255,136,0.12)", border: "1px solid rgba(0,255,136,0.25)" }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="#00ff88" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                <path d="M6 9H4a2 2 0 0 1-2-2V5h4" />
                <path d="M18 9h2a2 2 0 0 0 2-2V5h-4" />
                <path d="M12 17c-3.314 0-6-2.686-6-6V3h12v8c0 3.314-2.686 6-6 6z" />
                <path d="M8 21h8M12 17v4" />
              </svg>
            </span>

            <div className="flex-1">
              <p className="text-sm font-bold text-white font-mono" style={{ textShadow: "0 0 16px rgba(0,255,136,0.3)" }}>
                My Certifications
              </p>
              <p className="text-xs font-mono mt-0.5 text-slate-500">9 certificates earned</p>
            </div>

            {/* Chevron */}
            <svg viewBox="0 0 24 24" fill="none" stroke="#00ff88" strokeWidth="2" strokeLinecap="round" className="w-4 h-4 flex-shrink-0"
              style={{ transition: "transform 0.3s", transform: open ? "rotate(180deg)" : "rotate(0deg)", opacity: 0.7 }}>
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>

          {/* Expandable body */}
          <div style={{
            maxHeight: open ? "20000px" : "0px",
            overflow: "hidden",
            transition: "max-height 0.5s cubic-bezier(0.4,0,0.2,1)",
          }}>
            <div className="px-4 pb-4 flex flex-col gap-5"
              style={{ borderTop: "1px solid rgba(0,255,136,0.08)" }}>

              {certGroups.map(group => (
                <div key={group.label} className="flex flex-col gap-2 pt-4">

                  {/* Group label */}
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ background: group.color, boxShadow: `0 0 6px ${group.color}` }} />
                    <span className="text-[10px] font-bold font-mono uppercase tracking-widest"
                      style={{ color: group.color }}>
                      {group.label}
                    </span>
                    <div className="flex-1 h-px" style={{ background: `${group.color}22` }} />
                  </div>

                  {/* Cert cards */}
                  {group.certs.map(cert => (
                    <div key={cert.src} onClick={() => setPreview(cert.src)}
                      className="w-full rounded-xl relative group cursor-pointer"
                      style={{ border: `1px solid ${group.color}22`, transition: "all 0.25s", overflow: "visible" }}
                      onMouseEnter={e => {
                        (e.currentTarget as HTMLElement).style.border = `1px solid ${group.color}55`;
                        (e.currentTarget as HTMLElement).style.boxShadow = `0 4px 20px ${group.color}15`;
                      }}
                      onMouseLeave={e => {
                        (e.currentTarget as HTMLElement).style.border = `1px solid ${group.color}22`;
                        (e.currentTarget as HTMLElement).style.boxShadow = "none";
                      }}>
                      <Image src={cert.src} alt={cert.title}
                        width={0} height={0} sizes="100vw"
                        style={{ width: "100%", height: "auto", display: "block", borderRadius: "0.75rem" }} />
                      {/* Hover overlay */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100"
                        style={{ background: "rgba(0,0,0,0.45)", transition: "opacity 0.2s", borderRadius: "0.75rem" }}>
                        <span className="text-xs font-mono text-white px-3 py-1.5 rounded-full"
                          style={{ background: "rgba(0,0,0,0.6)", border: "1px solid rgba(255,255,255,0.2)" }}>
                          View Full
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// ── Projects Data & Section ───────────────────────────────────────────────────

const projects = [
  {
    name: "AI Agent Factory",
    description: "Agentic AI platform that builds and manages autonomous AI agents for real-world task automation.",
    tech: ["Agentic AI", "Next.js", "TypeScript"],
    live: "https://the-ai-agent-factory-paradigm.vercel.app/",
    github: "https://github.com/Mohsinraza23",
    color: "#00ff88",
  },
  {
    name: "Aqareo",
    description: "Modern real estate platform to browse, list and discover properties with a clean UI.",
    tech: ["Next.js", "Tailwind", "TypeScript"],
    live: "https://aqareo.vercel.app/",
    github: "https://github.com/Mohsinraza23",
    color: "#f59e0b",
  },
  {
    name: "AI Employee Dashboard",
    description: "Smart AI-powered HR dashboard for managing employees, analytics and performance overview.",
    tech: ["Next.js", "AI", "TypeScript"],
    live: "https://ai-employee-dashboard-nine.vercel.app/dashboard/overview",
    github: "https://github.com/Mohsinraza23",
    color: "#00ccff",
  },
  {
    name: "E-Commerce Store",
    description: "Full-featured online store with product listings, cart and checkout — built as Milestone 3.",
    tech: ["Next.js", "Tailwind", "TypeScript"],
    live: "https://milestone-3-nine-drab.vercel.app/",
    github: "https://github.com/Mohsinraza23",
    color: "#c084fc",
  },
  {
    name: "Figma Hackathon",
    description: "Pixel-perfect UI implementation from a Figma design, built during a hackathon challenge.",
    tech: ["Next.js", "Tailwind", "Figma"],
    live: "https://figma-hackathone-sandy.vercel.app/",
    github: "https://github.com/Mohsinraza23",
    color: "#f472b6",
  },
];

function ProjectsSection() {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full animate-fade-in-up" style={{ animationDelay: "1.55s", animationFillMode: "both" }}>
      {/* Section label */}
      <div className="flex items-center gap-3 px-1 mb-2.5">
        <span className="section-label text-slate-500">Projects</span>
        <div className="flex-1 h-px" style={{ background: "rgba(0,255,136,0.1)" }} />
      </div>

      <div className="glass rounded-2xl w-full overflow-hidden" style={{ border: "1px solid rgba(0,255,136,0.15)" }}>

        {/* Header toggle */}
        <button
          onClick={() => setOpen(o => !o)}
          className="w-full flex items-center gap-4 px-5 py-4 text-left"
          style={{ background: "rgba(0,255,136,0.03)", transition: "background 0.2s" }}
          onMouseEnter={e => (e.currentTarget.style.background = "rgba(0,255,136,0.07)")}
          onMouseLeave={e => (e.currentTarget.style.background = "rgba(0,255,136,0.03)")}>

          {/* Code icon */}
          <span className="flex items-center justify-center w-10 h-10 rounded-lg flex-shrink-0"
            style={{ background: "rgba(0,255,136,0.12)", border: "1px solid rgba(0,255,136,0.25)" }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="#00ff88" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
              <polyline points="16 18 22 12 16 6" />
              <polyline points="8 6 2 12 8 18" />
            </svg>
          </span>

          <div className="flex-1">
            <p className="text-sm font-bold text-white font-mono" style={{ textShadow: "0 0 16px rgba(0,255,136,0.3)" }}>
              My Projects
            </p>
            <p className="text-xs font-mono mt-0.5 text-slate-500">{projects.length} projects — all live on Vercel</p>
          </div>

          {/* Chevron */}
          <svg viewBox="0 0 24 24" fill="none" stroke="#00ff88" strokeWidth="2" strokeLinecap="round" className="w-4 h-4 flex-shrink-0"
            style={{ transition: "transform 0.3s", transform: open ? "rotate(180deg)" : "rotate(0deg)", opacity: 0.7 }}>
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>

        {/* Expandable body */}
        <div style={{
          maxHeight: open ? "2000px" : "0px",
          overflow: "hidden",
          transition: "max-height 0.5s cubic-bezier(0.4,0,0.2,1)",
        }}>
          <div className="px-4 pb-4 flex flex-col gap-3"
            style={{ borderTop: "1px solid rgba(0,255,136,0.08)" }}>

            {projects.map(project => (
              <div key={project.name}
                className="rounded-xl p-4 flex flex-col gap-3 mt-3"
                style={{ background: `${project.color}08`, border: `1px solid ${project.color}22` }}>

                {/* Name + description */}
                <div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{ background: project.color, boxShadow: `0 0 6px ${project.color}` }} />
                    <p className="text-sm font-bold font-mono" style={{ color: project.color }}>{project.name}</p>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed mt-1.5 ml-4">{project.description}</p>
                </div>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-1.5 ml-4">
                  {project.tech.map(t => (
                    <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded-full"
                      style={{ background: `${project.color}12`, border: `1px solid ${project.color}30`, color: project.color }}>
                      {t}
                    </span>
                  ))}
                </div>

                {/* Action buttons */}
                <div className="flex gap-2 ml-4">
                  {project.live && (
                    <a href={project.live} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-semibold"
                      style={{ background: `${project.color}18`, border: `1px solid ${project.color}44`, color: project.color, transition: "all 0.2s" }}
                      onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = `${project.color}28`}
                      onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = `${project.color}18`}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                        <polyline points="15 3 21 3 21 9" />
                        <line x1="10" y1="14" x2="21" y2="3" />
                      </svg>
                      Live Demo
                    </a>
                  )}
                  <a href={project.github} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-semibold"
                    style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)", color: "#94a3b8", transition: "all 0.2s" }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.1)"}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.05)"}>
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                    </svg>
                    GitHub
                  </a>
                </div>

              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Scroll To Top Button ──────────────────────────────────────────────────────

function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-6 right-4 z-50 w-10 h-10 rounded-full flex items-center justify-center shadow-lg"
      title="Back to top"
      style={{
        background: "rgba(0,255,136,0.15)",
        border: "1px solid rgba(0,255,136,0.4)",
        backdropFilter: "blur(12px)",
        transition: "all 0.3s",
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.background = "rgba(0,255,136,0.28)";
        (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.background = "rgba(0,255,136,0.15)";
        (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
      }}>
      <svg viewBox="0 0 24 24" fill="none" stroke="#00ff88" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M18 15l-6-6-6 6" />
      </svg>
    </button>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [lightMode, setLightMode] = useState(false);
  const [visits, setVisits] = useState(6000);
  const [copied, setCopied] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [search, setSearch] = useState("");
  const typedText = useTypingText();

  const filteredGroups = linkGroups
    .map(group => ({
      ...group,
      links: group.links.filter(
        link =>
          link.label.toLowerCase().includes(search.toLowerCase()) ||
          link.username.toLowerCase().includes(search.toLowerCase())
      ),
    }))
    .filter(group => group.links.length > 0);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const base = 6000;
    const stored = parseInt(localStorage.getItem("mohsin_visits") || "0") + 1;
    localStorage.setItem("mohsin_visits", String(stored));
    setVisits(base + stored);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", lightMode ? "light" : "dark");
  }, [lightMode]);

  function handleShare() {
    const url = "https://codewithmohsin-links.vercel.app/";
    if (navigator.share) {
      navigator.share({ title: "Mohsin Raza — Linktree", url });
    } else {
      navigator.clipboard.writeText(url).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  }

  function addToast(label: string, color: string) {
    const id = Date.now();
    setToasts(prev => [...prev, { id, label, color }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 2500);
  }

  if (!mounted) return null;

  let delay = 0;
  const nd = (step = 80) => { delay += step; return delay; };

  return (
    <>
      <style>{`
        @keyframes ripple { to { transform: scale(2.5); opacity: 0; } }
        @keyframes toastIn { from { opacity: 0; transform: translateY(-10px) scale(0.95); } to { opacity: 1; transform: translateY(0) scale(1); } }
        @keyframes shimmer { 0% { background-position: -200% center; } 100% { background-position: 200% center; } }
        @keyframes scanline { 0% { top: -5%; } 100% { top: 105%; } }
      `}</style>

      <ToastContainer toasts={toasts} />
      <ScrollToTopButton />

      {/* ── QR Code Modal ── */}
      {showQR && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(16px)" }}
          onClick={() => setShowQR(false)}>
          <div
            className="flex flex-col items-center gap-4 rounded-2xl p-6"
            style={{ background: "#0a0f0d", border: "1px solid rgba(0,255,136,0.3)", boxShadow: "0 0 60px rgba(0,255,136,0.15)", maxWidth: 280, width: "100%" }}
            onClick={e => e.stopPropagation()}>

            {/* Header */}
            <div className="flex flex-col items-center gap-1">
              <p className="text-sm font-bold font-mono text-white">Scan to Visit</p>
              <p className="text-xs font-mono" style={{ color: "rgba(0,255,136,0.6)" }}>Mohsin Raza — Linktree</p>
            </div>

            {/* QR Code */}
            <div className="p-3 rounded-xl" style={{ background: "#ffffff" }}>
              <QRCode
                value="https://codewithmohsin-links.vercel.app/"
                size={180}
                fgColor="#0a0f0d"
                bgColor="#ffffff"
              />
            </div>

            {/* URL label */}
            <p className="text-[10px] font-mono text-center" style={{ color: "rgba(0,255,136,0.5)" }}>
              codewithmohsin-links.vercel.app
            </p>

            {/* Close button */}
            <button
              onClick={() => setShowQR(false)}
              className="w-full py-2 rounded-xl text-xs font-mono font-semibold"
              style={{ background: "rgba(0,255,136,0.1)", border: "1px solid rgba(0,255,136,0.3)", color: "#00ff88", transition: "all 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.background = "rgba(0,255,136,0.2)")}
              onMouseLeave={e => (e.currentTarget.style.background = "rgba(0,255,136,0.1)")}>
              Close
            </button>
          </div>
        </div>
      )}

      {/* ── Floating Buttons: Theme + Share + QR ── */}
      <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
        {/* Dark/Light toggle */}
        <button onClick={() => setLightMode(l => !l)}
          className="w-10 h-10 rounded-full flex items-center justify-center shadow-lg"
          title={lightMode ? "Dark Mode" : "Light Mode"}
          style={{ background: lightMode ? "#1e293b" : "rgba(255,255,255,0.1)", border: lightMode ? "1px solid rgba(0,255,136,0.3)" : "1px solid rgba(255,255,255,0.15)", backdropFilter: "blur(12px)", transition: "all 0.3s" }}>
          {lightMode ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="#00ff88" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
              <circle cx="12" cy="12" r="5" />
              <line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </svg>
          )}
        </button>
        {/* Share button */}
        <button onClick={handleShare}
          className="w-10 h-10 rounded-full flex items-center justify-center shadow-lg"
          title="Share Profile"
          style={{ background: copied ? "rgba(0,255,136,0.2)" : lightMode ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.08)", border: copied ? "1px solid #00ff88" : lightMode ? "1px solid rgba(0,0,0,0.15)" : "1px solid rgba(255,255,255,0.15)", backdropFilter: "blur(12px)", transition: "all 0.3s" }}>
          {copied ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="#00ff88" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke={lightMode ? "#374151" : "#ffffff"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" style={{ opacity: 0.85 }}>
              <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
            </svg>
          )}
        </button>
        {/* QR Code button */}
        <button onClick={() => setShowQR(q => !q)}
          className="w-10 h-10 rounded-full flex items-center justify-center shadow-lg"
          title="QR Code"
          style={{
            background: showQR ? "rgba(0,255,136,0.2)" : lightMode ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.08)",
            border: showQR ? "1px solid #00ff88" : lightMode ? "1px solid rgba(0,0,0,0.15)" : "1px solid rgba(255,255,255,0.15)",
            backdropFilter: "blur(12px)",
            transition: "all 0.3s",
          }}>
          <svg viewBox="0 0 24 24" fill="none" stroke={showQR ? "#00ff88" : lightMode ? "#374151" : "#ffffff"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" style={{ opacity: showQR ? 1 : 0.85 }}>
            <rect x="3" y="3" width="7" height="7" rx="1" />
            <rect x="14" y="3" width="7" height="7" rx="1" />
            <rect x="3" y="14" width="7" height="7" rx="1" />
            <rect x="14" y="14" width="3" height="3" />
            <rect x="18" y="14" width="3" height="3" />
            <rect x="14" y="18" width="3" height="3" />
            <rect x="18" y="18" width="3" height="3" />
          </svg>
        </button>
      </div>

      <main className={`relative min-h-screen bg-grid flex items-start justify-center py-12 px-4 ${lightMode ? "light-mode" : "bg-black"}`}>

        {/* Matrix rain */}
        <MatrixRain hide={lightMode} />

        {/* Glow orbs — dark mode only */}
        {!lightMode && <GlowOrbs />}

        {/* Scanline effect — dark mode only */}
        {!lightMode && (
          <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            <div className="absolute w-full h-[2px] left-0"
              style={{
                background: "linear-gradient(90deg, transparent, rgba(0,255,136,0.15), transparent)",
                animation: "scanline 8s linear infinite",
              }} />
          </div>
        )}

        {/* Top radial glow — dark mode only */}
        {!lightMode && (
          <div className="fixed inset-0 pointer-events-none z-0"
            style={{ background: "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(0,255,136,0.12) 0%, transparent 70%)" }} />
        )}

        <div className="relative z-10 w-full max-w-md flex flex-col items-center gap-5">

          {/* ── Profile Card ── */}
          <div className="glass rounded-2xl p-8 w-full flex flex-col items-center gap-5 text-center animate-fade-in-up"
            style={{ animationFillMode: "both", border: "1px solid rgba(0,255,136,0.15)" }}>

            {/* Avatar */}
            <div className="relative animate-float" style={{ isolation: "isolate" }}>
              <div className="absolute inset-0 rounded-full"
                style={{
                  background: "linear-gradient(135deg, #00ff88, #00ccff, #00ff88)",
                  boxShadow: "0 0 40px rgba(0,255,136,0.6), 0 0 80px rgba(0,255,136,0.2)",
                }} />
              <div className="relative rounded-full overflow-hidden bg-[#0d1a12]"
                style={{
                  width: 136, height: 136, margin: 2,
                  transform: "translateZ(0)", willChange: "transform",
                  WebkitBackfaceVisibility: "hidden", backfaceVisibility: "hidden",
                }}>
                <Image src="/profile.png" alt="Mohsin"
                  width={136} height={136}
                  style={{
                    width: "100%", height: "100%", objectFit: "cover",
                    objectPosition: "center 20%", display: "block",
                    filter: "contrast(1.12) saturate(1.15) brightness(1.04)",
                  }} />
              </div>
              <span className="absolute bottom-2 right-2 w-4 h-4 rounded-full border-2 border-black bg-neon-green"
                style={{ boxShadow: "0 0 10px #00ff88", zIndex: 2 }} />
            </div>

            {/* Name + badge */}
            <div>
              <div className="flex items-center justify-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold neon-text tracking-tight" style={{ fontFamily: "var(--font-outfit)", letterSpacing: "-0.02em" }}>Mohsin Raza</h1>
                <svg viewBox="0 0 24 24" className="w-5 h-5 flex-shrink-0" fill="none">
                  <circle cx="12" cy="12" r="10" fill="rgba(0,255,136,0.15)" stroke="#00ff88" strokeWidth="1.5" />
                  <path d="M8 12l3 3 5-5" stroke="#00ff88" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <p className="text-xs font-mono mt-1 tracking-widest h-5" style={{ color: "rgba(0,255,136,0.65)" }}>
                &gt; <span>{typedText}</span><span className="animate-pulse">|</span>
              </p>
            </div>

            {/* Bio */}
            <p className="text-sm text-slate-400 leading-relaxed max-w-xs">
              Building the future one line of code at a time. I share tutorials,
              projects &amp; ideas on AI, web dev, and tech.
            </p>

            {/* Stats */}
            <div className="w-full grid grid-cols-3 rounded-xl overflow-hidden"
              style={{ background: "rgba(0,255,136,0.04)", border: "1px solid rgba(0,255,136,0.12)" }}>
              {stats.map((s, i) => (
                <div key={s.label}
                  className="flex flex-col items-center py-3 px-2"
                  style={{ borderRight: i < 2 ? "1px solid rgba(0,255,136,0.12)" : "none" }}>
                  <span className="text-lg font-bold font-mono neon-text">
                    <Counter target={s.value} suffix={s.suffix} />
                  </span>
                  <span className="text-[10px] text-slate-500 mt-0.5 uppercase tracking-wider">{s.label}</span>
                </div>
              ))}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap justify-center gap-2">
              {["#AI", "#WebDev", "#NextJS", "#OpenSource"].map(tag => (
                <span key={tag} className="text-xs font-mono px-2.5 py-1 rounded-full"
                  style={{ background: "rgba(0,255,136,0.08)", border: "1px solid rgba(0,255,136,0.2)", color: "#00ff88" }}>
                  {tag}
                </span>
              ))}
            </div>

            {/* Visitor Counter */}
            <div className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl"
              style={{ background: "rgba(0,255,136,0.05)", border: "1px solid rgba(0,255,136,0.12)" }}>
              <span className="w-2 h-2 rounded-full animate-pulse flex-shrink-0" style={{ background: "#00ff88", boxShadow: "0 0 6px #00ff88" }} />
              <div className="flex flex-col">
                <span className="text-xs font-mono font-bold neon-text">{visits.toLocaleString()}</span>
                <span className="text-[9px] font-mono text-slate-600 uppercase tracking-wider">Visitors</span>
              </div>
            </div>
          </div>

          {/* ── Skills ── */}
          <SkillsSection light={lightMode} />

          {/* ── Search Bar ── */}
          <div className="w-full animate-fade-in-up" style={{ animationDelay: "0.95s", animationFillMode: "both" }}>
            <div className="relative flex items-center">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                className="absolute left-3.5 w-4 h-4 pointer-events-none"
                style={{ color: "rgba(0,255,136,0.5)" }}>
                <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
              </svg>
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search links..."
                className="w-full rounded-xl pl-10 pr-10 py-2.5 text-sm font-mono outline-none"
                style={{
                  background: lightMode ? "rgba(0,0,0,0.05)" : "rgba(255,255,255,0.05)",
                  border: search ? "1px solid rgba(0,255,136,0.4)" : "1px solid rgba(0,255,136,0.15)",
                  color: lightMode ? "#1e293b" : "#ffffff",
                  backdropFilter: "blur(12px)",
                  transition: "border 0.2s",
                }}
              />
              {search && (
                <button onClick={() => setSearch("")}
                  className="absolute right-3 flex items-center justify-center w-5 h-5 rounded-full"
                  style={{ color: "rgba(0,255,136,0.6)" }}>
                  ✕
                </button>
              )}
            </div>
            {search && filteredGroups.length === 0 && (
              <p className="text-center text-xs font-mono mt-3" style={{ color: "rgba(0,255,136,0.4)" }}>
                No links found for &quot;{search}&quot;
              </p>
            )}
          </div>

          {/* ── Link Groups ── */}
          {filteredGroups.map(group => (
            <div key={group.heading} className="w-full flex flex-col gap-2.5">
              <div className="flex items-center gap-3 px-1">
                <span className="section-label text-slate-500">{group.heading}</span>
                <div className="flex-1 h-px" style={{ background: "rgba(0,255,136,0.1)" }} />
              </div>
              {group.links.map(link => {
                const d = nd();
                return (
                  <div key={link.label} className="animate-fade-in-up"
                    style={{ animationDelay: d + "ms", animationFillMode: "both" }}>
                    <LinkButton link={link} onToast={addToast} light={lightMode} />
                  </div>
                );
              })}
            </div>
          ))}

          {/* ── Contact Form ── */}
          <ContactForm />

          {/* ── Certifications Section ── */}
          <CertificationsPanel />

          {/* ── Projects Section ── */}
          <ProjectsSection />

          {/* ── Footer ── */}
          <div className="flex flex-col items-center gap-2 pb-6 animate-fade-in-up"
            style={{ animationDelay: "1.6s", animationFillMode: "both" }}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-px" style={{ background: "rgba(0,255,136,0.25)" }} />
              <span className="footer-text text-slate-600">Mohsin Raza</span>
              <div className="w-10 h-px" style={{ background: "rgba(0,255,136,0.25)" }} />
            </div>
            <p className="text-[11px] font-semibold font-mono text-slate-600 tracking-wider">
              &copy; {new Date().getFullYear()} — All rights reserved
            </p>
          </div>

        </div>
      </main>
    </>
  );
}
