function changeColor(e,o,t){
    e.innerHTML=o,e.style.color=t
}

function reset(){
    changeColor(emailMessage,"","#333"),
    changeColor(textMessage,"","#333"),
    changeColor(naslovMessage,"","#333")
}

for(var inputs=document.querySelectorAll(".input-field"),i=0;i<inputs.length;i++)
    inputs[i].addEventListener("blur",function(){
        ""==this.value?this.style.boxShadow="0px 1px 12px 2px rgb(170, 51, 51)"
        :this.style.boxShadow=""}
    );
    var emailMessage=document.querySelector("#emailMessage"),
    naslov=document.querySelector("#naslov"),
    naslovMessage=document.querySelector("#naslovMessage"),
    text=document.querySelector("#opis"),
    textMessage=document.querySelector("#opisMessage"),
    loginButton=document.querySelector("#loginButton"),
    submit=document.querySelector("#SubmitMessage");
    loginButton.addEventListener("click",function(){
        var e=[];emailRegular.test(loginField.value)?changeColor(emailMessage,"","#333")
            :(e[0]="Email adresa koju ste uneli je neispravna.",
        changeColor(emailMessage,e[0],"rgb(170, 51, 51)")),
    naslovRegular.test(naslov.value)?changeColor(naslovMessage,"","#333")
            :(e[1]="Naslov sadrzi neke od nedozvoljenih karaktera",
        changeColor(naslovMessage,e[1],"rgb(170, 51, 51)")),
        textRegular.test(text.value)?changeColor(textMessage,"","#333")
            :(e[2]="Opis text sadrzi neke od nedozvoljenih karaktera.",
        changeColor(textMessage,e[2],"rgb(170, 51, 51)")),
        e.length>0?changeColor(submit,"Molimo Vas da ispravite podatke koje ste pogrešno uneli.",
            "rgb(170, 51, 51)"):(changeColor(submit,"Uspešno prosledjeno.","rgb(30, 151, 30)"),
    reset())
});