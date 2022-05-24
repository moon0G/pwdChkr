class characteristics {
    num!: boolean;
    low!: boolean;
    upr!: boolean;
    spl!: boolean;
    typs!: number;
}

function timeToCrack(pwd:any) {
	let c = new characteristics();
	c.typs = 0;
	for(let i:number = 0; i<pwd.length; i++) {
		if(/\d/.test(pwd[i]) && c.num!=true) {
			c.num = true;
			c.typs += 10;
			continue;
		}
		if((/\W|_/g.test(pwd[i]) || pwd[i]==='_') && c.spl!=true) {
			c.spl = true;
			c.typs += 32;
			continue;
		}
		if(pwd[i].toUpperCase()===pwd[i] && c.upr!=true) {
			c.upr = true;
			c.typs += 26;
			continue;
		}
		if(pwd[i].toLowerCase()===pwd[i] && c.low!=true) {
			c.low = true;
			c.typs += 26;
			continue;
		}
	}
    var reqCalcs: number = c.typs ** pwd.length;
    return reqCalcs/2600000000; // i7-5600k (from my research the most common cpu) has speed of 2.6ghz or 2,600,000,000hz meaning the cpu can do 2.6e+9 cycles a second
}

function toApropriateTime(time) {
    var y: number = Math.round((time/(3600*24*7*52)*10)/10);
    var w: number = Math.round((time/(3600*24*7)*10)/10);
    var d: number = Math.round((time/(3600*24)*10)/10);
    var h: number = Math.round(((time/3600)*10)/10);
    var m: number = Math.round((time/(3600/60)*10)/10);
    var displayTime: string = y > 0.5 ? y + " years" : w > 1 ? w + " weeks" : d > 1 ? d + " days" : h > 1 ? h + " hours" : m > 1 ? m + " minutes" : time + " seconds"; 
    console.log(displayTime);
}

var pwd: string = "hello123";
var time: number = timeToCrack(pwd);
toApropriateTime(time);
