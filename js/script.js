const userInput = document.getElementById("userInput");
const countDownDiv = document.getElementById("countdown");
const result = document.getElementById("result");
let blocked = false;

addEventListener("keypress", (event) => {
    if(event.key === "Enter" && !blocked){
        if(userInput.value>0) Game(userInput.value);
    }
});

const totalTime = (time) => new Promise((resolve) => setTimeout(resolve,time));

const repeat = (time,delay, func) => new Promise ((resolve) => {
    const interval = setInterval(func,delay);
    totalTime(time).then(()=> resolve(interval));
})

const countDown = (count,div) => {
    //console.log("repeat")
    if(!div.innerText) {
        //console.log("hola")
        div.innerText=count;
    }
    else {
        //console.log("adios")
        div.innerText = div.innerText-1;
    }
} 

const compareResults = (user,rnd,div) => {
    if(user==rnd){
        div.innerText=`HAS DESACTIVADO LA BOMBA 👑`;
        div.className="green"
    } else {
        div.innerText=`LA BOMBA HA EXPLOTADO 💣`;
        div.className="red"
    }
}

const clearScreen = () => {
    countDownDiv.innerText="";
    result.innerText="";
}
//Generar Random Number
//Esperar 5 Segundos
//Comparar Resultados y Mostrar Mensaje

function Game(userValue){
    clearScreen();
    blocked=true;

    const n = Math.floor(Math.random() * 3)+1;

    repeat(6000,1000, () => countDown(5,countDownDiv))
    .then((interval) => {
        clearInterval(interval);
        compareResults(userValue,n,result);
        blocked=false;
    })
}