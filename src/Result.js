const Die = ({type, symbol, bonus}) => {
  return <div className={bonus ? "dice bonus"  : "dice"}>
    <img src={"img/d20_"+type+".png"} />
    {symbol && <div className="symbol"><img src={"img/symbol_"+symbol+".png"} alt={symbol} /></div>}
  </div>;
};

const Result = ({result}) => {
  return <div className="dices">
      {result.map(({die, side, bonus}, i) => <Die key={i} type={die} symbol={side && side.icon} bonus={bonus} />)}
    </div>;
}

export default Result;
