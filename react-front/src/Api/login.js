import axios from "axios"

/* global google */

const login = (setSubs, topics, api_key) => {
    console.log('hello')

    const handleCallbackResponse = (response) => {
        getSubscriptions(response.access_token, setSubs, topics, api_key)
    }
    let client = google.accounts.oauth2.initTokenClient({
        scope: 'https://www.googleapis.com/auth/youtube.readonly',
        client_id: process.env.REACT_APP_client_id,
        ux_mode: 'popup',
        callback: handleCallbackResponse,
    })
    const getCode = () => {
        client.requestAccessToken()
    }
    getCode()
}

const getSubscriptions = (auth, setSubs, topics, api_key) => {
    axios.get(`https://youtube.googleapis.com/youtube/v3/subscriptions?part=snippet&mine=true&maxResults=200&access_token=${auth}`)
        .then((data) => {
            let resourceIds = data.data.items.map((item) => {
                return item.snippet.resourceId
            })
            Promise.all(data.data.items.map((item) => {
                let id = item.snippet.resourceId.channelId
                return axios.get(`https://youtube.googleapis.com/youtube/v3/channels?part=snippet&part=statistics&part=topicDetails&id=${id}&key=${api_key}`)
            })).then((all) => {
                const subs = all.map((item, index) => {
                    let results = item.data.items[0]
                    results.snippet.resourceId = resourceIds[index]
                    return item.data.items[0]
                }).map((item) => {
                    let mainCategories = item.topicDetails?.topicIds?.length ? item.topicDetails.topicIds.map((item) => {
                        let topic = topics.find((l) => l.id === item && l.parent)
                        return (
                            topic ? topic.topic : 'none'
                        )
                    }) : ['none']
                        .filter((item) => item)
                    return { ...item, topicDetails: { mainCategories, ...item.topicDetails } }
                })
                setSubs(prev => subs)
            })
        }).catch((error) => {
            console.log(error)
        })
}

export default login