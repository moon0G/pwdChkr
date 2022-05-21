class characteristics {
    num!: boolean;
    low!: boolean;
    upr!: boolean;
    spl!: boolean;
    typs!: number;

    contructor() {
	this.num = false;
	this.low = false;
	this.upr = false;
	this.spl = false;
	}
}

function getCharacteristics(pwd:any) {
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
				c.typs += 30;
				continue;
			}
			if(pwd[i].toUpperCase()===pwd[i] && c.upr!=true){
				c.upr = true;
				c.typs += 26;
				continue;
			}
			if(pwd[i].toLowerCase()===pwd[i] && c.low!=true){
				c.low = true;
				c.typs += 26;
				continue;
			}
		}
	return c;
}

function maxCalculations(pwd:string, c:characteristics) {
	return c.typs ** pwd.length;
}

function onXCpu() { // i7-5600k 2.6ghz does 2.6e+9 (2,600,000,000c)ycles/second or 2.6e+9 (2,600,000,000)hertz (hz)

}

var pwd: string = "";
var c = getCharacteristics("H3llo!");
var calcs: number = maxCalculations(pwd, c);
