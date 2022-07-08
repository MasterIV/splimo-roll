import React from 'react';

import {connection, Connect} from './Connect';
import {rollDice, rerollDice} from './Dice';
import DiceArea from './DiceArea';


export default class App extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        message: null,
        result: []
      };
    }

    roll(selection) {
      const result = rollDice(selection)
      connection.emit('roll', result);
      this.setState({result});
    }

    reroll(picked) {
      const result = rerollDice(this.state.result, picked);
      connection.emit('reroll', result);
      this.setState({result});
    }

    set(message, result) {
      this.setState({message, result});
    }

    render() {
        const landscape = window.innerWidth > 1200;

        return <React.Fragment>
          <Connect onChange={(message, result) => this.setState({message, result})} />
          <DiceArea {...this.state}
            onRoll={this.roll.bind(this)}
            onReroll={this.reroll.bind(this)}
            landscape={landscape} />
          </React.Fragment>
    }
}
