const one = 16; // represents one tile

const env = { // coords on spritesheet
	// FLOOR
	groundBasic: [one * -6, 0],
	groundRandom: [[one * -6, one * -3], [one * -7, one * -3], [one * -8, one * -3], [one * -9, one * -3], [one * -7, 0], [one * -8, 0],
	[one * -9, 0], [one * -10, 0], [one * -7, -one], [one * -8, -one], [one * -9, -one], [one * -10, -one], [one * -8, one * -2],
	[one * -9, one * -2], [one * -10, one * -2], [one * -11, one * -2], [one * -12, one * -2],],
	chest: [one * -14, one * -8],
	stair: [one * -5, one * -4],
	crateOpen: [one * -13, one * -6],
	potOpen: [one * -13, one * -2],
	// PROPS
	crate: [one * -13, one * -5],
	pot: [one * -13, 0],
	// WALLS
	em: [one * -1, one * -1], // empty. dark.
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
	'AXC': [0, one * -2],
	'AZX': [0, one * -2],
	'AZXC': [0, one * -2],
	'QWXC': [one * -9, one * -4],
	'QXC': [0, one * -2],
	'AC': [0, one * -2],
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
	'EZXC': [one * -11, one * -7],
	'EXC': [one * -11, one * -7],

	'QEDXC': [one * -7, one * -6],
	'WEDZ': [one * -7, one * -5],
	'QWEDZ': [one * -7, one * -5],
	'EAZX': [one * -6, one * -6],
	'QEAZXC': [one * -6, one * -6],
	'WEAXC': [one * -6, one * -4],
	'QWEAC': [one * -6, one * -5],
	'QWEAZC': [one * -6, one * -5],
	'QWADZX': [one * -5, one * -6],
	'QWEADZX': [one * -5, one * -6],
	'WEADZXC': [one * -5, one * -6],
	'QWADZXC': [one * -5, one * -6],
	'QWEADXC': [one * -5, one * -6],


};

// GAME CLASS

// constructor
function Game() {
	this.windowWidth = 24 * 35; // 35 tiles
	this.windowHeight = 24 * 35;
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
}

Game.prototype.fillSolid = function () {
	console.log('starting fill');
	for (let i = 0; i < 35; i++) { // fill with solid
		this.allTiles[i] = [];
		for (let p = 0; p < 35; p++) {
			this.allTiles[i][p] = env.em;
		}
	}
	console.log('fill end');
};

Game.prototype.generateRoom = function () {
	for (let room = 0; room < (Math.floor(Math.random() * 4) + 10); room++) {
		const originRow = (Math.floor(Math.random() * 29));
		const originCol = (Math.floor(Math.random() * 25));
		this.roomOrigins.push([originRow + 3, originCol + 3]);

		for (let i = originRow; i < (Math.floor(Math.random() * 4) + 4) + originRow; i++) {
			for (let p = (originCol - (Math.floor(Math.random() * 3)) + (Math.floor(Math.random() * 3))); p < (Math.floor(Math.random() * 4) + 8) + originCol; p++) {
				const randomGround = (Math.floor(Math.random() * 150));
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
	if (this.allTiles[row][col] === env.em)
		return false;
	else
		return true;
};

Game.prototype.search2D = function (arr, row, col) { // searching for an array inside a multidimensional array just returns false
	for (let i = 0; i < arr.length; i++) { // so I have to compare each pair individually
		if (arr[i][0] == row && arr[i][1] == col)
			return true;
	}
	return false;
};

Game.prototype.contaminate = function (mole) {
	console.log('starting flood');
	this.contaminated = [mole];
	const contaminated = this.contaminated;

	let newAddition = true;
	while (newAddition) {
		newAddition = false;
		const length = contaminated.length;
		for (let i = 0; i < length; i++) { // i turned off corner checking because making the player go through 1 tile diagonals doesnt make a good UX
			// if (!this.search2D(contaminated, contaminated[i][0] - 1, contaminated[i][1] - 1) &&
			// (contaminated[i][0] - 1 >= 0) && (contaminated[i][1] - 1 >= 0) &&
			// this.checkIfGround(contaminated[i][0] - 1, contaminated[i][1] - 1)) {
			// 	newAddition = true;
			// 	contaminated.push([contaminated[i][0] - 1, contaminated[i][1] - 1]);
			// }
			if (!this.search2D(contaminated, contaminated[i][0] - 1, contaminated[i][1]) && (contaminated[i][0] - 1 >= 0) &&
			this.checkIfGround(contaminated[i][0] - 1, contaminated[i][1])) {
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
			if (!this.search2D(contaminated, contaminated[i][0], contaminated[i][1] - 1) && (contaminated[i][1] - 1 >= 0) &&
			this.checkIfGround(contaminated[i][0], contaminated[i][1] - 1)) {
				newAddition = true;
				contaminated.push([contaminated[i][0], contaminated[i][1] - 1]);
			}
			if (!this.search2D(contaminated, contaminated[i][0], contaminated[i][1] + 1) && (contaminated[i][1] + 1 < 35) &&
			this.checkIfGround(contaminated[i][0], contaminated[i][1] + 1)) {
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
			if (!this.search2D(contaminated, contaminated[i][0] + 1, contaminated[i][1]) && (contaminated[i][0] + 1 < 35) &&
			this.checkIfGround(contaminated[i][0] + 1, contaminated[i][1])) {
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
			console.log('flood end');
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
	while (true) { // get a starting point to flood from
		if (this.checkIfGround(...this.mole))
			break;
		else {
			if (++this.mole[1] > 34) {
				this.mole[0]++;
				this.mole[1] = 0;
			}
		}
	}
};

Game.prototype.findFlood = function () {
	console.log('original: ' + JSON.stringify(this.roomOrigins));
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

Game.prototype.findNearest = function (point, arr) { // endpair + array of coords to pick from
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
	if (this.clone !== []) { //
		console.log('dig start');

		const goal = this.clone[0];
		const nearestPair = this.floodedOrigins[this.findNearest(goal, this.floodedOrigins)];
		let tunnelY = goal[0] - nearestPair[0]; // if positive, goal is south, if negative, goal is north
		const directionY = (tunnelY > 0) ? 'south' : 'north';
		tunnelY = Math.abs(tunnelY);
		let tunnelX = goal[1] - nearestPair[1]; // if positive, goal is east, if negative, goal is west
		const directionX = (tunnelX > 0) ? 'east' : 'west';
		tunnelX = Math.abs(tunnelX);

		const current = nearestPair;
		console.log(goal);
		console.log(nearestPair);
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
		console.log('dig end');
		this.clone.shift();
	}
};

Game.prototype.defineGround = function () {
	for (let i = 0; i < this.allTiles.length; i++) {
		for (let p = 0; p < this.allTiles.length; p++) {
			if (this.allTiles[i][p] !== env.em)
				this.groundTiles.push([i, p]);
			else
				this.wallTiles.push([i, p]);
		}
	}
};

Game.prototype.prettifyWalls = function () {
	console.log('wall generating');
	const tiles = ['C', 'EDZXC', 'QAZXC', 'QWEDC', 'QWEAZ',
	'EDC', 'ZXC', 'XC', 'ZX', 'ED', 'DC', 'QAZ', 'QA', 'AZ',
	'QW', 'WE', 'QWE', 'E', 'Z', 'Q', 'QWA', 'QWED',
	'QWAZ', 'AZXC', 'QAZX', 'DZXC', 'EDZX', 'W', 'A', 'D', 'X',
	'QWEA', 'WED', 'DXC', 'WEDC', 'EDXC', 'AZX',
	'QWEADZXC', 'QWEZXC', 'QWEDZXC', 'QWDZXC', 'QWEAXC',
	'QWZX', 'WEXC', 'QZXC', 'QWZXC', 'QWEZ',
	'QZXC', 'AX', 'QZ', 'QWZ', 'EXC', 'QWEZX',
	'QWEAZX', 'WEZXC', 'QWAZX', 'EZXC', 'QWAZXC', 'WEDZXC',
	'QZX', 'WEC', 'QWEDXC', 'QWEC', 'EC', 'QWEXC',
	'QWEDZX', 'QWEADZX', 'WEADZXC', 'QWADZXC', 'QWEADXC',
	'QWEAZXC', 'QXC', 'QWZC', 'QWXC', 'QE', 'WEDXC', 'ZC',
	'ADC', 'QEDZXC', 'ZE', 'QWEDZ', 'QEAZ', 'QWEADZC',
	'QAZC', 'QEADZXC', 'EAZ', 'DZ', 'QEC', 'QWEAD', 'QEA', 'QWEADZ',
	'EZX', 'WEZ', 'QWEAZC', 'QADZ', 'QADZXC', 'ADXC', 'QEADZ',
	'ADZXC', 'QWEAC', 'QD', 'QWC', 'QEDXC', 'QWEADC', 'EDZC',
	'EADZC', 'QWADZ', 'QWADZX', 'QAXC', 'QWEDZ', 'EAZXC', 'QEZ',
	'AZC', 'WEADZC', 'DZX', 'QC', 'WEAZXC', 'QWEDZC', 'EADZXC',
	'WEDZ', 'EA', 'AC', 'QDZ', 'QEADZC', 'QEAZXC', 'QEDC', 'QDZXC',
	'QED', 'QAD', 'QXC', 'QWAD', 'QEZXC', 'QZC', 'EADC', 'WEA',
	'DZC', 'EADZ', 'EZ', 'AXC', 'QADZX', 'QEAC', 'QDZC', 'QEADZX',
	'WEAZX', 'QWDC', 'QDXC', 'ADZ', 'QADZC', 'WEDZX', 'QWAXC',
	'QEDZC', 'WEADC', 'EAD', 'QWEZC', 'EAZX', 'QAC', 'QWD', 'QWDZ',
	'ADZC', 'QEADC', 'QADC', 'WEDZC', 'EDZ', 'WEAXC', 'WEADZ', 'WEZX',
	'QEAZX', 'QEXC', 'AD', 'QEAZC', 'QWDXC', 'QDC', 'QWAC', 'QDZX',
	'WEAD', 'ADZX', 'WEAZ', 'EAZC', 'EADZX', 'EAC', 'WEZC', 'WEAZC', 'QWADZC'];
	for (let i = 0; i < this.wallTiles.length; i++) {
		let name = '';
		if ((this.wallTiles[i][0] - 1 >= 0) && (this.wallTiles[i][1] - 1 >= 0) &&
		(this.search2D(this.groundTiles, this.wallTiles[i][0] - 1, this.wallTiles[i][1] - 1))) {
			name += 'Q';
		}
		if ((this.wallTiles[i][0] - 1 >= 0) && (this.search2D(this.groundTiles, this.wallTiles[i][0] - 1, this.wallTiles[i][1]))) {
			name += 'W';
		}
		if ((this.wallTiles[i][0] - 1 >= 0) && (this.wallTiles[i][1] + 1 < 35) &&
		(this.search2D(this.groundTiles, this.wallTiles[i][0] - 1, this.wallTiles[i][1] + 1))) {
			name += 'E';
		}
		// *********************
		if ((this.wallTiles[i][1] - 1 >= 0) && (this.search2D(this.groundTiles, this.wallTiles[i][0], this.wallTiles[i][1] - 1))) {
			name += 'A';
		}
		if ((this.wallTiles[i][1] + 1 < 35) && (this.search2D(this.groundTiles, this.wallTiles[i][0], this.wallTiles[i][1] + 1))) {
			name += 'D';
		}
		// *********************
		if ((this.wallTiles[i][0] + 1 < 35) && (this.wallTiles[i][1] - 1 >= 0) &&
		(this.search2D(this.groundTiles, this.wallTiles[i][0] + 1, this.wallTiles[i][1] - 1))) {
			name += 'Z';
		}
		if ((this.wallTiles[i][0] + 1 < 35) && (this.search2D(this.groundTiles, this.wallTiles[i][0] + 1, this.wallTiles[i][1]))) {
			name += 'X';
		}
		if ((this.wallTiles[i][0] + 1 < 35) && (this.wallTiles[i][1] + 1 < 35) &&
		(this.search2D(this.groundTiles, this.wallTiles[i][0] + 1, this.wallTiles[i][1] + 1))) {
			name += 'C';
		}
		// ===============================================================================================================
		if (tiles.includes(name)) {
			console.log('included');
			this.allTiles[this.wallTiles[i][0]][this.wallTiles[i][1]] = env[name];
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
};


// instance
const myGame = new Game();

console.log('go!');
myGame.gamePrep();

// GAME COMPONENT
const GameComponent = React.createClass({
	getInitialState() {
		return {
			myGame,
		};
	},
	render() {
		const tiles = [];
		for (let i = 0; i < this.state.myGame.allTiles.length; i++) {
			tiles.push(<div className='tileRow'>{this.state.myGame.allTiles[i].map(function (item) {
				return <TileComponent className='tile' envTile={item} />;
			})}</div>);
		}
		return (
			<div> {tiles}
				<PlayerComponent gTiles={this.state.myGame.groundTiles} />
			</div>
		);
	},
});

const TileComponent = React.createClass({
	render() {
		return (
			<div className='tile' style={{ backgroundPosition: this.props.envTile[0] + 'px ' + this.props.envTile[1] + 'px' }} ></div>
			);
	},
});

const PlayerComponent = React.createClass({
	getInitialState() {
		return ({
			health: 100,
			level: 1,
			attack: 5,
			exp: 0,
			coords,
		});
	},
	plopDown() {
		this.state.coords = this.props.gTiles[Math.floor(Math.random() * this.props.gTiles.length)];
	},
	render() {
		return (
			<div id='player'></div>
		);
	},
});

// RENDER OUT
ReactDOM.render(<GameComponent/>, document.getElementById('root'));
