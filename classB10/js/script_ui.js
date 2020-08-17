$(function() {
  init();

});

//기본적으로 쓰는 script
function init() { //초기화

  /* use jquery fullpage */
  $("#fullpage").fullpage({
    //section bg color
    sectionsColor: ['', '#eaeef2', '#b6e4fe', '#e2dcd4', '#fff'],
    //move page nav
    navigation: true,
    //move page nav name
    navigationTooltips: ['MAIN', 'PROFILE', 'SKILL', 'PORTFOLIO','CONTACT'],
    //page url route == <a href="#firstPage"></a>
    anchors: ['firstPage', 'secondPage', '3rdPage', '4thPage', '5thPage'],
    //scroll speed
    scrollingSpeed: 1500,
    //해당 화면에서만 패럴럭스 제어하기 위해
    onLeave: function(index, nextIndex, direction) {
      scrollFn(nextIndex);
    }
  });  

  /* main */
  $("#section0 .wrap_link > div > a").mouseover(function() { 
    var _idx = $(this).parent().index() + 1;  
    //class명이 select_1 select_2 select_3 누적되어 다 들어가므로 초기화 해줘야 > removeClass()
    $("#section0 .wrap_bg").removeClass("select_1 select_2 select_3");
    $("#section0 .wrap_bg").addClass("select_" + _idx);
  }).mouseout(function() { 
    $("#section0 .wrap_bg").removeClass("select_1 select_2 select_3");
  });
  //>> 같은 선택자에 이벤트가 2개이상 들어가면 붙여줘 > 코드 더 간결해짐

  /* 패럴럭스 효과: 패럴럭스 스크롤링(parallax scrolling)은 사용자가 마우스를 스크롤할 때, 원거리에 있는 배경 이미지는 느리게 움직이게 하고, 근거리에 있는 사물 이미지는 빠르게 움직이도록 함으로써 입체감을 느낄 수 있게 만든 디자인 기법이다. 하나의 이미지를 여러 개의 레이어(layer)로 분리한 후 스크롤에 반응하는 속도를 다르게 조정하는 방식으로 구현한다. */
  $("#section0").parallax({
    imageSrc: 'img/bg_main.png'
  });
  /* 메인 오브젝트 시간차 애니메이션 */ 
  function scrollFn(idx) {
    // console.log(idx);
    if(idx == 1) {
      $(".ico").css('transform', 'translateY(0px)');
    } else {
      $(".ico").css('transform', 'translateY(-300px)');
    }
  }

  /* profile */
  $("#section1 .wrap_link > div > a").mouseover(function() {
    var _idx = $(this).parent().index() + 1;  
    $("#section1 .wrap_bg").removeClass("select_1 select_2 select_3");
    $("#section1 .wrap_bg").addClass("select_" + _idx);
  }).mouseout(function() {
    $("#section1 .wrap_bg").removeClass("select_1 select_2 select_3");
  });
  
  /* skill */
  // 동일한 선택자가 여러번 나오면 변수에 담아주는것이 편리
  var $unit = $("#section2 .wrap_wave .inner > .unit");
  var intId;
  $("#section2 .wrap_link > div > a").mouseover(function() {
    // console.log("mouseover");
    var _idx = $(this).parent().index();
    if(_idx == 0) {
      $unit.css({"transform":"translateY(0%)"});
    } else if(_idx == 1) {
      $unit.css({"transform":"translateY(55%)"});
    } else if(_idx == 2) {
      $unit.css({"transform":"translateY(76%)"});
    } else if(_idx == 3) {
      $unit.css({"transform":"translateY(83%)"});
    }
    clearInterval(intId);
    intId = setInterval(checkUnit,10);  //transtion효과 시작 이벤트와 끝나기 전까지 계속 이벤트를 발생시킴
  }).mouseout(function() {
    $unit.css({"transform":"translateY(100%)"});
  });

  //transiton효과 끝에 발생하는 이벤트 //함수가 transition이 일어날때마다 체크해줌
  $unit.on("transitionend", function() {  
    // console.log($(this).css('transform').split(",")[5]);
    clearInterval(intId); //계속 발생되는 이벤트를 멈춰줌
    setTimeout(checkUnit,10);
  });
  function checkUnit() {
    var num = $unit.css('transform').split(",")[5]; //unit의 transform matrix좌표값 중에서 5번째 translateY의 값 구함
    num = num.replace(")", ""); //위에서 구한 좌표값에서 ")"문자를 지움
    // console.log(num);
    var th = $("#section2 .wrap_wave").height();  //전체값
    var val = 100-Math.round(num/th*100); //현재값/전체값 백분율 계산
    $("#section2 .wrap_wave .inner > .unit > .num > strong").text(val);  //html의 숫자태그에 넣어줌
  };

  /* portfolio */
  $("#section3 .wrap_photo > ul").slick({
    dots: false,
    slidesToShow: 3,
    SlidesToScroll: 1,
    variableWidth: true,
    centerMode: true,
    arrows: false
  }).on("afterChange", function(event, slick, current) {
    // console.log(current);
    $("#section3 .wrap_txt > ul > li").removeClass("on"); //reset
    $("#section3 .wrap_txt > ul > li").eq(current).addClass("on"); 
  });

  document.addEventListener("mousemove", function(e) {
    // console.log(e);
    moveInBox(e);
  });

  function moveInBox(e) {
    var $cursor = $("#section3 .wrap_photo .cursor");

    //커서에 대한 값
    var cursorW = $cursor.width()/2;
    var cursorH = $cursor.height()/2;

    //마우스 위치 값
    var mouseX = e.pageX;
    var mouseY = e.pageY;
    // console.log(mouseX, mouseY);
    $cursor.css({"top": mouseY - cursorH, "left": mouseX - cursorW})

  }

  

};//init()