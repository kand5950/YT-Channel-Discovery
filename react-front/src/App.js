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

  // const testGetSUBS = () => {
  //   let addedChannels = [...subs]

  //   for (let i = 0; i < addedChannels.length; i++) {
  //     let id = addedChannels[i].snippet.resourceId.channelId
  //     const oldEntry = { ...addedChannels[i] }
  //     axios.get(`https://youtube.googleapis.com/youtube/v3/subscriptions?part=snippet&channelId=${id}&maxResults=200&key=${api_key}`)
  //       .then((data) => {
  //         Promise.all(data.data.items.map(item => {
  //           let id = item.snippet.resourceId.channelId
  //           return axios.get(`https://youtube.googleapis.com/youtube/v3/channels?part=snippet&part=statistics&part=topicDetails&id=${id}&key=${api_key}`)
  //         })).then((all) => {
  //           const subsWithStatsandCat = all.map(item => {
  //             return item.data.items[0]
  //           })
  //           addedChannels.splice(i, 1, { ...oldEntry, subscriptions: subsWithStatsandCat })
  //         })
  //       }).catch(() => {
  //         addedChannels.splice(i, 1, { ...oldEntry })
  //       })
  //   }
  //   setTimeout(() => {
  //     reSetSubs(addedChannels)
  //   }, 2000)
  // }

  // const testGetReccomends = () => {
  //   let addedChannels = [...subs]

  //   const channelIds = subs.map((item) => {
  //     return item.snippet.resourceId.channelId
  //   })

  //   Promise.all(channelIds.map(item => {
  //     return axios.get(`https://youtube.googleapis.com/youtube/v3/channelSections?part=snippet%2CcontentDetails&channelId=${item}&key=${api_key}`)
  //   })).then((all) => {
  //     let x = 0
  //     for (let i = 0; i < all.length; i++) {
  //       let channels = all[i].data.items.find((item => item.contentDetails?.channels))?.contentDetails?.channels

  //       if (channels) {
  //         // addedChannels.findIndex((ind) => ind.snippet.resourceId.channelId === all[i].data.items)
  //         const oldEntry = { ...addedChannels[x] }
  //         addedChannels.splice(x, 1)
  //         Promise.all(channels.map((item) => {
  //           return axios.get(`https://youtube.googleapis.com/youtube/v3/channels?part=snippet&part=statistics&part=topicDetails&id=${item}&key=${api_key}`)
  //         })).then((reccomendedChannels) => {
  //           reccomendedChannels = reccomendedChannels.map((item) => {
  //             return item.data.items[0]
  //           })
  //           addedChannels.push({ ...oldEntry, channels: reccomendedChannels })
  //         })
  //       } else {
  //         x++
  //       }
  //     }
  //     setTimeout(() => {
  //       reSetSubs(addedChannels)
  //     }, 2000)
  //   })
  // }


  // const getAllReccomended = () => {
  //   let subscriptions = subs.filter(item => item.subscriptions).map((item) => {
  //     item.subscriptions.map((chnl) => chnl.snippet.from = item.snippet.title)
  //     return [...item.subscriptions]
  //   })
  //   let channels = subs.filter(item => item.channels).map((item) => {
  //     item.channels.map((chnl) => chnl.snippet.from = item.snippet.title)
  //     return [...item.channels]
  //   })
  //   setReccomendeded([].concat(...subscriptions, ...channels))
  // }

  // const reSetSubs = (addedChannels) => {
  //   setSubs([...addedChannels])
  // }
  // const orderBySubs = () => {
  //   setReccomendeded(prev => {
  //     return [...prev.sort((a, b) => b.statistics.subscriberCount - a.statistics.subscriberCount)]
  //   })
  // }
  // const orderByCount = () => {
  //   setReccomendeded(prev => {
  //     let count = {}
  //     for (let i = 0; i < prev.length; i++) {
  //       let title = prev[i].snippet.title
  //       count[title] = (count[title] || 0) + 1
  //       if (count[title] > 1) {
  //         let index = prev.findIndex(item => item.snippet.title === title)
  //         prev[index].count = count[title]
  //         prev.splice(i, 1)
  //       }
  //     }
  //     return [...prev.sort((a, b) => (b?.count || 0) - (a?.count || 0))]
  //   })
  // }

  return (
    <div className={styles.container}>
      <button onClick={() => console.log(subs, reccomended, hovered)}>print subs</button>
      {!subs ? <div><div onClick={() => { login(setSubs, topics, api_key, setChannel) }}>hello</div>
        <div onClick={() => { getAllReccomended(subs, setSubs, api_key) }}>
          wow</div></div>
        : <Home subs={subs} hovered={hovered} setHovered={setHovered} topics={topics} channel={channel} />}
    </div >
  );
}

export default App;
