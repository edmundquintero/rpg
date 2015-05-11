
var Buff = (function(){

  var fortify = function(character, defensePercent, length){
    if(!character){return;}

    if(character.hasFortify){
      return;
    }else{
      buffLength = (typeof length==='number')? length : 5;
      
      var baseD = character.defense;
      character.hasFortify =  true; 
      character.defense = character.defense * defensePercent;
      
      console.log("+ Fortify (Def:"+character.defense+ ")");

      fortCountdown = setInterval(function(){
        buffLength--;
        console.log("f "+buffLength);
        if(buffLength <=0 ){
          clearInterval(fortCountdown);
          character.defense = baseD;
          character.hasFortify =  false;
          console.log("- Fortify (Def:"+character.defense+ ")");
          return;
        }
      }, 1000); 
    }
  };


  return {fortify: fortify};
})();