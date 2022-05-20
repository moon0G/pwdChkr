class characteristics {
    num!: boolean;
    low!: boolean;
    upr!: boolean;
    spl!: boolean;
}

function getCharacteristics(pwd:any) {
    let c = new characteristics();
    for(let i:number = 0; i<pwd.length; i++) {
        if(/\d/.test(pwd[i])) {
            c.num = true;
            continue;
        }// implement tests for special char & lower and upper
    }
    return c;
}

var c = getCharacteristics("0");
console.log(c.num)
