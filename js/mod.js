let modInfo = {
	name: "The Unlocking Tree",
	author: "1SmartShark",
	pointsName: "points",
	modFiles: ["layers.js", "tree.js"],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (10), // Used for hard resets and new players
	offlineLimit: 1,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "1.4",
	name: "Official release",
}

let changelog = `<h1>Changelog:</h1><br>
	<h3>v1.4</h3><br>
		- Release!!
		- Game will keep updating.<br>
	<h3>v0.4</h3><br>
		- Added unlocker T4
		- Added ultra rebirth.<br>
	<h3>v0.3.2</h3><br>
		- Added unlocker T3
		- Ultra rebirth soon.<br>
	<h3>v0.3.1</h3><br>
		- Add another upg to super rebirth.<br>
	<h3>v0.3</h3><br>
		- Added super rebirth.<br>
	<h3>v0.2</h3><br>
		- Added rebirth.
		- Added unlocker T2.<br>
	<h3>v0.1</h3><br>
		- Added prestige.<br>
		- Added unlocker T1.`

let winText = `Congratulations! You have reached the end and beaten this game, but for now...`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return true
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)

	let gain = new Decimal(1)
	cap = new Decimal("1e30")
	buff1 = new Decimal(100)
	if (hasUpgrade('p', 11)) gain = gain.times(2)
	if (hasUpgrade('p', 21)) gain = gain.times(5)
	if (hasUpgrade('p', 24)) gain = gain.times(10)
	if (hasUpgrade('p', 22)) buff1 = buff1.times(10000)
	if (hasUpgrade('p', 13) && player.points.lt(buff1)) gain = gain.times(5)
	if (hasUpgrade('p', 13) && player.points.gte(buff1)) gain = gain.times(2)
	if (hasUpgrade('r', 11)) gain = gain.times(4)
	if (hasUpgrade('r', 12)) gain = gain.times(2)
	if (hasUpgrade('s', 12)) gain = gain.times(10)
	if (hasUpgrade('u', 13)) gain = gain.times(upgradeEffect('u', 13))
	if (hasUpgrade('u', 15)) gain = gain.times(1000)
	if (hasMilestone('u3', 0)) gain = gain.times(100)
	if (hasMilestone('u4', 0)) gain = gain.times(10000)
	two = new Decimal("2")
	if (hasUpgrade('u', 12)) two = two.add(1)
	pb1 = two.pow(player.b.points)
	if (player.b.points.gt(0)) gain = gain.times(pb1)
	if (player.points.gte(cap)) gain = gain.times(0)
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
]

// Determines when the game "ends"
function isEndgame() {
	return player.points.gte(new Decimal("e280000000"))
}



// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = {

}

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}