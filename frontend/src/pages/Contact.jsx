import React from 'react';
import { 
  Mail, Clock, ShieldCheck, HelpCircle, 
  Sparkles, CheckCircle2, MessageSquare, ArrowRight 
} from 'lucide-react';
import ContactForm from '../components/ContactForm';
import SectionHeading from '../components/SectionHeading';

export default function Contact() {
  const faqs = [
    {
      q: 'What is the typical project delivery timeline?',
      a: 'Most custom websites and commerce builds ship in 3 to 5 weeks. More complex web applications, portals, and AI automation pipelines typically take 6 to 10 weeks depending on custom integrations.'
    },
    {
      q: 'Do you support Indian payment gateways like Razorpay and Cashfree?',
      a: 'Yes, natively. We build frictionless, 1-click UPI, netbanking, and credit card flows with zero external redirect drop-offs, optimized for Indian mobile users.'
    },
    {
      q: 'Will our in-house team be able to maintain and edit the website?',
      a: 'Absolutely. We deliver clean, modular React and Node.js code with clean documentation, structured Tailwind styles, and easy content management setups with zero proprietary vendor lock-in.'
    },
    {
      q: 'How are project payments structured?',
      a: 'We operate on transparent, milestone-based agreements with INR invoicing—typically broken into Discovery & Design (30%), Development & Staging (40%), and Final Production Launch (30%).'
    }
  ];

  return (
    <div className="py-12 md:py-20 space-y-20">
      
      {/* Header & Main Contact Form Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Context & Direct Info */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-redLight text-brand-red text-xs font-bold uppercase tracking-wider mb-6 border border-red-200">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Start a Project</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-black text-brand-black tracking-tight leading-tight mb-4">
                Let's engineer your digital advantage.
              </h1>
              <p className="text-base text-neutral-600 leading-relaxed">
                Whether you're looking to build an ultra-fast website, launch an Indian D2C storefront, or automate your sales workflows, our senior developers are ready to help.
              </p>
            </div>

            {/* Direct Contact Cards */}
            <div className="space-y-4">
              <div className="p-5 bg-white rounded-2xl border border-brand-border shadow-subtle flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-brand-redLight flex items-center justify-center text-brand-red shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs uppercase font-bold text-neutral-400">Direct Inquiries</p>
                  <a href="mailto:info@ethixweb.com" className="text-base font-bold text-brand-black hover:text-brand-red transition-colors font-mono">
                    info@ethixweb.com
                  </a>
                  <p className="text-xs text-neutral-500 mt-0.5">Average reply time: under 4 hours on business days</p>
                </div>
              </div>

              <div className="p-5 bg-white rounded-2xl border border-brand-border shadow-subtle flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center text-neutral-700 shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs uppercase font-bold text-neutral-400">Operating Hours</p>
                  <p className="text-sm font-bold text-brand-black">Monday – Friday</p>
                  <p className="text-xs text-neutral-500 mt-0.5">9:00 AM – 6:00 PM IST (India Desk)</p>
                </div>
              </div>

              <div className="p-5 bg-white rounded-2xl border border-brand-border shadow-subtle flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs uppercase font-bold text-neutral-400">Client Protection</p>
                  <p className="text-sm font-bold text-brand-black">Strict NDA &amp; IP Transfer</p>
                  <p className="text-xs text-neutral-500 mt-0.5">100% intellectual property ownership transferred upon final milestone.</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: High-Converting Form */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>

        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-brand-border">
        <SectionHeading
          badge="Frequently Asked Questions"
          title="Everything You Need to Know Before Starting"
          subtitle="Clear answers about our development timelines, payment rails, and collaboration process."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {faqs.map((faq, idx) => (
            <div key={idx} className="p-6 bg-white rounded-2xl border border-brand-border shadow-subtle">
              <h3 className="text-base font-bold text-brand-black mb-2 flex items-start gap-2">
                <HelpCircle className="w-4 h-4 text-brand-red shrink-0 mt-0.5" />
                <span>{faq.q}</span>
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed pl-6">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
