import { from, map, Observable, Observer, Subject, Subscription, switchMap, takeUntil, tap, timer } from "rxjs";
import { Log } from "../../utils/log/log.js";



class ControllableBufferSubject<T> extends Subject<T> {

    #buffer = new Set<T>();
    #isBuffering = true;

    stop() { this.#isBuffering = false; }
    continue() { this.#isBuffering = true; }
    toggle() { this.#isBuffering = !this.#isBuffering; }
    clear() { this.#buffer.clear(); }

    override next(value: T) {
        if (this.#isBuffering)
            this.#buffer.add(value);
        super.next(value);
    }


    override subscribe(observerOrNext?: Partial<Observer<T>> | ((value: T) => void) | undefined): Subscription;
    override subscribe(next?: ((value: T) => void) | null | undefined, error?: ((error: any) => void) | null, complete?: (() => void) | null): Subscription;
    override subscribe(...args: []): Subscription {

        const subscription = super.subscribe(...args);
        const iterator = this.#buffer.values();
        let results = iterator.next();
        while (!results.done) {
            super.next(results.value);
            results = iterator.next();
        }

        return subscription;
    }
}

export class LoggerWorker {

    static #destroySignal = new Subject<void>();

    static #logStream = new ControllableBufferSubject<Log>();
    static readonly logStream = this.#logStream.asObservable();


    static #worker = from(import("node:worker_threads")).pipe(
        switchMap(({ Worker }) => from(import("../server/worker-thread.js"))
            .pipe(map(({ url }) => new Worker(new URL(url), { "name": "worker-thread" })))
        ),
    );



    static {
        this.#worker.pipe(
            switchMap((worker) => {
                this.#logStream.stop();
                return this.#logStream.pipe(tap(log => worker.postMessage(log)));
            }),
            takeUntil(this.#destroySignal)
        ).subscribe()
    }

    static startLogging() {

        console.log(process.env['npm_lifecycle_event'])
    }

    static onDestroy() {
        this.#destroySignal.next();
        this.#destroySignal.complete();
        this.#logStream.complete();
    }

    static {
        //     if (window !== undefined && window.Worker !== undefined)
        //         import("../client/web-worker.js").then(({ url }) => {
        //             this.#worker = new Worker(new URL(url), { 'name': "intuitive-logger-web-worker", "type": "module" });
        //             for (const log of this.#buffer) {
        //                 try {
        //                     this.#worker.postMessage(log);
        //                 } catch (e) {
        //                     this.#worker.postLog(JSON.parse(JSON.stringify(log)));
        //                 }
        //             }
        //         })
        //     else
        //         throw new Error("no window")
        // }
        // catch (e) {
        //     if (process !== undefined) {
        //         import("node:worker_threads").then(({ Worker }) => {
        //             import("../server/worker-thread.js").then(({ url }) => {
        //                 this.#worker = new Worker(new URL(url), { "name": "worker-thread" });
        //                 for (const log of this.#buffer) {
        //                     try {
        //                         this.#worker.postMessage(log);
        //                     } catch (e) {
        //                         console.log({LOG: log});
        //                         this.#worker.postLog(JSON.parse(JSON.stringify(log)));
        //                     }
        //                 }
        //             })
        //         }).catch(e => console.log("MODULE DOES NOT EXIST", this, process))
        //     }
        // }
    }
    static on() { }
    static postLog(log: Log) {
        // if (this.#worker !== undefined) {
        //     // try {
        //     //     this.#worker.postMessage(log);
        //     // } catch (e) {
        //     //     this.#worker.postMessage(JSON.parse(JSON.stringify(log)));
        //     // }
        //     // return;
        // }
        this.#logStream.next(log);
    }
}

