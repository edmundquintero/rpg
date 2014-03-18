
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
      Ui.console("You <span class='spell'>cure</span> "+target.name+" for: <span class='heal'>+" + heal + "</span>");
      target.doHeal(heal);
      self.useMana(20);
      Ui.console("<span class='mana'>-20 MP</span>");
    }
  }

  var nourish = function(self, target, callback){  
  // Add test for target being a curable object
  // self.currentMana = self.currentMana-20;
    if(targetable(target)){
      self.currentMana = self.currentMana-20;
      $('#'+self.name+' #champMana').css('width',self.currentMana/self.maxMana*100+'%');
      heal = Math.floor(Math.random()*((20*(1+(1*self.currentSpirit/3)))-(20*(1+(1*self.currentSpirit/4)))+1)+(20*(1+(1*self.currentSpirit/4))));
      target.doHeal(heal);
      self.useMana(35);
      Ui.console("You <span class='spell'>nourish</span> "+target.name+" for: <span class='heal'>+" + heal + "</span>");
      Ui.console("<span class='mana'>-35 MP</span>");
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

  var rejuvination = function(self, target){
    if(!targetable(target)){ return; }
    Ui.console("You cast <span class='spell'>Rejuvination</span> on "+target.name);
    heal = Math.floor(Math.random()*((10*(1+(1*self.currentSpirit/3)))-(10*(1+(1*self.currentSpirit/4)))+1)+(10*(1+(1*self.currentSpirit/4))));
    
    rejuv = {
      heal: heal, 
      target: target,
      init: function(){
        if(typeof target.rejuvCountdown !== 'undefined'){clearInterval(target.rejuvCountdown);}
          this.hotLength = 15;
          var that = this;
          target.rejuvCountdown = setInterval(function(){
            that.hotLength--;
            if( that.hotLength < 0 ){
              clearInterval(target.rejuvCountdown);
              Ui.console(target.name+" loses <span class='spell'>Rejuvination</span>");
            }
            if( that.hotLength % 3 === 0 ){
              target.doHeal(heal);
              Ui.console(target.name+" <span class='heal'>+"+heal+" HP</span>");
            }
          }, 1000);
      }
    }

    if(target.buff(rejuv)){
      self.useMana(25);
      Ui.console("<span class='mana'>-25 MP</span>");
    }

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
    }, 3000);
    Ui.console("<span class='damage'>- "+self.currentHealth*ammount+" HP</span>");
    Ui.console("<span class='mana'>+ "+self.currentHealth*ammount+" MP </span>");
    self.getMana(self.currentHealth*ammount).doDamage(self.currentHealth*ammount);
  }


  //Offensive
  var arcaneMissile = function(self, target){  
  // Add test for target being a curable object
    if(targetable(target)){
      damage = Math.floor(Math.random()*((10*(1+(1*self.currentSpirit/3)))-(10*(1+(1*self.currentSpirit/4)))+1)+(10*(1+(1*self.currentSpirit/4))));
      target.doDamage(damage);
      Ui.console("<span class='spell'>Arcane Missle</span> damages "+target.name+" for <span class='damage'> -"+damage+" HP");
      self.useMana(20);
      Ui.console("<span class='mana'>-20 MP</span>");
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