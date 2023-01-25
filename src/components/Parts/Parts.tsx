import React from 'react'
import Category from '../Category/Category'

function Parts() {
    const categories = ['WINDOW', 'BRAKES', 'GEARBOX', 'DOOR', 'OTHER']
  return (
    <div>
        {categories.map((category, index) => <Category categoryName={category} key={index}/>)}
    </div>
  )
}

export default Parts