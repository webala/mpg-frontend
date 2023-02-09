import { useDisclosure } from '@chakra-ui/react';
import React, { useState } from 'react'
import { getCookie } from '../../cart';
import Cart from '../../components/Cart/Cart';
import Navbar from '../../components/Navbar/Navbar'
import Parts from '../../components/Parts/Parts'
import Hero from '../../components/Hero/Hero';

function Home() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [cart, setCart] = useState(JSON.parse(getCookie("cart") as string))
  return (
    <div>
        <Hero onOpen={onOpen}/>
        <Parts setCart={setCart}/>
        <Cart setCart={setCart} cart={cart} isOpen={isOpen} onClose={onClose} />
    </div>
  )
}

export default Home