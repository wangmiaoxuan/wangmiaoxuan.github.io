var player="";
var com="";
var result="";
var gestures=['paper','scissor','stone']

$(".btn").click(function(){
  player=$(this).attr('id');
  com = gestures[Math.floor(Math.random()*3)];
  
  if( player == com ){
     result="平手";
  }else if( player =="paper"){
     if(com == "stone"){
        result="贏了";
     }else{
        result="輸了";
     }
  }else if( player =="scissor"){
     if(com == "paper"){
       result="贏了";
     }else{
       result="輸了";
     }
  }else if( player =="stone"){
     if(com == "scissor"){
        result="贏了";
     }else{
        result="輸了";
     } 
  }
  $("#result").html("你出 "+player+"<br>電腦出 "+com+"<br>"+result);
});