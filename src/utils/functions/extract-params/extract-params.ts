import { reduceParams } from "../map-params/reduce-params.js"


export function extractParams(stringifiedFunction: string | undefined) {
    if (stringifiedFunction == null)
        return []

    return (stringifiedFunction.includes('class') ?
        reduceParams(stringifiedFunction.split('constructor(')[1]?.split(')')[0]?.split(',')) :
        reduceParams(stringifiedFunction.split(')')[0]?.split('(')[1]?.split(','))) ?? [];
}


























