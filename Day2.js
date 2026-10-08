//Synchronous and Asynchronous programming
//synchronous programming: code is executed line by line

// console.log("java script");
// function hello(){
//     console.log("Hello, World!");
// }
// hello();
// console.log("This is synchronous programming");

//Asynchronous programming: code is executed line by line

// const hello = () => {
//     setTimeout(() => {
//         console.log("Hello, World!");
//     }, 2000);
// }
// hello();
// console.log("This is asynchronous programming");

//callback,promises,async/await

// function add(n1,n2,callback){
//     console.log(n1+n2);
//     callback();
// }
// let a=10;
// let b=20;
// add(a,b,sayHI);
// add(a,b,hello);
// add(a,hello,sayHI);
// function sayHI(){
//     console.log("this is callback function");
// }
// function hello(){
//     console.log("Hello, World!");
// }

//create a function display(callback) that prints "welcome to ABES" and then callback and print "learning FSD"

function display(callback){
    console.log("Welcome to ABES");
    callback();
}
display(learn);
function learn(){
    console.log("Learning FSD");
}
