import React, { useEffect } from 'react';
import io from 'socket.io-client';

const AlertComponent = () => {
  useEffect(() => {
    const socket = io('http://localhost:5000');

    socket.on('alertCreated', (data) => {
      console.log('New Alert:', data.message);
      alert(data.message);
    });

    return () => {
      socket.off('alertCreated');
    };
  }, []);

  return (
    <div>
      
    </div>
  );
};

export default AlertComponent;
