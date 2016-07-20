screenwidth = $(window).width();
let padding = false;
if (screenwidth > 900) {
	padding = true;
	$('.flex-col').css('padding-left', screenwidth / 2 - 450 + 'px');
}

let firefox = false;

$(function () {
	$('#click').click(() => {
		$('#fog').toggle();
		$('#filter').toggle();
	});

	if (navigator.userAgent.toLowerCase().indexOf('firefox') >= 0) {
		alert('Heads up - this game runs much smoother in Chrome.');
		firefox = true;
	}
});

const one = 16; // represents one tile

const env = { // coords on spritesheet
	// FLOOR
	transparent: [one * -19, 0],
	groundBasic: [one * -6, 0],
	groundRandom: [[one * -6, one * -3], [one * -7, one * -3], [one * -8, one * -3], [one * -9, one * -3], [one * -7, 0], [one * -8, 0], [one * -9, 0], [one * -10, 0], [one * -7, -one], [one * -8, -one], [one * -9, -one], [one * -10, -one], [one * -8, one * -2], [one * -9, one * -2], [one * -10, one * -2], [one * -11, one * -2], [one * -12, one * -2]],
	chest: [one * -14, one * -8],
	stair: [one * -5, one * -4],
	crateOpen: [one * -13, one * -6],
	potOpen: [one * -13, one * -2],
	potion: [0, 0],
	maxPotion: [0, -one],
	sword: [-one, 0],
	mobs: [[0, one * -3], [-one, one * -3], [one * -2, one * -3], [one * -3, one * -3], [one * -4, one * -2], [one * -5, one * -2]],
	slime: [one * -5, one * -2],
	// PROPS
	crate: [one * -13, one * -5],
	pot: [one * -13, 0],
	// WALLS
	em: [one * -1, one * -1], // empty. dark.
	'WEADXC': [one * -5, one * -6], // island
	'QWADXC': [one * -5, one * -6], // island
	'QWEADZXC': [one * -5, one * -6], // island
	'QW': [one * -1, 0], // bottom
	'W': [one * -1, 0], // bottom
	'WE': [one * -1, 0], // bottom
	'QWE': [one * -1, 0], // bottom
	'QA': [0, one * -1], // left
	'A': [0, one * -1], // left
	'AZ': [0, one * -1], // left
	'QAZ': [0, one * -1], // left
	'ED': [one * -2, one * -1], // right
	'D': [one * -2, one * -1], // right
	'DC': [one * -2, one * -1], // right
	'EDC': [one * -2, one * -1], // right
	'ZX': [one * -1, one * -2], // top
	'X': [one * -1, one * -2], // top
	'XC': [one * -1, one * -2], // top
	'ZXC': [one * -1, one * -2], // top
	'QEZ': [one * -11, one * -8], // bottom-right corner, facing out
	'WEAZ': [0, 0], // bottom-right corner, facing out
	'WEA': [0, 0], // bottom-right corner, facing out
	'QWEA': [0, 0], // bottom-right corner, facing out
	'QWAZ': [0, 0], // bottom-right corner, facing out
	'QWA': [0, 0], // bottom-right corner, facing out
	'QWEAZ': [0, 0], // bottom-right corner, facing out
	'QWDC': [one * -2, 0],
	'QDC': [one * -2, 0],
	'QWED': [one * -2, 0],
	'QWD': [one * -2, 0],
	'WEDC': [one * -2, 0],
	'WED': [one * -2, 0],
	'QWEDC': [one * -2, 0],
	'QEZC': [one * -9, one * -7],
	'AXC': [one * -9, one * -8],
	'AZX': [0, one * -2],
	'AZXC': [0, one * -2],
	'QWXC': [one * -9, one * -4],
	'QXC': [0, one * -2],
	'AC': [one * -9, one * -8],
	'QC': [0, one * -2],
	'QAZXC': [0, one * -2],
	'QAZX': [0, one * -2],
	'QAXC': [0, one * -2],
	'EZ': [one * -2, one * -2],
	'DZX': [one * -2, one * -2],
	'DXC': [one * -2, one * -2],
	'EDXC': [one * -2, one * -2],
	'DZXC': [one * -2, one * -2],
	'EDZX': [one * -2, one * -2],
	'EDZXC': [one * -2, one * -2],
	'C': [one * -3, 0],
	'E': [one * -3, one * -1],
	'Z': [one * -4, 0],
	'Q': [one * -4, one * -1],

	'WEAZXC': [one * -6, one * -4],
	'QWEAZX': [one * -6, one * -4],
	'QWEAXC': [one * -6, one * -4],
	'QWAZXC': [one * -6, one * -4],
	'QWAZX': [one * -6, one * -4],
	'WEAZX': [one * -6, one * -4],
	'QWEAZXC': [one * -6, one * -4],
	'WEAZC': [one * -6, one * -5],
	'QWAC': [one * -6, one * -5],
	'QEAZX': [one * -6, one * -6],
	'EAZXC': [one * -6, one * -6],
	'QDZX': [one * -7, one * -6],
	'QWDZ': [one * -7, one * -5],
	'QDZ': [one * -7, one * -5],
	'QDZ': [one * -7, one * -5],
	'QWEDZC': [one * -7, one * -5],
	'WEDZC': [one * -7, one * -5],
	'QWEDZ': [one * -7, one * -5],
	'QWAXC': [one * -6, one * -4],
	'QWEZXC': [one * -7, one * -4],
	'EAZC': [one * -8, one * -6],
	'EAC': [one * -8, one * -6],
	'QEAZC': [one * -8, one * -6],
	'QWEZC': [one * -8, one * -5],
	'QWZX': [one * -8, one * -4],
	'WEXC': [one * -8, one * -4],
	'QWEXC': [one * -8, one * -4],
	'QWDXC': [one * -9, one * -4],
	'WEZX': [one * -9, one * -4],
	'QWDZXC': [one * -9, one * -4],
	'WEZC': [one * -8, one * -5],
	'WEZXC': [one * -8, one * -4],
	'QWEZX': [one * -8, one * -4],
	'WEC': [one * -11, one * -6],
	'QWEC': [one * -11, one * -6],
	'QWZ': [one * -12, one * -6],
	'QWEZ': [one * -12, one * -6],
	'AX': [0, one * -2],
	'QZX': [one * -12, one * -7],
	'QXC': [one * -12, one * -7],
	'QZXC': [one * -12, one * -7],
	'QWZXC': [one * -8, one * -4],
	'QEXC': [one * -9, one * -6],
	'QEDZXC': [one * -7, one * -6],
	'QWZC': [one * -9, one * -4],
	'QDZXC': [one * -7, one * -6],
	'QEAC': [one * -8, one * -6],
	'QEZX': [one * -9, one * -6],
	'QEZXC': [one * -9, one * -6],
	'QDXC': [one * -9, one * -4],
	'WEDXC': [one * -9, one * -4],
	'QEDZC': [one * -9, one * -5],
	'QDZC': [one * -9, one * -5],
	'WEDZX': [one * -9, one * -4],
	'QWEDZX': [one * -9, one * -4],
	'QWEDXC': [one * -9, one * -4],
	'WEDZXC': [one * -9, one * -4],
	'WEZX': [one * -9, one * -4],
	'QWEDZXC': [one * -9, one * -4],

	'AD': [one * -10, one * -5],
	'EAD': [one * -10, one * -5],
	'QADZC': [one * -10, one * -5],
	'QEAD': [one * -10, one * -5],
	'QEADZC': [one * -10, one * -5],
	'EADZC': [one * -10, one * -5],
	'QWADZC': [one * -10, one * -4],
	'WEADZ': [one * -10, one * -4],
	'WEADC': [one * -10, one * -4],
	'QWAD': [one * -10, one * -4],
	'QWEAD': [one * -10, one * -4],
	'QWADZ': [one * -10, one * -4],

	'ZC': [one * -12, one * -10],
	'EC': [one * -12, one * -9],
	'ZE': [one * -11, one * -8],
	'QZ': [one * -11, one * -9],
	'QE': [one * -11, one * -10],
	'QAC': [one * -9, one * -8],
	'AZC': [one * -9, one * -8],
	'QAZC': [one * -9, one * -8],
	'QADXC': [one * -10, one * -7],
	'QEADZXC': [one * -10, one * -7],
	'DZ': [one * -10, one * -8],
	'QEAZ': [one * -11, one * -8],
	'QAD': [one * -10, one * -5],
	'EADZ': [one * -10, one * -5],
	'QEADC': [one * -10, one * -5],
	'ADZC': [one * -10, one * -5],
	'QADC': [one * -10, one * -5],
	'QEADZ': [one * -10, one * -5],
	'ADZ': [one * -10, one * -5],
	'QADZ': [one * -10, one * -5],
	'WEAD': [one * -10, one * -4],
	'WEADZC': [one * -10, one * -4],
	'QWEADC': [one * -10, one * -4],
	'QWEADZ': [one * -10, one * -4],
	'QWADC': [one * -10, one * -4],
	'QWEADZC': [one * -10, one * -4],
	'QZC': [one * -9, one * -8],
	'DZC': [one * -10, one * -8],
	'EDZ': [one * -10, one * -8],
	'EDZC': [one * -10, one * -8],
	'EADC': [one * -10, one * -5],
	'ADZX': [one * -10, one * -7],
	'EADZX': [one * -10, one * -7],
	'QEADZX': [one * -10, one * -7],
	'QADZX': [one * -10, one * -7],
	'EADZXC': [one * -10, one * -7],
	'QADZXC': [one * -10, one * -7],
	'ADZXC': [one * -10, one * -7],
	'ADXC': [one * -10, one * -7],
	'ADC': [one * -10, one * -6],
	'QEDC': [one * -12, one * -8],
	'QED': [one * -12, one * -8],
	'QD': [one * -12, one * -8],
	'EA': [one * -11, one * -8],
	'QEA': [one * -11, one * -8],
	'EAZ': [one * -11, one * -8],
	'QWC': [one * -11, one * -6],
	'WEZ': [one * -12, one * -6],
	'QEC': [one * -11, one * -6],
	'EZX': [one * -11, one * -7],
	'EZC': [one * -11, one * -7],
	'EZXC': [one * -11, one * -7],
	'EXC': [one * -11, one * -7],

	'QEDXC': [one * -7, one * -6],
	'WEDZ': [one * -7, one * -5],
	'QWEDZ': [one * -7, one * -5],
	'EAZX': [one * -6, one * -6],
	'EAXC': [one * -6, one * -6],
	'QEAZXC': [one * -6, one * -6],
	'WEAXC': [one * -6, one * -4],
	'QWEAC': [one * -6, one * -5],
	'QWAZC': [one * -6, one * -5],
	'QWEAZC': [one * -6, one * -5],
	'QWADZX': [one * -5, one * -6],
	'QWEADZX': [one * -5, one * -6],
	'WEADZXC': [one * -5, one * -6],
	'QWADZXC': [one * -5, one * -6],
	'QWEADXC': [one * -5, one * -6]

};

// GAME CLASS

// constructor
function Game() {
	this.allTiles = [];
	this.xOffset = 0;
	this.yOffset = 0;
	this.groundTiles = [];
	this.wallTiles = [];
	this.roomOrigins = [];
	this.floodedOrigins = [];
	this.mole = [0, 0];
	this.contaminated = [];
	this.clone = [];
	this.itemLayer = [];
	this.itemTiles = [];
	this.layerThree = [];
}

Game.prototype.fillSolid = function () {
	for (let i = 0; i < 35; i++) {
		// fill with solid. 35x35
		this.layerThree[i] = [];
		this.itemLayer[i] = [];
		this.allTiles[i] = [];
		for (let p = 0; p < 35; p++) {
			this.layerThree[i][p] = env.transparent;
			this.itemLayer[i][p] = env.transparent;
			this.allTiles[i][p] = env.em;
		}
	}
};

Game.prototype.generateRoom = function () {
	for (let room = 0; room < Math.floor(Math.random() * 4) + 10; room++) {
		const originRow = Math.floor(Math.random() * 29);
		const originCol = Math.floor(Math.random() * 25);
		this.roomOrigins.push([originRow + 3, originCol + 3]);

		for (let i = originRow; i < Math.floor(Math.random() * 4) + 4 + originRow; i++) {
			for (let p = originCol - Math.floor(Math.random() * 3) + Math.floor(Math.random() * 3); p < Math.floor(Math.random() * 4) + 8 + originCol; p++) {
				const randomGround = Math.floor(Math.random() * 150);
				if (randomGround > 16) {
					this.allTiles[i][p] = env.groundBasic;
				} else {
					this.allTiles[i][p] = env.groundRandom[randomGround];
				}
			}
		}
	}
};

Game.prototype.checkIfGround = function (row, col) {
	if (this.allTiles[row][col] === env.em) return false;else return true;
};

Game.prototype.search2D = function (arr, row, col) {
	// searching for an array inside a multidimensional array just returns false
	for (let i = 0; i < arr.length; i++) {
		// so I have to compare each pair individually
		if (arr[i][0] == row && arr[i][1] == col) return true;
	}
	return false;
};

Game.prototype.contaminate = function (mole) {
	this.contaminated = [mole];
	const contaminated = this.contaminated;

	let newAddition = true;
	while (newAddition) {
		newAddition = false;
		const length = contaminated.length;
		for (let i = 0; i < length; i++) {
			// i turned off corner checking because making the player go through 1 tile diagonals doesnt make a good UX
			// if (!this.search2D(contaminated, contaminated[i][0] - 1, contaminated[i][1] - 1) &&
			// (contaminated[i][0] - 1 >= 0) && (contaminated[i][1] - 1 >= 0) &&
			// this.checkIfGround(contaminated[i][0] - 1, contaminated[i][1] - 1)) {
			// 	newAddition = true;
			// 	contaminated.push([contaminated[i][0] - 1, contaminated[i][1] - 1]);
			// }
			if (!this.search2D(contaminated, contaminated[i][0] - 1, contaminated[i][1]) && contaminated[i][0] - 1 >= 0 && this.checkIfGround(contaminated[i][0] - 1, contaminated[i][1])) {
				newAddition = true;
				contaminated.push([contaminated[i][0] - 1, contaminated[i][1]]);
			}
			// if (!this.search2D(contaminated, contaminated[i][0] - 1, contaminated[i][1] + 1) &&
			// (contaminated[i][0] - 1 >= 0) && (contaminated[i][1] + 1 < 35) &&
			// this.checkIfGround(contaminated[i][0] - 1, contaminated[i][1] + 1)) {
			// 	newAddition = true;
			// 	contaminated.push([contaminated[i][0] - 1, contaminated[i][1] + 1]);
			// }
			// ************
			if (!this.search2D(contaminated, contaminated[i][0], contaminated[i][1] - 1) && contaminated[i][1] - 1 >= 0 && this.checkIfGround(contaminated[i][0], contaminated[i][1] - 1)) {
				newAddition = true;
				contaminated.push([contaminated[i][0], contaminated[i][1] - 1]);
			}
			if (!this.search2D(contaminated, contaminated[i][0], contaminated[i][1] + 1) && contaminated[i][1] + 1 < 35 && this.checkIfGround(contaminated[i][0], contaminated[i][1] + 1)) {
				newAddition = true;
				contaminated.push([contaminated[i][0], contaminated[i][1] + 1]);
			}
			// ************
			// if (!this.search2D(contaminated, contaminated[i][0] + 1, contaminated[i][1] - 1) &&
			// (contaminated[i][0] + 1 < 35) && (contaminated[i][1] - 1 >= 0) &&
			// this.checkIfGround(contaminated[i][0] + 1, contaminated[i][1] - 1)) {
			// 	newAddition = true;
			// 	contaminated.push([contaminated[i][0] + 1, contaminated[i][1] - 1]);
			// }
			if (!this.search2D(contaminated, contaminated[i][0] + 1, contaminated[i][1]) && contaminated[i][0] + 1 < 35 && this.checkIfGround(contaminated[i][0] + 1, contaminated[i][1])) {
				newAddition = true;
				contaminated.push([contaminated[i][0] + 1, contaminated[i][1]]);
			}
			// if (!this.search2D(contaminated, contaminated[i][0] + 1, contaminated[i][1] + 1) &&
			// (contaminated[i][0] + 1 < 35) && (contaminated[i][1] + 1 < 35) &&
			// this.checkIfGround(contaminated[i][0] + 1, contaminated[i][1] + 1)) {
			// 	newAddition = true;
			// 	contaminated.push([contaminated[i][0] + 1, contaminated[i][1] + 1]);
			// }
		}

		if (!newAddition) {
			this.contaminated = contaminated;
			break;
		}
	}
	// DISPLAY CONTAMINATED TILES AS CHESTS... DEVELOPMENT ONLY
	// for (let k = 0; k < this.contaminated.length; k++) {
	// 	this.allTiles[this.contaminated[k][0]][this.contaminated[k][1]] = env.chest;
	// }
};

Game.prototype.flood = function () {
	this.mole = [0, 0];
	while (true) {
		// get a starting point to flood from
		if (this.checkIfGround(...this.mole)) break;else {
			if (++this.mole[1] > 34) {
				this.mole[0]++;
				this.mole[1] = 0;
			}
		}
	}
};

Game.prototype.findFlood = function () {
	this.clone = [];
	this.floodedOrigins = this.roomOrigins.filter((pair, index) => {
		if (this.search2D(this.contaminated, ...pair)) {
			return true;
		} else {
			this.clone.push(pair);
		}
	});

	// DISPLAY REMAINING ORIGIN TILES AS POTS... DEVELOPMENT ONLY
	// if (this.clone !== []) {
	// 	for (let k = 0; k < this.clone.length; k++) {
	// 		this.allTiles[this.clone[k][0]][this.clone[k][1]] = env.pot;
	// 	}
	// }
	// for (let z = 0; z < this.floodedOrigins.length; z++) {
	// 	this.allTiles[this.floodedOrigins[z][0]][this.floodedOrigins[z][1]] = env.crate;
	// }
	if (this.clone.length === 0) {
		return false;
	} else {
		return true;
	}
};

Game.prototype.findNearest = function (point, arr) {
	// endpair + array of coords to pick from
	let furthestIndex = 0;
	const furthestDist = 0;
	for (let i = 0; i < arr.length; i++) {
		let distance = 0;
		distance += Math.abs(point[0] - arr[i][0]);
		distance += Math.abs(point[1] - arr[i][1]);
		if (distance > furthestDist) {
			furthestIndex = i;
		}
	}
	return furthestIndex;
};

Game.prototype.digTunnel = function () {
	if (this.clone.length) {
		const goal = this.clone[0];
		const nearestPair = this.floodedOrigins[this.findNearest(goal, this.floodedOrigins)];
		let tunnelY = goal[0] - nearestPair[0]; // if positive, goal is south, if negative, goal is north
		const directionY = tunnelY > 0 ? 'south' : 'north';
		tunnelY = Math.abs(tunnelY);
		let tunnelX = goal[1] - nearestPair[1]; // if positive, goal is east, if negative, goal is west
		const directionX = tunnelX > 0 ? 'east' : 'west';
		tunnelX = Math.abs(tunnelX);

		const current = nearestPair;
		while (tunnelY || tunnelX) {
			let length;
			if (tunnelY < 5) {
				length = tunnelY;
				tunnelY = 0;
			} else {
				length = Math.floor(Math.random() * tunnelY + 1);
				tunnelY -= length;
			}
			if (directionY === 'south') {
				for (let i = 0; i < length; i++) {
					this.allTiles[current[0] + i][current[1]] = env.groundBasic;
				}
				current[0] = current[0] + length;
			} else {
				for (let i = 0; i < length; i++) {
					this.allTiles[current[0] - i][current[1]] = env.groundBasic;
				}
				current[0] = current[0] - length;
			}

			let width;
			if (tunnelX < 5) {
				width = tunnelX;
				tunnelX = 0;
			} else {
				width = Math.floor(Math.random() * tunnelX + 1);
				tunnelX -= width;
			}
			if (directionX === 'east') {
				for (let i = 0; i < width; i++) {
					this.allTiles[current[0]][current[1] + i] = env.groundBasic;
				}
				current[1] = current[1] + width;
			} else {
				for (let i = 0; i < width; i++) {
					this.allTiles[current[0]][current[1] - i] = env.groundBasic;
				}
				current[1] = current[1] - width;
			}
		}
		this.clone.shift();
	}
};

Game.prototype.defineGround = function () {
	for (let i = 0; i < this.allTiles.length; i++) {
		for (let p = 0; p < this.allTiles.length; p++) {
			if (this.allTiles[i][p] !== env.em) this.groundTiles.push([i, p]);else this.wallTiles.push([i, p]);
		}
	}
};

Game.prototype.prettifyWalls = function () {
	const tiles = ['C', 'EDZXC', 'QAZXC', 'QWEDC', 'QWEAZ', 'EDC', 'ZXC', 'XC', 'ZX', 'ED', 'DC', 'QAZ', 'QA', 'AZ', 'QW', 'WE', 'QWE', 'E', 'Z', 'Q', 'QWA', 'QWED', 'QWAZ', 'AZXC', 'QAZX', 'DZXC', 'EDZX', 'W', 'A', 'D', 'X', 'QWEA', 'WED', 'DXC', 'WEDC', 'EDXC', 'AZX', 'QWEADZXC', 'QWEZXC', 'QWEDZXC', 'QWDZXC', 'QWEAXC', 'QWZX', 'WEXC', 'QZXC', 'QWZXC', 'QWEZ', 'QEZX', 'QZXC', 'AX', 'QZ', 'QWZ', 'EXC', 'QWEZX', 'QWEAZX', 'WEZXC', 'QWAZX', 'EZXC', 'QWAZXC', 'WEDZXC', 'QZX', 'WEC', 'QWEDXC', 'QWEC', 'EC', 'QWEXC', 'QWEDZX', 'QWEADZX', 'WEADZXC', 'QWADZXC', 'QWEADXC', 'QWEAZXC', 'QXC', 'QWZC', 'QWXC', 'QE', 'WEDXC', 'ZC', 'ADC', 'QEDZXC', 'ZE', 'QWEDZ', 'QEAZ', 'QWEADZC', 'QAZC', 'QEADZXC', 'EAZ', 'DZ', 'QEC', 'QWEAD', 'QEA', 'QWEADZ', 'EZX', 'WEZ', 'QWEAZC', 'QADZ', 'QADZXC', 'ADXC', 'QEADZ', 'ADZXC', 'QWEAC', 'QD', 'QWC', 'QEDXC', 'QWEADC', 'EDZC', 'EADZC', 'QWADZ', 'QWADZX', 'QAXC', 'QWEDZ', 'EAZXC', 'QEZ', 'AZC', 'WEADZC', 'DZX', 'QC', 'WEAZXC', 'QWEDZC', 'EADZXC', 'WEDZ', 'EA', 'AC', 'QDZ', 'QEADZC', 'QEAZXC', 'QEDC', 'QDZXC', 'QED', 'QAD', 'QXC', 'QWAD', 'QEZXC', 'QZC', 'EADC', 'WEA', 'DZC', 'EADZ', 'EZ', 'AXC', 'QADZX', 'QEAC', 'QDZC', 'QEADZX', 'WEAZX', 'QWDC', 'QDXC', 'ADZ', 'QADZC', 'WEDZX', 'QWAXC', 'QEDZC', 'WEADC', 'EAD', 'QWEZC', 'EAZX', 'QAC', 'QWD', 'QWDZ', 'ADZC', 'QEADC', 'QADC', 'WEDZC', 'EDZ', 'WEAXC', 'WEADZ', 'WEZX', 'QEAZX', 'QEXC', 'AD', 'QEAZC', 'QWDXC', 'QDC', 'QWAC', 'QDZX', 'WEAD', 'ADZX', 'WEAZ', 'EAZC', 'EADZX', 'EAC', 'WEZC', 'WEAZC', 'QWADZC', 'QWAZC', 'QWADC', 'EAXC', 'QEAD', 'EZC', 'QWADXC', 'WEADXC', 'QADXC', 'QEZC'];
	for (let i = 0; i < this.wallTiles.length; i++) {
		let name = '';
		if (this.wallTiles[i][0] - 1 >= 0 && this.wallTiles[i][1] - 1 >= 0 && this.search2D(this.groundTiles, this.wallTiles[i][0] - 1, this.wallTiles[i][1] - 1)) {
			name += 'Q';
		}
		if (this.wallTiles[i][0] - 1 >= 0 && this.search2D(this.groundTiles, this.wallTiles[i][0] - 1, this.wallTiles[i][1])) {
			name += 'W';
		}
		if (this.wallTiles[i][0] - 1 >= 0 && this.wallTiles[i][1] + 1 < 35 && this.search2D(this.groundTiles, this.wallTiles[i][0] - 1, this.wallTiles[i][1] + 1)) {
			name += 'E';
		}
		// *********************
		if (this.wallTiles[i][1] - 1 >= 0 && this.search2D(this.groundTiles, this.wallTiles[i][0], this.wallTiles[i][1] - 1)) {
			name += 'A';
		}
		if (this.wallTiles[i][1] + 1 < 35 && this.search2D(this.groundTiles, this.wallTiles[i][0], this.wallTiles[i][1] + 1)) {
			name += 'D';
		}
		// *********************
		if (this.wallTiles[i][0] + 1 < 35 && this.wallTiles[i][1] - 1 >= 0 && this.search2D(this.groundTiles, this.wallTiles[i][0] + 1, this.wallTiles[i][1] - 1)) {
			name += 'Z';
		}
		if (this.wallTiles[i][0] + 1 < 35 && this.search2D(this.groundTiles, this.wallTiles[i][0] + 1, this.wallTiles[i][1])) {
			name += 'X';
		}
		if (this.wallTiles[i][0] + 1 < 35 && this.wallTiles[i][1] + 1 < 35 && this.search2D(this.groundTiles, this.wallTiles[i][0] + 1, this.wallTiles[i][1] + 1)) {
			name += 'C';
		}
		// ===============================================================================================================
		if (tiles.includes(name)) {
			'included';
			this.allTiles[this.wallTiles[i][0]][this.wallTiles[i][1]] = env[name];
		}
	}
};

Game.prototype.placeItems = function () {
	for (let i = 0; i < 9; i++) {
		const k = Math.floor(Math.random() * this.groundTiles.length);
		if (!this.search2D(this.itemTiles, ...this.groundTiles[k])) {
			this.itemTiles[i] = this.groundTiles[k];
		} else {
			i--; // don't want repeats!
		}
		// this.itemTiles.push((clone.splice(Math.floor(Math.random() * clone.length), 1))[0]);
		// doesn't work, pushing array stores reference so cant search if its in groundtiles after
	}
	this.itemLayer[this.itemTiles[0][0]][this.itemTiles[0][1]] = env.stair;
	for (let m = 1; m < 4; m++) {
		this.itemLayer[this.itemTiles[m][0]][this.itemTiles[m][1]] = env.pot; // 3 pots
	}
	for (let m = 4; m < 6; m++) {
		this.itemLayer[this.itemTiles[m][0]][this.itemTiles[m][1]] = env.crate; // 2 crates
	}
	for (let m = 6; m < 9; m++) {
		this.itemLayer[this.itemTiles[m][0]][this.itemTiles[m][1]] = env.chest; // 3 chests
	}
};

Game.prototype.placeMonsters = function () {
	for (let i = 9; i < 16; i++) {
		// 6 monsters
		const k = Math.floor(Math.random() * this.groundTiles.length);
		if (!this.search2D(this.itemTiles, ...this.groundTiles[k])) {
			this.itemTiles[i] = this.groundTiles[k];
			this.layerThree[this.itemTiles[i][0]][this.itemTiles[i][1]] = env.mobs[Math.floor(Math.random() * 3)];
		} else {
			i--; // don't want repeats!
		}
	}
};

Game.prototype.gamePrep = function () {
	this.fillSolid();
	this.generateRoom();
	this.flood();
	this.contaminate(this.mole);
	while (this.findFlood()) {
		this.digTunnel();
		this.contaminate(this.mole);
	}
	this.defineGround();
	this.prettifyWalls();
	this.placeItems();
	this.placeMonsters();
};

// instance
const myGame = new Game();

myGame.gamePrep();
let timer = '';

// GAME COMPONENT
const GameComponent = React.createClass({
	displayName: 'GameComponent',

	getInitialState() {
		return {
			floor: 1,
			myGame,
			player: {
				health: 100,
				level: 1,
				attack: 5,
				exp: 0,
				coords: [0, 0],
				moving: '',
				maxHealth: 100
			},
			m7: { // BOSS
				attack: 45,
				health: 600
			},
			expTiers: [10, 25, 50, 90, 140, 200, 270, 350, 470, 650],
			message: 'Welcome to the randomly generated dungeon of doom. May fame and glory await!'
		};
	},
	resetMap() {
		myGame.allTiles = [];
		myGame.xOffset = 0;
		myGame.yOffset = 0;
		myGame.groundTiles = [];
		myGame.wallTiles = [];
		myGame.roomOrigins = [];
		myGame.floodedOrigins = [];
		myGame.mole = [0, 0];
		myGame.contaminated = [];
		myGame.clone = [];
		myGame.itemLayer = [];
		myGame.itemTiles = [];
	},
	combat(mobIndex) {
		const update = React.addons.update;
		const myG = this.state.myGame;
		// player hit

		let damage = this.state.player.level / 2 * Math.floor(Math.random() * (this.state.player.attack + 1));
		this.setState({
			message: 'You hit a monster for ' + damage + ' damage!',
			['m' + mobIndex]: update(this.state['m' + mobIndex], {
				health: { $set: this.state['m' + mobIndex].health - damage }
			})
		});
		if (this.state['m' + mobIndex].health <= 0) {
			if (mobIndex === 7) {
				this.gameOver(true);
			}

			this.setState({
				player: update(this.state.player, {
					exp: { $set: this.state.player.exp + this.state['m' + mobIndex].attack / 2 }
				})
			});
			let level = 0;
			for (let i = 0; i < this.state.expTiers.length; i++) {
				if (this.state.player.exp < this.state.expTiers[i]) {
					level = i;
					break;
				}
			}

			this.setState({
				player: update(this.state.player, {
					level: { $set: level + 1 }
				})
			});

			myG.layerThree[myG.itemTiles[mobIndex + 9][0]][myG.itemTiles[mobIndex + 9][1]] = env.transparent;
			this.forceUpdate();
			return;
		}

		// mob retaliate;
		damage = this.state['m' + mobIndex].attack / 2 + Math.floor(Math.random() * (this.state['m' + mobIndex].attack + 1));
		this.setState({
			player: update(this.state.player, {
				health: { $set: this.state.player.health - damage }
			})
		});
		if (this.state.player.health <= 0) {
			this.gameOver(false);
		}
	},
	gameOver(win) {
		// myGame.fillSolid();
		$('#fog').fadeOut();
		$('#filter').fadeOut();
		$(document).unbind('keydown');
		if (win) {
			setTimeout(() => {
				$('#win').css('opacity', 1);
			}, 2000);
		} else {
			setTimeout(() => {
				$('#lose').css('opacity', 1);
			}, 2000);
		}
	},
	move(row, col) {
		const update = React.addons.update;

		if (this.state.myGame.search2D(this.state.myGame.groundTiles, this.state.player.coords[0] + row, this.state.player.coords[1] + col)) {
			let num = 0;
			if (this.state.floor >= 6) {
				num = 17;
			} else {
				num = 16;
			}

			for (let i = 9; i < num; i++) {
				// check for mob
				if (this.state.player.coords[0] + row === this.state.myGame.itemTiles[i][0] && this.state.player.coords[1] + col === this.state.myGame.itemTiles[i][1]) {
					const myG = this.state.myGame;

					if (myG.layerThree[myG.itemTiles[i][0]][myG.itemTiles[i][1]] !== env.transparent) {
						// hitting a mob tile and a mob is there
						this.combat(i - 9);
						return;
					}
				}
			}

			for (let i = 1; i < 4; i++) {
				// check for pot
				if (this.state.player.coords[0] + row === this.state.myGame.itemTiles[i][0] && this.state.player.coords[1] + col === this.state.myGame.itemTiles[i][1]) {
					const myG = this.state.myGame;

					if (myG.itemLayer[myG.itemTiles[i][0]][myG.itemTiles[i][1]] === env.pot) {
						myG.itemLayer[myG.itemTiles[i][0]][myG.itemTiles[i][1]] = env.potOpen;
						myG.layerThree[myG.itemTiles[i][0]][myG.itemTiles[i][1]] = env.potion;
						this.forceUpdate();
						return;
					} else if (myG.layerThree[myG.itemTiles[i][0]][myG.itemTiles[i][1]] === env.potion) {
						myG.layerThree[myG.itemTiles[i][0]][myG.itemTiles[i][1]] = env.transparent;
						this.setState({
							message: 'You drink a potion! It heals you.',
							player: update(this.state.player, { // have to replace the whole object otherwise
								health: { $set: this.state.player.health + 40 }
							})
						});

						if (this.state.player.health > this.state.player.maxHealth) {
							this.setState({
								player: update(this.state.player, {
									health: { $set: this.state.player.maxHealth }
								})
							});
						}
					}
				}
			}

			for (let i = 4; i < 6; i++) {
				// check for crate
				if (this.state.player.coords[0] + row === this.state.myGame.itemTiles[i][0] && this.state.player.coords[1] + col === this.state.myGame.itemTiles[i][1]) {
					const myG = this.state.myGame;
					if (myG.itemLayer[myG.itemTiles[i][0]][myG.itemTiles[i][1]] === env.crate) {
						myG.itemLayer[myG.itemTiles[i][0]][myG.itemTiles[i][1]] = env.crateOpen;
						myG.layerThree[myG.itemTiles[i][0]][myG.itemTiles[i][1]] = env.maxPotion;
						this.forceUpdate();
						return;
					} else if (myG.layerThree[myG.itemTiles[i][0]][myG.itemTiles[i][1]] === env.maxPotion) {
						myG.layerThree[myG.itemTiles[i][0]][myG.itemTiles[i][1]] = env.transparent;
						this.setState({
							message: 'You drink a potion! Your endurance increases.',
							player: update(this.state.player, { // have to replace the whole object otherwise
								maxHealth: { $set: this.state.player.maxHealth + 30 }
							})
						});
					}
				}
			}

			for (let i = 6; i < 9; i++) {
				// check for chest
				if (this.state.player.coords[0] + row === this.state.myGame.itemTiles[i][0] && this.state.player.coords[1] + col === this.state.myGame.itemTiles[i][1]) {
					const myG = this.state.myGame;
					if (myG.itemLayer[myG.itemTiles[i][0]][myG.itemTiles[i][1]] === env.chest) {
						myG.itemLayer[myG.itemTiles[i][0]][myG.itemTiles[i][1]] = env.transparent;
						myG.layerThree[myG.itemTiles[i][0]][myG.itemTiles[i][1]] = env.sword;
						this.forceUpdate();
						return;
					} else if (myG.layerThree[myG.itemTiles[i][0]][myG.itemTiles[i][1]] === env.sword) {
						myG.layerThree[myG.itemTiles[i][0]][myG.itemTiles[i][1]] = env.transparent;
						this.setState({
							message: 'You found a weapon. How terrifying.',
							player: update(this.state.player, { // have to replace the whole object otherwise
								attack: { $set: this.state.player.attack + 5 }
							})
						});
					}
				}
			}

			this.setState({
				player: update(this.state.player, {
					coords: { $set: [this.state.player.coords[0] + row, this.state.player.coords[1] + col] }
				})
			});

			if (this.state.player.coords[0] === this.state.myGame.itemTiles[0][0] && this.state.player.coords[1] === this.state.myGame.itemTiles[0][1]) {
				// going down stairs
				setTimeout(() => {
					this.setState({
						floor: this.state.floor + 1
					});
					this.resetMap();
					myGame.gamePrep();
					this.plopDown();

					if (this.state.floor > 5) {
						this.summonBoss(); // after everything else so the tiles wont overlap
					}
				}, 100);
			}
		}
	},
	summonBoss() {
		while (true) {
			// loop until we find a free tile
			this.setState({
				message: 'Uh Oh! You sense an ominous presence...'
			});
			const k = Math.floor(Math.random() * this.state.myGame.groundTiles.length);
			if (!this.state.myGame.search2D(this.state.myGame.itemTiles, ...this.state.myGame.groundTiles[k])) {
				this.state.myGame.itemTiles[16] = this.state.myGame.groundTiles[k];
				this.state.myGame.layerThree[this.state.myGame.itemTiles[16][0]][this.state.myGame.itemTiles[16][1]] = env.slime;
				break;
			}
		}
		this.forceUpdate();
	},
	componentWillMount() {
		this.plopDown();
		$(document).keydown(e => {
			this.startMove(e);
		});
		$(document).keyup(() => {
			this.stopMove();
		});
	},
	plopDown() {
		const update = React.addons.update;

		function randomizeStats(floor, atk) {
			if (atk) return Math.floor(Math.random() * (floor * 5)) + floor * 3;else return Math.floor(Math.random() * (floor * 10)) + floor * 4;
		}
		this.setState({
			player: update(this.state.player, { // have to replace the whole object otherwise
				coords: { $set: this.state.myGame.groundTiles[Math.floor(Math.random() * this.state.myGame.groundTiles.length)] }
			})
		});
		this.forceUpdate();

		const stats = [];
		for (let i = 0; i < 7; i++) {
			stats[0] = randomizeStats(this.state.floor, true);
			stats[1] = randomizeStats(this.state.floor, false);
			this.setState({
				['m' + i]: {
					attack: stats[0],
					health: stats[1]
				}
			});
		}
	},
	stopMove() {
		clearInterval(timer);
		timer = '';
	},
	startMove(e) {
		if (timer === '') {
			if (e.keyCode === 40) {
				this.move(1, 0);
				timer = setInterval(() => {
					this.move(1, 0);
				}, 160);
			} else if (e.keyCode === 37) {
				// left arrow key
				this.move(0, -1);
				timer = setInterval(() => {
					this.move(0, -1);
				}, 160);
			} else if (e.keyCode === 39) {
				// right arrow key
				this.move(0, 1);
				timer = setInterval(() => {
					this.move(0, 1);
				}, 160);
			} else if (e.keyCode === 38) {
				// up arrow key
				this.move(-1, 0);
				timer = setInterval(() => {
					this.move(-1, 0);
				}, 160);
			}
		}
	},
	render() {
		const tiles = [];
		for (let i = 0; i < this.state.myGame.allTiles.length; i++) {
			tiles.push(React.createElement(
				'div',
				{ className: 'tileRow' },
				this.state.myGame.allTiles[i].map(function (item) {
					return React.createElement(TileComponent, { envTile: item });
				})
			));
		}
		const itemLayer = [];
		for (let i = 0; i < this.state.myGame.itemLayer.length; i++) {
			itemLayer.push(React.createElement(
				'div',
				{ className: 'tileRow' },
				this.state.myGame.itemLayer[i].map(function (item) {
					return React.createElement(TileComponent, { envTile: item });
				})
			));
		}
		const layer3 = [];
		for (let i = 0; i < this.state.myGame.layerThree.length; i++) {
			layer3.push(React.createElement(
				'div',
				{ className: 'tileRow' },
				this.state.myGame.layerThree[i].map(function (item) {
					return React.createElement(TileComponent, { item: true, envTile: item });
				})
			));
		}
		return React.createElement(
			'div',
			{ id: 'allGame' },
			React.createElement(
				'div',
				{ id: 'items', className: 'trans' },
				' ',
				itemLayer,
				' '
			),
			React.createElement(
				'div',
				{ id: 'layer3', className: 'trans' },
				' ',
				layer3,
				' '
			),
			React.createElement(
				'div',
				{ id: 'board' },
				' ',
				tiles,
				React.createElement(PlayerComponent, { coords: this.state.player.coords, player: this.state.player, game: this.state.myGame })
			),
			React.createElement(Stats, { floor: this.state.floor, health: this.state.player.health, max: this.state.player.maxHealth, msg: this.state.message, level: this.state.player.level, attack: this.state.player.attack })
		);
	}
});

const Stats = React.createClass({
	displayName: 'Stats',

	render() {
		return React.createElement(
			'div',
			null,
			React.createElement(
				'div',
				null,
				'Floor: ',
				this.props.floor
			),
			React.createElement(
				'div',
				null,
				'Level: ',
				this.props.level
			),
			React.createElement(
				'div',
				null,
				'Health: ',
				this.props.health,
				' / ',
				this.props.max
			),
			React.createElement(
				'div',
				null,
				'Attack: ',
				this.props.attack
			),
			React.createElement(
				'div',
				null,
				'> ',
				this.props.msg
			)
		);
	}
});

const TileComponent = React.createClass({
	displayName: 'TileComponent',

	render() {
		if (this.props.item) {
			if (myGame.search2D(env.mobs, ...this.props.envTile)) {
				return React.createElement('div', { className: 'tile itembg mob', style: { backgroundPosition: this.props.envTile[0] + 'px ' + this.props.envTile[1] + 'px' } });
			} else {
				return React.createElement('div', { className: 'tile itembg', style: { backgroundPosition: this.props.envTile[0] + 'px ' + this.props.envTile[1] + 'px' } });
			}
		} else {
			return React.createElement('div', { className: 'tile', style: { backgroundPosition: this.props.envTile[0] + 'px ' + this.props.envTile[1] + 'px' } });
		}
	}
});

const PlayerComponent = React.createClass({
	displayName: 'PlayerComponent',

	render() {
		const fogY = -790 + this.props.coords[1] * 24;
		const fogX = -720 + (this.props.coords[0] * 24 - 40);
		$('#fog').css('background-position', fogY + 'px ' + fogX + 'px');
		$('#filter').css('background-position', fogY + 'px ' + fogX + 'px');

		const top = this.props.coords[0] * 24 - 20;
		const left = this.props.coords[1] * 24;
		if (firefox) {
			if (padding) {
				return React.createElement('div', { id: 'player', style: { top: this.props.coords[0] * 22 - 10 + 'px', left: this.props.coords[1] * 24 + screenwidth / 2 - 450 + 7 + 'px' } });
			} else {
				return React.createElement('div', { id: 'player', style: { top: this.props.coords[0] * 22 - 10 + 'px', left: this.props.coords[1] * 24 + 7 + 'px' } });
			}
		}

		if (padding) {
			return React.createElement('div', { id: 'player', style: { top: top + 'px', left: left + screenwidth / 2 - 450 + 7 + 'px' } });
		} else {
			return React.createElement('div', { id: 'player', style: { top: top + 'px', left: left + 7 + 'px' } });
		}
	}
});

// RENDER OUT
ReactDOM.render(React.createElement(GameComponent, null), document.getElementById('root'));