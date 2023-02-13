import React from 'react'
import Category from '../Category/Category'
import "./Parts.scss"


function Parts({setCart}) {
    const categories = ['WINDOW', 'BRAKES', 'GEARBOX', 'DOOR', 'OTHER']
  return (
    <div className='parts'>
        {categories.map((category, index) => <Category setCart={setCart} categoryName={category} key={index}/>)}
    </div>
  )
}

export default Parts