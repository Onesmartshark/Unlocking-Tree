addLayer("p", {
    name: "prestige", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "P", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    branches: ['r'],
    color: "#4BDC13",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "prestige points", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    autoUpgrade() {return hasMilestone('u2', 0) && player.p.autoupg},
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        cap = new Decimal(1e9)
        if (hasUpgrade('p', 12)) mult = mult.times(2)
        if (hasUpgrade('p', 14)) mult = mult.times(3)
        if (hasUpgrade('r', 13) && player.p.points.lt(100)) mult = mult.times(5)
        if (hasUpgrade('r', 13) && player.p.points.gte(100)) mult = mult.times(2)
        if (hasUpgrade('s', 11)) mult = mult.times(5)
        if (hasUpgrade('m', 12)) mult = mult.times(5)
        two = new Decimal("2")
	    if (hasUpgrade('p', 15)) two = two.add(1)
	    pb2 = two.pow(player.rb.points)
        if (player.rb.points.gte(1)) mult = mult.times(pb2)
        if (player.p.points.gte(cap)) mult = mult.times(0)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        exp = new Decimal(1)
        return exp
    },

    bonusfunct1() {
        pggain = new Decimal(1)
        if (!hasMilestone('u4', 0)) pggain = pggain.times(0)
        if (!player.p.autogen) pggain = pggain.times(0)
        return pggain
    },

    passiveGeneration() {return pggain},


    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    upgrades: {
        11: {
            title: "Starting",
            description: "Double points.",
            cost: new Decimal(1),
            unlocked() { return true },   
        },
        12: {
            title: "Prestiged",
            description: "Double prestige.",
            cost: new Decimal(3),
            unlocked() { return hasUpgrade('p', 11) },   
        },
        13: {
            title: "Below 100",
            description: "x5 points below 100 points, else x2",
            cost: new Decimal(5),
            unlocked() { return hasUpgrade('p', 12) },   
        },
        14: {
            title: "Final touches",
            description: "x3 prestige, and unlock a new layer.",
            cost: new Decimal(10),
            unlocked() { return hasUpgrade('p', 13) },   
        },
        21: {
            title: "Grinding again",
            description: "x5 points.",
            cost: new Decimal(10000),
            unlocked() { return hasUpgrade('p', 14) && hasUpgrade('s', 13) },   
        },
        22: {
            title: "Buffing",
            description: "#13 now applies up to 1,000,000 points!",
            cost: new Decimal(25000),
            unlocked() { return hasUpgrade('p', 21) },   
        },
        23: {
            title: "Super",
            description: "x2 Super Rebirth",
            cost: new Decimal(50000),
            unlocked() { return hasUpgrade('p', 22) },   
        },
        24: {
            title: "Speedy",
            description: "x10 points!",
            cost: new Decimal(75000),
            unlocked() { return hasUpgrade('p', 23) },   
        },
    },
    layerShown(){return true}
})

addLayer("r", {
    name: "rebirth", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "R", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    branches: ['p'],
    color: "#0096FF",
    requires: new Decimal(25), // Can be a function that takes requirement increases into account
    resource: "rebirth points", // Name of prestige currency
    baseResource: "prestige points", // Name of resource prestige is based on
    baseAmount() {return player.p.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    autoUpgrade() {return hasMilestone('u3', 0) && player.r.autoupg},
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        cap = new Decimal(1e9)
        if (hasUpgrade('r', 14)) mult = mult.times(3)
        if (hasUpgrade('s', 14) && player.r.points.lt(100)) mult = mult.times(5)
        if (hasUpgrade('s', 14) && player.r.points.gte(100)) mult = mult.times(2)
        if (hasUpgrade('m', 12)) mult = mult.times(5)
        if (player.r.points.gte(cap)) mult = mult.times(0)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        exp = new Decimal(1)
        return exp
    },
    bonusfunct1() {
        pggain = new Decimal(1)
        if (!hasMilestone('u5', 0)) pggain = pggain.times(0)
        if (!player.r.autogen) pggain = pggain.times(0)
        return pggain
    },
    passiveGeneration() {return pggain},
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "r", description: "R: Reset for rebirth points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    upgrades: {
        11: {
            title: "Back to beginning",
            description: "Quadruple points.",
            cost: new Decimal(1),
            unlocked() { return true },   
        },
        12: {
            title: "Pointing again",
            description: "Double points.",
            cost: new Decimal(2),
            unlocked() { return hasUpgrade('r', 11) },   
        },
        13: {
            title: "Below 100, prestige edition",
            description: "x5 prestige below 100 prestige, else x2",
            cost: new Decimal(5),
            unlocked() { return hasUpgrade('r', 12) },   
        },
        14: {
            title: "Rebirther",
            description: "x3 rebirth, and unlock a new layer.",
            cost: new Decimal(10),
            unlocked() { return hasUpgrade('r', 13) },   
        },
    },
    layerShown(){return hasUpgrade('r', 11) || hasUpgrade('p', 14) && hasMilestone('u1', 0)}
})

addLayer("s", {
    name: "super rebirth", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "S", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    branches: ['r','u'],
    color: "#0069B2",
    requires: new Decimal(25), // Can be a function that takes requirement increases into account
    resource: "super rebirth points", // Name of prestige currency
    baseResource: "rebirth points", // Name of resource prestige is based on
    baseAmount() {return player.r.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    autoUpgrade() {return hasMilestone('u4', 0) && player.s.autoupg},
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        cap = new Decimal(1e9)
        if (hasUpgrade('s', 15)) mult = mult.times(3)
        if (hasUpgrade('p', 23)) mult = mult.times(2)
        if (hasUpgrade('m', 12)) mult = mult.times(5)
        if (player.s.points.gte(cap)) mult = mult.times(0)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        exp = new Decimal(1)
        return exp
    },
    row: 2, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "s", description: "S: Reset for super rebirth points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    upgrades: {
        11: {
            title: "Nah, no more points",
            description: "Quintuple prestige.",
            cost: new Decimal(1),
            unlocked() { return true },   
        },
        12: {
            title: "Fine",
            description: "10x points.",
            cost: new Decimal(2),
            unlocked() { return hasUpgrade('s', 11) },   
        },
        13: {
            title: "Upgrading",
            description: "Unlock more prestige upgrades!.",
            cost: new Decimal(3),
            unlocked() { return hasUpgrade('s', 12) },   
        },
        14: {
            title: "Below 100, rebirth edition",
            description: "x5 rebirth below 100 rebirth, else x2",
            cost: new Decimal(5),
            unlocked() { return hasUpgrade('s', 13) },   
        },
        15: {
            title: "Repetitive",
            description: "x3 super rebirth, and unlock a new layer.",
            cost: new Decimal(10),
            unlocked() { return hasUpgrade('s', 14) },   
        },
    },
    layerShown(){return hasUpgrade('s', 11) || hasUpgrade('r', 14) && hasMilestone('u2', 0)}
})

addLayer("u", {
    name: "ultra rebirth", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "U", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    branches: ['s', 'm'],
    color: "#01497B",
    requires: new Decimal(25), // Can be a function that takes requirement increases into account
    resource: "ultra rebirth points", // Name of prestige currency
    baseResource: "super rebirth points", // Name of resource prestige is based on
    baseAmount() {return player.s.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    autoUpgrade() {return hasMilestone('u5', 0) && player.u.autoupg},
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        cap = new Decimal(1e9)
        if (hasUpgrade('u', 15)) mult = mult.times(3)
        if (hasUpgrade('u', 23)) mult = mult.times(2)
        if (hasUpgrade('m', 12)) mult = mult.times(5)
        if (player.u.points.gte(cap)) mult = mult.times(0)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        exp = new Decimal(1)
        return exp
    },
    row: 3, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "U", description: "Shift+U: Reset for ultra rebirth points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    upgrades: {
        11: {
            title: "... how the heck ...",
            description: "Unlock boosters. Visible if you buy the first super rebirth upg.",
            cost: new Decimal(1),
            unlocked() { return true },   
        },
        12: {
            title: "BB (Booster Buff)",
            description: "Improve the booster exponent by +1x.",
            cost: new Decimal(1),
            unlocked() { return hasUpgrade("u", 11) },   
        },
        13: {
            title: "HOW THE HELL",
            description: "Point gain is boosted much by ultra rebirth points.",
            cost: new Decimal(2),
            effect() {
                return player[this.layer].points.add(1).pow(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect     
            unlocked() { return hasUpgrade("u", 12) },   
        },
        14: {
            title: "...",
            description: "Unlock Rebirth Boosters.",
            cost: new Decimal(2),
            unlocked() { return hasUpgrade("u", 13) },   
        },
        15: {
            title: "Needed NGL",
            description: "x1,000 points, and unlock a new layer.",
            cost: new Decimal(3),
            unlocked() { return hasUpgrade("u", 14) },   
        },
    },
    layerShown(){return hasUpgrade('u', 11) || hasUpgrade('s', 14) && hasMilestone('u3', 0)}
})

addLayer("m", {
    name: "mega prestige", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "M", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    branches: ['u'],
    color: "#1D7B01",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "mega prestige points", // Name of prestige currency
    baseResource: "ultra rebirth points", // Name of resource prestige is based on
    baseAmount() {return player.u.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        cap = new Decimal(1e9)
        if (hasUpgrade('u', 15)) mult = mult.times(3)
        if (hasUpgrade('u', 23)) mult = mult.times(2)
        if (player.u.points.gte(cap)) mult = mult.times(0)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        exp = new Decimal(1)
        return exp
    },
    row: 4, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "m", description: "M: Reset for mega prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    doReset(resettingLayer) {
        let keep = [];
        player.p.points = new Decimal("0"); 
        player.p.upgrades = []; 
        player.r.points = new Decimal("0"); 
        player.r.upgrades = []; 
        player.s.points = new Decimal("0"); 
        player.s.upgrades = []; 
        player.u.points = new Decimal("0"); 
        player.u.upgrades = []; 
        player.b.points = new Decimal("0"); 
        player.b.milestones = []; 
        player.rb.points = new Decimal("0"); 
        player.rb.milestones = [];  
    },
    upgrades: {
        11: {
            title: "aight thats a bit too much",
            description: "uhh 10kx points",
            cost: new Decimal(1),
            unlocked() { return true },   
        },
        12: {
            title: "faster",
            description: "Quintuple ultra gain and everything below.",
            cost: new Decimal(2),
            unlocked() { return hasUpgrade("m", 11) },   
        },
        13: {
            title: "Megaified points",
            description: "Point gain is boosted hugely by mega prestige points.",
            cost: new Decimal(3),
            effect() {
                return player[this.layer].points.add(1).pow(1.5)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect     
            unlocked() { return hasUpgrade("m", 12) },   
        },
        14: {
            title: "...",
            description: "Alright unlock super rebirth boosters.",
            cost: new Decimal(4),
            unlocked() { return hasUpgrade("m", 13) },   
        },
        15: {
            title: "three",
            description: "x333,333 points.",
            cost: new Decimal(5),
            unlocked() { return hasUpgrade("m", 14) },   
        },
    },
    layerShown(){return hasUpgrade('m', 11) || hasUpgrade('u', 14) && hasMilestone('u4', 0)}
})

addLayer("b", {
    name: "boosters", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "B", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    branches: ['p'],
    color: "#0096FF",
    requires: new Decimal(1000), // Can be a function that takes requirement increases into account
    resource: "boosters", // Name of prestige currency
    baseResource: "prestige points", // Name of resource prestige is based on
    baseAmount() {return player.p.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 1, // Prestige currency exponent
    base: 10,
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        exp = new Decimal(1)
        return exp
    },
    row: 2, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "b", description: "B: Reset for boosters", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],

    doReset(resettingLayer) {
        let keep = [];
        if (hasMilestone("u4", 0) && resettingLayer=="u") keep.push("points")
        if (hasMilestone("u4", 0) && resettingLayer=="u") keep.push("milestones")
    },

    milestones: {
        0: {
            requirementDescription: "1 Booster",
            done() { return player.b.points.gte(1) },
            effectDescription: "Boosters give x2 point gain compounding as long as there is 1 or more booster",
            unlocked() {return true},
        },
    },
    layerShown(){return hasMilestone('b', 0) || hasUpgrade('p', 11) && hasUpgrade('u', 11) && hasMilestone('u3', 0)}
})

addLayer("rb", {
    name: "rebirth boosters", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "RB", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    branches: ['r'],
    color: "#0096FF",
    requires: new Decimal(1000), // Can be a function that takes requirement increases into account
    resource: "rebirth boosters", // Name of prestige currency
    baseResource: "rebirth points", // Name of resource prestige is based on
    baseAmount() {return player.r.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 1, // Prestige currency exponent
    base: 10,
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        exp = new Decimal(1)
        return exp
    },
    row: 3, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "R", description: "Shift+R: Reset for rebirth boosters", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],

    milestones: {
        0: {
            requirementDescription: "1 Rebirth Booster",
            done() { return player.rb.points.gte(1) },
            effectDescription: "Rebirth Boosters give x2 prestige gain compounding as long as there is 1 or more rebirth booster",
            unlocked() {return true},
        },
    },
    layerShown(){return hasMilestone('rb', 0) || hasUpgrade('r', 11) && hasUpgrade('u', 14) && hasMilestone('u3', 0)}
})

addLayer("sb", {
    name: "super rebirth boosters", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "SB", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    branches: ['s'],
    color: "#0096FF",
    requires: new Decimal(1000), // Can be a function that takes requirement increases into account
    resource: "super rebirth boosters", // Name of prestige currency
    baseResource: "super rebirth points", // Name of resource prestige is based on
    baseAmount() {return player.s.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 1, // Prestige currency exponent
    base: 10,
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        exp = new Decimal(1)
        return exp
    },
    row: 3, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "S", description: "Shift+S: Reset for super rebirth boosters", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],

    milestones: {
        0: {
            requirementDescription: "1 Super Rebirth Booster",
            done() { return player.sb.points.gte(1) },
            effectDescription: "Super Rebirth Boosters give x2 rebirth gain compounding as long as there is 1 or more super rebirth booster",
            unlocked() {return true},
        },
    },
    layerShown(){return hasMilestone('sb', 0) || hasUpgrade('s', 11) && hasUpgrade('m', 14) && hasMilestone('u4', 0)}
})

addLayer("u1", {
    name: "unlock 1", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "U-1", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    branches: ['p','u2'],
    color: "#FFFF00",
    requires: new Decimal(25), // Can be a function that takes requirement increases into account
    resource: "unlockers", // Name of prestige currency
    baseResource: "prestige points", // Name of resource prestige is based on
    baseAmount() {return player.p.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    base: 1e33000,
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    doReset(resettingLayer) {
        let keep = [];
        player.p.points = new Decimal("0"); 
        player.p.upgrades = []; 
        if (layers[resettingLayer].row > this.row) layerDataReset("u1", keep)
    },
    row: 10, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "u", description: "U: Reset for unlocker T1", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],

    milestones: {
        0: {
            requirementDescription: "Unlocker 1",
            done() { return player.u1.points.gte(1) },
            effectDescription: "Unlock Rebirth.",
            unlocked() {return true},
        },
    },
    layerShown(){return hasUpgrade('p', 14) || hasMilestone('u1', 0)}
})

addLayer("u2", {
    name: "unlock 2", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "U-2", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: -1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    branches: ['u1', 'u3'],
    color: "#FFFF00",
    requires: new Decimal(25), // Can be a function that takes requirement increases into account
    resource: "unlockers", // Name of prestige currency
    baseResource: "rebirth points", // Name of resource prestige is based on
    baseAmount() {return player.r.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    base: 1e33000,
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    doReset(resettingLayer) {
        let keep = [];
        player.p.points = new Decimal("0"); 
        player.p.upgrades = []; 
        player.r.points = new Decimal("0"); 
        player.r.upgrades = []; 
        if (layers[resettingLayer].row > this.row) layerDataReset("u1", keep)
    },
    row: 10, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "u", description: "U: Reset for unlocker T2", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],

    milestones: {
        0: {
            requirementDescription: "Unlocker 2",
            done() { return player.u2.points.gte(1) },
            effectDescription: "Unlock Super Rebirth. Automate prestige upgrades, every unlocker ahead automates the next layer",
            unlocked() {return true},
            toggles: [["p","autoupg"]],
        },
    },
    layerShown(){return hasUpgrade('r', 14) && hasMilestone('u1', 0) || hasMilestone('u2', 0)}
})

addLayer("u3", {
    name: "unlock 3", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "U-3", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: -2, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    branches: ['u2','u4'],
    color: "#FFFF00",
    requires: new Decimal(25), // Can be a function that takes requirement increases into account
    resource: "unlockers", // Name of prestige currency
    baseResource: "super rebirth points", // Name of resource prestige is based on
    baseAmount() {return player.s.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    base: 1e33000,
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    doReset(resettingLayer) {
        let keep = [];
        player.p.points = new Decimal("0"); 
        player.p.upgrades = []; 
        player.r.points = new Decimal("0"); 
        player.r.upgrades = []; 
        player.s.points = new Decimal("0"); 
        player.s.upgrades = []; 
        if (layers[resettingLayer].row > this.row) layerDataReset("u1", keep)
    },
    row: 10, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "u", description: "U: Reset for unlocker T3", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],

    milestones: {
        0: {
            requirementDescription: "Unlocker 3",
            done() { return player.u3.points.gte(1) },
            effectDescription: "Unlock Ultra Rebirth. Also, x100 points.",
            unlocked() {return true},
            toggles: [["r","autoupg"]],
        },
    },
    layerShown(){return hasUpgrade('s', 15) && hasMilestone('u2', 0) || hasMilestone('u3', 0)}
})

addLayer("u4", {
    name: "unlock 4", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "U-4", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: -3, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    branches: ['u3', 'u5'],
    color: "#FFFF00",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "unlockers", // Name of prestige currency
    baseResource: "ultra rebirth points", // Name of resource prestige is based on
    baseAmount() {return player.u.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    base: 1e33000,
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },

    doReset(resettingLayer) {
        let keep = [];
        player.p.points = new Decimal("0"); 
        player.p.upgrades = []; 
        player.r.points = new Decimal("0"); 
        player.r.upgrades = []; 
        player.s.points = new Decimal("0"); 
        player.s.upgrades = []; 
        player.u.points = new Decimal("0"); 
        player.u.upgrades = []; 
        player.b.points = new Decimal("0"); 
        player.b.milestones = []; 
        player.rb.points = new Decimal("0"); 
        player.rb.milestones = []; 
        if (layers[resettingLayer].row > this.row) layerDataReset("u1", keep)
    },
    row: 10, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "u", description: "U: Reset for unlocker T4", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],

    milestones: {
        0: {
            requirementDescription: "Unlocker 4",
            done() { return player.u4.points.gte(1) },
            effectDescription: "Unlock mega prestige, keep boosters on ultra prestige, and x10,000 points. Also, passively generate prestige!",
            unlocked() {return true},
            toggles: [["s","autoupg"],["p","autogen"]],
        },
    },
    layerShown(){return hasUpgrade('u', 15) && hasMilestone('u3', 0) || hasMilestone('u4', 0)}
})

addLayer("u5", {
    name: "unlock 5", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "U-5", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: -4, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    branches: ['u4'],
    color: "#FFFF00",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "unlockers", // Name of prestige currency
    baseResource: "mega prestige points", // Name of resource prestige is based on
    baseAmount() {return player.m.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    base: 1e33000,
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },

    doReset(resettingLayer) {
        let keep = [];
        player.p.points = new Decimal("0"); 
        player.p.upgrades = []; 
        player.r.points = new Decimal("0"); 
        player.r.upgrades = []; 
        player.s.points = new Decimal("0"); 
        player.s.upgrades = []; 
        player.u.points = new Decimal("0"); 
        player.u.upgrades = []; 
        player.m.points = new Decimal("0"); 
        player.m.upgrades = []; 
        player.b.points = new Decimal("0"); 
        player.b.milestones = []; 
        player.rb.points = new Decimal("0"); 
        player.rb.milestones = []; 
        player.sb.points = new Decimal("0"); 
        player.sb.milestones = []; 
        if (layers[resettingLayer].row > this.row) layerDataReset("u1", keep)
    },
    row: 10, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "u", description: "U: Reset for unlocker T5", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],

    milestones: {
        0: {
            requirementDescription: "Unlocker 5",
            done() { return player.u5.points.gte(1) },
            effectDescription: "Unlock mega prestige, keep boosters on ultra prestige, and x10,000 points. Also, passively generate prestige!",
            unlocked() {return true},
            toggles: [["u","autoupg"],["r","autogen"]],
        },
    },
    layerShown(){return hasUpgrade('u', 15) && hasMilestone('u3', 0) || hasMilestone('u4', 0)}
})

addLayer("a", {
    startData() { return {
        unlocked: true,
    }},
    color: "yellow",
    row: "side",
    layerShown() {return true}, 
    tooltip() { // Optional, tooltip displays when the layer is locked
        return ("Achievements")
    },
    achievements: {
        11: {
            name: "Unlock",
            done() { return player.u1.points.gt(0) },
            tooltip: "Unlock the first time.",
            image: "",
        },
        12: {
            name: "Unlock+",
            done() { return player.u2.points.gt(0) },
            tooltip: "Unlock the second time.",
            image: "",
        },
        13: {
            name: "Unlock++",
            done() { return player.u3.points.gt(0) },
            tooltip: "Unlock the third time.",
            image: "",
        },
        14: {
            name: "Unlock+++",
            done() { return player.u4.points.gt(0) },
            tooltip: "Unlock the fourth time.",
            image: "",
        },
        21: {
            name: "Unlock++++",
            done() { return player.u5.points.gt(0) },
            tooltip: "Unlock the fifth time.",
            image: "",
        },
        22: {
            name: "Unlock*",
            done() { return player.u3.points.gt(3) },
            tooltip: "Unlock the sixth time.",
            image: "",
        },
        23: {
            name: "Unlock*+",
            done() { return player.u3.points.gt(4) },
            tooltip: "Unlock the seventh time.",
            image: "",
        },
        24: {
            name: "Unlock*++",
            done() { return player.u3.points.gt(5) },
            tooltip: "Unlock the eighth time.",
            image: "",
        },
    },
    tabFormat: [
        "blank", 
        ["display-text", function() { return "Achievements: "+player.a.achievements.length+"/"+(Object.keys(tmp.a.achievements).length-2) }], 
        "blank", "blank",
        "achievements",
    ],
})