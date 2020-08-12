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
  

};//init()