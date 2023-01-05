class Side {
  constructor(icon, result, add) {
    this.icon = icon;
    this.result = result || icon;
    this.add = add | 0;
  }
}

const url = new URL(window.location.href);

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

export const dice = url.hash === '#newdice' ? {
  'standard': [ successExplode, success, success, success, sliver, moon, xp ],
  'reckless': [ successExplode, successAnxiety, successAnxiety, successAnxiety, sliver, sliver, sliver, sliver, xp ],
  'insight': [ moonExplod, anxietyRegen, staminaRegen, staminaRegen, moon, moon, moon, moon, moon, xp ],
  'defense': [ success, success, armor, armor, armor, armor, armor, successAnxiety, successAnxiety, sliver, sliver, moon, xp ]
} : {
  'standard': [ successExplode, success, success, success, sliver, moon, xp ],
  'reckless': [ successExplode, successAnxiety, successAnxiety, successAnxiety, sliver, sliver, sliver, sliver, xp ],
  'insight': [ moonExplod, anxietyRegen, staminaRegen, staminaRegen, moon, moon, moon, moon, moon, xp ],
  'defense': [ success, success, armor, armor, successAnxiety, successAnxiety, sliver, sliver, moon, xp ]
};

let idCounter = 1;

export const rollDie = (die, bonus, callback, subsequent) => {
  const roll = (Math.random() * 20) | 0;
  const side = dice[die][roll];

  callback({die, side, bonus, id: idCounter++});

  if( side && side.add )
    rollDie(die, true, subsequent || callback);
};

export const rollDice = (selection) => {
  const result = [];

  Object.keys(dice).forEach(die => {
    for(let i = 0; i < selection[die]; i++)
      rollDie(die, false, r => result.push(r));
  });

  return result;
}

export const rerollDice = (roll, picked) => {
  const result = [...roll];

  result.forEach(({die, id}, i) => {
    if(picked.includes(id))
      rollDie(die, false, r => result[i] = r, r => result.push(r));
  });

  return result;
}
