//column = y-value     row = x-value
//the first number is the column, the second = row
var col = 64;
// var row = 27;
var row = 18;
var openSet = [];
var closedSet = [];
var path = [];
var grid = [];
for (x = 0; x < row; x++) {
	grid.push(new Array(63));
}

for (x = 0; x < row; x++) {
	for (y = 0; y < col; y++) {
		// console.log(x);
		grid[x][y] = document.getElementById("board").rows[x].cells[y];
	}
}

//RANDOM

// for (i = 0; i < row; i++) {
// 	for (j = 0; j < col; j++) {
// 		if (Math.random() < 0.25) {
// 			grid[i][j].className = "wall";
// 		}
// 	}
// }
// chamber, limitLeft, limitRight, limitUp, limitDown

document.getElementById("maze").addEventListener("click", function () {
	// createMaze(0, col, row, 0);
	createMaze(0, col, 0, row);
});

var start = grid[4][8];
var end = grid[row - 1][col - 1];
// var end = grid[9][col - 1];

var current;

openSet.push(start);

//sets the initial f, g and h values of each node. 
for (x = 0; x < row; x++) {
	for (y = 0; y < col; y++) {
		grid[x][y].f = 0;
		grid[x][y].g = 0;
		grid[x][y].h = 0;
		grid[x][y].x = x;
		grid[x][y].y = y;
	}
}

for (x = 0; x < row; x++) {
	for (y = 0; y < col; y++) {
		this.grid[x][y].addEventListener("click", function () {
			addWall(this);
		})
	}
}

function aStar() {
	while (current != end) {
		if (openSet.length > 0) {
			var winner = 0;
			for (i = 0; i < openSet.length; i++) {
				if (openSet[i].f < openSet[winner].f) {
					winner = i;
				}
			}

			current = openSet[winner];
		} else {
			console.log("no solution");
			break;
		}
		addNeighbors(current);
		deleteFromArr(current);
		closedSet.push(current);
		if (openSet.length > 0) {
			drawOpenSet();
		}
	}
	//draw the path


	// if (current === end) {
	// 	//draw the path;
	// } else {
	// 	//add the neighbors
	// 	addNeighbors(current);
	// 	//delete current from openset
	// 	//add current to the closed set.
	// }

}

// aStar();

function drawOptimalPath() {
	var temp = current;
	path.push(temp);
	while (temp.previous) {
		path.unshift(temp.previous);
		temp = temp.previous;
	}

	for (i = 0; i < path.length; i++) {
		var num = i * 0.008;
		var delay = num.toString() + "s";
		path[i].style.animationDelay = delay;
	}

	for (i = 0; i < path.length; i++) {
		path[i].className = "optimal-path";
	}
}

function deleteFromArr(element) {
	for (i = openSet.length - 1; i >= 0; i--) {
		if (openSet[i] == current) {
			openSet.splice(i, 1);
		}
	}
}

function addNeighbors(current) {
	var neighbors = [];
	var x = current.x;
	var y = current.y;

	if (current.x < row - 1 && grid[x + 1][y].className != "wall") {
		neighbors.push(grid[x + 1][y]);
	}

	if (current.x > 0 && grid[x - 1][y].className != "wall") {
		neighbors.push(grid[x - 1][y]);
	}

	if (current.y < col - 1 && grid[x][y + 1].className != "wall") {
		neighbors.push(grid[x][y + 1]);
	}

	if (current.y > 0 && grid[x][y - 1].className != "wall") {
		neighbors.push(grid[x][y - 1]);
	}
	//add the diagonals?

	for (i = 0; i < neighbors.length; i++) {
		var neighbor = neighbors[i];
		if (!closedSet.includes(neighbor)) {
			if (openSet.includes(neighbor)) {
				neighbor.g = Math.abs(neighbor.x - start.x) + Math.abs(neighbor.y - start.y);
			} else {
				openSet.push(neighbor);
			}
			neighbor.h = Math.abs(neighbor.x - end.x) + Math.abs(neighbor.y - end.y);
			neighbor.f = neighbor.g + neighbor.h;
			neighbor.previous = current;
		}
	}

}


function drawOpenSet() {
	for (i = 0; i < openSet.length; i++) {
		var temp = i * 0.01;
		var delay = temp.toString() + "s";
		openSet[i].style.animationDelay = delay;
	}

	for (i = 0; i < openSet.length; i++) {
		openSet[i].className = "open-set";
	}

	//draws the optimal path after drawing the open set.
	var timer = setInterval(() => {
		if (openSet[openSet.length - 1]) {
			openSet[openSet.length - 1].addEventListener("animationend", drawOptimalPath);
			clearInterval(timer);
		}
	}, openSet[openSet.length - 1].animationDelay);
	// drawOptimalPath();

}

function addWall(element) {
	element.className = "wall";
}

// var chamber = grid;
// var width = row;
// var height = col;

var allxValues = [];
for (var i = 0; i <= col; i++) {
	if (i % 2 === 0) {
		allxValues.push(i);
	}
}

var allyValues = [];
for (var i = 0; i <= row; i++) {
	if (i % 2 === 0) {
		allyValues.push(i);
	}
}

// function randomNum(num1, num2, value) {
// 	var random = 0;
// 	num1 /= 2;
// 	num2 /= 2;
// 	if (value === "x") {
// 		if (num1 > num2) {
// 			//Gives me a random number between num1 and num2. 
// 			random = Math.floor(Math.random() * (num1 - num2)) + num2;
// 			random *= 2;
// 		} else {
// 			random = Math.floor(Math.random() * (num2 - num1)) + num1;
// 			random *= 2;
// 		}
// 	}


// 	if(value === "y"){
// 		if (num1 > num2) {
// 			//Gives me a random number between num1 and num2. 
// 			random = Math.floor(Math.random() * (num1 - num2)) + num2;
// 			random *= 2;
// 		} else {
// 			random = Math.floor(Math.random() * (num2 - num1)) + num1;
// 			random *= 2;
// 		}
// 	}


// 	if(value === "wall"){
// 		if (num1 > num2) {
// 			//Gives me a random number between num1 and num2. 
// 			random = Math.floor(Math.random() * (num1 - num2)) + num2;
// 			random = random * 2 + 1;

// 		} else {
// 			random = Math.floor(Math.random() * (num2 - num1)) + num1;
// 			random = random * 2 + 1;
// 		}
// 	}
// 	return random
// }


function randomNum(num1, num2, value) {
	var random = 0;
	var randomIndex = 0;

	//Making num1 and num2 even numbers
	if (num1 % 2 !== 0) {
		if (num1 + 1 > allxValues[allxValues.length - 1]  && num1 + 1> 0 || num1 + 1 > allyValues[allyValues.length - 1] && num1 + 1 > 0) {
			num1--;
		} else {
			num1++;
		}
	}

	if (num2 % 2 !== 0) {
		if (num2 + 1 > allxValues[allxValues.length - 1] && num2 + 1> 0|| num2 + 1 > allyValues[allyValues.length - 1] && num2 + 1> 0) {
			if (num2 > 0) {
				num2--;
			}
		} else {
			num2++;
		}
	}
	console.log(num1, num2)


	if (value === "x") {
		if (num1 > num2) {
			var num1Index = allxValues.indexOf(num1);
			var num2Index = allxValues.indexOf(num2);
			randomIndex = Math.floor(Math.random() * (num1Index - num2Index)) + num2Index;
			random = allxValues[randomIndex];
			allxValues.splice(randomIndex, 1);
			return random;
		} else {
			var num1Index = allxValues.indexOf(num1);
			var num2Index = allxValues.indexOf(num2);
			console.log(num1Index, num2Index)

			randomIndex = Math.floor(Math.random() * (num2Index - num1Index)) + num1Index;
			random = allxValues[randomIndex];
			allxValues.splice(randomIndex, 1);
			return random;
		}
	}


	if (value === "y") {
		if (num1 > num2) {
			var num1Index = allyValues.indexOf(num1);
			var num2Index = allyValues.indexOf(num2);
			randomIndex = Math.floor(Math.random() * (num1Index - num2Index)) + num2Index;
			random = allyValues[randomIndex];
			allyValues.splice(randomIndex, 1);
			return random;
		} else {
			var num1Index = allyValues.indexOf(num1);
			var num2Index = allyValues.indexOf(num2);
			randomIndex = Math.floor(Math.random() * (num2Index - num1Index)) + num1Index;
			random = allyValues[randomIndex];
			allyValues.splice(randomIndex, 1);
			return random;
		}
	}


	if (value === "wall") {
		num1 /= 2;
		num2 /= 2;
		if (num1 > num2) {
			//Gives me a random number between num1 and num2. 
			random = Math.floor(Math.random() * (num1 - num2)) + num2;
			random = random * 2 + 1;

		} else {
			random = Math.floor(Math.random() * (num2 - num1)) + num1;
			random = random * 2 + 1;
		}
	}
	return random
}



var upper;
var temp = 0;


function countInArray(array, what) {
	return array.filter(item => item == what).length;
}

//leftCord = the left most x coordinate of my chamber/grid, upCord = the upmost y coordinate of my grid etc.
//(0, 0) IS POSITIONED IN THE LEFT TOP NODE OF MY GRID

//These arrays will keep track of the x- and y-values that has been used. 
//This will elimate the chance of multiple lines drawn at the same x- or y-values. 

function createMaze(leftCord, rightCord, upCord, downCord) {
	var height = Math.abs(downCord - upCord);
	var width = Math.abs(rightCord - leftCord);

	if (height <= 2 || width <= 2) {
		//The maze is completed!

		return;
	} else {

		if (height < width) {
			//cut the chamber/grid vertically

			//Getting a random number that's EVEN and drawing the function x = 'random number' on the grid. 
			var x = randomNum(leftCord, rightCord, "x");

			var lineX = [];
			for (var i = upCord; i < downCord; i++) {
				lineX.push(grid[i][x]);
			}
			//BUG => MAKE SURE YOU DONT DRAW THE SAME WALL TWICE

			//Making a random door/passage and making sure it's ODD
			var randomDoor = randomNum(0, lineX.length, "wall");
			lineX.splice(randomDoor, 1);

			//Drawing the line
			for (var i = 0; i < lineX.length; i++) {
				lineX[i].className = "wall";
			}

			//Making the same thing again, but with the left and right sub-chambers that were created by the line
			setTimeout(function () {
				createMaze(leftCord, x, upCord, downCord);
			}, 0)

			setTimeout(function () {
				createMaze(x, rightCord, upCord, downCord);
			}, 0)

		} else {
			//cut the chamber/grid horizontally

			//Getting a random number that's EVEN and drawing the function y = 'random number' on the grid
			var y = randomNum(0, downCord, "y");

			var lineY = [];
			for (var i = leftCord; i < rightCord; i++) {
				lineY.push(grid[y][i]);
			}

			//Making a random door/passage and making sure it's ODD
			var randomDoor = randomNum(0, lineY.length, "wall");
			lineY.splice(randomDoor, 1);

			//Drawing the line
			for (var i = 0; i < lineY.length; i++) {
				lineY[i].className = "wall";
			}

			//Making the same thing again, but with the upper and lower-chambers that were created by the line
			setTimeout(function () {
				createMaze(leftCord, rightCord, upCord, y);
			}, 0)

			setTimeout(function () {
				createMaze(leftCord, rightCord, y, downCord);
			}, 0)
		}

	}

}