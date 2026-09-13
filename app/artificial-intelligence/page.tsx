"use client";

import Image from "next/image";
import PageTitle from "@/components/PageTitle";

const PHOTOS = [
  { src: "/ai/track-overhead.jpg", alt: "Academy students testing a DuckieBot on the Duckietown track" },
  { src: "/ai/team-selfie.jpg", alt: "Students with a DuckieBot and their laptops during a build session" },
  { src: "/ai/floor-testing.jpg", alt: "Students debugging a DuckieBot alongside the track" },
  { src: "/ai/lab-workstation.jpg", alt: "Students reviewing DuckieBot telemetry at a lab workstation" },
];

const GROUP_PHOTO = {
  src: "/ai/group.jpg",
  alt: "The Computer Science Academy cohort around the full Duckietown track",
};

const TILE = "relative aspect-[4/3] overflow-hidden rounded-2xl border border-solid border-[rgba(255,255,255,0.12)]";

export default function ArtificialIntelligence() {
  return (
    <main className="w-full max-w-screen-lg px-6 md:px-10 mt-28 md:mt-32 mb-24">
      <PageTitle>Artificial Intelligence</PageTitle>

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
          by learning basic coding, but they will also have AI topics integrated into their experience, and those
          experiences will expand as the student progresses through the program.
        </p>
        <p>
          In our intro class, students will learn about and program their own perceptron. As appropriate, these
          integrated experiences will continue to expand in complexity as students learn about training AI agents,
          Model Context Protocol (MCP) servers, Retrieval-Augmented Generation (RAG), computer vision, large language
          models (LLMs), and autonomous robotics. These topics will adapt as we start to see industry trends emerge.
        </p>
        <p>
          The premier experience in the Academy is the <span className="text-white">DuckieBots</span> from{" "}
          <a
            href="https://duckietown.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white underline underline-offset-4 hover:text-viking-gold transition-colors"
          >
            Duckietown
          </a>
          . This small vehicle is powered by a Jetson Nano and is capable of handling all of the necessary AI compute
          onboard. This university-level engineering experience has been adapted for our students, and students will
          learn about how robots see the world and how to create their own self-driving vehicle. This experience is not
          about coding; it is about how to solve a problem, one that is novel for the students and requires some serious
          thought. It will also allow students to experience the full breadth of AI tools.
        </p>
      </div>

      {/* Four photos in a 2x2 square, with the group shot full width beneath. */}
      <div className="mt-12 grid grid-cols-2 gap-4">
        {PHOTOS.map(({ src, alt }) => (
          <div key={src} className={TILE}>
            <Image src={src} alt={alt} fill sizes="(max-width: 1024px) 50vw, 512px" className="object-cover" />
          </div>
        ))}
      </div>

      <Image
        src={GROUP_PHOTO.src}
        alt={GROUP_PHOTO.alt}
        width={1800}
        height={1355}
        sizes="(max-width: 1024px) 100vw, 1024px"
        className="mt-4 w-full h-auto rounded-2xl border border-solid border-[rgba(255,255,255,0.12)]"
      />
    </main>
  );
}
