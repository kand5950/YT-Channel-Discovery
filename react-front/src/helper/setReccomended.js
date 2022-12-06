import topics from "../data/topics"

const setReccomendedSet = (subs, setReccomended) => {
    let subscriptions = subs.filter(item => item.subscriptions).map((item) => {
        item.subscriptions.map((chnl) => chnl.snippet.from = item.snippet.title)
        return [...item.subscriptions]
    })
    let channels = subs.filter(item => item.channels).map((item) => {
        item.channels.map((chnl) => chnl.snippet.from = item.snippet.title)
        return [...item.channels]
    })
    setReccomended(prev => [].concat(...subscriptions, ...channels).map((item) => {
        let mainCategories = (item.topicDetails?.topicIds?.length ? item.topicDetails.topicIds.map((item) => {
            let topic = topics.find((l) => l.id === item && l.parent)
            return (
                topic && topic.topic
            )
        }) : ['none'])
            .filter((item) => item)
        return { ...item, topicDetails: { mainCategories, ...item.topicDetails } }
    }))
    setReccomended(prev => {
        let count = {}
        for (let i = 0; i < prev.length; i++) {
            let title = prev[i].snippet.title
            let index = prev.findIndex(item => item.snippet.title === title)

            count[title] = (count[title] || 0) + 1

            if (count[title] > 1) {
                if (!Array.isArray(prev[index].snippet.from)) {
                    prev[index].snippet.from = [prev[index].snippet.from]
                }
                if (!prev[index].snippet.from.includes(prev[i].snippet.from)) {
                    prev[index].snippet.from.push(prev[i].snippet.from)
                }
                if (prev[index].snippet.from.length > 1) prev[index].count = prev[index].snippet.from.length

            }
        }
        return [...prev.filter((item, index, array) => array.findIndex((elem) => elem.snippet.title === item.snippet.title) === index)]
    })
}

export default setReccomendedSet