import { Subject, filter, from, fromEvent, map, mergeMap, of, partition, tap } from 'rxjs';
import { isNode } from '../../../utils/is-node/is-node.js';
import { ACTIONS } from '../../../utils/models/enums/worker/worker-actions.js';
import { FeatureMetadata, TrackingOption } from '../../../utils/types/types.js';
import { LoggerStateManager } from '../../state-manager/state-manager.js';
import { Logger } from '../../logger/logger.js';

export class ChildWorker {
    private static worker$ = new Subject<any>();
    private static actions$ = new Subject<any>();
    static readonly url = new URL(import.meta.url)
    static parent: any;
    static {
        if (isNode) {
            import('node:worker_threads').then(module => {
                const { parentPort, isMainThread, workerData } = module;
                console.log(workerData)
                if (!isMainThread && parentPort) {
                    const messages$ = fromEvent(parentPort, 'message')
                        .pipe(map((metadata) => (metadata as any).data));
                    messages$.subscribe(this.routeMessage)

                    //     if (parentPort) {
                    //         const events$ = fromEvent(parentPort, 'message')
                    //             .pipe(map((event: any) => event.data))
                    //         // .subscribe()
                    //         events$.pipe(
                    //             filter(([type]: any) => type === ACTIONS.ADD_FEATURE),
                    //             map(([type, value]) => value),
                    //             tap(ChildtWorker.addFeature)).subscribe()

                    //         events$.pipe(
                    //             filter(([type]: any) => type === 'log'),
                    //             map(([type]) => type),
                    //             tap(() => console.log('PRINTING')),
                    //             tap(() => console.log(Object.keys(Logger.snapshot['global']).length)),
                    //             // tap(() => parentPort.postMessage(JSON.stringify(Logger.snapshot)))
                    //         ).subscribe()

                    //     }
                    //     this.worker$.subscribe(([kind, request]) => {
                    //         //TODO PASS CONFIG env 
                    //         const worker = parentPort;
                    //         // worker.postMessage([kind, request]);
                    //     })
                }
            })
        }
    }

    public static routeMessage([action, data]: [string, any]) {
        switch (action) {
            case ACTIONS.ADD_FEATURE:
                ChildWorker.addFeature(data)
                break;
            case 'log':
                console.log("processing")
                console.log(Object.keys(Logger.snapshot["global"]).length)
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
