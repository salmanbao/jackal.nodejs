import typescript from '@rollup/plugin-typescript';
import { typescriptPaths } from "rollup-plugin-typescript-paths"
import dts from 'rollup-plugin-dts'

export default [
  {
    treeshake: false,
    input: "tsc/index.js",
    output: [
      { file: "dist/index.cjs", format: "cjs" },
      { file: "dist/index.mjs", format: "es" }
    ],
    plugins: [
      typescriptPaths({
        absolute: false,
      })
    ]
  },
  {
    treeshake: false,
    input: "tsc/index.d.ts",
    output: [
      { file: "dist/index.d.ts", format: "cjs" }
    ],
    plugins: [
      typescript(),
      typescriptPaths({
        absolute: false,
      }),
      dts()
    ]
  }
]
