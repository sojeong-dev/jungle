$(function(){
    //첫 화면 셋팅 버튼
    $(".btn_setting").click(function() {
        // $(this).parent().hide();
        $(this).parent().slideUp();
        loadDataFn(); //함수 호출
    });  

    //테스트를 위한 임시 호출
    // loadDataFn();

    var completeData; //json데이터 담는 변수  //전역변수

    function loadDataFn () { //json파일을 받아오는 함수
        $.ajax({
            url: "js/data.json",
            dataType: "json", //xml
            success: function(result) {
                console.log(result); //json파일이 담김
                completeData = result.seatInfo; //배열 담음
                settingSeatFn();
            }
        })
   }

   var selectArray = [];
   
   //자리 셋팅 관련 함수
   function settingSeatFn() {
        // $(".section.reservation").show();
        $(".section.reservation").show();

        //목록 누적을 막기위한 목록 지우기(초기화)
        $(".section.reservation > ol > li").remove();

        //하단 선택 정보 초기화
        $(".txt_info_number").text("");
        $(".txt_info_total").text(0);

       //파싱 작업: 필요한 데이터 뽑아냄
       console.log(completeData.length);
       for(var i = 0; i < completeData.length; i++) {
           var name = completeData[i].name;
           var price = completeData[i].price;
           var reserve = completeData[i].reserve;
           
           $(".section.reservation > ol").append("<li class='unit'><button data-price='" + price + "'" + reserve + ">" + completeData[i].name + "</button></li>");
       }

       selectArray = []; //선택좌석 index를 담는 배열
       var name, price; //전역변수

       //좌석버튼 클릭 이벤트
       $(".section.reservation .unit > button").click(function() {
            // console.log($(this).text());
            $(this).toggleClass("select");
            
            // console.log($(this).hasClass("select"));
            if($(this).hasClass("select")) { //좌석선택할 경우
                // console.log($(this).parent().index());
                selectArray.push($(this).parent().index()); //push: 배열에 값을 추가
                console.log(selectArray);
            } else { //좌석 해제될 경우
                var removeIndex = selectArray.indexOf($(this).parent().index()); //해당 값이 위치해있는 순서(index)를 찾음
                selectArray.splice(removeIndex, 1); //배열의 index위치부터 1자리를 삭제함 //splice: 해당 index를 삭제
            }
            // console.log(selectArray.length);
            
            name = "", price = 0; //값 초기화
            for(var i = 0; i < selectArray.length; i++) {
                console.log(selectArray[i]);
        
                name += $(".section.reservation > ol > li").eq(selectArray[i]).find("button").text() + " ";
                
                console.log(name);

                price += $(".section.reservation > ol > li").eq(selectArray[i]).find("button").data("price");
                
                console.log(price);
            }

            $(".txt_info_number").text(name);
            $(".txt_info_total").text(price);
       });

       //완료 클릭 이벤트
       $(".btn_submit").click(function() {
            // console.log(selectArray);
            // console.log(selectArray.length);
            if(selectArray.length > 0) {
                // $(".section.reservation").hide();
                $(".section.reservation").slideUp();
                // $(".section.complete").show();
                $(".section.complete").slideDown();

                $(".section.complete .txt_number").text(name);
                $(".section.complete .txt_price strong").text(price);
            } else {
                alert("자리를 선택 해 주세요.");
            }
       });

       //리셋 이벤트
       $(".btn_reset").click(function() {
            $(".box_intro").slideDown();
            $(".section.complete").slideUp();
       });


   }
})