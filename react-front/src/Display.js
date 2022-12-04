import { useState } from 'react'
import styles from './Display.module.css'
import SubItem from './SubItem'

export default function Display({ subs, setHovered }) {
    const [orderedSubs, setOrderedSubs] = useState(subs && subs)
    const [toggleHover, setToggleHover] = useState(true)

    const orderSubs = (orderType) => {
        if (orderType === 'subscriber-count') {
            setOrderedSubs(prev => [...prev.sort((a, b) => b.statistics.subscriberCount - a.statistics.subscriberCount)])
        } else if (orderType === 'default') {
            setOrderedSubs([...subs])
        }
    }

    return (
        <div className={styles.outerdisplay}>
            <div className={styles.display}>
                <div className={styles.usercolumn}>
                    <div className={styles.chart}>
                        PIE CHART
                    </div>
                    <div className={styles.user}>
                        user
                    </div>
                </div>
                <div className={styles.insert}>
                    <button onClick={() => orderSubs('default')}>default</button>
                    <button onClick={() => orderSubs('subscriber-count')}>by subs</button>
                </div>
                <div className={styles.subcolumn}>
                    <div className={styles.subcontainer}>
                        {orderedSubs && orderedSubs.map((item) => {
                            return (
                                <SubItem
                                    classname={styles[item.topicDetails.mainCategories[0]]}
                                    subs={item}
                                    setHovered={setHovered}
                                    hoverToggle={toggleHover}
                                    setToggleHover={setToggleHover}
                                />
                            )
                        })}
                    </div>
                </div>
            </div>
        </div >
    )
}