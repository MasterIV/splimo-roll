class Side {
  constructor(icon, result, add) {
    this.icon = icon;
    this.result = result || icon;
    this.add = add | 0;
  }
}

const success = new Side('success');
const successExplode = new Side('successExplode', 'success', 1);
const successAnxiety = new Side('successAnxiety');
const moon = new Side('moon');
const moonExplod = new Side('moonExplode', 'moon', 1);
const sliver = new Side('sliver');
const xp = new Side('xp');
const armor = new Side('armor');
const staminaRegen = new Side('staminaRegen');
const anxietyRegen = new Side('anxietyRegen');

const dice = {
  'standard': [ successExplode, success, success, success, sliver, moon, xp ],
  'reckless': [ successExplode, successAnxiety, successAnxiety, successAnxiety, sliver, sliver, sliver, sliver, xp ],
  'insight': [ moonExplod, anxietyRegen, staminaRegen, staminaRegen, moon, moon, moon, moon, moon, xp ],
  'defense': [ success, success, armor, armor, successAnxiety, successAnxiety, sliver, sliver, moon, xp ]
};

export default dice;
