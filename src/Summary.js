function summarize(result) {
  const summary = {};

  result.filter(r => r.side).forEach(({side}) => {
      summary[side.result] = ( summary[side.result] | 0) + 1;
  });

  return summary;
}

const Icon = ({symbol, value}) => {
  return <div>
      <div className="symbol"><img src={"img/symbol_"+symbol+".png"} alt={symbol} /></div>
      <span>{value}</span>
    </div>;
};

const Summary = ({result}) => {
  const summary = summarize(result);

  return <div className="summary">
      {Object.keys(summary).map(symbol => <Icon symbol={symbol} value={summary[symbol]} />)}
    </div>;
}

export default Summary;
