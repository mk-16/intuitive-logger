// import { ITrackKeys } from "../../interfaces/track-keys-interface/track-keys.js";
// import { IDefaultTracker, ISpecificTracker, ITracker } from "../../interfaces/tracker-interface/tracker.js";
// import { KeysTracker } from "../keys-tracker/keys-tracker.js";
// import { Tracker } from "../tracker/tracker.js";

// export enum TrackerType {
//     Default = "default",
//     SpecificKeysTracker = "specific",
//     ConditionalTracker = "conditional",
//     CombinedTracker = "both",
// }
// export class TrackersBuilder {
//     constructor() { }
//     build(trackerType: TrackerType) {
//         switch (trackerType) {
//             case TrackerType.Default:
//                 return new DefautTracker();
//             case TrackerType.SpecificKeysTracker:
//                 return new SpecificKeysTracker();
//             case TrackerType.ConditionalTracker:
//             case TrackerType.CombinedTracker:
//                 return new Tracker();

//         }
//     }
// }

// export class SpecificKeysTracker implements ISpecificTracker {
//     track<T extends object>(target: T): ITrackKeys<T> {
//         return new KeysTracker(target);
//     }
// }
// export class DefautTracker implements IDefaultTracker {
//     track<T extends object>(target: T): T {
//         return new Proxy(target, {})
//     }
// }

// const asd = new TrackersBuilder();
// const specific = asd.build(TrackerType.CombinedTracker);
// specific.track({}).asdads