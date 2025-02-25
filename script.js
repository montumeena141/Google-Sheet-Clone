let rows = 100;
let cols = 26;

let addressColContainer = document.querySelector(".address-col-container");
let addressRowContainer = document.querySelector(".address-row-container");
let cellsContainer = document.querySelector(".cells-container");
let addressBar = document.querySelector(".address-bar");

// Create address columns (row numbers)
for (let i = 0; i < rows; i++) {
    let addressCol = document.createElement("div");
    addressCol.setAttribute("class", "address-col");
    addressCol.innerText = i + 1;
    addressColContainer.appendChild(addressCol);
}

// Create address rows (column letters)
for (let i = 0; i < cols; i++) {
    let addressRow = document.createElement("div");
    addressRow.setAttribute("class", "address-row");
    addressRow.innerText = String.fromCharCode(65 + i);
    addressRowContainer.appendChild(addressRow);
}

// Create the grid of cells
for (let row = 0; row < rows; row++) {
    let cellRow = document.createElement("div");
    cellRow.setAttribute("class", "cell-row");
    for (let col = 0; col < cols; col++) {
        let cell = document.createElement("div");
        cell.setAttribute("class", "cell");
        cell.setAttribute("contenteditable", "true");
        cell.setAttribute("spellcheck", "false");
        cell.setAttribute("rowId", row);
        cell.setAttribute("colId", col);
        cellRow.appendChild(cell);
        addressBarDisplay(cell, row, col);
    }
    cellsContainer.appendChild(cellRow);
}

// Display the cell address in the address bar
function addressBarDisplay(cell, row, col) {
    cell.addEventListener("click", (e) => {
        let rowId = row + 1;
        let colId = String.fromCharCode(65 + col);
        addressBar.value = `${colId}${rowId}`;
        updateToolbar(cell); // Update toolbar when a cell is selected
    });
}

// Update toolbar based on the selected cell's styles
function updateToolbar(cell) {
    // Bold
    if (cell.style.fontWeight === "bold") {
        boldBtn.classList.add("active");
    } else {
        boldBtn.classList.remove("active");
    }

    // Italic
    if (cell.style.fontStyle === "italic") {
        italicBtn.classList.add("active");
    } else {
        italicBtn.classList.remove("active");
    }

    // Underline
    if (cell.style.textDecoration === "underline") {
        underlineBtn.classList.add("active");
    } else {
        underlineBtn.classList.remove("active");
    }

    // Font Size
    fontSizeSelect.value = cell.style.fontSize.replace("px", "") || "14";

    // Font Family
    fontFamilySelect.value = cell.style.fontFamily || "monospace";

    // Text Alignment
    if (cell.style.textAlign === "left") {
        alignLeft.classList.add("active");
        alignCenter.classList.remove("active");
        alignRight.classList.remove("active");
    } else if (cell.style.textAlign === "center") {
        alignCenter.classList.add("active");
        alignLeft.classList.remove("active");
        alignRight.classList.remove("active");
    } else if (cell.style.textAlign === "right") {
        alignRight.classList.add("active");
        alignLeft.classList.remove("active");
        alignCenter.classList.remove("active");
    } else {
        alignLeft.classList.remove("active");
        alignCenter.classList.remove("active");
        alignRight.classList.remove("active");
    }

    // Font Color
    fontColorInput.value = cell.style.color || "#000000";

    // Background Color
    bgColorInput.value = cell.style.backgroundColor || "#ffffff";
}

// Handle cell selection and styling
document.addEventListener("DOMContentLoaded", () => {
    const boldBtn = document.querySelector(".bold");
    const italicBtn = document.querySelector(".italic");
    const underlineBtn = document.querySelector(".underline");
    const fontColorInput = document.querySelector(".font-color-prop");
    const bgColorInput = document.querySelector(".bg-color-prop");
    const alignLeft = document.querySelector(".left");
    const alignCenter = document.querySelector(".center");
    const alignRight = document.querySelector(".right");
    const fontSizeSelect = document.querySelector(".font-size-prop");
    const fontFamilySelect = document.querySelector(".font-family-prop");

    let selectedCell = null;

    // Select a cell when clicked
    document.querySelector(".cells-container").addEventListener("click", (event) => {
        if (event.target.classList.contains("cell")) {
            selectedCell = event.target;
            updateToolbar(selectedCell); // Update toolbar when a cell is selected
        }
    });

    // Toggle bold, italic, and underline
    boldBtn.addEventListener("click", () => {
        if (selectedCell) {
            selectedCell.style.fontWeight = selectedCell.style.fontWeight === "bold" ? "normal" : "bold";
            updateToolbar(selectedCell); // Update toolbar after toggling
        }
    });

    italicBtn.addEventListener("click", () => {
        if (selectedCell) {
            selectedCell.style.fontStyle = selectedCell.style.fontStyle === "italic" ? "normal" : "italic";
            updateToolbar(selectedCell); // Update toolbar after toggling
        }
    });

    underlineBtn.addEventListener("click", () => {
        if (selectedCell) {
            selectedCell.style.textDecoration = selectedCell.style.textDecoration === "underline" ? "none" : "underline";
            updateToolbar(selectedCell); // Update toolbar after toggling
        }
    });

    // Change font color
    fontColorInput.addEventListener("input", () => {
        if (selectedCell) {
            selectedCell.style.color = fontColorInput.value;
        }
    });

    // Change background color
    bgColorInput.addEventListener("input", () => {
        if (selectedCell) {
            selectedCell.style.backgroundColor = bgColorInput.value;
        }
    });

    // Align text
    function alignText(alignType) {
        if (selectedCell) {
            selectedCell.style.textAlign = alignType;
            updateToolbar(selectedCell); // Update toolbar after alignment
        }
    }

    alignLeft.addEventListener("click", () => alignText("left"));
    alignCenter.addEventListener("click", () => alignText("center"));
    alignRight.addEventListener("click", () => alignText("right"));

    // Change font size
    fontSizeSelect.addEventListener("change", () => {
        if (selectedCell) {
            selectedCell.style.fontSize = `${fontSizeSelect.value}px`;
        }
    });

    // Change font family
    fontFamilySelect.addEventListener("change", () => {
        if (selectedCell) {
            selectedCell.style.fontFamily = fontFamilySelect.value;
        }
    });
});


