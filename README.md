# Intuitive Logger

### Install
~~~
 npm install intuitive-logger --save 
~~~

 Given the following logs im can you determine what are the sorting algorithms?
##  LOG #1
  ~~~
  {
  name: 'guessSort1',
  date: '2024-08-20T21:54:46.282Z',
  stack: '*********',
  kind: 'method',
  inputs: {
    array: [
      9457129, 8243952,
      7956533, 6231176,
      3256573, 2876761,
      2973151, 4725102,
      9064640, 7919060,
      1002129,  112747
    ]
  },
  class: 'Sorter',
  output: [
     112747, 1002129,
    2876761, 2973151,
    3256573, 4725102,
    6231176, 7919060,
    7956533, 8243952,
    9064640, 9457129
  ],
  runtime: '9445.4361ms'
}
~~~

## LOG #2
~~~
{
  name: 'guessSort3',
  date: '2024-08-20T21:54:55.733Z',
  stack: '*********',
  kind: 'method',
  inputs: {
    array: [
      2304381, 1316048,
      ... 59720 more items
    ]
  },
  class: 'Sorter',
  output: [
        4,   154,   
    ... 59720 more items
  ],
  runtime: '3109.6387000000013ms'
}
~~~

## LOG #3
~~~
{
  name: 'guessSort5',
  date: '2024-08-20T21:54:58.845Z',
  stack: '*********',
  kind: 'method',
  inputs: {
    array: [
      2304381, 1316048,
      ... 59720 more items
    ]
  },
  class: 'Sorter',
  output: [
        4,   154,   
    ... 59720 more items
  ],
  runtime: '31.806499999998778ms'
}
~~~

## LOG #4

~~~
{
  name: 'guessSort2',
  date: '2024-08-20T21:54:58.880Z',
  stack: '*********',
  kind: 'method',
  inputs: {
    array: [
      2304381, 1316048, 
      ... 59720 more items
    ]
  },
  class: 'Sorter',
  output: [
        4,   154,   
    ... 59720 more items
  ],
  runtime: '6727.766800000001ms'
}
~~~

## LOG #5

~~~
{
  name: 'guessSort4',
  date: '2024-08-20T21:55:05.613Z',
  stack: '*********',
  kind: 'method',
  inputs: {
    array: [
      2304381, 1316048,
      ... 59720 more items
    ]
  },
  class: 'Sorter',
  output: [
        4,   154,  
    ... 59720 more items
  ],
  runtime: '1553.4520000000011ms'
}
 ~~~



 This is a side project that I've decided to work on my free time.
 the motivation behind it, is to allow through a simple syntax 
 (for now **LEGACY**  decorator only)
 i.e: 

 ~~~
@Monitor()
 ~~~ 

to create informative and relevant logs; providing metadata about the function's runtime execution, such as:
   
* name: string,
* date: string (Date in ISOString format),
* stack: 'constructor/method invocation file and line (if possible)',       
* kind: 'class' | 'method',
* inputs: undefined | Records<string: unknown>,
* class: string,
* output: unknown,
* runtime: number (in miliseconds)

this metadata should be sufficient to infer if a function's execution is creating an issue in your code.

This library leverages the power of workers (server-side) and web-workers (client-side) to impact as little as possible to the code execution, doing all the processing (in the future api calls) through an additional thread ensuring an asynchronous non-pollutant code monitoring.

# Disclamer
Currently the library supports only logging class constructor and method invocation through "legacy" decorator.
because it serve my team's interests the best.

I fully intend to gradually add more features and capabilities to the package, such as (but not limted to):
- [ ] Typescript 5 decorators.
- [ ] Functions logs.
- [ ] Object logs (track if a property of an object has changed).

also through configuration (later on) functionality to log environment metadata such as:
- [ ]  Code author.
- [ ]  Vendors.
- [ ]  Runtime environments.
- [ ]  And additional runtime code/objects according to the consumer vision.

Also in a later iteration, there will be an option through configuration to dispatch logs and manipulate them through:
 - [ ] Fetch API.
 - [ ] Worker API.
 - [ ] Webworker API.
 - [ ] Callback API., 

Any special request, you are more than welcome to open feature request and with enought votes; I'll provide the functionality. 

## Usage:

### Logging Class instantiation:
~~~
import {Monitor} from 'intuitive-logger

@Monitor()
class SomeClass {
  constructor(someParameter){}
}

const someInstance = new SomeClass("Hello World!");
~~~

In your terminal you'll find the following log:

~~~
LOG
{
  name: 'SomeClassConstructor',
  date: '2024-08-20T17:42:21.143Z',
  stack: 'constructor invocation file and line (if possible)',       
  kind: 'class',
  inputs: { someParameter: 'Hello World!' },
  class: 'SomeClass',
  output: '[object Object]',
  runtime: 0.018799999999828287 (in miliseconds)
}
~~~

<h3>
Logging Method invocation
</h3>


~~~
import {Monitor} from 'intuitive-logger

class SomeClass {
@Monitor()
someMethod(...someParameters){
  return someParameters[0] + someParameters[1]
}
}

const someInstance = new SomeClass("Hello World!");
someInstance.someMethod(1,2);

~~~

In your terminal you'll find the following log:

~~~
LOG
{
  name: 'someMethod',
  date: '2024-08-20T17:51:24.820Z',
  stack: 'method invocation file and line (if possible)',       
  kind: 'method',
  inputs: { '...someParameters': [1, 2] },
  class: 'SomeClass',
  output: 3,
  runtime: 0.01719999999841093 (in miliseconds)
}
~~~

<h3>
Logging Async Method invocation
</h3>


~~~
import {Monitor} from 'intuitive-logger

class SomeClass {
@Monitor()
someMethod(...someParameters){
  return new Promise((resolve) => setTimeout(() => {
    resolve(someParameters[0] + someParameters[1]);
  }, 1000));
}
}

const someInstance = new SomeClass("Hello World!");
someInstance.someMethod(1,2);

~~~

In your terminal you'll find the following 2 log, one showing an output of a Promise
and another showing the output of the result from a resolved promise:

~~~
LOG #1
{
  name: 'someMethod',
  date: '2024-08-20T17:57:59.836Z',
  stack: 'method invocation file and line (if possible)',       
  kind: 'method',
  inputs: { '...someParameters': [1, 2] },
  class: 'SomeClass',
  output: 'Promise', 
  runtime: 0.0971999999601394
}

LOG #2
{
  name: 'someMethod',
  date: '2024-08-20T17:57:59.836Z',
  stack: 'method invocation file and line (if possible)',       
  kind: 'method',
  inputs: { '...someParameters': [1, 2] },
  class: 'SomeClass',
  output: 3,
  runtime: 1012.2915999999968
}
~~~

<h3>
Least but not last, it does support logs from methods that invoke another monitored method
</h3>

~~~
class SomeClass {

  @Monitor()
  sum(a: number, b: number) {
    return a + b;
  }

  @Monitor()
  multiply(a: number, b: number) {
    let results = 0;
    for(let i = 0; i < b; i++){
      results = this.sum(results, a);
    }
    return results;
  }
}

const someInstance = new SomeClass()
someInstance.multiply(3, 2)
~~~

In your terminal you'll find the following 3 logs:

~~~
LOG #1
{
  name: 'sum',
  date: '2024-08-20T18:27:18.804Z',
  stack: 'method invocation file and line (if possible)',       
  kind: 'method',
  inputs: { a: 0, b: 3 },
  class: 'SomeClass',
  output: 3,
  runtime: 0.017099999997299165
}
LOG #2
{
  name: 'sum',
  date: '2024-08-20T18:27:18.805Z',
  stack: 'method invocation file and line (if possible)',       
  kind: 'method',
  inputs: { a: 3, b: 3 },
  class: 'SomeClass',
  output: 6,
  runtime: 0.0007000000041443855
}
LOG #3
{
  name: 'multiply',
  date: '2024-08-20T18:27:18.804Z',
  stack: 'method invocation file and line (if possible)',       
  kind: 'method',
  inputs: { a: 3, b: 2 },
  class: 'SomeClass',
  output: 6,
  runtime: 0.6774999999906868
}
~~~

