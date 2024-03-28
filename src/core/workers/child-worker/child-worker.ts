import { fromEvent, map } from 'rxjs';
import { isNode } from '../../../utils/is-node/is-node.js';
import { ACTIONS } from '../../../utils/models/enums/worker/worker-actions.js';
import { Logger } from '../../logger/logger.js';
import { LoggerStateManager } from '../../state-manager/state-manager.js';

export class ChildWorker {
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
                Object.keys(Logger.snapshot).forEach(scope => {
                    Object.keys(Logger.snapshot[scope]).forEach(featureNme => {
                        console.log(scope, featureNme, Logger.snapshot[scope][featureNme].logsMap)
                    })
                })
                // console.log(Logger.snapshot)
                // Object.keys(Logger.snapshot['global']).forEach(key => {
                // console.log(key, Logger.snapshot['global'][key].logsMap)
                // })
                break;
        }
    }

}
