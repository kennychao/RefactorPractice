var plays = { 
		"hamlet" : { "name":"Hamlet", "type":"tragedy" },
		"as-like" : { "name":"As You Like It", "type":"comedy" },
		"othello" : { "name":"Othello", "type":"tragedy" }
	};

var invoices = { 
		"customer":"BigCo",
		"performances":[
			{ "playID":"hamlet","audience":55 },
			{ "playID":"as-like","audience":35 },
			{ "playID":"othello","audience":40 }
		]

	};


function statement(invoices,plays){
	let totalAmount = 0;
	let volumeCredits = 0;
	let result = `Statement for ${invoices.customer}\n`;
	const format = new Intl.NumberFormat("en-US",
										{ style:"currency", currency:"USD",
											minimunFractionDigits:2}).format;

	for(let perf of invoices.performances){
		const play = plays[perf.playID];
		let thisAmount = 0;

		switch(play.type){
		case "tragedy":
			thisAmount = 40000;
			if(perf.audience > 30){
				thisAmount += 1000 * (perf.audience - 30);
			}
			break;
		case "comedy":
			thisAmount = 30000;
			if(perf.audience > 20){
				thisAmount += 10000 + 500 * (perf.audience - 20);
			}
			thisAmount += 300 * perf.audience;
			break;
		default:
			throw new Error(`unknown type: ${play.type}`);
		}

		//加入 volume credit
		volumeCredits += Math.max(perf.audience -30,0);
		//每十名喜劇觀眾可獲得額外點數
		if("comedy" === play.type) volumeCredits += Math.floor(perf.audience/5);

		//印出這筆訂單
		result += `${play.name} : ${format(thisAmount/100)} (${perf.audience} seats)\n`;
		totalAmount += thisAmount;

	}

	result += `Amount owed is ${format(totalAmount/100)}\n`;
	result += `You earnrd ${volumeCredits} credits\n`

	return result;
}


$(document).ready(function(){
	var testlog = statement(invoices,plays);
	console.log(testlog);
});