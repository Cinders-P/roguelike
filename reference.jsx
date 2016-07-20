/* game.js */
function Game() {
    										this.status = 'playing';
    										this.fog = true;
    										this.shouldUpdateMap = true;
    										this.moveDelay = 0;
}

const game = new Game();

window.onload = function () {
    										ReactDOM.render(
        <GameView game={game}/>, document.getElementById('container'));
};

Game.prototype.gameLoop = function (view) {
    										let key = this.key,
        										player = this.player,
        										locationChange = 0;

    										if (this.moveDelay > 0) {
        										this.moveDelay--;
    }

    										if (key.isDown('left')) {
        										locationChange -= 1;
    }
    										if (key.isDown('up')) {
        										locationChange -= this.map.size;
    }
    										if (key.isDown('right')) {
        										locationChange += 1;
    }
    										if (key.isDown('down')) {
        										locationChange += this.map.size;
    }

    										if (player.collision !== locationChange) {
        										player.collision = 0;
    }

    										if (locationChange && player.collision !== locationChange && !this.moveDelay) {
        										this.moveDelay = 5;
        										this.shouldUpdateMap = false;
        										this.movePlayer(locationChange);
        										view.update();

        										if (this.shouldUpdateMap) {
            // Double update so tiles update the same time as map on rendering new level
            										view.update();
        }
    }
};

/* map.js */
Game.prototype.map = {
    										locationIds: [],
    										occupiedLocs: [],
    										visibleLocs: [],
    										edgeTiles: [],
    										size: 37,
    										tileSize: 32,
    										adjacentBorders: [
        										[
            																				0, -1,
        										],
        										[
            																				-1, 0,
        										],
        										[
            																				1, 0,
        										],
        [0, 1],
    ],
    										cornerBorders: [
        										[
            																				-1, -1,
        										],
        										[
            																				1, -1,
        										],
        										[
            																				-1, 1,
        										],
        [1, 1],
    ],
    										x: 0,
    										y: 0,
};

Game.prototype.tileTypes = {
    // arrays countain x and y coordinates in spritesheet
    // land borders:

    // bottom-right
    										'se': [
        										1, 0,
    ],
    // bottom-left
    										'sw': [
        										2, 0,
    ],
    // top-right
    										'ne': [
        										1, 1,
    ],
    // top-left
    										'nw': [
        										2, 1,
    ],
    // top and left
    										'n-w-': [
        										0, 2,
    ],
    // top
    										'n-': [
        										1, 2,
    ],
    // top and right
    										'n-e-': [
        										2, 2,
    ],
    // left
    										'w-': [
        										0, 3,
    ],
    // right
    										'e-': [
        										2, 3,
    ],
    // bottom and left
    										'w-s': [
        										0, 4,
    ],
    // bottom
    										's': [
        										1, 4,
    ],
    // bottom and right
    										'e-s': [2, 4],
};

Game.prototype.generateLocationIds = function () {
    // Walkable locations based on rooms' dimensions and coords

    										let locations = [],
        										game = this,
        										location;

    										dungeons[this.currentDungeon].rooms.forEach(function (room, index) {
        										game.setRoomMeta(index);

        										for (let y = room.y; y < room.y + room.height; y++) {
            										for (let x = room.x; x < room.x + room.width; x++) {
                										location = game.getLocation(x, y);
                										locations.push(location);
            }
        }
    });

    										game.map.locationIds = locations;
};

Game.prototype.setVisibleLocs = function () {
    										let playerCoords = this.getCoordinates(this.player.location),
        										sightRadius = this.player.sight,
        										sightX = playerCoords[0] - sightRadius,
        										sightY = playerCoords[1] - sightRadius,
        										sightLength = sightRadius * 2 + 1,
        										location,
        										distance;

    // Locations that are within [sightRadius] tiles away from player
    // Should be same number of tiles revealed by sight clipping mask
    										for (let y = sightY; y < sightY + sightLength; y++) {
        										for (let x = sightX; x < sightX + sightLength; x++) {
            										distance = Math.abs(playerCoords[0] - x) + Math.abs(playerCoords[1] - y);
            										if (distance <= sightRadius) {
                										location = this.getLocation(x, y);
                										this.map.visibleLocs.push(location);
            }
        }
    }
};

Game.prototype.setEdgeTiles = function () {
    										let game = this,
        										location,
        										tileType;

    										dungeons[this.currentDungeon].rooms.forEach(function (room) {
        										let edgeX = room.x - 1,
            										edgeY = room.y - 1,
            										edgeHeight = room.height + 2,
            										edgeWidth = room.width + 2;

        										for (let y = edgeY; y < edgeY + edgeHeight; y++) {
            										for (let x = edgeX; x < edgeX + edgeWidth; x++) {
                										if (x === edgeX || x === edgeX + edgeWidth - 1 || y === edgeY || y === edgeY + edgeHeight - 1) {
                    										location = game.getLocation(x, y);

                    										if (game.map.locationIds.indexOf(location) === -1) {
                        										tileType = game.getEdgeTileType(location);
                        										game.map.edgeTiles.push({ location, type: tileType });
                    }
                }
            }
        }
    });
};

Game.prototype.getEdgeTileType = function (location) {
    										let tileX = this.getCoordinates(location)[0],
        										tileY = this.getCoordinates(location)[1],
        										landBorders = this.findLandBorders(tileX, tileY);

    										return this.tileTypes[landBorders];
};

Game.prototype.findLandBorders = function (tileX, tileY) {
    										let game = this,
        										neighborLoc,
        										landBorders = '',
        										side = this.map.adjacentBorders,
        										corner = this.map.cornerBorders,
        										x,
        										y;

    // Edge tiles only border a side tile, corner tile or is a corner itself
    // Possible border combinations = 12

    										function getDirectionString(border) {
        										x = border[0];
        										y = border[1];
        										neighborLoc = game.getLocation(tileX + x, tileY + y);
        										if (game.map.locationIds.indexOf(neighborLoc) > -1) {
            										landBorders += game.directionStrings[y + 1][x + 1];
        }
    }

    										side.forEach(getDirectionString);

    // Don't count corner tiles if already bordering side tile
    										if (!landBorders) {
        										corner.forEach(getDirectionString);
    }

    										return landBorders;
};

Game.prototype.directionStrings = [
    										[
        																				'nw', 'n-', 'ne',
    										],
    										[
        																				'w-', '', 'e-',
    										],
    ['sw', 's', 'se'],
];

Game.prototype.setRoomMeta = function (index) {
    										dungeons[this.currentDungeon].rooms[index].id = index;
    										dungeons[this.currentDungeon].rooms[index].entityCount = 0;
};

Game.prototype.getCoordinates = function (location) {
    										let y = Math.floor(location / this.map.size),
        										x = location % this.map.size;
    										return [x, y];
};

Game.prototype.getLocation = function (x, y) {
    										return x + (this.map.size * y);
};

Game.prototype.placeInMap = function (entity) {
    										let room = this.getRandomRoom(entity.type),
        										location;

    										if (entity.type === 'boss') {
        // Boss takes up four tiles
        										location = [];
        										location[0] = this.getRandomLocation(room, entity.type);
        										location[1] = location[0] + 1;
        										location[2] = location[0] + this.map.size;
        										location[3] = location[2] + 1;
    } else {
        										location = this.getRandomLocation(room, entity.type);
    }

    										entity.location = location;

    										if (entity.type === 'player') {
        										this.moveMap();
    }
};

Game.prototype.getRandomRoom = function (entityType) {
    										const rooms = dungeons[this.currentDungeon].rooms;
    										const availableRooms = rooms.filter(function (room) {
        // Filter out hallways
        										if (room.width > 1 && room.height > 1) {
            // Exit/boss shouldn't spawn in the same room as player
            										if (entityType === 'exit' || entityType === 'boss') {
                										return !room.hasPlayer;
            } else {
                										return room.entityCount < 3;
            }
        }
    });

    										let roomIndex = Math.floor(Math.random() * availableRooms.length),
        										chosenRoom = availableRooms[roomIndex];

    										if (entityType === 'player') {
        										rooms[chosenRoom.id].hasPlayer = true;
    }

    										rooms[chosenRoom.id].entityCount++;

    										return chosenRoom;
};

Game.prototype.getRandomLocation = function (room, entityType) {
    										let x,
        										y,
        										placed,
        										location,
        										adjustedWidth = room.width,
        										adjustedHeight = room.height,
        										adjustedX = room.x,
        										adjustedY = room.y;

    										if (entityType === 'exit') {
        // Avoid placing exit near edge. Might block hallway
        										adjustedWidth -= 2;
        										adjustedHeight -= 2;
        										adjustedX++;
        										adjustedY++;
    }

    										while (!placed) {
        										if (entityType === 'boss') {
            // Place boss in middle of room
            										x = adjustedX + Math.ceil(adjustedWidth / 2) - 1;
            										y = adjustedY + Math.ceil(adjustedHeight / 2) - 1;
        } else {
            										x = Math.floor(Math.random() * adjustedWidth + adjustedX);
            										y = Math.floor(Math.random() * adjustedHeight + adjustedY);
        }
        										location = x + (this.map.size * y);

        										if (this.map.occupiedLocs.indexOf(location) > -1 || location === game.player.location) {
            // blocked
        } else {
            										placed = true;
        }
    }

    										return location;
};

Game.prototype.moveMap = function () {
    										let playerX = this.getCoordinates(this.player.location)[0],
        										playerY = this.getCoordinates(this.player.location)[1],
        										map = this.map,
        										mapOffset = map.size / 4;

    										map.x = playerX * -1 + mapOffset;
    										map.y = playerY * -1 + mapOffset;

    										if (map.x > 0) {
        										map.x = 0;
    }
    										if (map.y > 0) {
        										map.y = 0;
    }
    										if (map.x < Math.ceil(map.size / 2 * -1)) {
        										map.x = Math.ceil(map.size / 2 * -1);
    }
    										if (map.y < Math.ceil(map.size / 2 * -1)) {
        										map.y = Math.ceil(map.size / 2 * -1);
    }
};

Game.prototype.setupDungeon = function () {
    										this.generateLocationIds();
    										this.placeInMap(this.player);
    										this.player.inNewRoom = true;
    										this.setVisibleLocs();
    										this.setEdgeTiles();
    										this.setupEntities();
    										this.setPlayerRoom();
    										this.shouldUpdateMap = true;
};

Game.prototype.clearDungeon = function () {
    										this.map.locationIds = [];
    										this.map.occupiedLocs = [];
    										this.map.visibleLocs = [];
    										this.map.edgeTiles = [];
    										this.entityList = [];
};

Game.prototype.currentDungeon = 1;

let dungeons = {
    										1: {
        										rooms: [
            										{
                																				x: 2,
                																				y: 2,
                																				width: 9,
                																				height: 7,
            										}, {
                										x: 8,
                										y: 9,
                										width: 1,
                										height: 2,
            }, {
                										x: 6,
                										y: 11,
                										width: 6,
                										height: 4,
            }, {
                										x: 8,
                										y: 15,
                										width: 1,
                										height: 2,
            }, {
                										x: 3,
                										y: 17,
                										width: 9,
                										height: 8,
            }, {
                										x: 12,
                										y: 19,
                										width: 2,
                										height: 1,
            }, {
                										x: 16,
                										y: 6,
                										width: 4,
                										height: 8,
            }, {
                										x: 14,
                										y: 14,
                										width: 8,
                										height: 8,
            }, {
                										x: 16,
                										y: 22,
                										width: 4,
                										height: 8,
            }, {
                										x: 22,
                										y: 16,
                										width: 2,
                										height: 1,
            }, {
                										x: 24,
                										y: 11,
                										width: 9,
                										height: 8,
            }, {
                										x: 27,
                										y: 19,
                										width: 1,
                										height: 2,
            }, {
                										x: 24,
                										y: 21,
                										width: 6,
                										height: 4,
            }, {
                										x: 27,
                										y: 25,
                										width: 1,
                										height: 2,
            }, {
                										x: 25,
                										y: 27,
                										width: 9,
                										height: 7,
            },
        ],
        										entities: [
            										{
                																				type: 'exit',
            										}, {
                										type: 'monster',
                										level: 1,
                										count: 7,
            }, {
                										type: 'monster',
                										level: 2,
                										count: 2,
            }, {
                										type: 'potion',
                										count: 4,
            }, {
                										type: 'weapon',
            },
        ],
        										assets: {
            										land: 'grass.png',
            										sea: 'snow.png',
        },
    },
    										2: {
        										rooms: [
            										{
                																				x: 5,
                																				y: 8,
                																				width: 6,
                																				height: 7,
            										}, {
                										x: 11,
                										y: 14,
                										width: 2,
                										height: 1,
            }, {
                										x: 7,
                										y: 15,
                										width: 1,
                										height: 2,
            }, {
                										x: 3,
                										y: 17,
                										width: 8,
                										height: 5,
            }, {
                										x: 6,
                										y: 22,
                										width: 1,
                										height: 3,
            }, {
                										x: 3,
                										y: 25,
                										width: 11,
                										height: 8,
            }, {
                										x: 14,
                										y: 27,
                										width: 3,
                										height: 1,
            }, {
                										x: 17,
                										y: 23,
                										width: 4,
                										height: 11,
            }, {
                										x: 19,
                										y: 21,
                										width: 1,
                										height: 2,
            }, {
                										x: 13,
                										y: 13,
                										width: 10,
                										height: 8,
            }, {
                										x: 19,
                										y: 11,
                										width: 1,
                										height: 2,
            }, {
                										x: 17,
                										y: 2,
                										width: 5,
                										height: 9,
            }, {
                										x: 22,
                										y: 8,
                										width: 3,
                										height: 1,
            }, {
                										x: 25,
                										y: 4,
                										width: 8,
                										height: 8,
            }, {
                										x: 26,
                										y: 12,
                										width: 4,
                										height: 8,
            }, {
                										x: 23,
                										y: 16,
                										width: 4,
                										height: 1,
            }, {
                										x: 26,
                										y: 20,
                										width: 8,
                										height: 8,
            },
        ],
        										entities: [
            										{
                																				type: 'exit',
            										}, {
                										type: 'monster',
                										level: 2,
                										count: 6,
            }, {
                										type: 'monster',
                										level: 3,
                										count: 3,
            }, {
                										type: 'potion',
                										count: 4,
            }, {
                										type: 'weapon',
            },
        ],
        										assets: {
            										land: 'sand.png',
            										sea: 'water.png',
        },
    },
    										3: {
        										rooms: [
            										{
                																				x: 3,
                																				y: 3,
                																				width: 7,
                																				height: 15,
            										}, {
                										x: 5,
                										y: 18,
                										width: 1,
                										height: 3,
            }, {
                										x: 3,
                										y: 21,
                										width: 9,
                										height: 11,
            }, {
                										x: 12,
                										y: 22,
                										width: 2,
                										height: 1,
            }, {
                										x: 14,
                										y: 14,
                										width: 8,
                										height: 11,
            }, {
                										x: 18,
                										y: 25,
                										width: 1,
                										height: 2,
            }, {
                										x: 16,
                										y: 27,
                										width: 12,
                										height: 5,
            }, {
                										x: 28,
                										y: 21,
                										width: 5,
                										height: 11,
            }, {
                										x: 30,
                										y: 19,
                										width: 1,
                										height: 2,
            }, {
                										x: 26,
                										y: 12,
                										width: 7,
                										height: 7,
            }, {
                										x: 29,
                										y: 10,
                										width: 1,
                										height: 2,
            }, {
                										x: 26,
                										y: 3,
                										width: 7,
                										height: 7,
            }, {
                										x: 10,
                										y: 4,
                										width: 16,
                										height: 4,
            }, {
                										x: 18,
                										y: 8,
                										width: 1,
                										height: 7,
            },
        ],
        										entities: [
            										{
                																				type: 'exit',
            										}, {
                										type: 'monster',
                										level: 4,
                										count: 6,
            }, {
                										type: 'monster',
                										level: 5,
                										count: 2,
            }, {
                										type: 'potion',
                										count: 4,
            }, {
                										type: 'weapon',
            },
        ],
        										assets: {
            										land: 'dirt.png',
            										sea: 'hole.png',
        },
    },
    										4: {
        										rooms: [
            										{
                																				x: 3,
                																				y: 3,
                																				width: 4,
                																				height: 14,
            										}, {
                										x: 7,
                										y: 12,
                										width: 2,
                										height: 1,
            }, {
                										x: 4,
                										y: 17,
                										width: 1,
                										height: 4,
            }, {
                										x: 3,
                										y: 21,
                										width: 4,
                										height: 12,
            }, {
                										x: 7,
                										y: 29,
                										width: 7,
                										height: 4,
            }, {
                										x: 14,
                										y: 31,
                										width: 2,
                										height: 1,
            }, {
                										x: 16,
                										y: 24,
                										width: 4,
                										height: 9,
            }, {
                										x: 18,
                										y: 22,
                										width: 1,
                										height: 2,
            }, {
                										x: 29,
                										y: 19,
                										width: 4,
                										height: 14,
            }, {
                										x: 27,
                										y: 23,
                										width: 2,
                										height: 1,
            }, {
                										x: 31,
                										y: 15,
                										width: 1,
                										height: 4,
            }, {
                										x: 29,
                										y: 3,
                										width: 4,
                										height: 12,
            }, {
                										x: 22,
                										y: 3,
                										width: 7,
                										height: 4,
            }, {
                										x: 20,
                										y: 4,
                										width: 2,
                										height: 1,
            }, {
                										x: 16,
                										y: 3,
                										width: 4,
                										height: 9,
            }, {
                										x: 17,
                										y: 12,
                										width: 1,
                										height: 2,
            }, {
                										x: 9,
                										y: 9,
                										width: 5,
                										height: 8,
            }, {
                										x: 9,
                										y: 19,
                										width: 5,
                										height: 8,
            }, {
                										x: 22,
                										y: 9,
                										width: 5,
                										height: 8,
            }, {
                										x: 22,
                										y: 19,
                										width: 5,
                										height: 8,
            }, {
                										x: 14,
                										y: 14,
                										width: 8,
                										height: 8,
            },
        ],
        										entities: [
            										{
                																				type: 'boss',
                																				level: 7,
            										}, {
                										type: 'monster',
                										level: 6,
                										count: 8,
            }, {
                										type: 'potion',
                										count: 5,
            }, {
                										type: 'weapon',
            },
        ],
        										assets: {
            										land: 'lavarock.png',
            										sea: 'lava.png',
        },
    },
};

/* player.js */
Game.prototype.player = {
    										type: 'player',
    										location: 0,
    										room: 0,
    										level: 1,
    										hp: 100,
    										maxHp: 100,
    										exp: 0,
    										expToNext: 50,
    										weapon: 'Staff',
    										attack: [
        										8, 10,
    ],
    										baseAttack: [
        										8, 10,
    ],
    										canMove: true,
    										inNewRoom: true,
    										collision: 0,
};

Game.prototype.weapons = {
    										'Staff': {
        										attack: 8,
    },
    										'Short sword': {
        										attack: 14,
    },
    										'Mace': {
        										attack: 21,
    },
    										'Saber': {
        										attack: 29,
    },
    										'Claymore': {
        										attack: 38,
    },
};

Game.prototype.calculateAttack = function () {
    										let weapon = this.weapons[this.player.weapon],
        										baseAttack = this.player.baseAttack;

    										this.player.attack[0] = weapon.attack + baseAttack[0];
    										this.player.attack[1] = weapon.attack + baseAttack[1];
};

Game.prototype.setPlayerRoom = function () {
    										let rooms = dungeons[this.currentDungeon].rooms,
        										playerX = this.getCoordinates(this.player.location)[0],
        										playerY = this.getCoordinates(this.player.location)[1],
        										game = this;

    										rooms.forEach(function (room) {
        										if (room.x < playerX + 1 && room.x + room.width > playerX && room.y < playerY + 1 && room.y + room.height > playerY) {
            										if (game.player.room !== room.id) {
                										game.player.inNewRoom = true;
                										game.player.room = room.id;
                										room.explored = true;
            } else {
                										game.player.inNewRoom = false;
            }
        }
    });
};

Game.prototype.fightMonster = function (monster) {
    										let playerAttackRange = this.player.attack[1] - this.player.attack[0],
        										monsterAttackRange = monster.attack[1] - monster.attack[0],
        										damageByPlayer,
        										damageByMonster,
        										monsterDefeated;

    										for (let i = 0; i < this.entityList.length; i++) {
        										if (this.entityList[i].id === monster.id) {
            										damageByPlayer = Math.floor(Math.random() * playerAttackRange + this.player.attack[0]);
            										this.entityList[i].hp -= damageByPlayer;
            										this.updateLog('Player attacks Lv. ' + monster.level + ' ' + monster.type + ': ' + damageByPlayer + ' damage.', 'fight');

            										if (this.entityList[i].hp <= 0) {
                										this.monstersRemaining--;
                										this.removeEntity(monster, i);
                										monsterDefeated = true;
            }
        }
    }

    										damageByMonster = Math.floor(Math.random() * monsterAttackRange + monster.attack[0]);

    										this.updateLog('Lv. ' + monster.level + ' ' + monster.type + ' retaliates: ' + damageByMonster + ' damage.', 'hurt');

    										this.player.hp -= damageByMonster;

    										if (this.player.hp <= 0) {
        										this.handleDefeat();
    }

    										if (monsterDefeated) {
        										this.updateLog((monster.type === 'boss'
            ? 'Boss'
            : 'Monster') + ' defeated!', 'kill');

        										this.gainExp(monster.level);

        										if (monster.type === 'boss') {
            										this.handleVictory();
        }
    }
};

Game.prototype.gainExp = function (monsterLevel) {
    										this.player.exp += 5 + monsterLevel * 5;

    										if (this.player.exp >= this.player.expToNext) {
        										this.levelUp();
    }
};

Game.prototype.levelUp = function () {
    										let player = this.player,
        										hpPercent = player.hp / player.maxHp;

    										player.level += 1;
    										player.maxHp += 15 + 5 * player.level;
    										player.hp = Math.floor(player.maxHp * hpPercent);
    										player.exp -= player.expToNext;
    										player.expToNext += 15 + 10 * player.level;
    										player.baseAttack[0] += Math.floor(player.baseAttack[0] * 0.25);
    										player.baseAttack[1] += Math.floor(player.baseAttack[1] * 0.25);
    										this.calculateAttack();
    										this.updateLog('LEVEL UP!', 'levelup');
};

Game.prototype.takePotion = function (potion) {
    										if (this.player.hp === this.player.maxHp) {
        										this.updateLog('Already at maximum HP.');
    } else {
        										let amountHealed = 15 + Math.floor(this.player.maxHp * 0.40);

        										if (this.player.hp + amountHealed > this.player.maxHp) {
            										amountHealed -= this.player.hp + amountHealed - this.player.maxHp;
        }

        										this.player.hp += amountHealed;

        										for (let i = 0; i < this.entityList.length; i++) {
            										if (this.entityList[i].id === potion.id) {
                										this.removeEntity(potion, i);
            }
        }

        										this.updateLog('Potion heals ' + amountHealed + ' HP.', 'heal');
    }
};

Game.prototype.equipWeapon = function (weapon) {
    										this.player.weapon = this.weaponList[this.currentDungeon];

    										for (let i = 0; i < this.entityList.length; i++) {
        										if (this.entityList[i].id === weapon.id) {
            										this.removeEntity(weapon, i);
        }
    }

    										this.calculateAttack();
    										this.updateLog('Picked up ' + this.player.weapon + '.', 'equip');
};

Game.prototype.approachExit = function () {
    										if (this.monstersRemaining) {
        										this.updateLog('Defeat all monsters before proceeding.');
    } else {
        										this.currentDungeon++;
        										this.clearDungeon();
        										this.setupDungeon();
        										this.updateLog('You have entered Dungeon ' + this.currentDungeon + '.');
    }
};

Game.prototype.handleDefeat = function () {
    										this.player.hp = 0;
    										this.updateLog('You\'ve been defeated!', 'defeat');

    										this.status = 'lost';
};

Game.prototype.handleVictory = function () {
    										this.status = 'won';
};

Game.prototype.resetStats = function () {
    										const player = this.player;

    										player.level = 1;
    										player.hp = 100;
    										player.maxHp = 100;
    										player.exp = 0;
    										player.expToNext = 50;
    										player.weapon = 'Staff';

    										this.currentDungeon = 1;
    										this.monstersRemaining = 0;
};

/* entities.js */
Game.prototype.entityList = [];
Game.prototype.monstersRemaining = 0,
Game.prototype.weaponList = ['Staff', 'Short sword', 'Mace', 'Saber', 'Claymore'];

Game.prototype.setupEntities = function () {
    										let game = this,
        										entityCount,
        										entitiesPlaced = 0,
        										newEntity;

    										dungeons[this.currentDungeon].entities.forEach(function (entity, index) {
        										entityCount = entity.count || 1;

        										for (let i = 0; i < entityCount; i++) {
            										newEntity = Object.create(entity);
            										game.placeInMap(newEntity);
            										newEntity.id = entitiesPlaced;

            										if (newEntity.type === 'monster' || newEntity.type === 'boss') {
                										newEntity.attack = game.getMonsterAttack(newEntity);
                										newEntity.hp = game.getMonsterHp(newEntity);
                										game.monstersRemaining++;
            }

            										if (newEntity.type === 'boss') {
                										game.map.occupiedLocs = game.map.occupiedLocs.concat(newEntity.location);
            } else {
                										game.map.occupiedLocs.push(newEntity.location);
            }

            										game.entityList.push(newEntity);
            										entitiesPlaced++;
        }
    });
};

Game.prototype.getEntity = function (location) {
    										let entity;
    										for (let i = 0; i < this.entityList.length; i++) {
        										entity = this.entityList[i];

        										if (entity.location.length && entity.location.indexOf(location) > -1 || !entity.location.length && entity.location === location) {
            										return entity;
        }
    }
};

Game.prototype.removeEntity = function (entity, index) {
    										const entityLocIndex = this.map.occupiedLocs.indexOf(entity.location);
    										this.map.occupiedLocs.splice(entityLocIndex, 1);
    										this.entityList.splice(index, 1);
};

Game.prototype.getMonsterAttack = function (monster) {
    										let minAttackChart = [
            																				0,
            																				7,
            																				9,
            																				12,
            																				15,
            																				19,
            																				23,
            																				34,
        										],
        										maxAttackChart = [
            										0,
            										9,
            										11,
            										15,
            										19,
            										23,
            										28,
            										40,
        ],
        										minAttack = minAttackChart[monster.level],
        										maxAttack = maxAttackChart[monster.level];

    										return [minAttack, maxAttack];
};

Game.prototype.getMonsterHp = function (monster) {
    										const hpChart = [
        										1,
        										40,
        										50,
        										65,
        										85,
        										105,
        										120,
        										250,
    ];
    										return hpChart[monster.level];
};

/* log.js */
Game.prototype.actionLog = [];

Game.prototype.updateLog = function (message, type) {
    										this.actionLog.push([message, type]);
    										if (this.actionLog.length > 9) {
        										this.actionLog.shift();
    }
};

Game.prototype.clearLog = function () {
    										this.actionLog = [];
};

/* keyboard.js */
Game.prototype.key = {
    										pressed: {},
    										left: 37,
    										up: 38,
    										right: 39,
    										down: 40,

    										isDown(key) {
        										return this.pressed[this[key]];
    },

    										onKeydown(event) {
        										this.pressed[event.keyCode] = true;
    },

    										onKeyup(event) {
        										delete this.pressed[event.keyCode];
    },
};

Game.prototype.movePlayer = function (locationChange) {
    										const player = this.player;

    										const destination = player.location + locationChange;

    // Collision detection
    										if (this.map.locationIds.indexOf(destination) === -1) {
        // walk into wall
        										this.player.collision = locationChange;
        										return;
    } else if (this.map.occupiedLocs.indexOf(destination) > -1) {
        // walk into entity
        										const entity = this.getEntity(destination);

        										if (entity.type === 'monster' || entity.type === 'boss') {
            										this.fightMonster(entity);
            										this.player.collision = locationChange;
            										return;
        } else if (entity.type === 'potion') {
            										this.takePotion(entity);
        } else if (entity.type === 'weapon') {
            										this.equipWeapon(entity);
        } else {
            										this.approachExit(entity);
            										return;
        }
    }

    										player.location = destination;
    										this.moveLineOfSight(locationChange);
    										this.setPlayerRoom();
    										this.moveMap();
};

Game.prototype.moveLineOfSight = function (locationChange) {
    										this.map.visibleLocs = this.map.visibleLocs.map(function (location) {
        										return location + locationChange;
    });
};

/* views.js */
const Player = React.createClass({
    										render() {
        										let game = this.props.game,
            										location = game.player.location,
            										tSize = game.map.tileSize,
            										coords = game.getCoordinates(location),
            										posX = coords[0] * tSize,
            										posY = coords[1] * tSize,
            										weapon = game.player.weapon.toLowerCase().replace(' ', '-');

        										return (
            <svg x={posX - tSize * 3} y={posY - tSize * 3}>
                <rect x={tSize * 3} y={tSize * 3} className='player' height={tSize} width={tSize} fill={'url(#hero_' + weapon + ')'}/>
                <LineOfSight tSize={this.props.game.map.tileSize} x={posX - tSize * 4} y={posY - tSize * 4}/>
            </svg>
        );
    },
});

const LineOfSight = React.createClass({
    										render() {
        										const tSize = this.props.tSize;

        										return (
            <defs>
                <clipPath id="sight">
                    <rect x={this.props.x + tSize * 4} y={this.props.y} height={tSize * 9} width={tSize}/>
                    <rect x={this.props.x} y={this.props.y + tSize * 4} height={tSize} width={tSize * 9}/>
                    <rect x={this.props.x + tSize * 3} y={this.props.y + tSize * 1} height={tSize * 7} width={tSize * 3}/>
                    <rect x={this.props.x + tSize * 1} y={this.props.y + tSize * 3} height={tSize * 3} width={tSize * 7}/>
                    <rect x={this.props.x + tSize * 2} y={this.props.y + tSize * 2} height={tSize * 5} width={tSize * 5}/>
                </clipPath>
            </defs>
        );
    },
});

const Entity = React.createClass({
    										render() {
        										let game = this.props.game,
            										location = this.props.location.length
                ? this.props.location[0]
                : this.props.location,
            										coords = this.props.game.getCoordinates(location),
            										posX = coords[0] * game.map.tileSize,
            										posY = coords[1] * game.map.tileSize,
            										type = this.props.type,
            										clipPath = this.props.fog
                ? 'url(#sight)'
                : '',
            										size = game.map.tileSize,
            										fill,
            										weapon;

        										if (type === 'monster' || type === 'boss') {
            										fill = 'url(#monster' + game.currentDungeon + ')';
            										if (type === 'boss') {
                										fill = 'url(#boss)';
                										size *= 2;
            }
        } else if (type === 'potion') {
            										fill = 'url(#potion)';
        } else if (type === 'weapon') {
            										weapon = game.weaponList[game.currentDungeon].toLowerCase().replace(' ', '-');
            										fill = 'url(#' + weapon + ')';
        } else {
            										fill = 'url(#exit)';
        }

        										return (<rect className='entity' x={posX} y={posY} height={size} width={size} fill={fill} clipPath={clipPath}/>);
    },
});

const Map = React.createClass({
    										shouldComponentUpdate() {
        										return this.props.shouldUpdate;
    },
    										getInitialState() {
        										return { game: this.props.game };
    },
    										render() {
        										let game = this.state.game,
            										currentDungeon = game.currentDungeon;

        										const roomNodes = dungeons[currentDungeon].rooms.map(function (room) {
            										return (<Room x={(room.x) * game.map.tileSize} y={(room.y) * game.map.tileSize} h={(room.height) * game.map.tileSize} w={(room.width) * game.map.tileSize} key={room.id}/>);
        });

        										return (
            <svg className='map' width={this.props.size} height={this.props.size}>
                {roomNodes}
            </svg>
        );
    },
});

const Room = React.createClass({
    										render() {
        										return (<rect x={this.props.x} y={this.props.y} height={this.props.h} width={this.props.w} fill='url(#land)'/>);
    },
});

const Stats = React.createClass({
    										getInitialState() {
        										return { game: this.props.game };
    },
    										render() {
        										let game = this.state.game,
            										log = game.actionLog;

        										return (
            <div id='stats'>
                <div className='stat-container'>
                    <p>HP:
                        <span id='hp'>{game.player.hp}
                            / {game.player.maxHp}</span>
                    </p>
                </div>
                <div className='stat-container'>
                    <p>Level:
                        <span id='level'>{game.player.level}</span>
                    </p>
                    <p>Exp:
                        <span id='exp'>{game.player.exp}
                            / {game.player.expToNext}</span>
                    </p>
                </div>
                <div className='stat-container'>
                    <p>Weapon:
                        <span id='weapon'>{game.player.weapon}</span>
                    </p>
                    <p>Attack:
                        <span id='attack'>{game.player.attack[0]}-{game.player.attack[1]}</span>
                    </p>
                </div>
                <div className='stat-container'>
                    <p>Dungeon:
                        <span id='dungeon'>{game.currentDungeon}</span>
                    </p>
                    <p>Monsters remaining:
                        <span id='monsters-remaining'>{game.monstersRemaining}</span>
                    </p>
                </div>
                <ActionLog log={log}/>
                <ToggleFogButton onClick={this.props.onPressToggle} fog={game.fog}/>
            </div>
        );
    },
});

const ActionLog = React.createClass({
    										render() {
        										let log = this.props.log,
            										opacity,
            										fontWeight;

        										const entryNodes = log.map(function (entry, i) {
            										opacity = 1;
            										fontWeight = 'normal';

            										if (log.length > 7 && i < 7) {
                										opacity -= (7 - i) * 0.15;
            } else if (log.length > 4 && i < 4) {
                										opacity -= (4 - i) * 0.2;
            }

            										if (i === log.length - 1) {
                										fontWeight = 'bold';
            }

            										return (
                <p className='log-entry' id={entry[1]} key={i} style={{
                    										opacity,
                    										fontWeight,
                }}>{entry[0]}</p>
            );
        });

        										return (
            <div id='action-log'>
                {entryNodes}
            </div>
        );
    },
});

const ToggleFogButton = React.createClass({
    										render() {
        										const fog = this.props.fog
            ? 'On'
            : 'Off';

        										return (
            <button id='toggle-fog' onClick={this.props.onClick}>Fog: {fog}</button>
        );
    },
});

const Prompt = React.createClass({
    										render() {
        										let game = this.props.game,
            										message,
            										visibility = '';

        										if (game.status === 'playing') {
            										visibility = 'hidden';
        } else if (game.status === 'lost') {
            										message = 'Game over! Would you like to try again?';
        } else {
            										message = 'Congratulations! You\'ve defeated the boss! Play again?';
        }

        										return (
            <div id='prompt' className={visibility}>
                <p className='message'>{message}</p>
                <button onClick={this.props.onPressOK}>OK</button>
            </div>
        );
    },
});

const Sprites = React.createClass({
    										shouldComponentUpdate() {
        										return false;
    },
    										render() {
        										let dir = 'https://res.cloudinary.com/alister/image/upload/v1/dungeon-crawler/',
            										tSize = this.props.tSize;

        										return (
            <defs>
                <pattern id='hero_staff' width={tSize} height={tSize} patternUnits='userSpaceOnUse'>
                    <image xlinkHref={dir + 'spritesheet.png'} width={tSize} height={tSize * 16}/>
                </pattern>
                <pattern id='hero_short-sword' width={tSize} height={tSize} patternUnits='userSpaceOnUse'>
                    <image xlinkHref={dir + 'spritesheet.png'} y={tSize * -1} width={tSize} height={tSize * 16}/>
                </pattern>
                <pattern id='hero_mace' width={tSize} height={tSize} patternUnits='userSpaceOnUse'>
                    <image xlinkHref={dir + 'spritesheet.png'} y={tSize * 2 * -1} width={tSize} height={tSize * 16}/>
                </pattern>
                <pattern id='hero_saber' width={tSize} height={tSize} patternUnits='userSpaceOnUse'>
                    <image xlinkHref={dir + 'spritesheet.png'} y={tSize * 3 * -1} width={tSize} height={tSize * 16}/>
                </pattern>
                <pattern id='hero_claymore' width={tSize} height={tSize} patternUnits='userSpaceOnUse'>
                    <image xlinkHref={dir + 'spritesheet.png'} y={tSize * 4 * -1} width={tSize} height={tSize * 16}/>
                </pattern>
                <pattern id='short-sword' width={tSize} height={tSize} patternUnits='userSpaceOnUse'>
                    <image xlinkHref={dir + 'spritesheet.png'} y={tSize * 5 * -1} width={tSize} height={tSize * 16}/>
                    <circle cx={tSize / 2} cy={tSize / 2} r={tSize / 2} style={{
                        										stroke: '#4ab',
                        										fill: 'none',
                    }}/>;
                </pattern>
                <pattern id='mace' width={tSize} height={tSize} patternUnits='userSpaceOnUse'>
                    <image xlinkHref={dir + 'spritesheet.png'} y={tSize * 6 * -1} width={tSize} height={tSize * 16}/>
                    <circle cx={tSize / 2} cy={tSize / 2} r={tSize / 2} style={{
                        										stroke: '#4ab',
                        										fill: 'none',
                    }}/>;
                </pattern>
                <pattern id='saber' width={tSize} height={tSize} patternUnits='userSpaceOnUse'>
                    <image xlinkHref={dir + 'spritesheet.png'} y={tSize * 7 * -1} width={tSize} height={tSize * 16}/>
                    <circle cx={tSize / 2} cy={tSize / 2} r={tSize / 2} style={{
                        										stroke: '#4ab',
                        										fill: 'none',
                    }}/>;
                </pattern>
                <pattern id='claymore' width={tSize} height={tSize} patternUnits='userSpaceOnUse'>
                    <image xlinkHref={dir + 'spritesheet.png'} y={tSize * 8 * -1} width={tSize} height={tSize * 16}/>
                    <circle cx={tSize / 2} cy={tSize / 2} r={tSize / 2} style={{
                        										stroke: '#4ab',
                        										fill: 'none',
                    }}/>;
                </pattern>
                <pattern id='potion' width={tSize} height={tSize} patternUnits='userSpaceOnUse'>
                    <image xlinkHref={dir + 'spritesheet.png'} y={tSize * 9 * -1} width={tSize} height={tSize * 16}/>
                    <circle cx={tSize / 2} cy={tSize / 2} r={tSize / 2} style={{
                        										stroke: '#4ab',
                        										fill: 'none',
                    }}/>;
                </pattern>
                <pattern id='exit' width={tSize} height={tSize} patternUnits='userSpaceOnUse'>
                    <image xlinkHref={dir + 'spritesheet.png'} y={tSize * 10 * -1} width={tSize} height={tSize * 16}/>
                </pattern>
                <pattern id='monster1' width={tSize} height={tSize} patternUnits='userSpaceOnUse'>
                    <image xlinkHref={dir + 'spritesheet.png'} y={tSize * 11 * -1} width={tSize} height={tSize * 16}/>
                </pattern>
                <pattern id='monster2' width={tSize} height={tSize} patternUnits='userSpaceOnUse'>
                    <image xlinkHref={dir + 'spritesheet.png'} y={tSize * 12 * -1} width={tSize} height={tSize * 16}/>
                </pattern>
                <pattern id='monster3' width={tSize} height={tSize} patternUnits='userSpaceOnUse'>
                    <image xlinkHref={dir + 'spritesheet.png'} y={tSize * 13 * -1} width={tSize} height={tSize * 16}/>
                </pattern>
                <pattern id='monster4' width={tSize} height={tSize} patternUnits='userSpaceOnUse'>
                    <image xlinkHref={dir + 'spritesheet.png'} y={tSize * 14 * -1} width={tSize} height={tSize * 16}/>
                </pattern>
                <pattern id='boss' width={tSize * 2} height={tSize * 2} patternUnits='userSpaceOnUse'>
                    <image xlinkHref={dir + 'boss.png'} width={tSize * 2} height={tSize * 2}/>
                </pattern>
            </defs>
        );
    },
});

const BaseTiles = React.createClass({
    										shouldComponentUpdate() {
        										return this.props.shouldUpdate;
    },
    										render() {
        										let dir = 'https://res.cloudinary.com/alister/image/upload/v1/dungeon-crawler/',
            										seaHref = dir + this.props.sea,
            										landHref = dir + this.props.land,
            										tSize = this.props.tSize;

        										return (
            <defs>
                <pattern id='sea' width={tSize * 2 - 0.01} height={tSize * 2 - 0.01} patternUnits='userSpaceOnUse'>
                    <image xlinkHref={seaHref} x={tSize * -1} y={tSize * -4} width={tSize * 5} height={tSize * 6}/>
                    <image xlinkHref={seaHref} x='0' y={tSize * -5} width={tSize * 5} height={tSize * 6}/>
                </pattern>
                <pattern id='land' width={tSize * 2 - 0.01} height={tSize * 2 - 0.01} patternUnits='userSpaceOnUse'>
                    <image xlinkHref={landHref} x={tSize * -1} y={tSize * -4} width={tSize * 5} height={tSize * 6}/>
                    <image xlinkHref={landHref} x={tSize * -2} y={tSize * -5} width={tSize * 5} height={tSize * 6}/>
                    <image xlinkHref={landHref} x={tSize * -1} y={tSize * -5} width={tSize * 5} height={tSize * 6}/>
                </pattern>
            </defs>
        );
    },
});

const EdgeTile = React.createClass({
    										shouldComponentUpdate() {
        										return this.props.shouldUpdate;
    },
    										render() {
        										let href = 'https://res.cloudinary.com/alister/image/upload/v1/dungeon-crawler/' + this.props.sea,
            										tSize = this.props.tSize;

        										return (
            <svg x={this.props.x} y={this.props.y} width={tSize} height={tSize}>
                <rect width={tSize} height={tSize} fill='url(#land)'/>
                <image xlinkHref={href} x={this.props.spriteX} y={this.props.spriteY} width={tSize * 5} height={tSize * 6}/>
            </svg>
        );
    },
});

const GameView = React.createClass({
    										getInitialState() {
        										return { game: this.props.game };
    },
    										componentWillMount() {
        										this.props.game.calculateAttack();
        										this.props.game.setupDungeon();
    },
    										componentDidMount() {
        										window.addEventListener('keydown', this.handleKeyDown, false);
        										window.addEventListener('keyup', this.handleKeyUp, false);
        										this.handleLoop();
    },
    										handleKeyDown(event) {
        										let game = this.props.game,
            										key = game.key,
            										player = game.player;

        										if (game.status === 'playing') {
            										key.pressed[event.keyCode] = true;
        }
    },
    										handleKeyUp(event) {
        										delete this.props.game.key.pressed[event.keyCode];
    },
    										allowMove(keyCode) {
        										game.player.canMove = true;
    },
    										handleLoop() {
        										this.state.game.gameLoop(this);
        										setTimeout(this.handleLoop, 20);
    },
    										update() {
        										this.setState({ game: this.props.game });
    },
    										restart() {
        										const game = this.props.game;

        										game.clearLog();
        										game.resetStats();
        										game.calculateAttack();
        										game.clearDungeon();
        										game.setupDungeon();
        										game.status = 'playing';
        										this.update();
        										this.update();
    },
    										toggleFog() {
        										this.state.game.fog = !this.state.game.fog;
        										this.update();
    },
    										render() {
        										let promptDisplay,
            										game = this.state.game,
            										visibleLocs = game.map.visibleLocs,
            										edgeTiles = game.map.edgeTiles,
            										fog = game.fog,
            										clipPath = fog
                ? 'url(#sight)'
                : '',
            										shouldUpdate = game.shouldUpdateMap,
            										land = dungeons[game.currentDungeon].assets.land,
            										sea = dungeons[game.currentDungeon].assets.sea,
            										currentDungeon = game.currentDungeon,
            										mapX = game.map.x,
            										mapY = game.map.y,
            										tSize = game.map.tileSize,
            										mapSize = game.map.size;

        										const entityNodes = game.entityList.map(function (entity, i) {
            										return (<Entity game={game} location={entity.location} type={entity.type} fog={fog} key={i}/>);
        });

        										const edgeTileNodes = edgeTiles.map(function (tile, i) {
            										let x = game.getCoordinates(tile.location)[0] * game.map.tileSize,
                										y = game.getCoordinates(tile.location)[1] * game.map.tileSize,
                										spriteX = tile.type[0] * game.map.tileSize * -1,
                										spriteY = tile.type[1] * game.map.tileSize * -1;

            										return (<EdgeTile x={x} y={y} tSize={game.map.tileSize} spriteX={spriteX} spriteY={spriteY} sea={sea} shouldUpdate={shouldUpdate} key={i}/>);
        });

        										return (
            <div id='gameView'>
                <svg id='viewport' width='608' height='608'>
                    <svg id='mapContainer' x={mapX * tSize} y={mapY * tSize} width={mapSize * tSize} height={mapSize * tSize}>
                        <rect id='mapBackground' width={mapSize * tSize} height={mapSize * tSize} fill='url(#sea)' clipPath={clipPath}/>
                        <svg clipPath={clipPath}>
                            <Map game={game} shouldUpdate={shouldUpdate} size={mapSize * tSize}/> {edgeTileNodes}
                        </svg>
                        {entityNodes}
                        <Player game={game}/>
                    </svg>
                    <Sprites tSize={game.map.tileSize}/>
                    <BaseTiles tSize={game.map.tileSize} land={land} sea={sea} shouldUpdate={shouldUpdate}/>
                </svg>
                <Stats game={game} onPressToggle={this.toggleFog}/>
                <Prompt game={game} onPressOK={this.restart}/>
            </div>
        );
    },
});
