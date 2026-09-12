import { Course } from "@/common/interfaces/course";
import Image from "next/image";
import { AiOutlineInfoCircle, AiOutlineLink, AiOutlineWarning } from "react-icons/ai";
import { IconContext } from "react-icons";
import { motion } from "framer-motion";

interface CourseItemProps {
  courseInfo: Course;
}

export default function CourseItem({ courseInfo }: CourseItemProps) {
  return (
    <div className={`relative w-full px-[10%] flex justify-center`}>
      <div className="absolute top-1/2 left-[10%] transform -translate-x-1/2 -translate-y-1/2 bg-viking-gold rounded-full w-10 h-10 flex items-center justify-center">
        <div className="text-center text-2xl font-bold text-black h-fit align-middle">{courseInfo.grade}</div>
      </div>
      <motion.div
        key="page"
        initial="initialState"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{
          duration: 0.75,
        }}
        variants={{
          initialState: {
            x: 50,
            opacity: 0.5,
          },
          visible: {
            x: 0,
            opacity: 1,
            transition: {
              type: "spring",
              stiffness: 220,
              damping: 30,
              delay: 0.1,
            },
          },
        }}
        className="w-10/12"
      >
        <div className="bg-zinc-800 shadow-md shadow-zinc-950 text-white  outline-1 gap-5 items-center outline-zinc-700 flex flex-row w-full px-5 py-5 rounded-xl">
          {courseInfo.image_path && (
            <div className="flex-shrink-0 hidden lg:block">
              <Image src={courseInfo.image_path} alt={""} width={150} height={150} className={"rounded-md"} />
            </div>
          )}
          <div className="flex flex-col gap-3">
            <h1 className="text-xl font-extrabold">{courseInfo.name}</h1>
            <p className="font-normal">{courseInfo.description}</p>
            <div className="flex justify-between font-semibold">
              {courseInfo.grade}th Grade • {courseInfo.weighting} Weighting • {courseInfo.credits} Credits
            </div>
            <div className="flex flex-col">
              <h3 className="font-bold">Prerequisites:</h3>
              <ul className="list-inside list-disc">
                {courseInfo.prereqs?.map((item, index) => (
                  <li key={index} className={"text-white "}>
                    <span className="font-semibold">{item.class}</span>
                    <span className="font-normal"> - {item.grade}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-wrap gap-2 justify-start items-center">
              {courseInfo.tags?.map((item, index) => (
                <div key={index} className={"rounded-lg px-2 py-[2px] text-black font-medium bg-viking-gold"}>
                  {item}
                </div>
              ))}
            </div>
            {courseInfo.warnings && (
              <div className="flex flex-wrap gap-2 justify-start items-center">
                {courseInfo.warnings?.map((item, index) => (
                  <div key={index} className={"rounded-lg px-2 py-[2px] text-white font-medium bg-red-500 flex gap-2 items-center justify-start"}>
                    <IconContext.Provider value={{ className: "w-5 h-5" }}>
                      <div>
                        <AiOutlineWarning />
                      </div>
                    </IconContext.Provider>
                    {item}
                  </div>
                ))}
              </div>
            )}

            {courseInfo.infoLabels && (
              <div className="flex flex-wrap gap-2 justify-start items-center">
                {courseInfo.infoLabels?.map((item, index) => (
                  <div key={index} className={"rounded-lg px-2 py-[2px] text-white font-medium bg-blue-600 flex gap-2 items-center justify-start"}>
                    <IconContext.Provider value={{ className: "w-5 h-5" }}>
                      <div>
                        <AiOutlineInfoCircle />
                      </div>
                    </IconContext.Provider>
                    {item}
                  </div>
                ))}
              </div>
            )}

            <div className="flex gap-x-4 gap-y-1 flex-wrap text-white items-center justify-start ">
              {courseInfo.links?.map((item, index) => (
                <a key={index} className=" hover:text-viking-gold flex items-center font-title font-light justify-center gap-1" target="_blank" href={item.href} rel="noopener noreferrer">
                  <IconContext.Provider value={{ className: "w-5 h-5" }}>
                    <div>
                      <AiOutlineLink />
                    </div>
                  </IconContext.Provider>
                  {item.title}
                </a>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
