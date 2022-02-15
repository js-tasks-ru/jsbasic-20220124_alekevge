function initCarousel() {
  // ваш код...
  let btn_right = document.querySelector(".carousel__arrow_right")
  let btn_left = document.querySelector(".carousel__arrow_left")
  let slider = document.querySelector(".carousel__inner")
  let slides = document.getElementsByClassName("carousel__slide")
  window.var = 0 //в глобальной переменной храним текущий слайд

  function get_offset(slider)
  {
    //из всех слайдов берёт все что до текущего включительно
    //считает общее смещение если вдруг слайды разные по размерам (просто более общий вариант)
    let arr = [...slides].slice(0,slider)
    return  arr.reduce((sum,el)=>{return sum = sum+el.offsetWidth},0)
  }

  function isHide(el)
  {
    //нужно ли скрыть кнопку ?
    return (el===btn_right && window.var==slides.length-1) ||
           (el===btn_left && window.var==0)
  }

  function tooggle_btns()
  {
    //переключим все кнопки в нужное состояние показать/скрыть
    let btns=[btn_right,btn_left]
    btns.forEach((el)=>{if (isHide(el)) el.style.display = "none"
                        else el.style.display = ""
                      })
  }

  function onclick(i)
  {
    window.var+=i
    if (window.var==slides.length) window.var = 0
    if (window.var<0) window.var = slides.length-1
     
    tooggle_btns()
    slider.style.transform="translateX(-"+get_offset(window.var)+"px)";
  }

  if (btn_right)
    btn_right.addEventListener("click",() => onclick(1))

  if (btn_left)
    btn_left.addEventListener("click",() => onclick(-1))

    tooggle_btns()
}
