// Initialize robots from localStorage, or set to 0 if it doesn't exist
let robots = parseInt(localStorage.getItem('robots')) || 0;
let bonusRobotArmCost = parseInt(localStorage.getItem('bonusRobotArmCost')) || 100;
let QBonusRobotArm = parseInt(localStorage.getItem('QBonusRobotArm')) || 0;

let clickIncreaseCost = parseInt(localStorage.getItem('clickIncreaseCost')) || 5000;
let clickIncrease = parseInt(localStorage.getItem('clickIncrease')) || 1;

let energieActuel = parseInt(localStorage.getItem('energieActuel')) || 100;
let bonusEnergieCost = parseInt(localStorage.getItem('bonusEnergie')) || 5000;

let canCreateCube = true;

// --------------------------- Affichage des valeurs au chargement de la page -------------------------------------
document.getElementById('robots').innerHTML = robots;
document.getElementById('QBonusRobotArm').innerHTML = QBonusRobotArm;
document.getElementById('bonusRobotArmCost').innerHTML = bonusRobotArmCost;
document.getElementById('clickIncreaseCost').innerHTML = clickIncreaseCost;
document.getElementById('clickIncrease').innerHTML = clickIncrease;
document.getElementById('energieActuel').innerHTML = energieActuel;
document.getElementById('bonusEnergieCost').innerHTML = bonusEnergieCost;
// --------------------------- Affichage des valeurs au chargement de la page END ---------------------------------

function IncrementWithSparkles(event) {
    console.log("Clic reçu !"); // Ajouter un log ici pour vérifier l'appel de la fonction
    // Incrémentation classique
    robots += clickIncrease;
    
    // Update the displayed count
    document.getElementById('robots').innerHTML = robots;
    
    // Save the updated robots count to localStorage
    localStorage.setItem('robots', robots);

    // Génération des étincelles à la position du clic
    createSparkles(event);

    if (!canCreateCube) return; // Exit if cooldown is active

    canCreateCube = false;
    setTimeout(() => {
        canCreateCube = true;
    }, 500); // 1-second cooldown

    createMovingSquare();
}

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

function incrementEnergie() {
    // Check if enough robots are available to purchase the bonus
    if (robots >= bonusEnergieCost) {
        // Deduct the cost from robots and save it in localStorage
        robots -= bonusRobotArmCost;
        localStorage.setItem('robots', robots);
        document.getElementById('robots').innerHTML = robots;

        energieActuel *= 1.5;
        localStorage.setItem('energieActuel', energieActuel);
        document.getElementById('energieActuel').innerHTML = energieActuel;

        bonusEnergieCost *= 1.2;
        localStorage.setItem('bonusEnergieCost', bonusEnergieCost);
        document.getElementById('bonusEnergieCost').innerHTML = bonusEnergieCost;
    }
}

function incrementBonusRobotArm() {
    // Check if enough robots are available to purchase the bonus
    if (robots >= bonusRobotArmCost) {
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
    }
}

function increaseClick() {
    // Check if enough robots are available to purchase the click increase
    if (robots >= clickIncreaseCost) {
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
    }
}

function resetVariables() {
    robots = 0;
    bonusRobotArmCost = 100;
    QBonusRobotArm = 0;
    clickIncreaseCost = 5000;
    clickIncrease = 1;
    energieActuel = 100;
    bonusEnergieCost = 5000;

    localStorage.setItem('robots', robots);
    localStorage.setItem('bonusRobotArmCost', bonusRobotArmCost);
    localStorage.setItem('QBonusRobotArm', QBonusRobotArm);
    localStorage.setItem('clickIncreaseCost', clickIncreaseCost);
    localStorage.setItem('clickIncrease', clickIncrease);
    localStorage.setItem('energieActuel', energieActuel);
    localStorage.setItem('bonusEnergieCost', bonusEnergieCost);


    document.getElementById('robots').innerHTML = robots;
    document.getElementById('QBonusRobotArm').innerHTML = QBonusRobotArm;
    document.getElementById('bonusRobotArmCost').innerHTML = bonusRobotArmCost;
    document.getElementById('clickIncreaseCost').innerHTML = clickIncreaseCost;
    document.getElementById('clickIncrease').innerHTML = clickIncrease;
    document.getElementById('energieActuel').innerHTML = energieActuel;
    document.getElementById('bonusEnergieCost').innerHTML = bonusEnergieCost;

}

function preventKeyPress(event) {
    // Bloque les événements clavier sauf le clic
    if (event.key === "Enter" || event.key === " " || event.code === "Space") {
        event.preventDefault();
    }
}

function activateBonus() {
    if (QBonusRobotArm > 0) {
        robots += QBonusRobotArm * 2;

        document.getElementById('robots').innerHTML = robots;

        localStorage.setItem('robots', robots);
    }
}

// ------------------------------------- Moving Cube Creation -----------------------------------------

// Select the conveyor container
const conveyor = document.getElementById('conveyor-container');

// Function to create a moving square
function createMovingSquare() {
    // Create a new square
    const square = document.createElement('div');
    square.classList.add('moving-square');

    // Append the square to the conveyor container
    conveyor.appendChild(square);

    // Remove the square after the animation ends (to prevent clutter in the DOM)
    square.addEventListener('animationend', () => {
        conveyor.removeChild(square);
    });
}

// ------------------------------------- Moving Cube Creation END -------------------------------------

function bonusActivation() {
    setInterval(activateBonus, 500)
}

bonusActivation();
