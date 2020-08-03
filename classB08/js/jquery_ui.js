$(function(){
	//메인 헤더 스크롤 이벤트
	if($(".main").length)	{	//0이 아닌경우 실행되게
		// alert("main 체크");
		$(window).scroll(function() {
			// console.log("스크롤");
			// console.log($(window).scrollTop());
			if($(window).scrollTop() == 0) {
				$(".header").removeClass("down");
			} else {
				$(".header").addClass("down");
			}
 		});
	}

	//네비 열기
	

	//네비 닫기


	//메인 베너 슬라이드
	  

	//베스트 아이템 슬라이드
		

})