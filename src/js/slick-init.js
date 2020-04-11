/*
詳しい解説
https://webdesignday.jp/inspiration/technique/jquery-js/3847/
 */
jQuery(function ($){
  $('.js-case').slick({
    slidesToShow:3,
    responsive:[
      {
        breakpoint: 768,
        settings:{
          slidesToShow:3,
        }
      },
      {
        breakpoint: 480,
        settings:{
          slidesToShow:1,
        }
      },
    ]
  });
});
