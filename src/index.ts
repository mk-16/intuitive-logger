import { Log } from './core/trackers/decorator-tracker/decorator-tracker.js';


export type { UUID } from 'crypto';
export { Logger } from "./core/logger/logger.js";
export { LOG_LEVEL } from './utils/models/enums/log-level/log-level.js';
export { FunctionLog } from "./utils/models/logs/function-log/function-log.js";
export { ObjectLog } from './utils/models/logs/object-log/object-log.js';
export type { FeatureSnapshot, LogsFeature, Snapshot } from './utils/types/types.js';


Log()
class Myclass {}
