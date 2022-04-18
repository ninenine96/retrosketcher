const root = document.querySelector("#board");
const boardFragment = document.createDocumentFragment();
const slider = document.querySelector("#sqaurecount");

function createGrid(count) {
	root.style.gridTemplateRows = `repeat(${count}, 1fr)`;
	root.style.gridTemplateColumns = `repeat(${count}, 1fr)`;

	for (let i = 0; i < count ** 2; i++) {
		pixel = document.createElement("div");
		pixel.className = "pixel";
		pixel.setAttribute("draggable", "false");
		boardFragment.appendChild(pixel);
	}

	root.appendChild(boardFragment);
}

function resizeGrid() {
	slider.onchange = () => {
		let count = slider.value;
		deleteGrid();
		createGrid(count);
	};
}

function deleteGrid() {
	while (root.firstChild) {
		root.removeChild(root.firstChild);
	}
}

let colorPicker = document.querySelector("#colorPicker");
let penColor = "#000";

colorPicker.addEventListener("input", () => {
	penColor = colorPicker.value;
});

root.addEventListener("mousedown", (event) => {
	event.preventDefault();
	let eraser = document.querySelector("#eraser");
	let shader = document.querySelector("#shader");
	let random = document.querySelector("#rainbow");

	// paintPixelEvent = paintPixel(event, penColor);
	if (event.buttons === 1) {
		window.addEventListener("mouseover", (e) => {
			if (eraser.value == "ERASE ON") {
				let previousColor = penColor;
				penColor = "#FFF";
				paintPixel(e, penColor);
				penColor = previousColor;
			} else if (random.value == "RANDOM ON") {
				let color = "#" + getRandomRGB();
				console.log(color);
				paintPixel(e, color);
			} else if (shader.value == "SHADE ON") {
				let color = hexToRGB(penColor);
				console.log(color);
				paintPixel(e, color);
			} else {
				paintPixel(e, penColor);
			}
		});
	}
});

function paintPixel(e, color) {
	if (e.buttons == 1) {
		if (e.target.classList == "pixel") {
			let square = e.target;
			square.style.backgroundColor = color;
		}
	} else {
		return;
	}
}

function toggleEraser() {
	let button = document.querySelector("#eraser");
	button.value == "ERASE OFF"
		? (button.value = "ERASE ON")
		: (button.value = "ERASE OFF");
}

function toggleShader() {
	let shader = document.querySelector("#shader");
	shader.value == "SHADE OFF"
		? (shader.value = "SHADE ON")
		: (shader.value = "SHADE OFF");
}

function toggleRandom() {
	let random = document.querySelector("#rainbow");
	random.value == "RANDOM OFF"
		? (random.value = "RANDOM ON")
		: (random.value = "RANDOM OFF");
}

function reset() {
	pixels = document.querySelectorAll("#board > div");

	pixels.forEach((pixel) => {
		pixel.style.backgroundColor = "#FFFF";
	});
}

function getRandomRGB() {
	return Math.floor(Math.random() * 16777215).toString(16);
}

function hexToRGB(hex) {
	var c;
	if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
		c = hex.substring(1).split("");
		if (c.length == 3) {
			c = [c[0], c[0], c[1], c[1], c[2], c[2]];
		}
		c = "0x" + c.join("");
		return (
			"rgba(" + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(",") + ",0.2)"
		);
	}
	throw new Error("Bad Hex");
}

createGrid(16);

slider.onchange = () => {
	resizeGrid();
};
