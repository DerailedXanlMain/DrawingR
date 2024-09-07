const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');
const colorPicker = document.getElementById('colorPicker');
const clearButton = document.getElementById('clearButton');
const saveButton = document.getElementById('saveButton');

let painting = false;

// Set canvas size
canvas.width = 800;
canvas.height = 600;

// Start painting
canvas.addEventListener('mousedown', (e) => {
    painting = true;
    draw(e);
});

// Stop painting
canvas.addEventListener('mouseup', () => {
    painting = false;
    ctx.beginPath();
});

// Draw on canvas
canvas.addEventListener('mousemove', draw);

// Change color
colorPicker.addEventListener('input', () => {
    ctx.strokeStyle = colorPicker.value;
});

// Clear canvas
clearButton.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

// Save canvas
saveButton.addEventListener('click', () => {
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = 'drawing.png';
    link.click();
});

// Draw function
function draw(e) {
    if (!painting) return;

    ctx.lineWidth = 5;
    ctx.lineCap = 'round';
    ctx.strokeStyle = colorPicker.value;

    ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
}
