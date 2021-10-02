$(document).ready(function() {
    console.log('fhdsbf');
    $.ajax({
        url:"assets/data/products.json",
        method:"GET",
        dataType:"json",
        success:function(data){
            prikaziProizvode(data);
        },
        error:function(err){
            console.error(err);
        }
    });
    
    function prikaziProizvode(data){
        var out = "";
        data.forEach( el=> {
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
                        
                        out += `<small class="ocena">
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
    
        document.getElementById("proizvodi").innerHTML = out;
        Korpa();
       
    }

    document.getElementById("pretraga").addEventListener("keyup", Pronadji);

    function Pronadji(){
        $.ajax({
            url:"assets/data/products.json",
            method:"GET",
            dataType:"json",
            success:function(data){
                var unosKorisnika = document.getElementById("pretraga").value;
                var sortirani = data.filter(function(el){
                    if(el.proizvodjac.toLowerCase().indexOf(unosKorisnika.toLowerCase())!==-1)
                        return el;
                    if(el.model.toLowerCase().indexOf(unosKorisnika.toLowerCase())!==-1)
                        return el;
                });
                prikaziProizvode(sortirani);
            },
            error:function(err){
                console.error(err);
            }
        });
    }
    

    document.getElementById("Cena").addEventListener("change",Sortiraj);

    function Sortiraj() {
        var lista = document.getElementById("Cena");
        var vrednost = lista.options[lista.selectedIndex].value;
        console.log(vrednost);
        $.ajax({
            url: "assets/data/products.json",
            method:"GET",
            dataType:"json",
            success:function(data){
                if(vrednost==0){
                    prikaziProizvode(data);
                };

                if (vrednost ==1){
                data.sort(function(el1, el2){
                    if(parseInt(el1.cena) < parseInt(el2.cena))
                        return -1;
                    if(parseInt(el1.cena) > parseInt(el2.cena))
                        return 1;
                    if(parseInt(el1.cena) == parseInt(el2.cena))
                        return 0;
                });
                prikaziProizvode(data);
                }
                if (vrednost ==4){

                    data.sort(function(el1, el2){
                        if(el1.proizvodjac > el2.proizvodjac)
                            return -1;
                        if(el1.proizvodjac < el2.proizvodjac) 
                            return 1;
                        if(el1.proizvodjac == el2.proizvodjac) 
                            return 0;
                    });

                prikaziProizvode(data);
                }
                if(vrednost==2){
                    data.sort(function(el1, el2){
                        if(parseInt(el1.cena) > parseInt(el2.cena))
                            return -1;
                        if(parseInt(el1.cena) < parseInt(el2.cena))
                            return 1;
                        if(parseInt(el1.cena) == parseInt(el2.cena))
                            return 0;
                    });
                    prikaziProizvode(data);
                }
                if(vrednost==3){
                    data.sort(function(el1, el2){
                        if(el1.proizvodjac < el2.proizvodjac)
                            return -1;
                        if(el1.proizvodjac > el2.proizvodjac) 
                            return 1;
                        if(el1.proizvodjac == el2.proizvodjac) 
                            return 0;
                    });

                prikaziProizvode(data);
                }
            },
            error:function(err){
                console.error(err);
            }
        });
    }


    $.ajax({
        url:"assets/data/categories.json",
        method:"GET",
        dataType:"json",
        success:function(data){
            ispisiListu(data);
        },
        error:function(err){
            console.error(err);
        }
    });

    function ispisiListu(data){
        var ispis = "<option value='0'>Izaberite...</option>";
        data.forEach(el => {
            ispis +=`
                <option value=${el.id}>${el.nazivKat}</option>
            `;
        });

        document.getElementById("Tip").innerHTML = ispis;
        SortProizvodjac();
    }

function SortProizvodjac(){;

document.getElementById("Tip").addEventListener("change",SortirajPoProizvodjacu);

function SortirajPoProizvodjacu(){
    var lista = document.getElementById("Tip");
    var vrednost = lista.options[lista.selectedIndex].value;

    $.ajax({
        url: "assets/data/products.json",
        method:"GET",
        dataType:"json",
        success:function(data){
            if(vrednost==0){
                prikaziProizvode(data);
            }else{
            var sortirani = data.filter(function(el){
                if(el.idKat == vrednost)
                   return el;
            });
        }
         prikaziProizvode(sortirani);
        },
        error:function(err){
            console.error(err);
        }
    });


}
}

function Korpa(){
    $(".Dodaj").click(DodajUKorpu);
}

function proizvodiUKorpi(){
    return JSON.parse(localStorage.getItem("proizvodi"));
}

function DodajUKorpu(){
    let id = $(this).data("id");
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
