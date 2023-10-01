import React, { createContext, useContext, useReducer } from 'react'

export const Data = createContext();
export const Datalayer = ({reducer,initialState,children}) => {
  return (
    <Data.Provider value = {useReducer(reducer,initialState)}>
        {children}
    </Data.Provider>
  )
}

export const useDataValue = () => useContext(Data);
// export default Datalayer