"use client";

import Animate from '@/components/Animate';
import Image from 'next/image';

import styled from 'styled-components';

// import { useEffect } from 'react';
// import Scrollbar from 'smooth-scrollbar';

const ShimmeringH1 = styled.h1`
background-image: linear-gradient(90deg, #8C8796 0%, white 40%, #8C8796 60%);
  -webkit-background-clip: text;
  background-clip: text;
  max-width: 100%;
  font-size: clamp(1.5rem, 5vw, 4.5rem);
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
`

export default function Home() {
  return (
    <Animate>
      <header className="overflow-hidden relative p-8 w-screen min-h-screen justify-center max-w-screen-xl flex flex-col items-center">
        <Animate.Element 
          className='absolute w-full h-full top-0 left-0 transition-transform'
          onActivatedClasses='scale-[2] duration-[1s] delay-500'
          onDeactivatedClasses='scale-[0.75]'
        >
          <Image 
            className='pointer-events-none object-contain'
            fill
            sizes="100vw"
            src="/macbook-air.png"
            alt="Macbook"
          />
        </Animate.Element>
        <Animate.Element
          className='z-30 transition-transform' 
          onActivatedClasses='scale-100 duration-500 delay-500'
          onDeactivatedClasses='scale-[0.5]'
        >
        <div className="flex flex-row items-start gap-4 md:gap-6 lg:gap-8">
        <Animate.Element 
          className='shrink-0 -mt-2 md:-mt-4 lg:-mt-6'
          onDeactivatedClasses='opacity-0'
          onActivatedClasses='opacity-100 transition-opacity duration-500'
        >
          <Image 
              width={150}
              height={150}
              alt="CSA Logo"
              src="/logo.png"
              className="w-16 md:w-24 lg:w-[150px] h-auto"
          />
        </Animate.Element>
        <Animate.Element
          onDeactivatedClasses='opacity-0'
          onActivatedClasses='opacity-100 transition-opacity duration-500'
        >
          <ShimmeringH1 className="text-white">
            Academy of Computer Science<br/>and Artificial Intelligence
          </ShimmeringH1>
        </Animate.Element>
        </div>
        <Animate.Element
          onDeactivatedClasses='opacity-0'
          onActivatedClasses='opacity-100 transition-opacity duration-500 delay-200'
        >
          <p className="text-xl md:text-2xl lg:text-3xl mt-6 tracking-tight text-[rgba(255,255,255,0.9)]">
            Teaching the skills that shape the future.
          </p>
        </Animate.Element>
        <Animate.Element
          onDeactivatedClasses='opacity-0'
          onActivatedClasses='opacity-100 transition-opacity duration-500 delay-300'
        >
          <h2 className="text-base md:text-xl lg:text-2xl mt-4 tracking-tight text-[rgba(255,255,255,0.6)]">
            A South Brunswick High School <span className="text-white">Career Academy</span> experience.
          </h2>
        </Animate.Element>
        </Animate.Element>
        <div className="mt-10 flex space-x-3 justify-center">
        {/* <Animate.Element
            onDeactivatedClasses="-translate-x-[100px]"
            onActivatedClasses="translate-x-0"
            className="transition-all duration-700"
          >
            <Image 
              className="rounded-[45px] border-solid border-[12px] border-[rgba(255,255,255,0.1)]"
              src="/projects/weather-1.png"
              width={275}
              height={550}
              alt="Weather 1"
            />  
          </Animate.Element>
          <Animate.Element
            onDeactivatedClasses="-translate-x-[100px]"
            onActivatedClasses="translate-x-0"
            className="transition-all duration-500"
          >
            <Image 
              className="rounded-[45px] border-solid border-[12px] border-[rgba(255,255,255,0.1)]"
              src="/projects/weather-0.png"
              width={275}
              height={550}
              alt="Weather 0"
            />  
          </Animate.Element>
          <div className="flex flex-col space-y-[20px]">
            <Animate.Element
              onDeactivatedClasses="translate-y-[100px]"
              onActivatedClasses="translate-y-0"
              className="transition-all duration-500"
            >
              <Image 
                className="rounded-[45px] border-solid border-[12px] border-[rgba(255,255,255,0.1)]"
                src="/projects/keyboard.png"
                width={500}
                height={250}
                alt="Keyboard"
              />  
            </Animate.Element>
            <Animate.Element
              onDeactivatedClasses="translate-y-[100px]"
              onActivatedClasses="translate-y-0"
              className="transition-all duration-500"
              resetAfterTriggered={false}
            >
              <Image 
                className="rounded-[45px] border-solid border-[12px] border-[rgba(255,255,255,0.1)]"
                src="/projects/keyboard.png"
                width={500}
                height={250}
                alt="Keyboard"
              />  
            </Animate.Element>
          </div>
          <Animate.Element
            onDeactivatedClasses="translate-x-[100px]"
            onActivatedClasses="translate-x-0"
            className="transition-all duration-700"
          >
            <Image 
              className="rounded-[45px] border-solid border-[12px] border-[rgba(255,255,255,0.1)]"
              src="/projects/notflix.png"
              width={275}
              height={550}
              alt="Notflix"
            />  
          </Animate.Element> */}
        </div>
      </header>
      <section>
        
      </section>
    </Animate>
  );

}