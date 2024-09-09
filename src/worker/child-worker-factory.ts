import { filter, fromEvent, map, tap } from "rxjs";
import { extractParams } from "../utils/functions/extract-params/extract-params.js";
import { findFileInStack } from "../utils/functions/find-file-in-stack/find-file-in-stack.js";
import { mapParamsToValues } from "../utils/functions/map-params-to-values/map-params-to-values.js";
import { parseTarget } from "../utils/functions/parse-target/parse-target.js";
import { propertyLogGuard } from "../utils/log/log-guards.js";
import { Log } from "../utils/log/log.js";
import { DecoratorLogKind } from "../utils/types/enums.js";


export abstract class ChildWorkerFactory {
    static create(worker: any) {
        return fromEvent(worker, "message", (event: MessageEvent): Log => {
            return event.data.source == "intuitive-logger-worker" ? event.data : null;
        })
            .pipe(
                filter(e => e != null),
                map(log => {
                    log.date = new Date().toISOString();
                    log.stack = log.stack ? findFileInStack(log.stack) : undefined;
                    log.runtime = `${parseFloat(((log.endTime ?? 0) - (log.startTime ?? 0)).toFixed(4))}ms`;
                    log.name = log.configuration?.context?.name ?
                        log.configuration.context.name :
                        log.kind == DecoratorLogKind.Constructor ?
                            log.serializedData?.split('class ')[1]?.split(' ')[0] :
                            log.serializedData?.split('(')[0];
                    if (log.name == undefined || log.name == "") {
                        log.name = 'anonymous'
                    }
                    if (propertyLogGuard(log)) {
                        log.previousPropertyDescriptor = parseTarget(log.serializedPreviousValue);
                        log.currentPropertyDescriptor = parseTarget(log.serializedCurrentValue);
                        delete log.serializedPreviousValue;
                        delete log.serializedCurrentValue;
                    }
                    else
                        log.inputs = mapParamsToValues(extractParams(log.serializedData) ?? [], parseTarget(log.serializedInputs) as string[]) as any;
                    log.output = log.serializedOutput ? parseTarget(log.serializedOutput) : undefined;
                    delete log.source;
                    delete log.startTime;
                    delete log.endTime;
                    delete log.serializedInputs;
                    delete log.serializedOutput;
                    delete log.serializedData;
                    delete log.stack;
                    function deleteNestedProperty(obj: any, key: any) {
                        if (typeof obj !== 'object' || obj === null) {
                            return; // Not an object
                        }

                        for (const prop in obj) {
                            if (prop === key) {
                                delete obj[prop];
                                return;
                            } else if (typeof obj[prop] === 'object' && obj[prop] !== null) {
                                deleteNestedProperty(obj[prop], key);
                            }
                        }
                    }

                    const configuration = log.configuration;
                    log.configuration?.hide?.forEach((key) => {
                        deleteNestedProperty(log, key);
                    })
                    return { log, configuration };
                }),
                tap(({ log, configuration }) => {
                    switch (configuration?.mode) {
                        case "both":
                            if (configuration?.post)
                                configuration.post.forEach(endpoint => {
                                    fetch(endpoint.url, {
                                        headers: endpoint.headers,
                                        method: "POST",
                                        body: JSON.stringify(log)
                                    })
                                        .then(() => console.log(log))
                                        .catch(error => {
                                            console.error(`MAKE SURE ENDPOINT SUPPORT POST REQUEST WITH A JSON AS BODY \nNetwork Error!!! can't send log to endpoint, ${endpoint.url} with headers: ${JSON.stringify(endpoint.headers)} Error =>`, error.cause ?? error);
                                            console.log(log);
                                        });
                                });
                            else {
                                const error = new ReferenceError(`Add "post" property or set mode to: "local" or remove it entirely in MonitorOptions`,
                                    { cause: `can't use "mode" property with value of "network" or "both" in MonitorOptions ${JSON.stringify(configuration)} missing "post" property` });
                                delete error.stack;
                                throw error;
                            }
                            break;

                        case "network":
                            if (configuration?.post)
                                configuration.post.forEach(endpoint => {
                                    fetch(endpoint.url, {
                                        headers: endpoint.headers,
                                        method: "POST",
                                        body: JSON.stringify(log)
                                    }).catch(error => {
                                        console.error(`MAKE SURE ENDPOINT SUPPORT POST REQUEST WITH A JSON AS BODY \nNetwork Error!!! can't send log to endpoint, ${endpoint.url} with headers: ${JSON.stringify(endpoint.headers)} Error =>`, error.cause ?? error);
                                    });
                                });
                            else {
                                const error = new ReferenceError(`Add "post" property or set mode to: "local" or remove it entirely in MonitorOptions`,
                                    { cause: `can't use "mode" property with value of "network" or "both" in MonitorOptions ${JSON.stringify(configuration)} missing "post" property` });
                                delete error.stack;
                                throw error;
                            }
                            break;
                        default:
                            console.log(log);
                            break;
                    }

                })
            ).subscribe()
    }
}
