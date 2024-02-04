"use client";
import { Button, Navbar } from "keep-react";
// import Image from "next/image";
import logo from "../Assets/logo-1.png";
import { ShoppingCart, User } from "phosphor-react";
import { useContext, useState } from "react";
import { ShopContext } from "../../Context/ShopContext";
import { Link } from "react-router-dom";

const NavBar = () => {
  const { getTotalItems } = useContext(ShopContext);
  const [menu, setMenu] = useState("shop");
  return (
    <Navbar fluid={true} className="fixed w-full z-50 top-0 bg-white">
      <Navbar.Container className="flex items-center justify-between">
        <Navbar.Container
          tag="ul"
          className="lg:flex hidden items-center justify-between gap-8"
        >
          <Link to="/"><Navbar.Link linkName="Shop" /></Link>
          <Link to="/Sharee"><Navbar.Link linkName="Sharee" /></Link>
          <Link to="/Threepcs"><Navbar.Link linkName="Three Pcs" /></Link>
        </Navbar.Container>
        <Navbar.Brand>
          <img src={logo} alt="keep" width="50" />
        </Navbar.Brand>

        <Navbar.Collapse collapseType="sidebar">
          <Navbar.Container tag="ul" className="flex flex-col gap-5">
            <Navbar.Link linkName="Shop" />
            <Link to="/Sharee"><Navbar.Link linkName="Sharee" /></Link>
          <Link to="/Threepcs"><Navbar.Link linkName="Three Pcs" /></Link>
          </Navbar.Container>
        </Navbar.Collapse>

        <Navbar.Container className="flex items-center gap-3">
          <Link to="/login" className="text-metal-600">
            {" "}
            {<User size={20} color="#444" />}{" "}
          </Link>
          <Link to="/cart"><Button size="xs" type="outlineGray">
            <span>
              <ShoppingCart size={20} color="#444" />
            </span>
            <span className="ml-1 text-metal-600">{getTotalItems()}</span>
          </Button></Link>
          <Navbar.Toggle />
        </Navbar.Container>
      </Navbar.Container>
    </Navbar>
  );
};

export default NavBar;
