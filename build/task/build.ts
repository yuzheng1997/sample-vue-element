import { rollup } from "rollup";
import VuePlugin from "@vitejs/plugin-vue";
import gs = require("fast-glob");
import { INPUT_PATH, OUT_DIR } from "../config";
import { resolve } from "path";
import { babel } from "@rollup/plugin-babel";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import svg from "rollup-plugin-svg";
import postcss from "rollup-plugin-postcss";

/**
 * 获取需要打包的文件
 * @returns 返回文件路径
 */
const getInputs = async () => {
	return await gs("**/*.{ts,vue,tsx,js,jsx}", {
		cwd: INPUT_PATH,
		absolute: true,
		onlyFiles: true,
		ignore: ["**/node_modules"],
	});
};

export const buildModules = async () => {
	const inputs = await getInputs();
	const bundle = await rollup({
		input: inputs,
		external: ["element-plus", "vue", "lodash-es"],
		plugins: [
			VuePlugin(),
			babel({
				extensions: [".ts", ".js", ".tsx", ".jsx", ".vue"],
				presets: [["@babel/preset-typescript"]],
				plugins: ["@vue/babel-plugin-jsx"],
				babelHelpers: "bundled",
			}),

			nodeResolve({
				extensions: [".ts", ".js", ".tsx", ".jsx", ".vue"],
			}),
			commonjs(),

			svg(),
			postcss(),
		],
	});

	await bundle.write({
		entryFileNames: "[name].mjs",
		format: "esm",
		dir: resolve(OUT_DIR, "es"),
		preserveModules: true,
	});
};
