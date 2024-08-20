// // try {
// //     window;
// //     console.log("running Client code");
// //     import("./worker/client/web-worker.js").then(({ url }) => {
// //         const worker = new Worker(new URL(url), { 'name': "intuitive-logger-web-worker", "type": "module" });
// //         worker.postMessage("SUCCESSSS")
// //     })
// // }
// // catch (e) {
// //     console.log("running Server code");
// //     import("node:worker_threads").then(({ Worker }) => {
// //         import("./worker/server/worker-thread.js").then(({ url }) => {
// //             const worker = new Worker(url)
// //             worker.postMessage("WOUP WOUP")
// //         })
// //     })
export { Monitor } from "./core/core.js";

import { Monitor } from "./core/core.js";

// // }
// // export type {} from "./utils/types"


// import {Worker} from "node:worker_threads";


class Sorter {

    private isSorted(arr: number[]): boolean {
        for (let i = 1; i < arr.length; i++) {
            if (arr[i - 1] > arr[i]) {
                return false;
            }
        }
        return true;
    }

    private shuffle(arr: number[]): void {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];

        }
    }

    public bogosort(arr: number[]): number[] {
        while (!this.isSorted(arr)) {
            this.shuffle(arr);
        }
        return arr;
    }

    bublesort(array: number[]) {
        const length = array.length;
        for (let i = 0; i < length - 1; i++) {
            for (let j = 0; j < length - i - 1; j++) {
                if (array[j] > array[j + 1]) {
                    // Swap elements   
                    [array[j], array[j + 1]] = [array[j + 1], array[j]];
                }
            }
        }

        return array;
    }

    private swap(arr: number[], i: number, j: number): void {
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }

    public selectionSort(arr: number[]): number[] {
        const n = arr.length;

        for (let i = 0; i < n - 1; i++) {
            let minIndex = i;
            for (let j = i + 1; j < n; j++) {
                if (arr[j] < arr[minIndex]) {
                    minIndex = j;

                }
            }
            this.swap(arr, minIndex, i);
        }

        return arr;
    }

    public insertionSort(arr: number[]): number[] {
        const n = arr.length;
        for (let i = 1; i < n; i++) {
            let key = arr[i];
            let j = i - 1;

            while (j >= 0 && arr[j] > key) {
                arr[j + 1] = arr[j];
                j = j - 1;
            }
            arr[j + 1] = key;
        }

        return arr;
    }


    quicksort(array: number[]): number[] {
        if (array.length <= 1) {
            return array;
        }

        const pivot = array[array.length - 1];
        const left: number[] = [];
        const right: number[] = [];

        for (let i = 0; i < array.length - 1; i++) {
            if (array[i] < pivot) {
                left.push(array[i]);
            } else {
                right.push(array[i]);
            }
        }

        return [...this.quicksort(left), pivot, ...this.quicksort(right)];
    }



    @Monitor()
    guessSort1(...array: number[]) {
        return this.bogosort(array); 
    }

    @Monitor()
    guessSort2(...array: number[]) {
        return this.bublesort(array);
    }

    @Monitor()
    guessSort3(...array: number[]) {
        return this.selectionSort(array);
    }


    @Monitor()
    guessSort4(...array: number[]) {
        return this.insertionSort(array)
    }

    @Monitor()
    guessSort5(...array: number[]) {
        return this.quicksort(array);
    }

}

const someInstance = new Sorter();
const largeSet = new Set<number>();
const largeSet2 = new Set<number>();
// Create a large array of random integers
for (let i = 0; i < 60000; i++) {
    largeSet.add(Math.floor(Math.random() * 10000000))
}

for (let i = 0; i < 12; i++) {
    largeSet2.add(Math.floor(Math.random() * 10000000))
}
someInstance.guessSort1(...largeSet2)
someInstance.guessSort3(...largeSet)
someInstance.guessSort5(...largeSet)
someInstance.guessSort2(...largeSet)
someInstance.guessSort4(...largeSet)
