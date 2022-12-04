const raid_level = [17, 25, 35, 50, 70, 80]
const maxbond = [10, 10, 20, 20, 50]
const gear_minlevelreq = [0, 15, 35]
const raid_reward_coin = [[40,0],[60,0],[80,0],[100,10],[120,20],[140,40]]
const languages = ['En', 'Jp', 'Kr', 'Tw', 'Cn', 'Th', 'Vi']
const label_smalltext_threshold = {'En':11, 'Jp':5, 'Kr':5, 'Tw':5, 'Cn': 5, 'Th': 11, 'Vi': 11}
const label_craft_smalltext_threshold = {'En':8, 'Jp':4, 'Kr':4, 'Tw':4, 'Cn': 4, 'Th': 8, 'Vi': 8}
const label_enemy_smalltext_threshold = {'En':12, 'Jp':6, 'Kr':6, 'Tw':6, 'Cn':6, 'Th': 12, 'Vi': 12}
const label_raid_smalltext_threshold = {'En':20, 'Jp':10, 'Kr':11, 'Tw':10, 'Cn':10, 'Th': 20, 'Vi': 20}
const adaptaionAmount = {0: "D", 1: "C", 2: "B", 3: "A", 4: "S", 5: "SS"}
const terrain_dmg_bonus = {D: 0.8, C: 0.9, B: 1, A: 1.1, S: 1.2, SS: 1.3}
const terrain_block_bonus = {D: 0, C: 15, B: 30, A: 45, S: 60, SS: 75}
const skill_ex_upgrade_credits = [80000, 500000, 3000000, 10000000]
const skill_upgrade_credits = [5000, 7500, 60000, 90000, 300000, 450000, 1500000, 2400000, 4000000]
const gear_upgrade_credits = [500000]
const enemy_rank = {'Champion': 1, 'Elite': 2, 'Minion': 3}
const max_gifts = 35
const max_gifts_ssr = 13
const conquest_events = [815]
const module_list = ['home','students','raids','stages','items','craft']
const striker_bonus_coefficient = {'MaxHP': 0.1, 'AttackPower': 0.1, 'DefensePower': 0.05, 'HealPower': 0.05,}
const gearId = {'Hat': 1000,'Gloves': 2000,'Shoes': 3000,'Bag': 4000,'Badge': 5000,'Hairpin': 6000,'Charm': 7000,'Watch': 8000,'Necklace': 9000,}
const timeAttackBG = {"Shooting": "TimeAttack_SlotBG_02", "Defense": "TimeAttack_SlotBG_01", "Destruction": "TimeAttack_SlotBG_03"}
const searchDelay = 100
const altSprite = [10017, 10033, 10041, 10042, 10043, 10048, 20009, 20014]
const buffIconKeys = {"AttackPower": "ATK","DefensePower": "DEF","CriticalPoint": "CriticalChance","CriticalDamageRate": "CriticalDamage","CriticalDamageResistRate": "CriticalDamageRateResist","DodgePoint": "Dodge","HealEffectivenessRate": "HealEffectiveness","AccuracyPoint": "HIT","MaxHP": "MAXHP","DefensePenetration": "Penetration","StabilityPoint": "Stability","RegenCost": "CostRegen"}
const studentStatList = ['MaxHP','AttackPower','DefensePower','HealPower','AccuracyPoint','DodgePoint','CriticalPoint','CriticalChanceResistPoint','CriticalDamageRate','CriticalDamageResistRate','StabilityPoint','Range','OppressionPower','OppressionResist','HealEffectivenessRate','AmmoCount']
const studentStatListFull = ['MaxHP','AttackPower','DefensePower','HealPower','AccuracyPoint','DodgePoint','CriticalPoint','CriticalChanceResistPoint','CriticalDamageRate','CriticalDamageResistRate','StabilityPoint','Range','OppressionPower','OppressionResist','HealEffectivenessRate','RegenCost','AttackSpeed','BlockRate','DefensePenetration', 'AmmoCount']
const enemyStatList = ['MaxHP','AttackPower','DefensePower','HealPower','AccuracyPoint','DodgePoint','CriticalPoint','CriticalChanceResistPoint','CriticalDamageRate','CriticalDamageResistRate','StabilityPoint','Range','MoveSpeed','AmmoCount']
const raidEnemyStatList = ['MaxHP','AttackPower','DefensePower','DamagedRatio','AccuracyPoint','DodgePoint','CriticalPoint','CriticalChanceResistPoint','CriticalDamageRate','CriticalDamageResistRate','StabilityPoint','Range',]

let userLang
let regionID

if (localStorage.getItem("language") && languages.includes(localStorage.getItem("language")))  {
    userLang = localStorage.getItem("language")
} else {
    let browserLang = window.navigator.language
    // guess user's language from their browser language
    switch (browserLang.split('-')[0]) {
        case 'ja':
            userLang = 'Jp'
            break;
        case 'ko':
            userLang = 'Kr'
            break;
        case 'th':
            userLang = 'Th'
            break;
        case 'vi':
            userLang = 'Vi'
            break;
        case 'zh':
            if (browserLang.toLowerCase().startsWith('zh-cn')) {
                userLang = 'Cn'
            } else {
                userLang = 'Tw'
            }
            break;
        default:
            userLang = 'En'
            break;
    }
}

if (localStorage.getItem("region")) {
    regionID = localStorage.getItem("region")
} else {
    regionID = 0
}

let data = {}

let json_list = {
    common: getCacheVerResourceName("./data/common.min.json"),
    raids: getCacheVerResourceName("./data/raids.min.json"),
    stages: getCacheVerResourceName("./data/stages.min.json"),
    crafting: getCacheVerResourceName(`./data/crafting.min.json`),
    summons: getCacheVerResourceName("./data/summons.min.json"),
}
let json_lang_list = getLanguageJSONList(userLang.toLowerCase())

function getLanguageJSONList(lang) {
    return {
        localization: getCacheVerResourceName(`./data/${lang}/localization.min.json`),
        students: getCacheVerResourceName(`./data/${lang}/students.min.json`),
        enemies: getCacheVerResourceName(`./data/${lang}/enemies.min.json`),
        items: getCacheVerResourceName(`./data/${lang}/items.min.json`),
        furniture: getCacheVerResourceName(`./data/${lang}/furniture.min.json`),
        equipment: getCacheVerResourceName(`./data/${lang}/equipment.min.json`),
        currency: getCacheVerResourceName(`./data/${lang}/currency.min.json`),
    }
}

const html_list = {
    craft: getCacheVerResourceName("./html/craft.html"),
    home: getCacheVerResourceName("./html/home.html"),
    items: getCacheVerResourceName("./html/items.html"),
    raids: getCacheVerResourceName("./html/raids.html"),
    stages: getCacheVerResourceName("./html/stages.html"),
    students: getCacheVerResourceName("./html/students.html")
}
const sort_functions = {
    Default: (a,b) => (a.DefaultOrder - b.DefaultOrder)*search_options["sortby_dir"],
    Name: (a,b) => getTranslatedString(a, 'Name').localeCompare(getTranslatedString(b, 'Name'))*search_options["sortby_dir"],
    AttackPower100: (a,b) => (b.AttackPower100 - a.AttackPower100)*search_options["sortby_dir"],
    DefensePower100: (a,b) => (b.DefensePower100 - a.DefensePower100)*search_options["sortby_dir"],
    MaxHP100: (a,b) => (b.MaxHP100 - a.MaxHP100)*search_options["sortby_dir"],
    HealPower100: (a,b) => (b.HealPower100 - a.HealPower100)*search_options["sortby_dir"],
    CriticalPoint: (a,b) => (b.CriticalPoint - a.CriticalPoint)*search_options["sortby_dir"],
    StabilityPoint: (a,b) => (b.StabilityPoint - a.StabilityPoint)*search_options["sortby_dir"],
    Range: (a,b) => (b.Range - a.Range)*search_options["sortby_dir"],
    AccuracyPoint: (a,b) => (b.AccuracyPoint - a.AccuracyPoint)*search_options["sortby_dir"],
    DodgePoint: (a,b) => (b.DodgePoint - a.DodgePoint)*search_options["sortby_dir"],
    EXCost: (a,b) => (find(b.Skills, "SkillType", "ex")[0].Cost[4] - find(a.Skills, "SkillType", "ex")[0].Cost[4])*search_options["sortby_dir"],
    EXHits: (a,b) => (find(b.Skills, "SkillType", "ex")[0].DamageDist.length - find(a.Skills, "SkillType", "ex")[0].DamageDist.length)*search_options["sortby_dir"],
}

const itemSortFunctions = {
    Default: (a,b) => (a.Id - b.Id)*itemSearchOptions["sortby_dir"],
    Name: (a,b) => getTranslatedString(a, 'Name').localeCompare(getTranslatedString(b, 'Name'))*itemSearchOptions["sortby_dir"],
}

let loadedModule

let student
let studentList
let studentCompare 

let statPreviewStarGrade
let statPreviewWeaponGrade
let statPreviewLevel
let statPreviewWeaponLevel
let statPreviewEquipment
let statPreviewBondLevel
let statPreviewBondAltLevel
let statPreviewPassiveLevel
let statPreviewExLevel
let statPreviewIncludePassive
let statPreviewIncludeExGear
let statPreviewIncludeBond
let statPreviewIncludeBondAlts
let statPreviewIncludeEquipment
let statPreviewIncludeBuffs
let statPreviewViewSupportStats = false
let statPreviewSelectedChar = 0
let statPreviewExternalBuffs
let statPreviewCustomBuffs
let statPreviewSupportStats
let studentCollection = {}

// Shared Timeouts
let collectionUpdateTimeout
let toastMessageTimeout
let searchDelayTimeout
let eventRefreshInterval
let recalculationLimitTimeout

let compareMode = false
let selectCompareMode = false
let showAltSprite = false
let showStudentListInfo = false

let loadedRaid
let loadedItem
let loadedItemType
let loadedStage
let loadedConquest
let loadedCraftNode
let loadedCraftId = 0

let itemList
let furnitureList
let equipmentList

let loadedStageList = null
let loadedItemList = null

let loadObserver

let region
let student_bondalts
let darkTheme
let highContrast
let enableCustomBuffs = false
let raid
let selectedEnemy = 0
let raid_difficulty = 0
let ta_difficulty = 0
let gridItemDisplayStyle = 'detailed'
let showNodeProbability = false

// searchbar properties
let searchResultsCount = 0
let searchResultsSelection = 0

//bs modal references
let studentSelectorModal
let statPreviewModal
let stageMapModal

let scrolling = false
let scrollPosition = {top: 0, left: 0, x: 0, y: 0}

//Todo: save this in a localStorage object so it is remembered across visits
let search_options = {
    "groupby": "none",
    "sortby": "Default",
    "sortby_dir": 1,
    "filter": {
        "SquadType": {
            "Main": false,
            "Support": false
        },
        "Collection": {
            "Owned": false,
            "NotOwned": false,
        },
        "TacticRole": {
            "Tanker": false,
            "DamageDealer": false,
            "Healer": false,
            "Supporter": false,
            "Vehicle": false,
        },
        "StarGrade": {
            3: false,
            2: false,
            1: false,
        },
        "BulletType": {
            "Explosion": false,
            "Pierce": false,
            "Mystic": false,
        },
        "ArmorType": {
            "LightArmor": false,
            "HeavyArmor": false,
            "Unarmed": false,
        },
        "School": {
            "Abydos": false,
            "Arius": false,
            "Gehenna": false,
            "Hyakkiyako": false,
            "Millennium": false,
            "RedWinter": false,
            "Shanhaijing": false,
            "Trinity": false,
            "Valkyrie": false,
            "SRT": false,
            "Others": false,
        },
        "WeaponType": {
            "SG": false,
            "SMG": false,
            "AR": false,
            "GL": false,
            "HG": false,
            "SR": false,
            "RG": false,
            "MG": false,
            "RL": false,
            "MT": false,
        },
        "Position": {
            "Front": false,
            "Middle": false,
            "Back": false,
        },
        "IsLimited": {
            0: false,
            1: false,
            2: false,
        },
        "StreetBattleAdaptation": {
            0: false,
            1: false,
            2: false,
            3: false,
            4: false,
        },
        "OutdoorBattleAdaptation": {
            0: false,
            1: false,
            2: false,
            3: false,
            4: false,
        },
        "IndoorBattleAdaptation": {
            0: false,
            1: false,
            2: false,
            3: false,
            4: false,
        },
        "Gear1": {
            "Hat": false,
            "Gloves": false,
            "Shoes": false
        },
        "Gear2": {
            "Bag": false,
            "Badge": false,
            "Hairpin": false
        },
        "Gear3": {
            "Charm": false,
            "Necklace": false,
            "Watch": false
        },
        "BondGear": false
    }
}

let itemSearchOptions = {
    "sortby": "Default",
    "sortby_dir": 1,
    "filter": {
        "ItemCategory": {
            "Material": false,
            "Coin": false,
            "Favor": false,
            "SecretStone": false,
            "Consumable": false,
            "Collectible": false,
        },
        "FurnitureSubCategory": {
            "Wallpaper": false,
            "Floor": false,
            "Background": false,
            "Table": false,
            "Chair": false,
            "Closet": false,
            "FloorDecoration": false,
            "WallDecoration": false,
            "Prop": false,
            "HomeAppliance": false,
            "Bed": false,
            "FurnitureEtc": false,
        },
        "EquipmentCategory": {
            "Exp": false,
            "WeaponExpGrowth": false,
            "Hat": false,
            "Gloves": false,
            "Shoes": false,
            "Bag": false,
            "Badge": false,
            "Hairpin": false,
            "Charm": false,
            "Necklace": false,
            "Watch": false,
        },
        "Rarity": {
            "N": false,
            "R": false,
            "SR": false,
            "SSR": false,
        },
        "FurnitureSet": {
            "100": false,
            "101": false,
            "102": false,
            "103": false,
            "104": false,
            "105": false,
            "106": false,
            "107": false,
            "108": false,
        },
        "EquipmentTier": {
            "1": false,
            "2": false,
            "3": false,
            "4": false,
            "5": false,
            "6": false,
            "7": false,
        },
        "FurnitureInteraction": false
    }
}

/** Classes */

/**
 * Represents a set of character stats
 */
 class CharacterStats {
    
    constructor(character, level, stargrade, transcendence=[], scaletype=0) {
        this.stats = {}
        let levelscale
        if (scaletype == 0) {
            levelscale = ((level-1)/99).toFixed(4)
        } else if (scaletype == 1) {
            levelscale = CharacterStats.getTimeAttackLevelScale(level)
        }

        if (transcendence.length == 0) {
            transcendence = [[0, 1000, 1200, 1400, 1700], [0, 500, 700, 900, 1400], [0, 750, 1000, 1200, 1500]]
        }

        let transcendenceAttack = 1
        let transcendenceHP = 1
        let transcendenceHeal = 1

        for (let i = 0; i < stargrade; i++) {
            transcendenceAttack += transcendence[0][i] / 10000
            transcendenceHP += transcendence[1][i] / 10000
            transcendenceHeal += transcendence[2][i] / 10000
        }

        let MaxHP = Math.ceil((Math.round((character.MaxHP1 + (character.MaxHP100-character.MaxHP1)*levelscale).toFixed(4))*transcendenceHP).toFixed(4))
        let AttackPower = Math.ceil((Math.round((character.AttackPower1 + (character.AttackPower100-character.AttackPower1)*levelscale).toFixed(4))*transcendenceAttack).toFixed(4))
        let DefensePower = Math.round((character.DefensePower1 + (character.DefensePower100-character.DefensePower1)*levelscale).toFixed(4))
        let HealPower = Math.ceil((Math.round((character.HealPower1 + (character.HealPower100-character.HealPower1)*levelscale).toFixed(4))*transcendenceHeal).toFixed(4))
        
        this.level = level
        this.terrain = [
            character.StreetBattleAdaptation ? character.StreetBattleAdaptation : 2,
            character.OutdoorBattleAdaptation ? character.OutdoorBattleAdaptation : 2,
            character.IndoorBattleAdaptation ? character.IndoorBattleAdaptation : 2
        ]
        this.activeBuffs = {}
        this.bulletType = character.BulletType
        this.armorType = character.ArmorType

        this.stats['MaxHP'] = [MaxHP,0,1]
        this.stats['AttackPower'] = [AttackPower,0,1]
        this.stats['DefensePower'] = [DefensePower,0,1]
        this.stats['HealPower'] = [HealPower,0,1]
        this.stats['AccuracyPoint'] = [character.AccuracyPoint,0,1]
        this.stats['DodgePoint'] = [character.DodgePoint,0,1]
        this.stats['CriticalPoint'] = [character.CriticalPoint,0,1]
        this.stats['CriticalDamageRate'] = [character.CriticalDamageRate,0,1]
        this.stats['CriticalChanceResistPoint'] = [character.CriticalResistPoint ? character.CriticalResistPoint : 100,0,1]
        this.stats['CriticalDamageResistRate'] = [character.CriticalDamageResistRate ? character.CriticalDamageResistRate : 5000,0,1]
        this.stats['StabilityPoint'] = [character.StabilityPoint,0,1]
        this.stats['AmmoCount'] = [character.AmmoCount,0,1]
        this.stats['AmmoCost'] = [character.AmmoCost,0,1]
        this.stats['Range'] = [character.Range,0,1]
        this.stats['RegenCost'] = [character.RegenCost,0,1]
        this.stats['DamagedRatio'] = [character.DamagedRatio,0,1]
        this.stats['HealEffectivenessRate'] = [10000,0,1]
        this.stats['OppressionPower'] = [100,0,1]
        this.stats['OppressionResist'] = [100,0,1]
        this.stats['AttackSpeed'] = [10000,0,1]
        this.stats['BlockRate'] = [0,0,1]
        this.stats['DefensePenetration'] = [0,0,1]
        this.stats['MoveSpeed'] = [character.MoveSpeed ? character.MoveSpeed : 200,0,1]
        this.stats['EnhanceExplosionRate'] = [10000,0,1]
        this.stats['EnhancePierceRate'] = [10000,0,1]
        this.stats['EnhanceMysticRate'] = [10000,0,1]
        this.stats['ExtendBuffDuration'] = [10000,0,1]
        this.stats['ExtendDebuffDuration'] = [10000,0,1]
        this.stats['ExtendCCDuration'] = [10000,0,1]
    }

    addBuff(stat, amount) {
        let stat_split = stat.split('_')
        if (stat_split.length > 1) {
            if (stat_split[1] == "Base") {
                this.stats[stat_split[0]][1] += amount
            } else if (stat_split[1] == "Coefficient") {
                this.stats[stat_split[0]][2] += amount/10000
            }
        } else {
            this.stats[stat_split[0]][1] += amount
        }
    }

    /**
     * Adds the specified stat from another instance of CharacterStats as a flat buff
     * @param {CharacterStats} chStats the instance of CharacterStats to add from
     * @param {*} stat the name of the stat to add
     * @param {*} coefficient the amount of the stat to add
     */
    addCharacterStatsAsBuff(chStats, stat, coefficient) {
        this.stats[stat][1] += Math.round(chStats.getTotal(stat) * (coefficient/10000))
    }

    /**
     * Calculates the final total of a stat with all flat and percentage buffs
     * @param {string} stat The name of the stat
     * @returns 
     */
    getTotal(stat) {
        return Math.max(Math.round(((this.stats[stat][0] + this.stats[stat][1]) * this.stats[stat][2]).toFixed(4)), 0)
    }

    /**
     * Calculates and returns the final total of a stat as a locale-formatted string
     * @param {*} stat 
     * @returns 
     */
    getTotalString(stat) {
        let total = this.getTotal(stat)
        if (CharacterStats.isRateStat(stat)) {
            return (total/100).toFixed(0).toLocaleString() + "%"
        } else {
            return total.toLocaleString()
        }
    }

    /**
     * Returns the base stat as a locale-formatted string
     * @param {*} stat 
     * @returns 
     */
    getBaseString(stat) {
        let total = this.stats[stat][0]
        if (stat == 'DamagedRatio') {
            return ((total-10000)/100).toFixed(0).toLocaleString() + "%"
        } else if (CharacterStats.isRateStat(stat)) {
            return (total/100).toFixed(0).toLocaleString() + "%"
        } else {
            return total.toLocaleString()
        }
    }

    /**
     * Returns the flat buff as a locale-formatted string
     * @param {*} stat 
     * @returns 
     */
    getFlatString(stat) {
        const sign = this.stats[stat][1] >= 0 ? '+' : ''
        return sign + this.stats[stat][1].toLocaleString()
    }

    /**
     * Returns the coefficient percent buff as a locale-formatted string
     * @param {*} stat 
     * @returns 
     */
    getCoefficientString(stat) {
        let val = (this.stats[stat][2] - 1) * 100
        const sign = (val >= 0) ? '+' : ''
        //hide decimal when > 100%
        val = (Math.abs(val) < 100) ? val.toFixed(1) : val.toFixed(0)
        return sign + parseFloat(val).toLocaleString() + "%"
    }

    getStrikerBonus(stat) {
        return Math.floor(this.getTotal(stat)*striker_bonus_coefficient[stat])
    }

    getStabilityMinDamageMod() {
        let stability =  this.getTotal('StabilityPoint')
        return (stability / (stability + 1000)) + 0.2
    }

    getStabilityMinDamage() {
        return parseFloat(((this.getStabilityMinDamageMod())*100).toFixed(2)) + "%"
    }

    getDefenseDamageReductionMod(piercing = 0) {
        let defense =  Math.max(this.getTotal('DefensePower') - piercing, 0)
        return (10000000 / (defense * 6000 + 10000000))
    }

    getDefenseDamageReduction() {
        return parseFloat(((1 - this.getDefenseDamageReductionMod())*100).toFixed(2)) + "%"
    }

    getCriticalHitChance(critRes) {
        let crit =  this.getTotal('CriticalPoint')
        return Math.max(Math.min(parseFloat(((1 - (4000000 / ((crit - critRes) * 6000 + 4000000)))*100).toFixed(2)), 100), 0) + "%"
    }

    addActiveBuffIcon(stat, value, stacks = 1) {
        stat = stat.replace('_Coefficient','').replace('_Base','').replace('100','').replace('1','')
        let buffIconKey
        if (stat.startsWith('Special_')) {
            buffIconKey = stat
        } else {
            buffIconKey = `${(value > 0) ? 'Buff' : 'Debuff'}_${(stat in buffIconKeys) ? buffIconKeys[stat] : stat}`
        }
        if (buffIconKey in this.activeBuffs) {
            this.activeBuffs[buffIconKey] += stacks
        } else {
            this.activeBuffs[buffIconKey] = stacks
        }
    }

    renderActiveBuffs(container, max) {
        let buffIcons = '', buffCount = 0, buffExtraCount = 0
        for (const buffIcon in this.activeBuffs) {
            const stackCount = this.activeBuffs[buffIcon]
            buffCount++
            if (buffCount <= max) {
                buffIcons += `<div class="active-buff"><img src="images/buff/Combat_Icon_${buffIcon}.png" width="22" height="26" class="">${stackCount > 1 ? `<span class="stack-count">${stackCount}</span>` : ''}</div>`
            } else {
                buffExtraCount++
            }
        }
        if (buffExtraCount) buffIcons += `<div class="px-1"><b>+${buffExtraCount}</b></div>`
        $(container).toggle(buffCount > 0).html(buffIcons)
    }

    static isRateStat(stat) {
        return stat.slice(-4) == "Rate" || stat.startsWith("AttackSpeed") || stat.startsWith("DamagedRatio")
    }

    static getTimeAttackLevelScale(level) {
        if (level <= 1) {
            return 0
        } else if (level == 2) {
            return 0.0101
        } else if (level <= 24) {
            return 0.0707
        } else if (level == 25) {
            return 0.0808
        } else if (level <= 39) {
            return 0.1919
        } else if (level == 40) {
            return 0.2020
        } else if (level <= 64) {
            return 0.4444
        } else if (level == 65) {
            return 0.4545
        } else if (level <= 77) {
            return 0.7172
        } else if (level == 78) {
            return 0.7273
        } else if (level >= 79) {
            return ((level-1)/99).toFixed(4)
        }
    }

    /**
     * Calculates the maximum damage dealt to a target by this character
     * @param {CharacterStats} target 
     */
    calculateDamage(target, damageRate, terrain) {
        const totalAttack = this.getTotal('AttackPower')
        const damagedRatio = (20000 - target.getTotal('DamagedRatio')) / 10000
        const levelMod = Math.max(Math.min(1 - (target.level - this.level) * 0.02, 1), 0.4)
        const defMod = target.getDefenseDamageReductionMod()
        const terrainMod = 0.8 + this.terrain[terrain] * 0.1
        const effectiveMod = this.getEffectiveMod(target.armorType)
        return totalAttack * terrainMod * effectiveMod * damageRate * defMod * damagedRatio * levelMod
    }

    getEffectiveMod(armorType) {
        let effMod = 1
        switch (this.bulletType) {
            case 'Explosion':
                if (armorType == 'LightArmor') {
                    effMod += this.getTotal('EnhanceExplosionRate') / 10000
                } else if (armorType == 'Unarmed') {
                    effMod -= 0.5
                }
                break
            case 'Pierce':
                if (armorType == 'HeavyArmor') {
                    effMod += this.getTotal('EnhancePierceRate') / 10000
                } else if (armorType == 'LightArmor') {
                    effMod -= 0.5
                }
                break
            case 'Mystic':
                if (armorType == 'Unarmed') {
                    effMod += this.getTotal('EnhanceMysticRate') / 10000
                } else if (armorType == 'HeavyArmor') {
                    effMod -= 0.5
                }
                break
        }
        return effMod
    }

}

class Buffs {

    buffs = []

    addBuff(buff) {
        this.buffs.push(buff)
    }

    removeBuff(index) {
        this.buffs.splice(index, 1)
    }

    static getBuffAmountText(buff) {
        let text = ''
        buff.Skill.Effect.Effects.forEach((effect, i) => {
            if (text != "") {
                text += ", "
            }
            let value
            if ('StackSame' in effect) {
                value = effect.Value[0][buff.Level-1] * buff.Stacks
            } else {
                value = effect.Value[buff.Stacks-1][buff.Level-1]
            }
            text += `<span data-effect='${i}'>${getStatName(effect.Stat)} <b>${value < 0 ? '' : '+'}${ExternalBuffs.statValueToString(effect.Stat, value)}</b></span>`
            
        })
        return text
    }

    static statValueToString(stat, val) {
        if (stat.endsWith('_Coefficient')) {
            return `${parseFloat((val/100).toFixed(1))}%`
        } else {
            return val.toLocaleString()
        }
    }
}

class ExternalBuffs extends Buffs {

    elements = {
        controls: null,
        searchBox: null,
        searchButton: null,
        autoAddButton: null,
        searchResults: null,
    }
    searchResultPopper = null
    searchBoxTimeout = null
    searchResultsSelection = 0
    searchResultsCount = 0

    constructor(elements) {
        super()
        this.elements = elements

        //Bind control update events
        $(this.elements.controls).on('input', 'input[type="range"]', (e) => {this.updateBuffLevel(e.currentTarget.dataset.index, e.currentTarget.value)})
        $(this.elements.controls).on('click', '.stack-count', (e) => {this.updateStackCount(e.currentTarget.dataset.index)})
        $(this.elements.controls).on('click', 'button.buff-remove', (e) => {this.removeBuff(e.currentTarget.dataset.index)})

        this.searchResultPopper = new ResultsPopper($(this.elements.searchBox).parent()[0], this.elements.searchResults)

        $(this.elements.searchResults).find('.search-list > div').on('click', 'div[data-student-id]', (e) => {
            const student = find(data.students, "Id", e.currentTarget.dataset["studentId"])[0]
            const skill = find(student.Skills, "SkillType", e.currentTarget.dataset["skillType"])[0]
            this.addBuff(student.Id, skill)
            $(e.currentTarget).toggleClass('disabled', true)
            this.searchResultPopper.hide()
            $(this.elements.searchBox).val('')
        })

        $(this.elements.searchButton).on('click', (e) => {
            if ($(this.elements.searchResults).is(':visible')) {
                this.searchResultPopper.hide()
            } else {
                if (this.searchBoxTimeout) {
                    clearTimeout(this.searchBoxTimeout)
                }
                this.searchBuffs()
            }

        })

        $(this.elements.autoAddButton).on('click', (e) => {
            if ($(this.elements.searchResults).is(':visible')) {
                this.searchResultPopper.hide()
            }
            const currentStudentId = student.Id
            //automatically add all own buffs as well as the set supports' skills
            let studentsToAdd = [currentStudentId]
            statPreviewSupportStats.supportStudents.forEach(s => {
                studentsToAdd.push(s.student.Id)
            })
            studentsToAdd.forEach(studentId => {
                const student = find(data.students, "Id", studentId)[0]
                student.Skills.forEach(skill => {
                    if ('Effect' in skill && (student.Id == currentStudentId || skill.Effect.Type == 2)) {
                        let available = true
                        find(this.buffs, "StudentId", student.Id).forEach((buff) => {
                            if (buff.Skill.SkillType == skill.SkillType) available = false
                        })
                        if (skill.SkillType == 'gearnormal' && !student.Gear.Released[regionID]) available = false
                        if (available) this.addBuff(student.Id, skill)                           
                    }
                })
            })
        })

        $(this.elements.searchBox).on('input', (e) => {

            if (this.searchBoxTimeout) {
                clearTimeout(this.searchBoxTimeout)
            }
            this.searchBoxTimeout = setTimeout(() => {
                if (e.currentTarget.value != "") {
                    this.searchBuffs()
                } else {
                    this.searchResultPopper.hide()
                }
            }, searchDelay)
        }).on('blur', (e) => {
            if (this.searchBoxTimeout) {
                clearTimeout(this.searchBoxTimeout)
            }
            if (e.currentTarget.value == "") this.searchResultPopper.hide()
        }).on('keyup keydown', (e) => {
            switch (e.code) {
                case 'Enter':
                    e.preventDefault()
                    if ($(this.elements.searchResults).is(':visible') && e.type == "keyup") {
                        if (this.searchResultsSelection == 0 && this.searchResultsCount > 0) {
                            $(this.elements.searchResults).find(`.search-list-item[data-index="1"]`).trigger("click")
                        } else {
                            $(this.elements.searchResults).find(`.search-list-item[data-index="${this.searchResultsSelection}"]`).trigger("click")
                        }
                    }
                    break
                case 'ArrowDown':
                    e.preventDefault()
                    if (e.type == "keydown" && this.searchResultsSelection < this.searchResultsCount) {
                        this.searchResultsSelection++
                        $(this.elements.searchResults).find('.search-list-item').removeClass("selected")
                        const listItem = $(this.elements.searchResults).find(`.search-list-item[data-index="${this.searchResultsSelection}"]`)
                        listItem.addClass("selected")
                        listItem[0].scrollIntoView({behavior: 'auto', block: 'nearest'})
                    }
                    break
                case 'ArrowUp':
                    e.preventDefault()
                    if (e.type == "keydown" && this.searchResultsSelection > 1)  {
                        this.searchResultsSelection--
                        $(this.elements.searchResults).find('.search-list-item').removeClass("selected")
                        const listItem = $(this.elements.searchResults).find(`.search-list-item[data-index="${this.searchResultsSelection}"]`)
                        listItem.addClass("selected")
                        listItem[0].scrollIntoView({behavior: 'auto', block: 'nearest'})
                    }
                    break
                case 'Escape':
                    e.preventDefault()
                    $(this.elements.searchBox).val('').trigger('blur')
                    break
            }
        })
    }

    addBuff(studentId, skill) {
        const maxLevel = skill.SkillType == 'ex' ? 5 : 10
        const maxStacks = 'StackSame' in skill.Effect.Effects[0] ? skill.Effect.Effects[0].StackSame : skill.Effect.Effects[0].Value.length
        super.addBuff({"StudentId": studentId, "Skill": skill, "MaxLevel": maxLevel, "Level": maxLevel, "Stacks": 1, "MaxStacks": maxStacks})
        this.renderControls()
        recalculateStats()
    }

    removeBuff(index, rerender = true) {
        super.removeBuff(index)
        if (rerender) {
            this.renderControls()
            recalculateStats()
        } 
    }

    changeStudent(studentId) {
        //removes invalid buffs
        for (let i = 0; i < this.buffs.length; i++) {
            const buff = this.buffs[i]
            if (buff.Skill.Effect.Type == 1 && buff.StudentId != studentId) {
                this.removeBuff(i--, false)
            }
        }
        this.renderControls()
        $(this.elements.searchBox).val('').trigger('blur')
    }

    updateBuffLevel(index, level) {
        const buff = this.buffs[index]
        const student = find(data.students, "Id", buff.StudentId)[0]
        buff.Level = level
        $(this.elements.controls).find(`div[data-index='${index}'] .ba-slider-label.skill-level`).html(level == buff.MaxLevel ? '<img src="images/ui/ImageFont_Max.png">' : `Lv.${level}`)
        $(this.elements.controls).find(`div[data-index='${index}'] .buff-description`).html(ExternalBuffs.getBuffAmountText(buff))
        recalculateStats()
    }

    updateStackCount(index) {
        const buff = this.buffs[index]
        const student = find(data.students, "Id", buff.StudentId)[0]
        if (++buff.Stacks > buff.MaxStacks) {
            buff.Stacks = 1
        } 
        $(this.elements.controls).find(`div[data-index='${index}'] .ba-slider-label.stack-count .label`).html(`&times;${buff.Stacks}`)
        $(this.elements.controls).find(`div[data-index='${index}'] .buff-description`).html(ExternalBuffs.getBuffAmountText(buff))
        recalculateStats()
    }

    renderControls() {
        let html = ''
        this.buffs.forEach((buff, i) => {
            const student = find(data.students, "Id", buff.StudentId)[0]
            html += `<div data-index="${i}" class="ba-panel p-2"><div class="mb-1 d-flex flex-row align-items-center gap-2"><div class="transferable-skill-icon align-self-start"><img class="student-icon" src="images/student/icon/${student.CollectionTexture}.png"><img class="skill-icon bg-skill ${student.BulletType.toLowerCase()}" src="images/skill/${buff.Skill.Icon}.png"></div><div class="flex-fill"><h5>${getTranslatedString(buff.Skill, 'Name')} <small>(${translateUI(`student_skill_${buff.Skill.SkillType}`)})</small></h5><p class="mb-0 buff-description" style="font-size: 0.875rem; line-height: 1rem;">${ExternalBuffs.getBuffAmountText(buff)}</p></div><button class="btn btn-sm btn-dark stat-panel-btn-sm buff-remove no-wrap align-self-start" type="button" data-index="${i}"><i class="fa-solid fa-xmark"></i></button></div><div class="d-flex flex-row align-items-center gap-2">${buff.MaxStacks > 1 ? `<span class="ba-slider-label stack-count" data-index="${i}"><img class="stack-icon invert-light" src="images/skill/${buff.Skill.Icon}.png"><span class="label">&times;${buff.Stacks}</span></span>` : ''}<input type="range" data-index="${i}" class="form-range flex-fill" value="${buff.Level}" min="1" max="${buff.MaxLevel}"><span class="ba-slider-label skill-level">${buff.Level == buff.MaxLevel ? '<img src="images/ui/ImageFont_Max.png">' : `Lv.${buff.Level}`}</span></div></div>`
        })
        $('#ba-statpreview-status-buffs').toggleClass('disabled', this.buffs.length == 0)
        $('#ba-statpreview-status-buffs-count').text(`(${this.buffs.length})`)
        $(this.elements.controls).html(html)
    }

    searchBuffs() {
        let html = "", resultCount = 0
        const currentStudentId = student.Id
        const searchTerm = this.elements.searchBox.value.toLowerCase()
        data.students.forEach(student => {
            if (student.IsReleased[regionID]) {
                student.Skills.forEach(skill => {
                    if ('Effect' in skill) {
                        if ((student.Id == currentStudentId || skill.Effect.Type == 2) && (searchContains(searchTerm, getTranslatedString(student, "Name")) || searchContains(searchTerm, getTranslatedString(skill, "Name")))) {
                            let available = true
                            find(this.buffs, "StudentId", student.Id).forEach((buff) => {
                                if (buff.Skill.SkillType == skill.SkillType) available = false
                            })
                            if (skill.SkillType == 'gearnormal' && !student.Gear.Released[regionID]) available = false
                            if (available) {
    
                                let desc = ""
                                const maxLevel = skill.SkillType == "ex" ? 4 : 9
    
                                skill.Effect.Effects.forEach(effect => {
                                    if (desc != "") {
                                        desc += ", "
                                    }
                                    desc += `${getStatName(effect.Stat)} <b>${effect.Value[0][0] < 0 ? '' : '+'}${ExternalBuffs.statValueToString(effect.Stat, effect.Value[0][0])}`
                                    let maxValue
                                    if ('StackSame' in effect) {
                                        maxValue = effect.Value[0][maxLevel] * effect.StackSame
                                    } else {
                                        maxValue = effect.Value[effect.Value.length-1][maxLevel]
                                    }
                                    if (effect.Value[0][0] != maxValue) {
                                        desc += `~${ExternalBuffs.statValueToString(effect.Stat, maxValue)}`
                                    }
                                    desc += '</b>'
                                })
                                html += ExternalBuffs.getSearchResultListItemHtml(student, skill, desc, ++resultCount)
                            }
                        }
                    }
                })
            }
        })
        this.searchResultsSelection = 0
        this.searchResultsCount = resultCount
        if (html != "") {
            this.searchResultPopper.show()
        } else {
            this.searchResultPopper.hide()
        }
        $(this.elements.searchResults).find('.search-list > div').html(html)
    }

    toggleDisabled(disabled) {
        $(this.elements.searchBox).add(this.elements.searchButton).add(this.elements.autoAddButton).attr('disabled', disabled)
        $(this.elements.controls).toggleClass('disabled', disabled)
    }

    static getSearchResultListItemHtml(student, skill, desc, index) {
        return `<div class="search-list-item" data-index="${index}" data-student-id="${student.Id}" data-skill-type="${skill.SkillType}"><div class="transferable-skill-icon me-2"><img class="student-icon" src="images/student/icon/${student.CollectionTexture}.png"><img class="skill-icon bg-skill ${student.BulletType.toLowerCase()}" src="images/skill/${skill.Icon}.png"></div><div class="search-list-item-detail"><span class="skill-name">${getTranslatedString(skill, "Name")} <small>(${translateUI(`student_skill_${skill.SkillType}`)})</small></span><span class="skill-details">${desc}</span></div></div>`
    }

}

class CustomBuffs extends Buffs {
    container
    elements = {
        controls: null,
        inputForm: null,
    }
    isCoefficient = false

    constructor(container) {
        super()
        this.container = container
        $(this.container).find('button.add-base').on('click', (e) => {this.addBuff(false)})
        $(this.container).find('button.add-coefficient').on('click', (e) => {this.addBuff(true)})
        $(this.container).on('click', 'button.buff-remove', (e) => {this.removeBuff(e.currentTarget.dataset.index)})       
        this.renderForm()
    }

    renderForm() {
        let html
        studentStatListFull.forEach(stat => {
            html += `<option value="${stat}">${getLocalizedString('Stat', stat)}</option>`
        })
        $(this.container).find('.stat-select').html(html)
    }

    renderControls() {
        let html = ''
        this.buffs.forEach((buff, i) => {
            html += `<div data-index="${i}" class="ba-panel p-2">
            <div class="d-flex flex-row align-items-center gap-2">
                <div class="flex-fill">
                    ${(buff.Name != '') ? `<h5 class="px-1">${buff.Name}</h5>` : ''}
                    <div class="d-flex">
                        <span class="stat-icon"><img class="invert-light" src="images/staticon/Stat_${buff.Stat.split('_')[0]}.png"></span>
                        <p class="mb-0">${getStatName(buff.Stat)} <b>${(buff.Amount >= 0 ? '+' : '')}${Buffs.statValueToString(buff.Stat, buff.Amount)}</b></p>
                    </div>
                </div>
                <button class="btn btn-sm btn-dark buff-remove stat-panel-btn-sm no-wrap align-self-start" type="button" data-index="${i}">
                    <i class="fa-solid fa-xmark"></i>
                </button>
            </div>
        </div>`
        })
        $(this.container).find('.controls').html(html)


    }

    addBuff(asCoefficient) {
        const stat = $(this.container).find('.stat-select').val()
        const amount = $(this.container).find('.amount-input').val()
        const name = $(this.container).find('.name-input').val()
        if (isNaN(parseInt(amount))) {
            toastMessage(`<i class="fa-solid fa-circle-xmark me-2"></i>${translateUI('toast_amount_invalid')}`, 2500, 'failure')
            return
        }
        if (asCoefficient) {
            super.addBuff({"Name": name, "Stat": stat + '_Coefficient', "Amount": parseInt(amount * 100)})
        } else {
            super.addBuff({"Name": name, "Stat": stat + '_Base', "Amount": parseInt(amount)})
        }
        this.renderControls()
        recalculateStats()
    }

    removeBuff(index) {
        super.removeBuff(index)
        this.renderControls()
        recalculateStats()
    }
}

class ResultsPopper {
    popperInstance = null 
    reference = null
    popup = null

    constructor(reference, popup) {
        //Bind search result popup
        this.reference = reference
        this.popup = popup
        this.popperInstance = Popper.createPopper(reference, popup, {
            placement: 'bottom-start',
            modifiers: [
                {
                    name: 'offset',
                    options: {
                        offset: [0, 8]
                    }
                },
                {
                    name: 'flip',
                    options: {
                        fallbackPlacements: ['bottom-start', 'top-start'],
                    }
                },
                {
                    name: 'preventOverflow',
                    options: {
                        boundary: $('ba-info-statpreview-panel .panel-sliders')[0],
                    }
                },
                {
                    name: 'updateWidth',
                    enabled: true,
                    phase: 'main',
                    fn: ({state}) => {
                        state.elements.popper.style.width = `${state.elements.reference.offsetWidth}px`
                    },
                }
            ]
        })
    }

    show() {
        $(this.popup).show()
        this.popperInstance.setOptions((options) => ({...options, modifiers: [...options.modifiers.filter(o => o.name != 'eventListeners'), {name: 'eventListeners', enabled: true}]}))
    }

    hide() {
        $(this.popup).hide()
        this.popperInstance.setOptions((options) => ({...options, modifiers: [...options.modifiers.filter(o => o.name != 'eventListeners'), {name: 'eventListeners', enabled: false}]}))
    }
}

class SupportStats {

    elements = {
        controls: null,
        searchBox: null,
        searchButton: null,
        searchResults: null,
    }
    supportStudents = []

    searchBoxTimeout = null
    searchResultsSelection = 0
    searchResultsCount = 0

    constructor(elements) {
        //populate the list
        this.elements = elements
        this.searchResultPopper = new ResultsPopper($(this.elements.searchBox).parent()[0], this.elements.searchResults)
        
        $(this.elements.searchResults).find('.search-list > div').on('click', 'div[data-student-id]', (e) => {
            this.addSupportStudent(e.currentTarget.dataset["studentId"])
            this.searchResultPopper.hide()
            $(this.elements.searchBox).val('')
        })

        $(this.elements.searchButton).on('click', (e) => {
            if ($(this.elements.searchResults).is(':visible')) {
                this.searchResultPopper.hide()
            } else {
                if (this.searchBoxTimeout) {
                    clearTimeout(this.searchBoxTimeout)
                }
                this.searchResultPopper.show()
                this.searchStudents()
            }
        })

        $(this.elements.searchBox).on('input', (e) => {
            if (this.searchBoxTimeout) {
                clearTimeout(this.searchBoxTimeout)
            }
            this.searchBoxTimeout = setTimeout(() => {
                if (e.currentTarget.value != "") {
                    this.searchResultPopper.show()
                    this.searchStudents()
                } else {
                    this.searchResultPopper.hide()
                }
            }, searchDelay)
        }).on('blur', (e) => {
            if (this.searchBoxTimeout) {
                clearTimeout(this.searchBoxTimeout)
            }
            if (e.currentTarget.value == "") this.searchResultPopper.hide()
        }).on('keyup keydown', (e) => {
            switch (e.code) {
                case 'Enter':
                    e.preventDefault()
                    if ($(this.elements.searchResults).is(':visible') && e.type == "keyup") {
                        if (this.searchResultsSelection == 0 && this.searchResultsCount > 0) {
                            $(this.elements.searchResults).find(`.search-list-item[data-index="1"]`).trigger("click")
                        } else {
                            $(this.elements.searchResults).find(`.search-list-item[data-index="${this.searchResultsSelection}"]`).trigger("click")
                        }
                    }
                    break
                case 'ArrowDown':
                    e.preventDefault()
                    if (e.type == "keydown" && this.searchResultsSelection < this.searchResultsCount) {
                        this.searchResultsSelection++
                        $(this.elements.searchResults).find('.search-list-item').removeClass("selected")
                        const listItem = $(this.elements.searchResults).find(`.search-list-item[data-index="${this.searchResultsSelection}"]`)
                        listItem.addClass("selected")
                        listItem[0].scrollIntoView({behavior: 'auto', block: 'nearest'})
                    }
                    break
                case 'ArrowUp':
                    e.preventDefault()
                    if (e.type == "keydown" && this.searchResultsSelection > 1)  {
                        this.searchResultsSelection--
                        $(this.elements.searchResults).find('.search-list-item').removeClass("selected")
                        const listItem = $(this.elements.searchResults).find(`.search-list-item[data-index="${this.searchResultsSelection}"]`)
                        listItem.addClass("selected")
                        listItem[0].scrollIntoView({behavior: 'auto', block: 'nearest'})
                    }
                    break
                case 'Escape':
                    e.preventDefault()
                    $(this.elements.searchBox).val('').trigger('blur')
                    break
            }
        })

        //Bind controls
        $(this.elements.controls).on('input', '.support-level input', (e) => {
            const index = $(e.currentTarget).closest('[data-index]').data('index')
            this.supportStudents[index].level = e.currentTarget.value
            const panel = $(`#supportstats-controls-${index}`)
            const support = this.supportStudents[index]
            $(`#supportstats-controls-${index} .support-level .ba-slider-label`).text(`Lv.${support.level}`)
            recalculateStatsWithDelay()
        })
        $(this.elements.controls).on('click', '.ba-statpreview-star', (e) => {
            const index = $(e.currentTarget).closest('[data-index]').data('index')
            const stars = parseInt(e.currentTarget.dataset.val)
            this.supportStudents[index].starGrade = stars
            this.supportStudents[index].weaponStarGrade = 0
            this.updateControlValues(index)
        })

        $(this.elements.controls).on('click', '.ba-weaponpreview-star', (e) => {
            const index = $(e.currentTarget).closest('[data-index]').data('index')
            const weaponStars = parseInt(e.currentTarget.dataset.val)
            this.supportStudents[index].starGrade = 5
            this.supportStudents[index].weaponStarGrade = weaponStars
            this.supportStudents[index].weaponLevel = 20 + (weaponStars*10)
            this.updateControlValues(index)
        })

        $(this.elements.controls).on('change', '.support-bond', (e) => {
            const index = $(e.currentTarget).closest('[data-index]').data('index')
            const bondNum = e.currentTarget.dataset.bond
            const level = Math.min(Math.max(parseInt(e.currentTarget.value), 1), parseInt(e.currentTarget.max))
            this.supportStudents[index].bond[bondNum] = level
            this.updateControlValues(index)
        }).on('click', '.support-bond', (e) => {e.currentTarget.select()})

        $(this.elements.controls).on('change', '.support-stat-weapon-level', (e) => {
            const index = $(e.currentTarget).closest('[data-index]').data('index')
            const weaponLevel = Math.min(Math.max(parseInt(e.currentTarget.value), 1), parseInt(e.currentTarget.max))
            this.supportStudents[index].weaponLevel = weaponLevel
            this.updateControlValues(index)
        })

        $(this.elements.controls).on('click', '.support-gear .dropdown-item', (e) => {
            const index = $(e.currentTarget).closest('[data-index]').data('index')
            const slot = $(e.currentTarget).closest('[data-slot]').data('slot')
            this.supportStudents[index].equipment[slot-1] = parseInt(e.currentTarget.dataset.tier)
            this.updateControlValues(index)
        })

        $(this.elements.controls).on('click', '.support-ex-gear', (e) => {
            const index = $(e.currentTarget).closest('[data-index]').data('index')
            this.supportStudents[index].gear = !this.supportStudents[index].gear
            $(e.currentTarget).toggleClass('deactivated', !this.supportStudents[index].gear)
            this.updateControlValues(index)
        })

        $(this.elements.controls).on('click', '.student-remove', (e) => {
            const index = $(e.currentTarget).closest('[data-index]').data('index')
            this.removeSupportStudent(index)
        })

        $(this.elements.controls).on('click', 'button.panel-collapse', (e) => {
            const index = $(e.currentTarget).closest('[data-index]').data('index')
            if ($(`#supportstats-controls-${index}`).hasClass('collapsing')) return
            this.supportStudents[index].panelOpen = !this.supportStudents[index].panelOpen
            $(e.currentTarget).toggleClass('active', this.supportStudents[index].panelOpen)
            $(`#supportstats-controls-${index}`).collapse(this.supportStudents[index].panelOpen ? 'show' : 'hide')
        })

    }

    showSearchResults() {
        $(this.elements.searchResults).show()
        this.searchResultPopper.setOptions((options) => ({...options, modifiers: [...options.modifiers.filter(o => o.name != 'eventListeners'), {name: 'eventListeners', enabled: true}]}))
    }

    hideSearchResults() {
        $(this.elements.searchResults).hide()
        this.searchResultPopper.setOptions((options) => ({...options, modifiers: [...options.modifiers.filter(o => o.name != 'eventListeners'), {name: 'eventListeners', enabled: false}]}))
    }

    addSupportStudent(studentId) {

        const student = find(data.students, 'Id', studentId)[0]
        //initialise using the saved stats
        const supportStudent = {"student": student}

        if (studentId in studentCollection) {
            const savedStudent = studentCollection[studentId]
            supportStudent.level = savedStudent.l
            supportStudent.starGrade = savedStudent.s
            supportStudent.weaponStarGrade = savedStudent.ws
            supportStudent.weaponLevel = savedStudent.wl
            supportStudent.equipment = [savedStudent.e1, savedStudent.e2, savedStudent.e3]
            supportStudent.gear = false
            supportStudent.bond = [savedStudent.b]
        } else {
            supportStudent.level = data.common.regions[regionID].studentlevel_max
            supportStudent.starGrade = 5
            supportStudent.weaponStarGrade = 3
            supportStudent.weaponLevel = data.common.regions[regionID].weaponlevel_max
            supportStudent.equipment = [data.common.regions[regionID].gear1_max, data.common.regions[regionID].gear2_max, data.common.regions[regionID].gear3_max]
            supportStudent.gear = false
            supportStudent.bond = [20]

        }
        student.FavorAlts.forEach(altId => {
            supportStudent.bond.push(altId in studentCollection ? studentCollection[altId].b : 1)
        })
        supportStudent.panelOpen = false
        this.supportStudents.push(supportStudent)

        this.renderControls()
    }

    removeSupportStudent(index) {
        this.supportStudents.splice(index, 1)
        this.renderControls()
    }

    searchStudents() {
        let html = "", resultCount = 0
        const searchTerm = this.elements.searchBox.value.toLowerCase()
        data.students.forEach(student => {
            if (student.SquadType == 'Support' && student.IsReleased[regionID]) {
                if (!this.supportStudents.find(s => s.student.Id == student.Id) && searchContains(searchTerm, getTranslatedString(student, "Name"))) {
                    html += SupportStats.getSearchResultListItemHtml(student, ++resultCount)
                }
            }
        })
        this.searchResultsSelection = 0
        this.searchResultsCount = resultCount
        if (html != "") {
            this.searchResultPopper.show()
        } else {
            this.searchResultPopper.hide()
        }
        $(this.elements.searchResults).find('.search-list > div').html(html)
    }

    static getSearchResultListItemHtml(student, index) {
        return `<div class="search-list-item" data-index="${index}" data-student-id="${student.Id}"><div class="search-list-item-icon"><img class="student-icon" src="images/student/icon/${student.CollectionTexture}.png"></div><div class="search-list-item-detail"><span>${getTranslatedString(student, "Name")}</span>${student.Id in studentCollection ? `<span class="text-small"><i class="me-1 fa-solid fa-circle-check"></i><span>${translateUI("collection_owned")}</span></span>` : `<span class="text-small text-muted"><i class="me-1 fa-solid fa-circle-xmark"></i><span>${translateUI("collection_notowned")}</span></span>`}</div></div>`
    }

    renderControls() {
        let html = ''
        this.supportStudents.forEach((support, index) => {
            html += `
            <div data-index="${index}" class="ba-panel p-2">
                <div class="d-flex flex-row align-items-center gap-2">
                    <div class="support-stats">
                        <img src="images/student/icon/${support.student.CollectionTexture}.png">
                    </div>
                    <div class="flex-fill">
                        <h5 class="support-stats-name">${support.student.Name}</h5>
                        <p class="support-stats-desc mb-0" style="font-size: 0.875rem; line-height: 1rem;"></p>
                    </div>
                    <div class="d-flex flex-column justify-content-between align-self-stretch">
                        <button class="btn btn-sm btn-dark stat-panel-btn-sm no-wrap student-remove" type="button"><i class="fa-solid fa-xmark"></i></button>
                        <button class="btn btn-sm btn-dark stat-panel-btn-sm no-wrap panel-collapse ${support.panelOpen ? ' active' : ''}"><i class="fa-solid fa-gear"></i></button>
                    </div>
                </div>
                <div class="collapse${support.panelOpen ? ' show' : ''}" id="supportstats-controls-${index}">
                    <div class="d-flex flex-column gap-2 pt-3">
                        <div class="d-flex flex-row align-items-center gap-2 support-level">
                            <input type="range" class="form-range flex-fill" value="${support.level}" min="1" max="${data.common.regions[regionID].studentlevel_max}">
                            <span class="ba-slider-label">Lv.${support.level}</span>
                        </div>  
                        <div class="d-flex flex-row flex-wrap align-items-center justify-content-center gap-2">
                            <div class="d-inline-block ba-panel statpreview-stars px-2 d-flex align-items-center">
                                <span class="ba-statpreview-star" data-val="1"><i class="fa-solid fa-star"></i></span>
                                <span class="ba-statpreview-star" data-val="2"><i class="fa-solid fa-star"></i></span>
                                <span class="ba-statpreview-star" data-val="3"><i class="fa-solid fa-star"></i></span>
                                <span class="ba-statpreview-star" data-val="4"><i class="fa-solid fa-star"></i></span>
                                <span class="ba-statpreview-star" data-val="5"><i class="fa-solid fa-star"></i></span>
                                <span class="ba-weaponpreview-star ms-2" data-val="1"><i class="fa-solid fa-star"></i></span>
                                <span class="ba-weaponpreview-star" data-val="2"><i class="fa-solid fa-star"></i></span>
                                <span class="ba-weaponpreview-star" data-val="3"><i class="fa-solid fa-star"></i></span>
                            </div>
                            ${SupportStats.renderBondControls(support.student)}
                            <input style="display:none;" type="number" class="support-stat-weapon-level form-control" value="${support.weaponLevel}" min="1" step="1" max="50"></span>
                            

                            
                        </div>
                        <div class="d-flex flex-row flex-wrap align-items-center justify-content-center gap-2 text-bold">
                            ${SupportStats.renderGearDropdown(1, support.student.Equipment[0])}
                            ${SupportStats.renderGearDropdown(2, support.student.Equipment[1])}
                            ${SupportStats.renderGearDropdown(3, support.student.Equipment[2])}`

            if ("Released" in support.student.Gear && support.student.Gear.Released[regionID]) {
                html += `
                <button class="btn-pill support-ex-gear ${ support.gear ? '' : 'deactivated'}">
                    <div class="icon"><img class="ba-item-n" src="images/gear/Gear_Icon_${support.student.Id}.png" width="28" height="28"></div>
                    <i class="fa-regular fa-square off mx-2"></i>
                    <i class="fa-solid fa-square-check on mx-2"></i>
                </button>
                `
            }
            html += `  </div>
                    </div>
                </div>
            </div>
            `
        })
        $(this.elements.controls).html(html)
        this.supportStudents.forEach((s, index) => this.updateControlValues(index, false))
        $(this.elements.searchBox).add(this.elements.searchButton).attr('disabled', this.supportStudents.length >= 2)
        recalculateStats()
    }

    updateControlValues(index, recalculate = true) {
        //const panel = $(this.elements.controls).find(`> div[data-index="${index}"]`)
        const panel = $(`#supportstats-controls-${index}`)
        const support = this.supportStudents[index]
        panel.find('.support-level .ba-slider-label').text(`Lv.${support.level}`)
        for (let i = 1; i <= 5; i++) {
            panel.find(`.ba-statpreview-star[data-val="${i}"]`).toggleClass('active', i <= support.starGrade)
        }
        for (let i = 1; i <= 3; i++) {
            panel.find(`.ba-weaponpreview-star[data-val="${i}"]`).toggleClass('active', i <= support.weaponStarGrade)
        }
        for (let i = 0; i < support.bond.length; i++) {
            panel.find(`.support-bond[data-bond="${i}"]`).val(support.bond[i])
        }
        panel.find('.support-stat-weapon-level').attr('max', 20 + (support.weaponStarGrade*10)).val(support.weaponLevel).attr('disabled', support.weaponStarGrade == 0)
        panel.find('.support-gear .dropdown-item.active').removeClass('active')
        for (let i = 1; i <= 3; i++) {
            panel.find(`.support-gear[data-slot="${i}"] .dropdown-item[data-tier="${support.equipment[i-1]}"]`).addClass('active')
            panel.find(`.support-gear[data-slot="${i}"] .support-gear-icon`).attr('src', `images/equipment/Equipment_Icon_${support.student.Equipment[i-1]}_Tier${support.equipment[i-1]}.png`)
            panel.find(`.support-gear[data-slot="${i}"] .support-gear-label`).text(`T${support.equipment[i-1]}`)
        }
        if (recalculate) recalculateStats()
    }

    static renderGearDropdown(slot, gear) {
        let html = `<div class="support-gear" data-slot="${slot}">
        <button class="btn-pill" data-bs-toggle="dropdown">
            <div class="icon"><img class="support-gear-icon ba-item-n" src="" width="28" height="28"></div>
            <span class="support-gear-label label"></span>
            <i class="caret fa-solid fa-caret-down me-2"></i>
        </button>
        <ul class="dropdown-menu dropdown-menu-dark dropdown-menu-start">`
        for (let i = 1; i <= data.common.regions[regionID][`gear${slot}_max`]; i++) {
            html += `<li><a class="dropdown-item dropdown-item-icon" data-tier="${i}" href="javascript:;"><img class="ba-item-n" src="images/equipment/Equipment_Icon_${gear}_Tier${i}.png"><span>T${i}</span></a></li>`
        }
        html += `</ul></div>`
        return html
    }

    static renderBondControls(student) {
        let html = `<div class="d-flex align-items-center justify-content-center gap-2"><div class="input-small"><div class="icon bond-small"><img src="images/student/icon/${student.CollectionTexture}.png"></div><input data-bond="0" class="form-control support-bond" type="number" value="1" min="1" max="${data.common.regions[regionID].bondlevel_max}"></div>`
        student.FavorAlts.forEach((id, i) => {
            const alt = find(data.students, 'Id', id)[0]
            html += `<div class="input-small"><div class="icon bond-small"><img src="images/student/icon/${alt.CollectionTexture}.png"></div><input data-bond="${i+1}" class="form-control support-bond" type="number" value="1" min="1" max="${data.common.regions[regionID].bondlevel_max}"></div>`
        })
        html += '</div>'
        return html
    }
}

/** Functions */

let loadPromise = loadJSON(Object.assign(json_list, json_lang_list), result => {
    data = result
})

if (localStorage.getItem("theme")) {
    $('body').toggleClass("theme-dark", (localStorage.getItem("theme") == 'dark'))
}

$.when($.ready, loadPromise).then(function() {

    //service worker
    if('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./sw.js')
    }

    //gtag settings
    gtag('config', 'G-K6ESZV7L7Y', {
        'custom_map': {
            'dimension1': 'user_language' 
        },
    })

    //load student settings
    statPreviewSettingsLoad()

    //load saved student collection
    if (localStorage.getItem("student_collection")) {
        studentCollection = JSON.parse(localStorage.getItem("student_collection"))
    }

    loadRegion(regionID)

    setSortedDataLists()

    if (localStorage.getItem("theme")) {
        darkTheme = localStorage.getItem("theme")
    } else {
        darkTheme = 'auto'
    }
    toggleDarkTheme(darkTheme)

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
        if (darkTheme == 'auto') {
            $('body').toggleClass("theme-dark", event.matches)
            document.querySelector('meta[name="theme-color"]').setAttribute('content', $('body').hasClass('theme-dark') ? '#212529' : '#dee2e6')
        }
    })

    $('body').toggleClass("reduced-motion", false)
    if (localStorage.getItem("high_contrast")) {
        highContrast = (localStorage.getItem("high_contrast") == "true")
    } else {
        highContrast = (!CSS.supports('backdrop-filter', 'blur(1px)')) || window.matchMedia('(prefers-contrast: more)').matches 
    }

    if (localStorage.getItem("enable_custom_buffs")) {
        enableCustomBuffs = (localStorage.getItem("enable_custom_buffs") == "true")
    }

    $('body').toggleClass("high-contrast", highContrast)

    //prevent tooltips from sticking on buttons 
    $('body').on('click', '.tooltip-button', e => {
        if (e.originalEvent.pointerType == "touch") {
            $(".tooltip").tooltip("hide")
        }
    }).on('mouseleave', '.tooltip-button', (e) => {
        $(".tooltip").tooltip("hide")
    })
    
    $('#collection-data-import-planner-btn').tooltip({title: getBasicTooltip(translateUI('tooltip_import_planner')), placement: 'top', html: true})

    $(`#ba-navbar-regionselector-${regionID}`).addClass("active")
    $(`#ba-navbar-languageselector span`).text($(`#ba-navbar-languageselector-${userLang.toLowerCase()}`).text())
    $(`#ba-navbar-languageselector-${userLang.toLowerCase()}`).addClass("active")
    $(`#ba-navbar-themeswitcher-${darkTheme}`).addClass("active")
    $(`#ba-navbar-contrast-toggle-${highContrast}`).addClass("active")
    $(`#ba-navbar-custombuffs-toggle-${enableCustomBuffs}`).addClass("active")

    $('#ba-navbar-search').on('input', function() {
        if (searchDelayTimeout) {
            clearTimeout(searchDelayTimeout)
        }
        searchDelayTimeout = setTimeout(allSearch, searchDelay)
    }).on('keydown', searchNavigate).on('keyup', searchNavigate)

    $('#navbar-search-clear').on('click', function() {
        $('#'+this.dataset.target).val('').trigger('blur')
        allSearch()
        $(this).hide()
    })

    //populate Changelog
    let changelogHtml = ""
    $.each(data.common.changelog, function(i, el) {
        changelogHtml += `<h5 class="text-emphasis px-2">${el.date}</h5>`
        changelogHtml += '<div class="p-2 mb-3">'
        for (let j = 0; j < el.contents.length; j++) {
            changelogHtml += `<div>${el.contents[j]}</div>`
        }
        changelogHtml += '</div>'
    })
    $("#modal-changelog-content").html(changelogHtml)
    const currentChangelog = parseInt(data.common.changelog[0].date.replace(/\//g,''))
    if (localStorage.getItem("changelog_seen")) {
        if (currentChangelog > parseInt(localStorage.getItem("changelog_seen"))) {
            $("#modal-changelog").modal('show')
            localStorage.setItem("changelog_seen", currentChangelog)
        } 
    } else {
        $("#modal-changelog").modal('show')
        localStorage.setItem("changelog_seen", currentChangelog)
    }

    //Keyboard Shortcut for search
    $(document).on('keydown', function(e) {

        // Esc: Defocus current input field
        if (e.code === 'Escape') {
            $('input:focus').trigger('blur')
        }

        // Combination keyboard shortcuts
        if (e.ctrlKey || e.metaKey) {

            // Ctrl + K: Search
            if (e.code === 'KeyK') {
                focusSearch()
                e.preventDefault()
            }

        }

        // Ignore single key shortcuts if an input is focused
        if ($('input:focus').length) return

        switch (e.code) {
            case 'Slash':
                focusSearch()
                e.preventDefault()
                break
            case 'KeyL':
                if (loadedModule === 'students' && !$('#ba-student-modal-students').hasClass('show')) {
                    $('#ba-student-modal-students').modal('show', 'shortcut')
                }
                e.preventDefault()
                break
        }

        function focusSearch() {
            if ($('#ba-student-modal-students').hasClass('show')) {
                $('#ba-student-search-text').trigger('focus')
            } else {
                $('#ba-navbar-search').trigger('focus')
            }
        }

        
    })

    $(window).on('popstate', () => loadModuleFromURL(false))
    loadModuleFromURL(true)
})

/**
 * Loads the module based on the present query string parameter. If no query string is present then loads the last module the user visited
 */
function loadModuleFromURL(loadlast) {
    var urlVars = new URL(window.location.href).searchParams
    if (urlVars.get("chara")) {
        loadStudent(urlVars.get("chara"))
    } else if (urlVars.get("charaid")) {
        loadStudentById(urlVars.get("charaid"))
    } else if (urlVars.get("item")) {
        loadItem(urlVars.get("item"))
    } else if (urlVars.get("raid")) {
        loadRaid(urlVars.get("raid"))
    } else if (urlVars.get("stage")) {
        loadStage(urlVars.get("stage"))
    } else if (urlVars.get("craftnode")) {
        loadCraft(urlVars.get("craftnode"))
    } else {
        if (loadlast) loadLastModule()
        else loadModule('home')
    }
}

/**
 * Loads the last module the user visited, if no page has been visited then loads the home module instead
 */
function loadLastModule() {
    if (localStorage.getItem("module") && module_list.includes(localStorage.getItem("module"))) {
        loadModule(localStorage.getItem("module"))
    } else {
        loadModule('home')
    }
}

/**
 * Loads the specified module with an optional entry to navigate to.
 * @param {string} moduleName The name of the module to load
 * @param {*} entry (Optional) The id of the entry to navigate to
 */
function loadModule(moduleName, entry=null) {
    if (loadObserver) loadObserver.disconnect()
    $('.modal').not('#modal-changelog').modal('hide')
    clearInterval(eventRefreshInterval)
    if (moduleName == 'students') {
        loadedModule = 'students'
        $(".navbar-nav .nav-link").removeClass('active')
        $("#ba-navbar-link-students").addClass('active')
        $("#loaded-module").load(html_list['students'], function() {
            loadRegion(regionID)
            loadLanguage(userLang)
            $('#statpreview-buff-custom').toggle(enableCustomBuffs)

            studentSelectorModal = new bootstrap.Modal(document.getElementById("ba-student-modal-students"), {})
            document.getElementById("ba-student-modal-students").addEventListener('hidden.bs.modal', function (e) {
                selectCompareMode = false
            })

            generateStatTable('#ba-student-stat-table', studentStatList, 6)
            generateStatTable('#ba-student-stat-modal-table', studentStatListFull, 12, 1)
            generateStatTable('#ba-weapon-stat-table', ['AttackPower', 'MaxHP', 'HealPower'], 6)

            statPreviewViewSupportStats = false
            compareMode = false
            updateCompareModeControl()
            selectCompareMode = false

            $('#ba-statpreview-levelrange').val(statPreviewLevel)
            changeStatPreviewLevel(document.getElementById('ba-statpreview-levelrange'), false)
            $('#ba-statpreview-weapon-range').val(statPreviewWeaponLevel)
            $('#ba-statpreview-gear1-range').val(statPreviewEquipment[0])
            $('#ba-statpreview-gear2-range').val(statPreviewEquipment[1])
            $('#ba-statpreview-gear3-range').val(statPreviewEquipment[2])
            $('#ba-statpreview-passiveskill-range').val(statPreviewPassiveLevel)
            $('#ba-statpreview-summon-range').val(statPreviewExLevel)

            $('#ba-student-search-filter-collection').toggle(Object.keys(studentCollection).length > 0)
            $(".tooltip").tooltip("hide")

            statPreviewExternalBuffs = new ExternalBuffs({
                controls: $('#statpreview-buff-transferable-controls')[0],
                searchBox: $('#statpreview-buff-transferable-search-text')[0],
                searchButton: $('#statpreview-buff-transferable-search-btn')[0],
                autoAddButton: $('#statpreview-buff-transferable-autoadd-btn')[0],
                searchResults: $('#statpreview-buff-transferable-search .search-list-container')[0],
            })

            statPreviewCustomBuffs = new CustomBuffs($('#statpreview-buff-custom')[0])

            statPreviewSupportStats = new SupportStats({
                controls: $('#statpreview-supportstats-controls')[0],
                searchBox: $('#statpreview-supportstats-search-text')[0],
                searchButton: $('#statpreview-supportstats-search-btn')[0],
                searchResults: $('#statpreview-supportstats-search-list')[0],
            })

            var urlVars = new URL(window.location.href).searchParams

            if (entry != null) {
                loadStudent(entry)
            } else if (urlVars.has("chara")) {
                loadStudent(urlVars.get("chara"))
            } else if (urlVars.has("charaid")) {
                loadStudentById(urlVars.get("charaid"))
            } else if (localStorage.getItem("chara")) {
                loadStudent(localStorage.getItem("chara"))
            } else {
                loadStudent("Aru")
            }
        
            populateStudentList()
        
            if (localStorage.getItem("chara_groupby")) {
                searchOptionSet('groupby', localStorage.getItem("chara_groupby"), false)
            } else {
                searchOptionSet('groupby', 'none', false)
            }
        
            if (localStorage.getItem("chara_sortby_dir")) {
                search_options["sortby_dir"] = parseInt(localStorage.getItem("chara_sortby_dir"))
            }

            if (localStorage.getItem("chara_sortby")) {
                searchSetOrder(localStorage.getItem("chara_sortby"), false, false)
            } else {
                searchSetOrder('Default', false, false)
            }
        
            if (localStorage.getItem("show_student_list_info")) {
                showStudentListInfo = (localStorage.getItem("show_student_list_info") == 'true')
            }

            Object.entries(search_options.filter).forEach(i => {
                if (typeof i[1] === 'boolean') {
                    $(`#ba-student-search-filter-${i[0].toLowerCase()}`).toggleClass("active", i[1])
                } else {
                    Object.entries(i[1]).forEach(j => {
                        $(`#ba-student-search-filter-${i[0].toLowerCase()}-${String(j[0]).toLowerCase()}`).toggleClass("active", j[1])
                    })
                }
            })
            activeFilters = getNumActiveFilters()
            $('#ba-student-search-filter-amount').text(activeFilters == 0 ? '' : ` (${activeFilters})`)
            $('#ba-student-search-reset').toggle(activeFilters > 0 || $('#ba-student-search-text').val() != "")
            $('#ba-student-search-filters-panel').on('show.bs.collapse', function() {
                $('#student-search-filters-btn').toggleClass('active', true)
            }).on('hide.bs.collapse', function() {
                $('#student-search-filters-btn').toggleClass('active', false)
            })

            $('.summon-list').on('click', '.dropdown-item', function() {
                changeStudentSummon($(this).data('summon-id'))
            })

            updateStudentList(updateSortMethod = true)
    
            window.setTimeout(function(){$("#loading-cover").fadeOut()},50)
        
            $('#ba-student, #ba-student-list-btn').show()
            $('#ba-statpreview-status-equipment').tooltip({title: getBasicTooltip(translateUI('tooltip_equipment_bonus')), placement: 'top', html: true})
            $('#ba-statpreview-status-buffs').tooltip({title: getBasicTooltip(translateUI('tooltip_buffs_bonus')), placement: 'top', html: true})
            $('#ba-statpreview-status-passive-level').tooltip({title: getBasicTooltip(translateUI('tooltip_passiveskill_bonus')), placement: 'top', html: true})
            $('#ba-statpreview-status-strikerbonus').tooltip({title: getBasicTooltip(translateUI('tooltip_supportstats')), placement: 'top', html: true})

            $('#ba-student-modal-students').on('shown.bs.modal', function (ev) {
                if (ev.relatedTarget === 'shortcut') {
                    $('#ba-student-search-text').trigger('focus')
                }
            })

            $('#ba-student-search-text').on('input', function() {
                if (searchDelayTimeout) {
                    clearTimeout(searchDelayTimeout)
                }
                searchDelayTimeout = setTimeout(updateStudentList, searchDelay)
            })

            $('#ba-student-toggle-sprite-btn').on('click', e => {
                showAltSprite = !showAltSprite
                $('#ba-student-img').attr('src', `images/student/portrait/Portrait_${student.DevName}${showAltSprite ? '_2' : ''}.webp`)
            })

            $('#ba-student-search-showinfo').tooltip({title: getBasicTooltip(translateUI('student_search_info')), html: true, placement: 'top'})
            $('#ba-student-search-showinfo').toggleClass('active', showStudentListInfo)
            $('#ba-student-search-showinfo').on('click', function() {
                showStudentListInfo = !showStudentListInfo
                localStorage.setItem('show_student_list_info', showStudentListInfo)
                $(this).toggleClass('active', showStudentListInfo).tooltip('hide')
                $('#student-select-grid').toggleClass('show-info', showStudentListInfo)
            })
            $('#student-select-grid').toggleClass('show-info', showStudentListInfo)
            
            $('#ba-student-modal-statpreview').on('shown.bs.modal hidden.bs.modal', recalculateStats)
            window.scrollTo({top: 0, left: 0, behavior: 'instant'})

        })
    } else if (moduleName == 'items') {
        loadedModule = 'items'
        $(".navbar-nav .nav-link").removeClass('active')
        $("#ba-navbar-link-items").addClass('active')
        var bgimg = new Image()
        bgimg.onload = function(){
            $("#ba-background").css('background-image', `url('${bgimg.src}')`)
        }
        bgimg.src = `images/background/BG_MainOffice_Night.jpg`
        $("#loaded-module").load(html_list['items'], function() {
            loadRegion(regionID)
            loadLanguage(userLang)
            loadedItemList = null
            $(".tooltip").tooltip("hide")
            var urlVars = new URL(window.location.href).searchParams
        
            if (localStorage.getItem("item_sortby_dir")) {
                itemSearchOptions["sortby_dir"] = parseInt(localStorage.getItem("item_sortby_dir"))
            }

            if (localStorage.getItem("item_sortby")) {
                searchSetOrderItems(localStorage.getItem("item_sortby"), false, false)
            } else {
                searchSetOrderItems('Default', false, false)
            }

            if (localStorage.getItem("grid_item_display_style")) {
                gridItemDisplayStyle = localStorage.getItem("grid_item_display_style")
            }

            $('#item-search-displaytype-'+gridItemDisplayStyle).addClass('active')
            switch (gridItemDisplayStyle) {
                case 'detailed':
                    $('#item-select-grid').addClass('items')
                    break;
            
                case 'compact':
                    $('#item-select-grid').addClass('items-compact')
                    break;
            }

            $('#item-select-grid').on('click', 'div[data-itemid]', function(e){loadItem($(this).data('itemid'))})
        
            Object.entries(itemSearchOptions.filter).forEach(i => {
                if (typeof i[1] === 'boolean') {
                    $(`#item-search-filter-${i[0].toLowerCase()}`).toggleClass("active", i[1])
                } else {
                    Object.entries(i[1]).forEach(j => {
                        $(`#item-search-filter-${i[0].toLowerCase()}-${String(j[0]).toLowerCase()}`).toggleClass("active", j[1])
                    })
                }
            })

            if (entry != null) {
                loadItem(entry)
            } else if (urlVars.has("item")) {
                loadItem(urlVars.get("item"))
            } else if (localStorage.getItem("item")) {
                loadItem(localStorage.getItem("item"))
            } else {
                loadItem(1)
            }

            $('#item-search-text').on('input', function() {
                if (searchDelayTimeout) {
                    clearTimeout(searchDelayTimeout)
                }
                searchDelayTimeout = setTimeout(updateItemList, searchDelay)
            })

            $('#item-search-filters-panel').on('show.bs.collapse', function() {
                $('#item-search-filters-btn').toggleClass('active', true)
            }).on('hide.bs.collapse', function() {
                $('#item-search-filters-btn').toggleClass('active', false)
            })
            window.setTimeout(function(){$("#loading-cover").fadeOut()},50)
            window.scrollTo({top: 0, left: 0, behavior: 'instant'})
        })
    } else if (moduleName == 'raids') {
        loadedModule = 'raids'
        $(".navbar-nav .nav-link").removeClass('active')
        $("#ba-navbar-link-raids").addClass('active')
        let bgimg = new Image()
        bgimg.onload = function(){
            $("#ba-background").css('background-image', `url('${bgimg.src}')`)
        }
        bgimg.src = `images/background/BG_Raid.jpg`
        $("#loaded-module").load(html_list['raids'], function() {
            loadLanguage(userLang)
            $(".tooltip").tooltip("hide")
            let urlVars = new URL(window.location.href).searchParams
        
            generateStatTable('#ba-raid-enemy-stats', raidEnemyStatList, 6)
            generateStatTable('#ba-stage-enemy-stat-table', enemyStatList, 6)

            populateRaidList()

            if (entry != null) {
                loadRaid(entry)
            } else if (urlVars.has("raid")) {
                loadRaid(urlVars.get("raid"))
            } else if (localStorage.getItem("raid")) {
                loadRaid(localStorage.getItem("raid"))
            } else {
                loadRaid(1)
            }
            
            if (regionID == 1) {
                $('#ba-raid-list-tab-worldraid').hide()
            }
            window.setTimeout(function(){$("#loading-cover").fadeOut()},50)
            window.scrollTo({top: 0, left: 0, behavior: 'instant'})
        })
    } else if (moduleName == 'stages') {
        loadedModule = 'stages'
        $(".navbar-nav .nav-link").removeClass('active')
        $("#ba-navbar-link-stages").addClass('active')
        let bgimg = new Image()
        bgimg.onload = function(){
            $("#ba-background").css('background-image', `url('${bgimg.src}')`)
        }
        bgimg.src = `images/background/BG_HQ.jpg`
        $("#loaded-module").load(html_list['stages'], function() {
            loadLanguage(userLang)
            loadedStageList = null
            stageMapModal = new bootstrap.Modal(document.getElementById("ba-stage-modal-map"), {})
            if (region.weaponlevel_max == 0) {
                $('#ba-stages-list-tab-schooldungeon').hide()
            }
            $(".tooltip").tooltip("hide")
            var urlVars = new URL(window.location.href).searchParams
        
            generateStatTable('#ba-stage-enemy-stat-table', enemyStatList, 6)

            if (entry != null) {
                loadStage(entry)
            } else if (urlVars.has("stage")) {
                loadStage(urlVars.get("stage"))
            } else if (localStorage.getItem("stage")) {
                loadStage(localStorage.getItem("stage"))
            } else {
                loadStage(1011101)
            }
            
            makeDraggable($('#ba-stage-map'))
            makeDraggable($('#ba-conquest-map'))
            makeDraggable($('#ba-stage-modal-map-container'))
            window.setTimeout(function(){$("#loading-cover").fadeOut()},50)
            window.scrollTo({top: 0, left: 0, behavior: 'instant'})
        })
    } else if (moduleName == 'craft') {
        loadedModule = 'craft'
        $(".navbar-nav .nav-link").removeClass('active')
        $("#ba-navbar-link-craft").addClass('active')
        var bgimg = new Image()
        bgimg.onload = function(){
            $("#ba-background").css('background-image', `url('${bgimg.src}')`)
        }
        bgimg.src = `images/background/BG_CraftChamber_Night.jpg`
        $("#loaded-module").load(html_list['craft'], function() {
            loadLanguage(userLang)
            $(".tooltip").tooltip("hide")
            var urlVars = new URL(window.location.href).searchParams

            if (localStorage.getItem("show_node_probability")) {
                showNodeProbability = (localStorage.getItem("show_node_probability") == 'true')
            }
        
            if (entry != null) {
                loadCraft(entry)
            } else if (urlVars.has("craftnode")) {
                loadCraft(urlVars.get("craftnode"))
            } else if (localStorage.getItem("craftnode")) {
                loadCraft(localStorage.getItem("craftnode"))
            } else {
                loadCraft(1)
            }
            populateCraftList()

            if (loadedCraftId >= 100000) {
                $('#ba-item-list-tab-fusion').tab('show')
            } else {
                $('#ba-item-list-tab-synthesis').tab('show')
            }

            $('#fusion-select-grid').on('click', 'div[data-itemid]', function(e){loadCraft($(this).data('itemid'))})

            $('#craft-toggle-chance').toggleClass('active', showNodeProbability)
            $('#craft-toggle-chance').on('click', function() {
                showNodeProbability = !showNodeProbability
                localStorage.setItem('show_node_probability', showNodeProbability)
                $(this).toggleClass('active', showNodeProbability)
                $('#craft-select-grid .stage-droprate').toggleClass('hidden', !showNodeProbability)
            })
            $('#craft-select-grid .stage-droprate').toggleClass('hidden', !showNodeProbability)

            $('#craft-search-text').on('input', function() {
                if (searchDelayTimeout) {
                    clearTimeout(searchDelayTimeout)
                }
                searchDelayTimeout = setTimeout(populateCraftList, searchDelay)
            })
            window.setTimeout(function(){$("#loading-cover").fadeOut()},50)
            window.scrollTo({top: 0, left: 0, behavior: 'instant'})
        })
    } else {
        loadedModule = 'home'
        $(".navbar-nav .nav-link").removeClass('active')
        $("#ba-navbar-link-home").addClass('active')
        var bgimg = new Image()
        bgimg.onload = function(){
            $("#ba-background").css('background-image', `url('${bgimg.src}')`)
        }
        bgimg.src = `images/background/BG_ReceptionRoom.jpg`
        $("#loaded-module").load(html_list['home'], function() {
            loadLanguage(userLang)
            loadRegion(regionID)

            populateEvents()
            eventRefreshInterval = window.setInterval(updateEventTimers, 60000)

            $('#ba-home-server-info').text(translateUI('current_events', [getLocalizedString('ServerName', regionID)]))
            window.setTimeout(function(){$("#loading-cover").fadeOut()},50)
            let url = new URL(window.location.href)
    
            if (url.searchParams.toString() != '') {
                url.searchParams.forEach((v,k) => url.searchParams.delete(k))
                history.pushState(null, '', url)
            }
            $('title').html(`Schale DB`)
            $('#ba-navbar-content').collapse('hide')
            window.scrollTo({top: 0, left: 0, behavior: 'instant'})
        })
    }
    localStorage.setItem("module", loadedModule)
}

function populateEvents() {
    let gachatext = translateUI('gacha_pickup') + "\n", gachalistHtml = ""
    let currentTime = new Date().getTime() / 1000, dateOptions = { month: "numeric", day: "numeric", hour: "numeric", minute: "numeric", timeZoneName: "short" }
    let found = false
    $('#events-row-1').hide()
    $.each(data.common.regions[regionID].current_gacha, function (i, el) {
        if (((currentTime >= el.start && currentTime < el.end) || (currentTime <= el.start)) && !found) {
            for (let j = 0; j < el.characters.length; j++) {
                var char = find(data.students, "Id", el.characters[j])[0]
                gachalistHtml += getStudentListCardHTML(char)
            }
            $('#events-row-1').show()
            gachatext += new Date(el.start * 1000).toLocaleString([], dateOptions) + ' - ' + new Date(el.end * 1000).toLocaleString([], dateOptions)
            gachatext += `\n<span id="ba-home-gacha-timer" class="home-timer" data-start="${el.start}" data-end="${el.end}"></span>`
            // gachatext += '\n' + (currentTime >= el.start ? translateUI('event_ends', duration(el.end - currentTime)) : translateUI('event_starts', duration(el.start - currentTime)))
            found = true
        }
    })

    $('#ba-home-gacha-text').html(gachatext)
    $('#ba-home-gacha-list').html(gachalistHtml)

    let raidText = "", raidHtml = ""
    $('#events-row-2').hide()
    found = false
    $.each(data.common.regions[regionID].current_raid, function (i, el) {
        if (((currentTime >= el.start && currentTime < el.end) || (currentTime <= el.start)) && !found) {
            if (el.raid >= 1000) {
                raidText = getLocalizedString("StageType", "TimeAttack") + "\n"
                let raid = find(data.raids.TimeAttack, "Id", el.raid)[0]
                raidHtml += getTimeAttackCardHTML(raid, raid.Terrain)
            } else {
                raidText = getLocalizedString("StageType", "Raid") + "\n"
                let raid = find(data.raids.Raid, "Id", el.raid)[0]
                raidHtml += getRaidCardHTML(raid, el.terrain)
            }
            $('#events-row-2').show()
            raidText += new Date(el.start * 1000).toLocaleString([], dateOptions) + ' - ' + new Date(el.end * 1000).toLocaleString([], dateOptions)
            raidText += `\n<span id="ba-home-raid-timer" class="home-timer" data-start="${el.start}" data-end="${el.end}"></span>`
            // raidText += '\n' + (currentTime >= el.start ? translateUI('event_ends', duration(el.end - currentTime)) : translateUI('event_starts', duration(el.start - currentTime)))
            found = true
        }
    })
    $('#ba-home-raid-text').html(raidText)
    $('#ba-home-raid-list').html(raidHtml)

    let eventText = "", eventHtml = ""
    $('#ba-home-event').hide()
    found = false
    $.each(data.common.regions[regionID].current_events, function (i, el) {
        if (((currentTime >= el.start && currentTime < el.end) || (currentTime <= el.start)) && !found) {
            eventText = getLocalizedString("StageType", "Event") + "\n"
            eventHtml += getEventCardHTML(el.event)

            $('#ba-home-event').show()
            eventText += new Date(el.start * 1000).toLocaleString([], dateOptions) + ' - ' + new Date(el.end * 1000).toLocaleString([], dateOptions)
            eventText += `\n<span id="ba-home-event-timer" class="home-timer" data-start="${el.start}" data-end="${el.end}"></span>`
            // eventText += '\n' + (currentTime >= el.start ? translateUI('event_ends', duration(el.end - currentTime)) : translateUI('event_starts', duration(el.start - currentTime)))
            found = true
        }
    })
    $('#ba-home-event-text').html(eventText)
    $('#ba-home-event-list').html(eventHtml)

    //birthdays
    var birthdaysHtml = ''
    var currentDate = new Date()
    currentDate.setHours(0, 0, 0, 0)
    var nextWeek = new Date()
    nextWeek.setHours(0, 0, 0, 0)
    nextWeek.setDate(currentDate.getDate() + 7)
    birthdayStudents = []

    data.students.forEach(el => {
        if (el.IsReleased[regionID] && !el.PathName.includes('_')) {
            var nextBirthday = getNextBirthdayDate(el.BirthDay)
            if (nextBirthday.getTime() < nextWeek.getTime() && nextBirthday.getTime() >= currentDate.getTime())
                birthdayStudents.push(el)
        }
    })

    if (birthdayStudents.length > 0) {
        birthdayStudents.sort((a, b) => getNextBirthdayDate(a.BirthDay).getTime() - getNextBirthdayDate(b.BirthDay).getTime())
        for (let i = 0; i < birthdayStudents.length; i++) {
            birthdaysHtml += '<div class="d-flex flex-column mx-1 mb-1">' + getStudentIconSmall(birthdayStudents[i]) + '<div class="ba-panel mt-1 mx-1 p-1 text-center">' + getNextBirthdayDate(birthdayStudents[i].BirthDay).toLocaleDateString([], { month: "numeric", day: "numeric" }) + '</div></div>'
        }
        $('#ba-home-birthdays-list').html(birthdaysHtml)
    } else {
        $('#ba-home-birthdays').hide()
    }

    $('.ba-item-student').tooltip({ html: true })
    updateEventTimers()
}

function updateEventTimers() {
    const currentTime = new Date().getTime() / 1000
    $('.home-timer').each(function(i) {
        const start = $(this).data('start')
        const end = $(this).data('end')
        $(this).html(currentTime >= start ? translateUI('event_ends', duration(end - currentTime)) : translateUI('event_starts', duration(start - currentTime)))
    })
}

function finalizeLoad(pageTitle, searchParamKey, searchParamValue, gtagEvent = null, gtagEventLabel = null) {
    
    var url = new URL(window.location.href)

    if (url.searchParams.get(searchParamKey) != searchParamValue) {
        url.searchParams.forEach((v,k) => url.searchParams.delete(k))
        url.searchParams.set(searchParamKey, searchParamValue)
        history.pushState(null, '', url)
    }

    $('title').html(`${pageTitle} | Schale DB`)
    $('#ba-navbar-content').collapse('hide')
    localStorage.setItem(searchParamKey, searchParamValue)

    if (gtagEvent) {
        // Add a 0.5s delay before sending hit - possibly fix incorrect page title being sent to GA by some users(?)
        window.setTimeout(function() {
            gtag('event', gtagEvent, {
                'event_label': gtagEventLabel,
                'user_language': userLang
            })
        }, 500)
    }
}

function getNextBirthdayDate(birthday) {
    var todayDate = new Date()
    todayDate.setHours(0, 0, 0, 0)
    var birthdayDate = new Date()
    birthdayDate.setHours(0, 0, 0, 0)
    birthdayDate.setMonth(parseInt(birthday.split('/')[0])-1,parseInt(birthday.split('/')[1]))
    birthdayDate.setFullYear(birthdayDate.getMonth() < todayDate.getMonth() ? todayDate.getFullYear()+1 : todayDate.getFullYear())
    return birthdayDate
}

function duration(seconds) {
    if (seconds < 0) {
        return [0, 0, 0]
    }
    let totalSeconds = seconds
    let days = Math.floor(totalSeconds/86400)
    totalSeconds -= days*86400
    let hours = Math.floor(totalSeconds/3600)
    totalSeconds -= hours*3600
    let minutes = Math.floor(totalSeconds/60)
    return [days, hours, minutes]
}

function setSortedDataLists() {
    // Make a copy of the data objects for sorting/filtering so we retain the original order in the loaded data
    data.students.sort(sort_functions.Name)
    studentList = data.students.map(x => x)

    itemList = data.items.map(x => x)
    furnitureList = data.furniture.map(x => x)
    equipmentList = data.equipment.map(x => x)
}

/**
 * Populates the student selection grid
 */
function populateStudentList() {
    let resultsHTML = ''
    data.students.forEach(el => {
        if (el.IsReleased[regionID]) {
            resultsHTML += getStudentListCardHTML(el)
        }
    })
    resultsHTML += `<div id="student-select-noresult" class="p-2 grid-text">${translateUI('no_results')}</div>`
    $("#student-select-grid").html(resultsHTML)
}

/**
 * Applies the selected filters and sort method to the student selection grid
 */
function updateStudentList(updateSortMethod = false) {
    let searchTerm = $('#ba-student-search-text').val()
    let sortfunction = sort_functions[search_options["sortby"]]
    const filterList = buildFilterList(search_options["filter"])

    if (updateSortMethod) {
        studentList.sort(sortfunction)
    }

    let count = 0
    $.each(studentList, function(i, el){
        if (el.IsReleased[regionID]) {
            if (updateSortMethod) {
                $('#student-select-'+el.Id).css("order", i)
                if (search_options["sortby"] == "Default" || search_options["sortby"] == "Name") {
                    $('#student-select-'+el.Id+' .label-text:not(.hover)').text(getTranslatedString(el, 'Name')).toggleClass('smalltext', getTranslatedString(el, 'Name').length > label_smalltext_threshold[userLang]).toggleClass('unhover', false)
                    $('#student-select-'+el.Id+' .label-text.hover').hide()
                } else if (search_options["sortby"] == "EXCost") {
                    const cost = find(el.Skills, "SkillType", "ex")[0].Cost
                    if (cost[0] == cost[4]) {
                        $('#student-select-'+el.Id+' .label-text:not(.hover)').text(cost[0]).toggleClass('smalltext', false).toggleClass('unhover', true)
                    } else {
                        $('#student-select-'+el.Id+' .label-text:not(.hover)').text(`${cost[0]}~${cost[4]}`).toggleClass('smalltext', false).toggleClass('unhover', true)
                    }
                    $('#student-select-'+el.Id+' .label-text.hover').show()
                } else if (search_options["sortby"] == "EXHits") {
                    const hits = find(el.Skills, "SkillType", "ex")[0].DamageDist.length
                    $('#student-select-'+el.Id+' .label-text:not(.hover)').text(hits).toggleClass('smalltext', false).toggleClass('unhover', true)
                    $('#student-select-'+el.Id+' .label-text.hover').show()
                } else {
                    $('#student-select-'+el.Id+' .label-text:not(.hover)').text(el[search_options["sortby"]].toLocaleString()).toggleClass('smalltext', false).toggleClass('unhover', true)
                    $('#student-select-'+el.Id+' .label-text.hover').show()
                }
            }
            if (checkFilters(el, filterList, searchTerm)) {
                count++
                $('#student-select-'+el.Id).show()
            } else {
                $('#student-select-'+el.Id).hide()
            }
        }
    })
    $('#student-select-noresult').toggle(count == 0)
    const activeFilters = getNumActiveFilters()
    $('#ba-student-search-filter-amount').text(activeFilters == 0 ? '' : ` (${activeFilters})`)
    $('#ba-student-search-reset').toggle(activeFilters > 0 || $('#ba-student-search-text').val() != "")
}

function buildFilterList(options) {
    let filterList = []
    $.each(options, function(i, el) {
        if (typeof el === 'boolean') {
            if (el) filterList.push(i)
        } else {
            let allfalse = true, alltrue = true
            $.each(el, function(i2, el2) {
                allfalse = (allfalse && !el2)
                alltrue = alltrue && el2
            })
            if (!(allfalse || alltrue)) {
                filterList.push(i)
            }
        }
    })
    return filterList
}

/**
 * Applies the selected filters and sort method to the student selection grid
 */
 function updateItemList(updateSortMethod = false) {
    let searchTerm = $('#item-search-text').val()
    let sortfunction = itemSortFunctions[itemSearchOptions["sortby"]]
    const filterList = buildFilterList(itemSearchOptions["filter"])

    let list, offset
    
    switch (loadedItemList) {
        case 'items':
            list = itemList
            offset = 0
            break;
        case 'furniture':
            list = furnitureList
            offset = 1000000
            break;
        case 'equipment':
            list = equipmentList
            offset = 2000000
            break;
    }
    
    if (updateSortMethod) list.sort(sortfunction)

    let count = 0
    $.each(list, function(i, el){
        if (el.IsReleased[regionID]) {
            if (updateSortMethod) {
                $(`#item-select-${el.Id+offset}`).css("order", i)                
            }
            if (itemCheckFilters(el, filterList, searchTerm)) {
                count++
                $(`#item-select-${el.Id+offset}`).show()
            } else {
                $(`#item-select-${el.Id+offset}`).hide()
            }
        }
    })
    $('#item-select-noresult').toggle(count == 0)
}

/**
 * Checks whether a student passes a given list of filters
 * @param {*} student The student object
 * @param {*} filterList List of filters checked
 * @param {*} searchTerm Text search filter
 * @returns 
 */
function checkFilters(student, filterList, searchTerm) {
    if (!student.IsReleased[regionID]) return false
    if (filterList.length == 0) {
    } else {
        for (let i = 0; i < filterList.length; i++) {
            if (filterList[i] == 'Collection') {
                if (!search_options.filter.Collection[student.Id in studentCollection ? 'Owned': 'NotOwned']) return false
            } else if (filterList[i].startsWith('Gear')) {
                const slot = parseInt(filterList[i].replace('Gear',''))
                if (!search_options['filter'][filterList[i]][student.Equipment[slot-1]]) return false
            } else if (filterList[i] == 'BondGear') {
                if (search_options['filter'][filterList[i]] && !("Released" in student.Gear && student.Gear.Released[regionID])) return false
            } else {
                if (!search_options['filter'][filterList[i]][student[filterList[i]]]) return false
            }
            
        }
    }
    return (searchTerm == "" || getTranslatedString(student, 'Name').toLowerCase().includes(searchTerm.toLowerCase()))
}

/**
 * Checks whether an item passes a given list of filters
 * @param {*} item The student object
 * @param {*} filterList List of filters checked
 * @param {*} searchTerm Text search filter
 * @returns 
 */
 function itemCheckFilters(item, filterList, searchTerm) {
    if (!item.IsReleased[regionID]) return false
    if (filterList.length == 0) {
    } else {
        for (let i = 0; i < filterList.length; i++) {
            switch (filterList[i]) {
                case 'ItemCategory':
                    if (loadedItemList == 'items' && !itemSearchOptions['filter'][filterList[i]][item['Category']]) return false
                    break
                case 'EquipmentCategory':
                    if (loadedItemList == 'equipment') {
                        if (item['Category'].startsWith('WeaponExpGrowth')) {
                            // Combine all weapon part types to same filter
                            if (!itemSearchOptions['filter'][filterList[i]]['WeaponExpGrowth']) return false     
                        } else {
                            if (!itemSearchOptions['filter'][filterList[i]][item['Category']]) return false     
                        }
                    }
                    break
                case 'FurnitureSubCategory':
                    if (loadedItemList == 'furniture' && !itemSearchOptions['filter'][filterList[i]][item['SubCategory']]) return false
                    break
                case 'FurnitureSet':
                    if (loadedItemList == 'furniture' && !itemSearchOptions['filter'][filterList[i]][String(item['SetGroupId'])]) return false
                    break
                case 'Rarity':
                    if (loadedItemList != 'equipment' && !itemSearchOptions['filter'][filterList[i]][item[filterList[i]]]) return false
                    break
                case 'FurnitureInteraction':
                    if (loadedItemList == 'furniture' && !item['Interaction'][regionID]) return false
                    break
                case 'EquipmentTier':
                    if (loadedItemList == 'equipment' && !itemSearchOptions['filter'][filterList[i]][item['Tier']]) return false
                    break
                default:
                    if (!itemSearchOptions['filter'][filterList[i]][item[filterList[i]]]) return false
                    break
            }           
        }
    }
    return (searchTerm == "" || getTranslatedString(item, 'Name').toLowerCase().includes(searchTerm.toLowerCase()))
}

function searchOptionSet(option, value, runSearch = true) {
    $(`#ba-student-search-${option} a`).removeClass("active")
    $(`#ba-student-search-${option} button`).removeClass("active")
    $(`#ba-student-search-${option}-${value}`).addClass("active")
    $(`#ba-student-search-sortby-stat`).text(translateUI('stat')+" ")

    if (option == "sortby" && value != "default" && value != "name") {
        $(`#ba-student-search-sortby-stat`).addClass("active")
        $(`#ba-student-search-sortby-stat`).text($(`#ba-student-search-sortby-${value}`).text() + " ")
    }
    search_options[option] = value
    localStorage.setItem(`chara_${option}`, value)
    if (runSearch) {
        updateStudentList()  
    }
}

function getNumActiveFilters() {
    let num = 0
    $.each(search_options.filter, function(i, v) {
        if (typeof v === 'boolean') {
            if (v) num += 1
        } else {
            $.each(v, function(j, w) {
                if (w === true) num += 1
            })
        }
    })
    return num
}

function searchSetOrder(value, runSearch = true, swapDir = true) {

    if (swapDir) {
        if (value == search_options["sortby"]) {
            search_options["sortby_dir"] = -search_options["sortby_dir"]
        } else {
            search_options["sortby_dir"] = 1
        }
    }

    if (!(value in sort_functions)) {
        value = 'Default'
    }

    $(`#ba-student-search-sortby a`).removeClass("active")
    $(`#ba-student-search-sortby .btn-search-filter`).removeClass("active")
    $(`#ba-student-search-sortby-${value.toLowerCase()}`).addClass("active")
    $('#ba-student-search-sortby-stat').text(translateUI('stat'))
    $('.sort-direction-label').text("")

    $(`#ba-student-search-sortby-${value.toLowerCase()} > .sort-direction-label`).html((search_options["sortby_dir"] == 1) != (value == "Name" || value == "Default") ? '<i class="fa-solid fa-arrow-down-long ms-2"></i>' : '<i class="fa-solid fa-arrow-up-long ms-2"></i>')

    if (value != "Default" && value != "Name") {
        $('#ba-student-search-sortby-stat').addClass("active")
        $('#ba-student-search-sortby-stat').html($(`#ba-student-search-sortby-${value.toLowerCase()}`).html())
    }

    search_options["sortby"] = value
    localStorage.setItem('chara_sortby', value)
    localStorage.setItem('chara_sortby_dir', search_options["sortby_dir"])
    if (runSearch) {
        updateStudentList(updateSortMethod = true)  
    }
}

function searchSetOrderItems(value, runSearch = true, swapDir = true) {

    if (swapDir) {
        if (value == itemSearchOptions["sortby"]) {
            itemSearchOptions["sortby_dir"] = -itemSearchOptions["sortby_dir"]
        } else {
            itemSearchOptions["sortby_dir"] = 1
        }
    }

    $(`#item-search-sortby a`).removeClass("active")
    $(`#item-search-sortby button`).removeClass("active")
    $(`#item-search-sortby-${value.toLowerCase()}`).addClass("active")
    $('.sort-direction-label').text("")

    $(`#item-search-sortby-${value.toLowerCase()} > .sort-direction-label`).html((itemSearchOptions["sortby_dir"] == 1) ? '<i class="fa-solid fa-arrow-up-long ms-2"></i>' : '<i class="fa-solid fa-arrow-down-long ms-2"></i>')

    itemSearchOptions["sortby"] = value
    localStorage.setItem('item_sortby', value)
    localStorage.setItem('item_sortby_dir', itemSearchOptions["sortby_dir"])
    if (runSearch) {
        updateItemList(updateSortMethod = true)  
    }
}

function searchSetFilter(prop, value, runSearch = true) {
    if (value != null) {
        search_options["filter"][prop][value] = !search_options["filter"][prop][value]
        if ($(`#ba-student-search-filter-${prop.toLowerCase()}-${String(value).toLowerCase()}`).hasClass('mutually-exclusive')) {
            //deactivate all other options
            $(`#ba-student-search-filter-${prop.toLowerCase()} .btn-search-filter`).toggleClass("active", false)
            for (option in search_options["filter"][prop]) {
                if (option != value) search_options["filter"][prop][option] = false
            }
        }
        $(`#ba-student-search-filter-${prop.toLowerCase()}-${String(value).toLowerCase()}`).toggleClass("active", search_options["filter"][prop][value])
    } else {
        search_options["filter"][prop] = !search_options["filter"][prop]
        $(`#ba-student-search-filter-${prop.toLowerCase()}`).toggleClass("active", search_options["filter"][prop])
    }

    if (runSearch) {
        updateStudentList()
    }
}

function searchSetFilterItems(prop, value, runSearch = true) {
    if (value != null) {
        itemSearchOptions["filter"][prop][value] = !itemSearchOptions["filter"][prop][value]
        $(`#item-search-filter-${prop.toLowerCase()}-${String(value).toLowerCase()}`).toggleClass("active", itemSearchOptions["filter"][prop][value])    
    } else {
        itemSearchOptions["filter"][prop] = !itemSearchOptions["filter"][prop]
        $(`#item-search-filter-${prop.toLowerCase()}`).toggleClass("active", itemSearchOptions["filter"][prop])
    }
    if (runSearch) {
        updateItemList()
    }
}

function searchResetFilter() {
    $('#ba-student-search-text').val('')
    Object.entries(search_options["filter"]).forEach(prop => {
        if (typeof prop[1] === 'boolean') {
            search_options["filter"][prop[0]] = false
            $(`#ba-student-search-filter-${prop[0].toLowerCase()}`).toggleClass("active", false)
        } else {
            Object.entries(prop[1]).forEach (val => {
                search_options["filter"][prop[0]][val[0]] = false
                $(`#ba-student-search-filter-${prop[0].toLowerCase()}-${String(val[0]).toLowerCase()}`).toggleClass("active", false)
            })
        }
    })
    $('#ba-student-search-reset').hide()
    $('#ba-student-search-filter-amount').text('')
    document.getElementById('ba-student-search-reset').blur()
    updateStudentList()
}

function setGridItemDisplayStyle(style) {
    if (gridItemDisplayStyle != style) {
        gridItemDisplayStyle = style
        localStorage.setItem("grid_item_display_style", gridItemDisplayStyle)

        $('#item-search-displaytype button').removeClass('active')
        $('#item-search-displaytype-'+style).addClass('active')

        switch (style) {
            case 'detailed':
                $('#item-select-grid').removeClass('items-compact').addClass('items')
                break;
        
            case 'compact':
                $('#item-select-grid').removeClass('items').addClass('items-compact')
                break;
        }

        populateItemList(loadedItemList)
    }
}

function processStudent() {

    showAltSprite = false
    $('#ba-student-img').attr('src', `images/student/portrait/Portrait_${student.DevName}.webp`)
    let bgimg = new Image()
    bgimg.onload = function(){
        $("#ba-background").css('background-image', `url('${bgimg.src}')`)
    }
    bgimg.src = `images/background/${student.CollectionBG}.jpg`

    $('#ba-student-name').html(getTranslatedString(student, 'Name').replace(/([(（].+[)）])/,'<small>$1</small>'))
    $("#ba-student-class").text(getLocalizedString('SquadType', student.SquadType)).removeClass("ba-class-main ba-class-support").addClass(`ba-class-${student.SquadType.toLowerCase()}`)
    $("#ba-student-stargrade").html('<i class="fa-solid fa-star"></i>'.repeat(student.StarGrade))
    if (student.IsLimited > 0) {
        $("#ba-student-stargrade").append(`<span class="ms-1">(${getLocalizedString('IsLimited',''+student.IsLimited)})</span>`)
    } 

    $('.summon-list').toggleClass('disabled', student.Summons.length == 0)
    let summonList = ''
    summonList += `<li><a class="dropdown-item dropdown-item-icon" href="javascript:;" data-summon-id="0" class="btn btn-dark"><img src="images/student/icon/${student.CollectionTexture}.png"><span>${getTranslatedString(student, "Name")}</span></a></li>`
    student.Summons.forEach((summon, index) => {
        const summonInfo = find(data.summons, 'Id', summon.Id)[0]
        const sourceSkill = find(student.Skills, 'SkillType', summon.SourceSkill)[0]
        summonList += `<li><a class="dropdown-item dropdown-item-icon" href="javascript:;" data-summon-id="${index+1}" class="btn btn-dark"><img class="bg-skill ${student.BulletType.toLowerCase()}" src="images/skill/${sourceSkill.Icon}.png"><span>${getTranslatedString(summonInfo, "Name")}</span></a></li>`
    })
    $('.summon-list .dropdown-menu').html(summonList)

    changeStudentSummon(0, false)

    $("#ba-student-role-label").text(getLocalizedString('TacticRole', student.TacticRole))
    $("#ba-student-role-icon").attr("src", `images/ui/Role_${student.TacticRole}.png`)

    $(".bg-skill").removeClass("explosion pierce mystic").addClass(`${student.BulletType.toLowerCase()}`)
    $("#ba-student-attacktype").removeClass("bg-atk-explosion bg-atk-pierce bg-atk-mystic").addClass(`bg-atk-${student.BulletType.toLowerCase()}`)
    $("#ba-student-defensetype").removeClass("bg-def-lightarmor bg-def-heavyarmor bg-def-unarmed").addClass(`bg-def-${student.ArmorType.toLowerCase()}`)
    
    $("#ba-student-academy-label").text(`${getLocalizedString('School',student.School)} / ${getLocalizedString('Club',student.Club)}`)
    $("#ba-student-school-img, #ba-student-academy-icon").attr("src", `images/schoolicon/School_Icon_${student.School.toUpperCase()}_W.png`)
    $("#ba-student-position-label").text(student.Position.toUpperCase())
    $("#ba-student-attacktype-label").text(getLocalizedString('BulletType',student.BulletType))
    $('#ba-student-attacktype').tooltip('dispose').tooltip({title: getRichTooltip(null, `${getLocalizedString('BulletType',student.BulletType)}`, translateUI('attacktype'), null, getAttackTypeText(student.BulletType), 32), placement: 'top',  html: true})
    $("#ba-student-defensetype-label").text(getLocalizedString('ArmorType',student.ArmorType))
    $('#ba-student-defensetype').tooltip('dispose').tooltip({title: getRichTooltip(null, `${getLocalizedString('ArmorType',student.ArmorType)}`, translateUI('defensetype'), null, getDefenseTypeText(student.ArmorType), 32), placement: 'top', html: true})
    
    $("#ba-student-usescover-icon").toggle(student.Cover)

    $("#ba-student-weapontype-label").text(student.WeaponType)
    $(".ba-type-weapon").css("background-image", `url('images/weapon/${student.WeaponImg}.png')`)

    //Skills
    student.Skills.forEach(el => {
        $(`#ba-skill-${el.SkillType}-name`).text(getTranslatedString(el, 'Name'))
        $(`#ba-skill-${el.SkillType}-icon`).attr("src", `images/skill/${el.Icon}.png`)
        if (el.SkillType == 'passive') {
            $('#ba-statpreview-passiveskill-icon, #ba-statpreview-status-passive-icon').attr("src", `images/skill/${el.Icon}.png`)
        }
        if (el.SkillType == "ex") {
            $("#ba-skill-ex-cost").removeClass("ba-col-explosion ba-col-pierce ba-col-mystic")
            if (el.Cost[0] != el.Cost[4]) {
                $("#ba-skill-ex-cost").addClass(`ba-col-${student.BulletType.toLowerCase()}`)
            }
        }
    })

    //Skill Materials
    let html
    for (let i = 2; i <= 5; i++) {
        html = ''
        $.each(student.SkillExMaterial[i-2], function(j, el) {
            html += getMaterialIconHTML(el, student.SkillExMaterialAmount[i-2][j])
        })
        html += getMaterialIconHTML(3000001, abbreviateNumber(skill_ex_upgrade_credits[i-2]))

        $('#ba-skill-ex-materials-'+i).html(html)
        $('#ba-skill-ex-materials-'+i+' div').each(function(j,el) {
            $(el).tooltip({html: true})
        })
    }

    for (let i = 2; i <= 9; i++) {
        html = ''
        $.each(student.SkillMaterial[i-2], function(j, el) {
            html += getMaterialIconHTML(el, student.SkillMaterialAmount[i-2][j])
        })
        html += getMaterialIconHTML(3000001, abbreviateNumber(skill_upgrade_credits[i-2]))

        $('#ba-skill-materials-'+i).html(html)
        $('#ba-skill-materials-'+i+' div').each(function(j,el) {
            $(el).tooltip({html: true})
        })
    }

    html = ''
    html += getMaterialIconHTML(9999, 1)
    html += getMaterialIconHTML(3000001, abbreviateNumber(skill_upgrade_credits[8]))

    $('#ba-skill-materials-10').html(html)
    $('#ba-skill-materials-10 div').each(function(i,el) {
        $(el).tooltip({html: true})
    })

    //Weapon
    $("#ba-student-weapon-name, #ba-statpreview-weapon-name").text(getTranslatedString(student.Weapon, 'Name'))
    $('#ba-weapon-description').text(getTranslatedString(student.Weapon,'Desc').replace("\n\n", "\n"))
    $("#ba-student-weapon-type").text(student.WeaponType)
    $("#ba-student-weapon-img, #ba-statpreview-weapon-img").attr("src", `images/weapon/${student.WeaponImg}.png`)

    $('#ba-weapon-bonus-terrain-type').attr("src", `images/ui/Terrain_${student.Weapon.AdaptationType}.png`)
    let initialTerrainAmount = adaptaionAmount[student[student.Weapon.AdaptationType+'BattleAdaptation']]
    let bonusTerrainAmount = adaptaionAmount[student[student.Weapon.AdaptationType+'BattleAdaptation'] + student.Weapon.AdaptationValue]
    $('#ba-weapon-bonus-terrain-adaption').attr("src", `images/ui/Ingame_Emo_Adaptresult${bonusTerrainAmount}.png`)
    $('#ba-weapon-bonus-terrain-adaption-description').html(`${translateUI("terrain_adaption", [getLocalizedString('AdaptationType',student.Weapon.AdaptationType)])} ${initialTerrainAmount} → <b>${bonusTerrainAmount}</b><br>(${getAdaptationText(student.Weapon.AdaptationType, bonusTerrainAmount)})`)
    $('#ba-weapon-stat-table .stat-HealPower').parent().toggle(student.Weapon.HealPower1 > 0)

    //Gear
    if ("Released" in student.Gear && student.Gear.Released[regionID]) {
        $('#ba-student-tab-gear, #ba-statpreview-ex-gear-container').show()
        $("#ba-student-gear-name, #ba-statpreview-ex-gear-name").html(student.Gear.Name)
        $("#ba-student-gear-description").html(`${student.Gear.Desc}\n\n<i>${translateUI('bond_req_equip',['20', student.Name])}`)
        $("#ba-student-gear-icon, #ba-statpreview-ex-gear-icon, #ba-student-gear-4-icon").attr("src", `images/gear/${student.Gear.Icon}.png`)
        $("#ba-student-gear-4-icon").tooltip('dispose').tooltip({title: getRichTooltip(`images/gear/${student.Gear.Icon}.png`, getTranslatedString(student.Gear, 'Name'), translateUI('student_ex_gear'), null, getTranslatedString(student.Gear, 'Desc') + `\n\n<b>${translateUI("stat_info")}:</b>\n` + getGearStatsText(student.Gear, '\n'), 50, 'img-scale-larger'), placement: 'top', html: true}).toggleClass("gear-disabled", !statPreviewIncludeExGear)
        let gearMaterialsHtml = ""
        for (let i = 0; i < student.Gear.TierUpMaterial[0].length; i++) {
            gearMaterialsHtml += getMaterialIconHTML(student.Gear.TierUpMaterial[0][i], student.Gear.TierUpMaterialAmount[0][i])
        }
        
        let gearStats = student.Gear.StatType.map((x) => x.split('_')[0])
        generateStatTable('#ba-gear-stat-table', gearStats, 6)
        for (let i = 0; i < student.Gear.StatValue.length; i++) {
            let value = student.Gear.StatValue[i][1]
            if (student.Gear.StatType[i].split('_')[1] == "Coefficient") {
                value = parseFloat((value/100).toFixed(2))+'%'
            }
            $(`#ba-gear-stat-table .stat-${gearStats[i]} .stat-value`).text('+'+value)
        }

        gearMaterialsHtml += getMaterialIconHTML(3000001, abbreviateNumber(gear_upgrade_credits[0]))
        $("#ba-statpreview-ex-gear-description").html(getGearStatsText(student.Gear, ", "))
        $("#ba-student-gear-materials-t2").html(gearMaterialsHtml)
        $("#ba-student-gear-materials-t2>div").tooltip({html: true})
        $("#ba-student-bondreq-t2").html(translateUI('bond_req_upgrade',['25', student.Name]))
    } else {
        $('#ba-student-tab-gear, #ba-statpreview-ex-gear-container').hide()
        if ($('#ba-student-tab-gear').hasClass('active')) {
            $('#ba-student-tab-stats').tab('show')
        }

        $('#ba-student-gear-4-icon').attr('src', 'images/gear/Gear_Icon_Empty.png').tooltip('dispose').toggleClass("gear-disabled", true)
    }

    //Profile
    if (userLang != 'Jp') {
        $('#ba-student-fullname').text(getTranslatedString(student,'FamilyName')+' '+getTranslatedString(student,'PersonalName'))
    } else {
        $('#ba-student-fullname').text(getTranslatedString(student,'FamilyName')+getTranslatedString(student,'PersonalName'))
    }
    $('#ba-profile-school-label').text(getLocalizedString('SchoolLong',student.School))
    $('#ba-profile-club-label').text(getLocalizedString('Club',student.Club))
    $('#ba-profile-schoolyear-label').text(getTranslatedString(student,'SchoolYear')).toggle(getTranslatedString(student,'SchoolYear') != "")
    $('#ba-profile-portrait-img').attr("src", `images/student/collection/${student.CollectionTexture}.webp`)
    var profileHtml = ''
    profileHtml += getTranslatedString(student,'ProfileIntroduction')
    if (student.StarGrade == 3) {
        profileHtml += `\n\n<i class="text-bold">"${getTranslatedString(student,'CharacterSSRNew')}"</i>`
    }
    $('#ba-student-profile-text').html(profileHtml)

    if (student.MemoryLobby[regionID] > 0) {
        $(".ba-student-lobby").show()
        $("#ba-student-lobby-img").attr("src", `images/student/lobby/Lobbyillust_Icon_${student.DevName}_01.png`)
        $("#ba-student-lobby-unlock").text(student.MemoryLobby[regionID])
        $(".ba-student-lobby").tooltip('dispose').tooltip({title: getRichTooltip(null, translateUI('memory_lobby_student', [getTranslatedString(student,'Name')]), null, null, translateUI('memory_lobby_unlock', [student.MemoryLobby[regionID], getTranslatedString(student,'Name')])), placement: 'top', html: true})
    } else {
        $(".ba-student-lobby").hide()
    }
    
    $('#ba-student-profile-age').text(getTranslatedString(student,'CharacterAge'))
    $('#ba-student-profile-birthday').text(getTranslatedString(student,'Birthday'))
    $('#ba-student-profile-hobbies').text(getTranslatedString(student,'Hobby'))
    $('#ba-student-profile-height').text(student.CharHeightMetric)
    $('#ba-student-profile-cv').text(getTranslatedString(student,'CharacterVoice'))
    $('#ba-student-profile-illustrator').text(student.ArtistName)

    $('#ba-student-toggle-sprite-btn').toggle(altSprite.includes(student.Id))

    let allTags = student.FavorItemTags
    allTags.push(student.FavorItemUniqueTags[0])
    allTags.push(student.FavorItemUniqueTags[0] + "2")

    let favItemsHtml = ""
    
    if (regionID == 0) {
        const favSSRItems = getFavouriteSSRItems(allTags)
        $(favSSRItems[0]).each(function(i,el){
            favItemsHtml += getFavourIconHTML(el, 4)
        })
        $(favSSRItems[1]).each(function(i,el){
            favItemsHtml += getFavourIconHTML(el, 3)
        })
    }

    const favItems = getFavouriteItems(allTags)
    $(favItems[0]).each(function(i,el){
        favItemsHtml += getFavourIconHTML(el, 3)
    })
    $(favItems[1]).each(function(i,el){
        favItemsHtml += getFavourIconHTML(el, 2)
    })

    $('#ba-student-favoured-items').empty().html(favItemsHtml)
    if (favItemsHtml == "") {
        $('#ba-student-favoured-items').empty().html(`<span class="pb-2 text-center">${translateUI('favoritem_none')}</span>`)
    } else {
        $('#ba-student-favoured-items').empty().html(favItemsHtml)
    }

    let favFurnitureHtml = ""
    $(student.FurnitureInteraction[regionID]).each(function(i,el){
        let item = find(data.furniture, "Id", el)[0]
        if (item.IsReleased[regionID]) {
            favFurnitureHtml += getFurnitureIconHTML(item)
        }
    })

    $('#ba-student-favoured-furniture').empty().html(favFurnitureHtml)
    if (favFurnitureHtml == "") {
        $('#ba-student-favoured-furniture').empty().html(`<span class="pb-2 text-center">${translateUI('furniture_none')}</span>`)
    } else {
        $('#ba-student-favoured-furniture').empty().html(favFurnitureHtml)
    }
    $('.ba-favor-item').tooltip({html: true})

    generateStatTable('#ba-bond-stat-table', student.FavorStatType, 6)

    if (student.SquadType == "Main") {
        $('#ba-student-stat-table').removeClass("striker-bonus")
        $('#ba-statpreview-status-strikerbonus').hide()
        $('#statpreview-supportstats').show()
        statPreviewViewSupportStats = false
    } else {
        $('#ba-statpreview-status-strikerbonus').show()
        $('#statpreview-supportstats').hide()
    }
    $('#ba-statpreview-status-strikerbonus').toggleClass("deactivated", !statPreviewViewSupportStats)
    
    $('#ba-statpreview-bond-targets').empty().html(getBondTargetsHTML(1, student))
    $('#ba-statpreview-status-bond-icon').attr('src', `images/student/icon/${student.CollectionTexture}.png`)
    student_bondalts = []

    $('#ba-statpreview-status-bond-level').tooltip('dispose').tooltip({title: getBasicTooltip(translateUI('tooltip_relationship_bonus', [student.Name])), placement: 'top', html: true})

    for (let i = 0; i < student.FavorAlts.length; i++) {
        var extraTarget = find(data.students,"Id",student.FavorAlts[i])[0]
        if (extraTarget.IsReleased[regionID]) {
            student_bondalts.push(extraTarget)
            $('#ba-statpreview-status-bond-alt-icon').attr('src', `images/student/icon/${extraTarget.CollectionTexture}.png`)
            $('#ba-statpreview-bond-targets').append(getBondTargetsHTML(1 + student_bondalts.length, extraTarget))
            $('#ba-statpreview-status-bond-alt-level').tooltip('dispose').tooltip({title: getBasicTooltip(translateUI('tooltip_relationship_bonus', [extraTarget.Name])), placement: 'top', html: true})
        }
    }

    $('#ba-statpreview-status-bond-alt-level').toggle(student_bondalts.length > 0)

    if (student.Id in studentCollection) {
        statPreviewStarGrade = studentCollection[student.Id].s

        statPreviewLevel = studentCollection[student.Id].l
        $('#ba-statpreview-levelrange').val(statPreviewLevel)
        changeStatPreviewLevel(document.getElementById('ba-statpreview-levelrange'), false)

        statPreviewEquipment = [studentCollection[student.Id].e1, studentCollection[student.Id].e2, studentCollection[student.Id].e3]
        $('#ba-statpreview-gear1-range').val(statPreviewEquipment[0])
        $('#ba-statpreview-gear2-range').val(statPreviewEquipment[1])
        $('#ba-statpreview-gear3-range').val(statPreviewEquipment[2])

        statPreviewWeaponGrade = studentCollection[student.Id].ws
        statPreviewWeaponLevel = studentCollection[student.Id].wl
        $('#ba-statpreview-weapon-range').val(statPreviewWeaponLevel)

        statPreviewBondLevel = studentCollection[student.Id].b
        $('#ba-statpreview-bond-1-range').val(statPreviewBondLevel)
        $('#ba-statpreview-passiveskill-range').val(studentCollection[student.Id].s3)
        changeStatPreviewPassiveSkillLevel(document.getElementById('ba-statpreview-passiveskill-range'), false)
        statPreviewIncludeBond = true
        statPreviewIncludeEquipment = true

        $('#ba-student-collection-btn').toggleClass('active', true).html('<i class="fa-solid fa-circle-check"></i>')
        $('#ba-student-collection-btn').tooltip('dispose').tooltip({title: getBasicTooltip(translateUI('tooltip_collection_remove')), placement: 'top', html: true})
    } else {
        $('#ba-student-collection-btn').toggleClass('active', false).html('<i class="fa-solid fa-circle-plus"></i>')
        $('#ba-student-collection-btn').tooltip('dispose').tooltip({title: getBasicTooltip(translateUI('tooltip_collection_add')), placement: 'top', html: true})
    }

    statPreviewExternalBuffs.changeStudent(student.Id)

    updateGearIcon()

    changeStatPreviewStars(statPreviewStarGrade, statPreviewWeaponGrade, false)
    recalculateTerrainAffinity()
    changeStatPreviewPassiveSkillLevel(document.getElementById('ba-statpreview-passiveskill-range'), false)
    recalculateWeaponPreview()
    updateWeaponLevelStatPreview($('#ba-statpreview-weapon-range').val())

    recalculateSkillPreview()
    recalculateWeaponSkillPreview()
    recalculateGearSkillPreview()
    recalculateEXSkillPreview()
    recalculateBondPreview()

    changeGearLevel(1, document.getElementById('ba-statpreview-gear1-range'), false)
    changeGearLevel(2, document.getElementById('ba-statpreview-gear2-range'), false)
    changeGearLevel(3, document.getElementById('ba-statpreview-gear3-range'), false)

    for (let i = 1; i <= student_bondalts.length+1; i++) {
        if (i > 1 && student_bondalts[i-2].Id in studentCollection) {
            statPreviewBondAltLevel = studentCollection[student_bondalts[i-2].Id].b
            $(`#ba-statpreview-bond-${i}-range`).val(studentCollection[student_bondalts[i-2].Id].b)
            statPreviewIncludeBondAlts = true
        }
        changeStatPreviewBondLevel(i, false)
    }
    
    refreshStatTableControls()
    recalculateStats()

    finalizeLoad(getTranslatedString(student, 'Name'), "chara", student.PathName, 'View Student', student.Id)

    studentSelectorModal.hide()
}

function loadStudent(studentName) {
    if (loadedModule == 'students') {
        if (selectCompareMode) {
            studentCompare = find(data.students, "PathName", studentName)
            if (studentCompare.length == 0) {
                // Legacy support for when DevName was used in the url
                studentCompare = findOrDefault(data.students, "DevName", studentName, "Aru")
            }
            studentCompare = studentCompare[0]
            selectCompareMode = false
            changeStudentSummon(0, false)
            compareMode = true
            updateCompareModeControl()
            recalculateStats()
            studentSelectorModal.hide()
        } else {
            student = find(data.students, "PathName", studentName)
            if (student.length == 0) {
                // Legacy support for when DevName was used in the url
                student = findOrDefault(data.students, "DevName", studentName, "Aru")
            }
            student = student[0]

            // Clear the comparison view if we select the student we are comparing against
            if (compareMode) {
                if (student.Id == studentCompare.Id) {
                    compareMode = false
                    updateCompareModeControl()
                }
            }

            processStudent()
            
        }

    } else {
        loadModule('students', studentName)
    }
}

function loadStudentById(studentId) {
    if (loadedModule == 'students') {
        student = findOrDefault(data.students, "Id", studentId, 10000)[0]
        processStudent()
    } else {
        loadModule('students')
    }
}

function loadItem(id) {
    if (loadedModule == 'items') {
        var mode = '', item
        $(".tooltip").tooltip("hide")
        $('#item-select-grid .card-items.selected').removeClass('selected')
        $('#ba-item-furniture-row').hide()

        if (id >= 2000000) {
            mode = 'equipment'
            item = findOrDefault(data.equipment, "Id", id-2000000, 1)[0]
            $('#ba-item-type').html(getLocalizedString('ItemCategory', item.Category))
        } else if (id >= 1000000) {
            mode = 'furniture'
            item = findOrDefault(data.furniture, "Id", id-1000000, 1)[0]
            $('#ba-item-type').html(getLocalizedString('ItemCategory', item.SubCategory))
            $('#ba-item-furniture-row').show()
            $('#ba-item-furniture-set').html(item.SetGroupId == 0 ? '' : `・ <i>${getLocalizedString('FurnitureSet', String(item.SetGroupId))}</i>`)
            $('#ba-item-furniture-comfort').html(`<img class="inline-img" src="images/ui/Cafe_Icon_Comfort.png"> ${item.ComfortBonus}`)
        } else {
            mode = 'items'
            item = findOrDefault(data.items, "Id", id, 1)[0]
            $('#ba-item-type').html(getLocalizedString('ItemCategory', item.Category))
        }

        loadedItem = item
        loadedItemType = mode

        $('#ba-item-name').html(getTranslatedString(item, 'Name'))
        if (mode == 'equipment' && item.Id >= 1000) {
            $('#ba-item-rarity').html(`T${item.Tier}`)
        } else {
            if (mode == 'furniture') {
                $('#ba-item-rarity').html(getRarityStars(item.Rarity))
            } else {
                $('#ba-item-rarity').html(getRarityTier(item.Rarity))
            }
        }
        
        $('#ba-item-icon').removeClass('ba-item-n ba-item-r ba-item-sr ba-item-ssr').addClass('ba-item-'+item.Rarity.toLowerCase())
        $('#ba-item-icon-img').attr('src', `images/${mode}/${item.Icon}.png`)
        $('#ba-item-description').html(getTranslatedString(item, 'Desc'))
        if (mode == 'equipment' && item.Id >= 1000 && item.Id <= 10000) {
            $('#ba-item-description').append(`\n\n<b>${translateUI("stat_info")}:</b>\n` + getGearStatsText(item, '\n'))
        }
        if (item.Category.includes("WeaponExpGrowth")) {
            $('#ba-item-description').append(`\n\n<i>${getLocalizedString('WeaponPartExpBonus', item.Category)}</i>`)
        }
        $('#ba-equipment-recipe').empty().hide()
        $('#ba-item-usage').empty().hide()
        $('#ba-item-sources').empty().hide()
        $('#ba-item-shops').empty().hide()
        if (item.Category == 'Material' || item.Category == 'CharacterExpGrowth') {
            $('#ba-item-usage').html(getUsedByStudents(item, mode))
            $('.ba-item-student').tooltip({html: true})
            $('#ba-item-sources').html(getItemDropStages(item.Id))
        } else if (item.Category == 'Consumable') {
            $('#ba-item-sources').html(getItemDropStages(item.Id))
        }
        else if (item.Category == 'Favor') {
            if (item.Id < 5998) {
                $('#ba-item-usage').html(getLikedByStudents(item))
                $('.ba-item-student').tooltip({html: true})
            } else {
                $('#ba-item-usage').html(`<i>${translateUI('item_specialgift', ['<img class="inline-img" src="images/ui/Cafe_Interaction_Gift_03.png">'])}</i>`).show()
            }
        } else if (item.Category == 'SecretStone') {
            $('#ba-item-sources').html(getItemDropStages(item.Id))
            $('#ba-item-usage').html(getUsedByStudents(item, mode))
            $('.ba-item-student').tooltip({html: true})
        } else if (mode == 'equipment') {
            $('#ba-item-usage').html(getUsedByStudents(item, mode))
            $('#ba-item-sources').html(getItemDropStages(item.Id+2000000))
            $('#ba-equipment-recipe').html(getEquipmentRecipe(item))
            $('#ba-equipment-recipe div').each(function(i,el) {
                $(el).tooltip({html: true})
            })
            $('.ba-item-student').tooltip({html: true})
        } else if (item.Category == 'Coin') {
            $('#ba-item-sources').html(getItemDropStages(item.Id))
        }
        if (mode == 'furniture') {
            $('#ba-item-usage').html(getUsedByStudents(item, mode))
            $('.ba-item-student').tooltip({html: true})
        }

        if (item.Shops) {
            let html = ''
            item.Shops.forEach((shop) => {
                if (shop.Released[regionID]) html += getShopCardHTML(shop)
            })
            if (html != '') {
                $('#ba-item-shops').html(`<div class="mb-2"><i>${translateUI('item_purchasedfrom')}</i></div><div class="selection-grid stage selection-grid-flex">${html}</div>`).show()
                $('#ba-item-shops .shop-cost').tooltip({html: true, placement: 'top'})
            }
        }

        $(`#ba-item-list-tab-${mode}`).tab('show')
        $('#item-select-'+id).addClass('selected')
        if (loadedItemList != mode) populateItemList(mode)

        finalizeLoad(getTranslatedString(item, 'Name'), "item", id, 'View Item', id)

    } else {
        loadModule('items', id)
    }
}

function loadCraft(id) {
    if (loadedModule == 'craft') {

        if (loadedCraftId > 0) $('#craft-select-'+loadedCraftId).removeClass('selected')

        if (id < 100000) {
            const craftNode = findOrDefault(data.crafting.Nodes[regionID], "Id", id, 1)[0]
            loadedCraftNode = craftNode
            loadedCraftId = craftNode.Id

            $('#ba-craft-name').html(getTranslatedString(craftNode,'Name'))
            $('#ba-craft-type').html(getLocalizedString("NodeTier", ''+craftNode.Tier))
            $('#ba-craft-rarity').html(getLocalizedString("NodeQuality", ''+craftNode.Quality))
            $('#ba-craft-icon').removeClass('ba-node-quality-1 ba-node-quality-2').addClass('ba-node-quality-'+craftNode.Quality)
            $('#ba-craft-icon-img').attr('src', `images/ui/${craftNode.Icon}.png`)
            $('#ba-craft-description').html(getTranslatedString(craftNode, 'Desc'))
            $('#ba-craft-rewards-title').text(translateUI('craft_rewards'))
            $('#ba-craft-rewards').empty()
            let rewardsHtml = ''
            let nodeWeightTotal = 0
            craftNode.Groups.forEach(grp => {nodeWeightTotal += grp.Weight})
            $.each(craftNode.Groups, function(i,el){
                let itemGroup = data.crafting.Groups[regionID][el.GroupId], maxWeight = 0
                for (let j = 0; j < itemGroup.length; j++) {
                    maxWeight += itemGroup[j].Weight
                }
                for (let j = 0; j < itemGroup.length; j++) {
                    let itemWeight = ((el.Weight / nodeWeightTotal) * (itemGroup[j].Weight / maxWeight)).toFixed(4)
                    let itemId = itemGroup[j].ItemId
                    if (itemGroup[j].Type == "Furniture") {
                        itemId += 1000000
                    } else if (itemGroup[j].Type == "Equipment") {
                        itemId += 2000000
                    }  else if (itemGroup[j].Type == "Currency") {
                        itemId += 3000000
                    }
                    rewardsHtml += getDropIconHTML(itemId,itemWeight,itemGroup[j].AmountMin,itemGroup[j].AmountMax,true)
                }
            })
            $('#ba-craft-rewards').html(rewardsHtml)
            $('#ba-craft-rewards div').each(function(i,el) {
                $(el).tooltip({html: true})
            })
    
            $('#craft-select-'+loadedCraftNode.Id).addClass('selected')
            finalizeLoad(getTranslatedString(craftNode, 'Name'), "craftnode", craftNode.Id, 'View Crafting', craftNode.Id)
        } else {
            const recipe = findOrDefault(data.crafting.Fusion, "Id", id % 100000, 1)[0]
            const itemList = recipe.ResultId >= 1000000 ? 'furniture' : 'items'
            const item = find(data[itemList], 'Id', recipe.ResultId % 1000000)[0]
            loadedCraftNode = recipe
            loadedCraftId = recipe.Id + 100000

            $('#ba-craft-name').html(getTranslatedString(item,'Name'))
            $('#ba-craft-type').html(translateUI('craft_fusion'))
            $('#ba-craft-rarity').html(getRarityTier(item.Rarity))
            $('#ba-craft-icon').removeClass('ba-node-quality-1 ba-node-quality-2 ba-item-n ba-item-r ba-item-sr ba-item-ssr').addClass('ba-item-'+item.Rarity.toLowerCase())
            $('#ba-craft-icon-img').attr('src', `images/${itemList}/${item.Icon}.png`)
            $('#ba-craft-description').html(getTranslatedString(item, 'Desc'))
            $('#ba-craft-rewards-title').text(translateUI('craft_recipe_items'))
            $('#ba-craft-rewards').empty()

            let html = ''
            html += getMaterialIconHTML(recipe.RequireItem[0], recipe.RequireItem[1])
            html += getMaterialIconHTML(3000001, recipe.RequireGold)
            html += '<div class="ba-panel-separator mb-2"></div>'

            data.items.forEach(item => {
                if (item.IsReleased[regionID] && item.Tags.filter(tag => recipe.IngredientTag.includes(tag)).length > 0) {
                    html += getDropIconHTML(item.Id, item.SynthQuality / recipe.IngredientExp, 1, 1, true)
                }
            })

            data.furniture.forEach(item => {
                if (item.IsReleased[regionID] && item.Tags.filter(tag => recipe.IngredientTag.includes(tag)).length > 0) {
                    html += getDropIconHTML(item.Id+1000000, item.SynthQuality / recipe.IngredientExp, 1, 1, true)
                }
            })

            $('#ba-craft-rewards').html(html)
            $('#ba-craft-rewards div').each(function(i,el) {
                $(el).tooltip({html: true})
            })

            $('#craft-select-'+loadedCraftId).addClass('selected')
            finalizeLoad(getTranslatedString(item, 'Name'), "craftnode", loadedCraftId, 'View Crafting', loadedCraftId)

        }

    } else {
        loadModule('craft', id)
    }
}

function loadRaid(raidId) {
    selectedEnemy = 0
    if (loadedModule == 'raids') {
        if (isNaN(parseInt(raidId))) {raidId = 1}
        if (loadedRaid) $('#raid-select-'+loadedRaid.Id).removeClass('selected')
        let raidName

        if (raidId < 1000) {
            $('#ba-raid-list-tab-raid').tab('show')
            $('#ba-raid-info').show()
            $('#ba-timeattack-info').hide()
            $('#ba-worldraid-difficulty').hide()
            $('#ba-raid-difficulty').show()
            $('#ba-raid-season').show()
            $('#ba-raid-info-tab-profile').show()
            raid = findOrDefault(data.raids.Raid,"Id",raidId,1)[0]
            if (raid.IsReleasedInsane[regionID]) {
                $('#ba-raid-difficulty-5').toggleClass('disabled', false)
            } else {
                $('#ba-raid-difficulty-5').toggleClass('disabled', true)
                if (raid_difficulty == 5)  {
                    raid_difficulty = 0
                }
            }
            $(`#ba-raid-difficulty-${raid_difficulty}`).tab('show')
        
            $('#ba-raid-affiliation').text(getLocalizedString('StageType', 'Raid'))
            raidName = getTranslatedString(raid, 'Name')
            $('#ba-raid-name').text(raidName)       
            $('#ba-raid-terrain-img').attr('src', `images/ui/Terrain_${raid.Terrain[0]}.png`)
            if (raid.Terrain.length > 1) {
                $('#ba-raid-terrain-alt-img').attr('src', `images/ui/Terrain_${raid.Terrain[1]}.png`)
                $('#ba-raid-terrain-alt').show()
            } else {
                $('#ba-raid-terrain-alt').hide()
            }
            $('#ba-raid-profile-page').show()
            $('#ba-raid-profile-name').text(getTranslatedString(raid, "Name"))
            $('#ba-raid-profile-affiliation').text(getLocalizedString("BossFaction", raid.Faction))
            $('#ba-raid-profile').html(getTranslatedString(raid, "Profile"))
    
            if (!raid.IsReleasedInsane[regionID] && raid_difficulty == 5) {raid_difficulty = 0}
            changeRaidDifficulty(raid_difficulty)
            //populate raid seasons
            raidSeasons = find(data.raids["SeasonReward"+(regionID == 0 ? "Jp" : "Global")], "RaidId", raid.Id)
            let optionsHtml = `<option value="0" disabled selected>${translateUI('raid_season_select')}</option>`
            const dateOptions = {year: "numeric", month: "numeric", day: "numeric"}
            raidSeasons.forEach((season, index) => {
                const start = new Date(season.Start*1000).toLocaleString([], dateOptions)
                const end = new Date(season.End*1000).toLocaleString([], dateOptions)
                optionsHtml += `<option value="${season.Season}">${translateUI('raid_season',[season.Season, getLocalizedString("AdaptationType", season.Terrain)]) + " [" + start + "~"+end+"]"}</option>`
            })
            $('#ba-raid-season-select').html(optionsHtml)
            $('#ba-raid-season-rewards').html("")
        } else if (raidId < 800000) {
            //Time Attack
            $('#ba-raid-list-tab-timeattack').tab('show')
            $('#ba-raid-info').hide()
            $('#ba-timeattack-info').show()
            raid = findOrDefault(data.raids.TimeAttack,"Id",raidId,1000)[0]
            $(`#ba-timeattack-difficulty-${ta_difficulty}`).tab('show')
            raidName = getLocalizedString("TimeAttackStage", raid.DungeonType)
            $('#ba-timeattack-name').text(raidName)
            $('#ba-timeattack-terrain-img').attr('src', `images/ui/Terrain_${raid.Terrain}.png`)
            changeTimeAttackDifficulty(ta_difficulty)
        } else {
            //World Raid
            $('#ba-raid-list-tab-worldraid').tab('show')
            $('#ba-raid-info').show()
            $('#ba-timeattack-info').hide()
            $('#ba-worldraid-difficulty').show()
            $('#ba-raid-difficulty').hide()
            $('#ba-raid-season').hide()
            if ($('#ba-raid-info-tab-profile').hasClass('active')) {
                $('#ba-raid-info-tab-skills').tab('show')
            }
            $('#ba-raid-info-tab-profile').hide()
            raid = findOrDefault(data.raids.WorldRaid,"Id",raidId,1)[0]

            if (raid_difficulty > 2)  {
                raid_difficulty = 0
            }
            
            $(`#ba-worldraid-difficulty-${raid_difficulty}`).tab('show')
        
            $('#ba-raid-affiliation').text(getLocalizedString('StageType', 'WorldRaid'))
            raidName = getTranslatedString(raid, 'Name')
            $('#ba-raid-name').text(raidName)      
            $('#ba-raid-terrain-img').attr('src', `images/ui/Terrain_${raid.Terrain[0]}.png`)
            if (raid.Terrain.length > 1) {
                $('#ba-raid-terrain-alt-img').attr('src', `images/ui/Terrain_${raid.Terrain[1]}.png`)
                $('#ba-raid-terrain-alt').show()
            } else {
                $('#ba-raid-terrain-alt').hide()
            }

            changeWorldRaidDifficulty(raid_difficulty)
        }
        $('#ba-raid-season-rewards').hide()
        loadedRaid = raid
        $('#raid-select-'+raid.Id).addClass('selected')

        finalizeLoad(raidName, "raid", raid.Id, 'View Raid', raid.Id)

    } else {
        loadModule('raids', raidId)
    }
}

function loadRaidSeasonRewards(el) {
    const season = find(data.raids["SeasonReward"+(regionID == 0 ? "Jp" : "Global")], "Season", $(el).val())[0]
    if (season) {
        let html = ""
        season.Rewards.forEach(([points, rewards]) => {
            if (html != "") html += '<div class="ba-panel-separator"></div>'
            html += `<div class="d-flex"><span class="reward-point">${points.toLocaleString() + " Pt"}</span><div class="season-rewards mt-2">`
            rewards.forEach(([itemId, amount]) => {
                html += getDropIconHTML(itemId, amount)
            })
            html += `</div></div>`
        })
        $('#ba-raid-season-rewards').html(html)
        $('#ba-raid-season-rewards .season-rewards>div').tooltip({html: true})
        $('#ba-raid-season-rewards').show()
    }
}

function changeRaidDifficulty(difficultyId) {
    raid_difficulty = difficultyId
    let skillsHTML = '', tabsHtml = ''
    $('#ba-raid-header').css('background-image', `url('images/raid/Boss_Portrait_${raid.PathName}${raid_difficulty == 5 ? "_Insane" : ""}_Lobby.png')`)
    $('#ba-raid-level').text(`Lv. ${raid_level[raid_difficulty]}`)
    if (selectedEnemy >= raid.EnemyList[raid_difficulty].length) {selectedEnemy = 0}
    raid.EnemyList[raid_difficulty].forEach(function(el,i) {
        let enemy = find(data.enemies,'Id',el)[0]
        tabsHtml += `<button class="nav-link ${i==selectedEnemy ? "active" : ""}" data-bs-toggle="tab" href="#" onclick="changeRaidEnemy(${i})">${getTranslatedString(enemy, 'Name')}</button>`
    })
    $('#ba-raid-enemy-tabs').empty().html(tabsHtml)
    raid.RaidSkill.forEach(function(el, i) {
        if (raid_difficulty < el.MinDifficulty) return
        
        let skillType
        switch (el.SkillType) {
            case 'EX':
                skillType = translateUI('student_skill_ex')
                break;
            case 'Passive':
                skillType = translateUI('student_skill_passive')
                break;
            default:
                skillType = 'unknown'
                break;
        }

        if (skillsHTML != '') skillsHTML += '<div class="ba-panel-separator"></div>'
        skillsHTML += `<div class="d-flex flex-row align-items-center mt-2"><img class="ba-raid-skill d-inline-block me-3" src="images/raid/skill/${el.Icon}.png"><div class="d-inline-block"><div><h4 class="me-2 d-inline">${getTranslatedString(el, 'Name')}</h4></div><div class="mt-1"><p class="d-inline" style="font-style: italic;">${skillType}</p>${el.ATGCost > 0 ? '<p class="d-inline text-bold"> ・ <i>ATG:</i> '+el.ATGCost+'</p>' : ''}</div></div></div><p class="mt-1 mb-2 p-1">${getSkillText(getTranslatedString(el, 'Desc'), el["Parameters"+userLang], raid_difficulty+1, 'raid')}</p>`
    })
    $('#ba-raid-skills').empty().html(skillsHTML)
    $('.ba-skill-debuff, .ba-skill-buff, .ba-skill-special, .ba-skill-cc').each(function(i,el) {
        $(el).tooltip({html: true})
    })

    let html = ''

    html += getDropIconHTML(7, raid_reward_coin[raid_difficulty][0])
    if (raid_reward_coin[raid_difficulty][1] != 0) {
        html += getDropIconHTML(9, raid_reward_coin[raid_difficulty][1])
    }
    
    $(`#ba-raid-rewards`).html(`<div class="d-flex flex-wrap justify-content-center">${html}</div>`)
    $(`#ba-raid-rewards>div div`).each((i, el) => {
        $(el).tooltip({html: true})
    })
    
    changeRaidEnemy(selectedEnemy)
}

function changeTimeAttackDifficulty(difficultyId) {
    ta_difficulty = difficultyId
    let rulesHTML = '', enemyHTML = '';
    $('#ba-timeattack-level').text(`Lv.${raid.EnemyLevel[ta_difficulty]}`)

    const enemyRanks = ['Minion','Elite','Champion','Boss']
    raid.Formations[ta_difficulty].EnemyList.forEach(function(el, i) {
        let enemy = find(data.enemies, "Id", raid.Formations[ta_difficulty].EnemyList[i])[0]
        let rankId = enemy.Rank == 'Summoned' ? 0 : enemyRanks.indexOf(enemy.Rank)
        enemyHTML += getEnemyCardHTML(enemy, raid.Formations[ta_difficulty].Level[rankId], raid.Formations[ta_difficulty].Grade[rankId], 1)
    })
    
    $('#ba-stage-enemies').html(enemyHTML)
    $('#ba-stage-enemies > :first').trigger("click")

    raid.Rules[difficultyId].forEach(id => {
        rule = find(data.raids.TimeAttackRules, 'Id', id)[0]
        if (rulesHTML != '') rulesHTML += '<div class="ba-panel-separator"></div>'
        rulesHTML += `<div class="d-flex flex-row align-items-start mt-2"><img class="ba-raid-skill d-inline-block me-3" src="images/timeattack/${rule.Icon}.png"><div class="d-inline-block"><div><h4 class="me-2 d-inline">${getTranslatedString(rule, 'Name')}</h4><p class="mt-1 mb-2 p-1">${getSkillText(getTranslatedString(rule, 'Desc'), [], 0, 'raid')}</p></div></div></div>`
    })
    $('#ba-timeattack-rules').empty().html(rulesHTML)
    $('.ba-skill-debuff, .ba-skill-buff, .ba-skill-special, .ba-skill-cc').each(function(i,el) {
        $(el).tooltip({html: true})
    })
}

function changeWorldRaidDifficulty(difficultyId) {
    raid_difficulty = difficultyId
    let skillsHTML = '', tabsHtml = ''
    $('#ba-raid-header').css('background-image', `url('images/raid/Boss_Portrait_${raid.PathName}_Lobby.png')`)
    $('#ba-raid-level').text(`Lv. ${raid.Level[raid_difficulty]}`)
    if (selectedEnemy >= raid.EnemyList[raid_difficulty].length) {selectedEnemy = 0}
    raid.EnemyList[raid_difficulty].forEach(function(el,i) {
        let enemy = find(data.enemies,'Id',el)[0]
        tabsHtml += `<button class="nav-link ${i==selectedEnemy ? "active" : ""}" data-bs-toggle="tab" href="#" onclick="changeRaidEnemy(${i})">${getTranslatedString(enemy, 'Name')}</button>`
    })
    $('#ba-raid-enemy-tabs').empty().html(tabsHtml)
    raid.RaidSkill.forEach(function(el, i) {
        if (raid_difficulty < el.MinDifficulty) return

        let skillType
        switch (el.SkillType) {
            case 'EX':
                skillType = translateUI('student_skill_ex')
                break;
            case 'Passive':
                skillType = translateUI('student_skill_passive')
                break;
            default:
                skillType = 'unknown'
                break;
        }

        if (skillsHTML != '') skillsHTML += '<div class="ba-panel-separator"></div>'
        skillsHTML += `<div class="d-flex flex-row align-items-center mt-2"><img class="ba-raid-skill d-inline-block me-3" src="images/raid/skill/${el.Icon}.png"><div class="d-inline-block"><div><h4 class="me-2 d-inline">${getTranslatedString(el, 'Name')}</h4></div><div class="mt-1"><p class="d-inline" style="font-style: italic;">${skillType}</p>${el.ATGCost > 0 ? '<p class="d-inline text-bold"> ・ <i>ATG:</i> '+el.ATGCost+'</p>' : ''}</div></div></div><p class="mt-1 mb-2 p-1">${getSkillText(getTranslatedString(el, 'Desc'), el.Parameters, raid_difficulty+1, 'raid')}</p>`
    })
    $('#ba-raid-skills').empty().html(skillsHTML)
    $('.ba-skill-debuff, .ba-skill-buff, .ba-skill-special, .ba-skill-cc').each(function(i,el) {
        $(el).tooltip({html: true})
    })

    let html = ''
    raid.Rewards[raid_difficulty].forEach(val => {
        html += getDropIconHTML(val[0], val[1])
    })
        
    $(`#ba-raid-rewards`).html(`<div class="d-flex flex-wrap justify-content-center">${html}</div>`)
    $(`#ba-raid-rewards>div div`).each((i, el) => {
        $(el).tooltip({html: true})
    })
    
    changeRaidEnemy(selectedEnemy)
}

function changeRaidEnemy(num) {
    selectedEnemy = num
    let enemy = find(data.enemies,'Id',raid.EnemyList[raid_difficulty][num])[0], grade = 1
    let level
    (raid.Id < 1000) ? level = raid_level[raid_difficulty] : level = raid.Level[raid_difficulty]

    let enemyStats = new CharacterStats(enemy, level, 1, (enemy.Transcendence ? enemy.Transcendence : []), 0)

    raidEnemyStatList.forEach((statName) => {
        if (statName == 'AmmoCount') {
            $(`#ba-raid-enemy-stats .stat-${statName} .stat-value`).text(enemy.SquadType == 'Main' ? enemyStats.getBaseString('AmmoCount') + ' (' + enemyStats.getBaseString('AmmoCost') + ')' : '-')
        } else if (statName == 'DefensePower') {
            $(`#ba-raid-enemy-stats .stat-${statName} .stat-value`).html(`<span class="has-tooltip">${enemyStats.getBaseString(statName)}</span>`)
        } else {
            $(`#ba-raid-enemy-stats .stat-${statName} .stat-value`).text(enemyStats.getBaseString(statName))
        }
    })

    let defText = translateUI('stat_defense_tooltip', [`<b>${enemyStats.getDefenseDamageReduction()}</b>`])
    $('.stat-DefensePower .has-tooltip').tooltip('dispose').tooltip({title: getBasicTooltip(defText), html: true, placement: 'top'})

    let bulletType = (raid_difficulty < 5) ? raid.BulletType : raid.BulletTypeInsane
    $("#ba-raid-attacktype").removeClass("bg-atk-explosion bg-atk-pierce bg-atk-mystic bg-atk-normal").addClass(`bg-atk-${bulletType.toLowerCase()}`).tooltip('dispose').tooltip({title: getRichTooltip(null, `${getLocalizedString('BulletType', bulletType)}`, translateUI('attacktype'), null, getAttackTypeText(bulletType), 32), placement: 'top', html: true})
    $("#ba-raid-attacktype-label").text(getLocalizedString('BulletType',bulletType))

    $("#ba-raid-defensetype").removeClass("bg-def-lightarmor bg-def-heavyarmor bg-def-unarmed bg-def-normal").addClass(`bg-def-${enemy.ArmorType.toLowerCase()}`).tooltip('dispose').tooltip({title: getRichTooltip(null, `${getLocalizedString('ArmorType', enemy.ArmorType)}`, translateUI('defensetype'), null, getDefenseTypeText(enemy.ArmorType), 32), placement: 'top', html: true})
    $("#ba-raid-defensetype-label").text(getLocalizedString('ArmorType',enemy.ArmorType))
    let enemysize = getEnemySize(enemy)
    $('#ba-raid-enemy-size').text(enemysize != null ? getLocalizedString('EnemyTags', enemysize) : '').toggle(enemysize != null)

}

function getEnemySize(enemy) {
    let size = enemy.Tags.filter(x => x.includes("Enemy"))
    return (size.length == 0) ? null : size[0]
}

function loadStage(id) {
    if (loadedModule == 'stages') {
        let mode = ''
        if (loadedStage) $('#stage-select-'+loadedStage.Id).removeClass('selected')
        if (id >= 7000000) {
            const eventId = parseInt(String(id).slice(0,3))
            if (conquest_events.includes(eventId)) {
                mode = 'Conquest'
                stage = findOrDefault(data.stages.Conquest, "Id", id, 8153902)[0]
                loadedStage = stage
                if (loadedStageList != '' + stage.EventId % 10000) populateEventStageList(stage.EventId)
            } else {
                mode = 'Event'
                stage = findOrDefault(data.stages.Event, "Id", id, 8012301)[0]
                loadedStage = stage
                if (loadedStageList != '' + stage.EventId % 10000) populateEventStageList(stage.EventId)
            }
        } else if (id >= 1000000) {
            mode = 'Campaign'
            stage = findOrDefault(data.stages.Campaign, "Id", id, 1011101)[0]
            loadedStage = stage
            if (loadedStageList != 'missions') populateStageList('missions')
        } else if (id >= 60000) {
            mode = 'SchoolDungeon'
            stage = findOrDefault(data.stages.SchoolDungeon, "Id", id, 60101)[0]
            loadedStage = stage
            if (loadedStageList != 'schooldungeon') populateStageList('schooldungeon')
        } else if (id >= 31000) {
            mode = 'WeekDungeon'
            stage = findOrDefault(data.stages.WeekDungeon, "Id", id, 31101)[0]
            loadedStage = stage
            if (loadedStageList != 'commissions') populateStageList('commissions')
        } else if (id >= 30000) {
            mode = 'WeekDungeon'
            stage = findOrDefault(data.stages.WeekDungeon, "Id", id, 30101)[0]
            loadedStage = stage
            if (loadedStageList != 'bounty') populateStageList('bounty')
        } else {
            // fallback to default 1-1 Normal
            mode = 'Campaign'
            stage = find(data.stages.Campaign, "Id", 1011101)[0]
            loadedStage = stage
            if (loadedStageList != 'missions') populateStageList('missions')
        }
        $('#ba-stage-drops-tabs').toggle(mode != 'WeekDungeon')
        if (mode == 'WeekDungeon') $('#ba-stage-drops-default-tab').tab('show')

        $('#ba-stage-name').html(getStageName(stage, mode))
        $('#ba-stage-title').html(getStageTitle(stage, mode))
        $('#ba-stage-level').text(translateUI('rec_level') + ' Lv.'+ stage.Level)
        $('#ba-stage-terrain-img').attr('src', `images/ui/Terrain_${stage.Terrain}.png`)
        $('#ba-stage-fog').toggle(mode == "Campaign" && stage.Difficulty == 1)

        const stageTypes = ["Default","FirstClear","ThreeStar"]
        stageTypes.forEach(el => {
            if (el in stage.Rewards && stage.Rewards[el].length > 0) {
                let html = ''
                if (stage.Type == "FindGift") {
                    html += getDropIconHTML(stage.Rewards[el][0][0], 0.1, stage.Rewards[el][0][1], stage.Rewards[el][0][1])
                    html += getDropIconHTML(stage.Rewards[el][1][0], 0.5, stage.Rewards[el][1][1], stage.Rewards[el][1][1])
                    html += getDropIconHTML(stage.Rewards[el][2][0], 0.4, stage.Rewards[el][2][1], stage.Rewards[el][2][1])
                    stage.Rewards[el]
                } else if (regionID == 1 && "RewardsGlobal" in stage) {
                    $.each(stage.RewardsGlobal[el], function(i,el2){
                        html += getDropIconHTML(el2[0], el2[1])
                    })
                } else {
                    $.each(stage.Rewards[el], function(i,el2){
                        html += getDropIconHTML(el2[0], el2[1])
                    })
                }

                $(`#ba-stage-drops-${el.toLowerCase()}`).html(`<div class="d-flex flex-wrap justify-content-center">${html}</div>`)

                if (stage.Type == "FindGift") {
                    $(`#ba-stage-drops-${el.toLowerCase()}`).prepend(`<i class="d-block mb-2">${translateUI('rewards_findgift_msg')}</i><div class="d-flex flex-wrap justify-content-center"></div>`)
                }
                $(`#ba-stage-drops-${el.toLowerCase()}>div div`).each(function(i,el2) {
                    $(el2).tooltip({html: true})
                })
            } else {
                $(`#ba-stage-drops-${el.toLowerCase()}`).html(`<div class="d-flex flex-wrap justify-content-center"><span class="pb-2 text-center">${translateUI('rewards_none')}</span></div>`)
            }
        })

        let html = ''
        let enemyList = {}
        const enemyRanks = ['Minion','Elite','Champion','Boss']
        stage.Formations.forEach(el => {
            for (let i = 0; i < el.EnemyList.length; i++) {
                let enemy = find(data.enemies, "Id", el.EnemyList[i])[0]
                let rankId = enemyRanks.indexOf(enemy.Rank)
                enemyList[`${4-rankId}_${enemy.Id}_${el.Level[rankId]}_${el.Grade[rankId]}`] = enemy
                //all_enemies[enemy_rank[enemy.Rank]+'_'+enemy.Id+'_'+el['Level'+enemy.Rank]+'_'+el['Grade'+enemy.Rank]] = enemy
            }
        })

        Object.keys(enemyList).sort().forEach(el => {
            e_level = el.split('_')[2]
            e_grade = el.split('_')[3]
            html += getEnemyCardHTML(enemyList[el], e_level, e_grade)
        })
        $('#ba-stage-enemies').html(html)
        $('#ba-stage-enemies > :first').trigger("click")

        if ("HexaMap" in stage) {
            $('#ba-stage-tab-map').toggleClass('disabled', false)
            drawHexamap(stage, '#ba-stage-map-canvas')
            $('.ba-stage-star-1').html(translateUI('starcondition_complete'))
            $('.ba-stage-star-2').html(translateUI('starcondition_sranks', [stage.StarCondition[0]]))
            $('.ba-stage-star-3').html(translateUI('starcondition_clearturns', [stage.StarCondition[1]]))
        } else {
            if ($('#ba-stage-tab-map').hasClass('active')) {
                $('#ba-stage-tab-enemies').tab('show')
            }
            $('#ba-stage-tab-map').toggleClass('disabled', true)
            if (mode == "Campaign" || mode == "Event") {
                $('.ba-stage-star-1').html(translateUI('starcondition_defeatall'))
                $('.ba-stage-star-2').html(translateUI('starcondition_defeatalltime', ['120']))
                $('.ba-stage-star-3').html(translateUI('starcondition_allsurvive'))
            } else if (mode == "Conquest") {
                $('.ba-stage-star-1').html(translateUI('starcondition_defeatall'))
                $('.ba-stage-star-2').html(translateUI('starcondition_defeatalltime', [stage.StarCondition[1]]))
                $('.ba-stage-star-3').html(translateUI('starcondition_allsurvive'))
            } else if (stage.Type.slice(0,6) == "Chaser") {
                $('.ba-stage-star-1').html(translateUI('starcondition_clear'))
                $('.ba-stage-star-2').html(translateUI('starcondition_allsurvive'))
                $('.ba-stage-star-3').html(translateUI('starcondition_cleartime', ['150']))
            } else if (stage.Type == "Blood") {
                $('.ba-stage-star-1').html(translateUI('starcondition_clear'))
                $('.ba-stage-star-2').html(translateUI('starcondition_allsurvive'))
                $('.ba-stage-star-3').html(translateUI('starcondition_cleartime', ['120']))
            } else if (stage.Type == "FindGift") {
                $('.ba-stage-star-1').html(translateUI('starcondition_earnrewards', ['1']))
                $('.ba-stage-star-2').html(translateUI('starcondition_earnrewards', ['4']))
                $('.ba-stage-star-3').html(translateUI('starcondition_earnrewards', ['5']))
            } else if (stage.Type.slice(0,6) == "School"){
                $('.ba-stage-star-1').html(translateUI('starcondition_clear'))
                $('.ba-stage-star-2').html(translateUI('starcondition_allsurvive'))
                $('.ba-stage-star-3').html(translateUI('starcondition_cleartime', ['120']))
            }
        }

        html = ''
        if ("EntryCost" in stage && stage.EntryCost.length > 0) {
            stage.EntryCost.forEach(ec => {
                let currency
                if (ec[0] < 20) {
                    currency = find(data.currency, 'Id', ec[0])[0]
                } else {
                    currency = find(data.items, 'Id', ec[0])[0]
                }
                html += `<span class="ba-info-pill bg-theme my-0 me-2" data-bs-toggle="tooltip" data-bs-placement="top" title="${getRichTooltip(`images/items/${currency.Icon}.png`, getTranslatedString(currency, 'Name'), getLocalizedString('ItemCategory', 'Currency'), '', getTranslatedString(currency, 'Desc'), 50, 'img-scale-larger')}"><img src="images/items/${currency.Icon}.png" style="height:26px;width:auto;"><span class="label ps-0 text-bold">&times;${ec[1]}</span></span>`
            })
            
        }
        $('#ba-stage-entrycost').html(html)
        $('#ba-stage-entrycost >span').tooltip({html: true})
        $('#ba-stage-map-enemies').html(`<p class="grid-text">${translateUI('maptile_enemy_default_msg')}</p>`)
        $('#stage-select-'+stage.Id).addClass('selected')

        finalizeLoad($('#ba-stage-title').text(), 'stage', id, 'View Stage', id)

    } else {
        loadModule('stages', id)
    }
}

function populateEnemyList(containerId, formations) {
    let html = ''
    let enemyList = {}
    const enemyRanks = ['Minion','Elite','Champion','Boss']
    formations.forEach(el => {
        for (let i = 0; i < el.EnemyList.length; i++) {
            let enemy = find(data.enemies, "Id", el.EnemyList[i])[0]
            let rankId = enemyRanks.indexOf(enemy.Rank)
            enemyList[`${4-rankId}_${enemy.Id}_${el.Level[rankId]}_${el.Grade[rankId]}`] = enemy
        }
    })

    Object.keys(enemyList).sort().forEach(el => {
        e_level = el.split('_')[2]
        e_grade = el.split('_')[3]
        html += getEnemyCardHTML(enemyList[el], e_level, e_grade)
    })
    $(containerId).html(html)
    $(containerId).children().first().trigger("click")
}

function getStageName(stage, type) {
    switch (type) {
        case "Event":
            return `${getLocalizedString('EventName', ''+stage.EventId % 10000)}\n${stage.Difficulty == 1 ? "Quest" : "Challenge"} ${stage.Stage.toString().padStart(2,'0')}`
        case "Campaign":
            return `${stage.Area}-${stage.Stage} ${stage.Difficulty == 1 ? 'Hard' : 'Normal'}`
        case "WeekDungeon":
        case "SchoolDungeon":
            return `${getLocalizedString('StageType', stage.Type)}`
        case "Conquest":
            return `${getLocalizedString('ConquestMap', stage.EventId)}`
    }
    console.log(`No name definition for stage type ${type}`)
    return "undefined!!!"
}

function getStageTitle(stage, type) {
    switch (type) {
        case "Event":
        case "Campaign":
        case "Conquest":
            return getTranslatedString(stage, 'Name')
        case "WeekDungeon":
        case "SchoolDungeon":
            return `${getLocalizedString('StageTitle', stage.Type, String.fromCharCode(64+stage.Stage))}`
    }
    console.log(`No title definition for stage type ${type}`)
    return "undefined!!!"
}

function getEventStage(id) {
    let event_id = id.toString().slice(0,3)
    let event = find(data.stages.events, "Id", event_id)
    if (event.length > 0) {
        let event_stage = find(event[0].Stages, "Id", id)
        if (event_stage.length > 0) return event_stage[0]
    }
    return data.stages.events[0].Stages[0]
}

function loadRegion(regID) {
    regionID = regID
    region = data.common.regions[regionID]
    $(".statpreview-level").attr("max",region.studentlevel_max)
    $('#ba-statpreview-level-modal').text(`Lv.1 / ${region.studentlevel_max}`)
    $("#ba-weaponpreview-levelrange, #ba-statpreview-weapon-range").attr("max",region.weaponlevel_max)
    if (region.weaponlevel_max == 0) {
        $("#ba-student-nav-weapon").hide()
        $("#ba-statpreview-weapon").hide()
        $("#ba-weaponpreview-star-1").hide()
        $("#ba-weaponpreview-star-2").hide()
        $("#ba-weaponpreview-star-3").hide()
        statPreviewWeaponGrade = 0
    }
    $("#ba-bond-levelrange").attr("max",region.bondlevel_max)
    $("#ba-statpreview-gear1-range").attr("max",region.gear1_max)
    $("#ba-statpreview-gear2-range").attr("max",region.gear2_max)
    $("#ba-statpreview-gear3-range").attr("max",region.gear3_max)

    if (regionID == 1) {
        //hide filters not relevant to global
        $('#ba-student-search-filter-school-arius').hide()
        $('#ba-student-search-filter-weapontype-rl').hide()
        
        $('#item-search-filter-furnitureset-108').hide()
        $('#item-search-filter-furnitureset-109').hide()
        $('#item-search-filter-equipmenttier-7').hide()

        //hide gear slot 4
        $('#ba-student-gear-separator').hide()
        $('#ba-student-gear-4').hide()
        $('#ba-student-search-filter-bondgear').hide()
        
    }
}

function getAdaptationText(terrain, rank) {
    return translateUI('terrain_adaption_details', [terrain_dmg_bonus[rank], getLocalizedString('AdaptationType',terrain).toLowerCase(), terrain_block_bonus[rank]])
}

function getStatName(stat) {
    return getLocalizedString('Stat',stat.replace('_Coefficient','').replace('_Base','').replace('100','').replace('1',''))
}

function getFormattedStatAmount(val) {
    return Number.isInteger(val) ? val : `${parseFloat((val*100).toFixed(2))}%`
}

function changeGearLevel(slot, el, recalculate = true) {
    const geartype = student.Equipment[slot-1]
    const tier = parseInt(el.value)
    const equipment = find(data.equipment, "Id", gearId[geartype]+tier-1)[0]
    statPreviewEquipment[slot-1] = tier
    //var gearobj = find(data.common.gear, "type", geartype)[0]
    $(`#ba-statpreview-gear${slot}-icon`).attr("src", `images/equipment/Equipment_Icon_${geartype}_Tier${tier}.png`)
    $(`#ba-statpreview-gear${slot}-level`).text(`T${tier}`)
    $(`#ba-statpreview-gear${slot}-name`).text(getTranslatedString(equipment, 'Name'))
    $(`#ba-statpreview-gear${slot}-description`).html(getGearStatsText(equipment))
    if (statPreviewIncludeEquipment) {
        if (recalculate) recalculateStatsWithDelay()
        updateGearIcon()
    }
}

function getEquipmentId(type, tier) {
    return find(data.equipment, "Category", type)[tier-1]
}

function getGearStatsText(equipment, delimiter=', ') {
    let text = []
    for (let i = 0; i < equipment.StatType.length; i++) {
        let value = equipment.StatValue[i][1]
        if (equipment.StatType[i].split('_')[1] == "Coefficient") {
            value = parseFloat((value/100).toFixed(2))+'%'
        }
        text.push(`${getStatName(equipment.StatType[i])} +<b>${value}</b>`)
        
    }
    return text.join(delimiter)
}

function toggleStrikerBonus() {
    statPreviewViewSupportStats = !statPreviewViewSupportStats
    if (statPreviewViewSupportStats && statPreviewSelectedChar > 0) changeStudentSummon(0, false)
    $('#ba-student-stat-table').toggleClass("striker-bonus", statPreviewViewSupportStats)
    $('#ba-statpreview-status-strikerbonus').toggleClass("deactivated", !statPreviewViewSupportStats)
    recalculateStats()
}

function toggleGear() {
    statPreviewIncludeEquipment = !statPreviewIncludeEquipment
    $('#ba-statpreview-status-equipment').toggleClass('deactivated', !statPreviewIncludeEquipment)
    $('#ba-statpreview-gear').toggleClass("disabled", !statPreviewIncludeEquipment)
    $('#ba-statpreview-gear-toggle').toggleClass("checked", statPreviewIncludeEquipment)
    $('#ba-statpreview-gear input').prop("disabled", !statPreviewIncludeEquipment)
    updateGearIcon()
    recalculateStats()
}

function toggleBuffs() {
    statPreviewIncludeBuffs = !statPreviewIncludeBuffs
    $('#ba-statpreview-status-buffs').toggleClass('deactivated', !statPreviewIncludeBuffs)
    $('#ba-statpreview-buff-toggle').toggleClass("checked", statPreviewIncludeBuffs)
    statPreviewExternalBuffs.toggleDisabled(!statPreviewIncludeBuffs)
    recalculateStats()
}

function toggleBond(num) {
    if (num == 1) {
        statPreviewIncludeBond = !statPreviewIncludeBond
        $('#ba-statpreview-status-bond-level').toggleClass('deactivated', !statPreviewIncludeBond)
        $('#ba-statpreview-bond-1-toggle').toggleClass("checked", statPreviewIncludeBond)
        $('#ba-statpreview-bond-1').toggleClass("disabled", !statPreviewIncludeBond)
        $('#ba-statpreview-bond-1 input').prop("disabled", !statPreviewIncludeBond)
    } else {
        statPreviewIncludeBondAlts = !statPreviewIncludeBondAlts
        if (student_bondalts.length > 0) {
            $('#ba-statpreview-status-bond-alt-level').toggleClass('deactivated', !statPreviewIncludeBondAlts)
            $(`#ba-statpreview-bond-${num}-toggle`).toggleClass("checked", statPreviewIncludeBondAlts)
            $(`#ba-statpreview-bond-${num}`).toggleClass("disabled", !statPreviewIncludeBondAlts)
            $(`#ba-statpreview-bond-${num} input`).prop("disabled", !statPreviewIncludeBondAlts)
        }
    }
    recalculateStats()
}

function togglePassiveSkill() {
    statPreviewIncludePassive = !statPreviewIncludePassive
    $('#ba-statpreview-status-passive-level').toggleClass('deactivated', !statPreviewIncludePassive)
    $('#ba-statpreview-passiveskill-toggle').toggleClass("checked", statPreviewIncludePassive)
    $('#ba-statpreview-passiveskill').toggleClass("disabled", !statPreviewIncludePassive)
    $('#ba-statpreview-passiveskill input').prop("disabled", !statPreviewIncludePassive)
    recalculateStats()
}

function toggleExGear() {
    statPreviewIncludeExGear = !statPreviewIncludeExGear
    $('#ba-statpreview-ex-gear-toggle').toggleClass("checked", statPreviewIncludeExGear)
    $('#ba-statpreview-ex-gear').toggleClass("disabled", !statPreviewIncludeExGear)
    updateGearIcon()
    recalculateStats()
}

function changeStatPreviewLevel(el, recalculate = true) {
    const level = parseInt(el.value)
    $('.statpreview-level').val(level)
    $('#ba-statpreview-level').text("Lv." + level)
    $('#ba-statpreview-level-modal').text(`Lv.${level} / ${el.max}`)
    //enable or disable equipment controls
    if (statPreviewIncludeEquipment) {
        for (let i = 0; i < 3; i++) {
            $(`#ba-statpreview-gear${i+1}`).toggleClass('disabled', (level < gear_minlevelreq[i]))
            $(`#ba-statpreview-gear${i+1}-range`).prop('disabled', (level < gear_minlevelreq[i]))
        }
    }

    statPreviewLevel = level
    if (recalculate) recalculateStatsWithDelay()
}

function changeSkillPreviewLevel(el) {
    if (el.value == el.max) {
        $('#ba-skill-level').html(`<img src="images/ui/ImageFont_Max.png">`)
    } else {
        $('#ba-skill-level').html("Lv." + el.value)
    }
    recalculateSkillPreview()
}

function changeWeaponSkillPreviewLevel(el) {
    if (el.value == el.max) {
        $('#ba-weapon-skill-level').html(`<img src="images/ui/ImageFont_Max.png">`)
    } else {
        $('#ba-weapon-skill-level').html("Lv." + el.value)
    }
    recalculateWeaponSkillPreview()
}

function changeGearSkillPreviewLevel(el) {
    if (el.value == el.max) {
        $('#ba-gear-skill-level').html(`<img src="images/ui/ImageFont_Max.png">`)
    } else {
        $('#ba-gear-skill-level').html("Lv." + el.value)
    }
    recalculateGearSkillPreview()
}

function changeEXSkillPreviewLevel(el) {
    if (el.value == el.max) {
        $('#ba-skill-ex-level').html(`<img src="images/ui/ImageFont_Max.png">`)
    } else {
        $('#ba-skill-ex-level').html("Lv." + el.value)
    }
    recalculateEXSkillPreview()
}

function changeWeaponPreviewLevel(el) {
    $('#ba-weaponpreview-level').text("Lv." + el.value)
    recalculateWeaponPreview()
}

function changeStatPreviewBondLevel(i, recalculate = true) {
    const level = parseInt($(`#ba-statpreview-bond-${i}-range`).val())
    $(`#ba-statpreview-bond-${i}-level`).html(`<i class="fa-solid fa-heart me-1"></i> ${level}`)
    var bondStats
    if (i == 1) {
        bondStats = Object.entries(getBondStats(student, level))
        statPreviewBondLevel = level
        $('#ba-statpreview-status-bond-level .label').html(level)
    } else {
        bondStats = Object.entries(getBondStats(student_bondalts[i-2], level))
        statPreviewBondAltLevel = level
        $('#ba-statpreview-status-bond-alt-level .label').html(level)
    }
    $(`#ba-statpreview-bond-${i}-description`).html(`${getStatName(bondStats[0][0])} <b>+${getFormattedStatAmount(bondStats[0][1])}</b>, ${getStatName(bondStats[1][0])} <b>+${getFormattedStatAmount(bondStats[1][1])}</b>`)
    if (recalculate) recalculateStatsWithDelay()
}

function changeStatPreviewWeaponLevel(el) {
    updateWeaponLevelStatPreview(el.value)
    recalculateStatsWithDelay()
}

function updateWeaponLevelStatPreview(level) {
    $('#ba-statpreview-weapon-level, #ba-student-weapon-level').html('Lv.' + level)
    let weaponStats = getWeaponStats(student, level)
    let desc = ""
    $(Object.entries(weaponStats)).each(function(i, el){
        if (el[1] > 0) desc += `${getStatName(el[0])} <b>+${getFormattedStatAmount(el[1])}</b>, `
    })
    statPreviewWeaponLevel = parseInt(level)
    $('#ba-statpreview-weapon-description').html(desc.substring(0, desc.length-2))
}

function changeStatPreviewPassiveSkillLevel(el, recalculate = true) {
    if (el.value == el.max) {
        $('#ba-statpreview-passiveskill-level').html(`<img src="images/ui/ImageFont_Max.png">`)
    } else {
        $('#ba-statpreview-passiveskill-level').html("Lv." + el.value)
    }
    statPreviewPassiveLevel = parseInt(el.value)
    updatePassiveSkillStatPreview()
    if (recalculate) recalculateStatsWithDelay()
}

function changeStatPreviewSummonSourceSkillLevel(el, recalculate = true) {

    statPreviewExLevel = parseInt(el.value)
    updateSummonSourceSkill()
    if (recalculate) recalculateStatsWithDelay()
}

function getBondTargetsHTML(num, student) {
    return `<div><div id="ba-statpreview-bond-${num}-toggle" class="d-flex header-toggle" onclick="toggleBond(${num})">
    <h5 class="flex-fill">${translateUI('student_bond')}</h5>
    <i class="fa-regular fa-square off"></i>
    <i class="fa-solid fa-square-check on"></i></div>
    <div id="ba-statpreview-bond-${num}" class="p-2 mb-2 ba-panel"><div class="mb-1 d-flex flex-row align-items-center"><div class="ba-bond-icon me-2" style="position: relative;"><img src="images/student/icon/${student.CollectionTexture}.png"></div><div class="flex-fill"><h5>${getTranslatedString(student, 'Name')}</h5><p id="ba-statpreview-bond-${num}-description" class="mb-0" style="font-size: 0.875rem; line-height: 1rem;"></p></div></div><div class="d-flex flex-row align-items-center"><input id="ba-statpreview-bond-${num}-range" oninput="changeStatPreviewBondLevel(${num})" type="range" class="form-range statpreview-bond me-2 flex-fill" value="${num == 1 ? statPreviewBondLevel : statPreviewBondAltLevel}" min="1" max="${region.bondlevel_max}"><span id="ba-statpreview-bond-${num}-level" class="ba-slider-label"></span></div></div></div>`
}

function changeBondLevel(el) {
    $('#ba-bond-level').html(el.value)
    recalculateBondPreview()
}

function updateGearIcon() {
    let gear, tier, tierText = ""
    for (let i=1; i<=3; i++) {
        tier = statPreviewIncludeEquipment ? $(`#ba-statpreview-gear${i}-range`).val() : 1
        tierText += ((tierText == "") ? "" : " / ") + "T"+$(`#ba-statpreview-gear${i}-range`).val()
        gear = find(data.equipment, "Id", gearId[student.Equipment[i-1]]+(tier-1))[0]
        $(`#ba-student-gear-${i}-icon`).attr("src", `images/equipment/Equipment_Icon_${gear.Category}_Tier${tier}.png`).tooltip('dispose').tooltip({title: getRichTooltip(`images/equipment/Equipment_Icon_${gear.Category}_Tier${tier}.png`, getTranslatedString(gear, 'Name'), getLocalizedString('ItemCategory', gear.Category), `T${tier}`, getTranslatedString(gear, 'Desc') + `\n\n<b>${translateUI("stat_info")}:</b>\n` + getGearStatsText(gear, '\n'), 50, 'img-scale-larger'), placement: 'top', html: true}).toggleClass("gear-disabled", !statPreviewIncludeEquipment)
        $(`#ba-student-gear-${i}-icon`).attr('onclick', `loadItem(${gear.Id+2000000})`)
    }

    if ("Released" in student.Gear && student.Gear.Released[regionID]) {
        $("#ba-student-gear-4-icon").toggleClass("gear-disabled", !statPreviewIncludeExGear || !statPreviewIncludeEquipment)
    }
}

function recalculateTerrainAffinity() {
    let types = ["Street","Outdoor","Indoor"]
    types.forEach( type => {
        let adaptation = adaptaionAmount[student[`${type}BattleAdaptation`] + ((statPreviewStarGrade == 5 && statPreviewWeaponGrade >= 3 && student.Weapon.AdaptationType == type) ? student.Weapon.AdaptationValue : 0)]
        $(`#ba-student-terrain-${type.toLowerCase()}-icon`).attr("src", `images/ui/Ingame_Emo_Adaptresult${adaptation}.png`)
        $(`#ba-student-terrain-${type.toLowerCase()}`).tooltip('dispose').tooltip({title: getRichTooltip(`images/ui/Ingame_Emo_Adaptresult${adaptation}.png`,translateUI('terrain_adaption', [getLocalizedString('AdaptationType', type)])+' '+adaptation, null, null, getAdaptationText(type, adaptation), 30), placement: 'top', html: true})

    })
}

function recalculateWeaponPreview() {
    let level = $("#ba-weaponpreview-levelrange").val()
    let weaponStats = getWeaponStats(student, level)
    $(`#ba-weapon-stat-table .stat-AttackPower .stat-value`).text('+'+weaponStats.AttackPower.toLocaleString())
    $(`#ba-weapon-stat-table .stat-MaxHP .stat-value`).text('+'+weaponStats.MaxHP.toLocaleString())
    $(`#ba-weapon-stat-table .stat-HealPower .stat-value`).text('+'+weaponStats.HealPower.toLocaleString())
}

function generateStatTable(container, statList, columnWidth, detailedView = 0) {
    let innerHtml = ''
    statList.forEach(function(statName){
        innerHtml += `
            <div class="col-${columnWidth}"><div class="stat-${statName} d-flex align-items-center"><span class="stat-icon"><img class="invert-light" src="images/staticon/Stat_${statName}.png"></span><span class="stat-name">${getLocalizedString('Stat', statName)}</span><span class="flex-fill"></span><span class="stat-value">`
        if (detailedView) {
            innerHtml += `<span class="stat-base"></span><span class="stat-flat"></span><span class="stat-coefficient"></span><span class="stat-final"></span>`
        }
        innerHtml += `</span></div></div>`
    })
    innerHtml = `<div class="row g-0">${innerHtml}</div>`
    $(container).html(innerHtml)
}

function recalculateStatsWithDelay() {
    if (recalculationLimitTimeout) clearTimeout(recalculationLimitTimeout)
    setTimeout(recalculateStats, 50)
}

function recalculateStats() {
    let strikerBonus = $('#ba-student-stat-table').hasClass("striker-bonus")
    let level = $("#ba-statpreview-levelrange").val()
    let studentStats, summonStats, summon
    if (statPreviewSelectedChar > 0) {
        summon = find(data.summons, 'Id', student.Summons[statPreviewSelectedChar-1].Id)[0]
        summonStats = new CharacterStats(summon, level, (summon.StarBonus ? statPreviewStarGrade : 1))
    }
    studentStats = new CharacterStats(student, level, statPreviewStarGrade)
    if (compareMode) {
        studentCompareStats = new CharacterStats(studentCompare, level, statPreviewStarGrade)
    }

    //Include Equipment
    if (statPreviewIncludeEquipment) {
        let gear, tier
        for (let i = 0; i < 3; i++) {
            tier = parseInt($(`#ba-statpreview-gear${i+1}-range`).val())
            gear = find(data.equipment, "Id", gearId[student.Equipment[i]]+tier-1)[0]

            //check that equipment slot is unlocked at current level
            if (level >= gear_minlevelreq[i]) {
                for (let j = 0; j < gear.StatType.length; j++) {
                    studentStats.addBuff(gear.StatType[j], gear.StatValue[j][1])
                    if (statPreviewSelectedChar > 0 && summon.Id != 99999) {
                        summonStats.addBuff(gear.StatType[j], gear.StatValue[j][1])
                    }
                }
            }

            if (compareMode) {
                gear = find(data.equipment, "Id", gearId[studentCompare.Equipment[i]]+tier-1)[0]
                //check that equipment slot is unlocked at current level
                if (level >= gear_minlevelreq[i]) {
                    for (let j = 0; j < gear.StatType.length; j++) {
                        studentCompareStats.addBuff(gear.StatType[j], gear.StatValue[j][1])
                    }
                }
            }
        }

        //Include Fav Item
        if (statPreviewIncludeExGear && "Released" in student.Gear && student.Gear.Released[regionID]) {
            studentStats.addBuff(student.Gear.StatType[0], student.Gear.StatValue[0][1])

            if (statPreviewSelectedChar > 0 && summon.Id != 99999) {
                summonStats.addBuff(student.Gear.StatType[0], student.Gear.StatValue[0][1])
            }

            if (compareMode && "Released" in studentCompare.Gear && studentCompare.Gear.Released[regionID]) {
                studentCompareStats.addBuff(studentCompare.Gear.StatType[0], studentCompare.Gear.StatValue[0][1])
            }
        }
    }

    //Include Relationship
    if (statPreviewIncludeBond) {
        let bondlevel = $(`#ba-statpreview-bond-1-range`).val()
        let bondbonus = getBondStats(student, Math.min(maxbond[statPreviewStarGrade-1], bondlevel))
        Object.entries(bondbonus).forEach(el => {
            studentStats.addBuff(el[0], el[1])
        })
        if (compareMode) {
            bondbonus = getBondStats(studentCompare, Math.min(maxbond[statPreviewStarGrade-1], bondlevel))
            Object.entries(bondbonus).forEach(el => {
                studentCompareStats.addBuff(el[0], el[1])
            })
        }
    }

    if (statPreviewIncludeBondAlts) {
        for (let i = 2; i <= student_bondalts.length+1; i++) {
            let bondlevel = $(`#ba-statpreview-bond-${i}-range`).val()
            let bondbonus = getBondStats(student_bondalts[i-2], bondlevel)
            Object.entries(bondbonus).forEach(el => {
                studentStats.addBuff(el[0], el[1])
            })
        }
    }

    $('#statpreview-buff-transferable-conflict').hide()
    $('#statpreview-buff-transferable-incompatible').hide()
    $(`#statpreview-buff-transferable-controls .buff-description span`).toggleClass('invalid', false)
    //Include External Skill Buffs
    if (statPreviewIncludeBuffs && statPreviewExternalBuffs !== undefined && !statPreviewViewSupportStats && !compareMode) {
        let uniqueChannels = []
        statPreviewExternalBuffs.buffs.forEach((tbuff, index) => {
            tbuff.Skill.Effect.Effects.forEach((effect, effectIndex) => {
                //check conditions
                let compatible = true
                if ("Restrictions" in effect) {
                    effect.Restrictions.forEach(({Property, Operand, Value}) => {
                        switch (Operand) {
                            case 'Equal':
                                compatible = (student[Property] == Value)
                                break
                        } 
                    })
                }

                if (!compatible || (student.SquadType == 'Support' && statPreviewSelectedChar == 0 && tbuff.Skill.SkillType != 'sub')) {
                    //exclude other character's Ex/Basic skills on Special characters
                    $('#statpreview-buff-transferable-incompatible').toggle(statPreviewIncludeBuffs)
                    $(`#statpreview-buff-transferable-controls div[data-index='${index}'] .buff-description span[data-effect='${effectIndex}']`).toggleClass('invalid', true)
                } else {
                    if (uniqueChannels.find(e => e.type == tbuff.Skill.SkillType && e.channel == effect.Channel)) {
                        //discount the buff if there is a channel conflict
                        $('#statpreview-buff-transferable-conflict').toggle(statPreviewIncludeBuffs)
                        $(`#statpreview-buff-transferable-controls div[data-index='${index}'] .buff-description span[data-effect='${effectIndex}']`).toggleClass('invalid', true)
                    } else {
                        const value = ('StackSame' in effect ? effect.Value[0][tbuff.Level-1] * tbuff.Stacks : effect.Value[tbuff.Stacks-1][tbuff.Level-1])
                        studentStats.addBuff(effect.Stat, value)
    
                        if (statPreviewSelectedChar > 0 && tbuff.Skill.SkillType == 'sub') {
                            //for summoned entities, only apply the buff to the character and not the summon
                        } else {
                            if ('Icon' in effect) {
                                studentStats.addActiveBuffIcon(effect.Icon, 0, 'StackSame' in effect ? tbuff.Stacks : 1)
                            } else {
                                studentStats.addActiveBuffIcon(effect.Stat, value, 'StackSame' in effect ? tbuff.Stacks : 1)
                            }
        
                            
                            if (statPreviewSelectedChar > 0 && summon.Id != 99999) {
                                summonStats.addBuff(effect.Stat, value)
                            }
                        }
                        uniqueChannels.push({type: tbuff.Skill.SkillType, channel: effect.Channel})
                    }
                }
            })
        })
    }

    //studentStats.renderActiveBuffs('#ba-statpreview-status-buffs .active-buffs', 7)

    //Include Passive Skill
    if (statPreviewIncludePassive && !statPreviewViewSupportStats) {
        let passiveSkill = find(student.Skills, 'SkillType', ((statPreviewWeaponGrade >= 2) ? 'weapon' : '') + 'passive')[0]
        let passiveBonus = getPassiveSkillBonus(passiveSkill, $('#ba-statpreview-passiveskill-range').val())
        Object.entries(passiveBonus).forEach(el => {
            studentStats.addBuff(el[0], el[1])
            if (statPreviewSelectedChar == 0) {
                studentStats.addActiveBuffIcon(el[0], el[1])
            }
        })

        if (compareMode) {
            passiveSkill = find(studentCompare.Skills, 'SkillType', ((statPreviewWeaponGrade >= 2) ? 'weapon' : '') + 'passive')[0]
            passiveBonus = getPassiveSkillBonus(passiveSkill, $('#ba-statpreview-passiveskill-range').val())
            Object.entries(passiveBonus).forEach(el => {
                studentCompareStats.addBuff(el[0], el[1])            
            })
        }
    }

    //Include Custom Buffs
    if (enableCustomBuffs && statPreviewCustomBuffs !== undefined && !statPreviewViewSupportStats && !compareMode) {
        statPreviewCustomBuffs.buffs.forEach((buff, index) => {

            studentStats.addBuff(buff.Stat, buff.Amount)
            studentStats.addActiveBuffIcon(buff.Stat, buff.Amount)
            if (statPreviewSelectedChar > 0 && summon.Id != 99999) {
                summonStats.addBuff(buff.Stat, buff.Amount)
            }
        })
    }

    //Include Ex. Weapon
    if ((statPreviewStarGrade == 5) && (statPreviewWeaponGrade > 0)) {
        let weaponStats = getWeaponStats(student, $('#ba-statpreview-weapon-range').val())
        Object.entries(weaponStats).forEach(el => {
            studentStats.addBuff(el[0], el[1])
            if (statPreviewSelectedChar > 0 && summon.Id != 99999) {
                summonStats.addBuff(el[0], el[1])
            }
        })
        if (compareMode) {
            weaponStats = getWeaponStats(studentCompare, $('#ba-statpreview-weapon-range').val())
            Object.entries(weaponStats).forEach(el => {
                studentCompareStats.addBuff(el[0], el[1])
            })
        }
    }

    //Support Stats
    if (student.SquadType == 'Main' && statPreviewSupportStats !== undefined && !statPreviewViewSupportStats && !compareMode) {
        statPreviewSupportStats.supportStudents.forEach((support, index) => {

            const supportStats = new CharacterStats(support.student, support.level, support.starGrade)

            //equipment
            for (let i = 0; i < 3; i++) {
                const tier = support.equipment[i]
                const gear = find(data.equipment, "Id", gearId[support.student.Equipment[i]]+tier-1)[0]

                if (support.level >= gear_minlevelreq[i]) {
                    for (let j = 0; j < gear.StatType.length; j++) {
                        supportStats.addBuff(gear.StatType[j], gear.StatValue[j][1])
                    }
                }
            }

            //bond gear
            if (support.gear && "Released" in support.student.Gear && support.student.Gear.Released[regionID]) {
                supportStats.addBuff(support.student.Gear.StatType[0], support.student.Gear.StatValue[0][1])
            }

            //weapon
            if ((support.starGrade == 5) && (support.weaponStarGrade > 0)) {
                const weaponStats = getWeaponStats(support.student, support.weaponLevel)
                Object.entries(weaponStats).forEach(el => {
                    supportStats.addBuff(el[0], el[1])
                })
            }

            //bond level
            const bondBonus = getBondStats(support.student, Math.min(maxbond[support.starGrade-1], support.bond[0]))
            Object.entries(bondBonus).forEach(el => {
                supportStats.addBuff(el[0], el[1])
            })

            for (let i = 1; i < support.bond.length; i++) {
                const bondAlt = find(data.students, 'Id', support.student.FavorAlts[i-1])[0]
                const bondBonus = getBondStats(bondAlt, support.bond[i])
                Object.entries(bondBonus).forEach(el => {
                    supportStats.addBuff(el[0], el[1])
                })
            }

            const bonusMaxHP = supportStats.getStrikerBonus('MaxHP')
            const bonusAttackPower = supportStats.getStrikerBonus('AttackPower')
            const bonusDefensePower = supportStats.getStrikerBonus('DefensePower')
            const bonusHealPower = supportStats.getStrikerBonus('HealPower')

            let desc = ''
            desc += getStatName('MaxHP') + ` +<b>${bonusMaxHP}</b>, `
            desc += getStatName('AttackPower') + ` +<b>${bonusAttackPower}</b>, `
            desc += getStatName('DefensePower') + ` +<b>${bonusDefensePower}</b>, `
            desc += getStatName('HealPower') + ` +<b>${bonusHealPower}</b>`

            $(statPreviewSupportStats.elements.controls).find(`div[data-index="${index}"] .support-stats-desc`).html(desc)

            studentStats.addBuff('MaxHP_Base', bonusMaxHP)
            studentStats.addBuff('AttackPower_Base', bonusAttackPower)
            studentStats.addBuff('DefensePower_Base', bonusDefensePower)
            studentStats.addBuff('HealPower_Base', bonusHealPower)

        })
    }

    //add student stat to summon/vehicle
    if (statPreviewSelectedChar > 0 && !compareMode) {
        const summonLevel = $('#ba-statpreview-summon-range').val()
        const summon = student.Summons[statPreviewSelectedChar-1]
        for (let i = 0; i < summon.InheritCasterStat.length; i++) {
            summonStats.addCharacterStatsAsBuff(studentStats, summon.InheritCasterStat[i], summon.InheritCasterAmount[i][summonLevel-1])
            studentStats.addActiveBuffIcon(summon.InheritCasterStat[i], 1)
        }
        
    }

    if (student.SquadType == "Support") {
        studentStats.stats["AmmoCount"][0] = 0
    }
    if (compareMode && studentCompare.SquadType == "Support") {
        studentCompareStats.stats["AmmoCount"][0] = 0
    }

    let stats = (statPreviewSelectedChar > 0 ? summonStats : studentStats)
    const helpStats = ['DefensePower', 'CriticalPoint', 'StabilityPoint']

    studentStatListFull.forEach((stat, index) => {
        let text, modText, compareText = ""
        if ((strikerBonus) && (statPreviewSelectedChar == 0) && (index < 4)) {
            text = '+' + stats.getStrikerBonus(stat).toLocaleString()
        } else {
            if (stat == 'AmmoCount') {
                let ammo = stats.getTotalString('AmmoCount')
                let cost = stats.getTotalString('AmmoCost')
                if (ammo == 0) {
                    text = "-"
                } else {
                    text = `<span class="has-tooltip">${ammo}&nbsp;(${cost})</span>`
                }
            } else {
                text = stats.getTotalString(stat)
            }
        }
        if (compareMode) {
            let diff, amount

            if (strikerBonus) {
                if (studentCompare.SquadType != "Support") {
                    diff = stats.getStrikerBonus(stat)
                } else {
                    diff = stats.getStrikerBonus(stat) - studentCompareStats.getStrikerBonus(stat)
                }
            } else {
                diff = stats.getTotal(stat) - studentCompareStats.getTotal(stat)
            }

            if (stat.slice(-4) == 'Rate') {
                amount = `${parseFloat(Math.abs(diff/100).toFixed(1)).toLocaleString()}%`
            } else {
                amount = `${Math.abs(diff).toLocaleString()}`
            }

            if (diff < 0) {
                compareText = `<small class="comparison less"><i class="fa-solid fa-circle-chevron-down"></i>&nbsp;${amount}</small>`
            } else if (diff > 0) {
                compareText = `<small class="comparison greater"><i class="fa-solid fa-circle-chevron-up"></i>&nbsp;${amount}</small>`
            } else {
                compareText = `<small class="comparison"><i class="fa-solid fa-circle-dot"></i>&nbsp;0</small>`
            }
        }
        if (helpStats.includes(stat) && (!strikerBonus || index > 4)) {
            text = '<span class="has-tooltip">' + text + '</span>'
        }
        //Modal
        if ($('#ba-student-modal-statpreview').hasClass('show')) {
            //modText = `<span class="stat-base">${stats.getBaseString(stat)}</span>`
            $(`#ba-student-stat-modal-table .stat-${stat} .stat-value .stat-base`).text(stats.getBaseString(stat))
            const flatBonus = stats.getFlatString(stat)
            $(`#ba-student-stat-modal-table .stat-${stat} .stat-value .stat-flat`).text(flatBonus).toggleClass('zero', flatBonus == "+0").toggleClass('negative', flatBonus.startsWith('-'))
            //modText += `<span class="stat-flat${(flatBonus == "+0") ? " zero" : (flatBonus.startsWith('-') ? " negative" : "")}">${flatBonus}</span>`

            const coefBonus = stats.getCoefficientString(stat)
            $(`#ba-student-stat-modal-table .stat-${stat} .stat-value .stat-coefficient`).text(coefBonus).toggleClass('zero', coefBonus == "+0%").toggleClass('negative', coefBonus.startsWith('-'))
            //modText += `<span class="stat-coefficient${(coefBonus == "+0%") ? " zero" : (coefBonus.startsWith('-') ? " negative" : "")}">${coefBonus}</span>`

            //modText += `<span class="stat-final">${text}</span>`
            $(`#ba-student-stat-modal-table .stat-${stat} .stat-value .stat-final`).html(text)
            //$(`#ba-student-stat-modal-table .stat-${stat} .stat-value`).html(modText)
        } else {
            $(`#ba-student-stat-table .stat-${stat} .stat-value`).html(text + compareText)
        }
    })

    //Derived stat tooltips
    let defText = translateUI('stat_defense_tooltip', [`<b>${stats.getDefenseDamageReduction()}</b>`])
    let critChanceText = translateUI('stat_crit_tooltip')
    const critResValues = [20, 100, 500]
    critResValues.forEach((critRes) => {
        critChanceText += '\n' + translateUI('stat_crit_amount_tooltip', [`<b>${stats.getCriticalHitChance(critRes)}</b>`, critRes])
    })
    let stabilityText = translateUI('stat_stability_tooltip', [`<b>${stats.getStabilityMinDamage()}</b>`])

    $('.stat-DefensePower .has-tooltip').tooltip('dispose').tooltip({title: getBasicTooltip(defText), html: true, placement: 'top'})
    $('.stat-CriticalPoint .has-tooltip').tooltip('dispose').tooltip({title: getBasicTooltip(critChanceText), html: true, placement: 'top'})
    $('.stat-StabilityPoint .has-tooltip').tooltip('dispose').tooltip({title: getBasicTooltip(stabilityText), html: true, placement: 'top'})

    if (stats.getTotalString('AmmoCount') != 0) {
        $('.stat-AmmoCount .has-tooltip').tooltip('dispose').tooltip({title: getBasicTooltip(getNormalAttackHitsText((statPreviewSelectedChar > 0 ? summon.DamageDist : student.DamageDist), stats.getTotalString('AmmoCost'), (statPreviewSelectedChar > 0 ? summon.WeaponType : student.WeaponType), student.BulletType.toLowerCase())), html: true, placement: 'top'})
    }

    studentStats.renderActiveBuffs('.active-buffs', 7)

    //save settings
    if (student.Id in studentCollection) {
        if (collectionUpdateTimeout) clearTimeout(collectionUpdateTimeout)
        collectionUpdateTimeout = window.setTimeout(() => {
            studentCollectionSave()
            statPreviewSettingsSave()
        }, 50)
    } else {
        if (collectionUpdateTimeout) clearTimeout(collectionUpdateTimeout)
        collectionUpdateTimeout = window.setTimeout(() => {
            statPreviewSettingsSave()
        }, 50)
    }
}

function refreshStatTableControls() {
    $('#ba-statpreview-status-bond-level').toggleClass('deactivated', !statPreviewIncludeBond)
    $('#ba-statpreview-status-bond-level .label').html($('#ba-statpreview-bond-1-range').val())
    $('#ba-statpreview-bond-1-toggle').toggleClass("checked", statPreviewIncludeBond)
    $('#ba-statpreview-bond-1').toggleClass("disabled", !statPreviewIncludeBond)
    $('#ba-statpreview-bond-1 input').prop("disabled", !statPreviewIncludeBond)
    if (student_bondalts.length > 0) {
        $('#ba-statpreview-status-bond-alt-level').toggleClass('deactivated', !statPreviewIncludeBondAlts)
        $('#ba-statpreview-status-bond-alt-level .label').html($('#ba-statpreview-bond-2-range').val())
        $('#ba-statpreview-bond-2-toggle').toggleClass("checked", statPreviewIncludeBondAlts)
        $('#ba-statpreview-bond-2').toggleClass("disabled", !statPreviewIncludeBondAlts)
        $('#ba-statpreview-bond-2 input').prop("disabled", !statPreviewIncludeBondAlts)
    }
    $('#ba-statpreview-status-passive-level').toggleClass('deactivated', !statPreviewIncludePassive)
    $('#ba-statpreview-passiveskill-toggle').toggleClass("checked", statPreviewIncludePassive)
    $('#ba-statpreview-passiveskill').toggleClass("disabled", !statPreviewIncludePassive)
    $('#ba-statpreview-passiveskill input').prop("disabled", !statPreviewIncludePassive)

    $('#ba-statpreview-status-buffs').toggleClass('deactivated', !statPreviewIncludeBuffs)
    statPreviewExternalBuffs.toggleDisabled(!statPreviewIncludeBuffs)
    $('#ba-statpreview-buff-toggle').toggleClass("checked", statPreviewIncludeBuffs)
    // $('#ba-statpreview-buffs').toggleClass("disabled", !statPreviewIncludeBuffs)

    $('#ba-statpreview-ex-gear-toggle').toggleClass("checked", statPreviewIncludeExGear)
    $('#ba-statpreview-ex-gear').toggleClass("disabled", !statPreviewIncludeExGear)

    $('#ba-statpreview-status-equipment').toggleClass('deactivated', !statPreviewIncludeEquipment)
    $('#ba-statpreview-gear').toggleClass("disabled", !statPreviewIncludeEquipment)
    $('#ba-statpreview-gear-toggle').toggleClass("checked", statPreviewIncludeEquipment)
    $('#ba-statpreview-gear input').prop("disabled", !statPreviewIncludeEquipment)

    if (statPreviewIncludeEquipment) {
        for (let i = 0; i < 3; i++) {
            $(`#ba-statpreview-gear${i+1}`).toggleClass('disabled', (student.level < gear_minlevelreq[i]))
            $(`#ba-statpreview-gear${i+1}-range`).prop('disabled', (student.level < gear_minlevelreq[i]))
        }
    }
}

function recalculateEXSkillPreview() {
    $('.tooltip').tooltip('hide')
    let skillLevelEX = $("#ba-skillpreview-exrange").val()
    let skillEX = find(student.Skills, 'SkillType', 'ex')[0]

    $('#ba-skill-ex-description').html(getSkillText(getTranslatedString(skillEX, 'Desc'), skillEX.Parameters, skillLevelEX, student.BulletType, skillEX.DamageDist ? skillEX.DamageDist : [], skillEX.DamageDistParam ? skillEX.DamageDistParam : 1))
    $(`#ba-skill-ex-description .skill-hitinfo`).tooltip({html: true})

    $('.ba-skill-debuff, .ba-skill-buff, .ba-skill-special, .ba-skill-cc').each(function(i,el) {
        $(el).tooltip({html: true})
    })

    $('.ba-skill-ex-materials').hide()
    $('#ba-skill-ex-materials-'+skillLevelEX).show()
    $('#ba-skill-ex-cost').text(skillEX.Cost[skillLevelEX-1])

}

function recalculateSkillPreview() {
    $('.tooltip').tooltip('hide')
    let skillLevel = $("#ba-skillpreview-range").val()
    let skillList = ['normal','passive','sub']
    skillList.forEach(el => {
        let skill = find(student.Skills, 'SkillType', el)[0]
        $(`#ba-skill-${el}-description`).html(getSkillText(getTranslatedString(skill, 'Desc'), skill.Parameters, skillLevel, student.BulletType, skill.DamageDist ? skill.DamageDist : [], skill.DamageDistParam ? skill.DamageDistParam : 1))
        $(`#ba-skill-${el}-description .skill-hitinfo`).tooltip({html: true})
    })

    $('.ba-skill-debuff, .ba-skill-buff, .ba-skill-special, .ba-skill-cc').each(function(i,el) {
        $(el).tooltip({html: true})
    })

    $('.ba-skill-materials').hide()
    $('#ba-skill-materials-'+skillLevel).show()
}

function getStudentListCardHTML(student) {
    let name = getTranslatedString(student, 'Name')
    let html = `
    <div id="student-select-${student.Id}" class="selection-grid-card card-student" onclick="loadStudent('${student.PathName}')">
        <div class="card-img">
            <img src="images/student/collection/${student.CollectionTexture}.webp">
        </div>
        <span class="card-badge student-role top-left bg-${student.SquadType.toLowerCase()}-t"><img src="images/ui/Role_${student.TacticRole}.png"></span>
        <span class="card-badge student-type atk bg-atk-${student.BulletType.toLowerCase()}-t"><img src="images/ui/Type_Attack_s.png"></span>
        <span class="card-badge student-type def bg-def-${student.ArmorType.toLowerCase()}-t"><img src="images/ui/Type_Defense_s.png"></span>
        <span class="card-badge student-rarity">${'<i class="fa-solid fa-star"></i>'.repeat(student.StarGrade)}</span>
        <div class="card-label">
            <span class="label-text ${name.length > label_smalltext_threshold[userLang] ? "smalltext" : ""}">${name}</span>
            <span class="label-text hover ${name.length > label_smalltext_threshold[userLang] ? "smalltext" : ""}" style="display: none;">${name}</span>
        </div>
    </div>`
    return html
}

function getStageCardHTML(stage, dropChance = 0) {
    let type = ''
    let smallTextThreshold = label_enemy_smalltext_threshold["En"]
    if (stage.Id >= 7000000) {
        type = 'Event'
    } else if (stage.Id >= 1000000) {
        type = 'Campaign'
    } else if (stage.Id >= 60000) {
        type =  'SchoolDungeon'
        smallTextThreshold = label_enemy_smalltext_threshold[userLang]
    } else if (stage.Id >= 30000) {
        type = 'WeekDungeon'
        smallTextThreshold = label_enemy_smalltext_threshold[userLang]
    } else {type = 'Unknown'}
    let name = getStageCardName(stage)
    let html = `<div id="stage-select-${stage.Id}" class="selection-grid-card card-stage" onclick="loadStage('${stage.Id}')">
    <div class="card-img"><img loading="lazy" src="images/campaign/${getStageIcon(stage, type)}.png"></div>`
    if (dropChance > 0) {
        html += `<span class="card-badge stage-droprate">${getProbabilityText(dropChance)}</span>`
    }
    html += `<div class="card-label">`
    html += `<span class="label-text ${name.length > smallTextThreshold ? "smalltext" : "" }">${name}</span>`
    html += `</div></div>`
    return html

    function getStageCardName() {
        switch (type) {
            case "Event":
                return `${stage.Difficulty == 1 ? 'Quest' : 'Challenge'} ${stage.Stage.toString().padStart(2,'0')}`
            case "Campaign":
                return `${stage.Area}-${stage.Stage} ${stage.Difficulty == 1 ? 'Hard' : 'Normal'}`
            case "WeekDungeon":
            case "SchoolDungeon":
                return `${getLocalizedString('StageTitle', stage.Type, [String.fromCharCode(64+stage.Stage)])}`
        }
    }
}

function getShopCardHTML(shop) {
    let smallTextThreshold = label_enemy_smalltext_threshold[userLang]
    let name = getLocalizedString('ShopCategory', shop.ShopCategory)
    let costItem
    let costType
    switch (shop.CostType) {
        case 'Item':
            costItem = find(data.items, 'Id', shop.CostId)[0]
            costType = costItem.Category
            break
        case 'Currency':
            costItem = find(data.currency, 'Id', shop.CostId)[0]
            costType = 'Currency'
            break
    }

    let html = `<div class="selection-grid-card card-shop">
    <div class="card-img"><img loading="lazy" src="images/ui/BG_Shop.png"></div>`

    html += `<span class="card-badge shop-cost" title="${getRichTooltip(`images/items/${costItem.Icon}.png`, getTranslatedString(costItem, 'Name'), getLocalizedString('ItemCategory', costType), getRarityTier(costItem.Rarity), getTranslatedString(costItem, 'Desc').replace('&','&amp;'), 50, 'img-scale-larger')}"><img src="images/items/${costItem.Icon}.png"><span>&times;${abbreviateNumber(shop.CostAmount)}${shop.Amount > 1 ? ` (${shop.Amount})` : ''}</span></span>`
    html += `<div class="card-label">`
    html += `<span class="label-text ${name.length > smallTextThreshold ? "smalltext" : "" }">${name}</span>`
    html += `</div></div>`
    return html
}

function getEventCardHTML(eventId) {
    let eventIdImg = eventId % 10000
    let name = getLocalizedString("EventName", eventIdImg) + (eventId > 10000 ? translateUI('event_rerun') : '')

    let logoLang
    if (regionID == 0 || !data.common.regions[regionID].events.includes(eventIdImg)) {
        //always use JP logo for Japan server
        logoLang = 'Jp'
    } else {
        if (userLang == 'Cn') {
            logoLang = 'Tw'
        } else {
            logoLang = userLang
        }
    }

    let html = `
    <div id="event-select-${eventId}" class="selection-grid-card card-event" onclick="populateEventStageList(${eventId});">
        <div class="card-bg"><div style="background-image:url('images/campaign/Campaign_Event_${eventIdImg}_Normal.png');"></div>
        </div>
        <div class="card-img"><img src="images/eventlogo/Event_${eventIdImg}_${logoLang}.png"></div>`
    html += `<div class="card-label"><span class="label-text ${name.length > label_raid_smalltext_threshold[userLang] ? 'smalltext' : ''}">${name}</span></div></div>`
    return html
}

function getStageIcon(stage, type) {
    switch (type) {
        case "Event":
            return `Campaign_Event_${stage.EventId > 10000 ? stage.EventId - 10000 : stage.EventId}_${stage.Difficulty == 1 ? 'Normal' : 'Hard'}`
        case "Campaign":
            return `Campaign_Image_${stage.Area.toString().padStart(2,'0')}_${stage.Difficulty == 1 ? 'Hard' : 'Normal'}`
        case "WeekDungeon":
            return `WeekDungeon_Image_${stage.Type}`
        case "SchoolDungeon":
            return `SchoolDungeon_Image_${stage.Type}`
    }
}

function getRaidCardHTML(raid, terrain='', backgroundPath=null) {
    let name = getTranslatedString(raid, 'Name')
    if (!backgroundPath) {
        // Check if it's the alternative terrain background
        if (raid.Terrain.length > 1 && terrain == raid.Terrain[1]) {
            backgroundPath = `Boss_Portrait_${raid.PathName}_LobbyBG_${terrain}`
        } else {
            backgroundPath = `Boss_Portrait_${raid.PathName}_LobbyBG`
        }
    }
    let html = `<div id="raid-select-${raid.Id}" class="selection-grid-card card-raid" onclick="loadRaid(${raid.Id});"><div class="card-bg"><div style="background-image:url('images/raid/${backgroundPath}.png');"></div></div><div class="card-img"><img src="images/raid/Boss_Portrait_${raid.PathName}_Lobby.png"></div><div class="card-badge raid-def bg-def-${raid.ArmorType.toLowerCase()}"><img src="images/ui/Type_Defense.png" style="width:100%;"></div>`
    if (terrain != '') {
        html += `<div class="card-badge raid-terrain"><img class="invert-light" src="images/ui/Terrain_${terrain}.png"></div>`
    }
    html += `<div class="card-label"><span class="label-text ${name.length > label_raid_smalltext_threshold[userLang] ? 'smalltext' : ''}">${getTranslatedString(raid, 'Name')}</span></div></div>`
    return html
}

function getTimeAttackCardHTML(raid) {
    let name = getLocalizedString("TimeAttackStage", raid.DungeonType)
    let html = `<div id="raid-select-${raid.Id}" class="selection-grid-card card-raid" onclick="loadRaid(${raid.Id});"><div class="card-bg"><div style="background-image:url('images/timeattack/${timeAttackBG[raid.DungeonType]}.png');"></div></div><div class="card-img ta-img"><img src="images/enemy/${raid.Icon}.png"></div><div class="card-badge raid-def bg-def-${raid.ArmorType.toLowerCase()}"><img src="images/ui/Type_Defense.png"></div><div class="card-badge raid-terrain"><img class="invert-light" src="images/ui/Terrain_${raid.Terrain}.png"></div>`
    html += `<div class="card-label"><span class="label-text ${name.length > label_raid_smalltext_threshold[userLang] ? 'smalltext' : ''}">${name}</span></div></div>`
    return html
}

function getEnemyCardHTML(enemy, level, grade, scaletype=0, data=true) {
    let name = getTranslatedString(enemy, 'Name')
    let smallTextThreshold = getSmallTextThreshold(name, label_enemy_smalltext_threshold)
    let html = `<div class="selection-grid-card card-enemy" ${data ? `data-enemy='${enemy.Id}_${level}_${grade}_${scaletype}'` : ''} onclick="showEnemyInfo(${enemy.Id},${level},${grade},${scaletype},${!data})"><div class="card-img"><img src="images/enemy/${enemy.Icon}.png"></div>`

    if (enemy.Rank == 'Elite') html += `<div class="card-badge enemy-rank"><img src="images/ui/Common_Icon_Enemy_Elite.png" style="width:22px;"></div>`
    else if (enemy.Rank == 'Champion') html += `<div class="card-badge enemy-rank"><img src="images/ui/Common_Icon_Enemy_Champion.png" style="width:31px;"></div>`

    html += `<div class="card-badge enemy-level">Lv.${level}</div><div class="card-badge enemy-atk bg-atk-${enemy.BulletType.toLowerCase()}"><img src="images/ui/Type_Attack_s.png" style="width:100%;"></div>
    <div class="card-badge enemy-def bg-def-${enemy.ArmorType.toLowerCase()}"><img src="images/ui/Type_Defense_s.png" style="width:100%;"></div><div class="card-label"><span class="label-text ${name.length > smallTextThreshold ? 'smalltext' : ''}">${name}</span></div></div>`
    return html
}

function showEnemyInfo(id, level, grade=1, scaletype=0, switchTab=false) {
    $(".card-enemy").removeClass("selected")
    if (loadedModule == 'stages' && switchTab) $('#ba-stage-tab-enemies').tab('show')
    $(`.card-enemy[data-enemy='${id}_${level}_${grade}_${scaletype}']`).addClass("selected")
    //if (selector != null) $(selector).addClass("selected")

    let enemy = find(data.enemies, 'Id', id)[0]
    $('#ba-stage-enemy-name').html(getTranslatedString(enemy, 'Name'))
    $('#ba-stage-enemy-img').attr('src', `images/enemy/${enemy.Icon}.png`)
    $('#ba-stage-enemy-rank').text(`Lv.${level} ${getLocalizedString('EnemyRank', enemy.Rank)}`)
    $('#ba-stage-enemy-class').text(getLocalizedString('SquadType', enemy.SquadType)).removeClass("ba-class-main ba-class-support").addClass(`ba-class-${enemy.SquadType.toLowerCase()}`)

    let enemysize = getEnemySize(enemy)

    $('#ba-stage-enemy-size').text(enemysize != null ? getLocalizedString('EnemyTags', enemysize) : '').toggle(enemysize != null)
    $("#ba-stage-enemy-attacktype").removeClass("bg-atk-normal bg-atk-explosion bg-atk-pierce bg-atk-mystic").addClass(`bg-atk-${enemy.BulletType.toLowerCase()}`)
    $("#ba-stage-enemy-defensetype").removeClass("bg-def-lightarmor bg-def-heavyarmor bg-def-unarmed bg-def-normal").addClass(`bg-def-${enemy.ArmorType.toLowerCase()}`)
    $("#ba-stage-enemy-attacktype-label").text(getLocalizedString('BulletType',enemy.BulletType))
    $('#ba-stage-enemy-attacktype').tooltip('dispose').tooltip({title: getRichTooltip(null, `${getLocalizedString('BulletType',enemy.BulletType)}`, translateUI('attacktype'), null, getAttackTypeText(enemy.BulletType), 32), placement: 'top', html: true})
    $("#ba-stage-enemy-defensetype-label").text(getLocalizedString('ArmorType',enemy.ArmorType))
    $('#ba-stage-enemy-defensetype').tooltip('dispose').tooltip({title: getRichTooltip(null, `${getLocalizedString('ArmorType',enemy.ArmorType)}`, translateUI('defensetype'), null, getDefenseTypeText(enemy.ArmorType), 32), placement: 'top', html: true})        

    let enemyStats = new CharacterStats(enemy, level, grade, (enemy.Transcendence ? enemy.Transcendence : []), scaletype)

    enemyStatList.forEach((statName) => {
        if (statName == 'AmmoCount') {
            $(`#ba-stage-enemy-stat-table .stat-${statName} .stat-value`).text(enemy.SquadType == 'Main' ? enemyStats.getBaseString('AmmoCount') + ' (' + enemyStats.getBaseString('AmmoCost') + ')' : '-')
        } else if (statName == 'DefensePower') {
            $(`#ba-stage-enemy-stat-table .stat-${statName} .stat-value`).html(`<span class="has-tooltip">${enemyStats.getBaseString(statName)}</span>`)
        } else {
            $(`#ba-stage-enemy-stat-table .stat-${statName} .stat-value`).text(enemyStats.getBaseString(statName))
        }
    })

    let defText = translateUI('stat_defense_tooltip', [`<b>${enemyStats.getDefenseDamageReduction()}</b>`])
    $('.stat-DefensePower .has-tooltip').tooltip('dispose').tooltip({title: getBasicTooltip(defText), html: true, placement: 'top'})
}

function populateMapEnemyList(formationId) {
    stageMapModal.hide()
    let enemyList = {}
    const enemyRanks = ['Minion','Elite','Champion','Boss']
    let formation = find(loadedStage.Formations, 'Id', formationId)[0]
    let html = ''
    for (let i = 0; i < formation.EnemyList.length; i++) {
        let enemy = find(data.enemies, "Id", formation.EnemyList[i])[0]
        let rankId = enemyRanks.indexOf(enemy.Rank)
        enemyList[`${4-rankId}_${enemy.Id}_${formation.Level[rankId]}_${formation.Grade[rankId]}`] = enemy
    }

    Object.keys(enemyList).sort().forEach(el => {
        e_level = el.split('_')[2]
        e_grade = el.split('_')[3]
        html += getEnemyCardHTML(enemyList[el], e_level, e_grade, 0, false)
    })
    $('#ba-stage-map-enemies').html(html)
    window.scrollTo({top: $(`#ba-stage-map-enemies`).prop('offsetTop'), left: 0})
}

function getMaterialIconHTML(id, amount) {
    //rarity, icon, name, amount, type, description=""
    let item, itemType, html
    if (id >= 3000000) {
        item = find(data.currency, "Id", id-3000000)[0]
        itemType = 'Currency'
    } else {
        item = find(data.items, "Id", id)[0]
        itemType = item.Category
    }
    html = `<div class="drop-shadow" style="position: relative; cursor:pointer;" onclick="loadItem(${item.Id})" data-bs-toggle="tooltip" data-bs-placement="top" title="${getRichTooltip(`images/items/${item.Icon}.png`, getTranslatedString(item, 'Name'), getLocalizedString('ItemCategory', itemType), getRarityTier(item.Rarity), getTranslatedString(item, 'Desc'), 50, 'img-scale-larger')}"><img class="ba-item-icon ba-item-${item.Rarity.toLowerCase()}" src="images/items/${item.Icon}.png"><span class="ba-material-label" style="cursor:pointer;">&times;${amount}</span></div>`
    return html
}

function getDropIconHTML(id, chance, qtyMin=1, qtyMax=1, forcePercent=false) {
    let item, type, group, haslink, itemType
    if (id >= 4000000) {
        groups = find(data.common.GachaGroup, "Id", id-4000000)
        if (groups.length > 0) {
            group = groups[0]
            type = 'GachaGroup'
            itemType = 'Box'
            iconPath = 'items'
            haslink = false
        } else return ''
    } else if (id >= 3000000) {
        item = find(data.currency, "Id", id-3000000)[0]
        type = 'Currency'
        itemType = 'Currency'
        iconPath = 'items'
        haslink = false
    } else if (id >= 2000000) {
        item = find(data.equipment, "Id", id-2000000)[0]
        type = 'Equipment'
        itemType = item.Category
        iconPath = 'equipment'
        haslink = true
    } else if (id >= 1000000) {
        item = find(data.furniture, "Id", id-1000000)[0]
        type = 'Furniture'
        itemType = item.Category
        iconPath = 'furniture'
        haslink = true
    } else {
        item = find(data.items, "Id", id)[0]
        type = 'Item'
        itemType = item.Category
        iconPath = 'items'
        haslink = true
    }
    let rarityText = ''
    if (item) {
        if (type == 'Equipment' && item.Id >= 1000) {
            rarityText = `T${(item.Id%10)+1}`
        } else {
            rarityText = getRarityTier(item.Rarity)
        }
    }

    let html = ''
    if (type == "GachaGroup") {
        //check for single item GachaGroup, just display the item as normal with max qty
        //todo: make this show the full qty range
        let rarity = 'N'
        if (group.ItemList.length == 1) {
            return getDropIconHTML(group.ItemList[0][0], chance < 1 ? chance : group.ItemList[0][3])
        } else {
            // build group icon
            let icon, name, desc
            if (group.Id >= 600000 && group.Id < 700000) {
                // Equipment boxes that contain lower tier variants of the same equipment piece
                desc = translateUI('item_equipment_box') + "\n"
                iconPath = 'equipment'
                let tier = '', gearType = ''

                // Count the total probability
                const totalProb = group.ItemList.reduce((pv, cv) => {return pv + cv[1]}, 0)

                for (let i = 0; i < group.ItemList.length; i++) {
                    let gear = find(data.equipment, 'Id', group.ItemList[i][0]-2000000)[0]
                    
                    desc += `${getTranslatedString(gear, 'Name')} (${getProbabilityText(group.ItemList[i][1]/totalProb)})\n`
                    icon = gear.Icon
                    gearType = getLocalizedString('ItemCategory', gear.Category)

                    // Add Tiers String
                    if (tier != '') tier += '/'
                    tier += `T${(gear.Id%10)+1}`
                }
                name = translateUI('item_randombox_tier', [tier, gearType])
            } else if (group.Id >= 300000 && group.Id < 600000) {
                // Equipment boxes that contain a random piece for an equipment slot (same tier)
                desc = translateUI('item_equipment_box') + "\n"
                iconPath = 'equipment'
                let tier = '', gearType = ''

                // Count the total probability
                const totalProb = group.ItemList.reduce((pv, cv) => {return pv + cv[1]}, 0)

                for (let i = 0; i < group.ItemList.length; i++) {

                    let gear = find(data.equipment, 'Id', group.ItemList[i][0]-2000000)[0]
                    desc += `${getTranslatedString(gear, 'Name')} (${getProbabilityText(group.ItemList[i][1]/totalProb)})\n`
                    if (i == 0) {
                        tier = `T${(gear.Id%10)+1} `
                        icon = gear.Icon
                    }

                    // Add Gear Type String
                    if (gearType != '') gearType += '/'
                    gearType += getLocalizedString('ItemCategory', gear.Category)                
                }
                name = translateUI('item_randombox_tier', [tier, gearType])
            } else if (group.Id >= 10100 && group.Id <= 10103) {
                // Artifact Box
                tier = group.Id - 10099
                icon = group.Icon
                name = translateUI('item_randombox_tier', ['T'+tier, getLocalizedString('ItemCategory', 'Artifact')])
                desc = translateUI('item_artifact_box') + "\n"
                rarity = group.Rarity

                // Count the total probability
                const totalProb = group.ItemList.reduce((pv, cv) => {return pv + cv[1]}, 0)

                for (let i = 0; i < group.ItemList.length; i++) {
                    let item = find(data.items, 'Id', group.ItemList[i][0])[0]
                    desc += `${getTranslatedString(item, 'Name')} (${getProbabilityText(group.ItemList[i][1]/totalProb)})\n`
                }
            }
            html = `<div class="item-drop drop-shadow" style="position: relative; data-bs-toggle="tooltip" data-bs-placement="top" title="${getRichTooltip(`images/${iconPath}/${icon}.png`, name, getLocalizedString('ItemCategory','Box'), '', desc, 50, 'img-scale-larger')}"><img class="ba-item-icon ba-item-${rarity.toLowerCase()}" src="images/${iconPath}/${icon}.png"><span class="ba-material-label">${getProbabilityText(chance)}</span></div>`
        }
    } else {
        html = `<div class="item-drop drop-shadow" style="position: relative; ${haslink ? 'cursor:pointer;" onclick="loadItem('+id+')"' : '"'} title="${getRichTooltip(`images/${iconPath}/${item.Icon}.png`, getTranslatedString(item, 'Name'), getLocalizedString('ItemCategory',itemType), rarityText, getTranslatedString(item, 'Desc').replace('&','&amp;'), 50, 'img-scale-larger')}"><img class="ba-item-icon ba-item-${item.Rarity.toLowerCase()}" src="images/${iconPath}/${item.Icon}.png"><span class="ba-material-label" ${haslink ? 'style="cursor:pointer;"' : ""}>${qtyMax > 1 || forcePercent ? parseFloat((chance*100).toFixed(2)) + '&#37;' : getProbabilityText(chance)}</span>${qtyMax > 1 ? `<span class="label-qty">&times;${qtyMin != qtyMax ? abbreviateNumber(qtyMin) + '~' + abbreviateNumber(qtyMax) : abbreviateNumber(qtyMax)}</span>` : ''}</div>`
    }
    return html
}

/**
 * Formats a string with placeholders {n} using replacements. If n is out of bounds it will be replaced with an empty string
 * @param {string} string
 * @param  {string[]} replacements 
 * @returns
 */
function formatString(string, replacements=[]) {
    return string.replace(/\{([0-9]+)\}/g, (match, p1) => (p1 < replacements.length) ? replacements[p1] : '')
}

/**
 * Converts a probability to a string representing its percentage chance when < 1.00, or the quantity when >= 1.00
 * @param {*} chance 
 * @returns 
 */
function getProbabilityText(chance) {
    return chance >= 1 ? '&times;'+abbreviateNumber(parseInt(chance).toFixed(0)).toLocaleString(): parseFloat((chance*100).toFixed(2)) + '&#37;'
}

function getStudentIconSmall(student) {
    var html = `<div class="ba-item-student drop-shadow d-inline-block" style="position: relative; cursor: pointer;" data-bs-toggle="tooltip" data-bs-placement="top" onclick="loadStudent('${student.PathName}')" title="${getRichTooltip(`images/student/icon/${student.CollectionTexture}.png`, getTranslatedString(student, 'Name'), translateUI('student'), getRarityStars(student.StarGrade), getTranslatedString(student, 'ProfileIntroduction').split('\n')[0], 50, 'circle')}"><img src="images/student/icon/${student.CollectionTexture}.png"></div>`
    return html
}

function getFavourIconHTML(id, grade) {
    var gift = find(data.items, "Id", id)[0]
    var html = `<div class="ba-favor-item drop-shadow" style="position: relative; cursor:pointer;" onclick="loadItem(${gift.Id})" data-bs-toggle="tooltip" data-bs-placement="top" title="${getRichTooltip(`images/items/${gift.Icon}.png`, getTranslatedString(gift, 'Name'), getLocalizedString('ItemCategory', gift.Category), getRarityTier(gift.Rarity), getTranslatedString(gift, 'Desc'), 50, 'img-scale-larger')}"><img class="ba-item-icon ba-item-${gift.Rarity.toLowerCase()}" src="images/items/${gift.Icon}.png"><img class="ba-favor-label" src="images/ui/Cafe_Interaction_Gift_0${grade}.png"></div>`
    return html
}

function getFurnitureIconHTML(item) {
    var html = `<div class="ba-favor-item drop-shadow" style="position: relative; cursor:pointer;" onclick="loadItem(${item.Id+1000000})" data-bs-toggle="tooltip" data-bs-placement="top" title="${getRichTooltip(`images/furniture/${item.Icon}.png`, getTranslatedString(item,'Name'), getLocalizedString('ItemCategory', item.Category), getRarityStars(item.Rarity), getTranslatedString(item, 'Desc'), 50, 'img-scale-larger')}"><img class="ba-item-icon ba-item-${item.Rarity.toLowerCase()} mb-2" src="images/furniture/${item.Icon}.png"></div>`
    return html
}

function recalculateWeaponSkillPreview() {
    let skillLevel = $("#ba-weapon-skillpreview-range").val()
    let skill = find(student.Skills, 'SkillType', 'weaponpassive')[0]

    $('#ba-skill-weaponpassive-description').html(getSkillText(getTranslatedString(skill, 'Desc'), skill.Parameters, skillLevel, student.BulletType))
    $('.ba-skill-debuff, .ba-skill-buff, .ba-skill-special, .ba-skill-cc').each(function(i,el) {
        $(el).tooltip({html: true})
    })
}

function recalculateGearSkillPreview() {
    if (!("Released" in student.Gear)) return
    let skillLevel = $("#ba-gear-skillpreview-range").val()
    let skill = find(student.Skills, 'SkillType', 'gearnormal')[0]

    $('#ba-skill-gearnormal-description').html(getSkillText(getTranslatedString(skill, 'Desc'), skill.Parameters, skillLevel, student.BulletType))
    $('.ba-skill-debuff, .ba-skill-buff, .ba-skill-special, .ba-skill-cc').each(function(i,el) {
        $(el).tooltip({html: true})
    })
}

function recalculateBondPreview() {
    var level = $("#ba-bond-levelrange").val()
    var bondbonus = getBondStats(student, level)
    $(`#ba-bond-stat-table .stat-${student.FavorStatType[0]} .stat-value`).text('+'+bondbonus[student.FavorStatType[0]].toLocaleString())
    $(`#ba-bond-stat-table .stat-${student.FavorStatType[1]} .stat-value`).text('+'+bondbonus[student.FavorStatType[1]].toLocaleString())    
}

function getBondStats(student, level) {
    var stat1 = 0, stat2 = 0
    for (let i = 1; i < Math.min(level, 50); i++) {
        if (i < 20) {
            stat1 += student.FavorStatValue[Math.floor(i / 5)][0]
            stat2 += student.FavorStatValue[Math.floor(i / 5)][1]
        } else if (i < 50) {
            stat1 += student.FavorStatValue[2 + Math.floor(i / 10)][0]
            stat2 += student.FavorStatValue[2 + Math.floor(i / 10)][1]
        }
    }
    return {[student.FavorStatType[0]]: stat1, [student.FavorStatType[1]]: stat2}
}

function getWeaponStats(student, level) {
    let weaponStats = {"MaxHP": 0, "AttackPower": 0, "HealPower": 0}
    let levelscale = ((level-1)/99)
    if (student.Weapon.StatLevelUpType == 'Standard') levelscale = levelscale.toFixed(4)
    weaponStats["AttackPower"] = Math.round(student.Weapon.AttackPower1 + (student.Weapon.AttackPower100-student.Weapon.AttackPower1) * levelscale)
    weaponStats["MaxHP"] = Math.round(student.Weapon.MaxHP1 + (student.Weapon.MaxHP100-student.Weapon.MaxHP1) * levelscale)
    weaponStats["HealPower"] = Math.round(student.Weapon.HealPower1 + (student.Weapon.HealPower100-student.Weapon.HealPower1) * levelscale)
    return weaponStats
}

function changeStatPreviewStars(stars, weaponstars, recalculate = true) {

    let weaponstars_prev = statPreviewWeaponGrade

    statPreviewStarGrade = stars
    statPreviewWeaponGrade = weaponstars

    for (let i = 1; i <= 5; i++) {
        $(`.statpreview-star-${i}`).toggleClass("active", i <= stars)
    }

    for (let i = 1; i <= 3; i++) {
        $(`.weaponpreview-star-${i}`).toggleClass("active", i <= weaponstars)
    }

    const bondLevel = parseInt($('#ba-statpreview-bond-1-range').val())
    if (bondLevel > maxbond[stars-1]) {
        $('#ba-statpreview-bond-1-range').val(maxbond[stars-1])
        changeStatPreviewBondLevel(1, false)
    }
    $('#ba-statpreview-bond-1-range').attr("max", maxbond[stars-1])

    if (weaponstars > 0) {
        $('#ba-statpreview-weapon').toggleClass('disabled', false)
        $('.statpreview-weapon-range').prop('disabled', false)
        let level = 20 + (weaponstars*10)
        $('.statpreview-weapon-range').attr("max", level)
        if (recalculate) $('.statpreview-weapon-range').val(level)
        updateWeaponLevelStatPreview(level)
    } else {
        $('#ba-statpreview-weapon').toggleClass('disabled', true)
        $('.statpreview-weapon-range').prop('disabled', true)
    }
    $('#ba-student-weapon-level').toggle((statPreviewWeaponGrade > 0))

    if ((weaponstars == 3 && weaponstars_prev < 3) || (weaponstars_prev == 3 && weaponstars < 3)) {
        recalculateTerrainAffinity()
    }

    if ((weaponstars >= 2 && weaponstars_prev < 2) || (weaponstars_prev >= 2 && weaponstars < 2)) {
        updatePassiveSkillStatPreview()
    }

    if (recalculate) recalculateStats()
}

function updatePassiveSkillStatPreview() {
    //update passive skill info in preview
    const passiveLevel = $('#ba-statpreview-passiveskill-range').val()
    const passivePlus = (statPreviewWeaponGrade >= 2)
    const passiveSkill = find(student.Skills, 'SkillType', (passivePlus ? 'weapon' : '') + 'passive')[0]
    const passiveBonus = getPassiveSkillBonus(passiveSkill, passiveLevel)
    $('#ba-statpreview-passiveskill-name').text(getTranslatedString(passiveSkill, 'Name'))
    let desc = ""
    $(Object.entries(passiveBonus)).each(function(i, el) {
        let value = el[1]
        if (el[0].includes('_Coefficient')) value /= 10000
        if (value > 0) desc += `${getStatName(el[0])} <b>+${getFormattedStatAmount(value)}</b>, `
        if (value < 0) desc += `${getStatName(el[0])} <b>${getFormattedStatAmount(value)}</b>, `
    })
    $('#ba-statpreview-passiveskill-desc').html(desc.substring(0, desc.length-2))
    $('.statpreview-passive-plus').toggle(passivePlus)
    
    $('#ba-statpreview-status-passive-level .label').html(passiveLevel < 10 ? `Lv.${passiveLevel}` : `<img class="sharp-img" src="images/ui/ImageFont_Max.png" style="height:16px;">`)
}

function updateSummonSourceSkill() {
    if (statPreviewSelectedChar > 0) {
        $('#ba-statpreview-summon').show()
        //update ex skill info in preview
        const summon = student.Summons[statPreviewSelectedChar-1]
        const sourceSkill = find(student.Skills, 'SkillType', summon.SourceSkill)[0]
        const levelMax = summon.SourceSkill == 'ex' ? 5 : 10
        $('#ba-statpreview-summon-range').attr('max', levelMax)
        const level = $('#ba-statpreview-summon-range').val()

        if (level == levelMax) {
            $('#ba-statpreview-summon-level').html(`<img src="images/ui/ImageFont_Max.png">`)
        } else {
            $('#ba-statpreview-summon-level').html("Lv." + level)
        }
       
        $('#ba-statpreview-summon-name').text(getTranslatedString(sourceSkill, 'Name'))
        $('#ba-statpreview-summon-desc').empty()
        $('#ba-statpreview-summon-icon').attr("src", `images/skill/${sourceSkill.Icon}.png`)

        for (let i = 0; i < summon.InheritCasterStat.length; i++) {
            $('#ba-statpreview-summon-desc').append((i == 0 ? "": "\n") + translateUI('summon_inheritance',[`<b>${parseFloat((summon.InheritCasterAmount[i][level-1]/100).toPrecision(3))}%</b>`, getTranslatedString(student, "Name"), getStatName(summon.InheritCasterStat[i])]))
        }
        
    } else {
        $('#ba-statpreview-summon').hide()
    }

}

function populateItemList(tab) {
    let itemsHtml = ""
    let itemCardGenerator
    let placeholderGenerator = function(id) {
        return `<div id="item-select-${id}" data-itemid="${id}" class="selection-grid-card ${gridItemDisplayStyle == 'compact' ? 'compact' : ''} card-items" style="display:none;"></div>`
    }
    switch (gridItemDisplayStyle) {
        case 'detailed':
            itemCardGenerator = getItemGridCardDetailedInnerHTML
            break;
        case 'compact':
            itemCardGenerator = getItemGridCardCompactInnerHTML
            break;
    }

    const itemOffset = getItemIdOffset(tab)
    data[tab].forEach((item) => {
        if (item.IsReleased[regionID]) {
            itemsHtml += placeholderGenerator(item.Id+itemOffset)
        }
    })

    itemsHtml += `<div id="item-select-noresult" class="p-2 grid-text">${translateUI('no_results')}</div>`
    $('#item-search-filters-panel >div >div').hide()
    $(`#item-search-filters-panel >div >div.show-${tab}`).show()

    loadedItemList = tab

    $(`#item-select-grid`).html(itemsHtml)

    updateItemList(true)

    // Scroll the selected item into view automatically
    if (loadedItemType == tab) {
        $(`#item-select-${loadedItem.Id+getItemIdOffset(tab)}`).addClass('selected')
        let offset = $(`#item-select-${loadedItem.Id+getItemIdOffset(tab)}`).prop('offsetTop') - 100
        $('#ba-item-list-container .card-body').scrollTop((offset === undefined) ? 0 : offset)
    }

    // Lazy load the content of each grid item for performance
    if (loadObserver) loadObserver.disconnect()
    loadObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                //console.log(entry.target.id)
                entry.target.innerHTML = itemCardGenerator(parseInt(entry.target.id.replace('item-select-','')))
                if (gridItemDisplayStyle == 'compact') {
                    $(entry.target).children('.card-compact').tooltip({html: true, placement: 'top', delay: { show: 200, hide: 0 }, container: $('.card-body')})
                }
                loadObserver.unobserve(entry.target)
            }
        })
    }, {
        root: $('#ba-item-list-container .card-body')[0]
    })
    $('#item-select-grid div[data-itemid]').each(function(i,el){
        loadObserver.observe(el)
    })

    function getItemGridCardDetailedInnerHTML(linkid) {
        const item = find(data[loadedItemList], 'Id', linkid % 1000000)[0]
        const name = getTranslatedString(item, "Name")
        const smallTextThreshold = getSmallTextThreshold(name, label_craft_smalltext_threshold)
        
        let html = `<div class="card-img ba-item-${item.Rarity.toLowerCase()}"><img loading="lazy" src="images/${loadedItemList}/${item.Icon}.png"></div>`
        if (loadedItemList == 'furniture' && item.Interaction[regionID]) {
            html += '<div class="card-badge furniture-interaction"><img src="images/ui/Cafe_Icon_Interaction.png"></div>'
        }
        if (loadedItemList == 'equipment' && item.Id >= 1000) {
            html += `<div class="card-badge equipment-tier">T${item.Tier}</div>`
        }
        html += `<div class="card-label"><span class="label-text ${name.length > smallTextThreshold ? "smalltext" : "" }">${name}</span></div>`
        return html
    }
    
    function getItemGridCardCompactInnerHTML(linkid) {
        const item = find(data[loadedItemList], 'Id', linkid % 1000000)[0]
        const name = getTranslatedString(item, "Name")
        return `<div class="card-compact ba-item-${item.Rarity.toLowerCase()}" title="${getBasicTooltip(getTranslatedString(item, 'Name'))}"><img loading="lazy" src="images/${loadedItemList}/${item.Icon}.png"></div>`
    }
}

function getItemIdOffset(type) {
    switch (type.toLowerCase()) {
        case 'furniture':
            return 1000000
        case 'equipment':
            return 2000000
        case 'currency':
            return 3000000
        default:
            return 0
    }
}

function populateCraftList() {
    html = ["", "", ""]
    html[0] = ""
    html[1] = ""
    html[2] = ""
    html_h1= `<div id="craft-list-grid-header-1" class="w-100 ba-grid-header mb-2 p-2"><h3 class="mb-0">${getLocalizedString('NodeTier',"1")}</h3></div>`
    html_h2 = `<div id="craft-list-grid-header-2" class="w-100 ba-grid-header my-2 p-2"><h3 class="mb-0">${getLocalizedString('NodeTier',"2")}</h3></div>`
    html_h3 = `<div id="craft-list-grid-header-3" class="w-100 ba-grid-header my-2 p-2"><h3 class="mb-0">${getLocalizedString('NodeTier',"3")}</h3></div>`
    data.crafting.Nodes[regionID].sort((a,b) => a.Quality - b.Quality)
    data.crafting.Nodes[regionID].sort((a,b) => b.Icon.localeCompare(a.Icon))

    const searchTerm = $('#craft-search-text').val()

    $.each(data.crafting.Nodes[regionID], function(i,el) {
        if (el.Weight > 0 && (searchTerm == '' || getTranslatedString(el, "Name").toLowerCase().includes(searchTerm.toLowerCase())))
        html[el.Tier-1] += getCraftingCardHTML(el, el.Weight / data.crafting.TotalWeight[regionID][el.Tier-1])
    })

    $('#craft-select-grid').empty()
    for (let i = 0; i < 3; i++) {
        if (html[i] != "") {
            $('#craft-select-grid').append(`<div id="craft-list-grid-header-${i+1}" class="w-100 ba-grid-header mb-2 p-2"><h3 class="mb-0">${getLocalizedString('NodeTier',i+1)}</h3></div>${html[i]}`)
        }
    }
    if ($('#craft-select-grid').children().length == 0) {
        $('#craft-select-grid').append(`<div id="craft-select-noresult" class="p-2 grid-text">${translateUI('no_results')}</div>`)
    }


    html = ''
    data.crafting.Fusion.forEach(recipe => {
        const itemList = recipe.ResultId >= 1000000 ? 'furniture' : 'items'
        const item = find(data[itemList], 'Id', recipe.ResultId % 1000000)[0]

        if (recipe.Released[regionID] && item.IsReleased[regionID]) {
            const name = getTranslatedString(item, "Name")
            const smallTextThreshold = getSmallTextThreshold(name, label_craft_smalltext_threshold)

            if (searchTerm == '' || name.toLowerCase().includes(searchTerm.toLowerCase())) {
                html += `<div id="craft-select-${recipe.Id+100000}" data-itemid="${recipe.Id+100000}" class="selection-grid-card card-items"><div class="card-img ba-item-${item.Rarity.toLowerCase()}"><img loading="lazy" src="images/${itemList}/${item.Icon}.png"></div><div class="card-label"><span class="label-text ${name.length > smallTextThreshold ? "smalltext" : "" }">${name}</span></div></div>`
            }
        }
    })
    if (html != "") {
        $('#fusion-select-grid').html(html)
    } else {
        $('#fusion-select-grid').html(`<div id="fusion-select-noresult" class="p-2 grid-text">${translateUI('no_results')}</div>`)
    }
    

    $('#craft-select-'+loadedCraftId).addClass('selected')
    let offset = $(`#craft-select-${loadedCraftId}`).prop('offsetTop') - 100
    $('#ba-craft-list-container .card-body').scrollTop((offset === undefined) ? 0 : offset)
}

function getCraftingCardHTML(node, chance = -1) {
    let name = getTranslatedString(node, "Name")
    let smallTextThreshold = label_craft_smalltext_threshold[userLang]
    let html = `<div id="craft-select-${node.Id}" class="selection-grid-card card-craft" onclick="loadCraft(${node.Id})"><div class="card-img ba-node-quality-${node.Quality}"><img loading="lazy" src="images/ui/${node.Icon}.png"></div>`
    if (chance >= 0) {
        html += `<span class="card-badge stage-droprate ${showNodeProbability ? "" : "hidden"}">${getProbabilityText(chance)}</span>`
    }
    html += `<div class="card-label">`
    html += `<span class="label-text ${name.length > smallTextThreshold ? "smalltext" : "" }">${name}</span>`
    html += `</div></div>`
    return html
}

function getSmallTextThreshold(text, thresholdArray) {
    // Check if the name is untranslated and we need to use the full-width threshold
    if ((userLang == 'En' || userLang == 'Th') && (text.codePointAt(0) >= 0x3000 && text.codePointAt(0) <= 0x9FFF)) {
        return thresholdArray['Jp']
    } else {
        return thresholdArray[userLang]
    }
}

function populateStageList(mode) {
    
    let html = '', typePrev = ''
    switch (mode) {
        case 'missions':
            $.each(data.stages.Campaign, function(i,el) {
                if (el.Area <= data.common.regions[regionID].campaign_max)
                html += getStageCardHTML(el)
            })
            $('.stage-list').hide()
            $('#stage-list').show()
            $('#ba-stages-list-tab-missions').tab('show')
            $('#stage-select-grid').html(html)
            break
        case 'bounty':
            $.each(data.stages.WeekDungeon, function(i,el) {
                if (el.Id < 31000) {
                    if (el.Type != typePrev) {
                        let header = `<div id="stages-list-grid-header-${el.Type}" class="ba-grid-header p-2" style="grid-column: 1/-1;order: 0;"><h3 class="mb-0">${getLocalizedString('StageType',''+el.Type)}</h3></div>`
                        html += header
                    }
                    if (el.Stage <= data.common.regions[regionID].bounty_max) html += getStageCardHTML(el)
                    typePrev = el.Type
                }
            })
            $('.stage-list').hide()
            $('#stage-list').show()
            $('#ba-stages-list-tab-bounty').tab('show')
            $('#stage-select-grid').html(html)
            break
        case 'commissions':
            typePrev = ''
            $.each(data.stages.WeekDungeon, function(i,el) {
                if (el.Id >= 31000) {
                    if (el.Type != typePrev) {
                        let header = `<div id="stages-list-grid-header-${el.Type}" class="ba-grid-header p-2" style="grid-column: 1/-1;order: 0;"><h3 class="mb-0">${getLocalizedString('StageType',''+el.Type)}</h3></div>`
                        html += header
                    }
                    if (el.Stage <= data.common.regions[regionID].commission_max) html += getStageCardHTML(el)
                    typePrev = el.Type
                }
            })
            $('.stage-list').hide()
            $('#stage-list').show()
            $('#ba-stages-list-tab-commissions').tab('show')
            $('#stage-select-grid').html(html)
            break
        case 'schooldungeon':
            typePrev = ''
            $.each(data.stages.SchoolDungeon, function(i,el) {
                if (el.Type != typePrev) {
                    html += `<div id="stages-list-grid-header-${el.Type}" class="ba-grid-header p-2" style="grid-column: 1/-1;order: 0;"><h3 class="mb-0">${getLocalizedString('StageType',''+el.Type)}</h3></div>`
                }
                if (el.Stage <= data.common.regions[regionID].schooldungeon_max) html += getStageCardHTML(el)
                typePrev = el.Type
            })
            $('.stage-list').hide()
            $('#stage-list').show()
            $('#ba-stages-list-tab-schooldungeon').tab('show')
            $('#stage-select-grid').html(html)
            break
        case 'events':
            data.common.regions[regionID].events.forEach(val => {
                if (val < 10000) html += getEventCardHTML(val)
            })
            $('.stage-list').hide()
            $('#event-list').show()
            $('#ba-stages-list-tab-events').tab('show')
            $('#event-select-grid').html(html)
    }
    loadedStageList = mode
    $('#stage-select-'+loadedStage.Id).addClass('selected')
    //scroll the loaded stage into view in the stage list (excl. events)
    if (loadedStage.Id < 7000000) {
        let offset = $(`#stage-select-${loadedStage.Id}`).prop('offsetTop') - 100
        $('#ba-stages-list-container .card-body').scrollTop((offset === undefined) ? 0 : offset)
    }
}

function populateEventStageList(eventId) {

    if (loadedModule == 'stages') {
        eventId = eventId % 10000
        let diffPrev = 0
        let eventPrev = 0
        let logoLang
        if (regionID == 0  || !data.common.regions[regionID].events.includes(eventId)) {
            //always use JP logo for Japan server
            logoLang = 'Jp'
        } else {
            if (userLang == 'Cn') {
                logoLang = 'Tw'
            } else {
                logoLang = userLang
            }
        }
        let html = `<div class="ba-grid-header ba-panel p-2 eventlist-header" style="grid-column: 1/-1;order: 0;"><button id="stages-eventlist-back" type="button" class="btn btn-dark me-2" style="min-width:fit-content;" onclick="populateStageList('events')"><i class="fa-solid fa-chevron-left"></i><span class="d-inline ms-2">${getLocalizedString('StageType', 'Event')}</span></button><img class="mx-auto mx-lg-1" src="images/eventlogo/Event_${eventId}_${logoLang}.png"><h4 class="flex-fill text-center px-1 mb-0">${getLocalizedString('EventName',''+eventId)}</h4></div></div>`
    
        if (conquest_events.includes(eventId)) {
            $('.stage-list').hide()
            $('#conquest-list').show()
    
            let conquestMap = find(data.stages.ConquestMap, "EventId", eventId)[0]
            loadedConquest = conquestMap
            $('#ba-conquest-header').html(html)
            $('#ba-conquest-step-n0').tab('show')
            for (let i = 0; i < 4; i++) {
                $(`#ba-conquest-step-n${i}`).text(translateUI('conquest_area',[i+1]))
            }
            changeConquestMap(0, 0)
            
        } else {

            let eventStages = find(data.stages.Event, 'EventId', eventId)
            //Add rerun stages
            if (data.common.regions[regionID].events.includes(eventId + 10000)) {
                eventStages = eventStages.concat(find(data.stages.Event, 'EventId', eventId + 10000))
            }
            eventStages.forEach(stage => {
                if (!(eventId == 701 && ((stage.Difficulty == 1 && stage.Stage > data.common.regions[regionID].event_701_max) || (stage.Difficulty == 2 && stage.Stage > data.common.regions[regionID].event_701_challenge_max)))) {
                    if (stage.Difficulty != diffPrev || stage.EventId != eventPrev) {
                        let name = stage.Difficulty == 1 ? "Quest" : "Challenge"
                        name += stage.EventId > 10000 ? " (Rerun)" : ""
                        let header = `<div class="ba-grid-header p-2" style="grid-column: 1/-1;order: 0;"><h3 class="mb-0">${name}</h3></div>`
                        html += header
                    }
                    html += getStageCardHTML(stage)
                    diffPrev = stage.Difficulty
                    eventPrev = stage.EventId
                }
            })
            
            $('.stage-list').hide()
            $('#stage-list').show()
            $('#stage-select-grid').html(html)
            $('#stage-select-'+loadedStage.Id).addClass('selected')
        }

        loadedStageList = '' + eventId
        $('#ba-stages-list-tab-events').tab('show')
        $('#ba-stages-list-container .card-body').scrollTop(0)
    } else {
        if (conquest_events.includes(eventId)) {
            //need a better way of defining a default here for conquest tiles
            loadModule('stages', find(data.stages.Conquest, 'EventId', eventId % 10000)[0].Id)
        } else {
            loadModule('stages', find(data.stages.Event, 'EventId', eventId % 10000)[0].Id)
        }
    }
}

function populateRaidList() {
    var html = ''

    var html
    html = ''
    $.each(data.raids.Raid, function(i,el) {
        if (el.IsReleased[regionID])
        html += getRaidCardHTML(el)
    })
    $('#raid-select-grid').html(html)

    html = ''
    $.each(data.raids.TimeAttack, function(i,el) {
        if (el.IsReleased[regionID])
        html += getTimeAttackCardHTML(el)
    })
    $('#timeattack-select-grid').html(html)

    html = ''
    $.each(data.raids.WorldRaid, function(i,el) {
        if (el.IsReleased[regionID])
        html += getRaidCardHTML(el, '', el.IconBG)
    })
    $('#worldraid-select-grid').html(html)

}

function getUsedByStudents(item, mode) {
    let html = '', headerText = translateUI('item_usedby'), bondGearStudentsHtml = ''
    if (mode == 'equipment') {
        $.each(data.students, function(i,el){
            if (!el.IsReleased[regionID]) return
            if (el.Equipment[0] == item.Category || el.Equipment[1] == item.Category || el.Equipment[2] == item.Category)
            html += getStudentIconSmall(el)
        })
    } else if (mode == 'furniture') {
        
        headerText = `<img class="inline-img" src="images/ui/Cafe_Icon_Interaction.png"> ${translateUI('furniture_interaction_list')}`
        $.each(data.students, function(i,el){
            if (!el.IsReleased[regionID])
            return
            let uses = false
            for (let i = 0; i < el.FurnitureInteraction[regionID].length; i++) {
                if (item.Id == el.FurnitureInteraction[regionID][i]) {
                    uses = true
                }
            }
            if (uses)
            html += getStudentIconSmall(el)
        })
    } else if (mode == 'items') {
        if (item.Category == 'Material') {
            headerText = translateUI('item_usedby_skill')
            $.each(data.students, function(i,el) {
                if (!el.IsReleased[regionID])
                return
                let uses = false
                for (let i = 0; i < el.SkillExMaterial.length; i++) {
                    for (let j = 0; j < el.SkillExMaterial[i].length; j++) {
                        if (item.Id == el.SkillExMaterial[i][j]) {
                            uses = true
                            break
                        }
                    }
                    if (uses)
                    break
                }
                if (!uses)
                for (let i = 0; i < el.SkillMaterial.length; i++) {
                    for (let j = 0; j < el.SkillMaterial[i].length; j++) {
                        if (item.Id == el.SkillMaterial[i][j]) {
                            uses = true
                            break
                        }
                    }
                    if (uses)
                    break
                }
                if (uses)
                html += getStudentIconSmall(el)

                if ("Released" in el.Gear && el.Gear.Released[regionID]) {
                    el.Gear.TierUpMaterial.forEach(x => {
                        if (x.includes(item.Id)) {
                            bondGearStudentsHtml += getStudentIconSmall(el)
                        }
                    })
                }
            })
        } else if (item.Category == 'SecretStone') {
            headerText = translateUI('item_usedby_eleph')
            let chara = find(data.students, 'Id', item.Id)[0]
            html += getStudentIconSmall(chara)
        }
    }
    if (html != '') {
        $('#ba-item-usage').show()
        html = `<div class="mb-2"><i>${headerText}</i></div><div class="d-flex align-items-center justify-content-center flex-wrap">` + html + '</div>'
        if (bondGearStudentsHtml != "") {
            html += `<div class="mb-2"><i>${translateUI('item_usedby_gear')}</i></div><div class="d-flex align-items-center justify-content-center flex-wrap mb-2">${bondGearStudentsHtml}</div>`
        }
        return html
    } else {
        return ''
    }
    
}

function getEquipmentRecipe(item) {
    let html = '', headerText = translateUI('craft_using')
    if ("Recipe" in item) {
        for (let i = 0; i < item.Recipe.length; i++) {
            html += getDropIconHTML(item.Recipe[i][0]+2000000, item.Recipe[i][1])
        }
        html += getDropIconHTML(3000001, item.RecipeCost)
    }

    if (html != '') {
        $('#ba-equipment-recipe').show()
        return `<div class="mb-2"><i>${headerText}</i></div><div class="d-flex align-items-center justify-content-center flex-wrap">` + html + '</div>'
    } else {
        return ''
    }
    
}

function getLikedByStudents(item) {
    let studentsHtml = ["", ""]
    let likedStudentsHtml =  ""
    let bondGearStudentsHtml = ""

    $.each(data.students, function(i,el){
        if (!el.IsReleased[regionID])
        return
        let allTags = el.FavorItemTags
        allTags.push(el.FavorItemUniqueTags[0])
        allTags.push(el.FavorItemUniqueTags[0] + "2")

        if (item.Rarity == "SSR") {
            const favItems = getFavouriteSSRItems(allTags)
            favItems.forEach((items, grade) => {
                items.forEach((itemId) => {
                    if (item.Id == itemId) {
                        studentsHtml[grade] += getStudentIconSmall(el)
                    } 
                })
                
            })
        } else {
            const favItems = getFavouriteItems(allTags)
            favItems.forEach((items, grade) => {
                items.forEach((itemId) => {
                    if (item.Id == itemId) {
                        studentsHtml[grade] += getStudentIconSmall(el)
                    } 
                })
                
            })
        }

        if ("Released" in el.Gear && el.Gear.Released[regionID]) {
            el.Gear.TierUpMaterial.forEach(x => {
                if (x.includes(item.Id)) {
                    bondGearStudentsHtml += getStudentIconSmall(el)
                }
            })
        }
        
    })
    studentsHtml.forEach((html, ind) => {
        if (html != "") {
            likedStudentsHtml += `<div class="mb-2"><i>${translateUI('item_likedbystudent_list_'+ind, [`<img class="inline-img" src="images/ui/Cafe_Interaction_Gift_0${(item.Rarity == "SSR" ? 4 : 3) - ind}.png">`])}</i></div><div class="d-flex align-items-center justify-content-center flex-wrap mb-2">${studentsHtml[ind]}</div>`
        }
    })

    if (bondGearStudentsHtml != "") {
        likedStudentsHtml += `<div class="mb-2"><i>${translateUI('item_usedby_gear')}</i></div><div class="d-flex align-items-center justify-content-center flex-wrap mb-2">${bondGearStudentsHtml}</div>`
    }

    $('#ba-item-usage').show()
    return likedStudentsHtml
}

function getItemDropStages(itemID) {
    let html = '', stages = []
    $.each([data.stages.Campaign, data.stages.SchoolDungeon, data.stages.WeekDungeon], function(i, stageType) {
        stageType.forEach(dropStage => {
            if (!stageIsReleased(dropStage)) return
            let drop = false, dropChance = 0, isItemBox = false, dropCertainCount = 0

            let rewardList
            if (regionID == 1 && "RewardsGlobal" in dropStage) {
                rewardList = dropStage.RewardsGlobal
            } else {
                rewardList = dropStage.Rewards
            }

            if ("Default" in rewardList)
            for (let i = 0; i < rewardList.Default.length; i++) {

                if (rewardList.Default[i][0] >= 4000000) {
                    // Reward is an Item Box
                    const box = find(data.common.GachaGroup, "Id", rewardList.Default[i][0] - 4000000)[0]

                    // Count the total probability
                    const totalProb = box.ItemList.reduce((pv, cv) => {return pv + cv[1]}, 0)
                    box.ItemList.forEach(boxItem => {
                        if (itemID == boxItem[0]) {
                            drop = true
                            isItemBox = true
                            if (rewardList.Default[i][1] >= 1) {
                                dropCertainCount = rewardList.Default[i][1]
                                dropCertainChance = (boxItem[1]/totalProb)
                            } else {
                                dropChance = rewardList.Default[i][1] * (boxItem[1]/totalProb)
                            }
                        }
                    })

                } else if (itemID == rewardList.Default[i][0]) {
                    drop = true
                    dropChance = rewardList.Default[i][1]
                    break
                }
            }
            if (drop) {
                // Calculate the probability of receiving at least one drop
                if (isItemBox && dropCertainCount > 0) {
                    // Chance of drop from certain boxes
                    let dropChanceA = 1-Math.pow(1-dropCertainChance, dropCertainCount)
                    // Chance of drop from uncertain box
                    let dropChanceB = dropChance
                    // Chance to get at least one drop
                    dropChance = (dropChanceA + dropChanceB - (dropChanceA*dropChanceB))
                }
                stages.push({'chance': dropChance, 'stage': dropStage, 'box': isItemBox})
            }
        })
    })
    stages = stages.sort((a,b) => b.chance - a.chance)
    $.each(stages, function(i,el){
        html += getStageCardHTML(el.stage, el.chance, el.box)
    })
    if (html != '') {
        $('#ba-item-sources').show()
        return `<div class="mb-2"><i>${translateUI('item_obtainedfrom_stage')}</i></div><div class="selection-grid stage selection-grid-flex">` + html + '</div>'
    } else {
        return ''
    }
}

function loadJSON(list, success) {
    let results = {}

    let loadPromise = Object.entries(list).map(function(el){
        return $.getJSON(el[1], function(result) {
            results[el[0]] = result
        })
    })

    return Promise.all(loadPromise).then(function() {
        success(results)
    })
}

function find(obj, key, value) {
    var result = []

    $.each(obj, function(i, el) {
        if (el[key] == value) {
            result.push(el)
        }
    })

    return result
}

function findOrDefault(obj, key, value, default_value) {
    var result = []
    var default_result = []

    $.each(obj, function(i, el) {
        if (el[key] == value) {
            result.push(el)
        }

        if (el[key] == default_value) {
            default_result.push(el)
        }
    })

    if (result.length == 0) {
        return default_result
    } else {
        return result
    }
}

function getAttackTypeText(type) {
    switch (type) {
        case 'Normal':
            return translateUI("attack_type_normal_desc")
        case 'Explosion':
            return translateUI("attack_type_desc", [`<b class='ba-col-explosion'>${getLocalizedString("ArmorType","LightArmor")}</b>`, `<b class='ba-col-mystic'>${getLocalizedString("ArmorType","Unarmed")}</b>`])
        case 'Pierce':
            return translateUI("attack_type_desc", [`<b class='ba-col-pierce'>${getLocalizedString("ArmorType","HeavyArmor")}</b>`, `<b class='ba-col-explosion'>${getLocalizedString("ArmorType","LightArmor")}</b>`]) 
        case 'Mystic':
            return translateUI("attack_type_desc", [`<b class='ba-col-mystic'>${getLocalizedString("ArmorType","Unarmed")}</b>`, `<b class='ba-col-pierce'>${getLocalizedString("ArmorType","HeavyArmor")}</b>`])
    }
    return text
}
function getDefenseTypeText(type) {
    switch (type) {
        case 'Normal':
            return translateUI("defense_type_normal_desc")
        case 'LightArmor':
            return translateUI("defense_type_desc", [`<b class='ba-col-explosion'>${getLocalizedString("BulletType","Explosion")}</b>`, `<b class='ba-col-pierce'>${getLocalizedString("BulletType","Pierce")}</b>`])
        case 'HeavyArmor':
            return translateUI("defense_type_desc", [`<b class='ba-col-pierce'>${getLocalizedString("BulletType","Pierce")}</b>`, `<b class='ba-col-mystic'>${getLocalizedString("BulletType","Mystic")}</b>`])
        case 'Unarmed':
            return translateUI("defense_type_desc", [`<b class='ba-col-mystic'>${getLocalizedString("BulletType","Mystic")}</b>`, `<b class='ba-col-explosion'>${getLocalizedString("BulletType","Explosion")}</b>`]) 
    }
    return text
}

function getSkillText(text, params, level, type, damageDist=[], damageDistParameter=1) {
    
    let result = text
    let regex

    regex = /[0-9.]+(?:%|s|秒|초| วินาที)/g
    result = result.replace(regex, function(match) {return `<strong>${match}</strong>`})

    if (params) {
        for (let i = 1; i <= params.length; i++) {
            while (result.includes(`<?${i}>`)) {
                if (type == "raid") {
                    if ((level == 1 && params[i-1][level-1] != params[i-1][level]) || (level > 1 && params[i-1][level-1] != params[i-1][level-2])) {
                        result = result.replace(`<?${i}>`, `<span class="ba-col-emphasis">${params[i-1][level-1]}</span>`)
                    } else {
                        result = result.replace(`<?${i}>`, params[i-1][level-1].replace(regex, function(match) {return `<strong>${match}</strong>`}))   
                    }
                } else {
                    if (i == damageDistParameter && damageDist.length > 1) {
                        result = result.replace(`<?${i}>`, `<span class="ba-col-${type.toLowerCase()} skill-hitinfo" data-bs-toggle="tooltip" data-bs-placement="top" title="${getBasicTooltip(getSkillHitsText(damageDist, params[i-1][level-1], type.toLowerCase()))}">${params[i-1][level-1]}</span>`)

                    } else {
                        result = result.replace(`<?${i}>`, `<span class="ba-col-${type.toLowerCase()}">${params[i-1][level-1]}</span>`)
                    }
                }
            }
        }
    }

    const buffTypes = ['Buff', 'Debuff', 'CC', 'Special']
    buffTypes.forEach(type => {
        regex = new RegExp(`<${type.slice(0,1).toLowerCase()}:(\\w+)>`, 'g')
        result = result.replace(regex, function(match, capture) {
            const buffName = type + '_' + capture
            return `<span class="ba-skill-${type.toLowerCase()}" data-bs-toggle="tooltip" data-bs-placement="top" title="${getRichTooltip(`images/buff/Combat_Icon_${buffName}.png`, getLocalizedString('BuffNameLong', buffName), getLocalizedString('BuffType', type), null, getLocalizedString('BuffTooltip', buffName), 30)}"><img class=\"ba-buff-icon\" src=\"images/buff/Combat_Icon_${buffName}.png\"><span class="ba-buff-icon-spacer"></span>${getLocalizedString('BuffName', buffName)}</span>`
        })
    })

    return result
}

function getSkillHitsText(damageDist, totalDamage, type) {
    let hits = {}
    let hitsText = ''
    totalDamage = parseFloat(totalDamage.replace('%', ''))
    damageDist.forEach((hit) => {
        hit = parseFloat(((hit / 10000) * totalDamage).toFixed(1)) + '%'
        hits[hit] = hits[hit] ? hits[hit]+1 : 1
    })
    Object.keys(hits).forEach((hit) => {
        hitsText += `${hitsText == '' ? '' : '\n'}<span class='ba-col-${type}'>${hit}</span> <b>&times;${hits[hit]}</b>`
    })
    return translateUI('skill_hits_tooltip', [`<b>${damageDist.length}</b>`]) + `\n<small>${hitsText}</small>`
}

function getNormalAttackHitsText(damageDist, ammoCost, weaponType, attackType) {
    let hits = {}
    let hitsText = ''
    damageDist.forEach((hit) => {
        hit = parseFloat(((hit / 10000) * 100).toFixed(1)) + '%'
        hits[hit] = hits[hit] ? hits[hit]+1 : 1
    })
    Object.keys(hits).forEach((hit) => {
        hitsText += `${hitsText == '' ? '' : '\n'}<span class='ba-col-${attackType}'>${hit}</span> <b>&times;${hits[hit]}</b>`
    })
    let text
    switch (weaponType) {
        case "GL":
        case "RL":
        case "Cannon":
            text = translateUI('stat_ammocount_tooltip_area', [`<b>${ammoCost}</b>`, `<b>${damageDist.length}</b>`])
            break;
        case "RG":
            text = translateUI('stat_ammocount_tooltip_line', [`<b>${ammoCost}</b>`, `<b>${damageDist.length}</b>`])
            break;
    
        default:
            text = translateUI('stat_ammocount_tooltip', [`<b>${ammoCost}</b>`, `<b>${damageDist.length}</b>`])
            break;
    }
    return text + `\n<small>${hitsText}</small>`
}

function getRichTooltip(icon, title, subtitle, rarity, body, imgsize = 50, imgclass = '') {
    var html =  `<span class='ba-tooltip'>`

    html += `<div class='ba-tooltip-header'>`
    if (icon != null) {
        html += `<div class='ba-tooltip-img'><img class='${imgclass}' src='${icon}' width='${imgsize}' height='${imgsize}'></div>`
    }
    html += `<div class='flex-fill d-flex flex-column'><div class='flex-fill d-flex flex-column justify-content-center'><div class='ba-tooltip-title'>${title.replace('-','&#8209;')}</div></div>`
    if (subtitle != null || rarity != null) {
        html += `<div class='d-flex align-items-center mt-auto'>`
        html += subtitle != null ? `<span class='ba-tooltip-subtitle flex-fill'>${subtitle}</span>` : ''
        html += rarity != null ? `<span class='ba-tooltip-rarity text-bold'>${rarity}</span>` : ''
        html += '</div>'
    }

    html += '</div></div>'
    
    if (body != null && body != "") {
        html += `<div class='ba-tooltip-body'>${body.replace( /\"/g, "&quot;")}</div>`
    }
    html += '</span>'
    return html
}

function getBasicTooltip(title) {
    var html =  `<span class='ba-tooltip'>`
    html += `<div class='ba-tooltip-header m-0'>`
    html += `<div class='d-flex justify-content-center w-100'><div class='ba-tooltip-title text-center fs-6'>${title}</div></div>`
    html += '</div>'
    html += '</span>'
    return html
}

function abbreviateNumber(number) {
    var result = number, th = 0, suffix = ['', 'K', 'M', 'B']
    while (result >= 1000) {
        th++
        result /= 1000
    }
    return result + suffix[th]
}

function toggleDarkTheme(theme) {
    darkTheme = theme
    $(`#ba-navbar-themeswitcher button`).removeClass("active")
    $(`#ba-navbar-themeswitcher-${theme}`).addClass("active")
    localStorage.setItem("theme", theme)
    if (theme == 'auto') {
        $('body').toggleClass("theme-dark", window.matchMedia('(prefers-color-scheme: dark)').matches)
    } else {
        $('body').toggleClass("theme-dark", (theme == 'dark'))
    }
    document.querySelector('meta[name="theme-color"]').setAttribute('content', $('body').hasClass('theme-dark') ? '#212529' : '#dee2e6')
}

function toggleHighContrast(state) {
    highContrast = state
    $(`#ba-navbar-contrast-toggle button`).removeClass("active")
    $(`#ba-navbar-contrast-toggle-${highContrast}`).addClass("active")
    localStorage.setItem("high_contrast", highContrast)
    $('body').toggleClass("high-contrast", highContrast)
}

function toggleCustomBuffs(state) {
    enableCustomBuffs = state
    $(`#ba-navbar-custombuffs-toggle button`).removeClass("active")
    $(`#ba-navbar-custombuffs-toggle-${enableCustomBuffs}`).addClass("active")
    localStorage.setItem("enable_custom_buffs", enableCustomBuffs)
    $('#statpreview-buff-custom').toggle(enableCustomBuffs)
}

function changeRegion(regID) {
    if (regID != regionID) {
        $(`#ba-navbar-regionselector-${regionID}`).removeClass("active")
        regionID = regID
        localStorage.setItem("region", regionID)
        $(`#ba-navbar-regionselector-${regionID}`).addClass("active")
        loadModule(loadedModule)        
    }
}

function changeLanguage(lang) {
    if (lang != userLang) {
        json_lang_list = getLanguageJSONList(lang.toLowerCase())
        loadJSON(json_lang_list, result => {
            data = Object.assign(data, result)
        }).then(function(val){
            setSortedDataLists()
            $(`#ba-navbar-languageselector-${userLang.toLowerCase()}`).removeClass("active")
            $('body').removeClass(`font-${userLang.toLowerCase()}`)
    
            userLang = lang
            localStorage.setItem("language", lang)
    
            $(`#ba-navbar-languageselector span`).text($(`#ba-navbar-languageselector-${userLang.toLowerCase()}`).text())
            $(`#ba-navbar-languageselector-${userLang.toLowerCase()}`).addClass("active")
            
            loadModule(loadedModule)
        }, function(reason) {
            console.error(reason)
        })
    }
}

function loadLanguage(lang) {

    // add correct font class
    $('body').addClass(`font-${lang.toLowerCase()}`)

    $('*[data-localize-id]').each(function (i,el) {
        let key = $(el).data('localize-id').split(',')[0], value = $(el).data('localize-id').split(',')[1]
        $(el).html(getLocalizedString(key,value))
    })

    $('*[data-ph-localize-id]').each(function (i,el) {
        let key = $(el).data('ph-localize-id').split(',')[0], value = $(el).data('ph-localize-id').split(',')[1]
        $(el).attr('placeholder', getLocalizedString(key,value))
    })

    $('*[data-tooltip-id]').each(function (i,el) {
        let key = $(el).data('tooltip-id').split(',')[0], value = $(el).data('tooltip-id').split(',')[1]
        $(el).tooltip({title: getBasicTooltip(getLocalizedString(key,value)), placement: 'top', html: true})
    })
}

function getRarityStars(rarity) {
    switch (rarity) {
        case 'N': case 'R': case 1:
            return '\<i class=\'fa-solid fa-star\'\>\</i\>'.repeat(1)
        case 'SR': case 2:
            return '\<i class=\'fa-solid fa-star\'\>\</i\>'.repeat(2)
        case 'SSR': case 3:
            return '\<i class=\'fa-solid fa-star\'\>\</i\>'.repeat(3)
    }
}

function getRarityTier(rarity) {
    return `\<i class=\'fa-solid fa-circle me-2 col-item-${rarity.toLowerCase()}\'\>\</i\>${rarity}`
}

function searchContains(substring, string) {
    if (userLang != 'En') {
        if (string.toLowerCase().includes(substring))
        return true
    } else {
        //decode certain html entities out of the string
        string = string.replace('&#x27;', '').replace('&quot;', '').replace('&amp;', '&')

        let a = string.toLowerCase().replace(/['"!\?<>\(\)\.\-]/g,''), b = substring.toLowerCase().replace(/['"!\?<>\(\)\.\-]/g,'')

        //whole match
        if (a.startsWith(b))
        return true

        //individual word match
        while (a.includes(' ')) {
            a = a.substring(a.indexOf(' ')+1)
            if (a.startsWith(b))
            return true
        }
    }
    return false
}

function allSearch() {
    let searchTerm = $('#ba-navbar-search').val().toLowerCase()
    $('#navbar-search-results').scrollTop(0)
    if (searchTerm == "") {
        $('#navbar-search-results').html('').hide()
        $('#navbar-search').removeClass('has-text')
        $('#ba-navbar-search').removeClass('results-open')
        $('#navbar-search-clear').hide()
        searchResultsCount = 0
        searchResultsSelection = 0
        return true
    }
    $('#navbar-search-clear').show()
    $('#navbar-search').addClass('has-text')
    $('#navbar-search-results').html('').show()
    let results = [], maxResults = 25

    $.each(data.students, function(i,el){
        if (el.IsReleased[regionID] && searchContains(searchTerm, getTranslatedString(el, 'Name'))) {
            results.push({'name': getTranslatedString(el, 'Name'), 'icon': 'images/student/icon/'+el.CollectionTexture+'.png', 'type': translateUI('student'), 'rarity': '', 'rarity_text': getRarityStars(el.StarGrade), 'onclick': `loadStudent('${el.PathName}')`})
            if (results.length >= maxResults) return false
        }
    })

    if (results.length < maxResults)
    $.each(data.raids.Raid, function(i,el){
        if (el.IsReleased[regionID] && searchContains(searchTerm, getTranslatedString(el, 'Name'))) {
            results.push({'name': getTranslatedString(el, 'Name'), 'icon': `images/raid/Boss_Portrait_${el.PathName}_Lobby.png`, 'type': getLocalizedString('StageType', 'Raid'), 'rarity': '', 'rarity_text': '', 'onclick': `loadRaid(${el.Id})`})
            if (results.length >= maxResults) return false
        }
    })

    if (results.length < maxResults)
    $.each(data.raids.WorldRaid, function(i,el){
        if (el.IsReleased[regionID] && searchContains(searchTerm, getTranslatedString(el, 'Name'))) {
            results.push({'name': getTranslatedString(el, 'Name'), 'icon': `images/raid/Boss_Portrait_${el.PathName}_Lobby.png`, 'type': getLocalizedString('StageType', 'WorldRaid'), 'rarity': '', 'rarity_text': '', 'onclick': `loadRaid(${el.Id})`})
            if (results.length >= maxResults) return false
        }
    })

    if (results.length < maxResults)
    $.each(data.items, function(i,el){
        if (el.IsReleased[regionID] && searchContains(searchTerm, getTranslatedString(el, 'Name'))) {
            results.push({'name': getTranslatedString(el, 'Name'), 'icon': 'images/items/'+el.Icon+'.png', 'type': getLocalizedString('ItemCategory', el.Category), 'rarity': el.Rarity, 'rarity_text': getRarityTier(el.Rarity), 'onclick': `loadItem(${el.Id})`})
            if (results.length >= maxResults) return false
        }
    })

    if (results.length < maxResults)
    $.each(data.furniture, function(i,el){
        if (el.IsReleased[regionID] && searchContains(searchTerm, getTranslatedString(el, 'Name'))) {
            results.push({'name': getTranslatedString(el, 'Name'), 'icon': 'images/furniture/'+el.Icon+'.png', 'type': getLocalizedString('ItemCategory', el.Category), 'rarity': el.Rarity, 'rarity_text': getRarityStars(el.Rarity), 'onclick': `loadItem(${el.Id+1000000})`})
            if (results.length >= maxResults) return false
        }
    })

    if (results.length < maxResults)
    $.each(data.equipment, function(i,el){
        if (el.IsReleased[regionID] && searchContains(searchTerm, getTranslatedString(el, 'Name'))) {
            results.push({'name': getTranslatedString(el, 'Name'), 'icon': 'images/equipment/'+el.Icon+'.png', 'type': getLocalizedString('ItemCategory', el.Category), 'rarity': el.Rarity, 'rarity_text': el.Id >= 1000 ? `T${el.Tier}` : getRarityTier(el.Rarity), 'onclick': `loadItem(${el.Id+2000000})`})
            if (results.length >= maxResults) return false
        }
    })

    if (results.length < maxResults)
    $.each(data.crafting.Nodes[regionID], function(i,el){
        if (el.Weight > 0 && searchContains(searchTerm, getTranslatedString(el, 'Name'))) {
            results.push({'name': getTranslatedString(el, 'Name'), 'icon': 'images/ui/'+el.Icon+'.png', 'type': getLocalizedString('NodeTier', el.Tier), 'rarity': `node-${el.Quality}`, 'rarity_text': getLocalizedString('NodeQuality', el.Quality), 'onclick': `loadCraft(${el.Id})`})
            if (results.length >= maxResults) return false
        }
    })

    if (results.length < maxResults)
    $.each(data.stages.Campaign, function(i,el){
        let stagecode = getStageName(el, 'Campaign')
        let stageName = getStageTitle(el, 'Campaign')
        if ((el.Area <= data.common.regions[regionID].campaign_max) && (searchContains(searchTerm, stagecode) || searchContains(searchTerm, stageName))) {
            results.push({'name': stageName, 'icon': 'images/campaign/'+getStageIcon(el,'Campaign')+'.png', 'type': stagecode, 'rarity': '', 'rarity_text': '', 'onclick': `loadStage('${el.Id}')`})
            if (results.length >= maxResults) return false
        }
    })

    if (results.length < maxResults)
    $.each(data.stages.WeekDungeon, function(i,el){
        let stagecode = getStageName(el, 'WeekDungeon')
        let stageName = getStageTitle(el, 'WeekDungeon')
        if ((stageIsReleased(el)) && (searchContains(searchTerm, stagecode) || searchContains(searchTerm, stageName))) {
            results.push({'name': stageName, 'icon': 'images/campaign/'+getStageIcon(el,'WeekDungeon')+'.png', 'type': stagecode, 'rarity': '', 'rarity_text': '', 'onclick': `loadStage('${el.Id}')`})
            if (results.length >= maxResults) return false
        }
    })

    if (results.length < maxResults)
    $.each(data.stages.SchoolDungeon, function(i,el){
        let stagecode = getStageName(el, 'SchoolDungeon')
        let stageName = getStageTitle(el, 'SchoolDungeon')
        if ((stageIsReleased(el)) && (searchContains(searchTerm, stagecode) || searchContains(searchTerm, stageName))) {
            results.push({'name': stageName, 'icon': 'images/campaign/'+getStageIcon(el,'SchoolDungeon')+'.png', 'type': getLocalizedString('StageType', el.Type), 'rarity': '', 'rarity_text': '', 'onclick': `loadStage('${el.Id}')`})
            if (results.length >= maxResults) return false
        }
    })

    if (results.length < maxResults)
    $.each(data.stages.Event, function(i,el){
        let stagecode = getStageName(el, 'Event')
        let searchStageCode = stagecode.replace('\n', ' ')
        let stageName = getStageTitle(el, 'Event')
        if ((data.common.regions[regionID].events.includes(el.EventId)) && (searchContains(searchTerm, searchStageCode) || searchContains(searchTerm, stageName))) {
            results.push({'name': stageName, 'icon': 'images/campaign/'+getStageIcon(el,'Event')+'.png', 'type': stagecode, 'rarity': '', 'rarity_text': '', 'onclick': `loadStage('${el.Id}')`})
            if (results.length >= maxResults) return false
        }
    })

    if (results.length > 0) {
        let html = '<div>'
        for (let i = 0; i < results.length; i++) {
            html += `<div id="ba-search-result-item-${i+1}" class="ba-search-result-item" onclick="${results[i].onclick}; $('#navbar-search-clear').trigger('click');">
            <div class='ba-search-img'><img src='${results[i].icon}' class='ba-item-${results[i].rarity.toLowerCase()}'></div>
            <div class='flex-fill d-flex flex-column' style="min-width:0;"><div class='flex-fill d-flex flex-column justify-content-center'><div class='ba-search-name'>${results[i].name}</div></div>
            <div class='d-flex align-items-center mt-auto'>
            <span class='ba-search-subtitle flex-fill'>${results[i].type}</span>
            <span class='ba-search-rarity'>${results[i].rarity_text}</span></div></div></div>`
        }
        html += '</div>'
        $('#navbar-search-results').html(html)
        $('#ba-navbar-search').addClass('results-open')
        searchResultsCount = results.length
        searchResultsSelection = 0
    } else {
        $('#navbar-search-results').hide()
        $('#ba-navbar-search').removeClass('results-open')
        searchResultsCount = 0
        searchResultsSelection = 0
    }
}

function searchNavigate(ev) {
    switch (ev.code) {
        case 'Enter':
            ev.preventDefault()
            if (ev.type == "keyup") {
                if (searchResultsSelection == 0 && searchResultsCount > 0) {
                    $('#ba-search-result-item-1').trigger("onclick")
                } else {
                    $('#ba-search-result-item-'+searchResultsSelection).trigger("onclick")
                }
            }
            break
        case 'ArrowDown':
            ev.preventDefault()
            if (ev.type == "keydown" && searchResultsSelection < searchResultsCount) {
                searchResultsSelection++
                $('.ba-search-result-item').removeClass("selected")
                $('#ba-search-result-item-'+searchResultsSelection).addClass("selected")
                $(`#ba-search-result-item-${searchResultsSelection}`)[0].scrollIntoView({behavior: 'auto', block: 'nearest'})
            }
            break
        case 'ArrowUp':
            ev.preventDefault()
            if (ev.type == "keydown" && searchResultsSelection > 1)  {
                searchResultsSelection--
                $('.ba-search-result-item').removeClass("selected")
                $('#ba-search-result-item-'+searchResultsSelection).addClass("selected")
                $(`#ba-search-result-item-${searchResultsSelection}`)[0].scrollIntoView({behavior: 'auto', block: 'nearest'})
            }
            break
        case 'Escape':
            ev.preventDefault()
            $('#navbar-search-clear').trigger('click')
            break
    }

}

/**
 * Returns the translated string for the current language from localization.json
 * @param {*} group The localization group
 * @param {*} key The localization value to load
 * @returns 
 */
function getLocalizedString(group, key, replacements=[]) {
    if (data.localization.hasOwnProperty(group) && data.localization[group].hasOwnProperty(key)) {
        return formatString(data.localization[group][key], replacements)
    } else {
        console.log(`Localization not defined for "${group}, ${key}"`)
        return "undefined!!!"
    }
}

/**
 * Shortcut for getLocalizedString('ui', ...)
 */
function translateUI(key, replacements=[]) {
    return getLocalizedString('ui', key, replacements)
}

/**
 * Returns the translated string for the current language. If it is null or empty for the current language, returns the first nonempty translation in the order En, Jp
 * @param {*} obj The object containing the translated strings
 * @param {*} key The key excluding the language suffix e.g. 'Name' to get either 'NameEn' or 'NameJp' based on the current language
 * @returns 
 */
function getTranslatedString(obj, key) {
    if (obj[key]) return (obj[key])
    else if (obj[key+userLang]) return (obj[key+userLang])
    else if (obj[key+'En']) return (obj[key+'En'])
    else if (obj[key+'Jp']) return (obj[key+'Jp'])
    else {
        console.log(`No translations defined for "${obj}.${key}"`)
        return ''
    }
}

function getFavouriteItems(tags) {
    let gifts = [[],[]]
    for (let i = 5000; i < 5000+max_gifts; i++) {
        let commonTags = find(data.items, "Id", i)[0].Tags.filter(x => tags.includes(x))
        if (commonTags.length == 1) {
            gifts[1].push(i)
        } else if (commonTags.length > 1) {
            gifts[0].push(i)
        }  
    }
    return gifts
}

function getFavouriteSSRItems(tags) {
    let gifts = [[],[]]
    for (let i = 5100; i < 5100+max_gifts_ssr; i++) {
        let commonTags = find(data.items, "Id", i)[0].Tags.filter(x => tags.includes(x))
        if (commonTags.length == 1) {
            gifts[1].push(i)
        } else if (commonTags.length > 1) {
            gifts[0].push(i)
        }  
    }
    return gifts
}

function getCacheVerResourceName(res) {
    return res + '?v=' + cache_ver
}

/**
 * Returns an object of stat bonuses granted by a student's passive or weaponpassive skill
 * @param {*} skill the object containing skill data 
 * @param {*} skillLevel 
 * @returns 
 */
function getPassiveSkillBonus(skill, level) {
    let bonuses = {}   
    skill.Parameters.forEach((el, i) => {
        if (el[level-1].includes("%")) {
            bonuses[skill.Stat[i] + '_Coefficient'] = Math.round(parseFloat(el[level-1].replace("%",""))*100)
        } else {
            bonuses[skill.Stat[i] + '_Base'] = Math.round(el[level-1])
        }
        
    })
    if ('StatFixed' in skill) {
        skill.StatFixed.forEach(el => {
            if (el[1].includes("%")) {
                bonuses[el[0] + '_Coefficient'] = Math.round(parseFloat(el[1].replace("%",""))*100)
            } else {
                bonuses[el[0] + '_Base'] = Math.round(el[1])
            }
        })
    }
    return bonuses
}

/**
 * Returns true if the stage has been released in the current region
 */
function stageIsReleased(stage) {
    if (stage.Id > 8000000) {
        return (data.common.regions[regionID].events.includes(stage.EventId))
    } else if (stage.Id > 1000000) {
        return (stage.Area <= data.common.regions[regionID].campaign_max)
    } else if (stage.Id > 60000) {
        return (stage.Stage <= data.common.regions[regionID].schooldungeon_max)
    } else if (stage.Id > 31000) {
        return (stage.Stage <= data.common.regions[regionID].commission_max)
    } else if (stage.Id > 30000) {
        return (stage.Stage <= data.common.regions[regionID].bounty_max)
    } else return false
}

function changeStudentSummon(id, recalculate = true) {

    statPreviewSelectedChar = id

    if (statPreviewViewSupportStats && statPreviewSelectedChar > 0) toggleStrikerBonus()
    if (compareMode) {
        compareMode = false
        updateCompareModeControl()
    }

    $('.summon-list .dropdown-item').removeClass('active')
    $(`.summon-list .dropdown-item[data-summon-id="${id}"]`).addClass('active')
    $('.summon-list .summon-list-active-icon').attr('img')

    if (statPreviewSelectedChar > 0) {
        const summonInfo = find(data.summons, 'Id', student.Summons[id-1].Id)[0]
        const sourceSkill = find(student.Skills, 'SkillType', student.Summons[id-1].SourceSkill)[0]
        $('.summon-list .summon-list-active-name').text(getTranslatedString(summonInfo, "Name"))
        $('.summon-list .summon-list-active-icon').attr('src', `images/skill/${sourceSkill.Icon}.png`).addClass(`bg-skill ${student.BulletType.toLowerCase()}`)
    } else {
        $('.summon-list .summon-list-active-name').html(getTranslatedString(student, "Name"))
        $('.summon-list .summon-list-active-icon').attr('src', `images/student/icon/${student.CollectionTexture}.png`).removeClass("bg-skill explosion pierce mystic")
    }

    updateSummonSourceSkill()
    if (recalculate) recalculateStats()
}

function updateCompareModeControl() {
    $('.comparemode-on').toggle(compareMode)
    $('#ba-student-stat-table').toggleClass('compare', compareMode)
    $('#ba-statpreview-status-compare').toggleClass('deactivated', !compareMode)
    if (compareMode) {
        $('#ba-statpreview-status-title-compare').html(getTranslatedString(studentCompare, "Name"))
        $('#ba-statpreview-status-title-compare-icon').attr('src', `images/student/icon/${studentCompare.CollectionTexture}.png`).removeClass("bg-skill explosion pierce mystic")
        $('#ba-statpreview-status-compare').tooltip('dispose').tooltip({title: getBasicTooltip(translateUI('tooltip_compare_remove')), placement: 'top', html: true})
    } else {
        $('#ba-statpreview-status-compare').tooltip('dispose').tooltip({title: getBasicTooltip(translateUI('tooltip_compare')), placement: 'top', html: true})

    }
}

function openStudentComparison() {
    if (compareMode) {
        compareMode = false
        updateCompareModeControl()
        recalculateStats()
    } else {
        $('#student-select-grid .selection-grid-card.disabled').removeClass('disabled')
        $(`#student-select-${student.Id}`).addClass('disabled')
        selectCompareMode = true
        studentSelectorModal.show()
    }

}

/**
 * Draws the hexamap for a given stage
 * @param {} stage 
 */
function drawHexamap(stage, container) {
    $(container).empty()
    const scale = 90

    let x_min = 99
    let y_min = 99
    let y_max = -99
    let x_max = -99
    let leftOffset = 999999
    let rightOffset = 0
    let topOffset = 50

    stage.HexaMap.forEach(tile => {
        x_min = Math.min(x_min, tile.Pos[0])
        y_min = Math.min(y_min, tile.Pos[1])
        x_max = Math.max(x_max, tile.Pos[0])
        y_max = Math.max(y_max, tile.Pos[1])
    })

    stage.HexaMap.forEach(tile => {
        let xx = tile.Pos[0] - x_min
        let yy = tile.Pos[1] - y_min
        leftOffset = Math.min(leftOffset, xx*scale + (yy*scale*0.5))
        rightOffset = Math.max(rightOffset, scale + xx*scale + (yy*scale*0.5))
    })

    let tilePairs = new Array(stage.HexaMap.length).fill(0)
    let pairCount = 0
    stage.HexaMap.forEach((tile, ind) => {
        let xx = tile.Pos[0] - x_min
        let yy = tile.Pos[1] - y_min

        const x = xx*scale + (yy*scale*0.5) - leftOffset
        const y = yy* Math.sqrt(Math.pow(scale/2, 2)*3) + topOffset
        const spawnTiles = [102101, 902101, 903108]
        let html = ""
        let onclick = ""
        if (tile.Type.startsWith("TileRemoveObject_TargetTile")) {
            if (tilePairs[ind] == 0 && tilePairs[tile.Trigger] == 0) {
                pairCount++
                tilePairs[ind] = pairCount
                tilePairs[tile.Trigger] = pairCount
            }
        }

        if ("Entity" in tile) {
            if (tile.Entity > 100000000) {
                //Enemy Unit Tile
                let unit = find(stage.Formations, "Id", tile.Entity)[0]
                html += `<img class="ba-stage-map-enemy" src="images/enemy/${unit.MapIcon}.png" style="z-index:${yy}">`
                html += `<div class="map-info">`
                onclick = ` onclick="populateMapEnemyList(${tile.Entity});" `

                if (unit.MoveType == "Guard") {
                    html += `<span class="move-type guard"><i class="fa-solid fa-triangle-exclamation"></i></span>`
                } else if (unit.MoveType == "Pursuit") {
                    html += `<span class="move-type pursuit"><i class="fa-solid fa-angles-left"></i></span>`
                }

                let armorType = find(data.enemies, "Id", unit.EnemyList[0])[0].ArmorType
                html += `<span class="def-type bg-def-${armorType.toLowerCase()}"><img src="images/ui/Type_Defense_s.png" style="height:100%;"></span>`

                html += `</div>`

                if (unit.UnitGrade.slice(0,5) == "Grade") {
                    let unitGrade = parseInt(unit.UnitGrade.slice(-1))
                    html += `<span class="unit-grade"><span class="grade">RANK<img src="images/ui/Strategy_Icon_EnemyRank_${unitGrade}.png"></span></span>`
                } else if (unit.UnitGrade == "Boss") {
                    html += `<span class="unit-grade boss"></span>`
                }

            }  else if (tile.Entity > 1000000) {
                //Pyroxene Tile
                let item = find(data.currency, "Id", 4)[0]
                html += `<span class="tile-item" style="z-index:${yy}" title="${getBasicTooltip(getTranslatedString(item, 'Name')+' &times;50')}"><i class="fa-solid fa-gift"></i></span>`

            } else switch (tile.Entity) {
                case 101101:
                    //Start Tile
                    html += `<span class="start-tile"></span>`
                    break
            
                case 102101: case 902101: case 903108:
                    //Spawn Tile
                    html += `<span class="tile-icon" style="z-index:${yy}" title="${getBasicTooltip(translateUI('maptile_spawn'))}"><i class="fa-solid fa-shoe-prints" style="transform:rotate(315deg);"></i></span>`
                    break

                case 103101: case 103102:
                    //Drone Tile
                    html += `<span class="tile-item" style="z-index:${yy}" title="${getBasicTooltip(translateUI('maptile_drone'))}"><i class="fa-solid fa-eye"></i></span>`
                    break

                case 102201: case 903101:
                    //Remove Tile
                    html += `<span class="tile-icon" style="z-index:${yy}" title="${getBasicTooltip(translateUI('maptile_remove'))}"><i class="fa-solid fa-shoe-prints" style="transform:rotate(315deg);font-size: 20px;"></i><i class="fa-solid fa-ban" style="position: absolute;font-size: 38px;"></i></span>`
                    break

                case 104101: case 104102:
                    //2-Way Teleporter Tile
                    html += `<span class="tile-icon group-${tile.Entity-104100}" style="z-index:${yy}" title="${getBasicTooltip(translateUI('maptile_teleport_twoway'))}"><i class="fa-solid fa-up-long"></i><i class="fa-solid fa-down-long"></i></span>`
                    break
      
                case 105101: case 105201:
                    //1-Way Teleporter Out
                    html += `<span class="tile-icon group-${((tile.Entity-105001)/100) +2}" style="z-index:${yy}" title="${getBasicTooltip(translateUI('maptile_teleport_oneway_entrance'))}"><i class="fa-solid fa-up-long"></i></span>`
                    break

                case 105102: case 105202:
                    //1-Way Teleporter In
                    html += `<span class="tile-icon group-${((tile.Entity-105002)/100) +2}" style="z-index:${yy}" title="${getBasicTooltip(translateUI('maptile_teleport_oneway_exit'))}"><i class="fa-solid fa-down-long"></i></span>`
                    break

                case 106101:
                    //Heal Tile
                    html += `<span class="tile-item" style="z-index:${yy}" title="${getBasicTooltip(translateUI('maptile_item_food'))}"><i class="fa-solid fa-bowl-rice"></i></span>`
                    break

                case 107101:
                    //Gun Tile
                    html += `<span class="tile-item" style="z-index:${yy}" title="${getBasicTooltip(translateUI('maptile_item_atk'))}"><i class="fa-solid fa-gun"></i></span>`
                    break

                case 107201:
                    //Armor Tile
                    html += `<span class="tile-item" style="z-index:${yy}" title="${getBasicTooltip(translateUI('maptile_item_def'))}"><i class="fa-solid fa-shield"></i></span>`
                    break
                
                case 109201: case 109202: case 109203:
                    //Switch D -> U
                    html += `<span class="tile-icon lowered group-${tile.Entity-109200}" style="z-index:${yy}" title="${getBasicTooltip(translateUI('maptile_switch_down'))}"><i class="fa-solid fa-chevron-up" style="margin-top: 12px;"></i></span>`
                    break

                case 109204: case 109205: case 109206:
                    //Switch U -> D
                    html += `<span class="tile-icon raised group-${tile.Entity-109200-3}" style="z-index:${yy}" title="${getBasicTooltip(translateUI('maptile_switch_up'))}"><i class="fa-solid fa-chevron-down"></i></span>`
                    break

                case 109301: case 109302: case 109303:
                    //Switch Tile D
                    html += `<span class="tile-icon switch-tile lowered group-${tile.Entity-109300}" style="z-index:${yy}" title="${getBasicTooltip(translateUI('maptile_switch_target_down'))}"></span>`
                    break

                case 109304: case 109305: case 109306:
                    //Switch Tile U
                    html += `<span class="tile-icon switch-tile group-${tile.Entity-109300-3}" style="z-index:${yy}" title="${getBasicTooltip(translateUI('maptile_switch_target_up'))}"></span>`
                    break
            }
        }
        html = `<div class="ba-stage-map-tile map-tile-${ind} ${(tile.Type.startsWith("TileRemoveObject_TargetTile") && spawnTiles.includes(stage.HexaMap[tile.Trigger].Entity)) ? "hidden-tile" : ""} ${(tile.Type.startsWith("DisposableTileObject")) ? "cracked-tile" : ""}" ${onclick} style="left:${x}px;top:${y.toFixed(0)}px;${onclick != '' ? 'cursor:pointer;' : ''}">${html}</div>`
        $(container).css('width', `${rightOffset-leftOffset}px`)
        $(container).css('height', `${topOffset + 10 + scale + (y_max-y_min)*Math.sqrt(Math.pow(scale/2, 2)*3)}px`)
        $(container).append(html)
        $('.tile-icon, .tile-item').tooltip({html: true})
    })

    tilePairs.forEach((val, ind) => {
        $(`.map-tile-${ind}`).addClass(`group-${val}`)
    })
}

function makeDraggable(el) {
    $(el).on('mousedown', e => {
        $(el).toggleClass('scrolling', true)
        scrolling = true
        scrollPosition = {
            left: el.scrollLeft(),
            top: el.scrollTop(),
            x: e.clientX,
            y: e.clientY,
        }
    })
    $(el).on('mouseleave', e => {
        scrolling = false
        $(el).toggleClass('scrolling', false)
    })
    $(el).on('mouseup', e => {
        scrolling = false
        $(el).toggleClass('scrolling', false)
    })
    $(el).on('mousemove', e => {
        e.preventDefault()
        if (scrolling) {
            $(el).scrollLeft(scrollPosition.left - (e.clientX - scrollPosition.x))
            $(el).scrollTop(scrollPosition.top - (e.clientY - scrollPosition.y))
        }
    })
}

function openStageMapModal() {
    drawHexamap(loadedStage, '#ba-stage-modal-map-canvas')
    $('#ba-stage-modal-map .modal-title').text($('#ba-stage-name').text())
    stageMapModal.show()
}

function changeConquestMap(map, step) {
    drawConquestHexamap(loadedConquest, map, step, '#ba-conquest-map-canvas')
}

/**
 * Draws the hexamap for a given conquest map and step
 * @param {} stage 
 */
function drawConquestHexamap(conquest, mapId, step, container) {
    $(container).empty()

    filteredTiles = conquest.Maps[mapId].Tiles.filter(tile => tile.Step == step)

    const scale = 90

    let x_min = 99
    let y_min = 99
    let y_max = -99
    let x_max = -99
    let leftOffset = 999999
    let rightOffset = 0
    let topOffset = 50

    filteredTiles.forEach(tile => {
        x_min = Math.min(x_min, tile.Pos[0])
        y_min = Math.min(y_min, tile.Pos[1])
        x_max = Math.max(x_max, tile.Pos[0])
        y_max = Math.max(y_max, tile.Pos[1])
    })

    filteredTiles.forEach(tile => {
        let xx = tile.Pos[0] - x_min
        let yy = tile.Pos[1] - y_min
        leftOffset = Math.min(leftOffset, xx*scale + (yy*scale*0.5))
        rightOffset = Math.max(rightOffset, scale + xx*scale + (yy*scale*0.5))
    })

    filteredTiles.forEach((tile, ind) => {
        let xx = tile.Pos[0] - x_min
        let yy = tile.Pos[1] - y_min

        const x = xx*scale + (yy*scale*0.5) - leftOffset
        const y = yy* Math.sqrt(Math.pow(scale/2, 2)*3) + topOffset

        let html = ""
        let onclick = ""
        if (tile.Type == "Start") {
            html += `<span class="start-tile"></span>`
        }

        const stages = find(data.stages.Conquest, "Id", tile.Id)
        if (stages.length > 0) {
            //Enemy Unit Tile
            const stage = stages[0]
            const unit = stage.Formations[0]
            html += `<img class="ba-stage-map-enemy" src="images/enemy/${unit.MapIcon}.png" style="z-index:${yy}">`
            html += `<div class="map-info">`
            onclick = ` onclick="loadStage(${stage.Id});" `

            if (stage.Team != 'None') {
                const team = stage.Team.replace('Team','')
                html += `<span class="move-type team-${team}">${team}</span>`
            }

            let armorType = find(data.enemies, "Id", unit.EnemyList[0])[0].ArmorType
            html += `<span class="def-type bg-def-${armorType.toLowerCase()}"><img src="images/ui/Type_Defense_s.png" style="height:100%;"></span>`

            html += `</div>`

            if (stage.EnemyType == "Normal" || stage.EnemyType == "Challenge") {
                html += `<span class="unit-grade"><span class="grade">Lv. ${stage.Level}</span></span>`
            } else if (stage.EnemyType == "Boss") {
                html += `<span class="unit-grade boss"></span>`
            }  else if (stage.EnemyType == "MiddleBoss") {
                html += `<span class="unit-grade leader"></span>`
            }

            
        }
        html = `<div class="ba-stage-map-tile map-tile-${ind} ${(tile.Type.startsWith("TileRemoveObject_TargetTile") && spawnTiles.includes(stage.HexaMap[tile.Trigger].Entity)) ? "hidden-tile" : ""} ${(tile.Type.startsWith("DisposableTileObject")) ? "cracked-tile" : ""}" ${onclick} style="left:${x}px;top:${y.toFixed(0)}px;${onclick != '' ? 'cursor:pointer;' : ''}">${html}</div>`
        $(container).css('width', `${rightOffset-leftOffset}px`)
        $(container).css('height', `${topOffset + 10 + scale + (y_max-y_min)*Math.sqrt(Math.pow(scale/2, 2)*3)}px`)
        $(container).append(html)
        $('.tile-icon, .tile-item').tooltip({html: true})
    })
}

function toggleOwned() {
    //Add/Remove the current student from the collection list
    if (student.Id in studentCollection) {
        delete studentCollection[student.Id]
        $('#ba-student-collection-btn').toggleClass('active', false).html('<i class="fa-solid fa-circle-plus"></i>')
        $('#ba-student-collection-btn').tooltip('dispose').tooltip({title: getBasicTooltip(translateUI('tooltip_collection_add')), placement: 'top', html: true})
    } else {
        studentCollectionSave()
        $('#ba-student-collection-btn').toggleClass('active', true).html('<i class="fa-solid fa-circle-check"></i>')
        $('#ba-student-collection-btn').tooltip('dispose').tooltip({title: getBasicTooltip(translateUI('tooltip_collection_remove')), placement: 'top', html: true})
    }
    if (search_options.filter.Collection.Owned || search_options.filter.Collection.NotOwned) updateStudentList()
    localStorage.setItem('student_collection', JSON.stringify(studentCollection))
    $('#ba-student-search-filter-collection').toggle(Object.keys(studentCollection).length > 0)
}

function studentCollectionSave() {
    studentCollection[student.Id] = {
        s: statPreviewStarGrade,
        l: parseInt($('#ba-statpreview-levelrange').val()),
        e1: parseInt($('#ba-statpreview-gear1-range').val()),
        e2: parseInt($('#ba-statpreview-gear2-range').val()),
        e3: parseInt($('#ba-statpreview-gear3-range').val()),
        ws: statPreviewWeaponGrade,
        wl: parseInt($('#ba-statpreview-weapon-range').val()),
        b: parseInt($('#ba-statpreview-bond-1-range').val()),
        s3: parseInt($('#ba-statpreview-passiveskill-range').val())
    }

    //update alt bond
    for (let i = 2; i <= student_bondalts.length+1; i++) {
        if (student_bondalts[i-2].Id in studentCollection) {
            studentCollection[student_bondalts[i-2].Id].b = parseInt($(`#ba-statpreview-bond-${i}-range`).val())
        }
    }
    
    localStorage.setItem('student_collection', JSON.stringify(studentCollection))
}

function statPreviewSettingsSave() {
    let statPreviewSettings = {
        StarGrade: statPreviewStarGrade,
        WeaponGrade: statPreviewWeaponGrade,
        Level: statPreviewLevel,
        WeaponLevel: statPreviewWeaponLevel,
        Equipment: statPreviewEquipment,
        BondLevel: statPreviewBondLevel,
        BondAltLevel: statPreviewBondAltLevel,
        PassiveLevel: statPreviewPassiveLevel,
        ExLevel: statPreviewExLevel,
        IncludePassive: statPreviewIncludePassive,
        IncludeExGear: statPreviewIncludeExGear,
        IncludeBond: statPreviewIncludeBond,
        IncludeBondAlts: statPreviewIncludeBondAlts,
        IncludeEquipment: statPreviewIncludeEquipment,
        IncludeBuffs: statPreviewIncludeBuffs
    }
    localStorage.setItem('student_settings', JSON.stringify(statPreviewSettings))
}

function statPreviewSettingsLoad() {
    let statPreviewSettings = {}
    if (localStorage.getItem("student_settings")) {
        statPreviewSettings = JSON.parse(localStorage.getItem("student_settings"))
    }
    statPreviewStarGrade = statPreviewSettings.StarGrade ? statPreviewSettings.StarGrade : 3
    statPreviewWeaponGrade = statPreviewSettings.WeaponGrade ? statPreviewSettings.WeaponGrade : 0
    statPreviewLevel = statPreviewSettings.Level ? statPreviewSettings.Level : 1
    statPreviewWeaponLevel = statPreviewSettings.WeaponLevel ? statPreviewSettings.WeaponLevel : 1
    statPreviewEquipment = statPreviewSettings.Equipment ? statPreviewSettings.Equipment : [99, 99, 99]
    statPreviewBondLevel = statPreviewSettings.BondLevel ? statPreviewSettings.BondLevel : 20
    statPreviewBondAltLevel = statPreviewSettings.BondAltLevel ? statPreviewSettings.BondAltLevel : 20
    statPreviewPassiveLevel = statPreviewSettings.PassiveLevel ? statPreviewSettings.PassiveLevel : 10
    statPreviewExLevel = statPreviewSettings.ExLevel ? statPreviewSettings.ExLevel : 5
    statPreviewIncludePassive = statPreviewSettings.IncludePassive ? statPreviewSettings.IncludePassive : false
    statPreviewIncludeExGear = statPreviewSettings.IncludeExGear ? statPreviewSettings.IncludeExGear : false
    statPreviewIncludeBond = statPreviewSettings.IncludeBond ? statPreviewSettings.IncludeBond : false
    statPreviewIncludeBondAlts = statPreviewSettings.IncludeBondAlts ? statPreviewSettings.IncludeBondAlts : false
    statPreviewIncludeEquipment = statPreviewSettings.IncludeEquipment ? statPreviewSettings.IncludeEquipment : false
    statPreviewIncludeBuffs = statPreviewSettings.IncludeBuffs ? statPreviewSettings.IncludeBuffs : false
}

function exportDataString() {
    $('#collection-export-string').val(btoa(JSON.stringify(studentCollection)))
    navigator.clipboard.writeText($('#collection-export-string').val())
    toastMessage(`<i class="fa-solid fa-circle-exclamation me-2"></i>${translateUI('toast_import_copy')}`, 2500, 'alert')
}

function importDataString() {
    try {
        let importData = JSON.parse(atob($('#collection-import-string').val()))
        let collectionNew = {}
        Object.entries(importData).forEach((char) => {
            collectionNew[char[0]] = {
                s: char[1].s,
                l: char[1].l,
                e1: char[1].e1,
                e2: char[1].e2,
                e3: char[1].e3,
                ws: char[1].ws,
                wl: char[1].wl,
                b: char[1].b,
                s3: char[1].s3
            }
        })
        localStorage.setItem('student_collection', JSON.stringify(collectionNew))
        studentCollection = JSON.parse(localStorage.getItem('student_collection'))
        toastMessage(`<i class="fa-solid fa-circle-check me-2"></i>${translateUI('toast_import_success')}`, 2500, 'success')
        if (loadedModule == 'students') {
            loadStudent(student.PathName)
            $('#ba-student-search-filter-collection').toggle(Object.keys(studentCollection).length > 0)
            if (search_options.filter.Collection.Owned || search_options.filter.Collection.NotOwned) updateStudentList()
        }
    } catch (error) {
        console.log(error)
        toastMessage(`<i class="fa-solid fa-circle-xmark me-2"></i>${translateUI('toast_import_failure')}`, 2500, 'failure')
    }
}

function importResourcePlannerData() {
    try {
        $('.tooltip').tooltip('hide')
        let importData = JSON.parse($('#collection-import-string').val())
        let collectionNew = {}
        importData.characters.forEach((char) => {
            collectionNew[char.id] = {
                s: char.current.star,
                l: char.current.level,
                e1: Math.max(char.current.gear1,1),
                e2: Math.max(char.current.gear2,1),
                e3: Math.max(char.current.gear3,1),
                ws: char.current.ue,
                wl: char.current.ue_level,
                b: char.current.bond,
                s3: Math.max(char.current.passive,1)
            }
        })
        localStorage.setItem('student_collection', JSON.stringify(collectionNew))
        studentCollection = JSON.parse(localStorage.getItem('student_collection'))
        toastMessage(`<i class="fa-solid fa-circle-check me-2"></i>${translateUI('toast_import_success')}`, 2500, 'success')
        if (loadedModule == 'students') {
            loadStudent(student.PathName)
            $('#ba-student-search-filter-collection').toggle(Object.keys(studentCollection).length > 0)
            if (search_options.filter.Collection.Owned || search_options.filter.Collection.NotOwned) updateStudentList()
        }
    } catch (error) {
        console.log(error)
        toastMessage(`<i class="fa-solid fa-circle-xmark me-2"></i>${translateUI('toast_import_failure')}`, 2500, 'failure')
    }
    
}

function toastMessage(msg, duration, cssClass) {
    if (toastMessageTimeout) {
        clearTimeout(toastMessageTimeout)
    }
    $('#toast-message').removeClass().addClass('p-2 ba-panel show').addClass(cssClass).html(`<p class="m-0">${msg}</p>`)
    toastMessageTimeout = window.setTimeout(function(){$("#toast-message").removeClass('show')},duration)
}