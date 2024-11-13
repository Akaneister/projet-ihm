// Initialize robots from localStorage, or set to 0 if it doesn't exist
let robots = parseInt(localStorage.getItem('robots')) || 99;
let bonusRobotArmCost = parseInt(localStorage.getItem('bonusRobotArmCost')) || 100;
let QBonusRobotArm = parseInt(localStorage.getItem('QBonusRobotArm')) || 0;

// Display the initial value
document.getElementById('robots').innerHTML = robots;
document.getElementById('QBonusRobotArm').innerHTML = QBonusRobotArm;
document.getElementById('bonusRobotArmCost').innerHTML = bonusRobotArmCost;

function Increment() {
    // Increment the value of robots
    robots += 1;
    
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

function resetVariables() {
    // Reset variables to their initial values
    robots = 0;
    bonusRobotArmCost = 100;
    QBonusRobotArm = 0;

    // Save reset values to localStorage
    localStorage.setItem('robots', robots);
    localStorage.setItem('bonusRobotArmCost', bonusRobotArmCost);
    localStorage.setItem('QBonusRobotArm', QBonusRobotArm);

    // Update HTML elements to reflect the reset values
    document.getElementById('robots').innerHTML = robots;
    document.getElementById('bonusRobotArmCost').innerHTML = bonusRobotArmCost;
    document.getElementById('QBonusRobotArm').innerHTML = QBonusRobotArm;
}

function activateBonus() {
    if (QBonusRobotArm > 0) {
        robots += QBonusRobotArm * 2;

        document.getElementById('robots').innerHTML = robots;

        localStorage.setItem('robots', robots);
    }
}

function bonusActivation() {
    setInterval(activateBonus, 1000)
}

bonusActivation();