function changeColor(e,o,s){
    e.innerHTML=o,e.style.color=s
}
function reset(){
    changeColor(emailMessage,"","#333"),
    changeColor(passwordMessage,"","#333")
}

for(var inputs=document.querySelectorAll(".input-field"),i=0;i<inputs.length;i++)
inputs[i].addEventListener("blur",function(){
    ""==this.value?this.style.boxShadow="0px 1px 12px 2px rgb(170, 51, 51)":this.style.boxShadow=""});
    var loginField=document.querySelector("#loginField"),
        emailMessage=document.querySelector("#emailMessage"),
        password=document.querySelector("#passwordField"),
        passwordMessage=document.querySelector("#passwordMessage"),
        loginButton=document.querySelector("#loginButton"),
        submit=document.querySelector("#SubmitMessage");
        loginButton.addEventListener("click",function(){
            var e=[];emailRegular.test(loginField.value)?changeColor(emailMessage,"","#333")
                    :(e[0]="Email adresa koju ste uneli je neispravna.",
                changeColor(emailMessage,e[0],"rgb(170, 51, 51)")),
                passwordRegular.test(password.value)?changeColor(passwordMessage,"","#333")
                    :(e[1]="Lozinka mora da ima bar 1 veliko, 1 malo slovo, 1 broj i sve ukupno 8 karaktera",
                changeColor(passwordMessage,e[1],"rgb(170, 51, 51)")),
        e.length>0?changeColor(submit,"Molimo Vas da ispravite podatke koje ste pogrešno uneli.",
        "rgb(170, 51, 51)"):(changeColor(submit,"Vaši podaci su uspešno prosledjeni.","rgb(30, 151, 30)"),
        reset())
});