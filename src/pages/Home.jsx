import { useEffect, useState } from "react";

const Card = ({ item }) => {
    return (
        <div className="card-container ">
            <img src={item.images[0]} alt={item.title} className="card-img" />
            <p style={{ textAlign: 'center' }}>{item?.title}</p>
        </div>
    )
}

const per_page = 10;

function Home() {
    const [data, setData] = useState([]);
    const [pageNo, setPageNo] = useState(0)

    const fetchData = async () => {
        try {
            fetch(`https://dummyjson.com/products?limit=500`)
                .then((res) => res.json())
                .then(item => setData(item.products))
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    const handleIncrement = (n) => {
        setPageNo(n)
    }

    const totalItems = data.length;
    const noOfPages = Math.ceil(totalItems / per_page);
    const startIndex = pageNo * per_page;
    const endIndex = startIndex + per_page;

    return (
        <div>
            <div className="container">
                <button disabled={pageNo === 0} className="num-container" onClick={() => setPageNo((prev) => prev - 1)}>Prev</button>
                {
                    [...Array(noOfPages)].keys().map(n => {
                        return (
                            <span key={n} className={pageNo === n ? "active" : "num-container"} onClick={() => handleIncrement(n)}>{n}</span>
                        )
                    })
                }
                <button disabled={pageNo === noOfPages - 1} className="num-container" onClick={() => setPageNo((prev) => prev + 1)}>Next</button>
            </div>
            <div className='items-list'>
                {
                    data.slice(startIndex, endIndex).map((item, i) => <Card key={i} item={item} />)
                }
            </div>
        </div>
    );
}

export default Home;