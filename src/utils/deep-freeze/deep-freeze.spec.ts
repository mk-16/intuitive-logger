// import { describe } from "mocha";
// import { deepFreeze } from "./deep-freeze.js";
// import { recursiveActionPropagation } from "../recursive-action-propagation/recursive-action-propagation.js";

// describe("deepFreeze", function () {
//     it("freezes all layers of any object", function () {
//         const mockedNestedObject = {
//             string: '',
//             number: 0,
//             boolean: true,
//             undefined: undefined,
//             null: null,
//             set: new Set().add({
//                 string: '1',
//                 number: 1,
//                 boolean: true,
//                 undefined: undefined,
//                 null: null,
//             }),
//             object: {
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
//                     map: new Map().set(0, {
//                         string: '4',
//                         number: 4,
//                         boolean: true,
//                         undefined: undefined,
//                         null: null,
//                         set: new Set().add({
//                             string: '5',
//                             number: 5,
//                             boolean: true,
//                             undefined: undefined,
//                             null: null,
//                         })
//                     })
//                 }),
//             }
//         }
//         const frozen = deepFreeze(mockedNestedObject);
//         recursiveActionPropagation(frozen, (elem) => {
//             // console.log({ elem, isfrozen: Object.isFrozen(elem) })
//             // if (!Object.isFrozen(elem))
//                 // console.log(false, elem)

//         })

//         // test code
//     })
// })