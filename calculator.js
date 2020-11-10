let runningTotal = 0;
let buffer = '0';
let previousOperator=null;
let deBugOn=false;
const screen=document.querySelector('.screen');


document.querySelector('.calc-buttons').addEventListener('click', function(event) {
    buttonClick(event.target.innerText);

})

function buttonClick(value) {
if (deBugOn) {deBug(value, "buttonClick");}
    if (isNaN(parseInt(value))) {
            handleSymbol(value);
    } else {
      
         handleNumber(value);
    }
}

function handleNumber(value){
    if (deBugOn) {deBug(value, "start handleNumber");}
    if (buffer === "0")  {
        buffer = value;
       
    } else {
        buffer += value;
    } 
    if (deBugOn) {deBug(value, "END handleNumber");}
    rerender();   
}

function handleSymbol(value) {
    if (deBugOn) {deBug(value, "start handleSymbol");}
    switch (value) {
        
        case "C":
            buffer="0";
            runningTotal=0;
            previousOperator= null;
            rerender();
            break;
        
            case "=":
            if (previousOperator === null) {
                return;
            }
            flushOperation(parseFloat(buffer));
            previousOperator = null;
            buffer= "" + runningTotal;
            runningTotal = 0;
            rerender();
            break;

        case "⬅":
            if (buffer.length===1) {
                buffer ="0"
            } else {
                buffer=buffer.substring(0, buffer.length-1);
            }
            rerender();
            break;

        default:

            handleMath(value);
            //rerender();
            break;
    }
    if (deBugOn) {deBug(value, "END handleSymbol");}

}



function handleMath(value) {
    if (deBugOn) {deBug(value, "start handleMath");}
    const fltBuffer = parseFloat(buffer);
    if (runningTotal === 0){
        runningTotal = fltBuffer;
        buffer="";

    } else {
        flushOperation(fltBuffer);
        //buffer =""+runningTotal;
        buffer="";
        
    }

    previousOperator = value;
    //buffer =""+runningTotal;
    if (deBugOn) {deBug(value, "END handleMath");}
}

function flushOperation (fltBuffer) {
    if (deBugOn) {deBug("value", "start flushOperation");}
    if (previousOperator === "+") {
        runningTotal += fltBuffer;
    } else if (previousOperator === "-") {
        runningTotal -= fltBuffer;
    } else if (previousOperator === "x") {
        runningTotal *= fltBuffer;
    } else {
        runningTotal /= fltBuffer;
    }
    if (deBugOn) {deBug("value", "END flushOperation");}
}

function rerender() {
    screen.innerText=buffer;
}

function deBug(value,strFnName) {
    console.log(`${value} In ${strFnName}`)
    console.log(`runningTotal ${runningTotal} previousOperator ${previousOperator} Buffer ${buffer}`);
    
}