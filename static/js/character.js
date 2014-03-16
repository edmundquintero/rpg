
var Character = (function(){

  var Character = function(newName, options){
    this.name = (typeof newName === 'string') ? newName : "Player1";

    this.maxHealth = this.currentHealth = 100;
    this.maxMana = this.currentMana = 100;
    this.coreDefense = this.currentDefense = 10;
    this.coreAttack = this.currentAttack = 10;

    this.coreSpirit = this.currentSpirit = 4;

    console.log(typeof options);

    if(typeof options == 'object'){

      this.maxHealth = (typeof options.maxHealth === 'number') ? options.maxHealth : this.maxHealth;
      this.currentHealth = this.maxHealth;

      this.maxMana = (typeof options.maxMana === 'number') ? options.maxMana : this.maxMana;
      this.currentMana = this.maxMana;

      this.coreDefense = (typeof options.coreDefense === 'number') ? options.coreDefense : this.coreDefense;
      this.defense = this.coreDefense;

      this.coreAttack = (typeof options.coreAttack === 'number') ? options.coreAttack : this.coreAttack;
      this.attack = this.coreAttack;


    }

    $('#champMana').css('width',this.currentMana/this.maxMana*100+'%');

  };

// Spells
  Character.prototype = {
    cure: function(target){return Spells.cure(this, target)},
    fortify: function(target){return Spells.fortify(this, target)},
    nourish: function(target){return Spells.nourish(this, target)},
    rejuvination: function(target){return Spells.rejuvination(this, target)},
    arcaneMissile: function(target){return Spells.arcaneMissile(this, target)},
    refresh: function(){return Spells.refresh(this)},

  };

//Mana Regeneration
  Character.prototype.manaRegeneration = function(){
    var that = this;
    if(typeof manaRegen != 'undefined'){clearInterval(manaRegen);}
    var exp = .03;
    manaRegen = setInterval(function(){
      that.getMana(that.maxMana*exp); 
      if(that.currentMana >= that.maxMana){
        clearInterval(manaRegen);
      }
    }, 3000);
  };

  Character.prototype.doDamage = function(number){
    number = (typeof number == 'number') ? number : 0;
    this.currentHealth = this.currentHealth-number;
    this.currentHealth = (this.currentHealth <= 0) ? 0 : this.currentHealth;
    $('#'+this.name+' .champHealth').css('width',this.currentHealth/this.maxHealth*100+'%');
    return this;
  };

  Character.prototype.doHeal = function(number){
    number = (typeof number == 'number') ? number : 0;
    this.currentHealth = this.currentHealth+number;
    this.currentHealth = (this.currentHealth >= this.maxHealth) ? this.maxHealth : this.currentHealth;
    $('#'+this.name+' .champHealth').css('width',this.currentHealth/this.maxHealth*100+'%');
    return this;
  };


  Character.prototype.useMana = function(number){
    number = (typeof number == 'number') ? number : 0;
    this.currentMana = this.currentMana-number;
    this.currentMana = (this.currentMana <= 0) ? 0 : this.currentMana;
    $('#'+this.name+' .champMana').css('width',this.currentMana/this.maxMana*100+'%');
    this.manaRegeneration();
    return this;
  };

  Character.prototype.getMana = function(number){
    number = (typeof number == 'number') ? number : 0;
    this.currentMana = this.currentMana+number;
    this.currentMana = (this.currentMana >= this.maxMana) ? this.maxMana : this.currentMana;
    $('#'+this.name+' .champMana').css('width',this.currentMana/this.maxMana*100+'%');
    return this;
  };

  return Character;
})();