import { Subject } from 'rxjs';
import { isNode } from '../../../utils/is-node/is-node.js';
import { ACTIONS } from '../../../utils/models/enums/worker/worker-actions.js';
import { LoggerStateManager } from '../../state-manager/state-manager.js';
import { FeatureMetadata, TrackingOption } from '../../../utils/types/types.js';

export class ChildtWorker {
    private static worker$ = new Subject<any>();
    private static actions$ = new Subject<any>();
    static readonly url = new URL(import.meta.url)
    static {
        if (isNode) {
            import('node:worker_threads').then(module => {
                const { parentPort, isMainThread } = module;
                if (!isMainThread) {
                    // LoggerStateManager.state.set('1', new Map())

                    console.log('i was called')
                    parentPort?.on("message", ([action, data]) => {
                        switch (action) {
                            case ACTIONS.ADD_FEATURE:
                                this.addFeature(data)
                                console.log(LoggerStateManager.state)
                                break;
                        }
                    })

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
