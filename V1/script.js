// Initialize robots from localStorage, or set to 0 if it doesn't exist
let robots = parseInt(localStorage.getItem('robots')) || 0;
let bonusRobotArmCost = parseInt(localStorage.getItem('bonusRobotArm')) || 100;
let QBonusRobotArm = parseInt(localStorage.getItem('QBonusRobotArm')) || 0;

// Display the initial value
document.getElementById('robots').innerHTML = robots;
document.getElementById('QBonusRobotArm').innerHTML = QBonusRobotArm;
document.getElementById('bonusRobotArm').innerHTML = bonusRobotArmCost;

function Increment() {
    // Increment the value of robots
    robots += 1;
    
    // Update the displayed count
    document.getElementById('robots').innerHTML = robots;
    
    // Save the updated robots count to localStorage
    localStorage.setItem('robots', robots);
}

function incrementBonusRobotArm() {
    // Retrieve the current counter and bonus values
    let counter = robots;
    let bonus = bonusRobotArmCost;

    // Check if enough robots are available to purchase the bonus
    if (counter >= bonus) {
        // Deduct the cost from the robot counter and save it in localStorage
        localStorage.setItem('robots', counter - bonus);
        
        // Increase the bonus cost by 10% and save it
        bonus = Math.round(bonus * 1.1); // or bonus + (bonus * 0.1)
        localStorage.setItem('bonusRobotArm', bonus);

        // Increment the count of QBonusRobotArm and save it
        QBonusRobotArm += 1;
        localStorage.setItem('QBonusRobotArm', QBonusRobotArm);

        // Update the displayed values in HTML
        document.getElementById('robots').innerHTML = counter - bonus;
        document.getElementById('QBonusRobotArm').innerHTML = QBonusRobotArm;
        document.getElementById('bonusRobotArmCost').innerHTML = bonus;
    }
}

function resetVariables() {
    // Reset variables to their initial values
    localStorage.setItem('robots', 0); // Reset robots to 0
    localStorage.setItem('bonusRobotArm', 100); // Reset bonusRobotArm to initial cost
    localStorage.setItem('QBonusRobotArm', 0); // Reset QBonusRobotArm to 0

    // Update variables in JavaScript to match localStorage
    let robots = 0;
    let bonusRobotArmCost = 100;
    let QBonusRobotArm = 0;

    // Update HTML elements to reflect the reset values
    document.getElementById('robots').innerHTML = robots;
    document.getElementById('QBonusRobotArm').innerHTML = QBonusRobotArm;
}