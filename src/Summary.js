const Icon = ({symbol, value}) => {
  return <div>
      <div className="symbol"><img src={"img/symbol_"+symbol+".png"} alt={symbol} /></div>
      <span>{value}</span>
    </div>;
};

const Summary = ({summary}) => {
  return <div className="summary">
      {Object.keys(summary).map(symbol => <Icon symbol={symbol} value={summary[symbol]} />)}
    </div>;
}

export default Summary;
