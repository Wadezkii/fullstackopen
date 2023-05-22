import React from 'react'

const Filter = ({ filter, handleFilterChange, filterPersons, resetFilter}) => {
    return (
        <div>
          <form onSubmit={(event) => event.preventDefault()}>
            <input value={filter} onChange={handleFilterChange} />
            <button onClick={filterPersons}>filter</button>
            <button onClick={resetFilter}>reset filter</button>
          </form>
        </div>
      )
}

export default Filter