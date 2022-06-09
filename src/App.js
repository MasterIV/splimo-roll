import React from 'react';
import Selector from './Selector';
import Result from './Result';
import Summary from './Summary';
import dice from './Dice';

let id = 1;

const rollDie = (die, bonus, callback) => {
  const roll = (Math.random() * 20) | 0;
  const side = dice[die][roll];

  callback({die, side, bonus, id: id++});

  if( side && side.add ) rollDie(die, true, callback);
};

const Buttons = ({total, onRoll, onReset}) => <div className="submit">
  <button id="roll" className="button" onClick={onRoll}>Roll {total} dice!</button>
  <button id="reset" className="button" onClick={onReset}>Reset</button>
</div>;

const Reroll = ({picked, onReroll}) => picked > 0 && <div className="submit">
  <button id="re-roll" className="button" onClick={onReroll}>Re-Roll selected {picked} dice!</button>
</div>;

export default class App extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        selection: Object.fromEntries(Object.keys(dice).map(e => [e, 0])),
        result: []
      };
    }

    roll() {
      const result = [];

      Object.keys(dice).forEach(die => {
        for(let i = 0; i < this.state.selection[die]; i++)
          rollDie(die, false, r => result.push(r));
      });

      this.setState({result});
    }

    reset() {
      this.setState({selection: Object.fromEntries(Object.keys(dice).map(e => [e, 0])), result: []});
    }

    change(type, value) {
      this.setState({selection: {...this.state.selection, [type]: Math.max(0, value | 0)}});
    }

    pick(i) {
      if(!this.state.result[i]) return;
      const result = [...this.state.result];
      result[i].selected = !result[i].selected;
      this.setState({result});
    }

    reroll() {
      const result = [...this.state.result];

      result.forEach(({die, selected}, i) => {
        if(selected) {
          const roll = (Math.random() * 20) | 0;
          const side = dice[die][roll];

          result[i] = {die, side, bonus: false, id: id++};
          if( side && side.add ) rollDie(die, true, r => result.push(r));
        }
      });

      this.setState({result});
    }

    render() {
        const {result, selection} = this.state;
        const total = Object.values(selection).reduce((a, b) => a+b, 0);
        const picked = result.map(r => r.selected|0).reduce((a, b) => a+b, 0);

        if( window.innerWidth > 1200 ) {
          return <div className="App">
              <div class="row">
                  <Selector selection={selection} onChange={this.change.bind(this)} />
                  <Summary result={result} />
              </div>

              <Buttons onRoll={this.roll.bind(this)} onReset={this.reset.bind(this)} total={total} />
              <Result result={result} onSelect={this.pick.bind(this)} />
              <Reroll onReroll={this.reroll.bind(this)} picked={picked} />
            </div>;
        }

        return <div className="App">
            <Selector selection={selection} onChange={this.change.bind(this)} />
            <Buttons onRoll={this.roll.bind(this)} onReset={this.reset.bind(this)} total={total} />
            <Summary result={result} />
            <Result result={result} onSelect={this.pick.bind(this)} />
            <Reroll onReroll={this.reroll.bind(this)} picked={picked} />
          </div>;
    }
}
