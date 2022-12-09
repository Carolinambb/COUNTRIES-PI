import React from "react";
import { useEffect, useState} from "react";
import {useDispatch, useSelector} from 'react-redux'
import {getCountries, filterByContinent, filterByActivity, getActivities, orderPopulation, orderName}  from '../actions'
import {Link} from 'react-router-dom'
import CountryCard from './CountryCard'
import Paginado from "./Paginado"
import SearchBar from "./SearchBar";
import styles from './Home.module.css'
import styles1 from './Button.module.css'

export default function Home(){
    const dispatch = useDispatch();
    
    const allCountries = useSelector((state) => state.countries)

    const allActivities = useSelector((state) => state.activities)

    const [currentPage, setCurrentPage] = useState(1)
    // Cantidad de paises por pagina
    const [countriesPage, setCountriesPage] = useState(9)

    const [order, setOrder] = useState('')
    //Posicion del ultimo pais
    const LastCountry = currentPage * countriesPage
    //Posicion del primer pais
    const FirstCountry = LastCountry - countriesPage
    // Se divide el array de acuerdo a la cantidad de paises necesarios (9)
    const currentCountries = allCountries.slice(FirstCountry, LastCountry)


        const paginado = (pageNumbers)=>{
            setCurrentPage(pageNumbers)
        }
  

    useEffect(() => {
        dispatch(getCountries(),
        dispatch(getActivities())); 
    }, [dispatch, ])

    //cargar nuevamente
     const handleClick = (event) => {
        event.preventDefault();
        dispatch(getCountries())
     }

     function handleOrderPopulation(e){ 
        e.preventDefault();
        dispatch(orderPopulation(e.target.value))
        setCurrentPage(1)
        setOrder(`Ordenado ${e.target.value}`)
       }

    function handleSort(event){
        event.preventDefault();
        dispatch(orderName(event.target.value));
        setCurrentPage(1);
        setOrder(`Ordenado ${event.target.value}`)
    }

    function handleFilterContinent(event){
        // Se toma como payload el value de la option que elija el usuario
        event.preventDefault();
        dispatch(filterByContinent(event.target.value));
        setCurrentPage(1);
    }

    function handleFilterActivity(event){
        dispatch(filterByActivity(event.target.value))
       // console.log(event.target.value)
    }
   
    return (
         <React.Fragment>
        <div className={styles.wallpaper}>
               
                {/*<Link to='/'>
                <button className={styles.title}>Países del mundo</button>
    </Link>*/}
                <div className={styles.center}>
                    <Link to='/activity' className={styles.button50} role="button">Create your activity!</Link>
                </div>     
            <SearchBar  setCurrentPage ={setCurrentPage}/>          


         <div className={styles.reloadButton}>
            <button className={styles1.reload} onClick={event => handleClick(event)}>Reload</button>
        </div>   
        <div>

            <div className={styles.selectGap}>
            <select onChange={(e)=> handleOrderPopulation(e)} className={styles1.select}>
                {/*  cantidad de poblacion
                 */}
               <option hidden value="all">Sort by population</option>
                    <option value="low">Low</option>
                    <option value="high">High</option>
            </select> 
            <select onChange={event => handleSort(event)} className={styles1.select}>
                {/* ascendente y descendente por orden alfabetico 
                 */}
                <option hidden value="all">Sort by name</option> 
                <option value="asc">A to Z </option>
                <option value="desc">Z to A </option>
            </select>
            <select onChange={event => handleFilterContinent(event)} className={styles1.select}>
                {/* filtrar por continente y por tipo de actividad turística */}
                <option value="All">All continents</option>
                <option value="Africa">Africa</option>
                <option value="North America">North America</option>
                <option value="South America">South America</option>
                <option value="Antarctica">Antarctica</option>
                <option value="Asia">Asia</option>
                <option value="Europe">Europe</option>
                <option value="Oceania">Oceania</option>
            </select>

            <select onChange={event => handleFilterActivity(event)} className={styles1.select}>
                <option value="All">All activities</option>
                { allActivities && allActivities.map(activity => (
                    <option value={activity.name} key={activity.id}>{activity.name}</option>
                ))} 
            </select >        
            </div> 

            <ul className={styles.countriesGrid}>

            {  currentCountries?.map(country => (
                <CountryCard 
                name={country.name} 
                flags={country.flags} 
                continent={country.continent}  
                id={country.id}
                key={country.id}/>
    
            ))}
            </ul>
           
            <Paginado 
                countriesPage={countriesPage}
                allCountries={allCountries.length}
                paginado={paginado}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
            />

        </div>
        </div>
        </React.Fragment>
    )
    
}


/* const LastCountry = currentPage * countriesPage  

    if(LastCountry===10){
        var FirstCountry = 1;
    }
    else{
        FirstCountry = LastCountry -countriesPage
    }
    // Se divide el array de acuerdo a la cantidad de paises necesarios (9)
    const currentCountries = allCountries.slice(FirstCountry-1, LastCountry-1)

    const [order, setOrder] = useState('')*/