import Display from "./Display"
import styles from './Display.module.css'

export default function Home({ subs, hovered, setHovered, topics }) {

    return (
        <>
            {/* <div>
                <button onClick={doAuth}>AUTH</button>
                <button onClick={getSubscriptions}>SUBS</button>
                <button onClick={testGetReccomends}>RECCO</button>
                <button onClick={testGetSUBS}>TESTSUBS</button>
                <button onClick={getAllReccomended}>GET ALL RECCOMENDED</button>
                <button onClick={orderBySubs}>ORDER BY SUBCOUNT </button>
                <button onClick={orderByCount}>ORDER BY COUNT </button>
                <button onClick={() => console.log(subs, reccomended, hovered)}>print subs</button>
            </div> */}
            <div className={styles.dashboard}>
                <div className={styles.legend}>
                    <div>
                        <header> HEADER <span className={styles.toggleUser}><span
                            className={hovered.hovering ? `${styles.userButton} ${styles.on}`
                                : styles.userButton}
                            onClick={() => { if (hovered.thumbnail) setHovered(prev => ({ ...prev, hovering: true })) }}>
                            your information
                        </span>
                            <span className={!hovered.hovering ? `${styles.hoverButton} ${styles.on}`
                                : styles.hoverButton}
                                onClick={() => { setHovered(prev => ({ ...prev, hovering: false })) }}
                            >hover</span>
                        </span>
                        </header>
                        {hovered.hovering ?
                            <div>
                                <img src={hovered.thumbnail} alt='' />
                                <span className={styles.subName}>{hovered.title}</span>
                                <div className={styles.subInfo}>
                                    <p>{hovered.description}</p>
                                    subscriber count: {hovered.subCount > 1000000 ? hovered.subCount / 1000000 + 'M' : hovered.subCount / 1000 + 'K'}
                                    <hr />
                                    video count: {hovered.videoCount}
                                    <p>categories:</p>
                                    <div>
                                        {hovered.categories.map((item) => {
                                            let topic = topics.find((l) => l.id === item)
                                            return (
                                                <p>{topic && topic.topic}</p>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div> :
                            <div>
                                <div>
                                    PLACEHOLDER USER INFORMATION
                                </div>
                            </div>
                        }
                    </div>
                </div>
                <Display subs={subs} setHovered={setHovered} />
            </div>
        </>

    )
}