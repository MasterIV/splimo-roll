import React, { useContext, useEffect } from 'react';
import { SocketContext } from './context/SocketContext';


export const Connect = (props) => {
  const { socket: socketConnection, connectToRoom, roomConfig } = useContext(SocketContext);

  const handleConnectClick = () => {
    if (!roomConfig.room || window.confirm('Connect to new room?')) {
      const nameFromInput = roomConfig.name || window.prompt('Player Name');
      const roomFromInput = window.prompt('Room (leave empty for new)') || (Math.random() + 1).toString(36).substring(6);

      connectToRoom(nameFromInput, roomFromInput);
    }
  };

  useEffect(() => {
    socketConnection.on('roll', data => {
      if (data.type === 'reroll') {
        props.onChange(`${data.name} has re-rolled some dice:`, data.roll);
      } else {
        props.onChange(`${data.name} has rolled:`, data.roll);
      }
    });

    return () => {
      socketConnection.off('roll');
    };
  }, [socketConnection, roomConfig]);

  return (
    <button onClick={handleConnectClick} className="connect">
      {roomConfig.room ? `${roomConfig.name} in ${roomConfig.room}` : 'Join Room'}
    </button>
  );
};

