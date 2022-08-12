
// Selectores de los atributos del personaje
let lifePj = document.querySelector(".lifePj");
let damagePj = document.querySelector(".damagePj");
let armorPj = document.querySelector(".armorPj");
let armorPenetrationPj = document.querySelector(".armorPenetrationPj");

let s = document.querySelector(".s");
let d = document.querySelector(".d");
let a = document.querySelector(".a");
let p = document.querySelector(".p");
let xp = document.querySelector(".pN");




// Selectores de los atributos del enemigo
let atributosDelEnemigo = document.querySelector(".atributosEnemigos");

let lifeEn = document.querySelector(".lifeEn");
let damageEn = document.querySelector(".damageEn");
let armorEn = document.querySelector(".armorEn");
let armorPenetrationEn = document.querySelector(".armorPenetrationEn");


// Eventos del personaje
lifePj.addEventListener("click", saberTuSalud);
damagePj.addEventListener("click", saberTuDamage);
armorPj.addEventListener("click", saberTuArmor);
armorPenetrationPj.addEventListener("click", saberTuPenetracion);
atributosDelEnemigo.addEventListener("click", saberAtributosDelEnemigo);

// Estadisticas en variables
let tuLife = undefined;
let tuDamage = undefined;
let tuArmor = undefined;
let tuPenetration = undefined;

// Funciones para aber las estadisticas del Pj 
function saberTuSalud(){
    tuLife = prompt("Cual es tu salud?"); 
    s.innerHTML = tuLife; 
    console.log(tuLife)

    if (tuLife == NaN || tuLife == undefined || tuLife == false) {
        saberTuSalud();
    }
}

function saberTuDamage(){
    tuDamage = prompt("Cual es tu daño?");
    d.innerHTML = tuDamage;

    if (tuLife == NaN || tuLife == undefined || tuLife == false) {
        saberTuDamage();
    }
}

function saberTuArmor(){
    tuArmor = prompt("Cual es tu armadura?");
    a.innerHTML = tuArmor;

    if (tuLife == NaN || tuLife == undefined || tuLife == false) {
        saberTuArmor();
    }
}

function saberTuPenetracion(){
    tuPenetration = prompt("Cual es tu penetraciñón de armadura?");
    p.innerHTML = tuPenetration;

    if (tuLife == NaN || tuLife == undefined || tuLife == false) {
        saberTuPenetracion();
    }
}




// Estadisticas del enemigo en variables
let EnemigoLife = undefined;
let EnemigoDamage = undefined;
let EnemigoArmor = undefined;
let EnemigoPenetration = undefined;

// Eventos para saber las estadisticas del enemigo
function saberAtributosDelEnemigo(){
    
    EnemigoLife = prompt("Cual es la salud del enemigo");
    EnemigoDamage = prompt("Cual es el daño del enemigo");
    EnemigoArmor = prompt("Cual es la armadura del enemigo");
    EnemigoPenetration = prompt("Cual es la penetración de armadura del enemigo");


    if(EnemigoArmor == NaN || EnemigoArmor == false || EnemigoArmor == undefined){
        EnemigoArmor = 0;
    }

    if (EnemigoPenetration == NaN ||EnemigoPenetration == null || EnemigoPenetration == undefined) {
        EnemigoPenetration = 0;
    }


    lifeEn.innerHTML = EnemigoLife;
    damageEn.innerHTML = EnemigoDamage;
    armorEn.innerHTML = EnemigoArmor;
    armorPenetrationEn.innerHTML = EnemigoPenetration;
}


let textoDeFinal = document.querySelector(".p_peleaFinalizada"); // Texto de conclucion de batalla

// Funcion de la PELEA
let pelear = document.querySelector(".pelear");
pelear.addEventListener("click", pelearF);

let experienciaGanada = 0;
let puedeMorir = true; // Una key para que no haya un bucle infinito si el enemigo tiene mas armadura que tu daño

function pelearF(){

    puedeMorir = true; // Se reinicia en cada combate

    parseInt(tuLife, tuArmor, tuDamage, tuPenetration, EnemigoLife, EnemigoArmor, EnemigoDamage, EnemigoPenetration);
    
    let armorPj2 = tuArmor;

    EnemigoArmor = EnemigoArmor - tuPenetration; // nº -
    armorPj2 = armorPj2 - EnemigoPenetration;

    if (EnemigoArmor < 0){
        EnemigoArmor = 0;
    }
    if (armorPj2 < 0){
        armorPj2 = 0;
    }
    

    let damagePj2 = tuDamage;
    
    EnemigoDamage = EnemigoDamage - armorPj2; // nº -
    damagePj2 = damagePj2 - EnemigoArmor;


    if (EnemigoDamage < 0){
        EnemigoDamage = 0;
    }

    if (damagePj2 < 0){
        damagePj = 0;
    }

    if(EnemigoArmor >= damagePj2){ // Uso de la Key
        puedeMorir = false;
    }


    let numeroRandom = Math.trunc(Math.random()*50); // Eventos randoms despues de las peleas (LO ideal seria hacer un array con diferentes eventos randoms y que se active un for que lo recorra, que el numero de recorrido sea tambien random, y que solo por salirte un 1 pòr ejemplo, eso hacer que se ejecute el otro numero random y que eso haga que se busque el evento en el array)
   
    if (numeroRandom == 0){
        textoDeFinal.innerHTML = "Aprendiste una mejor forma de luchar, aumenta tu fuerza en 1 punto!";
        document.querySelector(".iconoRandom").src= `./icons/daño.png`;

    } else if(numeroRandom == 1){
        textoDeFinal.innerHTML = "Parece que te has doblado el tobillo en el combate, en tu proximo turno si no toca el numero 1 en el dado perderas el turno"
        document.querySelector(".iconoRandom").src= `./icons/esguince.png`;

    } else if (numeroRandom == 2){
        textoDeFinal.innerHTML = "Estas sangrando! Tu vida maxima decrementa en 5 puntos"
        document.querySelector(".iconoRandom").src= `./icons/sangrado.png`;
    }
    else{
        textoDeFinal.innerHTML = "";
        document.querySelector(".iconoRandom").src= "./icons/vacio.png";
    }




    if(puedeMorir == true){ // Key

        while(EnemigoLife > 0){ // Bucle hata la muerte del enemigo
        
            tuLife = tuLife - EnemigoDamage;
            EnemigoLife = EnemigoLife - damagePj2;
        
            s.innerHTML = tuLife;
            lifeEn.innerHTML = EnemigoLife;
        
           
        
        if (EnemigoLife <= 0){ // Ganar experiencia
        
            experienciaGanada = experienciaGanada + 1; 
            xp.innerHTML = experienciaGanada;
    
            if (experienciaGanada >= 5){
                textoDeFinal.innerHTML = "Has conseguido el nivel 5 y con el un aumento de 2 puntos en tu penetracion de armadura! Aumentalos manualmente.";
                document.querySelector(".iconoRandom").src= "./icons/xp.png";
            }
         }
            
        }    

        }else {
            textoDeFinal.innerHTML = "Este enemigo no puede ser vencido por ti, no logras dañarlo ni un punto porque su armadura es mas que tu daño y tu penetracion juntos";
        }

    }
    

length
   




