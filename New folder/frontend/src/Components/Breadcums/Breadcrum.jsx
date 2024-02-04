import React from "react";
// import "./Breadcrum.css";
import { Breadcrumb } from "keep-react";
import { CaretRight, House } from "phosphor-react";
import { Link } from "react-router-dom";

const Breadcrum = (props) => {
  const { product } = props;
  console.log(product);
  return (
    <Breadcrumb
        breadCrumbWithBorder={true}
        aria-label="Default breadcrumb example"
        separatorIcon={<CaretRight size={20} color="#AFBACA" />}
      >
        <Link to="/"><Breadcrumb.Item icon={<House size={24} color="#AFBACA" />}>Shop</Breadcrumb.Item></Link>
        <Breadcrumb.Item><Link to="/Sharee">{product.category}</Link></Breadcrumb.Item>
        <Breadcrumb.Item active="base">
          {product.title}
        </Breadcrumb.Item>
      </Breadcrumb>
  );
};

export default Breadcrum;
