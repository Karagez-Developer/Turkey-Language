
// Sticky navbar
window.addEventListener('scroll', () => {
    const headerRows = document.querySelector('.header-rows');
    const rowOne = document.querySelector('.header-row-1');
    headerRows.classList.toggle('sticky', window.scrollY > 0 );
    if ( headerRows.classList.contains('sticky') ) {
        rowOne.style.display = 'none';
    }else {
        rowOne.style.display = 'flex';
    }
})



// Scroll animate for elements

let animatedElements = document.querySelectorAll('.anim-element');



window.addEventListener('scroll', () => {
    // Получили отступ сверху и высоту клиентского окна браузера
    const {scrollTop, clientHeight} = document.documentElement;

    animatedElements.forEach( item => {
        // получили информацию об отступе элемента сверху относительно окна клиента
        const topElementToTopVieport= item.getBoundingClientRect().top;
        
        // Добавляем класс к элементу
        if ( scrollTop > (scrollTop + topElementToTopVieport).toFixed() - clientHeight ) {
            item.classList.add('active');
        }else {
            item.classList.remove('active');
        }

    } )
});

// Swiper js for sponsors

var swiper = new Swiper(".sponsor-slider", {
    loop:true,
    grabCursor:true,
    spaceBetween: 20,
    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      450: {
        slidesPerView: 2,
      },
      768: {
        slidesPerView: 3,
      },
      991: {
        slidesPerView: 4,
      },
    },
  });

// Modal Window

const modalBtns = document.querySelectorAll('.modal-btn');
const modalBg = document.querySelector('.modal-bg');
const modalClose = document.querySelector('.close-x');

modalBtns.forEach( modalBtn => {
  modalBtn.addEventListener('click', () => {
    modalBg.classList.add('active');
  })
} )


modalClose.addEventListener('click', () => {
  modalBg.classList.remove('active');
})


// Slider-Swiper for Course

let swiperCourse = new Swiper(".swiper-course", {
  cssMode: true,

  // Стрелки для перелистования
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  // Пагинация
  pagination: {
    // Буллеты (по умолчанию)
    el: ".swiper-pagination",
    // Возможность кликать на булеты
    clickable: true,
  },
  mousewheel: true,
  keyboard: true,
  // onlyExternal: true,
});




// Перелистованию уровней вместе со слайдером

let courseRow = document.querySelectorAll('.course-level-title');
let levelDesides = document.querySelectorAll('.level-deside');
let swiperSlides = document.querySelectorAll('.swiper-slider');
const coursePred = document.querySelector('.swiper-button-prev');
const courseNext = document.querySelector('.swiper-button-next');

let countLevel = 0;

coursePred.addEventListener('click', () => {
  countLevel--;
  levelRow();
  listAnimActive();
  listLoaderAnim();
})

courseNext.addEventListener('click', () => {
  countLevel++;
  levelRow();
  listAnimActive();
  listLoaderAnim();
})

// Функция для уровней языка

function levelRow() {
  courseRow.forEach( item => {item.classList.remove('active')} );
  levelDesides.forEach( item => {item.classList.remove('active')} );
  courseRow[countLevel].classList.add('active');
  levelDesides[countLevel].classList.add('active');
}

// К каждому названию уровня добавляем функционал
courseRow.forEach( (item, index) => {
  item.addEventListener( 'click', () => {
    swiperCourse.slideTo(index);
    countLevel = index;
    levelRow();
    listAnimActive();
    listLoaderAnim();
  } )
  
} )

// Метод swipera slideTo - направляет по индексу на нужный слайд

// Плавное появление списков в слайдах в секции Course

let listAnim = document.querySelectorAll('.list-anim');

// Наполняем splitLists - по логике разделения
let splitLists = [];
let tempArr = [];
let countList = 0;
listAnim.forEach( (item) => {
  tempArr.push(item);
  countList++;
  if ( countList === 4 ) {
    splitLists.push(tempArr);
    tempArr = [];
    countList = 0;
  }
} );


// Функция для плавного появления списков в секции Course
function listAnimActive() {
  splitLists.forEach( arr => arr.forEach( el => el.classList.remove('active') ) )
  let listSpeed = 0.4;
  splitLists[countLevel].forEach( item => {
    item.classList.add('active');
    item.style.transition = `transform ${listSpeed}s ease-in-out`;
    listSpeed += 0.4;
  } 
  )
}


// Анимированный Loader для секции Course

let loadersMain = [];
let loadersMiddle = [];

let loadersProcent = document.querySelectorAll('.procent');
loadersProcent = Array.from(loadersProcent).map( item => item = parseInt(item.textContent) );
let loaders = document.querySelectorAll('.progress-bar div');

// Наполняем loadersMain - по логике разделения
let countLoader = 0;
for ( let i = 0; i < loadersProcent.length; i++ ) {
  loadersMiddle.push([loadersProcent[i], loaders[i]]);
  countLoader++;
  if ( countLoader === 5 ) {
    loadersMain.push(loadersMiddle);
    loadersMiddle = [];
    countLoader = 0;
  }
}

listLoaderAnim();


// Функция, которая включает анимацию loader в нужных секциях
function listLoaderAnim() {
  loadersMain[countLevel].forEach( item => {
    function progress() {
      let widthLoader = 1;
      let loaderTimer = setInterval(progressStatus, 35);
      function progressStatus() {
        if ( widthLoader >= item[0] ) {
          clearInterval(loaderTimer);
        }else {
          widthLoader++;
          item[1].style.width = widthLoader + '%';
        }
      }
    }
    progress();
  } )
}

// Swiper for Teachers section

let techerMain = document.querySelector('.teachers-main');
let slideViewCount = 0;
let spaceBetweenNum = 30;

// Нужные параметры слайдера в зависимости от ширины окна браузера
if ( techerMain.clientWidth === 1170 ) {
  slideViewCount = 3;
  
}else if ( techerMain.clientWidth < 1170 && techerMain.clientWidth >= 800 ) {
  slideViewCount = 2;
  spaceBetweenNum = 15;
}
else {
  slideViewCount = 1;
  spaceBetweenNum = 0;
}

var swiper = new Swiper(".swiper-teachers", {
  loop: true,
  grabCursor:true,
  slidesPerView: slideViewCount,
  spaceBetween: spaceBetweenNum,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

// Burger menu (adaptive menu)

const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav ul');
const links = document.querySelectorAll('.nav ul li');

function burgerFn() {
  burger.addEventListener('click', () => {
    nav.classList.toggle('nav-active');

    burger.classList.toggle('toggle');

    links.forEach( (item, index) => {
      if (item.style.animation) {
        item.style.animation = '';
      }
      else {
        item.style.animation = `navLinksFade .5s ease forwards ${index/7 + 0.3}s`
      }
    } )
  })
}

burgerFn();










