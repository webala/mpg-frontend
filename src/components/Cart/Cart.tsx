import React, { useEffect, useState, } from "react";
import "./Cart.scss";
import {
	Drawer,
	DrawerBody,
	DrawerHeader,
	DrawerOverlay,
	DrawerContent,
	DrawerCloseButton,
} from "@chakra-ui/react";
import CartItem from "../CartItem/CartItem";
import Process from "../Process/Process";

type CartProps = {
	cart: object,
	setCart: Function,
	onClose: () => void,
	isOpen: boolean,
}
function Cart({ cart, setCart, isOpen, onClose }:CartProps) {
	const btnRef = React.useRef<HTMLButtonElement>(null);

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
							{partIds.map((id:string, index:number) => (
								<CartItem
									key={index}
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
