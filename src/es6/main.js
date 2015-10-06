import {multiply} from './multiply';

console.log(multiply(5, 3));

function timeout(duration = 0) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, duration);
    });
}

var p = timeout(1000).then(() => {
    console.log('first promise');
    return timeout(2000);
}).then(() => {
    console.log('second promise');
}).catch(err => {
    throw new Error("hmm");
});
