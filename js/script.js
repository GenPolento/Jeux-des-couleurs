
// Declare une function changement de couleur
function changeBgColor(){
    let colorDrawn = drawArrayElement(baseColors);
    
    while(colorDrawn === currentBgColor){
        colorDrawn = drawArrayElement(baseColors);
    }
    
    // retire la class css de la couleur courante
    document.body.classList.remove(currentBgColor);
    // ajoute la nouvelle couleur pigee
    document.body.classList.add(colorDrawn);
    
    // On garde en memoire la derniere couleur pigee
    currentBgColor = colorDrawn;
}
    
function changeBtnColor(){
    let colorDrawn = drawArrayElement(baseColors);
    
    while(colorDrawn === currentBtnColor){
        colorDrawn = drawArrayElement(baseColors);
    }
    
    btnPlay.classList.remove(currentBtnColor);
    btnPlay.classList.add(colorDrawn);
    
    currentBtnColor = colorDrawn;
}

// Fonction réutilisable qui reçoit un tableau en paramètre,
// calcule un index aléatoire selon la longueur du tableau
// et retourne l'élément sélectionné.
function drawArrayElement(arrayToDrawIn){
    // pige un nombre entre 0 et 0.99
    let randomNumber = Math.random();
    // On construit un index pour piger dans notre tableau de couleur
    let randomIndex = Math.floor(randomNumber * arrayToDrawIn.length);
     // Retourne l'élément du tableau correspondant à l'index pigé
    return arrayToDrawIn[randomIndex];
}

// Fonction pour afficher un seul personnage
function afficherPersonnage(personnageAafficher){
    personnageEndormi.style.display = 'none';
    personnageAction.style.display = 'none';
    personnageCelebre.style.display = 'none';
    personnageEtourdi.style.display = 'none';

    personnageAafficher.style.display = 'block';
}
    
// Déclare la fonction qui compare la couleur de l'arrière-plan avec celle du bouton
function compareColor(){
    
    if(currentBgColor === currentBtnColor){
        // incremente le score
        score++;
        // On met a jour le texte de l'element HTML qui contient le score
        scoreHtml.textContent = 'Score: ' + score;

        afficherPersonnage(personnageCelebre);

        if(score > topScore){
            topScore = score;
            topScoreHtml.textContent = 'Top score: ' + score;
        }
        
        // Arrête l'intervalle actuel avant d'en démarrer un nouveau
        clearInterval(intervalChangementDeCouleurID);
        // Redémarre l'intervalle avec une vitesse ajustée selon le score
        intervalChangementDeCouleurID = setInterval(changeBgColor, 1000 - (score * 100));
    }

    else{
        lifes--;
        lifesHtml.textContent = 'Lifes: ' + lifes;

        if(lifes === 1){
            lifesHtml.style.color = "red";
        }

        afficherPersonnage(personnageEtourdi);
    }

    // Si le joueur a encore des vies, on programme le retour en mode action
    if(lifes > 0){
        // Annule le délai précédent s'il est encore actif
        clearTimeout(personnageTimeoutID);

        // Fonction fléchée : permet de ne pas exécuter la fonction immédiatement.
        // Elle permet de lancer afficherPersonnage au bon moment,
        // c'est-à-dire après le délai de 1,5 seconde défini dans setTimeout.
        personnageTimeoutID = setTimeout(() => {
            afficherPersonnage(personnageAction);
        }, 1500);
    }
}

//Fonction appelée lorsqu'on clique sur le bouton Jouer
function btnPlayClickHandler(){
    // Vérifie si le jeu n'a pas encore commencé
    if(state === 'not_started'){
        // On annule tout ancien delai
        clearTimeout(personnageTimeoutID);

        intervalChangementDeCouleurID = setInterval(changeBgColor, 1000 - (score * 100));
        btnText.textContent = '';

        afficherPersonnage(personnageAction);

        // Change l'état du jeu pour indiquer qu'il est commencé
        state = 'started';
        return;
    }
    
    // Compare les couleurs et met à jour le score ou le nombre de vies
    compareColor();
     // Change la couleur du bouton après le clic
    changeBtnColor();
    
    if(lifes <= 0){
        // Arrête le changement automatique de couleur de l'arrière-plan
        clearInterval(intervalChangementDeCouleurID);

        // On annule le delai du personnage
        clearTimeout(personnageTimeoutID);

        btnText.textContent = 'Recommencer';
        
        // Réinitialise le score et le nombre de vies
        score = 0;
        lifes = 3;
        lifesHtml.style.color = "";

        
        scoreHtml.textContent = 'Score: ' + score;
        lifesHtml.textContent = 'Lifes: ' + lifes;

        afficherPersonnage(personnageEndormi);
        
        state = 'not_started';
    }
}
    
// On declare le tableau qui contient toutes les couleurs du jeu
const baseColors = ['color-1', 'color-2', 'color-3', 'color-4', 'color-5'];

// On declare l'interval qui permet le changement de couleur
let intervalChangementDeCouleurID;

// Bloc des selections des elements HTML
const body = document.body;
const btnPlay = document.querySelector('.btn-play');
const scoreHtml = document.querySelector('.score-display');
const lifesHtml = document.querySelector('.lifes-display');
const topScoreHtml = document.querySelector('.top-score-display');

const btnText = document.querySelector('.btn-text');

// Selection des personnages
const personnageEndormi = document.querySelector('#endormi');
const personnageAction = document.querySelector('#action');
const personnageCelebre = document.querySelector('#celebre');
const personnageEtourdi = document.querySelector('#etourdi');

// Declaration des valeurs de base du programme
let currentBgColor = 'color-1';
let currentBtnColor = 'color-2';
let score = 0;
let lifes = 3;
let topScore = 0;
let state = 'not_started';
let personnageTimeoutID;


// Ecoute de l'evenement click sur le bouton play
btnPlay.addEventListener('click', btnPlayClickHandler);
