"use client";

import { EventGroup } from "@/common/interfaces/event";
import events from "@/common/data/events.json";
import PageTitle from "@/components/PageTitle";

export default function TripsAndEvents() {
  const data: EventGroup[] = events;

  return (
    <main className="w-full max-w-screen-lg px-6 md:px-10 mt-28 md:mt-32 mb-24">
      <PageTitle>Trips and Events</PageTitle>

      <p className="mt-8 text-base md:text-lg leading-relaxed text-[rgba(255,255,255,0.75)]">
        Trips and events rotate each year and really depend on the availability of the business or engineer looking
        to host us. Here are some of our past events.
      </p>

      <div className="mt-12 flex flex-col gap-12">
        {data.map((group) => (
          <section key={group.title}>
            <h2 className="text-viking-gold text-sm font-semibold uppercase tracking-[0.16em]">{group.title}</h2>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              {group.items.map((item) => (
                <article
                  key={item.name}
                  className="bg-zinc-800 shadow-md shadow-zinc-950 rounded-xl px-5 py-5 flex flex-col gap-2"
                >
                  <h3 className="font-bold text-white">{item.name}</h3>
                  <p className="text-sm md:text-base leading-relaxed text-[rgba(255,255,255,0.75)]">
                    {item.description}
                  </p>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
