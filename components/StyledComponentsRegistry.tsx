"use client";

import React, { useState } from "react";
import { useServerInsertedHTML } from "next/navigation";
import { ServerStyleSheet, StyleSheetManager } from "styled-components";

/**
 * Collects styled-components CSS during SSR and injects it into the streamed
 * HTML. Without this the App Router ships the markup with no stylesheet, so
 * styled elements (the shimmering page titles, the gallery strip) render
 * unstyled until hydration.
 */
export default function StyledComponentsRegistry({
    children,
}: {
    children: React.ReactNode;
}) {
    const [styledComponentsStyleSheet] = useState(() => new ServerStyleSheet());

    useServerInsertedHTML(() => {
        const styles = styledComponentsStyleSheet.getStyleElement();
        styledComponentsStyleSheet.instance.clearTag();
        return <>{styles}</>;
    });

    if (typeof window !== "undefined") return <>{children}</>;

    return (
        <StyleSheetManager sheet={styledComponentsStyleSheet.instance}>
            {children}
        </StyleSheetManager>
    );
}
