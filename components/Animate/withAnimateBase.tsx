"use client";

import React, { useEffect, useContext } from "react";
import { AnimateContext } from ".";

export const withAnimateBase = <P extends object>(
    Component: React.ComponentType<P>
): React.FC<P> => {
    const WithAnimateBase = (props: P) => {
        const ctx = useContext(AnimateContext);

        useEffect(() => {
            if (!ctx.isNestedInAnimate) {
                throw new Error(
                    "Animate.Element is not nested within Animate parent component."
                );
            }
        }, [ctx]);

        // `ref` travels in props in React 19, so there is nothing to forward.
        return <Component {...props} />;
    };

    WithAnimateBase.displayName = `withAnimateBase(${
        Component.displayName || Component.name || "Component"
    })`;

    return WithAnimateBase;
};
