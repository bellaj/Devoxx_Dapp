 
  // setup the web3 object and the Ethereum provider
      // also support MetaMask if it's available
      if(typeof window.web3 !== "undefined" && typeof window.web3.currentProvider !== "undefined") {
            var web3 = new Web3(window.web3.currentProvider);
 
      } else {
            var  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
      }

 	  var account_number=0;
      web3.eth.getAccounts(function(err, accounts){if(!err && accounts.length > 0) account_number=accounts.length;      });

	  
	  
var abiArray =[{"constant":false,"inputs":[{"name":"name_","type":"string"}],"name":"register_attendee","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"speaker_number","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"name_","type":"string"},{"name":"talk","type":"string"}],"name":"register_speaker","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"attendee_number","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"address_speaker","type":"address"},{"name":"evaluation","type":"uint256"}],"name":"evaluate_speaker","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"reward_best_speaker","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"payable":true,"type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"id","type":"uint256"}],"name":"attendee_added","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"i","type":"uint256"}],"name":"thankyou","type":"event"}]


 ;


	  
/***********************************************Contract instantiation *********************************************************/	  
var MyContract = web3.eth.contract(abiArray);
var contractInstance = MyContract.at("0xabf40faa5b08bed95023e974c6d4a9eb50ea85f8");// Instantiate from an existing address, PLEASE BE CAREFUL TO SPACES
/***********************************************Contract instantiation *********************************************************/	  

 
function get_accounts_()
{  
      web3.eth.getAccounts(function(err, accounts){if(!err && accounts.length > 0) account_number=accounts.length;   document.getElementById("account_number").innerHTML ='You have :'+ account_number+' accounts choose ';     });
      
}

function register_attendee(){
	 var e = document.getElementById("account");
	 var name=document.getElementById("name_attendee").value;
	 var acc =e.options[e.selectedIndex].value;
	 var account_=web3.eth.accounts[acc];
	 var payment = document.getElementById("attendee_pay").value;

	// document.getElementById("attendee_message").innerHTML ='Loading ';  
	 
	 var transactionObject = {from: account_,value: web3.toWei(payment, "ether"),gas: 500000}; // with donation of 1Ether //cost of tx is 21000 wei //web3.toWei Converts an ethereum unit into wei.

	 var name= document.getElementById("name_attendee");

   var TxHash = contractInstance["register_attendee"].sendTransaction(name, {from: account_}, function(err, address) {
     console.log(address);
   });
   

   //myContractInstance.myMethod.sendTransaction(param1 [, param2, ...] [, transactionObject] [, callback]);

	/* //event
	contractInstance.attendee_added().watch(function(error, result) {
          if (!error) {
		  document.getElementById("attendee_message").innerHTML ='Result :'+ web3.eth.coinbase;  } else document.getElementById("attendee_message").innerHTML ='Error :'+ error; 

});	*/

}

function check_balance(){
		 var e = document.getElementById("account");
	     var name=document.getElementById("name_attendee").value;
	     var acc =e.options[e.selectedIndex].value;
		 var account_=web3.eth.accounts[acc];
		 var balance =   web3.fromWei(web3.eth.getBalance(account_));
		 document.getElementById("account_balance").innerHTML ='Balance :'+ balance+' Ether';  

}