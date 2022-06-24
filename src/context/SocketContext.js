import React, { useEffect, useState } from 'react';
import socketIo from 'socket.io-client';

export let socket = undefined;

export const SocketContext = React.createContext({
  socket: {},
  roomConfig: {}
});

export const SocketContextProvider = (props) => {
  const [isConnected, setIsConnected] = useState(false);
  const [roomConfig, setRoomConfig] = useState({});

  useEffect(() => {
    socket = socketIo.connect();

    socket.on('connect', () => {
      const engine = socket.io.engine;

      engine.on('close', () => {
        setIsConnected(false);

        // re-connect on closed connection
        socket.io.connect();
      });

      if (roomConfig.room) {
        socket.emit('join', roomConfig);
      }

      setIsConnected(true);
    });

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [roomConfig]);

  if (!isConnected) {
    return 'Connecting...';
  }

  const connectToRoom = (userName, roomName) => {
    setRoomConfig({
      name: userName,
      room: roomName
    });
  };

  return <SocketContext.Provider {...props} value={{ socket, connectToRoom, roomConfig }} />;
};
