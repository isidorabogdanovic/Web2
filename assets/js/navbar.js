function toggleNav(){
    var e=document.querySelector("#navbar"),t=document.querySelector("#omot");
            "0px"==e.style.left?(e.style.left="-300px",t.style.padding="0px"):
                (e.style.left="0px",t.style.paddingLeft="300px")
}