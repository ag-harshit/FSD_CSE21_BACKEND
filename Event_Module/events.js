//Event Module
//Event class uses -on() as listener and -emit() as event trigger/create/fire
// class MyEmitter extends EventEmitter{}
// const event= new EventEmitter();
// event.on("greet",(msg)=>{
//     console.log(`Hello ${msg}`);
// })
// event.on("exit",()=>{
//     console.log("Exiting the program");
// });
// event.emit("greet","CSE 21 , This is FSD Class");
// event.emit("exit");
//2. Simulate DOM-Like event handling in node.js using events
//Button:click and mouseover events
const EventEmitter=require("events");
class Button extends EventEmitter{
    click(){
        console.log("/ncall button click event");
        this.emit("click");
    }
    mouseover(){
        console.log("/ncall button mouseover event");
        this.emit("mouseover");
    }
}
const button=new Button();
button.on("click",()=>{
    console.log("Button clicked");
});
button.on("mouseover",()=>{
    console.log("Button mouseover");
});