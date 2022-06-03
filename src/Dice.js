class Side {
  constructor(icon, result, add) {
    this.icon = icon;
    this.result = result;
    this.add = add;
  }
}

const success = new Side('success', 'success', 0);
const successExplode = new Side('successExplode', 'success', 1);
const successAnxiety = new Side('successAnxiety', 'successAnxiety', 0);
const moon = new Side('moon', 'moon', 0);
const moonExplod = new Side('moonExplod', 'moon', 1);
const sliver = new Side('sliver', 'sliver', 0);
const xp = new Side('xp', 'xp', 0);
const armor = new Side('armor', 'armor', 0);
const staminaRegen = new Side('staminaRegen', 'staminaRegen', 0);
const anxietyRegen = new Side('anxietyRegen', 'anxietyRegen', 0);

const dice = {
  'standard': [ successExplode, success, success, success, sliver, moon, xp ],
  'reckless': [ successExplode, successAnxiety, successAnxiety, successAnxiety, sliver, sliver, sliver, sliver, xp ],
  'insight': [ moonExplod, anxietyRegen, staminaRegen, staminaRegen, moon, moon, moon, moon, moon, xp ],
  'defense': [ success, success, armor, armor, successAnxiety, successAnxiety, sliver, sliver, moon, xp ]
};

export default dice;
