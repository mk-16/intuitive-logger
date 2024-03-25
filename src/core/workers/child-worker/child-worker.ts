import { Subject, filter, from, fromEvent, map, mergeMap, of, partition, tap } from 'rxjs';
import { isNode } from '../../../utils/is-node/is-node.js';
import { ACTIONS } from '../../../utils/models/enums/worker/worker-actions.js';
import { FeatureMetadata, TrackingOption } from '../../../utils/types/types.js';
import { LoggerStateManager } from '../../state-manager/state-manager.js';
import { Logger } from '../../logger/logger.js';
import { randomUUID } from 'node:crypto';
import { FunctionLog } from '../../../utils/models/logs/function-log/function-log.js';
import { ObjectLog } from '../../../utils/models/logs/object-log/object-log.js';

export class ChildWorker {
    private static worker$ = new Subject<any>();
    private static actions$ = new Subject<any>();
    static readonly url = new URL(import.meta.url)
    static parent: any;
    static {
        if (isNode) {
            import('node:worker_threads').then(module => {
                const { parentPort, isMainThread } = module;
                if (!isMainThread && parentPort) {
                    const messages$ = fromEvent(parentPort, 'message')
                        .pipe(map((metadata) => (metadata as any).data));
                    messages$.subscribe(this.routeMessage)
                }
            })
        }
    }

    public static routeMessage([action, data]: [string, any]) {
        switch (action) {
            case ACTIONS.ADD_FEATURE:
                LoggerStateManager.addFeature(data)
                break;
            case ACTIONS.ADD_LOG:
                LoggerStateManager.addLog(data)
                break;
            case 'log':
                console.log("processing")
                console.log(Object.keys(Logger.snapshot["global"]).length)
        }
    }

    public static addFeature(featureMetadata: FeatureMetadata) {
        LoggerStateManager.addFeature(featureMetadata)
    }
    public static addLog([log, scopeName, featureName]: [FunctionLog | ObjectLog, string, string]) {
    }
}
