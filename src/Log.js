import React from 'react';
import { Connect } from './Connect';
import { SocketContextProvider } from './context/SocketContext';

import Result from './Result';
import Summary from './Summary';

let id = 1;

const Roll = ({message, result}) => {
    return <div className='log'>
        <Summary result={result} />
        <Result result={result} message={message} />
    </div>;
};

export default class Log extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        rolls: []
      };
    }

    add(message, result) {
        const rolls = [{id: id++, message, result}, ...this.state.rolls];
        console.log('roll received', rolls);
        this.setState({rolls});
    }

    render() {
        const {rolls} = this.state;

        return <div className="App">
          <SocketContextProvider>
            <Connect onChange={this.add.bind(this)} />
            {rolls.map(r => <Roll {...r} key={r.id} />)}
          </SocketContextProvider>
        </div>;
      }
}
