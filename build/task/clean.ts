import { OUT_DIR } from "../config";
import { src } from "gulp";
import clean = require("gulp-clean");

/**
 * 清除dist文件
 * @returns 
 */
export const cleanDist = () => {
	return src(OUT_DIR, {
		read: false,
		allowEmpty: true,
		cwd: OUT_DIR,
	}).pipe(clean({ force: true, read: false }));
};
