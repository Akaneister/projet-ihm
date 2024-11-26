// Initialisation des variables à leurs états de sauvegarde ou à leurs état basique de départ.
let robots = parseInt(localStorage.getItem('robots')) || 0;

let bonusRobotArmCost = parseInt(localStorage.getItem('bonusRobotArmCost')) || 100;
let QBonusRobotArm = parseInt(localStorage.getItem('QBonusRobotArm')) || 0;

let clickIncreaseCost = parseInt(localStorage.getItem('clickIncreaseCost')) || 5000;
let clickIncrease = parseInt(localStorage.getItem('clickIncrease')) || 1;

let energieActuel = parseInt(localStorage.getItem('energieActuel')) || 100;
let QBonusEnergie = parseInt(localStorage.getItem('QBonusEnergie')) || 0;
let bonusEnergieCost = parseInt(localStorage.getItem('bonusEnergieCost')) || 5000;
let consommationEnergieActuel = parseInt(localStorage.getItem('consommationEnergieActuel')) || 10;

let QBonusUsine = parseInt(localStorage.getItem('QBonusUsine')) || 0;
let bonusUsineCost = parseInt(localStorage.getItem('bonusUsineCost')) || 25000;

let compteurGeneral = parseInt(localStorage.getItem('compteurGeneral')) || 0;

let MaxBonusRobotArm = 40 + (40 * QBonusUsine);

let canCreateCube = true;

// --------------------------- Affichage des valeurs au chargement de la page -------------------------------------
document.getElementById('robots').innerHTML = robots;
document.getElementById('QBonusRobotArm').innerHTML = QBonusRobotArm;
document.getElementById('bonusRobotArmCost').innerHTML = bonusRobotArmCost;
document.getElementById('clickIncreaseCost').innerHTML = clickIncreaseCost;
document.getElementById('clickIncrease').innerHTML = clickIncrease;
document.getElementById('energieActuel').innerHTML = energieActuel;
document.getElementById('bonusEnergieCost').innerHTML = bonusEnergieCost;
document.getElementById('consommationEnergieActuel').innerHTML = consommationEnergieActuel;
document.getElementById('QBonusEnergie').innerHTML = QBonusEnergie;
document.getElementById('QBonusUsine').innerHTML = QBonusUsine;
document.getElementById('bonusUsineCost').innerHTML = bonusUsineCost;
//document.getElementById('MaxBonusRobotArm').innerHTML = MaxBonusRobotArm;


// --------------------------- Affichage des valeurs au chargement de la page END ---------------------------------









//--------------------------- Effet visuel -------------------------------------
function IncrementWithSparkles(event) {
    console.log("Clic reçu !"); // Ajouter un log ici pour vérifier l'appel de la fonction
    // Incrémentation classique
    robots += clickIncrease;
    compteurGeneral += clickIncrease;
    
    document.getElementById('robots').innerHTML = robots;
    localStorage.setItem('robots', robots);

    localStorage.setItem('compteurGeneral', compteurGeneral);

    // Génération des étincelles à la position du clic
    createSparkles(event);

    if (!canCreateCube) return; // Exit if cooldown is active

    canCreateCube = false;
    setTimeout(() => {
        canCreateCube = true;
    }, 500); // 1-second cooldown

    createMovingSquare();
}

//Creation des particules d'étincelles lors du clic 
function createSparkles(event) {
    const sparklesContainer = document.getElementById("sparkles");
    const sparklesCount = 20; // Nombre d'étincelles

    // Récupérer la position du clic par rapport à la fenêtre (viewport)
    const offsetX = event.clientX; // Position X du clic dans la fenêtre
    const offsetY = event.clientY; // Position Y du clic dans la fenêtre

    // Récupérer la position du conteneur des étincelles par rapport à la fenêtre
    const containerRect = sparklesContainer.getBoundingClientRect();
    const containerX = containerRect.left;
    const containerY = containerRect.top;

    console.log(`Clic à (${offsetX}, ${offsetY})`);

    // Créer les étincelles
    for (let i = 0; i < sparklesCount; i++) {
        const sparkle = document.createElement("div");
        sparkle.classList.add("sparkle");

        // Ajouter l'emoji ✨ à la particule
        sparkle.textContent = "✨";

        // Générer des directions aléatoires pour l'animation
        const x = (Math.random() * 8 - 4); // Valeur entre -4 et 4
        const y = (Math.random() * 8 - 4); // Valeur entre -4 et 4

        // Appliquer les propriétés CSS personnalisées
        sparkle.style.setProperty("--x", x.toString());
        sparkle.style.setProperty("--y", y.toString());

        // Positionner l'étincelle à la position du clic dans la fenêtre
        sparkle.style.position = 'absolute';
        sparkle.style.left = `${offsetX - containerX}px`;
        sparkle.style.top = `${offsetY - containerY}px`;

        console.log(`Étincelle créée à (${offsetX - containerX}, ${offsetY - containerY})`);

        // Ajouter l'étincelle au conteneur
        sparklesContainer.appendChild(sparkle);

        // Supprimer l'étincelle après son animation
        setTimeout(() => {
            sparkle.remove();
        }, 1000);
    }
}

// --------------------------- Effet visuel END -------------------------------------










// ---------------------------------------------- Fonction d'amelioration ----------------------------------------------
//ajout de la fonction pour la consommation d'énergie
function incrementEnergie() {
    // Check if enough robots are available to purchase the bonus
    if (robots >= bonusEnergieCost) {
        // Deduct the cost from robots and save it in localStorage
        robots -= bonusEnergieCost;
        localStorage.setItem('robots', robots);
        document.getElementById('robots').innerHTML = robots;

        QBonusEnergie += 1;
        localStorage.setItem('QBonusEnergie', QBonusEnergie);
        document.getElementById('QBonusEnergie').innerHTML = QBonusEnergie;

        energieActuel += 100 + (energieActuel/10);
        localStorage.setItem('energieActuel', energieActuel);
        document.getElementById('energieActuel').innerHTML = energieActuel;

        bonusEnergieCost *= 1.5;
        localStorage.setItem('bonusEnergieCost', bonusEnergieCost);
        document.getElementById('bonusEnergieCost').innerHTML = bonusEnergieCost;

        mettreAJourAffichage();
    }
}

//ajout de la fonction de bras robotique bonus
function incrementBonusRobotArm() {
    // Check if enough robots are available to purchase the bonus
    if (robots >= bonusRobotArmCost && (consommationEnergieActuel + 10) <= energieActuel && QBonusRobotArm < MaxBonusRobotArm) {
        // Deduct the cost from robots and save it in localStorage
        robots -= bonusRobotArmCost;
        localStorage.setItem('robots', robots);
        document.getElementById('robots').innerHTML = robots;

        // Increase the quantity of bonus robot arms and save it in localStorage
        QBonusRobotArm += 1;
        localStorage.setItem('QBonusRobotArm', QBonusRobotArm);
        document.getElementById('QBonusRobotArm').innerHTML = QBonusRobotArm;

        // Optionally, increase the cost for the next bonus robot arm
        bonusRobotArmCost = Math.floor(bonusRobotArmCost * 1.1);
        localStorage.setItem('bonusRobotArmCost', bonusRobotArmCost);
        document.getElementById('bonusRobotArmCost').innerHTML = bonusRobotArmCost;

        // Ajoute la consommation d'energie du bras mécanique
        consommationEnergieActuel += 10;
        localStorage.setItem('consommationEnergieActuel', consommationEnergieActuel);
        document.getElementById('consommationEnergieActuel').innerHTML = consommationEnergieActuel;

        mettreAJourAffichage();
    }
}

//ajout de la fonction pour augmenter le nombre de clics
function increaseClick() {
    // Check if enough robots are available to purchase the click increase
    if (robots >= clickIncreaseCost && (consommationEnergieActuel + 20) <= energieActuel) {
        // Deduct the cost from robots and save it in localStorage
        robots -= clickIncreaseCost;
        localStorage.setItem('robots', robots);
        document.getElementById('robots').innerHTML = robots;

        // Increase the click increase value and save it in localStorage
        clickIncrease += 1;
        localStorage.setItem('clickIncrease', clickIncrease);
        document.getElementById('clickIncrease').innerHTML = clickIncrease;

        // Optionally, increase the cost for the next click increase
        clickIncreaseCost = Math.floor(clickIncreaseCost * 1.5);
        localStorage.setItem('clickIncreaseCost', clickIncreaseCost);
        document.getElementById('clickIncreaseCost').innerHTML = clickIncreaseCost;

        // Ajoute la consommation d'energie du bonus.
        consommationEnergieActuel += 20;
        localStorage.setItem('consommationEnergieActuel', consommationEnergieActuel);
        document.getElementById('consommationEnergieActuel').innerHTML = consommationEnergieActuel;

        mettreAJourAffichage();
    }
}

function incrementBonusUsine() {

    if (robots >= bonusUsineCost && (consommationEnergieActuel + 40) <= energieActuel) {

        robots -= clickIncreaseCost;
        localStorage.setItem('robots', robots);
        document.getElementById('robots').innerHTML = robots;

        QBonusUsine += 1;
        localStorage.setItem('QBonusUsine', QBonusUsine);
        document.getElementById('QBonusUsine').innerHTML = QBonusUsine;

        bonusUsineCost = Math.floor(bonusUsineCost * 1.5);
        localStorage.setItem('bonusUsineCost', bonusUsineCost);
        document.getElementById('bonusUsineCost').innerHTML = bonusUsineCost;

        consommationEnergieActuel += 40;
        localStorage.setItem('consommationEnergieActuel', consommationEnergieActuel);
        document.getElementById('consommationEnergieActuel').innerHTML = consommationEnergieActuel;

        mettreAJourAffichage();
    }
}
// ---------------------------------------------- Fonction d'amelioration END ----------------------------------------------












// ---------------------------------------------- Reset Variables ----------------------------------------------
function resetVariables() {
    robots = 80000;
    bonusRobotArmCost = 100;
    QBonusRobotArm = 0;
    clickIncreaseCost = 5000;
    clickIncrease = 1;
    energieActuel = 100;
    bonusEnergieCost = 5000;
    consommationEnergieActuel = 10;
    compteurGeneral = 0;
    QBonusEnergie = 0;
    QBonusUsine = 0;
    bonusUsineCost = 25000;
    MaxBonusRobotArm =  40 + (40 * QBonusUsine);

    localStorage.setItem('robots', robots);
    localStorage.setItem('bonusRobotArmCost', bonusRobotArmCost);
    localStorage.setItem('QBonusRobotArm', QBonusRobotArm);
    localStorage.setItem('clickIncreaseCost', clickIncreaseCost);
    localStorage.setItem('clickIncrease', clickIncrease);
    localStorage.setItem('energieActuel', energieActuel);
    localStorage.setItem('bonusEnergieCost', bonusEnergieCost);
    localStorage.setItem('consommationEnergieActuel', consommationEnergieActuel);
    localStorage.setItem('compteurGeneral', compteurGeneral);
    localStorage.setItem('QBonusEnergie', QBonusEnergie);
    localStorage.setItem('QBonusUsine', QBonusUsine);
    localStorage.setItem('bonusUsineCost', bonusUsineCost);
    localStorage.setItem('MaxBonusRobotArm', MaxBonusRobotArm);

    document.getElementById('robots').innerHTML = robots;
    document.getElementById('QBonusRobotArm').innerHTML = QBonusRobotArm;
    document.getElementById('bonusRobotArmCost').innerHTML = bonusRobotArmCost;
    document.getElementById('clickIncreaseCost').innerHTML = clickIncreaseCost;
    document.getElementById('clickIncrease').innerHTML = clickIncrease;
    document.getElementById('energieActuel').innerHTML = energieActuel;
    document.getElementById('bonusEnergieCost').innerHTML = bonusEnergieCost;
    document.getElementById('consommationEnergieActuel').innerHTML = consommationEnergieActuel;
    document.getElementById('QBonusEnergie').innerHTML = QBonusEnergie;
    document.getElementById('QBonusUsine').innerHTML = QBonusUsine;
    document.getElementById('bonusUsineCost').innerHTML = bonusUsineCost;
    document.getElementById('MaxBonusRobotArm').innerHTML = MaxBonusRobotArm;

    mettreAJourAffichage();
}
// ---------------------------------------------- Reset Variables END ----------------------------------------------








// --------------------------- Bloque l'utilisation de touche pour cliquer ---------------------------
function preventKeyPress(event) {
    // Bloque les événements clavier sauf le clic
    if (event.key === "Enter" || event.key === " " || event.code === "Space") {
        event.preventDefault();
    }
}
// --------------------------- Bloque l'utilisation de touche pour cliquer END ---------------------------









// ------------------------------------- Moving Cube Creation -------------------------------------
// Select the conveyor container
const conveyor = document.getElementById('conveyor-container');

// Function to create a moving square
function createMovingSquare() {
    const cubeImage = document.createElement('img');
    let previousRandom = -1;
    let random;
    do {
        random = Math.floor(Math.random() * 4);
    } while (random === previousRandom);
    previousRandom = random;
    
    //faire apparaitre un bras robotique ou une jambe robotique aleatoirement avec une rotation aleatoire
    cubeImage.style.transform = `rotate(${Math.floor(Math.random() * 360)}deg)`;
    
    switch (random) {
        case 0:
            cubeImage.src = './images/RobotArmEmojiAnimation.png';
            break;
        case 1:
            cubeImage.src = './images/RobotLegEmojiAnimation.png';
            break;
        case 2:
            cubeImage.src = './images/RobotHeadEmojiAnimation.png';
            break;
        case 3:
            cubeImage.src = './images/RobotBusteEmojiAnimation.png';
            break;
    }
    cubeImage.alt = 'Cube';
    cubeImage.classList.add('moving-square');

    const conveyor = document.getElementById('conveyor-container');
    conveyor.appendChild(cubeImage);

    cubeImage.addEventListener('animationend', () => {
        conveyor.removeChild(cubeImage);
    });
}
// ------------------------------------- Moving Cube Creation END -------------------------------------











// ----------------------------- Activation des bonus toutes les 0.5s -----------------------------
function activateBonus() {
    if (QBonusRobotArm > 0) {
        robots += QBonusRobotArm * 2;
        robots += QBonusUsine * 50;
        compteurGeneral += QBonusRobotArm * 2;
        compteurGeneral += QBonusUsine * 50;

        document.getElementById('robots').innerHTML = robots;
        localStorage.setItem('robots', robots);

        localStorage.setItem('compteurGeneral', compteurGeneral);
    }
}

function activateAnimation() {
    if (QBonusRobotArm > 0 && canCreateCube) {
        createMovingSquare();
    }
}

function bonusActivation() {
    setInterval(activateBonus, 500);
    setInterval(activateAnimation, 8000 - (100*QBonusRobotArm));
}

bonusActivation();
// ----------------------------- Activation des bonus toutes les 0.5s END -----------------------------




// ----------------------------- Fonction animation bras convoyer -------------------------------------
// Function to update the slots based on QBonusRobotArm
function updatePlacementSlots() {
    // Get the containers
    const behindContainer = document.getElementById('image-placements-behind');
    const frontContainer = document.getElementById('image-placements-front');

    // Clear any previous content
    behindContainer.innerHTML = '';
    frontContainer.innerHTML = '';

    // Update the "behind" and "front" containers
    for (let i = 0; i < 10; i++) { // 10 placement slots
        const behindSlot = document.createElement('div');
        behindSlot.classList.add('placement');
        
        // If QBonusRobotArm is greater than the current index, add the bonus image
        if (i < QBonusRobotArm) {
            const img = document.createElement('img');
            img.classList.add('bonusEmoji');
            img.src = './images/BrasMecaniqueBonus.png';
            behindSlot.appendChild(img);
        }

        // Append the slot to the "behind" container
        behindContainer.appendChild(behindSlot);

        const frontSlot = document.createElement('div');
        frontSlot.classList.add('placement');

        // Similarly, add the bonus image to the front container if needed
        if (i < QBonusRobotArm) {
            const imgFront = document.createElement('img');
            imgFront.classList.add('bonusEmoji');
            imgFront.src = './images/BrasMecaniqueBonus.png';
            frontSlot.appendChild(imgFront);
        }

        // Append the slot to the "front" container
        frontContainer.appendChild(frontSlot);
    }
}
// ----------------------------- Fonction animation bras convoyer END -------------------------------------





// ------------------------------ Fonctions de gestion de la barre d'energie -------------------------------
// Génération de la barre d'énergie
function genererBarreEnergie() {
    const barreEnergie = document.getElementById('barreEnergie');
    barreEnergie.innerHTML = ''; // Clear the existing segments

    for (let i = 1; i <= energieActuel; i++) {
        let segment = document.createElement('div'); // Declare segment inside the loop
        segment.classList.add('segment');
        if (i <= consommationEnergieActuel) {
            segment.classList.add('consumed'); // Mark consumed segments
        }
        barreEnergie.appendChild(segment);
    }
}

// Mise à jour de l'affichage
function mettreAJourAffichage() {
    const barreEnergie = document.getElementById('barreEnergie');
    barreEnergie.innerHTML = ''; // Clear the existing segments

    for (let i = 1; i <= energieActuel; i++) {
        let segment = document.createElement('div'); // Declare segment inside the loop
        segment.classList.add('segment');
        if (i <= consommationEnergieActuel) {
            segment.classList.add('consumed'); // Mark consumed segments
        }
        barreEnergie.appendChild(segment);
    }
}

// Initialisation de la barre
genererBarreEnergie();

// ------------------------------ Fonctions de gestion de la barre d'energie END -------------------------------


//------------------------------ Terminal Function //------------------------------

function getCompteurTotal() {
    return compteurGeneral;
}