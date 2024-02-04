import { Badge, Button, Card } from "keep-react";
import { ShoppingCart } from "phosphor-react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../../Context/ShopContext";

const Item = (props) => {
  const { product } = props;
  const {addToCart} = useContext(ShopContext);
  return (
    <>
      <Card className="max-w-xs overflow-hidden rounded-md">
        <Card.Container className="p-6 rounded-md">
          <Link to={`/product/${product._id}`}>
            <img
              src={product.images[0].downloadURL}
              alt=""
              className="w-full h-44 object-cover rounded-md"
            />
          </Link>
        </Card.Container>
        {/* <Card.Container className="absolute right-3.5 top-3.5 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-metal-50/50">
            <Heart size={20} weight="bold" color="white" />
          </Card.Container> */}
        <Card.Container className="p-6">
          <Card.Container className="flex items-center justify-between">
            <Link to={`/${product.category}`}>
              <Badge size="xs" colorType="light" color="gray">
                {product.category}
              </Badge>
            </Link>
            <Card.Title>{product.price} tk</Card.Title>
          </Card.Container>
          <Link to={`/product/${product._id}`}>
          <Card.Container className="my-3">
            <Card.Title>{product.title}</Card.Title>
            <Card.Description>{product.description}</Card.Description>
          </Card.Container>
          </Link>
          <Card.Container className="flex items-center justify-start gap-5">
            <Button size="sm" type="outlineGray" onClick={()=>{addToCart(product._id)}}>
              <span className="pr-2">
                <ShoppingCart size={24} />
              </span>
              Add to Cart
            </Button>
          </Card.Container>
        </Card.Container>
      </Card>
    </>
  );
};

export default Item;
