//Promises: object
const promiseOne=new Promise((resolve,reject) => {
    console.log("Promise done");
    resolve("operation successful");
    let success=true;
    if(success){
        resolve("operation successful");
    }else{
        reject("operation failed");
    }
})
promiseOne.then((result)=>{
console.log(result);
}).catch((error)=>{
console.log(error);
})