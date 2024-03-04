// import { describe } from "mocha";
// import { traverse } from "./traverse.js";

// describe('traverse function', function () {

//     const mockedNestedObject = {
//         string: '',
//         number: 0,
//         array: [1, 2, 3, 4, 4, { a: 1 }],
//         boolean: true,
//         undefined: undefined,
//         null: null,
//         set: new Set().add({
//             string: '1',
//             number: 1,
//             boolean: true,
//             undefined: undefined,
//             null: null,
//         }),
//         object: {
//             string: '1',
//             number: 1,
//             boolean: true,
//             undefined: undefined,
//             null: null,
//             map: new Map().set(0, {
//                 string: '2',
//                 number: 2,
//                 boolean: true,
//                 undefined: undefined,
//                 null: null,
//                 map: new Map().set(0, {
//                     string: '3',
//                     number: 3,
//                     boolean: true,
//                     undefined: undefined,
//                     null: null,
//                     set: new Set().add({
//                         string: '4',
//                         number: 4,
//                         boolean: true,
//                         undefined: undefined,
//                         null: null,
//                     })
//                 })
//             }),
//         }
//     }

//     traverse(mockedNestedObject, function () { 
//         console.log('here')
//     })
// })