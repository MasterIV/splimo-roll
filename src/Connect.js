import React from 'react';

import { io } from "socket.io-client";

export const connection = {
  init(statusCallback, rollCallback) {
    this.socket = io();

    this.socket.on('close', () => {
      statusCallback('Connection Closed...');
    });

    this.socket.on('disconnect', () => {
      statusCallback('Disconnected...');
    });

    this.socket.on('connect', () => {
      this.socket.emit('join', { name: this.name, room: this.room });
      statusCallback(`Connected to ${this.room} as ${this.name}`);
    });

    this.socket.on('roll', ({ name, roll, type }) => {
      if (type === 'reroll') {
        rollCallback(`${name} has re-rolled some dice:`, roll);
      } else {
        rollCallback(`${name} has rolled:`, roll);
      }
    })
  },

  join(statusCallback, rollCallback) {
    this.room = window.prompt("Room (leave empty for new)") || (Math.random() + 1).toString(36).substring(6);
    this.name = this.name || window.prompt("Player Name");

    if (!this.socket) {
      this.init(statusCallback, rollCallback);
    } else {
      this.socket.emit('join', { name: this.name, room: this.room });
      statusCallback(`Connected to ${this.room} as ${this.name}`);
    }
  },

  emit(type, roll) {
    if (this.socket)
      this.socket.emit('roll', { type, roll });
  },
};

export class Connect extends React.Component {
  constructor(props) {
    super(props);
    this.state = { label: "Connect" };
  }

  connect() {
    if (this.state.label !== "Connect") {
      connection.join(label => this.setState({ label }), this.props.onChange);
    }
  }

  render() {
    return <button onClick={this.connect.bind(this)} className="connect">
      {this.state.label}
    </button>;
  }
};
