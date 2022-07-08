import React from 'react';
import { Btn } from './common';


const DieSelector = ({type, value, onChange}) => {
  const inc = () => onChange(type, value + 1);
  const dec = () => onChange(type, value - 1);
  const set = e => onChange(type, e.target.value);

  return <div className="dice">
      <Btn onClick={inc}>+</Btn>
      <img src={"img/d20_"+type+".png"} />
      <Btn onClick={dec}>-</Btn>
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
