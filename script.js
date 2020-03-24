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



/**
 * ---------------------
 * TO DO
 * ---------------------
 * 
 * Afficher les coups critiques
 * Afficher les attaques dans la div fighters
 * Ralentir l'affichage des logs
 * Styliser le texte des logs
 * Bouton reset
 * Dans les logs, afficher l'attaquant à gauche et le défenseur à droite
 * Factoriser le code, prévoir l'ajout de nouveaux personnages
 * Choix du personnage
 * Ajout de personnages
 * Système d'attaque / défense
 * Tour par tour
 */



//////////////////
// OBJETS
//////////////////


var ken = {
    name: "Ken",
    hp: 100,
    atk: function(){
        isFacing = "sakura";
        // Ken attaque
        var dmgClassName = "dmg";
        atkResult = atk(1,20);
        img.src = 'img/ken_profile.png';
        if(atkResult === 20){
            logs.innerHTML +=  '<img src="'+img.src+'" />' + " <strong>"+this.name+"</strong> attaque <strong>Sakura</strong> et inflige " + "<span class="+dmgClassName+">"+atkResult+"</span>" + " dégats" + " - COUP CRITIQUE" + "<br>";
        }else{
            logs.innerHTML +=  '<img src="'+img.src+'" />' + " <strong>"+this.name+"</strong> attaque <strong>Sakura</strong> et inflige " + "<span class="+dmgClassName+">"+atkResult+"</span>" + " dégats <br>";
        }

        sakura.hp = sakura.hp - atkResult;
        logs.innerHTML +=  "Sakura a " + sakura.hp + " HP <br><br>"
    },

    victory: function(){
        img.src = 'img/ken_victory.gif';
        victoryImg();
        fighters.innerHTML += "<h1>"+this.name+ "WIN</h1>"
        logs.innerHTML +=  "<br><br>-------------------------<br><br>"
        logs.innerHTML +=  isFacing + " est morte."
        logs.innerHTML +=  "<br><br>-------------------------<br><br>"
    }
}

var sakura = {
    name: "Sakura",
    hp : 100,
    atk : function(){
        isFacing = "ken";
        // Sakura attaque
        var dmgClassName = "dmg";
        atkResult = atk(1,20);
        img.src = 'img/sakura_profile.png';
        if (atkResult === 20){
            logs.innerHTML +=  '<img src="'+img.src+'" />' + " <strong>"+this.name+"</strong> attaque <strong>"+isFacing+"</strong> et inflige " + "<span class="+dmgClassName+">"+atkResult+"</span>" + " dégats" + " - COUP CRITIQUE" + "<br>";
        }else{
            logs.innerHTML +=  '<img src="'+img.src+'" />' + " <strong>"+this.name+"</strong> attaque <strong>"+isFacing+"</strong> et inflige " + "<span class="+dmgClassName+">"+atkResult+"</span>" + " dégats <br>";
        }
        ken.hp = ken.hp - atkResult;
        logs.innerHTML +=  "Ken a " + ken.hp + " HP <br><br>"
    },

    victory: function(){
        img.src = 'img/sakura_victory.gif';
        victoryImg();
        fighters.innerHTML += "<h1>"+this.name+" WIN</h1>"
        logs.innerHTML +=  "<br><br>-------------------------<br><br>"
        logs.innerHTML +=  isFacing + " est mort."
        logs.innerHTML +=  "<br><br>-------------------------<br><br>"
    }
}


//////////////////
// VARIABLES 
//////////////////

var btn = document.getElementsByClassName('button')[0];
var logs = document.getElementsByClassName('logs')[0];
var fighters = document.getElementsByClassName('fighters')[0];
var img = new Image();



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

// Affiche l'image de victoire
function victoryImg () {
    fighters.innerHTML = '<img src="'+img.src+'" />'; 
    fighters.style = "flex-direction:column-reverse;"; 
  };


// Lance le combat au clic du bouton
function combat(){

    // Reset du combat au clic du bouton
    ken.hp = 100;
    sakura.hp = 100;
    var atkResult;
    logs.innerHTML =  "";


    var initCombat = pileFace(0,1); // Pile ou face pour savoir qui commence
    
    
    if(initCombat === 0){ // Ken Commence
        logs.innerHTML +=  "<br>-------------------------<br><br>"
        logs.innerHTML +=  "Pile ! Ken commence."
        logs.innerHTML +=  "<br><br>-------------------------<br><br>"


        var refreshIntervalId = setInterval(log, 2000);;

        function log(){
            if (ken.hp > 0){
                ken.atk();
            }
            if (sakura.hp > 0){
                sakura.atk();
            }

            if(ken.hp <= 0){
                sakura.victory();
                clearInterval(refreshIntervalId);
            }

            if(sakura.hp <= 0){
                ken.victory();
                clearInterval(refreshIntervalId);
            }
        }
    }
    else{ // Sakura commence
        isFacing = "ken";
        logs.innerHTML +=  "<br>-------------------------<br><br>"
        logs.innerHTML +=  "Face ! Sakura commence."
        logs.innerHTML +=  "<br><br>-------------------------<br><br>"


        var refreshIntervalId = setInterval(log, 2000);;

        function log(){
            if (sakura.hp > 0){
                sakura.atk();
            }
            if (ken.hp > 0){
                ken.atk();
            }

            if(sakura.hp <= 0){
                ken.victory();
                clearInterval(refreshIntervalId);
            }
    
            if(ken.hp <= 0){
                sakura.victory();
                clearInterval(refreshIntervalId);
            }
        }
    }
}


//////////////////
// LISTENERS
//////////////////

btn.addEventListener("click", combat);



