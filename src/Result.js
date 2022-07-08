import React from 'react';

const Die = ({id, die, side, bonus, selected, onSelect}) => {
  let classes = "dice";

  if(bonus) classes += " bonus";
  if(selected) classes += " selected";

  return <div className={classes} onClick={() => onSelect(id)}>
    <img src={"img/d20_"+die+".png"} />
    {side && <div className="symbol"><img src={"img/symbol_"+side.icon+".png"} alt={side.icon} /></div>}
  </div>;
};

const Result = ({result, onSelect, message}) => {
  return <div className="dices result">
      {message && <div className="message">{message}</div>}
      {result.map((result, i) => <Die {...result} key={result.id} onSelect={onSelect} />)}
    </div>;
}

export default Result;
