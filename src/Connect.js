import React from 'react';

import { io } from "socket.io-client";

export const connection = {
  join(name, callback, room) {
    if(!room)
      room = (Math.random() + 1).toString(36).substring(6);

    this.socket = io();
    this.socket.emit('join', {name, room});

    this.socket.on('roll', ({name, roll, type}) => {
      if(type === 'reroll') {
        callback(`${name} has re-rolled some dice:`, roll);
      } else {
        callback(`${name} has rolled:`, roll);
      }
    })

    return room;
  },

  emit(type, result) {
    if(this.socket)
      this.socket.emit(type, result);
  },
};

export class Connect extends React.Component {
    constructor(props) {
      super(props);
      this.state = {room: null};
    }

    connect() {
      if(!this.state.room || window.confirm("Connect to new room?")) {
        const name = window.prompt("Name");
        const room = window.prompt("Room (leave empty for new)");
        this.setState({room: connection.join(name, this.props.onChange, room)});
      }
    }

    render() {
      return <button onClick={this.connect.bind(this)} className="connect">
        {this.state.room ? "Room " + this.state.room : "Connect"}
      </button>;
    }
};
