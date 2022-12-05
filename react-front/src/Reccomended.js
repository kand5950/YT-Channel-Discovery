import ReccomendedItem from "./ReccomendedItem"
import styles from './Display.module.css'

export default function Reccomended({ orderedSubs, setHovered, setToggleHover, hoverToggle }) {


    return (
        <div className={styles.reccomended}>
            {orderedSubs && Array.isArray(orderedSubs) ? orderedSubs.map((item) => {
                return (
                    <ReccomendedItem
                        classname={styles[item.topicDetails.mainCategories[0]]}
                        subs={item}
                        setHovered={setHovered}
                        hoverToggle={hoverToggle}
                        setToggleHover={setToggleHover}
                    />
                );
            }) :
                Object.values(orderedSubs).map((item, index) => {
                    return <div><h3>{Object.keys(orderedSubs)[index]}</h3>
                        <div className={styles.categorySection}>
                            {item.map((itemOfCategory) => {
                                return (
                                    <ReccomendedItem
                                        classname={styles[itemOfCategory.topicDetails.mainCategories[0]]}
                                        subs={itemOfCategory}
                                        setHovered={setHovered}
                                        hoverToggle={hoverToggle}
                                        setToggleHover={setToggleHover}
                                    />
                                );
                            })}
                        </div>
                    </div>
                })
            }
        </div>
    )
}