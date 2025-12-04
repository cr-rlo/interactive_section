(function(){
const houseElem = document.querySelector('.house');//집 요소 선택
const barElem = document.querySelector('.progress-bar');//프로그레스 바 요소 선택
const mousePos = {x:0, y:0};//마우스 위치 저장 객체
const stageElem = document.querySelector('.stage');//스테이지 요소 선택

let maxScrollValue = document.body.offsetHeight - window.innerHeight;//문서 전체 높이 - 화면 높이 = 최대 스크롤 픽셀값

window.addEventListener('scroll', function(){

    const scrollPer = pageYOffset/maxScrollValue; //스크롤된 픽셀값/최대 스크롤 픽셀값
    const zMove =(scrollPer*980 - 490); //스크롤된 픽셀값/최대 스크롤 픽셀값*1000
    houseElem.style.transform = `translateZ( ' + zMove + 'vw)`; //스크롤된 픽셀값에 비례하여 z축 이동 
    // 스크롤된 픽셀값이 0일 때 z축 -490vw, 최대 스크롤 픽셀값일 때 z축 510vw

    //progress bar
    barElem.style.width = scrollPer * 100 + '%'; //스크롤된 픽셀값에 비례하여 프로그레스 바 너비 변경. 100을 곱해 %로 변환

window.addEventListener('mousemove', function(e){mousePos.x = -1 + (e.clientX / window.innerWidth) * 2; //현재 x축의 위치/창 너비*2 -1
    mousePos.y = 1 - (e.clientY / window.innerHeight) * 2;
    //마우스 위치를 -1~1 사이의 값으로 변환하여 저장
    stageElem.style.transform = `rotateX(${mousePos.y * 5}deg) rotateY(${mousePos.x * 5}deg)`;//마우스 위치에 비례하여 스테이지 회전, x축을 기준으로 회전할 때는 y값 사용, y축을 기준으로 회전할 때는 x값 사용
});





});




  window.addEventListener('resize', resizeHandler); //창 크기 변경 시 최대 스크롤 픽셀값 갱신

  function resizeHandler() {
      maxScrollValue = document.body.offsetHeight - window.innerHeight;
      //문서 전체 높이 - 화면 높이 = 최대 스크롤 픽셀값
  }

})();