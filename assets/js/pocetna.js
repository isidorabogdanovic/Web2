$(document).ready(function() {
    $.ajax({
        url:"assets/data/products.json",
        method:"GET",
        dataType:"json",
        success:function(data){
            ispisiNajpopularnijeProizvode(data);
            ispisiZaBudzet(data);
        },
        error:function(err){
            console.error(err);
        }
    });

    function ispisiNajpopularnijeProizvode(data){

        var sortirano = data.sort(function(el1, el2){
            if(parseInt(el1.ocena) > parseInt(el2.ocena))
                return -1;
            if(parseInt(el1.ocena) < parseInt(el2.ocena))
                return 1;
            if(parseInt(el1.ocena) == parseInt(el2.ocena))
                return 0;
        });

        

        var najpopularnijiProizvodi = sortirano.slice(0, 4); 
        var out = "";

        najpopularnijiProizvodi.forEach( el=> {
            out+=`
                <div class="karta">
                    <input type="hidden" class="hidden-input" value=${el.id}/>
                    <div class="karta-image">
                        <img src="${el.slika.src}" alt=${el.slika.alt}/>
                    </div>
                    <div class="karta-text">
                        <h4 class="karta-title">${el.proizvodjac} ${el.model}</h4>
                        <small>
                            <span>Tip:</span> ${el.tip}
                        </small>
                        <small>
                            <span>Proizvođač:</span> ${el.proizvodjac}
                        </small>
                        <small>
                            <span>Model:</span> ${el.model}
                        </small>
                            `; 

                             if(el.ekran.dijagonala!=false) out+=`<small><span> Dijagonala:${el.ekran.dijagonala}"</span></small>`

                             if(el.ekran.rezolucija!=false) out+=`<small><span>Rezolucija:${el.ekran.rezolucija}</span></small>`
                            
                             if(el.RAMmemorija!=false) out+=`<small><span>RAM memorija:${el.RAMmemorija}GB</span></small>`
                            
                             if(el.procesor!=false) out+=`<small><span>Procesor:${el.procesor}</span></small>`
                            
                             if(el.grafika!=false) out+=`<small><span>Grafika:${el.grafika}</span></small>`
                        
                        out +=`<small class="ocena">
                        <span>Ocena:</span>
                        <span> ${el.ocena} <span></span> </span>
                    </small>
                    <input type="button" class="Dodaj" id="btnDodaj" data-id="${el.id}" value="Dodaj u korpu"/>
                    <p class="cena">
                        <span>${el.cena}din</span> 
                    </p>
                    </div>
                </div>
            `;
        });
    
        document.getElementById("najpopularnijiPro").innerHTML = out;

       
    }


    function ispisiZaBudzet(data){
        var sortirano = data.sort(function(el1, el2){
            if(parseInt(el1.cena) < parseInt(el2.cena))
                return -1;
            if(parseInt(el1.cena) > parseInt(el2.cena))
                return 1;
            if(parseInt(el1.cena) == parseInt(el2.cena))
                return 0;
        });

        

        var najpopularnijiProizvodi = sortirano.slice(0, 4);
        var out = "";

        najpopularnijiProizvodi.forEach( el=> {
            out+=`
                <div class="karta">
                    <input type="hidden" class="hidden-input" value=${el.id}/>
                    <div class="karta-image">
                        <img src="${el.slika.src}" alt=${el.slika.alt}/>
                    </div>
                    <div class="karta-text">
                        <h4 class="karta-title">${el.proizvodjac} ${el.model}</h4>
                        <small>
                            <span>Tip:</span> ${el.tip}
                        </small>
                        <small>
                            <span>Proizvođač:</span> ${el.proizvodjac}
                        </small>
                        <small>
                            <span>Model:</span> ${el.model}
                        </small>
                            `; 

                             if(el.ekran.dijagonala!=false) out+=`<small><span> Dijagonala:${el.ekran.dijagonala}"</span></small>`

                             if(el.ekran.rezolucija!=false) out+=`<small><span>Rezolucija:${el.ekran.rezolucija}</span></small>`
                            
                             if(el.RAMmemorija!=false) out+=`<small><span>RAM memorija:${el.RAMmemorija}GB</span></small>`
                            
                             if(el.procesor!=false) out+=`<small><span>Procesor:${el.procesor}</span></small>`
                            
                             if(el.grafika!=false) out+=`<small><span>Grafika:${el.grafika}</span></small>`
                        
                        out +=`<small class="ocena">
                        <span>Ocena:</span>
                        <span> ${el.ocena} <span></span> </span>
                    </small>
                    <input type="button" class="Dodaj" id="btnDodaj" data-id="${el.id}" value="Dodaj u korpu"/>
                    <p class="cena">
                        <span>${el.cena}din</span> 
                    </p>
                    </div>
                </div>
            `;
        });
    
        document.getElementById("budzetPro").innerHTML = out;
        Korpa();

    }

    function Korpa(){
        $(".Dodaj").click(DodajUKorpu);
    }
    
    function proizvodiUKorpi(){
        return JSON.parse(localStorage.getItem("proizvodi"));
    }
    
    function DodajUKorpu(){
        let id = $(this).data("id");
        console.log(id);
        var proizvodi = proizvodiUKorpi();
    
        if(proizvodi){
            if(ProizvodJeVecUKorpi())
            azurirajKolicinu();
            else{
                DodajULocalStorage();
            }
        }
        else{
            dodajPrviProizvodULocalStorage();
        }
        $("#prozor").fadeIn();
        $("#prozor").delay(250).fadeOut();
        
    
    
    function azurirajKolicinu(){
        let proizvodi = proizvodiUKorpi();
        for(let i in proizvodi){
            if(proizvodi[i].id==id){
                proizvodi[i].quantity++;
                break;
            }
            
        }
        localStorage.setItem("proizvodi",JSON.stringify(proizvodi))
    }
    
    function ProizvodJeVecUKorpi(){
        return proizvodi.filter(p => p.id == id).length;
    }
    
    function DodajULocalStorage(){
        let proizvodi = proizvodiUKorpi();
    
        proizvodi.push({
            id : id,
            quantity :  1
        });
        localStorage.setItem("proizvodi", JSON.stringify(proizvodi));
    }
    
    function dodajPrviProizvodULocalStorage(){
        let proizvodi = [];
        proizvodi[0] = {
            id : id,
            quantity : 1
        }
        localStorage.setItem("proizvodi",JSON.stringify(proizvodi));
    }
    }
    
    function IsprazniKorpu(){
        localStorage.removeItem("proizvodi");
    }
    

});