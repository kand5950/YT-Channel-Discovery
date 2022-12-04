import styles from './Display.module.css'


export default function SubItem({ classname, subs, setHovered, hoverToggle, setToggleHover }) {

    const thumbnail = subs.snippet.thumbnails.default.url
    const title = subs.snippet.title
    const subCount = subs.statistics.subscriberCount
    const videoCount = subs.statistics.videoCount
    const description = subs.snippet.description
    const categories = subs.topicDetails.topicIds

    return (
        <div className={classname} onMouseOver={() => {
            if (hoverToggle) setHovered({ thumbnail, title, subCount, videoCount, description, categories, hovering: true })
        }} onClick={() => { setToggleHover(prev => !prev) }}>
            <div className={styles.default}>
                <img src={thumbnail} alt='' />
                <p><strong>{title}</strong></p>
                <p>{subCount > 1000000 ? subCount / 1000000 + 'M' : subCount / 1000 + 'K'}</p>
            </div>
        </div >
    )
}