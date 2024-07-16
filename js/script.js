const board = document.querySelector('.board');
const gridSizeButton = document.getElementById('grid-size');
const classicModeButton = document.getElementById('classic-mode');
const rainbowModeButton = document.getElementById('rainbow-mode');
const colorPicker = document.getElementById('color-picker');
const eraserButton = document.getElementById('eraser');
const resetButton = document.getElementById('reset');

let mode = 'classic';
let currentColor = colorPicker.value;
let colorIndex = 0;
const rainbowColors = ['#D95D5D', '#DB8525', '#E8C43C', '#BED649', '#9ECBDB', '#6399A5', '#C771A1'];

// Function to create grid
function createGrid(size) {
    // Empty the board
    board.innerHTML = '';


    for (let i = 0; i < size * size; i++) {
        const square = document.createElement('div');
        square.classList.add('square');
        square.dataset.hoverCount = 0; // init hover count
        square.addEventListener('mouseover', draw);
        board.appendChild(square);
    }

    // Update square size based on grid size
    const squares = document.querySelectorAll('.square');
    squares.forEach(square => {
        square.style.width = `calc(100% / ${size})`;
        square.style.height = `calc(100% / ${size})`;
    });
}

// Function to draw
function draw(event) {
    const square = event.target;
    switch (mode) {
        case 'classic':
            let hoverCount = parseInt(square.dataset.hoverCount);
            if (hoverCount < 10) {
                hoverCount++;
                square.dataset.hoverCount = hoverCount;
                const intensity = (hoverCount * 10);
                square.style.backgroundColor = `rgba(0, 0, 0, ${intensity / 100})`;
            }
            break;
        case 'color':
            square.style.backgroundColor = currentColor;
            break;
        case 'rainbow':
            // square.style.backgroundColor = rainbowColors[getRandom()];
            square.style.backgroundColor = rainbowColors[colorIndex];
            colorIndex = (colorIndex + 1) % rainbowColors.length;
            break;
        case 'eraser':
            square.style.backgroundColor = '#fff';
    }
}

// function to generate random number
// function getRandom() {
//     const randomIndex = Math.floor(rainbowColors.length * Math.random());
//     return randomIndex;
// }

// Initialize the grid 
createGrid(16);

/* ===== Event Listeners ===== */
gridSizeButton.addEventListener('click', () => {
    const newSize = prompt('Enter new grid size (e.g., 16 for 16x16):', 16); // 16 as default value
    if (newSize && !isNaN(newSize) && newSize > 0) {
        createGrid(newSize);
    }
    else {
        alert('Invalid grid size!');
    }
})

classicModeButton.addEventListener('click', () => {
    mode = 'classic';
});

rainbowModeButton.addEventListener('click', () => {
    mode = 'rainbow';
});

colorPicker.addEventListener('input', () => {
    currentColor = colorPicker.value;
    mode = 'color';
});

eraserButton.addEventListener('click', () => {
    mode = 'eraser';
});

resetButton.addEventListener('click', () => {
    const squares = document.querySelectorAll('.square');
    squares.forEach(square => {
            square.style.backgroundColor = '#fff';
            square.dataset.hoverCount = 0;
    });
});