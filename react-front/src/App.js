import './App.css';
import { useState } from 'react';
import styles from './Display.module.css'
import Home from './Home';
import login from './Api/login';
import getAllReccomended from './Api/getReccomended';
import topics from './data/topics';

/* global google */


function App() {

  let api_key = process.env.REACT_APP_api_key

  const [subs, setSubs] = useState(null)
  const [channel, setChannel] = useState(null)
  const [reccomended, setReccomendeded] = useState(null)
  const [hovered, setHovered] = useState({ hovering: false })

  return (
    <div className={styles.container}>
      <button onClick={() => console.log(subs, reccomended, hovered)}>print subs</button>
      {!subs ? <div><div onClick={() => { login(setSubs, topics, api_key, setChannel) }}>hello</div></div>
        : <Home subs={subs} hovered={hovered} setHovered={setHovered} topics={topics} channel={channel} />}
    </div >
  );
}

export default App;
