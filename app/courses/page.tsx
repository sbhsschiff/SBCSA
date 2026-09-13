"use client";
import courses from "@/common/data/courses.json";
import { Course } from "@/common/interfaces/course";
import CourseItem from "@/components/Courses/CourseItem";
import styles from "./courses.module.css";
import PageTitle from "@/components/PageTitle";

export default function Courses() {
  // load in data from courses.json
  const pre: Course[] = courses["pre"];
  const during: Course[] = courses["during"];

  return (
    <>
      <div id="title" className="mt-28 md:mt-32 mb-10">
        <PageTitle className="text-center">Courses</PageTitle>
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
