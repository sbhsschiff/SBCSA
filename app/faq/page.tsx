"use client";
import { FAQSection } from "@/common/interfaces/faq";
import faq from "@/common/data/faq.json";
import FAQItem from "@/components/FAQ/FAQItem";
import PageTitle from "@/components/PageTitle";

export default function FAQ() {
  const data: FAQSection[] = faq;

  return (
    <>
      <div id="title" className="mt-28 md:mt-32 mb-10">
        <PageTitle className="text-center">Frequently Asked Questions</PageTitle>
      </div>
      <div className="flex flex-col gap-5 w-full justify-center items-center">
        {data.map((section, index) => (
          <div key={index} className="w-full p-10 md:w-2/3 flex flex-col gap-3">
            <h2 className="text-gray-400 text-medium text-xl">{section.title}</h2>
            <div className="flex gap-3 flex-col justify-center items-center">
              {section.items.map((item, index) => (
                <FAQItem key={index} item={item} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
