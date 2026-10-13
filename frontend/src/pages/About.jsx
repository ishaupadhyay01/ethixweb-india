import React from 'react';
import { 
  ShieldCheck, Globe2, Cpu, Users2, Zap, 
  Terminal, Target, ArrowRight, CheckCircle2, 
  Layers, Code2, Sparkles, Building2
} from 'lucide-react';
import Button from '../components/Button';
import SectionHeading from '../components/SectionHeading';

export default function About() {
  const values = [
    {
      title: 'Senior Builders at the Center',
      desc: 'When you work with Ethixweb, you collaborate directly with senior engineers and designers who understand technical architecture—not junior middlemen or disconnected account managers.'
    },
    {
      title: 'Performance as a Feature',
      desc: 'Speed is not an afterthought; it is our primary design constraint. We target sub-second initial loads on mobile cellular networks, because speed directly drives revenue.'
    },
    {
      title: 'Radical Transparency',
      desc: 'We define clear milestones, fixed scopes, and open communication channels. You always know exactly what is being built, how it works, and when it will ship.'
    },
    {
      title: 'Zero Vendor Lock-In',
      desc: 'We write clean, modular JavaScript, standard React components, and well-documented Express APIs that your in-house team can maintain and extend with complete confidence.'
    }
  ];

  return (
    <div className="space-y-20 md:space-y-28 py-12 md:py-20">
      
      {/* 1. Hero / Ethixweb India Story */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-redLight text-brand-red text-xs font-bold uppercase tracking-wider mb-6 border border-red-200">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Ethixweb Story</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-brand-black tracking-tight leading-tight mb-6">
            Bridging international engineering discipline with Indian market velocity.
          </h1>

          <p className="text-base sm:text-lg text-neutral-600 leading-relaxed">
            Ethixweb was founded on a simple operating principle: <strong className="text-brand-black">We run the tech, so you can run the business.</strong> While supporting high-growth brands globally, we recognized that Indian businesses deserve the same uncompromising standard of digital craftsmanship—tailored specifically to the realities of India's mobile-first commerce landscape.
          </p>
        </div>
      </section>

      {/* 2. Why Local Understanding Matters */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-14 border border-brand-border shadow-subtle">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            
            <div>
              <span className="text-xs uppercase font-bold tracking-wider text-brand-red font-mono">
                Market Context
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-brand-black mt-2 mb-6">
                Why standard international templates fall short in India.
              </h2>
              <div className="space-y-4 text-sm text-neutral-600 leading-relaxed">
                <p>
                  Building for India requires more than translating copy. It demands understanding that the vast majority of consumers and business buyers experience your brand on a smartphone, frequently over fluctuating cellular bandwidth.
                </p>
                <p>
                  Checkout and inquiry funnels must account for the ubiquity of instant UPI payments, the trust expectations of local buyers, and the demand for instant WhatsApp communication.
                </p>
                <p>
                  Ethixweb strips away bloated legacy frameworks to construct clean, ultra-responsive digital platforms that perform effortlessly from Bengaluru to Tier-3 industrial hubs.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 bg-neutral-50 rounded-2xl border border-neutral-100">
                <p className="text-2xl font-black text-brand-red font-mono">&gt; 80%</p>
                <p className="text-xs font-bold text-brand-black mt-1">Mobile Traffic Share</p>
                <p className="text-xs text-neutral-500 mt-1">Mobile-first architecture engineered for diverse Android and iOS hardware.</p>
              </div>

              <div className="p-5 bg-neutral-50 rounded-2xl border border-neutral-100">
                <p className="text-2xl font-black text-brand-black font-mono">0-Redirect</p>
                <p className="text-xs font-bold text-brand-black mt-1">UPI Modal Rails</p>
                <p className="text-xs text-neutral-500 mt-1">Direct payment authorization without friction or external browser jumps.</p>
              </div>

              <div className="p-5 bg-neutral-50 rounded-2xl border border-neutral-100">
                <p className="text-2xl font-black text-brand-black font-mono">Sub-1s</p>
                <p className="text-xs font-bold text-brand-black mt-1">Edge Latency</p>
                <p className="text-xs text-neutral-500 mt-1">Local CDN caching ensures instantaneous interaction across all Indian states.</p>
              </div>

              <div className="p-5 bg-neutral-50 rounded-2xl border border-neutral-100">
                <p className="text-2xl font-black text-brand-red font-mono">24/7</p>
                <p className="text-xs font-bold text-brand-black mt-1">AI Inbound Routing</p>
                <p className="text-xs text-neutral-500 mt-1">Automated WhatsApp lead qualification capturing prospects around the clock.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Our Core Working Philosophy */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Guiding Principles"
          title="How We Work & What We Stand For"
          subtitle="Our engineering culture is built around accountability, speed, and tangible business metrics."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {values.map((v, idx) => (
            <div
              key={idx}
              className="premium-card rounded-2xl p-6 sm:p-8 flex flex-col justify-between"
            >
              <div>
                <span className="text-xs font-mono font-bold text-brand-red uppercase tracking-wider block mb-2">
                  Principle 0{idx + 1}
                </span>
                <h3 className="text-xl font-bold text-brand-black mb-3">{v.title}</h3>
                <p className="text-sm text-neutral-600 leading-relaxed">{v.desc}</p>
              </div>
              <div className="pt-6 mt-6 border-t border-neutral-100 flex items-center gap-2 text-xs text-neutral-400">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Verified Studio Commitment</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Global Operations Network */}
      <section className="bg-brand-black text-white py-16 sm:py-20 rounded-3xl max-w-7xl mx-auto px-6 sm:px-12 border border-neutral-800">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-bold uppercase tracking-wider mb-6">
            <Globe2 className="w-3.5 h-3.5 text-brand-red" />
            <span>Global Operations Network</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black text-white mb-6">
            Seattle &bull; New York &bull; London &bull; India
          </h2>

          <p className="text-sm sm:text-base text-neutral-400 leading-relaxed mb-8">
            Our distributed engineering hubs stay synchronized around the clock. Whether deploying high-availability cloud servers or auditing marketing pipelines, our teams bring global software discipline to Indian enterprises.
          </p>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-neutral-300 font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>India Engineering Operations Desk: Active</span>
          </div>
        </div>
      </section>

      {/* 5. CTA */}
      <section className="max-w-3xl mx-auto px-4 text-center">
        <h2 className="text-2xl sm:text-3xl font-black text-brand-black mb-4">
          Let’s discuss your technical vision.
        </h2>
        <p className="text-sm text-neutral-600 mb-8 max-w-xl mx-auto">
          Talk directly with our senior development team to understand how modern full-stack web engineering can accelerate your enterprise growth.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button to="/contact" variant="primary" size="lg" icon={ArrowRight} iconPosition="right">
            Start a Conversation
          </Button>
          <Button to="/services" variant="outline" size="lg">
            Review Our Services
          </Button>
        </div>
      </section>

    </div>
  );
}
