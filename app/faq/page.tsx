"use client";
import { FAQSection } from "@/common/interfaces/faq";
import faq from "@/common/data/faq.json";
import FAQItem from "@/components/FAQ/FAQItem";
import styled from "styled-components";

const ShimmeringH1 = styled.h1`
  background-image: linear-gradient(90deg, #8c8796 0%, white 40%, #8c8796 60%);
  -webkit-background-clip: text;
  background-clip: text;
  width: 1000px;
  font-size: 9rem;
  color: transparent;
  letter-spacing: -12px;
  /* The travel distance must equal the gradient tile, or the loop snaps mid-pattern.
     The media queries below change the element width, so the tile is pinned instead. */
  background-size: 1000px 100%;
  animation: shineTitle 3s linear infinite;
  @keyframes shineTitle {
    0% {
      background-position: 0px;
    }
    100% {
      background-position: 1000px;
    }
  }

  @media (max-width: 1000px) {
    font-size: 7rem;
    width: 700px;
    letter-spacing: -8px;
  }
  @media (max-width: 700px) {
    font-size: 5rem;
    letter-spacing: -6px;
    width: 400px;
  }
`;

export default function FAQ() {
  const data: FAQSection[] = faq;

  return (
    <>
      <div id="title" className="my-10">
        <ShimmeringH1
          style={{
            lineHeight: "1.3",
          }}
          className="text-9xl text-white justify-center text-center"
        >
          Frequently Asked Questions
        </ShimmeringH1>
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
