import { Log } from "./decorator";
// class Interceptor { }
 class someCLass {
    private prop: number = 0;
    constructor(
        private serv2: number
    ) {
        this.serv2
        this.prop;
    }

    // @Log()
    @Log('method constructor')
    handleErrors(
        ...arg: any[]) {
        // error; event;
            arg;
        console.log('running handle Errors')
        return 1
    }

    handleException(exception: unknown, eventName: string) {
        if (exception instanceof Error) {
        }
        else {
            // console.log('not an error')
        }

        eventName;
        exception
        console.log({ eventName, exception })
        // process.exit(1)
    }
}


const instance = new someCLass(7);
const instance2 = new someCLass(7);
instance2.handleErrors('asd', true, 34 , 'uga chacka');
instance.handleErrors('asd', 'pachanga');

