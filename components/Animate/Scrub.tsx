import clsx from "clsx";
import _isEqual from "lodash/isEqual";
import cloneDeep from "lodash/cloneDeep";
import React, {
    ComponentPropsWithoutRef,
    ElementType,
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react";
import gsap from "gsap";
import isEqual from "react-fast-compare";

interface ScrubProps<T extends ElementType = "div"> {
    as?: T;
    className?: string;
    children: React.ReactNode;
    from?: gsap.TweenVars;
    to?: gsap.TweenVars;
    start?: string;
    end?: string;
    /**
     * Optional element to use as the ScrollTrigger trigger instead of this one.
     * In React 19 `ref` is an ordinary prop, so no forwardRef wrapper is needed.
     */
    ref?: React.RefObject<HTMLElement | null>;
}

const Scrub = <T extends ElementType = "div">({
    as,
    className,
    children,
    from = {},
    to = {},
    start,
    end,
    ref,
    ...props
}: ScrubProps<T> & ComponentPropsWithoutRef<T>) => {
    const containerRef = useRef<HTMLDivElement | null>(null);

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
            !Object.keys(animation.to || {}).length ||
            !Object.keys(animation.from || {}).length
        )
            return;

        const tl = gsap
            .timeline({
                repeat: 0,
                scrollTrigger: {
                    start: start,
                    end: end,
                    scrub: true,
                    invalidateOnRefresh: true,
                    trigger: ref?.current || containerRef.current,
                },
            })
            .fromTo(
                containerRef.current,
                animation.from || {},
                animation.to || {}
            );

        return () => {
            if (ref?.current) gsap.killTweensOf(ref.current);
            gsap.killTweensOf(containerRef.current);
            tl.kill();
        };
    }, [containerRef, animation.from, animation.to, ref, end, start]);

    const Component = as || "div";

    useEffect(animateContainer, [animateContainer]);

    return (
        <Component
            style={{
                ...(props.style || {}),
                WebkitBackfaceVisibility: "hidden",
                backfaceVisibility: "hidden",
            }}  
            className={clsx(className)}
            {...props}
            ref={containerRef}
        >
            {children}
        </Component>
    );
};

export default React.memo(Scrub, isEqual) as <
    T extends ElementType = "div"
>(
    props: ScrubProps<T> & ComponentPropsWithoutRef<T>
) => React.ReactElement | null;
