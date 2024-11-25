const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');

// Set canvas dimensions to full screen
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Matrix settings
const fontSize = 20; // Size of the characters
const columns = Math.floor(canvas.width / fontSize); // Number of columns based on screen width

// Create an array to store the vertical position for each column
const drops = Array(columns).fill(0);

// Characters for the animation
const characters = '01';
const charsArray = characters.split('');

// Slow down the animation by using a frame counter
let frame = 0;

// Draw the matrix rain
function draw() {
  // Clear the canvas with a semi-transparent black rectangle for the trail effect
  ctx.fillStyle = '#333333';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Text color and font settings
  ctx.font = `${fontSize}px monospace`;

  // Increment frame counter to control speed
  frame++;

  for (let i = 0; i < drops.length; i++) {
    if (Math.random() > 0.95) continue; // Occasionally skip columns for fewer characters

    const text = charsArray[Math.floor(Math.random() * charsArray.length)]; // Random character

    const x = i * fontSize; // X-coordinate based on column index
    const y = drops[i] * fontSize; // Y-coordinate based on drop position

    // Calculate opacity based on the vertical position
    const maxOpacity = 1; // Full opacity at the top
    const minOpacity = 0; // Minimum opacity at the bottom
    const opacity = maxOpacity - (y / (canvas.height*0.7)) * (maxOpacity - minOpacity);

    // Set fill style with dynamic opacity
    ctx.fillStyle = `rgba(255, 180, 0, ${opacity.toFixed(2)})`; // Yellow

    // Draw the character
    ctx.fillText(text, x, y);

    // Reset drop to top of the canvas if it goes off screen
    if (y > (canvas.height*0.7) && Math.random() > 0.975) {
      drops[i] = 0;
    }

    // Move the drop down, but only on every 5th frame (slower animation)
    if (frame % 10 === 0) {
      drops[i]++;
    }
  }
}

// Adjust canvas size on window resize
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  drops.length = Math.floor(canvas.width / fontSize);
  drops.fill(0);
});

// Animate the matrix rain
function animate() {
  draw();
  requestAnimationFrame(animate);
}

animate();