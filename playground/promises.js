


// promise that does`nt get parameters:
let test = new Promise((resolve, reject)  => {
   setTimeout(()=>{
       let info = {
           message: "success"
       };
       resolve(info);
       // reject("error"); if we use resolve and reject on after another only the first one will execute.
   },2500);
});

//will execute only when  the resolve / reject function is called in the promise
// test.then((result) => {
//     console.log(result.message);
// },(errorMessage) => {
//     console.log(errorMessage);
// });


let asyncAdd = (a, b) => {
    return new Promise((resolve, reject) => {
        if(typeof a === "number" && typeof  b === "number"){

            setTimeout(() => {
                resolve(a + b);
            },2500)
        } else {
            reject("the argument must be numbers.");
        }
    })
};

asyncAdd(5, "2").then((res) => {
    console.log(res);
    return asyncAdd(res, 3); // returning a promise
},(err) => {
    console.log(err);
})
    .then((res) => { // adding then to the promise that was returned.
        console.log(res);
    },(err) =>{
        console.log(err)
    });
// the problem with this technique of calling a promise is if there is an error in the first invocation , it will still run the second invocation.
//
// solution using the catch operator :

asyncAdd(5, 2).then((res) => {
    console.log(res);
    return asyncAdd(res, 3); // returning a promise instead of calling promise within promise like this :
    // asyncAdd(res, 3).then(()=>{ console.log(res)}) !!
})
    .then((res) => { // adding then to the promise that was returned. that way catch will handle all errors !
        console.log(res);
    })
    .catch((err) => {
        console.log(err)
    });
// with the catch operator the first error that will pop up immediately will get in the catch.







