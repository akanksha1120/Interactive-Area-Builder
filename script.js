const grid = document.getElementById('grid');
const shelf = document.getElementById('shelf');
const areaDisplay = document.getElementById('area');
const perimeterDisplay = document.getElementById('perimeter');
const expectedAreaInput = document.getElementById('expectedArea');
const expectedPerimeterInput = document.getElementById('expectedPerimeter');
const submitButton = document.getElementById('submit');
const resetButton = document.getElementById('reset');
const resultMessage = document.getElementById('result');

let selectedSquare = null;

shelf.addEventListener('mousedown', (e) => {
    if (e.target.classList.contains('square')) {
        selectedSquare = e.target.cloneNode(true);
        selectedSquare.style.position = 'absolute';
        selectedSquare.style.opacity = '0.7';
        document.body.appendChild(selectedSquare);
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    }
});

function onMouseMove(e) {
    const gridSize = 50;
    const gridRect = grid.getBoundingClientRect();

    const maxX = gridRect.right - gridRect.left - selectedSquare.clientWidth;
    const maxY = gridRect.bottom - gridRect.top - selectedSquare.clientHeight;

    const targetX = Math.min(Math.max(e.clientX - gridRect.left - selectedSquare.clientWidth / 2, 0), maxX);
    const targetY = Math.min(Math.max(e.clientY - gridRect.top - selectedSquare.clientHeight / 2, 0), maxY);

    selectedSquare.style.left = `${targetX + window.scrollX}px`; // Add window.scrollX
    selectedSquare.style.top = `${targetY + window.scrollY}px`;   // Add window.scrollY
}


function onMouseUp(e) {
    
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
    
    const gridRect = grid.getBoundingClientRect();
    if (
        e.clientX >= gridRect.left &&
        e.clientX <= gridRect.right &&
        e.clientY >= gridRect.top &&
        e.clientY <= gridRect.bottom
    ) {
        const gridSize = 50;
        const gridX = Math.floor((e.clientX - gridRect.left) / gridSize);
        const gridY = Math.floor((e.clientY - gridRect.top) / gridSize);
        
        selectedSquare.style.left = `${gridX * gridSize}px`;
        selectedSquare.style.top = `${gridY * gridSize}px`;
        selectedSquare.style.opacity = '1';
        
        grid.appendChild(selectedSquare);
        
        const numSquares = document.querySelectorAll('.grid .square').length;
        const area = gridSize * gridSize * numSquares;
        const perimeter = 2 * (gridSize * numSquares);
        
        areaDisplay.textContent = area;
        perimeterDisplay.textContent = perimeter;
    } else {
        selectedSquare.remove();
    }
    
    selectedSquare = null;
    
}
submitButton.addEventListener('click', () => {
    const numSquares = document.querySelectorAll('.grid .square').length;
    const gridSize = 50;
    const area = gridSize * gridSize * numSquares;
    const perimeter = 2 * (gridSize * numSquares);

    areaDisplay.textContent = area;
    perimeterDisplay.textContent = perimeter;

    const expectedArea = parseInt(expectedAreaInput.value);
    const expectedPerimeter = parseInt(expectedPerimeterInput.value);

    if (!isNaN(expectedArea) && area === expectedArea && !isNaN(expectedPerimeter) && perimeter === expectedPerimeter) {
        resultMessage.textContent = "Correct Answer";
    } else {
        resultMessage.textContent = "Try Again";
    }
});

resetButton.addEventListener('click', () => {
    const squares = document.querySelectorAll('.grid .square');
    squares.forEach(square => square.remove());

    areaDisplay.textContent = 0;
    perimeterDisplay.textContent = 0;
    expectedAreaInput.value = '';
    expectedPerimeterInput.value = '';
    resultMessage.textContent = '';
});
