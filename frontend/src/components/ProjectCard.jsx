import React, { useState } from 'react';
import { ArrowUpRight, Check, X, Layers, Cpu, TrendingUp } from 'lucide-react';
import Button from './Button';

export default function ProjectCard({
  title,
  category,
  tagline,
  metrics,
  description,
  impact,
  techStack = [],
  caseType = 'Concept Study',
  imageColor = 'from-stone-900 to-neutral-900'
}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div 
        onClick={() => setShowModal(true)}
        className="premium-card rounded-2xl overflow-hidden group cursor-pointer flex flex-col justify-between transition-all duration-300 hover:-translate-y-1"
      >
        {/* Visual Header / Cover */}
        <div className={`h-48 sm:h-56 bg-gradient-to-br ${imageColor} p-6 flex flex-col justify-between relative overflow-hidden text-white`}>
          {/* Subtle Spiderweb background effect */}
          <div className="absolute -right-8 -bottom-8 w-40 h-40 opacity-15 bg-[radial-gradient(#c0272d_1px,transparent_1px)] [background-size:12px_12px]" />

          <div className="flex items-center justify-between z-10">
            <span className="text-[10px] font-bold tracking-widest uppercase bg-white/10 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/15">
              {category}
            </span>
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-brand-red group-hover:text-white transition-colors duration-200">
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>

          <div className="z-10">
            <p className="text-xs text-neutral-300 uppercase tracking-wider font-mono">{caseType}</p>
            <h3 className="text-xl sm:text-2xl font-black mt-1 leading-snug group-hover:text-brand-redLight transition-colors">
              {title}
            </h3>
          </div>
        </div>

        {/* Content Details */}
        <div className="p-6 flex-1 flex flex-col justify-between">
          <div>
            <p className="text-sm font-medium text-brand-black mb-2">{tagline}</p>
            <p className="text-xs text-neutral-600 line-clamp-2 mb-4 leading-relaxed">{description}</p>

            {/* Metrics pills */}
            {metrics && (
              <div className="grid grid-cols-2 gap-2 mb-4 p-3 bg-neutral-50 rounded-xl border border-neutral-100">
                {metrics.map((m, idx) => (
                  <div key={idx} className="text-left">
                    <p className="text-sm font-extrabold text-brand-red">{m.value}</p>
                    <p className="text-[10px] uppercase tracking-wider text-neutral-500">{m.label}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="pt-3 border-t border-neutral-100 flex items-center justify-between">
            <div className="flex flex-wrap gap-1.5">
              {techStack.slice(0, 3).map((tech, i) => (
                <span key={i} className="text-[10px] font-mono bg-neutral-100 text-neutral-600 px-2 py-0.5 rounded">
                  {tech}
                </span>
              ))}
              {techStack.length > 3 && (
                <span className="text-[10px] font-mono text-neutral-400 self-center">
                  +{techStack.length - 3}
                </span>
              )}
            </div>
            <span className="text-xs font-semibold text-brand-red hover:underline">
              View Blueprint &rarr;
            </span>
          </div>
        </div>
      </div>

      {/* Case Study Blueprint Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-neutral-200">
            {/* Modal Header */}
            <div className={`p-6 sm:p-8 bg-gradient-to-br ${imageColor} text-white flex items-start justify-between relative`}>
              <div>
                <span className="text-[10px] font-bold tracking-widest uppercase bg-brand-red px-2.5 py-1 rounded-full">
                  {caseType} &bull; {category}
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold mt-3">{title}</h3>
                <p className="text-sm text-neutral-300 mt-1">{tagline}</p>
              </div>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-6">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2 flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-brand-red" />
                  <span>Market Challenge &amp; Context</span>
                </h4>
                <p className="text-sm text-neutral-700 leading-relaxed">{description}</p>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2 flex items-center gap-1.5">
                  <Cpu className="w-4 h-4 text-brand-red" />
                  <span>The Engineering Solution</span>
                </h4>
                <p className="text-sm text-neutral-700 leading-relaxed">{impact}</p>
              </div>

              {/* Verified Metrics Blueprint */}
              {metrics && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-3 flex items-center gap-1.5">
                    <TrendingUp className="w-4 h-4 text-brand-red" />
                    <span>Projected Performance Outcomes</span>
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {metrics.map((m, idx) => (
                      <div key={idx} className="bg-neutral-50 p-3.5 rounded-xl border border-neutral-200">
                        <p className="text-lg font-black text-brand-red">{m.value}</p>
                        <p className="text-xs text-neutral-600 font-medium">{m.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Technologies Used */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">
                  Architecture &amp; Stack
                </h4>
                <div className="flex flex-wrap gap-2">
                  {techStack.map((tech, idx) => (
                    <span key={idx} className="text-xs font-mono bg-neutral-100 text-neutral-800 px-3 py-1 rounded-md border border-neutral-200">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-neutral-100 flex items-center justify-end gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </Button>
                <Button
                  to="/contact"
                  variant="primary"
                  size="sm"
                  onClick={() => setShowModal(false)}
                >
                  Build Similar Solution
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
