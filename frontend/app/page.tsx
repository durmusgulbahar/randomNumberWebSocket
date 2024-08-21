'use client'
import { useEffect, useState } from 'react';
import styles from "./page.module.css"
const RandomNumberPage = () => {
  const [randomNumber, setRandomNumber] = useState<number | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<string>('Connecting...');
  const [clientCount, setClientCount] = useState<number | null>(null);
  useEffect(() => {
    // Create a new WebSocket connection
    const ws = new WebSocket('wss://ws-server.durmusgulbahar.dev');

    // Event listener for successful connection
    ws.onopen = () => {
      setConnectionStatus('Connected');
      console.log('Connected to WebSocket server');
    };

    // Event listener for incoming messages
    ws.onmessage = (event) => {
      setRandomNumber(Number(event.data));
    };

    // Event listener for connection close
    ws.onclose = () => {
      setConnectionStatus('Disconnected');
      console.log('Disconnected from WebSocket server');
    };

    // Cleanup on component unmount
    return () => {
      ws.close();
    };
  }, []);

  return (
    <main>
      <h1>WebSocket Random Number</h1>
      <p>from -2,147,483,648 to 2,147,483,647</p>
      <p><b>Status</b>: {connectionStatus}</p>
      <div className={styles.numberContainer}>{randomNumber !== null ? randomNumber : 'Waiting for number...'}</div>
    </main>
  );
};

export default RandomNumberPage;
