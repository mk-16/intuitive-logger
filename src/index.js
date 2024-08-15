try {
    window;
    console.log("LOGING IN CLIENT");
    // import('./worker/client/web-worker.js')
    // .then(() => {
    var ng;
    console.log("aaaaaaaaaa");
    console.log({ ng: ng });
    console.log({ url: import.meta.url });
    // const url = new URL('web-worker.js');
    // const worker = new Worker("./", { 'name': "web-worker", "type": "module", "credentials": "omit" });
    // worker.onerror = (e) => console.log("some error", e);
    // worker.postMessage("this is my fucking message")
    // })
    // .catch(e => console.log("erroring my freaking mind"));
}
catch (error) {
    console.log("LOGING IN SERVER");
}
export {};
// if (typeof window !== undefined) {
//     console.log("LOGING IN CLIENT");
//     console.log({ window: window })
// }
// else
// console.log("LOGING IN CLIENT");
