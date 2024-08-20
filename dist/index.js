var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
export { Monitor } from "./core/core.js";
import { Monitor } from "./core/core.js";
class Sorter {
    isSorted(arr) {
        for (let i = 1; i < arr.length; i++) {
            if (arr[i - 1] > arr[i]) {
                return false;
            }
        }
        return true;
    }
    shuffle(arr) {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    }
    bogosort(arr) {
        while (!this.isSorted(arr)) {
            this.shuffle(arr);
        }
        return arr;
    }
    bublesort(array) {
        const length = array.length;
        for (let i = 0; i < length - 1; i++) {
            for (let j = 0; j < length - i - 1; j++) {
                if (array[j] > array[j + 1]) {
                    [array[j], array[j + 1]] = [array[j + 1], array[j]];
                }
            }
        }
        return array;
    }
    swap(arr, i, j) {
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    selectionSort(arr) {
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
    insertionSort(arr) {
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
    quicksort(array) {
        if (array.length <= 1) {
            return array;
        }
        const pivot = array[array.length - 1];
        const left = [];
        const right = [];
        for (let i = 0; i < array.length - 1; i++) {
            if (array[i] < pivot) {
                left.push(array[i]);
            }
            else {
                right.push(array[i]);
            }
        }
        return [...this.quicksort(left), pivot, ...this.quicksort(right)];
    }
    guessSort1(...array) {
        return this.bogosort(array);
    }
    guessSort2(...array) {
        return this.bublesort(array);
    }
    guessSort3(...array) {
        return this.selectionSort(array);
    }
    guessSort4(...array) {
        return this.insertionSort(array);
    }
    guessSort5(...array) {
        return this.quicksort(array);
    }
}
__decorate([
    Monitor()
], Sorter.prototype, "guessSort1", null);
__decorate([
    Monitor()
], Sorter.prototype, "guessSort2", null);
__decorate([
    Monitor()
], Sorter.prototype, "guessSort3", null);
__decorate([
    Monitor()
], Sorter.prototype, "guessSort4", null);
__decorate([
    Monitor()
], Sorter.prototype, "guessSort5", null);
const someInstance = new Sorter();
const largeSet = new Set();
const largeSet2 = new Set();
for (let i = 0; i < 60000; i++) {
    largeSet.add(Math.floor(Math.random() * 10000000));
}
for (let i = 0; i < 12; i++) {
    largeSet2.add(Math.floor(Math.random() * 10000000));
}
someInstance.guessSort1(...largeSet2);
someInstance.guessSort3(...largeSet);
someInstance.guessSort5(...largeSet);
someInstance.guessSort2(...largeSet);
someInstance.guessSort4(...largeSet);
//# sourceMappingURL=index.js.map