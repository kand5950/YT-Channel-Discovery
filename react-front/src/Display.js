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
  const [orderedSubs, setOrderedSubs] = useState(subs && subs);
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
  
  const countCategories = () => {
    let categories = [];
    for (let i = 0; i < subs.length; i++) {
      const allSubsValues = Object.values(subs[i].topicDetails.mainCategories);
      categories.push(allSubsValues);
    }
    const count = categories.flat().reduce((acc, curr) => (acc[curr] = (acc[curr] || 0) + 1, acc), {});
    return count
  };

  const data = {
    labels: Object.keys(countCategories(subs)),
    datasets: [{
      label: 'My Categories',
      data: Object.values(countCategories(subs)), //ARRAY OF DATA NEEDS TO GO HERE, follow same key id as categories id
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
      link: ['link3', 'link2', `{sortLifestyle(subs)}`, 'link4', 'link5', 'link6', 'link7', 'link8'],
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