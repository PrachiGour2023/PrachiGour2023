import { useMemo, useState } from "react";
import ProductCard from "../component/ProductCard";
import useFetchProducts from "../hooks/useFetchProducts";
import Pagination from "../component/Pagination";
import usePagination from "../hooks/usePagination";

const per_page = 10;

function Home() {

    const { products } = useFetchProducts();
    const { onPrev, onNext, pageNo, getTotalPages } = usePagination(1, 10);
    const startIndex = pageNo * per_page;
    const endIndex = startIndex + per_page;

    const totalPages = getTotalPages(products.length)

    const visibleData = useMemo(() => {
        return products.slice(startIndex, endIndex)
    }, [startIndex, endIndex, products])

    return products.length > 0 ? (
        <div>
            <Pagination
                onPrev={onPrev}
                onNext={onNext}
                pageNo={pageNo}
                totalPages={totalPages}
            />
            <div className='items-list'>
                {
                    visibleData.map((item, i) => <ProductCard key={item.id} item={item} />)
                }
            </div>
        </div>) : (
        <div>
            <p className="no-product-text">No Products</p>
        </div>
    );
}

export default Home;