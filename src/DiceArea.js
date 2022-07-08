import React from 'react';

import Selector from './Selector';
import Result from './Result';
import Summary from './Summary';
import {dice} from './Dice';
import {Btn} from './common';

const Buttons = ({total, onRoll, onReset}) => <div className="submit">
  <Btn id="roll" onClick={onRoll}>Roll {total} dice!</Btn>
  <Btn id="reset" onClick={onReset}>Reset</Btn>
</div>;

const Reroll = ({picked, onReroll}) => picked > 0 && <div className="submit">
  <Btn id="re-roll" onClick={onReroll}>Re-Roll selected {picked} dice!</Btn>
</div>;

export default class DiceArea extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        picked: [],
        selection: Object.fromEntries(Object.keys(dice).map(e => [e, 0])),
      };
    }

    reroll() {
      this.setState({picked: []});
      this.props.onReroll(this.state.picked);
    }

    reset() {
      this.setState({selection: Object.fromEntries(Object.keys(dice).map(e => [e, 0])), picked: []});
    }

    change(type, value) {
      this.setState({selection: {...this.state.selection, [type]: Math.max(0, value | 0)}});
    }

    pick(id) {
      const {picked} = this.state;
      this.setState({picked: picked.includes(id) ? picked.filter(p => p !== id) : [...picked, id]})
    }

    render() {
        const {selection, picked} = this.state;
        const {message, onRoll, onReroll} = this.props;
        const result = this.props.result.map(r => ({...r, selected: picked.includes(r.id)}));

        const total = Object.values(selection).reduce((a, b) => a+b, 0);

        if( this.props.landscape ) {
          return <React.Fragment>
              <div className="row">
                  <Selector selection={selection} onChange={this.change.bind(this)} />
                  <Summary result={result} />
              </div>

              <Buttons onRoll={() => onRoll(selection)} onReset={this.reset.bind(this)} total={total} />
              <Result result={result} onSelect={this.pick.bind(this)} message={message} />
              <Reroll onReroll={this.reroll.bind(this)} picked={picked.length} />
            </React.Fragment>;
        }

        return <React.Fragment>
            <Selector selection={selection} onChange={this.change.bind(this)} />
            <Buttons onRoll={() => onRoll(selection)} onReset={this.reset.bind(this)} total={total} />
            <Summary result={result} />
            <Result result={result} onSelect={this.pick.bind(this)} message={message} />
            <Reroll onReroll={this.reroll.bind(this)} picked={picked.length} />
          </React.Fragment>;
    }
}
