import React, { useState } from 'react';
import { INITIAL_FAQS } from '../data/initialData';
import { ChevronDown, HelpCircle, MessageCircle } from 'lucide-react';
import { useBusiness } from '../context/BusinessContext';

export const FAQSection: React.FC = () => {
  const { businessInfo } = useBusiness();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 bg-[#090a0f] text-[#f5f5f7]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4">
          <span className="text-xs font-semibold tracking-widest text-[#d4af37] uppercase">
            Got Questions?
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-neutral-400">
            Everything you need to know about reserving, customizing, and executing your decoration package.
          </p>
        </div>

        <div className="mt-12 space-y-4">
          {INITIAL_FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="rounded-xl bg-[#121520] border border-[#242735] overflow-hidden transition-all"
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-[#161924] transition-colors"
                >
                  <span className="text-sm sm:text-base font-serif font-semibold text-white">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#d4af37] shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-xs sm:text-sm text-neutral-300 leading-relaxed border-t border-[#1d202d] pt-4">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Quick query WhatsApp strip */}
        <div className="mt-10 text-center text-xs text-neutral-400 flex items-center justify-center gap-2">
          <span>Still have a question?</span>
          <a
            href={`https://wa.me/${businessInfo.whatsapp}?text=${encodeURIComponent(
              'Hello Yash Decoration! I have a question regarding event decoration services.'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#d4af37] font-semibold hover:underline inline-flex items-center gap-1"
          >
            <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
            <span>Chat directly on WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
};
