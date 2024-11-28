// Initialisation des variables à leurs états de sauvegarde ou à leurs état basique de départ.

// Variable du compteur general de robots actuel
let robots = parseInt(localStorage.getItem('robots')) || 0;

// Variables pour le bonus de BRAS ROBOT
let bonusRobotArmCost = parseInt(localStorage.getItem('bonusRobotArmCost')) || 100;
let QBonusRobotArm = parseInt(localStorage.getItem('QBonusRobotArm')) || 0;

// Variables pour le bonus de CLICK
let clickIncreaseCost = parseInt(localStorage.getItem('clickIncreaseCost')) || 5000;
let clickIncrease = parseInt(localStorage.getItem('clickIncrease')) || 1;

// Varialbes pour le système d'energie
let energieActuel = parseInt(localStorage.getItem('energieActuel')) || 100;
let QBonusEnergie = parseInt(localStorage.getItem('QBonusEnergie')) || 0;
let bonusEnergieCost = parseInt(localStorage.getItem('bonusEnergieCost')) || 5000;
let consommationEnergieActuel = parseInt(localStorage.getItem('consommationEnergieActuel')) || 10;

// Variables pour le bonus USINE
let QBonusUsine = parseInt(localStorage.getItem('QBonusUsine')) || 0;
let bonusUsineCost = parseInt(localStorage.getItem('bonusUsineCost')) || 25000;

// Variable pour le compteur general de robots créé
let compteurGeneral = parseInt(localStorage.getItem('compteurGeneral')) || 0;

// Varialbe pour le nombre max de Bras Mecanique par usine
let MaxBonusRobotArm = 40 + (40 * QBonusUsine);

// Variables de stockage du nombre de Bras Mecanique le long du convoyer
let QBrasMecaniqueBehind = parseInt(localStorage.getItem('QBrasMecaniqueBehind')) || 0;
let QBrasMecaniqueFront = parseInt(localStorage.getItem('QBrasMecaniqueFront')) || 0;

// Variable pour la création de l'image en mouvement sur le convoyeur
let canCreateCube = true;

// Variable pour le lien de l'image Bras Mecanique
const RobotArmImage = "./images/BrasMecaniqueBonus.png"

// Variables pour l'affichage des bras le long du convoyeur
const containerBehind = document.getElementById('image-placements-behind');
const containerFront = document.getElementById('image-placements-front');

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
    // Incrémentation classique
    robots += clickIncrease;
    compteurGeneral += clickIncrease;
    
    document.getElementById('robots').innerHTML = robots;
    localStorage.setItem('robots', robots);

    localStorage.setItem('compteurGeneral', compteurGeneral);

    // Génération des étincelles à la position du clic
    createSparkles(event);

    if (!canCreateCube) return;

    canCreateCube = false;
    setTimeout(() => {
        canCreateCube = true;
    }, 500);

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
    // vérifie si nous avons assez de robots pour acheter le bonus
    if (robots >= bonusEnergieCost) {
       
        // déduit le cout de notre stock et le sauvegarde
        robots -= bonusEnergieCost;
        localStorage.setItem('robots', robots);
        document.getElementById('robots').innerHTML = robots;
        
        // Ajoute 1 a notre quantité de bonus et la sauvegarde
        QBonusEnergie += 1;
        localStorage.setItem('QBonusEnergie', QBonusEnergie);
        document.getElementById('QBonusEnergie').innerHTML = QBonusEnergie;
       
        // mets à jour la valeur actuel de notre energie et la sauvegarde
        energieActuel += 100 + (energieActuel/10);
        localStorage.setItem('energieActuel', energieActuel);
        document.getElementById('energieActuel').innerHTML = energieActuel;
       
        // mets à jour le cout du prochain bonus et le sauvegarde
        bonusEnergieCost *= 1.5;
        localStorage.setItem('bonusEnergieCost', bonusEnergieCost);
        document.getElementById('bonusEnergieCost').innerHTML = bonusEnergieCost;
        
        // mets à jour l'affichage de la barre d'energie
        genererBarreEnergie();
    }
}

//ajout de la fonction de bras robotique bonus
function incrementBonusRobotArm() {
    if (robots >= bonusRobotArmCost && (consommationEnergieActuel + 10) <= energieActuel && QBonusRobotArm < MaxBonusRobotArm) {
        
        robots -= bonusRobotArmCost;
        localStorage.setItem('robots', robots);
        document.getElementById('robots').innerHTML = robots;

        QBonusRobotArm += 1;
        localStorage.setItem('QBonusRobotArm', QBonusRobotArm);
        document.getElementById('QBonusRobotArm').innerHTML = QBonusRobotArm;

        bonusRobotArmCost = Math.floor(bonusRobotArmCost * 1.1);
        localStorage.setItem('bonusRobotArmCost', bonusRobotArmCost);
        document.getElementById('bonusRobotArmCost').innerHTML = bonusRobotArmCost;

        consommationEnergieActuel += 10;
        localStorage.setItem('consommationEnergieActuel', consommationEnergieActuel);
        document.getElementById('consommationEnergieActuel').innerHTML = consommationEnergieActuel;

        if (QBonusRobotArm % 2 == 0 && QBonusRobotArm <= 40) {
            QBrasMecaniqueBehind += 1;
            localStorage.setItem('QBrasMecaniqueBehind', QBrasMecaniqueBehind);
            updateImages(containerBehind, QBrasMecaniqueBehind, RobotArmImage);
            localStorage.setItem('MaxBonusRobotArm', MaxBonusRobotArm);
        } else {   
            QBrasMecaniqueFront += 1;
            localStorage.setItem('QBrasMecaniqueFront', QBrasMecaniqueFront);
            updateImages(containerFront, QBrasMecaniqueFront, RobotArmImage);
            localStorage.setItem('MaxBonusRobotArm', MaxBonusRobotArm);
        }

        animationActivation();
        genererBarreEnergie();
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

        genererBarreEnergie();
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

        MaxBonusRobotArm = 40 + (40 * QBonusUsine);
        localStorage.setItem('MaxBonusRobotArm', MaxBonusRobotArm); 
//        document.getElementById('MaxBonusRobotArm').innerHTML = MaxBonusRobotArm;

        genererBarreEnergie();
    }
}
// ---------------------------------------------- Fonction d'amelioration END ----------------------------------------------



// ---------------------------------------------- Reset Variables ----------------------------------------------
function resetVariables() {
    robots = 160000;
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
    QBrasMecaniqueFront = 0;
    QBrasMecaniqueBehind = 0;

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
    localStorage.setItem('QBrasMecaniqueFront', QBrasMecaniqueFront);
    localStorage.setItem('QBrasMecaniqueBehind', QBrasMecaniqueBehind);

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
//    document.getElementById('MaxBonusRobotArm').innerHTML = MaxBonusRobotArm;

    updateImages(containerBehind, QBrasMecaniqueBehind, RobotArmImage);
    updateImages(containerFront, QBrasMecaniqueFront, RobotArmImage);

    animationActivation();
    genererBarreEnergie();
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



// ----------------------------- Fonction avec auto-appel -----------------------------
// Fonction d'incrementation du compteur de robot et du compteur general
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

// Fonction d'activation de l'animation des objets sur le convoyeur
function bonusActivation() {
    setInterval(activateBonus, 500);
}

let intervalId = null;

function animationActivation() {
    if (intervalId) {
        clearInterval(intervalId); // Clear any existing interval
    }

    if (QBonusRobotArm > 0) {
        const intervalTime = Math.max(200, 5000 - (150 * QBonusRobotArm));
        intervalId = setInterval(createMovingSquare, intervalTime);
    }
}

bonusActivation();
animationActivation();
// ----------------------------- Fonction avec auto-appel END -----------------------------



// ------------------------------ Fonctions de gestion de la barre d'energie -------------------------------
// Génération de la barre d'énergie
function genererBarreEnergie() {
    const barreEnergie = document.getElementById('barreEnergie');
    barreEnergie.innerHTML = '';

    // Pour la quantité d'energie actuel, un nombre de div est créé
    for (let i = 1; i <= energieActuel; i++) {
        // Création des div et ajout au segment
        let segment = document.createElement('div');
        segment.classList.add('segment');
        // Si 'i' est inférieur a la consommation actuel d'energie, alors passe le div en orange
        if (i <= consommationEnergieActuel) {
            segment.classList.add('consumed');
        }
        barreEnergie.appendChild(segment);
    }
}

// Initialisation de la barre
genererBarreEnergie();
// ------------------------------ Fonctions de gestion de la barre d'energie END -------------------------------



// ------------------------------ Fonction de gestion de l'animation du convoyer ------------------------------
function createSlots(container, totalSlots) {
    for (let i = 0; i < totalSlots; i++) {
        const slot = document.createElement('div');
        slot.classList.add('placement'); // Add slot styling class
        slot.setAttribute('data-index', i); // Optional: index for future reference
        container.appendChild(slot);
    }
}

 // Function to update images in slots based on count
 function updateImages(container, filledCount, imageUrl) {
    const slots = container.querySelectorAll('.placement');
    slots.forEach((slot, index) => {
        if (index < filledCount) {
            // Check if the slot already contains an image
            if (!slot.querySelector('img')) {
                const img = document.createElement('img');
                img.src = imageUrl; // Set the image source
                img.alt = "Image " + (index + 1);
                img.style.width = "50px"; // Adjust image size if needed
                img.style.height = "50px";
                img.style.position = "relative"; // Ensure the image is positioned relative to the slot
                slot.appendChild(img);

                // Add sparkle container
                const sparkleContainer = document.createElement('div');
                sparkleContainer.id = 'sparkles'; // Sparkle container styling
                slot.appendChild(sparkleContainer);

                // Start sparkle animation
                startSparkles(sparkleContainer);
            }
        } else {
            // Ensure slots beyond filledCount do not have images
            const img = slot.querySelector('img');
            const sparkleContainer = slot.querySelector('#sparkles');
            if (img) {
                slot.removeChild(img);
            }
            if (sparkleContainer) {
                slot.removeChild(sparkleContainer);
            }
        }
    });
}

// Function to generate sparkles on an image
function startSparkles(sparkleContainer) {

    const interval = Math.floor(Math.random() * 5000) + 2000;

    setInterval(() => {
        const sparkle = document.createElement('div');
        sparkle.classList.add('sparkle');
        sparkle.textContent = '✨'; // Sparkle emoji

        sparkle.style.left = '30px'; // X-offset relative to the parent container
        sparkle.style.top = '10px'; // Y-offset relative to the parent container

        // Random direction for the sparkle animation
        sparkle.style.setProperty('--x', Math.random() * 2 - 1); // Random horizontal movement
        sparkle.style.setProperty('--y', Math.random() * 2 - 1); // Random vertical movement

        // Append the sparkle to the container (placement slot)
        sparkleContainer.appendChild(sparkle);

        // Remove the sparkle after the animation ends
        setTimeout(() => sparkle.remove(), 1000); // Match the duration of the `sparkle-animation`
    }, interval); // Repeat every 2 seconds
}

// Create 20 slots in each container
createSlots(containerBehind, 20);
createSlots(containerFront, 20);

updateImages(containerBehind, QBrasMecaniqueBehind, RobotArmImage);
updateImages(containerFront, QBrasMecaniqueFront, RobotArmImage);
// ------------------------------ Fonction de gestion de l'animation du convoyer END ------------------------------



//------------------------------ Terminal Function ------------------------------
function getCompteurTotal() {
    return compteurGeneral;
}
//------------------------------ Terminal Function END ------------------------------
