import { ITrackByCondition } from "../../interfaces/track-by-condintion-interface/track-by-condition.js";

export class ConditionalTracker<T extends object> implements ITrackByCondition<T> {
    constructor(private target: T, private properties: Set<symbol | number | string>) {
    }

    private getter(condition: (options: any) => boolean) {
        return <K>(target: K, property: keyof K, receiver: K) => {
            if (condition(true) && (this.properties.has(property) || this.properties.size == 0)) {
                console.log("TRACKING");
            }
            return target[property];
        }
    }

    private setter(condition: (options: any) => boolean) {
        return <K>(target: K, property: keyof K, newValue: any, receiver: K) => {
            if (condition(true) && (this.properties.has(property) || this.properties.size == 0)) {
                console.log("TRACKING");
            }
            return target[property] = newValue;
        }
    }

    track_by_condition(condition: (options: any) => boolean): T {
        return new Proxy(this.target, {
            get: this.getter(condition),
            set: this.setter(condition)
        })
    }

}