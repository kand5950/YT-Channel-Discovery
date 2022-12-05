import { useState } from 'react';
import styles from './Display.module.css';
import Insert from './Insert';
import Reccomended from './Reccomended';
import SubItem from './SubItem';
import { useRef } from 'react';
import { Pie, getElementsAtEvent } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend);

export default function Display({ subs, setHovered }) {
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
                            );
                        })}
                    </div>
                </div>
            </div>
            {/* <Reccomended
                subs={orderedSubs}
                setHovered={setHovered}
                hoverToggle={toggleHover}
                setToggleHover={setToggleHover} /> */}
        </div >
    );
}