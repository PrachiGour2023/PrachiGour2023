import { useState, useEffect } from "react";

const useFetchProducts = () => {

    const [products, setProducts] = useState([]);

    const fetchData = async () => {
        try {
            const response = await fetch(`https://dummyjson.com/products?limit=500`);
            const json = await response.json();
            setProducts(json.products)
        } catch (error) {
            console.log('failed to fetch', error);
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    return {
        products
    }
}

export default useFetchProducts;