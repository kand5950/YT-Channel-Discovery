import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import axios from 'axios';

/* global google */

function App() {
  const [auth, setAuth] = useState(null)
  const [subs, setSubs] = useState(null)
  const [test, setTest] = useState(0)

  const handleCallbackResponse = (response) => {
    setAuth(response.access_token)
  }

  let client = google.accounts.oauth2.initTokenClient({
    scope: 'https://www.googleapis.com/auth/youtube.readonly',
    client_id: '502719142670-nmd9g7usol96fs03av7aq7el692ov8is.apps.googleusercontent.com',
    ux_mode: 'popup',
    callback: handleCallbackResponse,
  })
  const doAuth = () => {
    const getCode = () => {
      client.requestAccessToken()
    }
    getCode()
  }
  const getSubscriptions = () => {
    axios.get(`https://youtube.googleapis.com/youtube/v3/subscriptions?part=snippet&mine=true&maxResults=200&access_token=${auth}`)
      .then((data) => {
        console.log(data.data)
        setSubs(data.data)
      }).catch((error) => {
        console.log(error)
      })
  }
  const testGetSUBS = () => {

    const channelIds = subs.items.map((item) => {
      return item.snippet.resourceId.channelId
    }).map(item => {
      return axios.get(`https://youtube.googleapis.com/youtube/v3/channelSections?part=snippet%2CcontentDetails&channelId=${item}&key=AIzaSyCeiswJk0KAIrpF6mgJjYKAb0lH_wF9eR0`)
    })

    Promise.all(channelIds).then((all) => {
      let addedChannels = [...subs.items]
      let x = 0
      for (let i = 0; i < all.length; i++) {
        let channels = all[i].data.items.find((item => item.contentDetails?.channels))?.contentDetails?.channels
        if (channels) {
          // addedChannels.findIndex((ind) => ind.snippet.resourceId.channelId === all[i].data.items)
          const oldEntry = { ...addedChannels[x] }
          addedChannels.splice(x, 1)
          Promise.all(channels.map((item) => {
            return axios.get(`https://youtube.googleapis.com/youtube/v3/channels?part=snippet&id=${item}&key=AIzaSyCeiswJk0KAIrpF6mgJjYKAb0lH_wF9eR0`)
          })).then((reccomendedChannels) => {
            reccomendedChannels = reccomendedChannels.map((item) => {
              return item.data.items[0]
            })
            addedChannels.push({ ...oldEntry, channels: reccomendedChannels })
          })
        } else {
          x++
        }
      }
      setSubs(prev => ({ ...prev, items: addedChannels }))
    })
  }


  return (
    <div className="App">
      hello
      <div>
        <button onClick={doAuth}>AUTH</button>
        <button onClick={getSubscriptions}>SUBS</button>
        <button onClick={testGetSUBS}>TEST</button>
        <button onClick={() => console.log(subs)}>print subs</button>
      </div>

      <div>
        <ul>
          {subs && subs.items.map((item) => {
            return (
              <li key={item.id}><h2>
                {item.snippet.title}
              </h2>
                {item.channels && item.channels.map((item) => (
                  <p key={item.id}><img src={item.snippet.thumbnails.default.url} alt='' />  {item.snippet.title} </p>
                ))}
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;
