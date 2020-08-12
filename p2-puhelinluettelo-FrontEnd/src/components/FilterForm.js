import React from 'react'

const FilterForm = (props) => {

    const handleFilterChange = (event) => {
        props.setFilter(event.target.value)
      }
 return (
     <div>
         filter shown with
         <input
         value={props.filter}
         onChange={handleFilterChange}
         />
     </div>
 )
}
export default FilterForm