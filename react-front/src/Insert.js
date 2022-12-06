import styles from './Display.module.css'

export default function Insert({ subs, setOrderedSubs, reset }) {


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
            <div onClick={() => orderSubs('default')}>default</div>
            <div onClick={() => orderSubs('subscriber-count')}>bysubs</div>
            <div onClick={() => orderSubs('by-category')}>byCategory</div>
            {reset && <div onClick={() => orderSubs('reset')}>reset</div>}

        </div>
    )
}
