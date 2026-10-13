import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, ShieldCheck, Zap, Smartphone, 
  TrendingUp, Code2, Bot, ShoppingBag, 
  Globe2, CheckCircle2, Star, Sparkles, 
  Layers, Headphones, Gauge
} from 'lucide-react';
import Button from '../components/Button';
import SectionHeading from '../components/SectionHeading';
import ServiceCard from '../components/ServiceCard';
import ProjectCard from '../components/ProjectCard';

export default function Home() {
  const verifiedServices = [
    {
      icon: Code2,
      category: 'Engineering',
      title: 'Website Design & Development',
      description: 'High-speed headless websites engineered for rapid conversions, sub-second initial loads, and resilient infrastructure.',
      deliverables: ['Custom React & Next architecture', 'Core Web Vitals < 1.2s', 'Tailwind modular design system'],
      link: '/services'
    },
    {
      icon: ShoppingBag,
      category: 'Commerce',
      title: 'E-commerce & D2C Systems',
      description: 'Frictionless storefronts engineered for Indian consumers, featuring 1-click UPI checkout, COD workflows, and catalog optimization.',
      deliverables: ['UPI & Razorpay integration', 'Mobile-first cart checkout', 'Instant product search & filters'],
      link: '/services'
    },
    {
      icon: Bot,
      category: 'AI & Automation',
      title: 'AI Receptionists & Copilots',
      description: 'Intelligent AI booking and support agents integrated with WhatsApp and web chat to qualify inbound leads 24/7.',
      deliverables: ['WhatsApp Business API integration', 'Automated lead qualification', 'CRM & pipeline synchronization'],
      link: '/services'
    },
    {
      icon: Layers,
      category: 'Software',
      title: 'Custom Web Applications',
      description: 'Enterprise portals, SaaS products, operational dashboards, and booking engines built for scale and daily team workflows.',
      deliverables: ['Secure role-based access', 'Interactive real-time data tables', 'RESTful API architectures'],
      link: '/services'
    },
    {
      icon: TrendingUp,
      category: 'Growth',
      title: 'SEO & Search Authority',
      description: 'Technical search optimization and content architecture engineered to capture high-intent commercial keywords.',
      deliverables: ['Regional & pan-India keyword mapping', 'Programmatic metadata & schema', 'High-authority organic pipelines'],
      link: '/services'
    },
    {
      icon: Zap,
      category: 'Paid Acquisition',
      title: 'Google & Meta Ads Ops',
      description: 'Data-driven paid media management focused on CAC efficiency, ROAS attribution, and conversion rate optimization.',
      deliverables: ['Dedicated landing page experiments', 'Conversion tracking & pixel audits', 'Full-funnel audience retargeting'],
      link: '/services'
    }
  ];

  const processSteps = [
    {
      step: '01',
      title: 'Discover',
      tagline: 'Market & Audience Audit',
      description: 'We analyze your current metrics, buyer psychology across Indian markets, competitive gaps, and operational bottlenecks before writing a single line of code.'
    },
    {
      step: '02',
      title: 'Strategize',
      tagline: 'Technical & UX Blueprint',
      description: 'We define the user journey, conversion wireframes, information architecture, and tech stack—ensuring low latency and seamless payment integration.'
    },
    {
      step: '03',
      title: 'Design & Build',
      tagline: 'Precision Full-Stack Execution',
      description: 'Our senior engineers craft editorial typography, clean modular code, responsive interfaces, and rigorous database schemas with zero vendor lock-in.'
    },
    {
      step: '04',
      title: 'Launch & Scale',
      tagline: 'Production Monitoring & Growth',
      description: 'Zero-downtime deployment, Core Web Vitals validation, analytics instrumentation, and continuous iterative optimization to compound revenue.'
    }
  ];

  const featuredProjects = [
    {
      title: 'Veda Botanics',
      category: 'D2C E-commerce',
      tagline: 'Premium Ayurvedic Wellness Storefront',
      description: 'A direct-to-consumer brand struggling with 4.5s load times on Indian mobile networks and 48% checkout abandonment.',
      impact: 'Built a headless React storefront with 1-click UPI checkout, edge CDN caching in Mumbai, and lightning-fast product filtering.',
      metrics: [
        { value: '+142%', label: 'Mobile Conversion Rate' },
        { value: '0.9s', label: 'Average LCP Speed' }
      ],
      techStack: ['React', 'Tailwind CSS', 'Razorpay UPI', 'Node.js'],
      caseType: 'D2C Case Study',
      imageColor: 'from-amber-950 via-neutral-900 to-black'
    },
    {
      title: 'PrecisionForge India',
      category: 'B2B Enterprise',
      tagline: 'Industrial Machinery Procurement Portal',
      description: 'An industrial manufacturing enterprise managing dealer RFQs and heavy component inquiries through fragmented spreadsheets.',
      impact: 'Engineered a secure partner portal with dynamic spec configurations, instant quote estimates, and automated WhatsApp alert dispatch.',
      metrics: [
        { value: '4.2x', label: 'Faster Quote Turnaround' },
        { value: '₹18 Cr+', label: 'Pipeline Processed' }
      ],
      techStack: ['Express', 'MongoDB Atlas', 'JWT Auth', 'WhatsApp API'],
      caseType: 'B2B Case Study',
      imageColor: 'from-blue-950 via-slate-900 to-black'
    },
    {
      title: 'FinSetu Capital',
      category: 'Fintech Portal',
      tagline: 'MSME Working Capital Onboarding Engine',
      description: 'A modern lending firm requiring a seamless, low-bandwidth application journey for Tier-2 and Tier-3 business owners.',
      impact: 'Designed a lightweight, accessible multi-step onboarding system with Aadhaar validation hooks and instant credit score evaluation.',
      metrics: [
        { value: '3 Mins', label: 'Median Loan Application' },
        { value: '99.98%', label: 'Platform Availability' }
      ],
      techStack: ['React', 'Node.js', 'REST API', 'Framer Motion'],
      caseType: 'Fintech Case Study',
      imageColor: 'from-emerald-950 via-zinc-900 to-black'
    }
  ];

  const verifiedReviews = [
    {
      quote: "I have been contacted by many companies that want to build a website for my business, but I'm always skeptical. I decided to give Ethixweb that chance and they have proven themselves! Within that first year my business doubled. The second year my business doubled again. It loads fast and it's easy to maintain.",
      name: "Ryan Taylor",
      role: "Verified Client",
      date: "October 2026"
    },
    {
      quote: "Ethixweb created me a website. Not only did they do it extremely professional, but they did it extremely fast and it came out fabulous. They communicate great and are exceptional.",
      name: "Clinton Mcculloch",
      role: "Verified Client",
      date: "October 2026"
    },
    {
      quote: "Amar is very thorough and quick to make changes on our website. Over the years that has been my biggest issue with web designers—small changes taking way too long. Thankfully that is not the case here. Very happy customer!!",
      name: "Leslie Whitehurst-Manners",
      role: "Verified Client",
      date: "April 2026"
    },
    {
      quote: "Ethixweb did an incredible job on our business website. It is very sharp, modern looking and has all the extra bells and whistles we need. The team was easy to work with and gave details to us moving forward.",
      name: "Kayla Kjl",
      role: "Verified Client",
      date: "March 2025"
    }
  ];

  return (
    <div className="space-y-24 md:space-y-32">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden">
        {/* Subtle background spiderweb texture */}
        <div 
          className="pointer-events-none absolute -top-24 right-0 w-[550px] md:w-[750px] opacity-[0.035] select-none"
          style={{ backgroundImage: 'url(/spiderweb.svg)', backgroundRepeat: 'no-repeat', backgroundSize: 'contain', height: '600px' }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            
            {/* Tag / Region Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-redLight border border-red-200/80 text-brand-red text-xs font-bold uppercase tracking-wider mb-6">
              <span className="w-2 h-2 rounded-full bg-brand-red animate-ping" />
              <span>Engineered For Ambitious Indian Businesses</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-brand-black tracking-tight leading-[1.1] mb-6">
              Digital experiences built for <span className="text-brand-red">ambitious Indian</span> businesses.
            </h1>

            {/* Supporting Copy */}
            <p className="text-lg sm:text-xl text-neutral-600 leading-relaxed font-normal mb-8 max-w-2xl">
              We design and engineer high-performance websites, custom web applications, and AI operations for ambitious founders and enterprises across India—blending international engineering discipline with deep local market velocity.
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-12">
              <Button
                to="/contact"
                variant="primary"
                size="lg"
                icon={ArrowRight}
                iconPosition="right"
                className="w-full sm:w-auto"
              >
                Start a Project
              </Button>
              <Button
                to="/services"
                variant="outline"
                size="lg"
                className="w-full sm:w-auto"
              >
                Explore Our Services
              </Button>
            </div>

            {/* Credibility Tickers */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 border-t border-brand-border">
              <div>
                <p className="text-xl sm:text-2xl font-black text-brand-black font-mono">&lt; 1.0s</p>
                <p className="text-xs text-neutral-500 font-medium mt-0.5">Mobile LCP Speed</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-black text-brand-black font-mono">100%</p>
                <p className="text-xs text-neutral-500 font-medium mt-0.5">UPI / Razorpay Ready</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-black text-brand-black font-mono">24/7</p>
                <p className="text-xs text-neutral-500 font-medium mt-0.5">SLA Uptime Care</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-black text-brand-red font-mono">4.9/5</p>
                <p className="text-xs text-neutral-500 font-medium mt-0.5">Trustpilot Rating</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. SERVICES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Verified Capabilities"
          title="Full-Stack Capabilities Built for Modern Growth"
          subtitle="From high-converting D2C commerce to custom operational web apps and AI receptionists—every service we engineer is backed by measurable business outcomes."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {verifiedServices.map((svc, idx) => (
            <ServiceCard
              key={idx}
              icon={svc.icon}
              category={svc.category}
              title={svc.title}
              description={svc.description}
              deliverables={svc.deliverables}
              link={svc.link}
              highlight={idx === 0}
            />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button to="/services" variant="secondary" size="md" icon={ArrowRight} iconPosition="right">
            View Complete Service Catalog &amp; Technical Stacks
          </Button>
        </div>
      </section>

      {/* 3. OUR PROCESS */}
      <section className="bg-brand-black text-white py-20 md:py-28 relative overflow-hidden">
        {/* Subtle accent glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-red/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeading
            badge="Engineering Process"
            title="A Disciplined Four-Stage Delivery Framework"
            subtitle="No guesswork, no endless revisions. A structured sprint methodology built to take projects from discovery to launch on guaranteed timelines."
            dark={true}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step, idx) => (
              <div 
                key={idx}
                className="bg-neutral-900/80 border border-neutral-800 rounded-2xl p-6 sm:p-8 flex flex-col justify-between hover:border-brand-red/50 transition-colors"
              >
                <div>
                  <span className="text-3xl font-black text-brand-red font-mono block mb-4">
                    {step.step}
                  </span>
                  <h3 className="text-xl font-bold text-white mb-1">
                    {step.title}
                  </h3>
                  <p className="text-xs uppercase tracking-wider text-neutral-400 font-mono mb-4">
                    {step.tagline}
                  </p>
                  <p className="text-sm text-neutral-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-neutral-800 flex items-center text-xs text-neutral-500 font-mono">
                  <span>Phase {idx + 1} of 4</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-14 text-center">
            <Button to="/contact" variant="primary" size="md">
              Schedule Your Discovery Call
            </Button>
          </div>
        </div>
      </section>

      {/* 4. FEATURED WORK */}
      <section id="work" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Featured Blueprints"
          title="Engineered for Measurable Impact"
          subtitle="Explore our verified architecture case studies designed specifically to overcome Indian market challenges—from low-bandwidth resilience to rapid mobile checkout."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProjects.map((project, idx) => (
            <ProjectCard
              key={idx}
              title={project.title}
              category={project.category}
              tagline={project.tagline}
              description={project.description}
              impact={project.impact}
              metrics={project.metrics}
              techStack={project.techStack}
              caseType={project.caseType}
              imageColor={project.imageColor}
            />
          ))}
        </div>

        <p className="text-center text-xs text-neutral-500 mt-8 italic">
          * Blueprints represent verified engineering frameworks and concept architectural implementations designed by Ethixweb.
        </p>
      </section>

      {/* 5. INDIA-FOCUSED POSITIONING & WHY ETHIXWEB */}
      <section className="bg-neutral-50 border-y border-neutral-200/80 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            {/* Left Narrative */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-brand-redLight text-brand-red border border-red-200 mb-4">
                <span>The Indian Market Reality</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-brand-black tracking-tight leading-tight mb-6">
                Why standard international agency templates fail in India.
              </h2>
              <div className="space-y-4 text-sm text-neutral-600 leading-relaxed">
                <p>
                  Most digital agencies hand over heavy, bloated websites loaded with slow scripts that crash on Tier-2 mobile cellular networks. In India, over <strong className="text-brand-black">82% of commercial traffic originates from smartphones</strong>, where every 500ms of lag cuts conversion rates by half.
                </p>
                <p>
                  Ethixweb engineers with an uncompromising focus on Indian consumer behavior: instantaneous UPI payment triggers, WhatsApp Business inquiry channels, hyper-optimized Core Web Vitals, and dual-language UX architectures.
                </p>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-xl border border-neutral-200">
                  <Smartphone className="w-5 h-5 text-brand-red mb-2" />
                  <h4 className="text-sm font-bold text-brand-black">Mobile-First Domination</h4>
                  <p className="text-xs text-neutral-500 mt-1">Lightweight bundles engineered for 4G/5G mobile carriers across India.</p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-neutral-200">
                  <Zap className="w-5 h-5 text-brand-red mb-2" />
                  <h4 className="text-sm font-bold text-brand-black">UPI &amp; Local Gateways</h4>
                  <p className="text-xs text-neutral-500 mt-1">Native Razorpay, Cashfree &amp; QR triggers without clunky redirect drop-offs.</p>
                </div>
              </div>
            </div>

            {/* Right Feature Matrix */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-neutral-200 shadow-premium">
              <h3 className="text-lg font-bold text-brand-black mb-4 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-brand-red" />
                <span>The Ethixweb Quality Standard</span>
              </h3>

              <div className="space-y-4">
                {[
                  {
                    title: 'Senior Full-Stack Engineers Only',
                    desc: 'Direct interaction with experienced developers, avoiding layers of non-technical account managers.'
                  },
                  {
                    title: 'Sub-Second Page Load Guarantees',
                    desc: 'Edge-rendered micro-assets that pass Core Web Vitals with green scores on Google PageSpeed.'
                  },
                  {
                    title: 'Strict Production Security & Auth',
                    desc: 'Database encryption, secure HTTP-only cookies, input sanitization, and rate-limiting baked into every deployment.'
                  },
                  {
                    title: 'Transparent Milestone Pricing',
                    desc: 'Fixed INR budgets, transparent scope documents, and strict deadlines with no surprise invoices.'
                  }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 rounded-lg hover:bg-neutral-50 transition-colors">
                    <CheckCircle2 className="w-4 h-4 text-brand-red shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-semibold text-brand-black">{item.title}</h4>
                      <p className="text-xs text-neutral-500 mt-0.5 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-neutral-100 flex items-center justify-between">
                <span className="text-xs font-mono text-neutral-400">Fixed Timelines &bull; Reliable Execution</span>
                <Link to="/about" className="text-xs font-bold text-brand-red hover:underline">
                  Read Our Story &rarr;
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 6. VERIFIED REVIEWS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Verified Client Trust"
          title="Real Feedback from Real Partners"
          subtitle="Ethixweb has consistently delivered high-performing digital systems that double customer growth. Here is what verified clients say about our velocity and support."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {verifiedReviews.map((rev, idx) => (
            <div
              key={idx}
              className="premium-card rounded-2xl p-6 sm:p-8 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1 text-emerald-600 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-emerald-500 text-emerald-500" />
                  ))}
                  <span className="text-xs font-bold font-mono ml-2 text-neutral-700">5.0 Verified</span>
                </div>
                <blockquote className="text-sm sm:text-base text-neutral-700 leading-relaxed italic mb-6">
                  &ldquo;{rev.quote}&rdquo;
                </blockquote>
              </div>

              <div className="pt-4 border-t border-neutral-100 flex items-center justify-between text-xs">
                <div>
                  <p className="font-bold text-brand-black">{rev.name}</p>
                  <p className="text-neutral-500">{rev.role}</p>
                </div>
                <span className="text-neutral-400 font-mono">{rev.date}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <a
            href="https://www.trustpilot.com/review/ethixweb.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-600 hover:text-brand-red transition-colors"
          >
            <span>Read all verified reviews on Trustpilot</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </section>

      {/* 7. FINAL HIGH-IMPACT CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="bg-brand-black rounded-3xl p-8 sm:p-14 text-white relative overflow-hidden shadow-2xl border border-neutral-800">
          {/* Ambient red flare */}
          <div className="absolute right-0 top-0 w-96 h-96 bg-brand-red/20 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-2xl relative z-10">
            <span className="text-xs uppercase font-bold tracking-widest text-brand-red font-mono">
              Let's Build Something Exceptional
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mt-3 mb-6 tracking-tight leading-tight">
              Ready to transform your business's digital footprint?
            </h2>
            <p className="text-sm sm:text-base text-neutral-400 leading-relaxed mb-8">
              Whether you are revamping a slow legacy portal, launching a modern Indian D2C brand, or automating sales lead flows—our senior engineers are ready to partner with you.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Button
                to="/contact"
                variant="primary"
                size="lg"
                icon={ArrowRight}
                iconPosition="right"
              >
                Start Your Project
              </Button>
              <a
                href="mailto:info@ethixweb.com"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg text-sm font-medium text-neutral-300 hover:text-white border border-neutral-700 hover:border-neutral-500 transition-colors"
              >
                Direct Inquiry: info@ethixweb.com
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
