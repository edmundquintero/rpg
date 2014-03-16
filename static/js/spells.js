
var Spells = (function(){

  function targetable(target){
    if(target.currentHealth === 0){
      return false;
    }
    return true;
  }



  var cure = function(self, target){  
  // Add test for target being a curable object
    if(targetable(target)){
      heal = Math.floor(Math.random()*((10*(1+(1*self.currentSpirit/3)))-(10*(1+(1*self.currentSpirit/4)))+1)+(10*(1+(1*self.currentSpirit/4))));
      console.log("Cure: + " + heal);
      target.doHeal(heal);
      self.useMana(20);
      console.log(self.name+" healed "+target.name +" for "+heal);
      console.log(target);
    }
  }

  var nourish = function(self, target, callback){  
  // Add test for target being a curable object
  // self.currentMana = self.currentMana-20;
    if(targetable(target)){
      self.currentMana = self.currentMana-20;
      $('#'+self.name+' #champMana').css('width',self.currentMana/self.maxMana*100+'%');
      heal = Math.floor(Math.random()*((20*(1+(1*self.currentSpirit/3)))-(20*(1+(1*self.currentSpirit/4)))+1)+(20*(1+(1*self.currentSpirit/4))));
      console.log("Nourish: + " + heal);
      target.doHeal(heal);
      self.useMana(35);
      console.log(self.name+" healed "+target.name +" for "+heal);
      console.log(target);
    }
    callback = (typeof callback == 'function') ? callback : function(){};
    callback();
  }

  var fortify = function(self, target){
    if(!targetable(target)){return;}
      buffLength = 5
      target.defense = target.coreDefense * 1.25;
      
      console.log(self.name+" Fortified "+target.name+" (Def:"+target.defense+ ")");
      console.log(target);
      if(typeof fortCountdown !== 'undefined'){clearInterval(fortCountdown);}
      fortCountdown = setInterval(function(){
        buffLength--;
        console.log("fort: "+buffLength);
        if(buffLength <=0 ){
          clearInterval(fortCountdown);
          target.defense = target.coreDefense;
          console.log(target.name+" loses Fortify (Def:"+target.defense+ ")");
          console.log(target);
          return;
        }
      }, 1000); 
  }

  var rejuvination = function(self, target, callback){
    if(!targetable(target)){ return; }

    console.log(self.name+" casts Rejuvination on "+target.name);
    if(typeof rejuvCountdown !== 'undefined'){clearInterval(rejuvCountdown);}
    hotLength = 15;
    self.useMana(25);
    console.log(self);
    rejuvCountdown = setInterval(function(){
      hotLength--;

      if(hotLength <= 0 || !targetable(target)){
        clearInterval(rejuvCountdown);
        console.log(target.name+" loses Rejuvination");
      }

      if( hotLength % 3 === 0 ){
        heal = Math.floor(Math.random()*((10*(1+(1*self.currentSpirit/3)))-(10*(1+(1*self.currentSpirit/4)))+1)+(10*(1+(1*self.currentSpirit/4))));
        target.doHeal(heal);
        console.log("Rejuvination: +"+ heal);
        console.log(target);
      }
      
    }, 1000);
    callback = (typeof callback == 'function') ? callback : function(){};
    callback();
  }

  var refresh = function(self){
    if(typeof refreshTimeout == 'undefined'){
      ammount = 0;
    } else {
      clearTimeout(refreshTimeout);
    }
    ammount = ammount+.10;
    refreshTimeout = setTimeout(function(){
      ammount = 0;
    }, 3000)  
    self.getMana(self.currentHealth*ammount).doDamage(self.currentHealth*ammount);
  }


  //Offensive
  var arcaneMissile = function(self, target){  
  // Add test for target being a curable object
    if(targetable(target)){
      damage = Math.floor(Math.random()*((10*(1+(1*self.currentSpirit/3)))-(10*(1+(1*self.currentSpirit/4)))+1)+(10*(1+(1*self.currentSpirit/4))));
      console.log("Damage: - " + damage);
      target.doDamage(damage)
      self.useMana(20);
      console.log(self.name+" damaged "+target.name +" for "+damage);
      console.log(target);
    }
  }
  

  return {
    cure: cure,
    fortify: fortify,
    nourish: nourish,
    rejuvination: rejuvination,
    refresh: refresh,
    arcaneMissile: arcaneMissile
  };
})();