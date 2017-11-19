import React from 'react';
import { Connector } from 'mqtt-react';
import App from './Main.js';
 
export default () => (
  <Connector mqttProps="ws://192.168.5.55:1884/">
    <App />
  </Connector>
);