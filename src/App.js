import React from 'react';
import Selector from './Selector';
import Result from './Result';
import Summary from './Summary';
import dice from './Dice';

export default class App extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        selection: Object.fromEntries(Object.keys(dice).map(e => [e, 0])),
        result: [],
        summary: {}
      };
    }

    roll() {
      const result = [];
      const summary = {};

      const rollDie = (die, bonus) => {
        const roll = (Math.random() * 20) | 0;
        const side = dice[die][roll];

        result.push({die, side, bonus});

        if( side ) {
          summary[side.result] = ( summary[side.result] | 0) + 1;
          if( side.add ) rollDie(die, true);
        }
      };

      Object.keys(dice).forEach(die => {
        for(let i = 0; i < this.state.selection[die]; i++)
          rollDie(die);
      });

      this.setState({result, summary});
    }

    reset() {
      this.setState({selection: Object.fromEntries(Object.keys(dice).map(e => [e, 0])), result: [], summary: {}});
    }

    change(type, value) {
      this.setState({selection: {...this.state.selection, [type]: Math.max(0, value | 0)}});
    }

    render() {
        const total = Object.values(this.state.selection).reduce((a, b) => a+b);

        return <div className="App">

            <Selector selection={this.state.selection} onChange={this.change.bind(this)} />

            <div className="submit">
              <button id="roll" className="button" onClick={this.roll.bind(this)}>Roll {total} dice!</button>
              <button id="reset" className="button" onClick={this.reset.bind(this)}>Reset</button>
            </div>

            <Summary summary={this.state.summary} />

            <Result result={this.state.result} />
          </div>;
    }
}
