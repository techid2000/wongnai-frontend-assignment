import React, {useRef, useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';

import {GlobalStyle} from './styles/Styled.js';

import CSVFileInput from './components/CSVFileInput';

function App() {
  const [bundle, setBundle] = useState({});
  useEffect(() => {
    console.log(bundle);
  },[bundle])
  return (
    <div className="app">
      <GlobalStyle/>
      <h1>Mailer</h1>
      <CSVFileInput
        buttonMsg="เลือกไฟล์ข้อมูล E-mail"
        onReadData={(obj) => setBundle(bundle => ({...bundle, emails:obj}))}
      />
      <CSVFileInput
        buttonMsg="เลือกไฟล์ข้อมูล Rank"
        onReadData={(obj) => setBundle(bundle => ({...bundle, ranks: obj}))}
      />
      <ColoredLine/>
      {
        bundle['emails'] && bundle['emails'].map(x => <li>{x['user_name']}</li>)
      }
    </div>
  );
}

const ColoredLine = ({ color }) => (
  <hr
      style={{
          color: color,
          backgroundColor: color,
          height: 5
      }}
  />
);

export default App;
