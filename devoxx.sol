pragma solidity ^0.4.0;

contract Devoxx{
 
uint public attendee_number=0;
uint public speaker_number=0;

struct attendee{
    uint256 id_a; 
    address attendee_ad;
    string name;
 
}

struct speaker{
    uint256 id_s;
    string talk_title;
    address speaker_ad;
    uint256 evaluation;
    string name;


}

mapping(address =>attendee) attendees;
mapping(address =>speaker) speakers;
 
event attendee_added(uint256 indexed id);

function register_attendee(string name_) returns (uint256) {
     
   // attendees[msg.sender].balance=msg.value;
    attendees[msg.sender].attendee_ad=msg.sender;
    attendees[msg.sender].name=name_;
    attendees[msg.sender].id_a=attendee_number ;
    attendee_added(attendee_number);
    attendee_number ++;
    return attendee_number;
}

function register_speaker(string name_,string talk) {
     
    
   // attendees[msg.sender].balance=msg.value;
    speakers[msg.sender].speaker_ad=msg.sender;
    speakers[msg.sender].talk_title=talk;
    speakers[msg.sender].id_s=speaker_number;
    attendees[msg.sender].name=name_;
    speaker_number++;
}

function get_attendee(address id_)internal returns (attendee)  {
     
   return attendees[id_];
}

function get_speaker(address id_)internal returns (speaker)  {
     
   return speakers[id_];
}

function evaluate_speaker(address address_speaker,uint256 evaluation){
     
   speakers[address_speaker].evaluation=evaluation;
}

event thankyou(uint256 indexed i);
function () payable { //donation
    thankyou(msg.value);
}

 function reward_best_speaker() returns (bool){
     uint best_score=0;
     for(uint i=0;i<speaker_number;i++)
    {
        
    }
     
     return true;
 }
	
}
