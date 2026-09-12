"use client";

import Image from "next/image";
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

const PHOTOS = [
  { src: "/ai/track-overhead.jpg", alt: "Academy students testing a DuckieBot on the Duckietown track" },
  { src: "/ai/team-selfie.jpg", alt: "Students with a DuckieBot and their laptops during a build session" },
  { src: "/ai/floor-testing.jpg", alt: "Students debugging a DuckieBot alongside the track" },
  { src: "/ai/lab-workstation.jpg", alt: "Students reviewing DuckieBot telemetry at a lab workstation" },
  { src: "/ai/group.jpg", alt: "The Computer Science Academy cohort around the full Duckietown track", wide: true },
];

export default function ArtificialIntelligence() {
  return (
    <main className="w-full max-w-screen-lg px-6 md:px-10 mt-28 md:mt-32 mb-24">
      <ShimmeringH1 className="text-white">Artificial Intelligence</ShimmeringH1>

      <div className="mt-8 flex flex-col gap-5 text-base md:text-lg leading-relaxed text-[rgba(255,255,255,0.75)]">
        <p>
          AI has been progressing at a rapid pace, and it&rsquo;s clear that it will have a large impact on the tech
          space as a whole, as well as Computer Science. It is clear that anyone who works in the technology space will
          need to understand these tools and be able to adapt as they change. Students who take our classes will be
          provided with practical and theoretical experiences to help them understand this new technology stack.
        </p>
        <p>
          We have a clear mandate not only to teach about current approaches to modern technology use, but also to adapt
          and be flexible as things change in the future. During a student&rsquo;s time in our program, they will start
          by learning basic coding, but they will also have AI topics integrated into their experience&mdash;and those
          experiences will expand as the student progresses through the program.
        </p>
        <p>
          In our intro class, students will learn about and program their own perceptron. As appropriate, these
          integrated experiences will continue to expand in complexity as students learn about training AI agents,
          Model Context Protocol (MCP) servers, Retrieval-Augmented Generation (RAG), computer vision, large language
          models (LLMs), and autonomous robotics. These topics will adapt as we start to see industry trends emerge.
        </p>
        <p>
          The premier experience in the Academy is the <span className="text-white">DuckieBots from Duckietown</span>.
          This small vehicle is powered by a Jetson Nano and is capable of handling all of the necessary AI compute
          onboard. This university-level engineering experience has been adapted for our students, and students will
          learn about how robots see the world and how to create their own self-driving vehicle. This experience is not
          about coding; it is about how to solve a problem&mdash;a problem that is novel for the students and requires
          some serious thought. It will also allow students to experience the full breadth of AI tools.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {PHOTOS.map(({ src, alt, wide }) => (
          <div
            key={src}
            className={
              "relative aspect-[4/3] overflow-hidden rounded-2xl border border-solid border-[rgba(255,255,255,0.12)]" +
              (wide ? " sm:col-span-2" : "")
            }
          >
            <Image
              src={src}
              alt={alt}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </main>
  );
}
