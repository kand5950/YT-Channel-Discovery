import ReccomendedItem from "./ReccomendedItem"
import styles from './Display.module.css'

export default function Reccomended({ subs, setHovered, setToggleHover, hoverToggle }) {

    return (
        <div className={styles.reccomended}>
            {subs && subs.map((item) => {
                return (
                    <ReccomendedItem
                        classname={styles[item.topicDetails.mainCategories[0]]}
                        subs={item}
                        setHovered={setHovered}
                        hoverToggle={hoverToggle}
                        setToggleHover={setToggleHover}
                    />
                )
            })}
        </div>
    )
}