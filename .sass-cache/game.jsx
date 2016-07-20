const one = 16; // represents one tile

const env = { // coords on spritesheet
	// FLOOR
	groundBasic: [one * -6, 0],
	groundRandom: [[one * -6, one * -3], [one * -7, one * -3], [one * -8, one * -3], [one * -9, one * -3], [one * -7, 0], [one * -8, 0],
	[one * -9, 0], [one * -10, 0], [one * -7, -one], [one * -8, -one], [one * -9, -one], [one * -10, -one],],
	chest: [one * -14, one * -8],
	stair: [one * -5, one * -4],
	crateOpen: [one * -13, one * -6],
	potOpen: [one * -13, one * -2],
	// PROPS
	crate: [one * -13, one * -5],
	pot: [one * -13, 0],
	// WALLS
	em: [one * -1, one * -1], // empty. black.
	b: [one * -1, 0],
	r: [0, one * -1],
	l: [one * -2, one * -1],
	t: [one * -1, one * -2],
	obr: [0, 0], // bottom-right corner, facing out
	obl: [one * -2, 0],
	otr: [0, one * -2],
	otl: [one * -2, one * -2],
	itl: [one * -3, 0],
	itr: [one * -4, 0],
	ibl: [one * -3, one * -1],
	ibr: [one * -4, one * -1],
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
	this.roomOrigins = [];
	this.floodedOrigins = [];
	this.mole = [0, 0];
	this.contaminated = [];
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
				this.groundTiles.push([i, p]);
				const randomGround = (Math.floor(Math.random() * 150));
				if (randomGround > 11) {
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
	const contaminated = [mole];

	let newAddition = true;
	while (newAddition) {
		newAddition = false;
		const length = contaminated.length;
		for (let i = 0; i < length; i++) {
			if (!this.search2D(contaminated, contaminated[i][0] - 1, contaminated[i][1] - 1) &&
			(contaminated[i][0] - 1 >= 0) && (contaminated[i][1] - 1 >= 0) &&
			this.checkIfGround(contaminated[i][0] - 1, contaminated[i][1] - 1)) {
				newAddition = true;
				contaminated.push([contaminated[i][0] - 1, contaminated[i][1] - 1]);
			}
			if (!this.search2D(contaminated, contaminated[i][0] - 1, contaminated[i][1]) && (contaminated[i][0] - 1 >= 0) &&
			this.checkIfGround(contaminated[i][0] - 1, contaminated[i][1])) {
				newAddition = true;
				contaminated.push([contaminated[i][0] - 1, contaminated[i][1]]);
			}
			if (!this.search2D(contaminated, contaminated[i][0] - 1, contaminated[i][1] + 1) &&
			(contaminated[i][0] - 1 >= 0) && (contaminated[i][1] + 1 < 35) &&
			this.checkIfGround(contaminated[i][0] - 1, contaminated[i][1] + 1)) {
				newAddition = true;
				contaminated.push([contaminated[i][0] - 1, contaminated[i][1] + 1]);
			}
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
			if (!this.search2D(contaminated, contaminated[i][0] + 1, contaminated[i][1] - 1) &&
			(contaminated[i][0] + 1 < 35) && (contaminated[i][1] - 1 >= 0) &&
			this.checkIfGround(contaminated[i][0] + 1, contaminated[i][1] - 1)) {
				newAddition = true;
				contaminated.push([contaminated[i][0] + 1, contaminated[i][1] - 1]);
			}
			if (!this.search2D(contaminated, contaminated[i][0] + 1, contaminated[i][1]) && (contaminated[i][0] + 1 < 35) &&
			this.checkIfGround(contaminated[i][0] + 1, contaminated[i][1])) {
				newAddition = true;
				contaminated.push([contaminated[i][0] + 1, contaminated[i][1]]);
			}
			if (!this.search2D(contaminated, contaminated[i][0] + 1, contaminated[i][1] + 1) &&
			(contaminated[i][0] + 1 < 35) && (contaminated[i][1] + 1 < 35) &&
			this.checkIfGround(contaminated[i][0] + 1, contaminated[i][1] + 1)) {
				newAddition = true;
				contaminated.push([contaminated[i][0] + 1, contaminated[i][1] + 1]);
			}
		}

		if (!newAddition) {
			console.log('flood end');
			this.contaminated = contaminated;
			break;
		}
	}
	// DISPLAY CONTAMINATED TILES AS CHESTS... DEVELOPMENT ONLY
	for (let k = 0; k < this.contaminated.length; k++) {
		this.allTiles[this.contaminated[k][0]][this.contaminated[k][1]] = env.chest;
	}

	this.findFlood();
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
	console.log(this.mole);
	this.contaminate(this.mole);
};

Game.prototype.findFlood = function () {
	console.log('original: ' + JSON.stringify(this.roomOrigins));
	const clone = [];
	this.floodedOrigins = this.roomOrigins.filter((pair, index) => {
		if (this.search2D(this.contaminated, ...pair)) {
			return true;
		} else {
			clone.push(pair);
		}
	});
	this.roomOrigins = clone;
	// DISPLAY REMAINING ORIGIN TILES AS POTS... DEVELOPMENT ONLY
	if (this.roomOrigins !== []) {
		for (let k = 0; k < this.roomOrigins.length; k++) {
			this.allTiles[this.roomOrigins[k][0]][this.roomOrigins[k][1]] = env.pot;
		}
	}
	for (let z = 0; z < this.floodedOrigins.length; z++) {
		this.allTiles[this.floodedOrigins[z][0]][this.floodedOrigins[z][1]] = env.crate;
	}

	this.digTunnel();
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
	if (this.roomOrigins !== []) { // only dig if theres something to dig to
		console.log('dig start');

		const goal = this.roomOrigins[0];
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
	}
};


// instance
const myGame = new Game();

myGame.fillSolid();
myGame.generateRoom();
myGame.flood();


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
			<div> {tiles} </div>
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


// RENDER OUT
ReactDOM.render(<GameComponent/>, document.getElementById('root'));
