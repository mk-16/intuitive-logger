"use strict";
try {
    console.log("ffs");
    // const url = new URL(import.meta.url);
    onmessage = () => {
        console.log("logging");
    };
}
catch (e) {
    console.log('server error');
}
