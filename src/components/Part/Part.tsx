import React from 'react'
import placeholder from '../../assets/placeholder.png'
import "./Part.scss"
import {FaCartArrowDown} from 'react-icons/fa'
import { modifyCartCookie } from '../../cart'

function Part({part}) {
 
  return (
    <div className='part'>
        <img src={placeholder} alt="temp-placeholder" />
        <div>
            <p>{part.name}</p>
            <p className='add-to-cart' onClick={() => {modifyCartCookie('add', part.id)}}><FaCartArrowDown /></p>
        </div>
    </div>
  )
}

export default Part