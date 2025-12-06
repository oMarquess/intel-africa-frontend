"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "Does this work with Ghanaian/Nigerian accents?",
    answer: "Yes. It's specifically optimized for West African accents and dialects."
  },
  {
    question: "Can I deploy this on-premise?",
    answer: "Yes — private cloud and on-prem options for banks, telcos, and governments."
  },
  {
    question: "How accurate is the transcription?",
    answer: "Benchmarks show significantly higher accuracy on African speech compared to global models."
  },
  {
    question: "What languages do you support?",
    answer: "English, French, Pidgin, Twi, Yoruba, Hausa, Swahili, Amharic — with more coming."
  },
  {
    question: "Do you have SDKs?",
    answer: "Nope: Coming soon"
  },
  {
    question: "Can it integrate with my call center system?",
    answer: "Yes — integrates via API with DLP, Twilio, Asterisk, and other PBX/CRM tools."
  }
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold tracking-tight text-center mb-12" style={{ fontFamily: 'Doto, sans-serif' }}>
          Frequently Asked Questions
        </h2>
        
        <div className="max-w-4xl mx-auto space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="group rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-all duration-300"
              // style={{
              //   borderLeft: openIndex === index ? '4px solid #ca6441' : '4px solid transparent'
              // }}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-6 text-left transition-colors"
              >
                <span className="font-bold text-lg pr-8 group-hover:text-[#ca6441] transition-colors">
                  {faq.question}
                </span>
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                  openIndex === index ? 'bg-[#ca6441] rotate-180' : 'bg-gray-100 group-hover:bg-gray-200'
                }`}>
                  <ChevronDown
                    className={`w-5 h-5 transition-colors ${
                      openIndex === index ? "text-white" : "text-gray-600"
                    }`}
                  />
                </div>
              </button>
              
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-6 pb-6 text-gray-700 leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
