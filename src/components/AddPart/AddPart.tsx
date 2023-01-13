import { useState } from "react"
import { iCar } from "../../pages/Dashboard"
import "./AddPart.scss"
import "../AddCar/AddCar.scss"
import {BsSearch} from 'react-icons/bs'



interface iAddPart {
    cars: iCar[]
}

function AddPart({cars}: iAddPart) {

    const [partNo, setPartNo] = useState<string>()
    const [selectedCars, setSelectedCars] = useState<iCar[]>([])
    const [searchResults, setSearchResults] = useState<iCar[]>([])


    const searchCar = (value: string): void => {

        const length = value.length
        const results = cars.filter((car) => car.make.slice(0, length).toLocaleLowerCase() === value.toLocaleLowerCase())
        setSearchResults(results)

    }

    const addPart = async (e:React.SyntheticEvent) => {
        e.preventDefault()
        const data = {
            part_no: partNo,
            cars: selectedCars
        }

        try {
            const response = await fetch('http://localhost:8000/api/parts/', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data)
            })

            const jsonRes = await response.json()
            console.log('part: ', jsonRes)
        }catch(error) {
            console.log('error: ', error)
        }
    }
  return (
    <div className="add-part">
        <h1 className="heading">Add part</h1>
			<form onSubmit={addPart}>
				<div className="field">
					<label htmlFor="make">Part number</label>
					<input
						type="text"
						onChange={(e) => setPartNo(e.target.value)}
						value={partNo}
                        required
					/>
				</div>
				
                <div className="compartible-cars">
                    <h2>Select compartible cars.</h2>

                    <div className="search">
                        <input onChange={(e) => searchCar(e.target.value)} type="text" placeholder="Car make"/>
                        <BsSearch />
                    </div>
                    <div className="cars">
                        {searchResults.map((result: iCar, index: number) => {
                            return (<div className="field" key={index}>
                                <div className="label">
                                    <p>{result.make}  {result.model} {result.series}</p>
                                    <p>{result.year} {result.engine}</p>
                                </div>
                            <input
                                type="checkbox"
                                onClick={(e) => {
                                    console.log('checked: ', e.currentTarget.checked)
                                    if (e.currentTarget.checked) {
                                        setSelectedCars([...selectedCars, result])
                                    } else {
                                        setSelectedCars(selectedCars.filter(car => car.id !== result.id))
                                    }
                                    
                                }}
                            />
                        </div>)
                        })}
                    </div>
                </div>
				<div className="submit-btn">
					<button type="submit">Add part</button>
				</div>
			</form>
    </div>
  )
}

export default AddPart