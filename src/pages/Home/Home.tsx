import { useDisclosure } from '@chakra-ui/react';
import React from 'react'
import Cart from '../../components/Cart/Cart';
import Navbar from '../../components/Navbar/Navbar'
import Parts from '../../components/Parts/Parts'

function Home() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <div>
        <Navbar onOpen={onOpen}/>
        <Parts />
        <Cart isOpen={isOpen} onClose={onClose} />
    </div>
  )
}

export default Home