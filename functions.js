
  // setup the web3 object and the Ethereum provider
      // also support MetaMask if it's available
      if(typeof window.web3 !== "undefined" && typeof window.web3.currentProvider !== "undefined") {
            var web3 = new Web3(window.web3.currentProvider);

      } else {
            var  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
      }

 	  var account_number=0;
      web3.eth.getAccounts(function(err, accounts){if(!err && accounts.length > 0) account_number=accounts.length;      });


	  /***********************************************Contract instantiation *********************************************************/

var abiArray =[{"constant":false,"inputs":[{"name":"name_","type":"string"}],"name":"register_attendee","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"speaker_ad","type":"address"},{"name":"reward","type":"uint256"}],"name":"reward_best_speaker","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"id_","type":"address"}],"name":"get_speaker","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"speaker_number","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"name_","type":"string"},{"name":"talk","type":"string"}],"name":"register_speaker","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"attendee_number","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"address_speaker","type":"address"},{"name":"evaluation","type":"uint256"}],"name":"evaluate_speaker","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"id_","type":"address"}],"name":"get_attendee","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"payable":true,"type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"id","type":"uint256"}],"name":"attendee_added","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"id","type":"uint256"}],"name":"speaker_added","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"amount","type":"uint256"}],"name":"thankyou","type":"event"}]
;

var MyContract = web3.eth.contract(abiArray);
var contract_address="0x4816f0c86706062759fe33c016a32cba25645837";
var contractInstance = MyContract.at("0x4816f0c86706062759fe33c016a32cba25645837");//   Instantiate from an existing address, PLEASE BE CAREFUL TO SPACES

 /*********************************************** *********************************************************/
function get_accounts_() //get the number of the existent accounts
{
      web3.eth.getAccounts(function(err, accounts){if(!err && accounts.length > 0) account_number=accounts.length;   document.getElementById("account_number").innerHTML ='You have :'+ account_number+' accounts choose ';     });

}

  /*********************************************** Register attendees *********************************************************/

function register_attendee(){

     var e = document.getElementById("account");
	 var name=document.getElementById("name_attendee").value;
	 var acc =e.options[e.selectedIndex].value;
	 var account_=web3.eth.accounts[acc];
	 var payment = document.getElementById("attendee_pay").value;


	 var transactionObject = {from: account_,value: web3.toWei(payment, "ether"),gas: 500000}; // the gasprice is not indicated is set to default;
     //One transaction costs at least 21000 gas  //web3.toWei Converts an ethereum unit into wei.
	 //gas = (optional, default: To-Be-Determined) The amount of gas to use for the transaction (unused gas is refunded).
	 //Default : Frontier was launched with a default gas price of 0.05e12 wei=50Gwei. In Homestead, the default was reduced to 0.02e12 wei =20Gwei.
	 //in mainnet 1gas=20gwei.

	 var name= document.getElementById("name_attendee");

     var TxHash = contractInstance["register_attendee"].sendTransaction(name, {from: account_}, function(err, address) {
    // console.log(address);
   });
   /*try web3.eth.getTransaction(transactionHash) input: String - the data sent along with the transaction.*/


}
 /***********************************************Listening to upcoming Events (successful registration) *********************************************************/

   var FilterEvent = contractInstance["attendee_added"]; //filter
    FilterEvent({}).watch(function(error, result){
  if (!error)
    console.log(result.args.id);document.getElementById("attendee_message").innerHTML ='your ID is '+ result.args.id;
});

 /***********************************************check the balance of an account *********************************************************/
function check_balance(){ //get the number of the existent accounts

		 var e = document.getElementById("account");
	     var name=document.getElementById("name_attendee").value;
	     var acc =e.options[e.selectedIndex].value;
		 var account_=web3.eth.accounts[acc];
		 var balance =   web3.fromWei(web3.eth.getBalance(account_));
		 document.getElementById("account_balance").innerHTML ='Balance :'+ balance+' Ether';

}
  /*********************************************** Register speaker *********************************************************/

function register_speaker(){

	 var e = document.getElementById("account");
	 var name=document.getElementById("name_speaker").value;
	 var acc =e.options[e.selectedIndex].value;
	 var account_=web3.eth.accounts[acc];
	 var payment = 0;

	 var transactionObject = {from: account_,value: web3.toWei(payment, "ether"),gas: 500000}; // cost of tx is 21000 wei //web3.toWei Converts an ethereum unit into wei.

	 var name= document.getElementById("name_speaker");
	 var keynote= document.getElementById("keynote");

   var TxHash = contractInstance["register_speaker"].sendTransaction(name,keynote, {from: account_}, function(err, address) {
    // console.log(address);
   });

   
}
function get_name(){/*
var result = contractInstance.get_attendee.call("0xf7a0d19b0e00d01839177aa82e6931c21a72bc0d");
console.log(result); 
document.getElementById("attendee_message").innerHTML =result;*/
}
 /***********************************************Listening to upcoming Events (successful registration) *********************************************************/

 /* var FilterEvent2 = contractInstance["attendee_added"]; //filter
    FilterEvent2({}).watch(function(error, result){
  if (!error)
    console.log(result.args.id);document.getElementById("attendee_message").innerHTML ='your ID is '+ result.args.id;
});
*/

function get_speaker()
{
//  contractInstance.get_speaker.call("");

}
