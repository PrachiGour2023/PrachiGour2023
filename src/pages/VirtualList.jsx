import { useState, useEffect, useMemo, useCallback } from 'react';

export default function VirtualList() {

    const [items, setItems] = useState([]);
    const itemHeight = 40;
    const containerHeight = 400;

    useEffect(() => {
        fetch('https://pokeapi.co/api/v2/pokemon?limit=1000')
            .then(res => res.json())
            .then(data => setItems(data.results))
    }, [])

    const noOfVisibleItem = Math.floor(containerHeight / itemHeight)
    const [indexes, setIndexes] = useState([0, noOfVisibleItem])

    const listOfVisibleItems = useMemo(
        () =>
            items.slice(indexes[0], indexes[1])
        , [items, indexes[0], indexes[1]])

    const handleScroll = useCallback((e) => {
        const { scrollTop } = e.target;
        const startScroll = Math.floor(scrollTop / itemHeight);
        const endScroll = startScroll + noOfVisibleItem;
        setIndexes([startScroll, endScroll])
    }, [])

    return (
        <div>
            <div style={{
                height: containerHeight,
                backgroundColor: 'pink',
                overflowY: 'auto',
                width: '500px'
            }} onScroll={handleScroll}>
                <div style={{ height: items.length * itemHeight }}>
                    <div style={{ transform: `translateY(${indexes[0] * itemHeight}px)` }}>
                        {
                            listOfVisibleItems.map((item, i) => {
                                return (
                                    <p key={i} style={{
                                        height: itemHeight,
                                        borderBottom: '1px solid red'
                                    }}>{item.name}</p>
                                )
                            })
                        }
                    </div>
                </div>

            </div>

        </div>
    )
}