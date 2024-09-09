import { from, map } from "rxjs";
import { Log } from "../../log/log.js";

export function postLog<T extends { url: string | URL | Request, headers?: HeadersInit }>(endpoint: T, log: Log, printToConsole: boolean = false) {
    return from(fetch(endpoint.url, {
        headers: endpoint.headers,
        method: "POST",
        body: JSON.stringify(log)
    }).catch(error =>
        console.error(`MAKE SURE ENDPOINT SUPPORT POST REQUEST WITH A JSON AS BODY \nNetwork Error!!! can't send log to endpoint, ${endpoint.url} with headers: ${JSON.stringify(endpoint.headers)} Error =>`,
            error.cause ?? error))
    )
}