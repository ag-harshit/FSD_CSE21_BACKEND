//function in js:block of code
//syntax :
//function fname(){
//}
//fname();

// function add (num1, num2){
//     console.log(num1+num2)
// }
// add(2,1);

// function add(num1, num2){
//     return num1 + num2;
// }
// add(3,2);

//arrow function
//variable in js:container to store data
//var, let, const
//syntax:()=>{}

// const add=()=>{
// }
// add();
const add=(num1,num2)=>{
    return num1 + num2;
}
console.log(add(2,1));
//arguments.array like objects
function addNum(){
    console.log(arguments);
}