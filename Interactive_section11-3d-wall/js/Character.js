function Character(info) {
    this.mainElem = document.createElement('div');
    this.mainElem.classList.add('character');
    // <div class="character"></div>
    this.mainElem.innerHTML = ''
        + '<div class="character-face-con character-head">'
            + '<div class="character-face character-head-face face-front"></div>'
            + '<div class="character-face character-head-face face-back"></div>'
        + '</div>'
        + '<div class="character-face-con character-torso">'
            + '<div class="character-face character-torso-face face-front"></div>'
            + '<div class="character-face character-torso-face face-back"></div>'
        + '</div>'
        + '<div class="character-face-con character-arm character-arm-right">'
            + '<div class="character-face character-arm-face face-front"></div>'
            + '<div class="character-face character-arm-face face-back"></div>'
        + '</div>'
        + '<div class="character-face-con character-arm character-arm-left">'
            + '<div class="character-face character-arm-face face-front"></div>'
            + '<div class="character-face character-arm-face face-back"></div>'
        + '</div>'
        + '<div class="character-face-con character-leg character-leg-right">'
            + '<div class="character-face character-leg-face face-front"></div>'
            + '<div class="character-face character-leg-face face-back"></div>'
        + '</div>'
        + '<div class="character-face-con character-leg character-leg-left">'
            + '<div class="character-face character-leg-face face-front"></div>'
            + '<div class="character-face character-leg-face face-back"></div>'
        + '</div>';

    document.querySelector('.stage').appendChild(this.mainElem);
    /* 스테이지 클래스 선택 후 자식요소로 캐릭터 추가 */

    this.mainElem.style.left = info.xPos + '%';
    // 클릭하면 Character 객체가 생성되는데, 그때 속성값이 info로 들어가고, 그 객체의 mainElem 스타일 left 속성에 info.xPos 값을 % 단위로 지정


    // 스크롤 중인지 아닌지 체크하는 변수
    this.scrollState = false;
    // 바로 이전 스크롤 위치
    this.lastScrollTop = 0;
    this.xPos = info.xPos;
    this.speed = info.speed;
    this.direction;
    // 좌우 이동 중인지 아닌지
    this.runningState = false;
    this.rafId;
    this.init();
    // 실행하면 this의 init 바로 실행
}

Character.prototype = {
    constructor: Character,
    init: function () {
        const self = this;
        // 여기서 this가 가르키는 것이 객체 -> 이 값을 self라는 상수에 저장해 둠

        window.addEventListener('scroll', function () {
            clearTimeout(self.scrollState);

            if (!self.scrollState) {
                self.mainElem.classList.add('running');
            }

            self.scrollState = setTimeout(function () {
                self.scrollState = false;
                // 스크롤 멈춘 상태
                self.mainElem.classList.remove('running');
            }, 500);

            // 이전 스크롤 위치와 현재 스크롤 위치를 비교
            if (self.lastScrollTop > pageYOffset) {
                // 이전 스크롤 위치가 크다면: 스크롤 올림
                self.mainElem.setAttribute('data-direction', 'backward');
                // setAtrribute로 data-direction의 속성값을 backward로
            } else {
                // 현재 스크롤 위치가 크다면: 스크롤 내림
                self.mainElem.setAttribute('data-direction', 'forward');
            }

            self.lastScrollTop = pageYOffset;
            // 스크롤이 끝나는 시점의 y위치를 저장해둠
        });

        window.addEventListener('keydown', function (e) {
            if (self.runningState) return;

            if (e.key === 'ArrowLeft') {
                // 왼쪽
                self.direction = 'left';
                self.mainElem.setAttribute('data-direction', 'left');
                self.mainElem.classList.add('running');
                self.run(self);
                // self.run(); // bind를 사용한 방법
                self.runningState = true;
            } else if (e.key === 'ArrowRight') {
                // 오른쪽
                self.direction = 'right';
                self.mainElem.setAttribute('data-direction', 'right');
                self.mainElem.classList.add('running');
                self.run(self);
                // self.run(); // bind를 사용한 방법
                self.runningState = true;
            }
        });

        window.addEventListener('keyup', function (e) {
            self.mainElem.classList.remove('running');
            cancelAnimationFrame(self.rafId);
            self.runningState = false;
            // 멈추고 나면 runningstate가 true로 바뀐 상태니까 다시 false로 초기화해줘야 다시 키를 눌렀을ㄷ 때 keydown이벤트 실행 가능
        });
    },
    run: function (self) {
        
        if (self.direction == 'left') {
            self.xPos -= self.speed;
        } else if (self.direction == 'right') {
            self.xPos += self.speed;
        }

        if (self.xPos < 2) {
            self.xPos = 2;
            // 화면 밖을 넘어가지 않게 하는 기능
        }

        if (self.xPos > 88) {
            self.xPos = 88;
        }

        self.mainElem.style.left = self.xPos + '%';

        self.rafId = requestAnimationFrame(function () {
            self.run(self);
        });
    }
    // bind를 사용한 방법
    // run: function () {
    //     const self = this;
    //
    //     if (self.direction == 'left') {
    //         self.xPos -= self.speed;
    //     } else if (self.direction == 'right') {
    //         self.xPos += self.speed;
    //     }
    //
    //     if (self.xPos < 2) {
    //         self.xPos = 2;
    //     }
    //
    //     if (self.xPos > 88) {
    //         self.xPos = 88;
    //     }
    //
    //     self.mainElem.style.left = self.xPos + '%';
    //
    //     self.rafId = requestAnimationFrame(self.run.bind(self));
    // }
};
