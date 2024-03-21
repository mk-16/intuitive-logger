import { Subject, fromEvent, map, partition, tap } from 'rxjs';
import { isNode } from '../../../utils/is-node/is-node.js';
import { ACTIONS } from '../../../utils/models/enums/worker/worker-actions.js';
import { FeatureMetadata, TrackingOption } from '../../../utils/types/types.js';
import { LoggerStateManager } from '../../state-manager/state-manager.js';
import { Logger } from '../../logger/logger.js';

export class ChildtWorker {
    private static worker$ = new Subject<any>();
    private static actions$ = new Subject<any>();
    static readonly url = new URL(import.meta.url)
    static {
        if (isNode) {
            import('node:worker_threads').then(module => {
                const { parentPort, isMainThread } = module;
                if (!isMainThread) {
                    const [addFeature$, stream$] = partition(fromEvent(parentPort!, 'message'), (event: any) => event.data[0] === ACTIONS.ADD_FEATURE)
                    stream$.pipe(map((event: any) => event?.data)).subscribe((data: any) => {
                        if (data[0] == 'log') {
                            parentPort?.postMessage(Logger.snapshot)
                        }
                    })
                    addFeature$.pipe(map((event: any) => event?.data[1])).subscribe((data: any) => {
                        ChildtWorker.addFeature(data)
                    })
                    parentPort?.on("message", function (message) {
                        const [action, data] = message;
                        // console.log({ action, data })
                    })//     switch (action) {
                    //         case ACTIONS.ADD_FEATURE:
                    //             ChildtWorker.addFeature(data)
                    //             // console.log(LoggerStateManager.state)
                    //             break;
                    //         case "log":
                    //             console.log(LoggerStateManager.state)
                    //             break;
                    //     }
                    // })

                    this.worker$.subscribe(([kind, request]) => {
                        //TODO PASS CONFIG env 
                        const worker = parentPort;
                        // worker.postMessage([kind, request]);
                    })
                }
            })
        }
    }

    public static addFeature(options: TrackingOption) {
        const featureMetadata: FeatureMetadata = {
            featureName: options.featureName,
            expiresAfter: options?.expiresAfter ?? 24 * 60 * 60 * 1000,
            relatedTo: options?.relatedTo ?? 'global'
        };
        LoggerStateManager.addFeature(featureMetadata)
    }
    public static handleLog() { }
}
