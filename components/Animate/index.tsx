"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useDebounce } from "use-debounce";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Element from "./Element";
import gsap from "gsap";
import Scrub from "./Scrub";
import { withAnimateBase } from "./withAnimateBase";
import isEqual from "react-fast-compare";
import { usePathname } from "next/navigation";

gsap.registerPlugin(ScrollTrigger);

export const AnimateContext = React.createContext({
    isNestedInAnimate: false,
});

interface AnimateProps {
    children: React.ReactNode;
}

const Animate: React.FC<AnimateProps> = ({ children }) => {
    const [viewportWidth, setViewportWidth] = useState<number | null>(null);
    const [resizedWidth] = useDebounce(viewportWidth, 500);

    const handleResize = useCallback(() => {
        setViewportWidth(window.innerWidth);
    }, []);

    const hasScrolledRef = useRef(false);
    const pathname = usePathname();

    const handleResetScrollTrigger = useCallback(() => {
        ScrollTrigger.refresh();
    }, []);

    // The App Router has no equivalent of the Pages Router's Router.events, so
    // refresh on mount and again whenever the path changes.
    useEffect(() => {
        ScrollTrigger.refresh();
    }, [pathname]);

    // ScrollTrigger.refresh() recalculates every trigger and forces a synchronous
    // layout, so it has to run at most once here. Gating it on React state meant
    // every scroll event that landed before the re-render ran another refresh --
    // dozens of forced reflows in the first moments of scrolling. A ref closes
    // that window, and the listener is passive so it can never block scrolling.
    useEffect(() => {
        const onFirstScroll = () => {
            if (hasScrolledRef.current) return;
            hasScrolledRef.current = true;
            window.removeEventListener("scroll", onFirstScroll);
            ScrollTrigger.refresh();
        };

        window.addEventListener("scroll", onFirstScroll, { passive: true });
        return () => window.removeEventListener("scroll", onFirstScroll);
    }, []);

    useEffect(() => {
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [handleResize]);

    useEffect(() => {
        if (resizedWidth === null) return;
        handleResetScrollTrigger();
    }, [resizedWidth, handleResetScrollTrigger]);

    const childs = useMemo(() => <>{children}</>, [children]);

    return (
        <AnimateContext.Provider value={{ isNestedInAnimate: true }}>
            {childs}
        </AnimateContext.Provider>
    );
};

export default Object.assign(React.memo(Animate, isEqual), {
    Element: withAnimateBase(Element),
    Scrub: withAnimateBase(Scrub),
});
