var carouseleImg=document.querySelectorAll(".header-content");
carouseleImg.forEach(function(){
    function e(){
        n.style.left=-r*t+"px"
    }
var t=0,n=document.querySelector(".inner-header"),
    r=document.querySelectorAll(".carousele-img")[0].getBoundingClientRect().width,
    c=document.querySelector(".arrow-left"),
    o=document.querySelector(".arrow-right");
    c.addEventListener("click",function(){
        t<=0?t=carouseleImg.length-1:t--,e()
    }),
    o.addEventListener("click",function(){
        t==carouseleImg.length-1?t=0:t++,e()
    }),
    setInterval(function(){
        t==carouseleImg.length-1?t=0:t++,e()
    },1e4)
});