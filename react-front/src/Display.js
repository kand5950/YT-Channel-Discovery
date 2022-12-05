import { useState } from 'react';
import styles from './Display.module.css';
import Insert from './Insert';
import Reccomended from './Reccomended';
import SubItem from './SubItem';
import { useRef } from 'react';
import { Pie, getElementsAtEvent } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import topics from './data/topics';
ChartJS.register(ArcElement, Tooltip, Legend);

export default function Display({ subs, setHovered, reccomendedOrder, reccomended, setReccomended, setReccomendedOrder }) {
    const [orderedSubs, setOrderedSubs] = useState(subs && [...subs]);
    const [toggleHover, setToggleHover] = useState(true);


    const chartRef = useRef();

    const onClick = (event) => {
        if (getElementsAtEvent(chartRef.current, event).length > 0) {
            const datasetIndexNum = getElementsAtEvent(chartRef.current, event)[0].datasetIndex;
            const dataPoint = getElementsAtEvent(chartRef.current, event)[0].index;
            console.log(`Dataset: ${datasetIndexNum} and  Data: ${dataPoint} `);
            console.log(data.datasets[datasetIndexNum].link[dataPoint]);
        }
    };

    const findGaming = (subs) => {
        const gaming = subs.map(sub => sub.topicDetails.mainCategories[0] === "Gaming")
        const count = gaming.filter(Boolean).length;
        return count
    }

    const findLifestyle = (subs) => {
        const gaming = subs.map(sub => sub.topicDetails.mainCategories[0] === "Lifestyle")
        const count = gaming.filter(Boolean).length;
        return count
    }
    const findMusic = (subs) => {
        const gaming = subs.map(sub => sub.topicDetails.mainCategories[0] === "Music")
        const count = gaming.filter(Boolean).length;
        return count
    }
    const findEntertainment = (subs) => {
        const gaming = subs.map(sub => sub.topicDetails.mainCategories[0] === "Entertainment")
        const count = gaming.filter(Boolean).length;
        return count
    }
    const findSports = (subs) => {
        const gaming = subs.map(sub => sub.topicDetails.mainCategories[0] === "Sports")
        const count = gaming.filter(Boolean).length;
        return count
    }
    const findTechnology = (subs) => {
        const gaming = subs.map(sub => sub.topicDetails.mainCategories[0] === "Technology")
        const count = gaming.filter(Boolean).length;
        return count
    }
    const findHobby = (subs) => {
        const gaming = subs.map(sub => sub.topicDetails.mainCategories[0] === "Hobby")
        const count = gaming.filter(Boolean).length;
        return count
    }
    const findSociety = (subs) => {
        const gaming = subs.map(sub => sub.topicDetails.mainCategories[0] === "Society")
        const count = gaming.filter(Boolean).length;
        return count
    }

    const data = {
        labels: [
            'Music',
            'Entertainment',
            'Lifestyle',
            'Sports',
            'Gaming',
            'Technology',
            'Hobby',
            'Society'
        ],
        datasets: [{
            label: 'My Categories',
            data: [findMusic(subs), findEntertainment(subs), findLifestyle(subs), findSports(subs), findGaming(subs), findTechnology(subs), findHobby(subs), findSociety(subs)], //ARRAY OF DATA NEEDS TO GO HERE, follow same key id as categories id
            backgroundColor: [
                'rgb(255, 0, 0)',
                'rgb(255, 165, 0)',
                'rgb(0, 128, 0)',
                'rgb(207, 37, 190)',
                'rgb(255, 255, 0)',
                'rgb(0, 255, 102)',
                'rgb(193, 193, 193)',
                'rgb(0, 0, 255)',
            ],
            hoverOffset: 4,
            //link to render filtered categories
            link: ['link', 'link2', 'link3', 'link4', 'link5', 'link6', 'link7', 'link8'],
        }],

    };

    return (
        <div className={styles.outerdisplay}>
            {!reccomendedOrder ?
                <div className={styles.display}>
                    <div className={styles.usercolumn}>
                        <div className={styles.chart}>
                            <Pie
                                options={{
                                    plugins: {
                                        legend: {
                                            position: 'bottom',
                                            align: 'start',
                                            labels: {
                                                usePointStyle: true,
                                                boxWidth: 20,
                                                padding: 20,
                                                textAlign: ''

                                            }
                                        }
                                    }
                                }

                                }
                                data={data}
                                onClick={onClick}
                                ref={chartRef}
                            />
                        </div>
                        <div className={styles.user}>
                            <button onClick={() => {
                                let subscriptions = subs.filter(item => item.subscriptions).map((item) => {
                                    item.subscriptions.map((chnl) => chnl.snippet.from = item.snippet.title)
                                    return [...item.subscriptions]
                                })
                                let channels = subs.filter(item => item.channels).map((item) => {
                                    item.channels.map((chnl) => chnl.snippet.from = item.snippet.title)
                                    return [...item.channels]
                                })
                                setReccomended([].concat(...subscriptions, ...channels).map((item) => {
                                    let mainCategories = (item.topicDetails?.topicIds?.length ? item.topicDetails.topicIds.map((item) => {
                                        let topic = topics.find((l) => l.id === item && l.parent)
                                        return (
                                            topic && topic.topic
                                        )
                                    }) : ['none'])
                                        .filter((item) => item)
                                    return { ...item, topicDetails: { mainCategories, ...item.topicDetails } }
                                }))
                            }}>button 1</button>
                            <button onClick={() => {
                                setReccomendedOrder([...reccomended])
                            }}>button 2</button>
                            <button onClick={() => {

                            }}>button 3</button>
                        </div>
                    </div>
                    <Insert setOrderedSubs={setOrderedSubs} subs={subs} />
                    <div className={styles.subcolumn}>
                        <div className={styles.subcontainer}>
                            {orderedSubs && Array.isArray(orderedSubs) ? orderedSubs.map((item) => {
                                return (
                                    <SubItem
                                        classname={styles[item.topicDetails.mainCategories[0]]}
                                        subs={item}
                                        setHovered={setHovered}
                                        hoverToggle={toggleHover}
                                        setToggleHover={setToggleHover}
                                    />
                                );
                            }) :
                                Object.values(orderedSubs).map((item, index) => {
                                    return <div><h3>{Object.keys(orderedSubs)[index]}</h3>
                                        <div className={styles.categorySection}>
                                            {item.map((itemOfCategory) => {
                                                return (
                                                    <SubItem
                                                        classname={styles[itemOfCategory.topicDetails.mainCategories[0]]}
                                                        subs={itemOfCategory}
                                                        setHovered={setHovered}
                                                        hoverToggle={toggleHover}
                                                        setToggleHover={setToggleHover}
                                                    />
                                                );
                                            })}
                                        </div>
                                    </div>
                                })
                            }
                        </div>
                    </div>
                </div> :
                < Reccomended
                    orderedSubs={reccomendedOrder}
                    setHovered={setHovered}
                    hoverToggle={toggleHover}
                    setToggleHover={setToggleHover} />
            }
        </div >
    );
}