var isIos = /iPhone|iPad|iPod/i.test(navigator.userAgent) ? true : false;

$(function() {
  //동적으로 html추가되게 > append
  $(".txt_area input").keypress(function(e) {  //input태그에 key누르면 동작
    
    // console.log(e.keyCode); //a=97, A=65 //enter=13
      if(e.keyCode == 13 && $(this).val().length > 0) { //엔터를 누를 경우 실행되게 & 입력하고 있는 input의 값이 있을 때만 실행(타이핑치지 않으면 입력되지x)
        console.log($(this).val());  //타이핑이 친 값=value
        console.log($(this).attr("class")); //클래스명 가져옴

        // console.log($(this).hasClass("mymsg")); 
       
        //*입력된 변수: _로 시작
        var _val = $(this).val(); //입력된 value
        var _class = $(this).attr("class"); //입력된 input의 클래스
        var _time = currnetTimeFn();  //함수 호출하면 현재시간(_ct) 반환 > 변수에 저장

        $(this).val("");  //입력된 value삭제

        //※멀티클래스 한 칸 띄어줘야
        $(".chat_wrap .inner").append('<div class="item ' + _class + '"><div class="box"><p class="msg">' + _val + '</p><span class="time">' + _time +'</span></div></div>');

        //>> 거의 동시에 일어남 > transition되려면 시간 차 필요
        setTimeout(function() { //애니메이션 클래스는 시간차를 줘야 작동함
          $(".chat_wrap .inner .item").last().addClass("on");  //마지막 찾음

          var _h = $(".chat_wrap .inner .item").height(); //item의 높이값
          var _l = $(".chat_wrap .inner .item").length; //item의 갯수
          var _mt = $(".chat_wrap .inner .item").last().css("margin-top");  //item의 margin-top값
          // console.log(_h);
          // console.log(_l);
          // console.log(_mt);
          _mt = parseInt(_mt, 10);  //margin-top의 값 중 px를 삭제
          // $(".chat_wrap .inner").scrollTop(_h*_l + _mt*(_l-1)); //위의 알아낸 값들의 계산식을 scrollTop에 적용

          $(".chat_wrap .inner").stop().animate({ //입력이 빨리되어 애니메이션이 딜레이될 수 도 있기 때문에 > stop()을 줘야 딜레이되지x //* 애니메이션에는 습관적으로 stop() 넣어줘야   
            scrollTop: _h*_l + _mt*(_l-1)
          },500)
        },100);
        
      } 
  }); 

  //아이폰 처리
  if(isIos) {
    $(".txt_area input").focusin(function() {
      setTimeout(function() {
        $(".chat_wrap").addClass("keypad_on");
        $("html").stop().animate({
          scrollTop: 0
        },10)
      },30)
      $(".txt_area input").focusout(function(){
        $("chat_wrap").removeClass("keypad on");
      })
    })
  }

});

//현재시간을 알아내고 값을 반환하는 함수(function)
function currnetTimeFn() {
  var _date = new Date(); //현재 시간에 대한 정보 담긴 객체  
  // console.log(date);
  var _hh = _date.getHours(); //현재 시  //호출된 시간에서 정보를 뱉음
  var _mm = _date.getMinutes(); //현재 분

  var _apm;  //오후 정보를 담는 변수
  if(_hh > 12) {
    _apm = "오후";
    _hh = _hh - 12; 
  } else {
    _apm = "오전"
  }

  if(_hh < 10) _hh = "0" + _hh;
  if(_mm < 10) _mm = "0" + _mm;

  // console.log(_apm);
  // console.log(_hh);
  // console.log(_mm);

  var _ct = _apm + " " + _hh + ":" + _mm; //현재 시간을 담은 변수
  // console.log(_ct);

  return _ct; //현재시간 반환
}


