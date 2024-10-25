// JavaScript for Snake Game and Form Handling

// Snake Game Logic
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
let score = 0;
let snake = [{ x: 200, y: 200 }];
let dx = 20;
let dy = 0;
let foodX, foodY;

// Main game loop
function gameLoop() {
    if (checkGameEnd()) return alert('Game Over!');

    setTimeout(function onTick() {
        clearCanvas();
        drawFood();
        advanceSnake();
        drawSnake();
        drawScore();
        gameLoop();
    }, 100);
}

// Clear the canvas
function clearCanvas() {
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// Draw the score
function drawScore() {
    document.getElementById("score").innerText = ` ${score}`;
}

// Draw the snake on the canvas with rounded corners and gradient
function drawSnake() {
    snake.forEach(part => {
        drawRoundedRect(part.x, part.y, 20, 20, 5);
    });
}

// Draw a rectangle with rounded corners and gradient
function drawRoundedRect(x, y, width, height, radius) {
    // Create a linear gradient
    const gradient = ctx.createLinearGradient(x, y, x + width, y + height);
    gradient.addColorStop(0, "#3498db"); // Starting color
    gradient.addColorStop(1, "#2ecc71"); // Ending color

    ctx.fillStyle = gradient; // Set the fill style to the gradient

    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();   

    ctx.fill();
}




// Move the snake in the current direction
function advanceSnake() {
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(head);

    if (head.x === foodX && head.y === foodY) {
        score++;
        generateFood();
    } else {
        snake.pop();
    }
}

// Check if the game is over
function checkGameEnd() {
    for (let i = 4; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) return true;
    }
    const leftWall = snake[0].x < 0;
    const rightWall = snake[0].x >= canvas.width;
    const topWall = snake[0].y < 0;
    const bottomWall = snake[0].y >= canvas.height;
    return leftWall || rightWall || topWall || bottomWall;
}

// Change the snake's direction based on key press
document.addEventListener("keydown", changeDirection);
function changeDirection(event) {
    const LEFT_KEY = 37;
    const RIGHT_KEY = 39;
    const UP_KEY = 38;
    const DOWN_KEY = 40;
    const keyPressed = event.keyCode;
    const goingUp = dy === -20;
    const goingDown = dy === 20;
    const goingRight = dx === 20;
    const goingLeft = dx === -20;

    if (keyPressed === LEFT_KEY && !goingRight) {
        dx = -20;
        dy = 0;
    }
    if (keyPressed === UP_KEY && !goingDown) {
        dx = 0;
        dy = -20;
    }
    if (keyPressed === RIGHT_KEY && !goingLeft) {
        dx = 20;
        dy = 0;
    }
    if (keyPressed === DOWN_KEY && !goingUp) {
        dx = 0;
        dy = 20;
    }
}

// Generate random food location
function generateFood() {
    foodX = Math.round((Math.random() * (canvas.width - 20)) / 20) * 20;
    foodY = Math.round((Math.random() * (canvas.height - 20)) / 20) * 20;
}

// Draw the food on the canvas
function drawFood() {
    ctx.fillStyle = "black"; // Background for text
    ctx.fillRect(foodX, foodY, 20, 20); // Clear the area for the frog
    ctx.fillStyle = "#ffcc00"; // Color for frog
    ctx.font = "20px Arial"; // Set font size and style
    ctx.fillText("🐸", foodX, foodY + 15); // Draw the frog emoji at the food position
}


// Start the game when "Start Game" button is clicked
document.getElementById("startButton").addEventListener("click", function() {
    score = 0;
    dx = 20;
    dy = 0;
    snake = [{ x: 200, y: 200 }];
    generateFood();
    
    lockScrollAndZoom(); // Lock scroll and zoom on game start
    gameLoop();
});

// Game Over function
function gameEnd() {
    unlockScrollAndZoom(); // Unlock scroll and zoom on game over
    alert('Game Over!');
}

// Update the gameLoop function to call gameEnd on game over
function gameLoop() {
    if (checkGameEnd()) {
        gameEnd(); // Call gameEnd if the game is over
        return;
    }

    setTimeout(function onTick() {
        clearCanvas();
        drawFood();
        advanceSnake();
        drawSnake();
        drawScore();
        gameLoop();
    }, 100);
}


// Form Validation for Sign Up
document.getElementById("signupForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    const email = document.getElementById("signupEmail").value; // Get email value
    const password = document.getElementById("signupPassword").value;
    const confirmPassword = document.getElementById("signupConfirmPassword").value;

    // Email validation
    if (!email.includes('@')) {
        alert("Invalid Email adress");
        return;
    }

    // Password validation
    if (password !== confirmPassword) {
        alert("Passwords do not match!");
    } else {
        alert("Account created successfully!");
        document.getElementById("signupForm").reset();
        closeModal('signupModal'); // Close modal after successful signup
    }
});

// Form Validation for Login
document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    const email = document.getElementById("loginEmail").value; // Get email value
    const password = document.getElementById("loginPassword").value;

    // Email validation
    if (!email.includes('@')) {
        alert("Invalid Email adress");
        return;
    }

    // Add actual authentication logic here (for now, just a placeholder alert)
    alert("Login successful!");
    document.getElementById("loginForm").reset();
    closeModal('loginModal'); // Close modal after successful login
});


// Modal Functionality
const loginLink = document.getElementById('loginLink');
const signupLink = document.getElementById('signupLink');
const loginModal = document.getElementById('loginModal');
const signupModal = document.getElementById('signupModal');

// Function to open modal
function openModal(modalId) {
    document.getElementById(modalId).style.display = 'flex';
}

// Function to close modal
function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// Event listeners for open modals
loginLink.addEventListener('click', (e) => {
    e.preventDefault();
    openModal('loginModal');
});

signupLink.addEventListener('click', (e) => {
    e.preventDefault();
    openModal('signupModal');
});

// Function to toggle between modals
function toggleModal(currentModalId, targetModalId) {
    closeModal(currentModalId);
    openModal(targetModalId);
}

// Event listener for close button (click outside to close)
window.onclick = function(event) {
    if (event.target === loginModal) {
        closeModal('loginModal');
    }
    if (event.target === signupModal) {
        closeModal('signupModal');
    }
};

function checkPasswordStrength() {
    const password = document.getElementById("signupPassword").value;
    const length = password.length >= 8;
    const uppercase = /[A-Z]/.test(password);
    const lowercase = /[a-z]/.test(password);
    const number = /\d/.test(password);
    const special = /[^A-Za-z0-9]/.test(password);

    document.getElementById("length").classList.toggle("passed", length);
    document.getElementById("uppercase").classList.toggle("passed", uppercase);
    document.getElementById("lowercase").classList.toggle("passed", lowercase);
    document.getElementById("number").classList.toggle("passed", number);
    document.getElementById("special").classList.toggle("passed", special);
}



// Event listeners for on-screen controls
document.getElementById("leftButton").addEventListener("click", function() {
    const goingRight = dx === 20;
    if (!goingRight) {
        dx = -20;
        dy = 0;
    }
});

document.getElementById("upButton").addEventListener("click", function() {
    const goingDown = dy === 20;
    if (!goingDown) {
        dx = 0;
        dy = -20;
    }
});

document.getElementById("rightButton").addEventListener("click", function() {
    const goingLeft = dx === -20;
    if (!goingLeft) {
        dx = 20;
        dy = 0;
    }
});

document.getElementById("downButton").addEventListener("click", function() {
    const goingUp = dy === -20;
    if (!goingUp) {
        dx = 0;
        dy = 20;
    }
});


// Lock scroll and zoom
function lockScrollAndZoom() {
    document.body.style.overflow = 'hidden'; // Prevent scrolling
    document.body.style.touchAction = 'none'; // Prevent zooming on touch devices
}

// Unlock scroll and zoom
function unlockScrollAndZoom() {
    document.body.style.overflow = 'auto'; // Allow scrolling
    document.body.style.touchAction = ''; // Restore default touch actions
}

