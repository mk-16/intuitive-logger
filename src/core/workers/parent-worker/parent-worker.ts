import { Subject } from 'rxjs';
import { isNode } from '../../../utils/is-node/is-node.js';
import { LoggerState, TrackingOption } from '../../../utils/types/types.js';
import { ACTIONS } from '../../../utils/models/enums/worker/worker-actions.js';
import { ChildtWorker } from '../child-worker/child-worker.js';

export class ParentWorker {
    private static worker$ = new Subject<any>();
    private static actions$ = new Subject<any>();
    static {
        if (isNode) {
            import('node:worker_threads').then(module => {
                const { Worker, parentPort, isMainThread } = module;
                if (isMainThread) {
                    const worker = new Worker(ChildtWorker.url);
                    this.worker$.subscribe(([kind, request]) => {
                        //TODO PASS CONFIG env 
                        console.log('streaming')
                        worker.postMessage([kind, request]);
                    })
                }
            })
        }
    }

    public static addFeature(options: TrackingOption) {
        this.worker$.next([ACTIONS.ADD_FEATURE, options])
    }
    public static handleFunctionLog({ startTime, endTime, output, inputs }: any) {
        this.worker$.next([ACTIONS.ADD_FUNCTION_LOG, { startTime, endTime, output, inputs }])
    }

    public static handleObjectLog({ property, oldVal, newVal }: any) {
        this.worker$.next([ACTIONS.ADD_OBJECT_LOG, { property, oldVal, newVal }])
    }
}

