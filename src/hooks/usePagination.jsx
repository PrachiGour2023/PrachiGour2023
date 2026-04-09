import { useState } from "react";

const usePagination = ({ initialPage = 0, perPage = 10 }) => {
    const [pageNo, setPageNo] = useState(initialPage)

    const getTotalPages = (totalItems) => {
        return Math.ceil(totalItems / perPage);
    }

    const onPrev = () => {
        setPageNo((prev) => prev - 1)
    }

    const onNext = () => {
        setPageNo((prev) => prev + 1)
    }

    return {
        pageNo,
        onPrev,
        onNext,
        getTotalPages
    }
}

export default usePagination;