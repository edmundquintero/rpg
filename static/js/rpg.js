$(function(){

  var test = new Character("TestChamp1",{maxMana: 300});
  // test.maxMana = test.currentMana = 300;
  console.log(test);

  var test2 = new Character("TestChamp2");
  test2.currentHealth = 300;
  test2.maxHealth += 200;
  test2.coreDefense+=10;
  test2.attack-=5;
  console.log(test2);

  $('#fortify').on('click', function(){
    test.fortify(test2);
  });
  $('#cure').on('click', function(){
    test.cure(test2);
  });
  $('#nourish').on('click', function(){
    test.nourish(test2);
  });
  $('#rejuvination').on('click', function(){
    test.rejuvination(test2);
  });
  $('#arcaneMissile').on('click', function(){
    test.arcaneMissile(test2);
  });
  $('#refresh').on('click', function(){
    test.refresh();
  });

});