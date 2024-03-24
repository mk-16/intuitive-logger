import { Subject, fromEvent, map, partition, tap } from 'rxjs';
import { isNode } from '../../../utils/is-node/is-node.js';
import { ACTIONS } from '../../../utils/models/enums/worker/worker-actions.js';
import { FeatureMetadata, TrackingOption } from '../../../utils/types/types.js';
import { LoggerStateManager } from '../../state-manager/state-manager.js';
import { Logger } from '../../logger/logger.js';

export class ChildWorker {
    private static messenger$ = new Subject<[ACTIONS, any]>();
    static readonly url = new URL(import.meta.url)
    static {
        if (isNode) {
            import('node:worker_threads').then(module => {
                const { parentPort, isMainThread } = module;
                if (!isMainThread && parentPort) {
                    parentPort.on("message", this.routeMessage)
                    this.messenger$.subscribe(message => {
                        parentPort.postMessage(message)
                    })
                }
            })
        }
    }

    public static addFeature(options: TrackingOption) {
        const featureMetadata: FeatureMetadata = {
            featureName: options.featureName ?? '',
            expiresAfter: options?.expiresAfter ?? 24 * 60 * 60 * 1000,
            relatedTo: options?.relatedTo ?? 'global'
        };
        return featureMetadata;
    }

    private static routeMessage([action, value]: [ACTIONS, any]) {
        switch (action) {
            case ACTIONS.ADD_FEATURE:
                setTimeout(() => {
                    const featureMetadata = ChildWorker.addFeature(value);
                    ChildWorker.messenger$.next([ACTIONS.ADD_FEATURE, featureMetadata])
                }, 0);
                break;
        }
    }
}
