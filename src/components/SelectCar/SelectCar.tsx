import React, { useState } from 'react'
import "./SelectCar.scss"
import { useSelector } from 'react-redux'

function SelectCar() {

  const [selectedCar, setSelectedCar] = useState({
    make: '',
    
  })

  const cars = useSelector(state => state.cars.cars)
  return (
    <div>
      
    </div>
  )
}

export default SelectCar