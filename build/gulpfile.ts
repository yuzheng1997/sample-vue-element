import { series } from "gulp";
import { cleanDist } from "./task/clean";
import { buildModules } from "./task/build";

export default series(cleanDist, buildModules);
