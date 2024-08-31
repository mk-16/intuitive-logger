import { mapParams } from "../map-params/map-params.js"


export function extractParams(stringifiedFunction: string | undefined) {
    if (stringifiedFunction == null)
        return []

    return stringifiedFunction.includes('class') ?
        mapParams(stringifiedFunction.split('constructor(')[1].split(')')[0].split(',')) :
        mapParams(stringifiedFunction.split(')')[0].split('(')[1].split(','));
}


























