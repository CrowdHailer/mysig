import { Ok, Error } from "./gleam.mjs";
import { rollup } from "rollup";
import resolve
 from '@rollup/plugin-node-resolve';

export async function iife(input) {
    try {
        const bundle = await rollup({ input, plugins: [resolve({ browser: true })] })
        const output = await bundle.generate({format: "iife"})
        return new Ok(output.output[0].code)
    } catch (error) {
        return new Error(error)
    }
}