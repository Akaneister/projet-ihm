// Initialize robots from localStorage, or set to 0 if it doesn't exist
let robots = parseInt(localStorage.getItem('robots')) || 99;
let bonusRobotArmCost = parseInt(localStorage.getItem('bonusRobotArmCost')) || 100;
let QBonusRobotArm = parseInt(localStorage.getItem('QBonusRobotArm')) || 0;

let clickIncreaseCost = parseInt(localStorage.getItem('clickIncreaseCost')) || 5000;
let clickIncrease = parseInt(localStorage.getItem('clickIncrease')) || 1;

// Display the initial value
document.getElementById('robots').innerHTML = robots;
document.getElementById('QBonusRobotArm').innerHTML = QBonusRobotArm;
document.getElementById('bonusRobotArmCost').innerHTML = bonusRobotArmCost;
document.getElementById('clickIncreaseCost').innerHTML = clickIncreaseCost;
document.getElementById('clickIncrease').innerHTML = clickIncrease;

function Increment() {
    // Increment the value of robots
    robots += clickIncrease;
    
    // Update the displayed count
    document.getElementById('robots').innerHTML = robots;
    
    // Save the updated robots count to localStorage
    localStorage.setItem('robots', robots);
}

function incrementBonusRobotArm() {
    // Check if enough robots are available to purchase the bonus
    if (robots >= bonusRobotArmCost) {
        // Deduct the cost from robots and save it in localStorage
        robots -= bonusRobotArmCost;
        localStorage.setItem('robots', robots);
        
        // Increase the bonus cost by 10% and save it
        bonusRobotArmCost = Math.round(bonusRobotArmCost * 1.2);
        localStorage.setItem('bonusRobotArmCost', bonusRobotArmCost);

        // Increment the count of QBonusRobotArm and save it
        QBonusRobotArm += 1;
        localStorage.setItem('QBonusRobotArm', QBonusRobotArm);

        // Update the displayed values in HTML
        document.getElementById('robots').innerHTML = robots;
        document.getElementById('QBonusRobotArm').innerHTML = QBonusRobotArm;
        document.getElementById('bonusRobotArmCost').innerHTML = bonusRobotArmCost;
    }
}

function increaseClick() {
    if (robots >= clickIncreaseCost) {
        robots -= clickIncreaseCost;

        localStorage.setItem('robots', robots);

        clickIncrease *= 2;
        localStorage.setItem('clickIncrease', clickIncrease);

        clickIncreaseCost += clickIncreaseCost + clickIncreaseCost * 2;
        localStorage.setItem('clickIncreaseCost', clickIncreaseCost);

        document.getElementById('robots').innerHTML = robots;
        document.getElementById('clickIncreaseCost').innerHTML = clickIncreaseCost;
        document.getElementById('clickIncrease').innerHTML = clickIncrease;
    }
}

function resetVariables() {
    // Reset variables to their initial values
    robots = 4999;
    bonusRobotArmCost = 100;
    QBonusRobotArm = 0;
    clickIncreaseCost = 5000;
    clickIncrease = 1;

    // Save reset values to localStorage
    localStorage.setItem('robots', robots);
    localStorage.setItem('bonusRobotArmCost', bonusRobotArmCost);
    localStorage.setItem('QBonusRobotArm', QBonusRobotArm);
    localStorage.setItem('clickIncreaseCost', clickIncreaseCost);
    localStorage.setItem('clickIncrease', clickIncrease);

    // Update HTML elements to reflect the reset values
    document.getElementById('robots').innerHTML = robots;
    document.getElementById('bonusRobotArmCost').innerHTML = bonusRobotArmCost;
    document.getElementById('QBonusRobotArm').innerHTML = QBonusRobotArm;
    document.getElementById('clickIncreaseCost').innerHTML = clickIncreaseCost;
    document.getElementById('clickIncrease').innerHTML = clickIncrease;
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

function bonusActivation() {
    setInterval(activateBonus, 500)
}



bonusActivation();


function IncrementWithSparkles(event) {
    console.log("Clic reçu !"); // Ajouter un log ici pour vérifier l'appel de la fonction
    // Incrémentation classique
    const robotsElement = document.getElementById("robots");
    let robotsCount = parseInt(robotsElement.textContent, 10);
    robotsElement.textContent = robotsCount + 1;

    // Génération des étincelles à la position du clic
    createSparkles(event);
}

function createSparkles(event) {
    const sparklesContainer = document.getElementById("sparkles");
    const sparklesCount = 20; // Nombre d'étincelles

    // Récupérer la position du clic par rapport à la fenêtre (viewport)
    const offsetX = event.clientX; // Position X du clic dans la fenêtre
    const offsetY = event.clientY; // Position Y du clic dans la fenêtre

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
        sparkle.style.left = `${offsetX}px`;
        sparkle.style.top = `${offsetY}px`;

        console.log(`Étincelle créée à (${offsetX}, ${offsetY})`);

        // Ajouter l'étincelle au conteneur
        sparklesContainer.appendChild(sparkle);

        // Supprimer l'étincelle après son animation
        setTimeout(() => {
            sparkle.remove();
        }, 1000);
    }
}
