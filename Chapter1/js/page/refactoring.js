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
		
		let thisAmount = amountFor(perf);

		volumeCredits = volumeCreditsFor(perf);

		//印出這筆訂單
		result += `${playFor(perf).name} : ${format(thisAmount/100)} (${perf.audience} seats)\n`;
		totalAmount += thisAmount;

	}

	result += `Amount owed is ${format(totalAmount/100)}\n`;
	result += `You earnrd ${volumeCredits} credits\n`

	return result;
}




function amountFor(aperformance){
	let result = 0;

	switch(playFor(aperformance).type){
		case "tragedy":
			result = 40000;
			if(aperformance.audience > 30){
				result += 1000 * (aperformance.audience - 30);
			}
			break;
		case "comedy":
			result = 30000;
			if(aperformance.audience > 20){
				result += 10000 + 500 * (aperformance.audience - 20);
			}
			result += 300 * aperformance.audience;
			break;
		default:
			throw new Error(`unknown type: ${playFor(aperformance).type}`);
		}

	return result;
}


function playFor(aperformance){
	return plays[aperformance.playID];
}


function volumeCreditsFor(aperformance){
	let result = 0;

	//加入 volume credit
	result += Math.max(aperformance.audience -30,0);
	//每十名喜劇觀眾可獲得額外點數
	if("comedy" === playFor(aperformance).type){
		result += Math.floor(aperformance.audience/5);
	} 

	return result;
}









$(document).ready(function(){
	var testlog = statement(invoices,plays);
	console.log(testlog);
});