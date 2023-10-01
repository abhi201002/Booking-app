import React, { createContext, useContext, useEffect, useReducer } from 'react'

export const Auth = createContext();
export const Authlayer = ({reducer,initialState,children}) => {
  // const [state, dispatch] = useAuthValue()
  
  return (
    <Auth.Provider value = {useReducer(reducer,initialState)}>
        {children}
    </Auth.Provider>
  )
}

export const useAuthValue = () => useContext(Auth);
// export default Datalayer