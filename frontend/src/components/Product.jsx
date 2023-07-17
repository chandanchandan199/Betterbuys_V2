import { Card } from "react-bootstrap"
import {Link} from "react-router-dom"
import Rating from "./Rating"

const Product = ({product}) => {
  return (
    <Card className="my-3 p-3 rounded">
            <Link to ={`/product/${product._id}`}>
            <Card.Img src={product.image} alt={product.image} variant="top"></Card.Img>
            </Link>
            
        <Card.Body>
        <Link to ={`/product/${product._id}`}>
            <Card.Title as="div" className="product-title">
                <strong>{product.name}</strong>
            </Card.Title>
            </Link>
            <Card.Text as ="div">
              <Rating value={product.rating} text={`${product.numReviews}reviews`} />
            </Card.Text>
            <Card.Text as="h3">${product.price}</Card.Text>
        </Card.Body>
        
    </Card>
  )
}

export default Product

/*Here   <Rating value={product.rating} text={`${product.numReviews} reviews`} />
`{variable name} text` this is a feature in js which helps you evaluvate expression
present inside a string, this action happens during the runtime it.The use of ${} 
within a template literal is referred to as string interpolation
*/