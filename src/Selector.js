import React from 'react';

const DieSelector = ({type, value, onChange}) => {
  const inc = () => onChange(type, value + 1);
  const dec = () => onChange(type, value - 1);
  const set = e => onChange(type, e.target.value);

  return <div className="dice">
      <button type="button" onClick={inc}>+</button>
      <img src={"img/d20_"+type+".png"} />
      <button type="button" onClick={dec}>-</button>
      <input type="text" value={value} onChange={set} />
    </div>;
}

const Selector = ({selection, onChange}) => {
  return <div className="dices">
      {Object.keys(selection).map(die => <DieSelector
        type={die}
        key={die}
        value={selection[die]}
        onChange={onChange} />)}
    </div>;
}

export default Selector;
