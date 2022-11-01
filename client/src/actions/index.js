import axios from 'axios'

export function getCountries(){
    return async function(dispatch){
        let json = await axios.get('http://localhost:3001/api/countries');
        return dispatch({
            type: 'GET_COUNTRIES',
            payload: json.data 
              
        })
    }
}


export function getCountry(id){
    return async function(dispatch){
        let json = await axios.get("http://localhost:3001/api/countries/" + id)
        return dispatch({
            type: 'GET_COUNTRY', 
            payload: json.data
        })
    }
}


export function getActivities(){
    return async function(dispatch){
        let json = await axios.get('http://localhost:3001/api/activity');
        return dispatch({
            type: 'GET_ACTIVITY',
            payload: json.data   
        })
    }
}

export function postActivity(payload){
    return async function(){
        let json = await axios.post('http://localhost:3001/api/activity', payload);
        return json;
    }
}

export function getByName(name){
    return async function(dispatch){
        try {
            let json = await axios.get('http://localhost:3001/api/countries?name=' + name);
            return dispatch({
                type: 'GET_BY_NAME',
                payload: json.data
            })
        } catch (error) {
            alert('No se pudo encontrar el pais')
        }
    }
}

export function orderName(payload){
    return {
        type: 'ORDER_BY_NAME',
        payload
    }
} 

export function filterByContinent(payload){
    return {
        type: 'FILTER_CONTINENT',
        payload
    }
}

export function filterByActivity(payload){
    return {
        type: 'FILTER_ACTIVITY',
        payload
    }
}

export function orderPopulation(payload){
    return{
        type: "ORDER_BY_POPULATION",
        payload
    }
} 
