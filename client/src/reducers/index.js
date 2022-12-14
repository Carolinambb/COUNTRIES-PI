const initialState = {
    // Estado para renderizar, se usa para hacer el filtrado
    countries : [],
    // Estado soporte que siempre tiene todos los paises 
    allCountries : [],
    activities : [],
    country: [], //para el detail 

}

function rootReducer(state = initialState, action){
    switch (action.type) {
        case "GET_COUNTRIES":
            return {
                ...state,
                countries: action.payload,
                allCountries: action.payload
            } 
        case "GET_BY_NAME":
            return {
                ...state,
                countries: action.payload
            }      
        case "GET_COUNTRY": 
        return {
            ...state,
            country: action.payload
        }    
        case "GET_ACTIVITY":
            return {
                ...state,
                activities: action.payload
            }    
        /*case "POST_ACTIVITY":
            return{
                ...state
            }*/
        case "ORDER_BY_NAME":
            let sortedCountries = action.payload === 'asc' ?
            state.countries.sort((a,b) => a.name.localeCompare(b.name)) :
            state.countries.sort((a,b) => b.name.localeCompare(a.name));
             return{
                ...state,
                countries: sortedCountries
            }    
        case "FILTER_CONTINENT":
            const allCountries = state.allCountries
            const continentFilter = action.payload === 'All' ?
            allCountries : allCountries.filter(country => 
                country.continent === action.payload)    

            return{
                ...state,
                countries : continentFilter
            }   
        case "FILTER_ACTIVITY":
            const allCountriesAct = state.allCountries
            const activitiesFilter = action.payload === 'All' ?
            allCountriesAct : allCountriesAct.filter(country => 
                country.activities && country.activities.map(el => el.name).includes(action.payload))

            return{
                ...state,
                countries: activitiesFilter
            }     

            case "ORDER_BY_POPULATION":
                let orderPopulation = action.payload === 'high' ?
                state.countries.sort((a,b)=> a.population < b.population ? 1 : -1)
                :
                state.countries.sort((a,b)=> a.population < b.population ? -1 : 1)
                //console.log(state.countries)

                return{
                    ...state,
                    countries: orderPopulation
                }  

           
        default :
        return state;    
    }
}

export default rootReducer;