"use client";

import styled from "styled-components";

const ShimmeringH1 = styled.h1`
  background-image: linear-gradient(90deg, #8c8796 0%, white 40%, #8c8796 60%);
  -webkit-background-clip: text;
  background-clip: text;
  max-width: 100%;
  font-size: clamp(2rem, 5vw, 4rem);
  line-height: 1.1;
  letter-spacing: -0.045em;
  color: transparent;
  animation: shineTitle 3s linear infinite;
  @keyframes shineTitle {
    0% {
      background-position: 0px;
    }
    100% {
      background-position: 1000px;
    }
  }
`;

export default function Research() {
  return (
    <main className="w-full max-w-screen-lg px-6 md:px-10 mt-28 md:mt-32 mb-24">
      <ShimmeringH1 className="text-white">Research and Independent Projects</ShimmeringH1>

      <div className="mt-8 flex flex-col gap-5 text-base md:text-lg leading-relaxed text-[rgba(255,255,255,0.75)]">
        <p>
          In the <span className="text-white">Capstone class</span>, students will spend their last month of senior year
          working on a culminating project that shows what they have learned over their four-year tenure at South
          Brunswick High School. Students are encouraged to create a project that effectively leverages AI, which they
          can speak to in a job interview. The goal of these projects is to give our students confidence and allow them
          to explore a topic in the tech field that they are passionate about.
        </p>
        <p>
          These projects can range from autonomous drone projects to interactive media with projection mapping,
          NFC-based tracking projects, or theoretical papers. Students will work under the supervision of the Computer
          Science Chair to create something that is not only technologically advanced using the current tech stack, but
          also interests them.
        </p>
        <p>
          It is our hope that all students in the program are able to showcase their work on their resume, and, most
          importantly, that they are able to explain what they did and what they learned to potential employers.
        </p>
      </div>
    </main>
  );
}
