"use client";

import React, { ComponentPropsWithoutRef, ElementType, useState } from "react";
import gsap from "gsap";
import { useRef } from "react";
import { useCallback } from "react";
import { useEffect } from "react";
import clsx from "clsx";
import _isEqual from "lodash/isEqual";
import cloneDeep from "lodash/cloneDeep";
import isEqual from "react-fast-compare";

interface ElementProps<T extends ElementType = "div"> {
    as?: T;
    className?: string;
    children: React.ReactNode;
    from?: gsap.TweenVars;
    to?: gsap.TweenVars;
    onActivatedClasses?: string;
    onDeactivatedClasses?: string;
    resetAfterTriggered?: boolean;
    start?: string;
    end?: string;
    /**
     * Optional element to use as the ScrollTrigger trigger instead of this one.
     * In React 19 `ref` is an ordinary prop, so no forwardRef wrapper is needed.
     */
    ref?: React.RefObject<HTMLElement | null>;
}

const Element = <T extends ElementType = "div">({
    as,
    className,
    children,
    from = {},
    to = {},
    resetAfterTriggered = true,
    onDeactivatedClasses,
    onActivatedClasses,
    start,
    end,
    ref,
    ...props
}: ElementProps<T> & ComponentPropsWithoutRef<T>) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [triggered, setTriggered] = useState<boolean | undefined>(undefined);

    const setTriggerListeners = useCallback(() => {
        if (!containerRef.current && !ref?.current) return;

        const tl = gsap.timeline({
            repeat: 0,
            scrollTrigger: {
                start: start,
                end: end,
                invalidateOnRefresh: true,
                trigger: ref?.current || containerRef.current,
                onEnter: () => setTriggered(true),
                onLeaveBack: () => resetAfterTriggered && setTriggered(false),
                onLeave: () => resetAfterTriggered && setTriggered(false),
                onEnterBack: () => resetAfterTriggered && setTriggered(true),
            },
        });
        return () => {
            if (ref?.current) gsap.killTweensOf(ref.current);
            gsap.killTweensOf(containerRef.current);
            tl.kill();
        };
    }, [containerRef, resetAfterTriggered, start, end, ref]);

    const [animation, setAnimation] = useState<{
        from?: gsap.TweenVars;
        to?: gsap.TweenVars;
    }>(() => ({ from: cloneDeep(from), to: cloneDeep(to) }));

    // Give `from`/`to` a stable identity so the GSAP effects below only re-run
    // when their contents actually change, not every time the parent re-creates
    // the object literals. Adjusting state during render is React's recommended
    // alternative to syncing derived state inside an effect.
    if (!_isEqual(from, animation.from) || !_isEqual(to, animation.to)) {
        setAnimation({ from: cloneDeep(from), to: cloneDeep(to) });
    }

    const animateContainer = useCallback(() => {
        if (
            !containerRef.current ||
            !animation.from ||
            !animation.to ||
            triggered === undefined ||
            Object.keys(animation.to).length === 0
        )
            return;

        const fromTemp = cloneDeep(animation.from);
        const toTemp = cloneDeep(animation.to);

        if (triggered) {
            gsap.fromTo(containerRef.current, fromTemp, toTemp);
        } else {
            gsap.fromTo(containerRef.current, toTemp, fromTemp);
        }
        return () => {
            gsap.killTweensOf(containerRef.current);
        };
    }, [containerRef, triggered, animation]);

    // ScrollTrigger only fires onEnter when an element crosses the start position.
    // Anything already on screen at mount -- the hero, or any above-the-fold element
    // after navigating back to a page -- may never receive that callback, which left
    // `triggered` undefined and the element stuck on onDeactivatedClasses (opacity-0).
    // Resolving visibility once after mount closes that gap. The functional update
    // only fills in the undefined case, so a deliberate false is never overridden,
    // and running in an effect means the first paint still shows the "from" state
    // and the entrance transition plays.
    useEffect(() => {
        const node = ref?.current || containerRef.current;
        if (!node) return;

        const rect = node.getBoundingClientRect();
        const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;

        if (isInViewport) setTriggered((prev) => (prev === undefined ? true : prev));
    }, [ref]);

    useEffect(animateContainer, [animateContainer]);
    useEffect(setTriggerListeners, [setTriggerListeners]);

    const Component = as || "div";

    const styles = Object.keys(from).length
    ? {
          opacity:
              from.opacity !== undefined
                  ? (from.opacity as number)
                  : undefined,
          transform: `translate3d(${from.x || 0}px, ${
              from.y || 0
          }px,0px)`,
          WebkitTransform: `translate3d(${from.x || 0}px, ${
              from.y || 0
          }px,0px)`,
      }
    : {}

    return (
        <Component
            style={{ 
                ...styles, ...props.style, 
                WebkitBackfaceVisibility: "hidden",
                backfaceVisibility: "hidden",
            }}
            className={clsx(
                className,
                triggered ? onActivatedClasses : onDeactivatedClasses
            )}
            {...props}
            ref={containerRef}
        >
            {children}
        </Component>
    );
};

export default React.memo(Element, isEqual) as <
    T extends ElementType = "div"
>(
    props: ElementProps<T> & ComponentPropsWithoutRef<T>
) => React.ReactElement | null;
