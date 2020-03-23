/** 
 * Exercice : jeu de combat
 * 
 * Créer deux objets qui représentent un combattant
 * 
 * Un combattant possède 100 HP
 * Il peut attaquer l'autre combattant
 * Si le combattant est mort il ne peut plus rien faire
 * Le combattant perd des HP quand il est attaqué
 * 
 * Le jeu démarre automatiquement, les combatttants s'attaquent à tour de rôle tant qu'ils sont vivants.
 * Le jeu s'arrête quand un combattant est mort
 * 
 * PISTES D'AMELIORATION 
 * - Ajouter de l'aléatoire
 * - Système de coup critique
 * - Ajout système de défense / atk
 */


// OBJETS

var ken = {
    name: "Ken",
    hp: 100,
}

var sakura = {
    name: "Sakura",
    hp : 100
}



// VARIABLES 

var btn = document.getElementsByClassName('button')[0];
var logs = document.getElementsByClassName('logs')[0];
var fighters = document.getElementsByClassName('fighters')[0];

//
var img = new Image();
 
function victoryImg () {
  fighters.innerHTML = '<img src="'+img.src+'" />'; 
  fighters.style = "flex-direction:column-reverse;"; 
};
 






// FONTIONS

function pileFace(min, max)
{
 return Math.floor(Math.random() * (max - min + 1)) + min;
}

function atk(min, max)
{
 return Math.floor(Math.random() * (max - min + 1)) + min;
}


function atkKen(){
    // Ken attaque
    atkResult = atk(1,20);
    img.src = 'img/ken_profile.png';
    logs.innerHTML +=  '<img src="'+img.src+'" />' + " Ken attaque Sakura et inflige " + atkResult + " dégats <br>";
    sakura.hp = sakura.hp - atkResult;
    logs.innerHTML +=  "Sakura a " + sakura.hp + " HP <br><br>"
}

function atkSakura(){
    // Sakura attaque
    atkResult = atk(1,20);
    img.src = 'img/sakura_profile.png';
    logs.innerHTML +=  '<img src="'+img.src+'" />' + " Sakura attaque Ken et inflige " + atkResult + " dégats <br>";
    ken.hp = ken.hp - atkResult;
    logs.innerHTML +=  "Ken a " + ken.hp + " HP <br><br>"
}



function combat(){
    ken.hp = 100;
    sakura.hp = 100;
    var atkResult;
    logs.innerHTML =  "";
    logs.innerHTML +=  "<br>-------------------------<br><br>"

    var initCombat = pileFace(0,1);
    
    
    if(initCombat === 0){ // Ken Commence
        logs.innerHTML +=  "Pile ! Ken commence."
        logs.innerHTML +=  "<br><br>-------------------------<br><br>"

        while(ken.hp > 0 || sakura.hp > 0){

            if(ken.hp <= 0){
                img.src = 'img/sakura_victory.gif';
                victoryImg();
                fighters.innerHTML += "<h1>Sakura WIN</h1>"
                logs.innerHTML +=  "<br><br>-------------------------<br><br>"
                logs.innerHTML +=  "Ken est mort."
                logs.innerHTML +=  "<br><br>-------------------------<br><br>"
                break;
            }else{
                atkKen();
            }
    
            if(sakura.hp <= 0){
                img.src = 'img/ken_victory.gif';
                victoryImg();
                fighters.innerHTML += "<h1>Ken WIN</h1>"
                logs.innerHTML +=  "<br><br>-------------------------<br><br>"
                logs.innerHTML +=  "Sakura est morte."
                logs.innerHTML +=  "<br><br>-------------------------<br><br>"
                break;
            }else{
                atkSakura();
            }
        }

        
    }else{
        logs.innerHTML +=  "Face ! Sakura commence."
        logs.innerHTML +=  "<br><br>-------------------------<br><br>"

        while(ken.hp > 0 || sakura.hp > 0){
    
            if(sakura.hp <= 0){
                img.src = 'img/ken_victory.gif';
                victoryImg();
                fighters.innerHTML += "<h1>Ken WIN</h1>"
                logs.innerHTML +=  "<br><br>-------------------------<br><br>"
                logs.innerHTML +=  "Sakura est morte."
                logs.innerHTML +=  "<br><br>-------------------------<br><br>"
                break;
            }else{
                atkSakura();
            }

            if(ken.hp <= 0){
                img.src = 'img/sakura_victory.gif';
                victoryImg();
                fighters.innerHTML += "<h1>Sakura WIN</h1>"
                logs.innerHTML +=  "<br><br>-------------------------<br><br>"
                logs.innerHTML +=  "Ken est mort."
                logs.innerHTML +=  "<br><br>-------------------------<br><br>"
                break;
            }else{
                atkKen();
            }
        }
    }

    
}

btn.addEventListener("click", combat);



