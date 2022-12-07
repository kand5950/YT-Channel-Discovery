import topics from './data/topics'
import styles from './Display.module.css'

export default function Insert({ subs, setOrderedSubs, reccomended }) {


    const orderSubs = (orderType) => {

        if (orderType === 'by-category') {

            let categories = subs.reduce((final, item) => {
                let mainCat = item.topicDetails.mainCategories
                if (mainCat[0] !== 'none') {
                    !final[mainCat] ? final[mainCat] = [item] : final[mainCat].push(item)
                }
                return final
            }, {})
            setOrderedSubs(categories)
        } else if (orderType === 'by-creator') {
            let mainTopics = topics.filter(item => item.parent).map((item) => item.topic)
            setOrderedSubs(prev => {
                if (!Array.isArray(prev) && !Object.keys(prev).some((item) => mainTopics.includes(item))) {
                    return Object.fromEntries(Object.entries(prev).sort(([a], [b]) => b.split(',').length - a.split(',').length))
                } else {
                    let creators = subs.reduce((final, item) => {
                        !final[item.snippet.from] ? final[item.snippet.from] = [item] : final[item.snippet.from].push(item)
                        return final
                    }, {})
                    return creators
                }
            })



        } else if (orderType === 'by-duplicate') {
            setOrderedSubs(prev => {
                if (Array.isArray(prev)) {
                    return [...subs].sort((a, b) => (b.count || 0) - (a.count || 0))
                } else {
                    let catSubs = { ...prev }
                    for (const cat in catSubs) {
                        catSubs[cat].sort((a, b) => (b.count || 0) - (a.count || 0))
                    }
                    return catSubs
                }
            })
        } else if (orderType === 'subscriber-count') {
            setOrderedSubs(prev => {
                if (Array.isArray(prev)) {
                    return [...subs].sort((a, b) => b.statistics.subscriberCount - a.statistics.subscriberCount)
                } else {
                    let catSubs = { ...prev }
                    for (const cat in catSubs) {
                        catSubs[cat].sort((a, b) => b.statistics.subscriberCount - a.statistics.subscriberCount)
                    }
                    return catSubs
                }
            })
        } else if (orderType === 'default') {
            setOrderedSubs([...subs])
        } else if (orderType === 'reset') {
            setOrderedSubs(null)
        }
    }

    return (
        <div className={styles.insert}>
            <button onClick={() => orderSubs('default')}>Default</button>
            <button onClick={() => orderSubs('subscriber-count')}>By Subs</button>
            {reccomended && <button onClick={() => orderSubs('by-duplicate')}>By Duplicates</button>}
            <button onClick={() => orderSubs('by-category')}>By Category</button>
            {reccomended && <button onClick={() => orderSubs('by-creator')}>By Creator</button>}
            {reccomended && <button onClick={() => orderSubs('reset')}>Back to Subs</button>}

        </div>
    )
}
