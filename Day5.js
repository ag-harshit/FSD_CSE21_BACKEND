//understanding the concept of fetch in console
async function test() {
    console.log("this is asynchronous function and we want to use fetch()");
    const response =await fetch("./Student.json");
    console.log(response.status);
    const std =await response.json();
    return std;
    console.log("finally data fetch");
}    
test().then((res)=>{
    console.log(res);
}).catch((err)=>{
    console.log(err);
})