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
 */



/**
 * ---------------------
 * TO DO
 * ---------------------
 * 
 * Afficher les attaques dans la div fighters
 * Bouton reset
 * Dans les logs, afficher l'attaquant à gauche et le défenseur à droite
 * Choix du personnage
 * Système d'attaque / défense
 * Tour par tour
 * scroll automatique
 * Animations de combat durant le combat
 */



//////////////////
// OBJETS
//////////////////



function playerFactory(name, profileImg, victoryImg, atkImg) {
    return {
        name: name,

        hp: 100,

        profileImg: profileImg, // l'image du combattant

        victoryImg: victoryImg,

        atkImg: atkImg,

        attack(target) {// Le personnage attaque
            if(this.hp > 0){
                atkResult = atk(1,20); // Puissance d'attaque
                target.hp -= atkResult; // Enleve la puissance atk aux hp adverse
                if(atkResult === 20){ // Affichage des logs & coups critiques
                logs.innerHTML +=  '<img src="'+profileImg+'" />' + " <strong>"+this.name+"</strong> attaque <strong>"+target.name+"</strong> et inflige " + "<span class="+dmgClassName+">"+atkResult+"</span>" + " dégats" + " - COUP CRITIQUE" + "<br>";
                }else{
                logs.innerHTML +=  '<img src="'+ profileImg+'" />' + " <strong>"+this.name+"</strong> attaque <strong>"+target.name+"</strong> et inflige " + "<span class="+dmgClassName+">"+atkResult+"</span>" + " dégats <br>";
                }
                logs.innerHTML +=  target.name + " a " + target.hp + " HP <br><br>"
            }else{
                
            }
            
        },

        victory(target){
            // Affiche l'image de victoire
            fighters.innerHTML = '<img src="'+victoryImg+'" />'; 
            fighters.style = "flex-direction:column-reverse;"; 
            classHpBarKo.innerHTML = this.name+ " WIN"
            logs.innerHTML +=  "<br><br>-------------------------<br><br>"
            logs.innerHTML +=  target.name + " est K.O."
            logs.innerHTML +=  "<br><br>-------------------------<br><br>"
        }
    };
}


var ken = playerFactory("Ken", "img/ken_profile.png", "img/ken_victory.gif", "img/ken_atk.gif");
var sakura = playerFactory("Sakura", "img/sakura_profile.png", "img/sakura_victory.gif", "img/sakura_atk.gif");
var akuma = playerFactory("Akuma", "img/akuma_profile.png", "img/akuma_victory.gif");





//////////////////
// VARIABLES 
//////////////////

var btn = document.getElementsByClassName('button')[0];
var btnContainer = document.getElementsByClassName('button-container')[0];
var logs = document.getElementsByClassName('logs')[0];
var fighters = document.getElementsByClassName('fighters')[0];
var classFighter1 = document.getElementsByClassName('fighter1')[0];
var classFighter2 = document.getElementsByClassName('fighter2')[0];
var classHpBarKo = document.getElementsByClassName('hp-bar-ko')[0];
var img = new Image();
var dmgClassName = "dmg";



//////////////////
// FONCTIONS
//////////////////


// Détermine qui commence en premier
function pileFace(min, max)
{
 return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Détermine la puissance d'attaque
function atk(min, max)
{
 return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Bar HP LEFT
function hpBarProgressLeft() {
    var elem = document.getElementsByClassName("hp-bar-left-progress")[0];
    elem.style.width = fighter1.hp +'%';

    if(fighter1.hp <= 0){
        elem.style.width = '0%';
    }
}

// Bar HP RIGHT
function hpBarProgressRight() {
    var elem = document.getElementsByClassName("hp-bar-right-progress")[0];
    elem.style.width = fighter2.hp +'%';

    if(fighter2.hp <= 0){
        elem.style.width = '0%';
    }
}

function combat(){


    // Désactivation du bouton de combat

    btnContainer.style = "display:none;"

    // Mettre une fonction pour déterminer quels persos sont sélectionnés

    fighter1 = ken;
    fighter2 = sakura;

    // Reset du combat au clic du bouton
    fighter1.hp = 100;
    fighter2.hp = 100;
    logs.innerHTML =  "";

    // Changement des images de combat
  /*   classFighter1.innerHTML = '<img src="'+fighter1.atkImg+'" />';
    classFighter2.innerHTML = '<img src="'+fighter2.atkImg+'" />'; */

    // Pile ou face pour savoir qui commence
    var initCombat = pileFace(0,1); 

    if(initCombat === 0){
        logs.innerHTML +=  "<br>-------------------------<br><br>"
        logs.innerHTML +=  "Pile ! "+ fighter1.name +" commence."
        logs.innerHTML +=  "<br><br>-------------------------<br><br>"
    }else{
        logs.innerHTML +=  "<br>-------------------------<br><br>"
        logs.innerHTML +=  "Face ! "+ fighter2.name +" commence."
        logs.innerHTML +=  "<br><br>-------------------------<br><br>"
    }

    var refreshIntervalId = setInterval(log, 1000);

    function log(){
        
        if (fighter1.hp > 0 && fighter2 && initCombat === 0){
            fighter1.attack(fighter2);
            hpBarProgressRight();
            fighter2.attack(fighter1);
            hpBarProgressLeft();
            if(fighter1.hp <= 0 && fighter2.hp > 0){
                fighter2.victory(fighter1);
                clearInterval(refreshIntervalId);
            }
    
            if(fighter2.hp <= 0 && fighter1.hp > 0){
                fighter1.victory(fighter2);
                clearInterval(refreshIntervalId);
            }
        }else{
            fighter2.attack(fighter1);
            hpBarProgressLeft();
            fighter1.attack(fighter2);
            hpBarProgressRight();
            if(fighter1.hp <= 0 && fighter2.hp > 0){
                fighter2.victory(fighter1);
                clearInterval(refreshIntervalId);
            }
            if(fighter2.hp <= 0 && fighter1.hp > 0){
                fighter1.victory(fighter2);
                clearInterval(refreshIntervalId);
            }
        }
    }
}



//////////////////
// LISTENERS
//////////////////

btn.addEventListener("click", combat);



