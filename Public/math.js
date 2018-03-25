const squareroot = (input) => {
    let a = input.indexOf("(");
    let b = input.indexOf(")");
    let element = input.subString(a+1,b);
    
    return `\sqrt{${element}}`;
}