const ProductCard = ({ item }) => {
    return (
        <div className="card-container ">
            <img src={item.images[0]} alt={item?.title} className="card-img" />
            <p style={{ textAlign: 'center' }}>{item?.title}</p>
        </div>
    )
}

export default ProductCard;