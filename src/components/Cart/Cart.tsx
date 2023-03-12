import React from "react";
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
import { useSelector } from "react-redux";
import { CartItem as CartItemShape, GlobalState } from "../../interface";

type CartProps = {
	cart: object,
	setCart: Function,
	onClose: () => void,
	isOpen: boolean,
}
function Cart({ cart, setCart, isOpen, onClose }:CartProps) {
	const btnRef = React.useRef<HTMLButtonElement>(null);

	// const cartItems: CartItemShape[] = useSelector((state:GlobalState) => state.cart.cartItems);

	// let partIds = Object.keys(cart);

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
							{/* {cartItems.map((item:CartItemShape , index:number) => (
								<CartItem
									key={index}
									setCart={setCart}
									id={item.productId}
									quantity={item.quantity}
								/>
							))} */}
						</div>
						<Process cart={cart}/>
					</DrawerBody>
				</DrawerContent>
			</Drawer>
		</>
	);
}

export default Cart;
