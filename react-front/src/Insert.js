import styles from './Display.module.css'

export default function Insert({ subs, setOrderedSubs }) {


    const orderSubs = (orderType) => {
        if (orderType === 'subscriber-count') {
            setOrderedSubs(prev => [...prev.sort((a, b) => b.statistics.subscriberCount - a.statistics.subscriberCount)])
        } else if (orderType === 'default') {
            setOrderedSubs([...subs])
        }
    }

    return (
        <div className={styles.insert}>
            <div onClick={() => orderSubs('default')}>default</div>
            <div onClick={() => orderSubs('subscriber-count')}>bysubs</div>
            <div onClick={() => orderSubs('subscriber-count')}>byCategory</div>
        </div>
    )
}
