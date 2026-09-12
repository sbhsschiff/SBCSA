"use client";
import courses from "@/common/data/courses.json";
import { Course } from "@/common/interfaces/course";
import CourseItem from "@/components/Courses/CourseItem";
import styles from "./courses.module.css";
import styled from "styled-components";

const ShimmeringH1 = styled.h1`
  background-image: linear-gradient(90deg, #8c8796 0%, white 40%, #8c8796 60%);
  -webkit-background-clip: text;
  background-clip: text;
  width: 1000px;
  color: transparent;
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
    letter-spacing: -6px !important;
    width: 400px;
  }
`;

export default function Courses() {
  // load in data from courses.json
  const pre: Course[] = courses["pre"];
  const during: Course[] = courses["during"];

  return (
    <>
      <div id="title" className="my-10">
        <ShimmeringH1
          style={{
            lineHeight: "1.3",
            letterSpacing: "-12px",
          }}
          className="text-9xl text-white justify-center text-center"
        >
          Courses
        </ShimmeringH1>
      </div>

      <div className={`${styles.courses} flex flex-col w-full gap-16 md:mt-10 mt-3 mb-20`} id="courses">
        {pre.map((item, index) => (
          <CourseItem key={index} courseInfo={item} />
        ))}

        <div className={`${styles.border} my-3 text-center flex justify-center items-center text-3xl font-bold py-3`}>Computer Science Academy</div>

        {during.map((item, index) => (
          <CourseItem key={index} courseInfo={item} />
        ))}
      </div>
    </>
  );
}
