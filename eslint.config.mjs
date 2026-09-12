import nextCoreWebVitals from "eslint-config-next/core-web-vitals";

/** @type {import("eslint").Linter.Config[]} */
const eslintConfig = [
  {
    ignores: [".next/**", "out/**", "build/**", "next-env.d.ts"],
  },
  ...nextCoreWebVitals,
  {
    // Embla's own example hooks seed state from the carousel API on mount and
    // then subscribe to its events -- a legitimate external-store sync that
    // Next 16's new react-hooks/set-state-in-effect rule flags. Scoped off here
    // rather than rewriting working carousel code as part of a version bump.
    files: ["components/Gallery/dot.tsx", "components/Gallery/button.tsx"],
    rules: {
      "react-hooks/set-state-in-effect": "off",
    },
  },
];

export default eslintConfig;
