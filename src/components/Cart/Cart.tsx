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

	

	let partIds = Object.keys(cart);

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
								<CartItem setCart={setCart} id={id} quantity={cart[id].quantity} />
							))}
						</div>
						<Process />
					</DrawerBody>
				</DrawerContent>
			</Drawer>
		</>
	);
}

export default Cart;
