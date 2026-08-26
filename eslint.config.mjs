// eslint-config-next v16 ships native flat configs, so the @eslint/eslintrc
// FlatCompat shim is no longer needed (and crashes when used with them).
import coreWebVitals from "eslint-config-next/core-web-vitals";
import typescript from "eslint-config-next/typescript";

const eslintConfig = [
  {
    // `next lint` ignored build output implicitly; the ESLint CLI does not, so
    // these have to be declared or it lints the exported bundle.
    ignores: [
      ".next/**",
      "out/**",
      "build/**",
      "node_modules/**",
      "worker/node_modules/**",
      "next-env.d.ts",
    ],
  },
  ...coreWebVitals,
  ...typescript,
];

export default eslintConfig;
