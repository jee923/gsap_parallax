document.addEventListener("DOMContentLoaded", function () {
  // 문서에 있는 모든 컨텐츠가 로드되면 실행
  Splitting(); // 텍스트 분할
  luxy.init(); // luxy.js 실행
  gsap.registerPlugin(ScrollTrigger); // GSAP 스크롤 트리거 플러그인 등록

  // GSAP 애니메이션 -----
  // 메인 텍스트 스크롤 업 효과
  const gTl = gsap.timeline(); // 타임라인이 등록되면 from to로 연속된 효과를 묶을 수 있음

  gTl.from(".title .char", 1, {
    opacity: 0,
    yPercent: 130,
    ease: "export.out",
    stagger: 0.06,
  });

  // 문자 간격 줄어드는 효과

  // let chars = document.querySelectorAll('.title .char');
  //  let marginStart = 30;
  //  let marginEnd = 10;

  //  gTl.from(chars, {
  //    duration: 1,
  //    opacity: 0,
  //    ease: 'linear',
  //    onUpdate: function () {
  //      let progress = this.progress();
  //      let currentMargin = marginStart + (marginEnd - marginStart) * progress;
  //      chars.forEach((char) => {
  //        char.style.margin = `0 ${currentMargin}px`;
  //      });
  //    },
  //  });

  // 메인 이미지 애니메이션
  gTl.to(
    ".header__img",
    2, // 애니메이션 지속 시간 2초
    {
      // clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      clipPath: "circle(141.4% at 0 100%)",
      scale: 1.1,
      ease: "expo.out",
    },
    "1" // 앞에 진행된 효과가 끝나기 1초 전에 다음 효과가 진행
  );

  // 하단 텍스트 애니메이션
  gTl.from(
    ".header__marq",
    2,
    {
      opacity: 0,
      yPercent: 100,
      ease: "expo.out",
    },
    "1.2"
  );

  // scrollTrigger 공통 속성
  const commonScrollTrigger = {
    header: {
      // 효과 X, 컨트롤러 등록(요소, 시작점, 끝나는점, 스크롤 동기화 여부 등을 적는 것)
      trigger: ".header", // 애니메이션 시작점과 끝나는 지점의 기준
      start: "top top", // 첫번째: 요소의 시작 위치, 두번째 : 화면의 시작 위치
      scrub: 1.8, // 스크롤 동기화 여부, true : 스크롤 타이밍에 맞춰 애니메이션 실행, 시간 적용 시 지정된 시간만큼 지연 후 애니메이션 실행
    },
    about: {
      trigger: ".about",
      start: "top bottom",
      scrub: 1.9,
    },
  };

  function headerAnimationWithScroll(imgX) {
    // 화면 스크롤 시 애니메이션 효과
    gsap.to(".title_paralax", {
      scrollTrigger: commonScrollTrigger.header,
      // scrollTrigger : {
      //   trigger: ".header", // 애니메이션 시작점과 끝나는 지점의 기준
      //   start: "top top", // 첫번째: 요소의 시작 위치, 두번째 : 화면의 시작 위치
      //   scrub: 1.8, //
      // },
      // 실제 효과 넣는 곳
      yPercent: -150, // Y축으로 -150%만큼 이동
    });

    gsap.to(".header .stroke", {
      scrollTrigger: commonScrollTrigger.header,
      xPercent: 50, // x축으로 50%만큼 이동
    });

    gsap.to(".header__img", {
      scrollTrigger: commonScrollTrigger.header,
      xPercent: imgX,
    });

    gsap.to(".header__img img", {
      scrollTrigger: commonScrollTrigger.header,
      scale: 1.3,
    });

    gsap.to(".header__marq-wrapper", {
      scrollTrigger: commonScrollTrigger.header,
      xPercent: -50,
    });

    gsap.to(".header__marq-star img", {
      scrollTrigger: commonScrollTrigger.header,
      rotate: -720,
    });
  }

  const gsapSquares = gsap.utils.toArray(".section_title_square");
  gsapSquares.forEach((square) => {
    const rotate = gsap.from(square, 3, {
      rotation: 720,
    });
    ScrollTrigger.create({
      trigger: square, // 애니메이션 대상
      animation: rotate, // 애니메이션 효과
      start: "top bottom",
      scrub: 1.9,
    });
  });

  // const rotateSquares = gsap.from(gsapSquares, 3, {
  //   rotation: 720,
  // });

  // ScrollTrigger.create({
  //   trigger: gsapSquares,
  //   animation: rotateSquares,
  //   start: "top bottom",
  //   scrub: 1.9,
  // });

  function aboutAnimationWithScroll(imgY, txtY) {
    gsap.from(".about_img", {
      scrollTrigger: commonScrollTrigger.about,
      yPercent: imgY,
    });
    gsap.from(".about_img img", {
      scrollTrigger: commonScrollTrigger.about,
      scale: 1.6,
    });

    gsap.to(".about_txt", {
      scrollTrigger: commonScrollTrigger.about,
      yPercent: txtY,
    });
  }

  // Benefits Section Animation Effect
  function benefits() {
    // gsap.from(".benefits_num", {
    //   x: (i, el) => 1 - parseFloat(el.getAttribute("data-speed")), // parseFloat: 소수점 제거
    //   scrollTrigger: {
    //     trigger: ".benefits_list",
    //     start: "top bottom",
    //     scrub: 1.9,
    //   },
    // });

    const benefitsNum = gsap.utils.toArray(".benefits_num");
    benefitsNum.forEach((num) => {
      const xMove = gsap.from(num, 3, {
        x: 1 - parseFloat(num.getAttribute("data-speed")),
      });

      ScrollTrigger.create({
        trigger: num, // 애니메이션 대상
        animation: xMove, // 애니메이션 효과
        start: "top bottom",
        scrub: 1.9,
      });
    });
  }

  benefits();

  function worksAnimationWithScroll() {
    const workAnimationElmts = gsap.utils.toArray(".work-item, .work-item-num");
    workAnimationElmts.forEach((elmt) => {
      const yMove = gsap.from(elmt, 3, {
        y: 1 - parseFloat(elmt.getAttribute("data-speed")),
      });

      ScrollTrigger.create({
        trigger: ".work", // 애니메이션 대상
        animation: yMove, // 애니메이션 효과
        start: "top bottom",
        scrub: 1.9,
      });
    });

    // image scale effect
    gsap.from(".work-item-img img", {
      scale: 1.6,
      scrollTrigger: {
        trigger: ".work",
        start: "top center",
        scrub: 1.9,
      },
    });
  }

  worksAnimationWithScroll();

  function servAnimationWithScroll() {
    const servAnimationElmts = gsap.utils.toArray(".serv-item-arrow");
    servAnimationElmts.forEach((elmt) => {
      const xMove = gsap.from(elmt, 3, {
        x: 1 - parseFloat(elmt.getAttribute("data-speed")),
      });

      ScrollTrigger.create({
        trigger: ".serv-list", // 애니메이션 대상
        animation: xMove, // 애니메이션 효과
        start: "top bottom",
        scrub: 1.9,
      });
    });
  }

  servAnimationWithScroll();

  function footerAnimationWithScroll() {
    const footerAnimationElmts = gsap.utils.toArray(".footer-wrapper span");
    footerAnimationElmts.forEach((elmt) => {
      const yMove = gsap.from(elmt, 3, {
        y: 1 - parseFloat(elmt.getAttribute("data-speed")),
      });

      ScrollTrigger.create({
        trigger: ".footer", // 애니메이션 대상
        animation: yMove, // 애니메이션 효과
        start: "top bottom",
        end: "bottom bottom",
        scrub: 1.9,
      });
    });
  }

  footerAnimationWithScroll();

  if (window.innerWidth > 980) {
    headerAnimationWithScroll(-70);
    aboutAnimationWithScroll(80, 50);
  } else if (window.innerWidth <= 980) {
    headerAnimationWithScroll(0);
    aboutAnimationWithScroll(0, 30);
  }
}); // end of DOM Content Loaded Method
