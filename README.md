# Intuitive Logger

intuitive-logger is a library developed and maintained on my free time,
the idea behind it is to provide Javascript and Typescript developers a no hassle tool
to log informative and meaningful metadata to them find potentially bad code, or to know that everything
is working as expected. 

## Prerequisites

 > node -v16 and above
 >
 > browser with web worker support.

## Content table

- [Intuitive Logger](#intuitive-logger)
  - [Prerequisites](#prerequisites)
  - [Content table](#content-table)
  - [Installation](#installation)
  - [Usage](#usage)
    - [Global Configuration](#global-configuration)
    - [Monitor Options](#monitor-options)
      - [Sidenote](#sidenote)
    - [Log Class Instantiation](#log-class-instantiation)
    - [Log Class Methods calls](#log-class-methods-calls)
    - [Log Functions](#log-functions)
      - [Sidenote:](#sidenote-1)
        - [Warning](#warning)
      - [Option #1;](#option-1)
      - [Option #2;](#option-2)
      - [Option #3;](#option-3)
      - [Option #4;](#option-4)
      - [Option #5;](#option-5)
  - [Log Objects](#log-objects)
  - [NOTE](#note)
- [Disclaimer](#disclaimer)
  - [Features](#features)
    - [Global configuration object. State: Unstable/Experimental/WIP.](#global-configuration-object-state-unstableexperimentalwip)
    - [Monitor options object. State: Unstable/Experimental/WIP.](#monitor-options-object-state-unstableexperimentalwip)
    - [Monitor. State: Unstable/Experimental/WIP.](#monitor-state-unstableexperimentalwip)

## Installation

> npm install intuitive-logger 

## Usage

### Global Configuration

you can set up a global configuration and it will work for all the Monitors, unless you override a monitor, then only the overriden property will be taken into account, and the rest will default to the global configuration object 

``` 
import { LoggerConfiguration } from "intuitive-logger"
```
 
 ### Monitor Options

```
import type { MonitorOptions } from "intuitive-logger"

const options: MonitorOptions = {
  //...code
} 
```

#### Sidenote

All the Monitor examples work with an option object, you can omit it and it will still work with library defaults configuration, if global configuration was set via LoggerConfiguration object, it will behave accordingly.

### Log Class Instantiation

```
 import { Monitor, MonitorOptions } from "intuitive-logger";

 const options: MonitorOptions = {
  //...code
}

 @Monitor(options)
 class SomeClass {
   someProperty;
   constructor(someParam){
     this.someProperty = someParam;
   }
 }
 ```

### Log Class Methods calls

 ~~~
 import { Monitor, MonitorOptions } from "intuitive-logger";

 const options: MonitorOptions = {
  //...code
}

class SomeClass {
  @Monitor(options)
  someMethod(someParam){
    return someParam != undefined;
  }
}
 ~~~ 

 ### Log Functions

 #### Sidenote:

  All logs work also with asynchronous functions, by default it will sends two logs, one with a promise output and the other one with the resolved value(this behaviour can be changed and refined in the MonitorOptions object).

 ##### Warning

  Generator function are not fully tested, so I'd stay away from there at this moment.
  
 #### Option #1;

 ~~~
 import { Monitor, MonitorOptions } from "intuitive-logger";

 const options: MonitorOptions = {
  //...code
}

 function someFunction(someParam){
   return someParam != undefined;
}

 const monitoredFunction = new Monitor(someFunction, options);
 monitoredFunction(true);

 ~~~

 #### Option #2;

 ~~~
 import { Monitor, MonitorOptions } from "intuitive-logger";

 const options: MonitorOptions = {
  //...code
}

 const monitoredFunction = new Monitor(function someFunction(someParam){
   return someParam != undefined;
  }, options);

 monitoredFunction(true);
 ~~~ 

 #### Option #3;
 
 ~~~
 import { Monitor, MonitorOptions } from "intuitive-logger";

 const options: MonitorOptions = {
  //...code
}

 const someFunction = (someParam) => someParam != undefined;
 const monitoredFunction = new Monitor(someFunction, options);

 monitoredFunction(true);
 ~~~ 

 #### Option #4;
 
 ~~~
import { Monitor, MonitorOptions } from "intuitive-logger";

 const options: MonitorOptions = {
  //...code
}

 const monitoredFunction = new Monitor((someParam) => someParam != undefined, options);

 monitoredFunction(true);
 ~~~ 
 
 #### Option #5;
 
 [Class expression and class declaration are special functions in javascript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes#description).

 ~~~
  import { Monitor, MonitorOptions } from "intuitive-logger";

 const options: MonitorOptions = {
  //...code
}
 class SomeClass {}

 const monitoredClass1 = new Monitor(class {}, options);
 const monitoredClass2 = new Monitor(class SomeClass {}, options);
 const monitoredClass3 = new Monitor(SomeClass, options);
 ~~~ 

 ## Log Objects

 ~~~
import { Monitor, MonitorOptions } from "intuitive-logger";

 const options: MonitorOptions = {
  //...code
}
 const object = {};
 const monitoredObject = new Monitor({}, options);

 class SomeClass {};
 const monitoredInstance = new Monitor(new SomeClass(),options);
 ~~~ 

 ## NOTE
  
 take into account that wrapping a function a class or an object (template object or class instance) by a Monitor, is less configurable **(at this moment)**, and so.
 The Logger will logs every method, and property mutation automatically.
 
 **For now** you can configure what to log only through class declaration, by using the @Monitor() decorator syntax. 


Output results may very alot according to the configuration of the global and options object, regardless, the metadata should be sufficient to infer if a function's execution is creating an issue in your code.

# Disclaimer

This library is a work in progress (WIP) and at this moment, might be unstable.

At this moment every new version will support previous features, just add new ones.

This leverages the power of workers (server-side) and web-workers (client-side) to impact as little as possible to the code execution, doing all the processing (in the future, also api calls) through an additional thread ensuring an asynchronous non-pollutant code monitoring and logging.

## Features

### Global configuration object. State: Unstable/Experimental/WIP.

- [ ] Set Application name - **Stage**: Planned
- [ ] Set default logs behaviours - **Stage**: Planned
- [ ] Modify default logs behaviours - **Stage**: Planned
- [x] Set application log level (can be changed at runtime). - **Stage**: Done

### Monitor options object. State: Unstable/Experimental/WIP.

- [x] Print logs to terminal - **Stage**: Done
- [ ] Post logs (through fetch API) to external service - **Stage**: Experimental
- [X] Allow user to configure weather to post, print or both - **Stage**: Done
- [ ] Allow user to set which fields to post - **Stage**: Limited to core log's fields & configuration fields
- [x] Tags (single or array) - **Stage**: Done
- [x] Runtime log Level (numeric) - **Stage**: Done
- [ ] Allow user to consume the log instead of posting/printing it. - **Stage**: WIP
- [x] Allow user to set monitor behaviour for async function to log: **Stage**: Done
  - [x] Function invocation. **Stage**: Done
  - [x] Promised response value. **Stage**: Done
  - [x] Both **Stage**: Done
- [x] Allow users to add environment variables. **Stage**: Done
- [x] Allow users to add custom data as extension (as long as it's serializable). **Stage**: Done
- [ ] Let user set the context. **Stage**: WIP (property exist, does nothing).
- [ ] Code author (through git blame when available). **Stage**: Planned.
  
### Monitor. State: Unstable/Experimental/WIP.

- [ ] Typescript legacy decorator. **Stage**: Experimental
- [ ] Typescript 5 decorators. **Stage**: Unstable/Experimental/WIP
- [ ] Function's monitor. **Stage**: Experimental.
- [ ] Object's monitor. **Stage**: Experimental.

I'm not stopping here, there will be more in the future after stable release.