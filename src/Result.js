const Die = ({die, side, bonus, selected, index, onSelect}) => {
  let classes = "dice";

  if(bonus) classes += " bonus";
  if(selected) classes += " selected";

  return <div className={classes} onClick={() => onSelect(index)}>
    <img src={"img/d20_"+die+".png"} />
    {side && <div className="symbol"><img src={"img/symbol_"+side.icon+".png"} alt={side.icon} /></div>}
  </div>;
};

const Result = ({result, onSelect}) => {
  return <div className="dices result">
      {result.map((result, i) => <Die {...result} key={result.id} index={i} onSelect={onSelect} />)}
    </div>;
}

export default Result;
