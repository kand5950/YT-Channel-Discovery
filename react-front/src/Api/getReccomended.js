import axios from "axios"

const testGetSUBS = (subs, setSubs, api_key) => {
    let addedChannels = [...subs]

    for (let i = 0; i < addedChannels.length; i++) {
        let id = addedChannels[i].snippet.resourceId.channelId
        const oldEntry = { ...addedChannels[i] }
        axios.get(`https://youtube.googleapis.com/youtube/v3/subscriptions?part=snippet&channelId=${id}&maxResults=200&key=${api_key}`)
            .then((data) => {
                Promise.all(data.data.items.map(item => {
                    let id = item.snippet.resourceId.channelId
                    return axios.get(`https://youtube.googleapis.com/youtube/v3/channels?part=snippet&part=statistics&part=topicDetails&id=${id}&key=${api_key}`)
                })).then((all) => {
                    const subsWithStatsandCat = all.map(item => {
                        return item.data.items[0]
                    })
                    addedChannels.splice(i, 1, { ...oldEntry, subscriptions: subsWithStatsandCat })
                })
            }).catch(() => {
                addedChannels.splice(i, 1, { ...oldEntry })
            })
    }
    setSubs(addedChannels)
    testGetReccomends(subs, setSubs, api_key)
}

const testGetReccomends = (addedSubs, setSubs, api_key) => {
    let addedChannels = [...addedSubs]
    console.log(addedSubs, addedChannels)

    const channelIds = addedSubs.map((item) => {
        return item.snippet.resourceId.channelId
    })

    Promise.all(channelIds.map(item => {
        return axios.get(`https://youtube.googleapis.com/youtube/v3/channelSections?part=snippet%2CcontentDetails&channelId=${item}&key=${api_key}`)
    })).then((all) => {
        let x = 0
        for (let i = 0; i < all.length; i++) {
            let channels = all[i].data.items.find((item => item.contentDetails?.channels))?.contentDetails?.channels

            if (channels) {
                const oldEntry = { ...addedChannels[x] }
                addedChannels.splice(x, 1)
                Promise.all(channels.map((item) => {
                    return axios.get(`https://youtube.googleapis.com/youtube/v3/channels?part=snippet&part=statistics&part=topicDetails&id=${item}&key=${api_key}`)
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
        setSubs(addedChannels)
    })
}


const getAllReccomended = (subs, setSubs, api_key) => {
    testGetSUBS(subs, setSubs, api_key)
}

//   const getAllReccomended = () => {
//     let subscriptions = subs.filter(item => item.subscriptions).map((item) => {
//       item.subscriptions.map((chnl) => chnl.snippet.from = item.snippet.title)
//       return [...item.subscriptions]
//     })
//     let channels = subs.filter(item => item.channels).map((item) => {
//       item.channels.map((chnl) => chnl.snippet.from = item.snippet.title)
//       return [...item.channels]
//     })
//     setReccomendeded([].concat(...subscriptions, ...channels))
//   }


export default getAllReccomended