//create one promise that will display user name and password 
//using resolve and if data will be rejected its display error message
// const userPromise = new Promise((resolve, reject) => {
//     const user = {
//         username: "HarshS",
//         password: "password123"
//     };
//     const isValidUser = true; // Change this to false to test rejection
//     if (isValidUser) {
//         resolve(user);
//     } else {
//         reject(new Error("Invalid user credentials"));
//     }
// })
// userPromise.then((user) => {
//     console.log(`Username: ${user.username}, Password: ${user.password}`);
// }).catch((error) => {
//     console.error(error.message);
// });
 new Promise((resolve, reject) => {
    process.nextTick(() => {
        let err=false;
        if(!err){
            resolve("user:CSE21 , password:1234");
        }else{
            reject("error: user not found");
        }
    }, 1000)
}).then((result) => {
    console.log(result);
}).catch((error) => {
    console.error(error);
});

//async /await
// console.log("ths is async/await");
// async function test(){
//     console.log("1");
//     await console.log("2");
//     console.log("3");
//     console.log("4");
//     console.log("5");
// }
// test();
// console.log("6");