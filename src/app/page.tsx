"use client";

import { useState } from "react";
import Image from "next/image";
import { Shield, Car, Home, Heart, Plane, ArrowRight, CheckCircle, Phone, Menu, X, Star, ChevronDown } from "lucide-react";

const NAVY = "#0F2B5B";
const GOLD = "#C9A84C";
const LIGHT = "#F4F7FC";
const DARK = "#0A1929";

const products = [
  {
    icon: <Car className="w-6 h-6" />,
    name: "Auto Insurance",
    tagline: "MTPL, casco, full cover",
    from: "€19",
    features: ["Third-party liability", "Optional casco", "24/7 roadside assist", "Replacement vehicle"],
    color: "#1B4F72",
    popular: false,
  },
  {
    icon: <Home className="w-6 h-6" />,
    name: "Home Insurance",
    tagline: "Property & contents",
    from: "€12",
    features: ["Building & contents", "Fire, flood, storm", "Liability cover", "Valuables rider available"],
    color: "#145A32",
    popular: false,
  },
  {
    icon: <Heart className="w-6 h-6" />,
    name: "Health Insurance",
    tagline: "Private health & dental",
    from: "€38",
    features: ["Private hospital cover", "Specialist access", "Dental & optical", "Mental health support"],
    color: NAVY,
    popular: true,
  },
  {
    icon: <Plane className="w-6 h-6" />,
    name: "Travel Insurance",
    tagline: "Per trip or annual",
    from: "€8",
    features: ["Medical abroad", "Cancellation cover", "Lost baggage", "Adventure sports optional"],
    color: "#6B3FA0",
    popular: false,
  },
];

const steps = [
  { n: "01", title: "Get a quote online", desc: "Answer a few questions. No phone call required. Instant price in 2 minutes." },
  { n: "02", title: "Choose your cover", desc: "Compare plans side by side. Adjust excess and add-ons to fit your budget." },
  { n: "03", title: "Start immediately", desc: "Pay online, receive your policy instantly. Cover begins same day." },
];

const stats = [
  { n: "€2.4B+", l: "Claims paid in 2025" },
  { n: "98.2%", l: "Claims settled in 30 days" },
  { n: "1.2M", l: "Active policyholders" },
  { n: "27yr", l: "In the Austrian market" },
];

const reviews = [
  { name: "Dr. Klaus H.", product: "Health Insurance", stars: 5, text: "Filed a claim after an emergency abroad. The team called me within an hour and settled everything in 4 days. Genuinely impressive." },
  { name: "Sandra B.", product: "Home Insurance", stars: 5, text: "Burst pipe destroyed our kitchen. ShieldCover sent an assessor next morning and paid out within the week. No arguments, no games." },
  { name: "Markus F.", product: "Auto Insurance", stars: 5, text: "Cheapest casco I found after comparing 8 providers. Had a small fender bender — claim was processed completely online in 72 hours." },
];

const faqs = [
  { q: "How quickly can I get insured?", a: "For auto, home, and travel — instantly online. Health insurance typically takes 24 hours for underwriting review." },
  { q: "What is the excess and can I change it?", a: "Yes. A higher excess lowers your premium. You can adjust excess when getting a quote or at renewal." },
  { q: "How do I make a claim?", a: "Online 24/7, by phone, or via our app. A dedicated claims handler is assigned within 2 hours on business days." },
  { q: "Can I cancel my policy?", a: "Yes, with 30 days notice at any point. We refund the unused premium pro-rata." },
];

export default function InsuranceDemo() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [quoteType, setQuoteType] = useState("Health Insurance");
  const [quoteDob, setQuoteDob] = useState("");
  const [quotePostcode, setQuotePostcode] = useState("");
  const [quoteResult, setQuoteResult] = useState<number | null>(null);
  const [contactDone, setContactDone] = useState(false);

  function calcQuote() {
    const base: Record<string, number> = { "Health Insurance": 38, "Auto Insurance": 19, "Home Insurance": 12, "Travel Insurance": 8 };
    const age = quoteDob ? new Date().getFullYear() - new Date(quoteDob).getFullYear() : 35;
    const mult = age < 26 ? 0.85 : age < 40 ? 1.0 : age < 55 ? 1.18 : 1.35;
    setQuoteResult(Math.round((base[quoteType] ?? 19) * mult));
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "white", fontFamily: "'Inter', -apple-system, sans-serif", color: DARK }}>

      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 bg-white border-b" style={{ borderColor: `${DARK}10` }}>
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: NAVY }}>
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="font-black text-lg leading-tight" style={{ color: NAVY }}>ShieldCover</div>
              <div className="text-xs font-medium" style={{ color: `${DARK}40` }}>Insurance Group Austria</div>
            </div>
          </a>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium" style={{ color: `${DARK}60` }}>
            <a href="#products" className="hover:text-gray-900 transition-colors">Products</a>
            <a href="#claims" className="hover:text-gray-900 transition-colors">Claims</a>
            <a href="#about" className="hover:text-gray-900 transition-colors">About</a>
            <a href="#contact" className="hover:text-gray-900 transition-colors">Contact</a>
          </div>
          <div className="flex items-center gap-2">
            <a href="tel:+4319876543" className="hidden md:flex items-center gap-1.5 text-sm font-medium" style={{ color: NAVY }}>
              <Phone className="w-4 h-4" /> +43 1 987 654 3
            </a>
            <a href="#quote" className="inline-flex items-center gap-2 text-sm font-bold h-10 px-5 rounded-xl text-white ml-2" style={{ backgroundColor: NAVY }}>
              Get a Quote
            </a>
            <button className="md:hidden p-2" onClick={() => setMobileOpen(true)}>
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </nav>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 bg-white flex flex-col">
          <div className="flex items-center justify-between px-6 h-16 border-b" style={{ borderColor: `${DARK}10` }}>
            <span className="font-black text-lg" style={{ color: NAVY }}>ShieldCover</span>
            <button onClick={() => setMobileOpen(false)}><X className="w-5 h-5" /></button>
          </div>
          <div className="flex flex-col px-6 pt-6">
            {["Products", "Claims", "About", "Contact"].map((l) => (
              <a key={l} href={`#${l.toLowerCase()}`} onClick={() => setMobileOpen(false)}
                className="text-2xl font-bold py-4 border-b" style={{ color: DARK, borderColor: `${DARK}10` }}>{l}</a>
            ))}
          </div>
          <div className="mt-auto px-6 pb-8">
            <a href="#quote" className="flex items-center justify-center h-12 rounded-xl font-bold text-sm text-white w-full" style={{ backgroundColor: NAVY }}>
              Get a Quote
            </a>
          </div>
        </div>
      )}

      {/* Hero */}
      <section className="pt-16" style={{ background: `linear-gradient(135deg, ${NAVY} 0%, #1A3D6B 100%)`, minHeight: "88vh" }}>
        <div className="max-w-6xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 border border-white/20 rounded-full px-4 py-2 text-xs font-semibold text-white/70 mb-8">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" /> Rated #1 for Claims · Austria 2025
            </div>
            <h1 className="text-5xl lg:text-6xl font-black text-white leading-[1.05] tracking-tight mb-6">
              Insurance you<br />
              <span style={{ color: GOLD }}>actually trust</span><br />
              when it counts.
            </h1>
            <p className="text-white/60 text-base leading-relaxed max-w-md mb-10">
              27 years serving Austrian families and businesses. 98.2% claims settled in 30 days. No small print surprises.
            </p>
            <div className="flex flex-wrap gap-3 mb-10">
              <a href="#quote" className="inline-flex items-center gap-2 font-bold h-12 px-8 rounded-xl text-sm bg-white" style={{ color: NAVY }}>
                Get a Quote <ArrowRight className="w-4 h-4" />
              </a>
              <a href="#products" className="inline-flex items-center gap-2 font-bold h-12 px-8 rounded-xl text-sm text-white border border-white/25 hover:bg-white/10 transition-colors">
                Our Products
              </a>
            </div>
            <div className="flex flex-wrap gap-4">
              {["FCA Regulated", "A+ AM Best Rating", "27 years in business"].map((t) => (
                <span key={t} className="flex items-center gap-1.5 text-xs text-white/60">
                  <CheckCircle className="w-3.5 h-3.5 text-white/30" />{t}
                </span>
              ))}
            </div>
          </div>

          {/* Quote widget */}
          <div className="bg-white rounded-2xl p-8 shadow-2xl max-w-sm mx-auto w-full">
            <h3 className="font-black text-lg mb-1" style={{ color: DARK }}>Get your instant quote</h3>
            <p className="text-sm mb-5" style={{ color: `${DARK}55` }}>No phone calls. Takes 2 minutes.</p>
            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider block mb-1.5" style={{ color: `${DARK}50` }}>Insurance type</label>
                <select value={quoteType} onChange={e => setQuoteType(e.target.value)} className="w-full h-11 rounded-xl border px-3 text-sm outline-none" style={{ borderColor: `${DARK}15`, color: DARK }}>
                  <option>Health Insurance</option>
                  <option>Auto Insurance</option>
                  <option>Home Insurance</option>
                  <option>Travel Insurance</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider block mb-1.5" style={{ color: `${DARK}50` }}>Date of birth</label>
                <input type="date" value={quoteDob} onChange={e => setQuoteDob(e.target.value)} className="w-full h-11 rounded-xl border px-3 text-sm outline-none" style={{ borderColor: `${DARK}15`, color: DARK }} />
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider block mb-1.5" style={{ color: `${DARK}50` }}>Postcode</label>
                <input value={quotePostcode} onChange={e => setQuotePostcode(e.target.value)} placeholder="e.g. 1010" className="w-full h-11 rounded-xl border px-3 text-sm outline-none placeholder-gray-300" style={{ borderColor: `${DARK}15`, color: DARK }} />
              </div>
              {quoteResult !== null && (
                <div className="rounded-xl p-4 text-center" style={{ backgroundColor: LIGHT }}>
                  <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: `${DARK}55` }}>Your estimated monthly premium</p>
                  <p className="text-4xl font-black" style={{ color: NAVY }}>€{quoteResult}</p>
                  <p className="text-xs mt-1" style={{ color: `${DARK}45` }}>Based on your profile · Final price after full application</p>
                </div>
              )}
              <button onClick={calcQuote} className="w-full h-11 rounded-xl text-sm font-bold text-white mt-2" style={{ backgroundColor: NAVY }}>
                {quoteResult !== null ? "Recalculate" : "See My Price"}
              </button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="border-t border-white/10 max-w-6xl mx-auto px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl font-black text-white mb-1">{s.n}</div>
              <div className="text-xs text-white/45">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Products */}
      <section id="products" className="py-24 px-6" style={{ backgroundColor: LIGHT }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: NAVY }}>Coverage options</p>
            <h2 className="text-4xl font-black" style={{ color: DARK }}>Our insurance products</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {products.map((p, i) => (
              <div key={i} className={`rounded-2xl p-6 relative border-2 transition-all hover:shadow-lg ${p.popular ? "border-navy-600 shadow-md" : "border-transparent bg-white"}`}
                style={{ borderColor: p.popular ? NAVY : "transparent", backgroundColor: p.popular ? undefined : "white" }}>
                {p.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="text-xs font-bold px-3 py-1 rounded-full text-white" style={{ backgroundColor: GOLD }}>Most Popular</span>
                  </div>
                )}
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white mb-4" style={{ backgroundColor: p.color }}>
                  {p.icon}
                </div>
                <h3 className="font-black text-base mb-1" style={{ color: DARK }}>{p.name}</h3>
                <p className="text-xs mb-3" style={{ color: `${DARK}50` }}>{p.tagline}</p>
                <p className="text-2xl font-black mb-4" style={{ color: NAVY }}>from {p.from}<span className="text-sm font-normal text-gray-400">/mo</span></p>
                <ul className="space-y-2 mb-5">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-xs" style={{ color: `${DARK}65` }}>
                      <CheckCircle className="w-3.5 h-3.5 shrink-0" style={{ color: NAVY }} />{f}
                    </li>
                  ))}
                </ul>
                <a href="#quote" className="block text-center text-sm font-bold h-10 leading-10 rounded-xl text-white" style={{ backgroundColor: NAVY }}>
                  Get Quote
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="claims" className="py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: NAVY }}>Simple process</p>
            <h2 className="text-4xl font-black" style={{ color: DARK }}>Getting covered takes minutes</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((s, i) => (
              <div key={i} className="text-center">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-black text-lg mx-auto mb-5" style={{ backgroundColor: NAVY }}>
                  {parseInt(s.n)}
                </div>
                <h3 className="font-black text-base mb-2" style={{ color: DARK }}>{s.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: `${DARK}55` }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-24 px-6" style={{ backgroundColor: LIGHT }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black" style={{ color: DARK }}>What our customers say</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {reviews.map((r, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100">
                <div className="flex gap-0.5 mb-1">
                  {Array(r.stars).fill(0).map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-xs font-semibold mb-4" style={{ color: NAVY }}>{r.product}</p>
                <p className="text-sm leading-relaxed mb-5" style={{ color: `${DARK}65` }}>&ldquo;{r.text}&rdquo;</p>
                <div className="font-bold text-sm" style={{ color: DARK }}>{r.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black" style={{ color: DARK }}>Common questions</h2>
          </div>
          <div className="space-y-2">
            {faqs.map((faq, i) => (
              <div key={i} className="border rounded-2xl overflow-hidden" style={{ borderColor: `${DARK}10` }}>
                <button className="w-full flex items-center justify-between px-6 py-5 text-left" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <span className="font-bold text-sm" style={{ color: DARK }}>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 shrink-0 transition-transform ${openFaq === i ? "rotate-180" : ""}`} style={{ color: `${DARK}40` }} />
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5 text-sm leading-relaxed" style={{ color: `${DARK}60` }}>{faq.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: NAVY }}>Our story</p>
            <h2 className="text-4xl font-black mb-5 leading-tight" style={{ color: DARK }}>27 years protecting Austrian families.</h2>
            <p className="text-sm leading-relaxed mb-4" style={{ color: `${DARK}65` }}>
              ShieldCover was founded in 1998 by a team of actuaries and claims specialists who believed the insurance industry was making things unnecessarily complicated. Our first product: a straightforward home policy with one page of terms.
            </p>
            <p className="text-sm leading-relaxed mb-8" style={{ color: `${DARK}65` }}>
              Today we serve 1.2 million policyholders across Austria. We're still privately held, still obsessed with claims speed, and still writing policies that fit on two pages.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {[
                { n: "1998", l: "Founded in Vienna" },
                { n: "A+", l: "AM Best financial strength" },
                { n: "FCA", l: "Regulated · Auth. 487803" },
                { n: "1.2M", l: "Policyholders" },
              ].map((s, i) => (
                <div key={i} className="rounded-xl border p-4" style={{ borderColor: `${DARK}10` }}>
                  <div className="text-2xl font-black mb-1" style={{ color: NAVY }}>{s.n}</div>
                  <div className="text-xs" style={{ color: `${DARK}50` }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-2xl overflow-hidden h-48 col-span-2">
              <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=900&q=80" alt="Team" className="w-full h-full object-cover" />
            </div>
            <div className="rounded-2xl overflow-hidden h-36">
              <img src="https://images.unsplash.com/photo-1521791055366-0d553872952f?w=400&q=80" alt="Office" className="w-full h-full object-cover" />
            </div>
            <div className="rounded-xl p-6 flex flex-col justify-center" style={{ backgroundColor: LIGHT }}>
              <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: NAVY }}>Headquarters</p>
              <p className="text-sm font-semibold" style={{ color: DARK }}>Ringstraße 14<br />1010 Vienna, Austria</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-24 px-6" style={{ backgroundColor: LIGHT }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: NAVY }}>Get in touch</p>
            <h2 className="text-4xl font-black" style={{ color: DARK }}>We're here to help.</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5 mb-10">
            {[
              { icon: "📞", title: "General enquiries", lines: ["+43 1 987 654 3", "Mon–Fri 8:00–18:00"] },
              { icon: "🆘", title: "Claims 24/7", lines: ["+43 1 987 654 0", "Emergency line, always open"] },
              { icon: "✉️", title: "Email", lines: ["info@shieldcover.at", "Response within 4 business hours"] },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 text-center border border-gray-100">
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="font-bold text-sm mb-3" style={{ color: DARK }}>{item.title}</h3>
                {item.lines.map((l) => <p key={l} className="text-sm" style={{ color: `${DARK}60` }}>{l}</p>)}
              </div>
            ))}
          </div>
          <div className="bg-white rounded-2xl p-8 border border-gray-100 max-w-2xl mx-auto">
            <h3 className="font-black text-base mb-5" style={{ color: DARK }}>Send us a message</h3>
            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider block mb-1.5" style={{ color: `${DARK}50` }}>Name</label>
                <input placeholder="Your name" className="w-full h-11 rounded-xl border px-3 text-sm outline-none" style={{ borderColor: `${DARK}15`, color: DARK }} />
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider block mb-1.5" style={{ color: `${DARK}50` }}>Email</label>
                <input placeholder="your@email.com" className="w-full h-11 rounded-xl border px-3 text-sm outline-none" style={{ borderColor: `${DARK}15`, color: DARK }} />
              </div>
            </div>
            <div className="mb-4">
              <label className="text-xs font-semibold uppercase tracking-wider block mb-1.5" style={{ color: `${DARK}50` }}>Subject</label>
              <select className="w-full h-11 rounded-xl border px-3 text-sm outline-none" style={{ borderColor: `${DARK}15`, color: DARK }}>
                <option>Policy enquiry</option>
                <option>Claims question</option>
                <option>Billing & payments</option>
                <option>Complaint</option>
                <option>Other</option>
              </select>
            </div>
            <div className="mb-5">
              <label className="text-xs font-semibold uppercase tracking-wider block mb-1.5" style={{ color: `${DARK}50` }}>Message</label>
              <textarea rows={3} placeholder="How can we help?" className="w-full rounded-xl border px-3 py-2.5 text-sm outline-none resize-none" style={{ borderColor: `${DARK}15`, color: DARK }} />
            </div>
            {contactDone ? (
              <div className="rounded-xl p-4 text-center" style={{ backgroundColor: LIGHT }}>
                <p className="text-base font-bold mb-1" style={{ color: NAVY }}>Message sent!</p>
                <p className="text-sm" style={{ color: `${DARK}60` }}>We'll reply within 4 business hours.</p>
              </div>
            ) : (
              <button onClick={() => setContactDone(true)} className="w-full h-11 rounded-xl text-sm font-bold text-white" style={{ backgroundColor: NAVY }}>Send Message</button>
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="quote" className="py-24 px-6" style={{ backgroundColor: NAVY }}>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-black text-white mb-5">Ready to get covered?</h2>
          <p className="text-white/60 mb-8 text-sm leading-relaxed">No commitment. Cancel any time. Quote in 2 minutes.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="#quote" className="inline-flex items-center justify-center gap-2 font-bold h-12 px-10 rounded-xl text-sm bg-white" style={{ color: NAVY }}>
              Get My Quote <ArrowRight className="w-4 h-4" />
            </a>
            <a href="tel:+4319876543" className="inline-flex items-center justify-center gap-2 font-bold h-12 px-10 rounded-xl text-sm text-white border border-white/25">
              <Phone className="w-4 h-4" /> Call us
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t" style={{ backgroundColor: DARK, borderColor: "rgba(255,255,255,0.05)" }}>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-3 text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
          <span className="font-black text-sm text-white">ShieldCover Insurance</span>
          <span>Demo site — <a href="/" className="hover:text-white transition-colors" style={{ color: "rgba(255,255,255,0.5)" }}>built by Vladimir Rusacov</a></span>
          <span>© 2026 ShieldCover AG · FCA Reg. 487803</span>
        </div>
      </footer>
    </div>
  );
}
