# Intuitive Logger

intuitive-logger is a library developed and maintained on my free time,
the idea behind it is to provide Javascript and Typescript developers a no hassle tool
to log informative and meaningful metadata to them find potentially bad code, or to know that everything
is working as expected. 

# Installation

~~~
 npm install intuitive-logger
~~~

# Usage

## Log Class Instantiation

 ~~~
 import {Monitor} from 'intuitive-logger'

@Monitor()
class SomeClass {
  someProperty;
  constructor(someParam){
    this.someProperty = someParam;
  }
}
 ~~~ 
 
## Log Class Methods calls
 ~~~
 import {Monitor} from 'intuitive-logger'

class SomeClass {
  @Monitor()
  someMethod(someParam){
    return someParam != undefined;
  }
}
 ~~~ 

 ## Log Functions
 ## Sidenotes:
 * All logs work also with asynchronous functions (it sends two logs, one with a promise out and the other one with the resolved value).
 *  Generator function are not fully tested, so I'd stay away from there at this moment.
 ### Option #1;
 ~~~
 import {Monitor} from 'intuitive-logger'

 function someFunction(someParam){
   return someParam != undefined;
}

 const monitoredFunction = new Monitor(someFunction);
 monitoredFunction(true);

 ~~~
 ### Option #2;
 ~~~
  import {Monitor} from 'intuitive-logger'

 const monitoredFunction = new Monitor(function someFunction(someParam){
   return someParam != undefined;
  });

 monitoredFunction(true);
 ~~~ 
 ### Option #3;
 ~~~
  import {Monitor} from 'intuitive-logger'

 const someFunction = (someParam) => someParam != undefined;
 const monitoredFunction = new Monitor(someFunction);

 monitoredFunction(true);
 ~~~ 
 ### Option #4;
 ~~~
  import {Monitor} from 'intuitive-logger'

 const monitoredFunction = new Monitor((someParam) => someParam != undefined);

 monitoredFunction(true);
 ~~~ 
 
 ### Option #5;
 ~~~
  import {Monitor} from 'intuitive-logger'

 class SomeClass {}

 const monitoredClass1 = new Monitor(class {});
 const monitoredClass2 = new Monitor(class SomeClass {});
 const monitoredClass3 = new Monitor(SomeClass);
 ~~~ 

 ### NOTE 
 take into account that wrapping a class by a Monitor, is less configurable (at this moment), and so, it logs every method automatically, instead of logging the method/constructor explicitly through a decorator. 

 ## Log Objects

 ~~~
  import {Monitor} from 'intuitive-logger'

 const object = {};
 const monitoredObject = new Monitor({});

 class SomeClass {};
 const monitoredInstance = new Monitor(new SomeClass());

 ~~~ 

 ### NOTE 
 take into account that wrapping an object by a Monitor, is less configurable (at this moment), and so, it logs every method automatically.


# Results

this metadata should be sufficient to infer if a function's execution is creating an issue in your code.

This library leverages the power of workers (server-side) and web-workers (client-side) to impact as little as possible to the code execution, doing all the processing (in the future, also api calls) through an additional thread ensuring an asynchronous non-pollutant code monitoring and logging.


## Function/Method/Constructor Logs:
~~~
{
  readonly kind: "function" | "method" | "constructor"
  name: string | symbol | undefined;
  date: string | undefined; //ISO string format
  stack: string | undefined;
  inputs: Record<string, unknown> | undefined;
  output: unknown;
  runtime: `${number}ms` | undefined;
}
~~~

## Properties Logs:
~~~
{
  readonly kind: "property"
  name: string | symbol | undefined;
  date: string | undefined; //ISO string format
  stack: string | undefined;
  output: unknown;
  runtime: `${number}ms` | undefined;
  previousValue: unknown | undefined;
  currentValue: unknown | undefined;
}
~~~

### Object Monitoring creates either method's or property's logs

# Updates

## Added global LoggerConfiguration static class (WIP), allowing to:
* only to set and get the current app's log level.

## Added configuration option for decorators only (WIP), allowing to:
* Pass tag WIP (awaiting vendor implementation)
* Pass a vendor WIP (doesn't work at this moment) to use and enable dispatching for external vendors / currently only printing to terminal
* Pass enviroments object => Record<string, string | undefined>
* async WIP (currently under beta test) => allow to manipulates if an async method dispatches logs when the invocation happens, when the results happens or when either (both).
* context WIP (currently only works for class decorator) allows to override context, some bundlers minify the constructor's name. this allows the user to explicitly say what is the class name, scope does nothing at this moment, later meant for grouping.

* log level &  allows the user to triggers a log or disable logging according to log level (can be updated in runtime), it works by taking a number and comparing to the global log level, if its higher or equal (the log level inside the decorator option), a log will be dispatched  



# Disclamer

I fully intend to gradually add more features and capabilities to the package, such as (but not limted to):
- [X] Typescript 5 decorators.
- [X] Functions logs.
- [X] Object logs (track if a property of an object has changed, getters are not logged).

Through configuration (later on) you'll be able to control functionality and log environment metadata such as:
- [ ]  Code author (through git blame when available).
- [ ]  Vendors.
- [ ]  Runtime environments.
- [ ]  And additional runtime code/objects according to the consumer vision.

In a later iteration, there will be an option through configuration to dispatch logs and manipulate them through:
 - [ ] Fetch API.
 - [ ] Worker API.
 - [ ] Webworker API.
 - [ ] Callback API.

I'm not stopping there, there will be an option through configuration to dispatch logs and manipulate them and much more.