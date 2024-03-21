import { Subject } from 'rxjs';
import { isNode } from '../../../utils/is-node/is-node.js';
import { ACTIONS } from '../../../utils/models/enums/worker/worker-actions.js';
import { TrackingOption } from '../../../utils/types/types.js';
import { ChildtWorker } from '../child-worker/child-worker.js';

export class ParentWorker {
    static worker$ = new Subject<any>();
    static worker: any
    static actions$ = new Subject<any>();
    // private static test$ = new fromEvent()
    // private static test$ = new fromEventPattern()
    static {
        if (isNode) {
            import('node:worker_threads').then(module => {
                const { Worker, parentPort, isMainThread } = module;
                if (isMainThread) {
                    const worker = new Worker(ChildtWorker.url);
                    this.worker = worker;
                    this.worker$.subscribe((message) => {
                        worker.postMessage(message);
                    })
                    worker.on('message', (message) => {
                        this.actions$.next(message)
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

    public static log() {
        this.worker$.next(['log'])
    }
}

