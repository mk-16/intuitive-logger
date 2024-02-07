export class BaseLog {
    //TODO update precision of date to support differences in milliseconds
    public date = new Date();
    public trace = new Error().stack?.split('\n').slice(4).map(str => str.split('(')[1].split(')')[0])[0];
    print() {
        console.log(this);
    }
}