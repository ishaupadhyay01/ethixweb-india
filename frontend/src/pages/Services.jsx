import React from 'react';
import { 
  Code2, ShoppingBag, Bot, Layers, TrendingUp, Zap, 
  Wrench, CheckCircle2, ArrowRight, ShieldCheck, Cpu, 
  Sparkles, Terminal, Smartphone, Database
} from 'lucide-react';
import Button from '../components/Button';
import SectionHeading from '../components/SectionHeading';

export default function Services() {
  const serviceCatalog = [
    {
      id: 'web-development',
      icon: Code2,
      title: 'Website Design & Development',
      badge: 'Core Capability',
      tagline: 'Sub-second, headless architectures engineered to turn visitors into buyers.',
      problem: 'Most Indian business websites are weighed down by heavy WordPress plugins, slow hosting servers, and clunky mobile layouts that result in 4+ second load times and lost leads.',
      approach: 'We engineer custom React/Next.js static and edge-rendered web experiences with clean code, minimal dependencies, and instant page transitions.',
      outcome: 'Google PageSpeed scores above 90, sub-second LCP on 4G cellular networks, and higher organic search rankings.',
      deliverables: [
        'Custom React & Next.js architecture',
        'Mobile-first responsive design for all screen sizes',
        'Tailwind CSS design token system',
        'Built-in SEO metadata and Open Graph social tags',
        'WCAG AA accessible markup and semantic hierarchy'
      ],
      techTags: ['React', 'Next.js', 'Tailwind CSS', 'Vite', 'Node.js']
    },
    {
      id: 'ecommerce',
      icon: ShoppingBag,
      title: 'E-commerce & D2C Storefronts',
      badge: 'High Conversion',
      tagline: 'Frictionless storefronts with instant UPI payment flows for the Indian consumer.',
      problem: 'High cart abandonment rates caused by slow checkout redirects, poor UPI gateway integration, and confusing mobile address forms.',
      approach: 'We build headless and optimized commerce frontends featuring 1-click Razorpay/Cashfree payment modal triggers, OTP login, and instant address autofill.',
      outcome: 'A 25% to 40% reduction in checkout drop-offs, improved conversion rates on mobile devices, and faster repeat transactions.',
      deliverables: [
        'Headless storefront design and development',
        'Seamless UPI, credit card, netbanking & COD workflows',
        'Instant search, filtering, and inventory sync',
        'WhatsApp order confirmation and tracking triggers',
        'Abandoned cart recovery automation hooks'
      ],
      techTags: ['Headless Shopify', 'Razorpay', 'Cashfree', 'React', 'MongoDB']
    },
    {
      id: 'ai-agents',
      icon: Bot,
      title: 'AI Receptionists & Workflow Automation',
      badge: '24/7 Operations',
      tagline: 'Intelligent conversational agents that qualify leads and schedule discovery calls.',
      problem: 'Valuable inbound inquiries arriving after office hours or over weekends slip through the cracks, leading prospective clients to seek competitors.',
      approach: 'We deploy custom AI copilots and WhatsApp Business bots trained strictly on your company documentation to greet, qualify, and route leads immediately.',
      outcome: 'Zero missed inbound leads, instantaneous under-10-second response times, and automated CRM pipeline population.',
      deliverables: [
        'Custom AI chat agent with knowledge base grounding',
        'WhatsApp Business Cloud API integration',
        'Automated lead qualification and qualification scoring',
        'Direct calendar booking synchronization (Calendly / Google)',
        'CRM sync (HubSpot, Zoho, GoHighLevel)'
      ],
      techTags: ['OpenAI API', 'WhatsApp Cloud API', 'Node.js', 'Zapier', 'Webhooks']
    },
    {
      id: 'web-apps',
      icon: Layers,
      title: 'Custom Web Applications & Portals',
      badge: 'Full Stack Engineering',
      tagline: 'Scalable internal dashboards, partner portals, and SaaS tools built for heavy daily use.',
      problem: 'Growing businesses outgrow manual spreadsheets and generic SaaS tools that lack custom workflows, data privacy, and localized integrations.',
      approach: 'We build tailored full-stack web applications with secure JWT/session authentication, role-based access control, responsive dashboards, and relational/document databases.',
      outcome: 'Streamlined team operations, reduced human data entry errors, and a custom proprietary software asset owned by your business.',
      deliverables: [
        'Secure admin portals with role-based permissions',
        'Real-time data visualization and analytical charts',
        'CSV/Excel automated export and batch import',
        'RESTful API architecture with comprehensive documentation',
        'Production database deployment on MongoDB Atlas'
      ],
      techTags: ['Node.js', 'Express', 'MongoDB Atlas', 'JWT Auth', 'REST API']
    },
    {
      id: 'seo-growth',
      icon: TrendingUp,
      title: 'SEO & Search Engine Authority',
      badge: 'Organic Demand',
      tagline: 'Technical optimization and localized content frameworks that compound inbound leads.',
      problem: 'Spending thousands on fleeting paid ads while ignoring durable organic search equity, or ranking for irrelevant low-intent keywords.',
      approach: 'We audit technical architecture, correct Core Web Vitals, implement structured Schema.org data, and construct search intent clusters targeting high-intent Indian buyers.',
      outcome: 'Predictable, compounding organic traffic that lowers customer acquisition costs over the long run.',
      deliverables: [
        'Comprehensive technical SEO & Core Web Vitals audit',
        'Pan-India and localized regional keyword architecture',
        'Schema.org structured data (Organization, LocalBusiness, FAQ)',
        'XML sitemaps, robots.txt, and canonical configurations',
        'Monthly search rankings and conversion analytics reporting'
      ],
      techTags: ['Google Search Console', 'Schema.org', 'Lighthouse', 'Semrush']
    },
    {
      id: 'paid-ads',
      icon: Zap,
      title: 'Google Ads & Performance Marketing',
      badge: 'ROI Focused',
      tagline: 'High-intent search campaigns and conversion-tested landing pages.',
      problem: 'Ad spend wasted on broad match keywords, poor negative keyword hygiene, and sending traffic to slow, generic homepages that fail to convert.',
      approach: 'We pair tightly targeted Google Search campaigns with high-converting, dedicated landing pages engineered specifically for the Indian market.',
      outcome: 'Lower Cost Per Acquisition (CPA), higher ROAS, and transparent conversion tracking tied directly to your sales pipeline.',
      deliverables: [
        'Campaign structure (Search, Performance Max, Remarketing)',
        'Dedicated landing page design and A/B variant testing',
        'Negative keyword lists and competitor exclusion',
        'Enhanced conversion tracking and GA4 event setup',
        'Weekly optimization and transparent spend reporting'
      ],
      techTags: ['Google Ads', 'GA4', 'Tag Manager', 'Meta Pixel']
    },
    {
      id: 'operations-support',
      icon: Wrench,
      title: 'Digital Operations & SLA Support',
      badge: 'Reliability',
      tagline: 'Continuous monitoring, instant security fixes, and proactive performance care.',
      problem: 'Websites and apps abandoned after launch, becoming vulnerable to security exploits, broken checkout forms, and gradual performance degradation.',
      approach: 'Our senior engineering team serves as your ongoing tech arm with proactive 24/7 uptime monitoring, regular security updates, and rapid SLA turnarounds.',
      outcome: '99.9% uptime assurance, peaceful nights for business leadership, and rapid fixes delivered within hours.',
      deliverables: [
        '24/7 uptime monitoring and automated incident alerts',
        'SSL certificate, DNS, and domain renewal management',
        'Dependency updates and security vulnerability patching',
        'Priority feature requests and content updates',
        'Monthly performance and health check diagnostics'
      ],
      techTags: ['Uptime Monitoring', 'Security Audits', 'Database Backups', 'DevOps']
    }
  ];

  return (
    <div className="space-y-20 md:space-y-28 py-12 md:py-20">
      
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-redLight text-brand-red text-xs font-bold uppercase tracking-wider mb-6 border border-red-200">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Full-Service Technical Capabilities</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-brand-black tracking-tight leading-tight mb-6">
            Engineering services designed to solve real business bottlenecks.
          </h1>
          <p className="text-base sm:text-lg text-neutral-600 leading-relaxed max-w-2xl">
            We don't sell bloated packages or cosmetic templates. Every service we deliver is an engineering solution tied directly to pipeline velocity, speed, and business growth.
          </p>
        </div>
      </section>

      {/* Services List */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-12">
          {serviceCatalog.map((service, idx) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                id={service.id}
                className="bg-white rounded-3xl p-6 sm:p-10 border border-brand-border shadow-subtle hover:border-brand-red/30 transition-all duration-300"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                  
                  {/* Left Column: Overview & Details */}
                  <div className="lg:col-span-7 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-xl bg-brand-redLight flex items-center justify-center text-brand-red">
                          <Icon className="w-6 h-6" />
                        </div>
                        <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-neutral-100 text-neutral-700">
                          {service.badge}
                        </span>
                      </div>

                      <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-black mb-2">
                        {service.title}
                      </h2>
                      <p className="text-sm font-semibold text-brand-red mb-6">
                        {service.tagline}
                      </p>

                      <div className="space-y-4 text-sm text-neutral-600 leading-relaxed mb-6">
                        <div>
                          <strong className="text-brand-black block text-xs uppercase tracking-wider mb-1">
                            The Business Problem:
                          </strong>
                          <p>{service.problem}</p>
                        </div>
                        <div>
                          <strong className="text-brand-black block text-xs uppercase tracking-wider mb-1">
                            Our Engineering Approach:
                          </strong>
                          <p>{service.approach}</p>
                        </div>
                        <div className="p-3.5 bg-neutral-50 rounded-xl border border-neutral-100">
                          <strong className="text-emerald-800 block text-xs uppercase tracking-wider mb-1">
                            Expected Outcome:
                          </strong>
                          <p className="text-emerald-950 font-medium text-xs sm:text-sm">{service.outcome}</p>
                        </div>
                      </div>
                    </div>

                    {/* Tech Stack Pills */}
                    <div className="flex flex-wrap gap-1.5 pt-4 border-t border-neutral-100">
                      {service.techTags.map((tech, tIdx) => (
                        <span key={tIdx} className="text-xs font-mono bg-neutral-100 text-neutral-700 px-2.5 py-1 rounded-md">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right Column: Key Deliverables & Action */}
                  <div className="lg:col-span-5 bg-neutral-50 rounded-2xl p-6 sm:p-8 border border-neutral-100 flex flex-col justify-between">
                    <div>
                      <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-4 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-brand-red" />
                        <span>Included Deliverables</span>
                      </h3>

                      <ul className="space-y-3 mb-8">
                        {service.deliverables.map((d, dIdx) => (
                          <li key={dIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-700 leading-snug">
                            <span className="w-1.5 h-1.5 rounded-full bg-brand-red mt-2 shrink-0" />
                            <span>{d}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <Button
                        to={`/contact?service=${encodeURIComponent(service.title)}`}
                        variant="primary"
                        size="md"
                        className="w-full justify-center"
                        icon={ArrowRight}
                        iconPosition="right"
                      >
                        Enquire About {service.title}
                      </Button>
                      <p className="text-[11px] text-center text-neutral-400 mt-2 font-mono">
                        Response guaranteed within 24 hours
                      </p>
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Indian Tech Ecosystem Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-brand-black text-white rounded-3xl p-8 sm:p-12 border border-neutral-800">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-brand-red/20 text-brand-red flex items-center justify-center shrink-0">
                <Smartphone className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-base font-bold text-white mb-1">Mobile-First Bharat</h4>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Every asset is tested across entry-level Android devices and modern iPhones to ensure zero frame-rate drops.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-brand-red/20 text-brand-red flex items-center justify-center shrink-0">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-base font-bold text-white mb-1">UPI Native Rails</h4>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Clean integration with Razorpay, Cashfree, and PhonePe for frictionless one-tap payment authorization.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-brand-red/20 text-brand-red flex items-center justify-center shrink-0">
                <Database className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-base font-bold text-white mb-1">Edge Low Latency</h4>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Deployed with multi-region CDN nodes across Mumbai and Chennai for true sub-50ms Time To First Byte (TTFB).
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="max-w-3xl mx-auto px-4 text-center">
        <h2 className="text-2xl sm:text-3xl font-black text-brand-black mb-4">
          Need a custom technical roadmap?
        </h2>
        <p className="text-sm text-neutral-600 mb-8 max-w-xl mx-auto">
          Schedule an obligation-free 30-minute discovery session with our senior engineering team to map out your architecture and timelines.
        </p>
        <Button to="/contact" variant="primary" size="lg" icon={ArrowRight} iconPosition="right">
          Schedule Architecture Consultation
        </Button>
      </section>

    </div>
  );
}
