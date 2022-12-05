import { useState } from 'react'
import styles from './Display.module.css'
import Insert from './Insert'
import Reccomended from './Reccomended'
import SubItem from './SubItem'

export default function Display({ subs, setHovered }) {
    const [orderedSubs, setOrderedSubs] = useState(subs && [...subs])
    const [toggleHover, setToggleHover] = useState(true)


    return (
        <div className={styles.outerdisplay}>
            {/* <div className={styles.display}>
                <div className={styles.usercolumn}>
                    <div className={styles.chart}>
                        PIE CHART
                    </div>
                    <div className={styles.user}>
                        user
                    </div>
                </div>
                <Insert setOrderedSubs={setOrderedSubs} subs={subs} />
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
            </div> */}
            <Reccomended
                subs={orderedSubs}
                setHovered={setHovered}
                hoverToggle={toggleHover}
                setToggleHover={setToggleHover} />
        </div >
    )
}