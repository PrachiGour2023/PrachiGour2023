const Pagination = ({ onNext, onPrev, pageNo, totalPages }) => {
    return (
        <div className="container">
            <button disabled={pageNo === 0} className="num-container" onClick={onPrev}>Prev</button>
            <p>Page {pageNo + 1} of {totalPages}</p>
            <button disabled={pageNo === totalPages - 1} className="num-container" onClick={onNext}>Next</button>
        </div>
    )
}

export default Pagination