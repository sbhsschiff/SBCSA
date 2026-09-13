"use client";

import PageTitle from "@/components/PageTitle";

export default function Research() {
  return (
    <main className="w-full max-w-screen-lg px-6 md:px-10 mt-28 md:mt-32 mb-24">
      <PageTitle>Research and Independent Projects</PageTitle>

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
