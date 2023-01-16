import React from 'react'
import CustomTable from '../Table/Table'

function Parts({parts}) {

    const tableColumns = [
        'Part No.',
        'Cars'
    ]

    const tableRows = parts.map((part) => ({
        part_no: part.part_no,
        cars: part.cars.length
    }))
  return (
    <div>
        <CustomTable
				totalRegisters={parts.length}
				tableColumns={tableColumns}
				tableData={tableRows}
                title="Parts"
			/>
    </div>
  )
}

export default Parts