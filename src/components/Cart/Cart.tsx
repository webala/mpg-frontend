import React, { useEffect, useState } from "react";
import "./Cart.scss";
import {
	Drawer,
	DrawerBody,
	DrawerFooter,
	DrawerHeader,
	DrawerOverlay,
	DrawerContent,
	DrawerCloseButton,
} from "@chakra-ui/react";

import { getCookie } from "../../cart";
import CartItem from "../CartItem/CartItem";
import Process from "../Process/Process";

interface iCart {}
function Cart({ cart, setCart, isOpen, onClose }) {
	const btnRef = React.useRef();
	const [cartItems, setCartItems] = useState([]);

	let partIds = Object.keys(cart);
	console.log('cart items: ', cartItems)

	return (
		<>
			<Drawer
				isOpen={isOpen}
				placement="right"
				onClose={onClose}
				finalFocusRef={btnRef}
				size="lg"
			>
				<DrawerOverlay />
				<DrawerContent>
					<DrawerCloseButton />
					<DrawerHeader>Cart</DrawerHeader>
					<DrawerBody>
						<div className="cart">
							{partIds.map((id, index) => (
								<CartItem
									key={index}
									setCartItems={setCartItems}
									setCart={setCart}
									id={id}
									quantity={cart[id].quantity}
								/>
							))}
						</div>
						<Process cart={cart}/>
					</DrawerBody>
				</DrawerContent>
			</Drawer>
		</>
	);
}

export default Cart;
