import styles from './Display.module.css'

export default function Insert({ subs, setOrderedSubs, reccomended }) {


    const orderSubs = (orderType) => {
        if (orderType === 'by-category') {
            let categories = subs.reduce((final, item) => {
                let mainCat = item.topicDetails.mainCategories
                if (mainCat[0] !== 'none' && mainCat.length === 1) {
                    !final[mainCat[0]] ? final[mainCat[0]] = [item] : final[mainCat[0]].push(item)
                } else {
                    !final.multipleCategories ? final.multipleCategories = [item] : final.multipleCategories.push(item)
                }
                return final
            }, {})
            setOrderedSubs(categories)
        } else if (orderType === 'by-creator') {
            let creators = subs.reduce((final, item) => {
                !final[item.snippet.from] ? final[item.snippet.from] = [item] : final[item.snippet.from].push(item)
                return final
            }, {})
            setOrderedSubs(creators)
        } else if (orderType === 'by-duplicate') {
            setOrderedSubs(prev => {
                if (Array.isArray(prev)) {
                    return [...subs].sort((a, b) => b.count - a.count)
                } else {
                    let catSubs = { ...prev }
                    for (const cat in catSubs) {
                        catSubs[cat].sort((a, b) => b.count - a.count)
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
            <div onClick={() => orderSubs('default')}>Default</div>
            <div onClick={() => orderSubs('subscriber-count')}>By Subs</div>
            {reccomended && <div onClick={() => orderSubs('by-duplicate')}>By Duplicates</div>}
            <div onClick={() => orderSubs('by-category')}>ByCategory</div>
            {reccomended && <div onClick={() => orderSubs('by-creator')}>ByCreator</div>}
            {reccomended && <div onClick={() => orderSubs('reset')}>Back to Subs</div>}

        </div>
    )
}
