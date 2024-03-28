import { Subject } from 'rxjs';
import { isNode } from '../../../utils/is-node/is-node.js';
import { ACTIONS } from '../../../utils/models/enums/worker/worker-actions.js';
import { BaseLog } from '../../../utils/models/logs/base-log/base-log.js';
import { TrackingOption } from '../../../utils/types/types.js';
import { LoggerStateManager } from '../../state-manager/state-manager.js';
import { ChildWorker } from '../child-worker/child-worker.js';

export class ParentWorker {
    static messenger$ = new Subject<any>();
    static actions$ = new Subject<any>();
    static {
        if (isNode) {
            import('node:worker_threads').then(module => {
                const { Worker, parentPort, isMainThread } = module;
                if (isMainThread) {
                    const worker = new Worker(ChildWorker.url, { workerData: LoggerStateManager.state });
                    this.messenger$.subscribe((message) => {
                        worker.postMessage(message);
                    })
                    let str: string = '';
                    worker.on('message', (message) => {
                    })
                }
            })
        }
    }

    public static addFeature(options: TrackingOption) {
        this.messenger$.next([ACTIONS.ADD_FEATURE, options])
    }
    public static addLog(log: BaseLog, scopeName: string, featureName: string) {
        this.messenger$.next([ACTIONS.ADD_LOG, [log, scopeName, featureName]])
    }

    public static handleObjectLog({ property, oldVal, newVal }: any) {
        this.messenger$.next([ACTIONS.ADD_OBJECT_LOG, { property, oldVal, newVal }])
    }

    public static log() {
        this.messenger$.next(['log'])
    }
}

