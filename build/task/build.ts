import { rollup } from "rollup";
import VuePlugin from "@vitejs/plugin-vue";
import gs = require("fast-glob");
import { INPUT_PATH, OUT_DIR } from "../config";
import { resolve } from "path";
import { babel } from "@rollup/plugin-babel";

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
		plugins: [
			
			VuePlugin(),
			babel({
				extensions: [".ts", ".tsx", ".jsx", ".vue"],
				presets: [["@babel/preset-typescript"]],
				plugins: ["@vue/babel-plugin-jsx"],
				babelHelpers: "bundled",
			}),
		],
	});

	await bundle.write({
		entryFileNames: "[name].mjs",
		format: "esm",
		dir: resolve(OUT_DIR, "es"),
		preserveModules: true,
	});
};
