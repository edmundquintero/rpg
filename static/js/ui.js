
var Ui = (function(){

  var console = function(message){
    if($('#console')){
      $('#console').append('<p>'+message+'</p>');
    }
  }

  return {
    console: console

  };
})();