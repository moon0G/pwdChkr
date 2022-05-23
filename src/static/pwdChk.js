/**
 * Compiled TypeScript by the tsc compiler, generated from pwdChkr.ts 
 * */
var characteristics = /** @class */ (function () {
    function characteristics() {
    }
    return characteristics;
}());
function timeToCrack(pwd) {
    var c = new characteristics();
    c.typs = 0;
    for (var i = 0; i < pwd.length; i++) {
        if (/\d/.test(pwd[i]) && c.num != true) {
            c.num = true;
            c.typs += 10;
            continue;
        }
        if ((/\W|_/g.test(pwd[i]) || pwd[i] === '_') && c.spl != true) {
            c.spl = true;
            c.typs += 32;
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
    return reqCalcs / 2600000000; // i7-5600k (from my research the most common cpu) has speed of 2.6ghz or 2,600,000,000hz meaning the cpu can do 2.6e+9 cycles a second
}
function toApropriateTime(time) {
    var y = Math.round((time / (3600 * 24 * 7 * 52) * 10) / 10);
    var w = Math.round((time / (3600 * 24 * 7) * 10) / 10);
    var d = Math.round((time / (3600 * 24) * 10) / 10);
    var h = Math.round(((time / 3600) * 10) / 10);
    var m = Math.round((time / (3600 / 60) * 10) / 10);
    var displayTime = y > 0.5 ? y + " years" : w > 1 ? w + " weeks" : d > 1 ? d + " days" : h > 1 ? h + " hours" : m > 1 ? m + " minutes" : time + " seconds";
    console.log(displayTime);
}
var pwd = "hello123";
var time = timeToCrack(pwd);
toApropriateTime(time);
