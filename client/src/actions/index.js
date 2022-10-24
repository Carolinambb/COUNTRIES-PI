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

/*export const getCountry = (id) => dispatch => {
    return fetch ("http://localhost:3001/api/countries/" + id)
    .then(response => response.json())
    .then(data => {
        dispatch({
            type: 'GET_COUNTRY', 
            payload: data });
    });
};*/


/*

export funcion getCountry(id){
    return async function(dispatch){
        let json = await axios.get("http://localhost:3001/api/countries/" + id)
        .then((res)=> res.json(json))
        .then((data)=>dispatch({
             type: 'GET_COUNTRY', 
            payload: data 
        }))
    }
}
*/
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
    return async function(dispatch){
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


export function filterPopulation(payload){
    return{
        type: "filter_Population",
        payload,
    }
}

/*export function deleteActivity(id){
    return async function(dispatch){
        try {
            const deleteact = await axios.get("http://localhost:3001/api/countries/" + id)
            return dispatch({
                type: 'DELETE_ACTIVITY',
                payload: deleteact
            })
        } catch (error) {
            console.log(error)
        }
    }
}*/


export function deleteActivity(id) {
    return async function (dispatch) {
        try {
            const deleteact = await axios.delete("http://localhost:3001/api/deleted/" + id);
            return dispatch({
                type: 'DELETE_ACTIVITY',
                payload: deleteact,
            });
        } catch (error) {
            console.log(error);
        }
    };
}

export function cleanGame() {
    return {
        type: 'CLEAN_GAME',
        payload: {},
    };
}

export function cleaner() {
    return {
        type: 'CLEANER',
        payload: {},
    };
}

/*export const GET_COUNTRIES = 'GET_COUNTRIES';
export const GET_COUNTRY = 'GET_COUNTRY';
export const GET_BY_NAME = 'GET_BY_NAME';
export const GET_ACTIVITY = 'GET_ACTIVITY';
export const ORDER_BY_NAME = 'ORDER_BY_NAME';
export const FILTER_CONTINENT = 'FILTER_CONTINENT';
export const FILTER_ACTIVITY = 'FILTER_ACTIVITY'*/