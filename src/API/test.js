

function sum(){
    var a = arguments[0] ? arguments[0] : 1;   
    var b = arguments[1] ? arguments[1] : 1; 
    return a+b;
}


x = sum(3,4)
console.log(x)
