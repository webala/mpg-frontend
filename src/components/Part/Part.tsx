import React from 'react'
import placeholder from '../../assets/placeholder.png'
import "./Part.scss"

function Part({part}) {
  return (
    <div className='part'>
        <img src={placeholder} alt="temp-placeholder" />
        <div>
            <p>{part.name}</p>
            <p>{part.part_no}</p>
        </div>
    </div>
  )
}

export default Part