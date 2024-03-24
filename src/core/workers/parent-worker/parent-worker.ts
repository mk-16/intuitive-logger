import { Subject, fromEvent, fromEventPattern, map } from 'rxjs';
import { isNode } from '../../../utils/is-node/is-node.js';
import { ACTIONS } from '../../../utils/models/enums/worker/worker-actions.js';
import { TrackingOption } from '../../../utils/types/types.js';
import { ChildWorker } from '../child-worker/child-worker.js';
import { LoggerStateManager } from '../../state-manager/state-manager.js';

export class ParentWorker {
    static messenger$ = new Subject<[ACTIONS, any]>();
    static worker: any
    static actions$ = new Subject<any>();
    // private static test$ = new fromEvent()
    // private static test$ = new fromEventPattern()
    static {
        if (isNode) {
            import('node:worker_threads').then(module => {
                const { Worker, parentPort, isMainThread } = module;
                if (isMainThread) {
                    const worker = new Worker(ChildWorker.url);
                    worker.on("message", this.routeMessage)
                    const message$ = fromEvent(worker, 'message').pipe(map((event) => (event as MessageEvent).data))
                    // message$.pipe(this.routeMessage)
                    this.worker = worker;
                    this.messenger$.subscribe((message) => {
                        worker.postMessage(message);
                    })
                }
            })
        }
    }

    public static addFeature(options: TrackingOption) {
        this.messenger$.next([ACTIONS.ADD_FEATURE, options])
    }

    public static generateFunctionLog({ startTime, endTime, output, inputs }: any) {
        this.messenger$.next([ACTIONS.GENERATE_FUNCTION_LOG, { startTime, endTime, output, inputs }])
    }

    public static handleObjectLog({ property, oldVal, newVal }: any) {
        this.messenger$.next([ACTIONS.GENERATE_OBJECT_LOG, { property, oldVal, newVal }])
    }

    public static log() {
        // this.messenger$.next(['log'])
    }

    private static routeMessage([action, value]: [ACTIONS, any]) {
        console.log('tracking in parent')
        switch (action) {
            case ACTIONS.ADD_FEATURE:
                setTimeout(() => {
                    console.log(action, value)
                    LoggerStateManager.addFeature(value)
                }, 0);
                break;
        }
    }
}

