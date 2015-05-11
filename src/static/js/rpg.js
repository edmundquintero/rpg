$(function(){

  var test = new Character("TestChamp1",{maxMana: 600});
  // test.maxMana = test.currentMana = 300;
  console.log(test);

  var test2 = new Character("TestChamp2");
  test2.currentHealth = 300;
  test2.maxHealth += 200;
  test2.coreDefense+=10;
  test2.attack-=5;
  console.log(test2);

  var target = test2;
  $('#targetMe').on('click', function(){
    target = test;
  });
  $('#targetTestChamp2').on('click', function(){
    target = test2;
  });


  $('#fortify').on('click', function(){
    test.fortify(target);
  });
  $('#cure').on('click', function(){
    test.cure(target);
  });
  $('#nourish').on('click', function(){
    test.nourish(target);
  });
  $('#rejuvination').on('click', function(){
    test.rejuvination(target);
  });
  $('#arcaneMissile').on('click', function(){
    test.arcaneMissile(target);
  });
  $('#refresh').on('click', function(){
    test.refresh();
  });

});