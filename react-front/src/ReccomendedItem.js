import styles from './Display.module.css'


export default function reccomendedItem({ classname, subs, setHovered, hoverToggle, setToggleHover, sectionNames }) {

    const thumbnail = subs.snippet.thumbnails.default.url
    const title = subs.snippet.title
    const subCount = subs.statistics.subscriberCount
    const videoCount = subs.statistics.videoCount
    const description = subs.snippet.description
    const categories = subs.topicDetails?.topicIds || ['none']
    const subscriptions = subs?.subscriptions || ['none']
    const reccomendedChannels = subs?.channels || ['none']
    const from = subs?.snippet.from
    const url = 'https://youtube.com/' + subs.snippet.customUrl

    return (
        <div className={classname} onMouseOver={() => {
            if (hoverToggle) setHovered({
                thumbnail, title, subCount, videoCount, description,
                subscriptions, reccomendedChannels, categories, url,
                from, hovering: true
            })
        }} onClick={() => { setToggleHover(prev => !prev) }}>
            <div className={styles.default}>
                <img src={thumbnail} alt='' />
                <p><strong>{title}</strong></p>
                <p>{subCount > 1000000 ? subCount / 1000000 + 'M' : subCount > 1000 && subCount < 1000000 ? subCount / 1000 + 'K' : subCount}</p>
            </div>
        </div >
    )
}