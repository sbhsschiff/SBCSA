"use client";

import Animate from '@/components/Animate';
import Image from 'next/image';

import styled from 'styled-components';

const APPLY_HREF =
  "https://docs.google.com/document/d/1qrq504NNbUvJ0f42lQehynbf83H611cQjeTQmuMBv2o/edit#bookmark=id.29fj8xypyizl";

const GOLD_RULE = "linear-gradient(90deg, transparent, rgba(177,155,55,0.85), transparent)";
const MARK_GLOW =
  "radial-gradient(circle, rgba(177,155,55,0.34) 0%, rgba(177,155,55,0.10) 42%, transparent 68%)";

const Wordmark = styled.h1`
  --gold-metal: linear-gradient(180deg, #fdf3ce 0%, #ecd695 26%, #d4b25c 55%, #b08f34 78%, #8f7024 100%);
  --gold-bright: linear-gradient(180deg, #fff8e0 0%, #f4e2a6 34%, #e3c96d 68%, #cdb055 100%);
  --sweepdur: 1.8s;

  margin: 0;
  max-width: 100%;
  font-size: clamp(1.25rem, 3.35vw, 2.5rem);
  font-weight: 750;
  line-height: 1.06;
  letter-spacing: -0.012em;
  text-transform: uppercase;
  text-wrap: balance;

  span {
    display: block;
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }

  /* The ampersand is deliberately static: metallic ramp, no sweep. */
  .amp {
    background-image: var(--gold-metal);
    font-size: 56%;
    line-height: 1;
    letter-spacing: 0;
    margin: 0.1em 0 0.04em;
  }

  /* Layer one is a single 620px highlight that travels fully off one edge to fully
     off the other; layer two is the flat base beneath it. Pinning the travel to the
     same 620px as the band keeps the loop seamless regardless of text width, and
     parking it off-frame for the rest of the cycle is what creates the pause
     between the two lines. Transparent stops are rgba(...,0) rather than the
     transparent keyword, which interpolates through transparent black. */
  .acs,
  .ai {
    background-size: 620px 100%, 100% 100%;
    background-repeat: no-repeat;
    background-position: calc(100% + 620px) 0, 0 0;
    animation: shineTitle var(--sweepdur) linear 1 both;
  }
  .acs {
    background-image:
      linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, #ffffff 50%, rgba(255, 255, 255, 0) 100%),
      linear-gradient(#8c8796, #8c8796);
  }
  .ai {
    background-image:
      linear-gradient(90deg, rgba(255, 248, 224, 0) 0%, #fff8e0 50%, rgba(255, 248, 224, 0) 100%),
      linear-gradient(#cdb055, #cdb055);
    /* half-cycle delay, so the gold line always follows the white one */
    animation-delay: calc(var(--sweepdur) / 2);
  }

  @keyframes shineTitle {
    0% {
      background-position: -620px 0, 0 0;
    }
    100% {
      background-position: calc(100% + 620px) 0, 0 0;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .acs,
    .ai {
      animation: none;
    }
    .acs {
      background-image: linear-gradient(#f5f3ef, #f5f3ef);
    }
    .ai {
      background-image: var(--gold-bright);
    }
  }
`;

export default function Home() {
  return (
    <Animate>
      <header className="overflow-hidden relative p-8 w-full min-h-[calc(100dvh-70px)] justify-center max-w-screen-xl flex flex-col items-center">
        <Animate.Element
          className='absolute w-full h-full top-0 left-0 transition-transform'
          resetAfterTriggered={false}
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
          className='z-30 transition-transform flex flex-col items-center text-center'
          resetAfterTriggered={false}
          onActivatedClasses='scale-100 duration-500 delay-500'
          onDeactivatedClasses='scale-[0.5]'
        >
          <Animate.Element
            className='translate-y-[40px]'
            resetAfterTriggered={false}
            onDeactivatedClasses='opacity-0'
            onActivatedClasses='opacity-100 transition-opacity duration-500'
          >
            <Wordmark>
              <span className="acs">Academy of Computer Science</span>
              <span className="amp">&amp;</span>
              <span className="ai">Artificial Intelligence</span>
            </Wordmark>
          </Animate.Element>

          <Animate.Element
            className='relative my-[18px] leading-[0]'
            resetAfterTriggered={false}
            onDeactivatedClasses='opacity-0'
            onActivatedClasses='opacity-100 transition-opacity duration-500 delay-100'
          >
            <div
              aria-hidden="true"
              style={{ background: MARK_GLOW }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[190%] aspect-square rounded-full blur-[14px] pointer-events-none"
            />
            <Image
              width={200}
              height={281}
              alt="CSA Logo"
              src="/logo.png"
              className="relative w-[120px] md:w-[160px] lg:w-[200px] h-auto opacity-[0.38]"
            />
          </Animate.Element>

          <Animate.Element
            className='-translate-y-[38px]'
            resetAfterTriggered={false}
            onDeactivatedClasses='opacity-0'
            onActivatedClasses='opacity-100 transition-opacity duration-500 delay-200'
          >
            <p className="text-xl md:text-2xl lg:text-3xl tracking-tight text-[rgba(255,255,255,0.9)]">
              Teaching the skills that shape the future.
            </p>

            <div
              aria-hidden="true"
              style={{ background: GOLD_RULE }}
              className="w-[190px] h-[1px] mt-5 mx-auto"
            />

            <h2 className="text-base md:text-xl lg:text-2xl mt-[18px] tracking-tight text-[rgba(255,255,255,0.6)]">
              A South Brunswick High School <span className="text-white">Career Academy</span> experience.
            </h2>

            <a
              href={APPLY_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-[26px] inline-flex items-center gap-2 px-[22px] py-[11px] rounded-[3px] border-[1px] border-solid border-viking-gold bg-[rgba(177,155,55,0.09)] text-[#e3c96d] text-[12.5px] font-bold uppercase tracking-[0.1em] hover:bg-[rgba(177,155,55,0.2)] hover:text-white transition-colors"
            >
              Apply Now &rsaquo;
            </a>
          </Animate.Element>
        </Animate.Element>
      </header>
    </Animate>
  );
}
