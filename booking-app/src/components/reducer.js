
const details = JSON.parse(localStorage.getItem("details"))
// const [details, setdetails] = useState(localStorage.getItem("details"))
export const initialState ={
    dates: details?.date,
    city: details?.destination,
    option:{
        children: details?.option?.children,
        rooms: details?.option?.rooms,
        adults: details?.option?.adults,
    },
    data: undefined,
}

export const reducer = (state, action) =>{
    switch(action.type){
        case "NEW_SEARCH":
            const details = JSON.parse(localStorage.getItem("details"))
            return {
                ...state,
                dates: details?.date,
                city: details?.destination,
                option:{
                    children: details?.option.children,
                    rooms: details?.option.rooms,
                    adults: details?.option.adults,
                },
                data: undefined,
            }
        case "RESET_SEARCH":
            return initialState
        case "SET_DATA":
            return{
                ...state,
                data : action.payload
            } 
        default:
            return state
    }
}