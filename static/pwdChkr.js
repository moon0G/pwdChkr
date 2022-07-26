var characteristics = /** @class */ (function () {
    function characteristics() {
    }
    return characteristics;
}());
function timeToCrack(pwd, cpu) {
    var c = new characteristics(); // initialise new class of characteristics
    c.typs = 0; // set c.typs to 0
    for (var i = 0; i < pwd.length; i++) { // loop over every address in the string 
        if (/\d/.test(pwd[i]) && c.num != true) { // if the char is a decimal
            c.num = true; // set the existance of a number in a string to true
            c.typs += 10; // add 10 chars to the total amount of char pool
            continue;
        }
        if (/\W|_/g.test(pwd[i]) && c.spl != true) { // if the char is a non-word character or _ 
            c.spl = true; // set the existance of special characters to true
            c.typs += 32; // add 32 chars to the total amount of char pool
            continue;
        }
        if (pwd[i].toUpperCase() === pwd[i] && c.upr != true) {
            c.upr = true;
            c.typs += 26;
            continue;
        }
        if (pwd[i].toLowerCase() === pwd[i] && c.low != true) {
            c.low = true;
            c.typs += 26;
            continue;
        }
    }
    var reqCalcs = Math.pow(c.typs, pwd.length);
    return reqCalcs / cpu; // i7-5600k (from my research the most common cpu) has speed of 2.6ghz or 2,600,000,000hz meaning the cpu can do 2.6e+9 cycles a second
}
function toApropriateTime(time) {
    var y = Math.round((time / (3600 * 24 * 7 * 52) * 10) / 10); // math for converting seconds into years with weird js rouning
    var mon = Math.round((time / (3600 * 24 * 7 * 4.345) * 10) / 10); // months
    var w = Math.round((time / (3600 * 24 * 7) * 10) / 10); // same here but for weeks
    var d = Math.round((time / (3600 * 24) * 10) / 10); // also the same but for days
    var h = Math.round(((time / 3600) * 10) / 10); // hours
    var min = Math.round((time / (3600 / 60) * 10) / 10); // min
    time = Math.round((time*10)/10);
    var displayTime = y > 0.916 ? y + " years" : mon > 1 ? mon + " months" : w > 1 ? w + " weeks" : d > 1 ? d + " days" : h > 1 ? h + " hours" : min > 1 ? min + " minutes" : time > 1 ?  time + " seconds" : "nil";
    //massive if block for appropriate time conversion
    return displayTime;
}
