"use client";

import styled from "styled-components";

/**
 * The single heading style for every page.
 *
 * Typography is taken from the home page wordmark (components live in app/page.tsx)
 * so page titles read as the same family: same weight, uppercase, tight tracking.
 * Only the size is scaled up, since a page title is one line rather than three.
 *
 * The highlight sweeps across once on mount and parks off-frame, leaving the flat
 * base colour behind. `both` fill is what holds the band off-screen before the
 * animation starts and after it ends -- without it the sweep would sit mid-word on
 * the first paint.
 */
const PageTitle = styled.h1`
    --sweepdur: 2.6s;
    --title-base: #8c8796;

    margin: 0;
    max-width: 100%;
    font-size: clamp(2rem, 5vw, 4rem);
    font-weight: 750;
    line-height: 1.06;
    letter-spacing: -0.012em;
    text-transform: uppercase;
    text-wrap: balance;

    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;

    background-repeat: no-repeat;
    background-size: 620px 100%, 100% 100%;
    background-position: calc(100% + 620px) 0, 0 0;
    background-image:
        linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, #ffffff 50%, rgba(255, 255, 255, 0) 100%),
        linear-gradient(var(--title-base), var(--title-base));
    animation: sweepTitle var(--sweepdur) linear 1 both;

    @keyframes sweepTitle {
        0% {
            background-position: -620px 0, 0 0;
        }
        100% {
            background-position: calc(100% + 620px) 0, 0 0;
        }
    }

    @media (prefers-reduced-motion: reduce) {
        animation: none;
        background-image: linear-gradient(#f5f3ef, #f5f3ef);
    }
`;

export default PageTitle;
