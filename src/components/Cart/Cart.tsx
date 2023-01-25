import React from "react";
import "./Cart.scss";
import {
	Drawer,
	DrawerBody,
	DrawerFooter,
	DrawerHeader,
	DrawerOverlay,
	DrawerContent,
	DrawerCloseButton,
	useDisclosure,
} from "@chakra-ui/react";

import { getCookie } from "../../cart";
import CartItem from "../CartItem/CartItem";

function Cart({ isOpen, onClose }) {
	const btnRef = React.useRef();

	const cart = JSON.parse(getCookie("cart") as string);
	

	const partIds = Object.keys(cart);

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
								<CartItem id={id} quantity={cart[id].quantity} />
							))}
						</div>
					</DrawerBody>
				</DrawerContent>
			</Drawer>
		</>
	);
}

export default Cart;
