var Web3=require("web3");
var fs= require("fs");
var web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));

//console.log(web3.eth.accounts)

var solc= require("solc");

sourcecode=fs.readFileSync('./Greetings.sol').toString();
//console.log(sourcecode);

compilecode= solc.compile(sourcecode);

contractAbi= JSON.parse(compilecode.contracts[":Greetings"].interface);
greetingsContract=web3.eth.contract(contractAbi);
byteCode=compilecode.contracts[":Greetings"].bytecode;

greetingsDeployed= greetingsContract.new({data:byteCode,from:web3.eth.accounts[0],gas:67219000});


greetingsInstance=greetingsContract.at(greetingsDeployed.address);
console.log(greetingsDeployed);