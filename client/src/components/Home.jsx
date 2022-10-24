import React from "react";
import { useEffect, useState} from "react";
import {useDispatch, useSelector} from 'react-redux'
import {getCountries, filterByContinent, filterByActivity, getActivities, orderPopulation, orderName, filterPopulation}  from '../actions'
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

    // Mientras se cargan los paises

    //const[isLoading, setIsLoading] = useState(true);

    // Pagina actual 
    const [currentPage, setCurrentPage] = useState(1)
    // Cantidad de paises por pagina
    const [countriesPage, setCountriesPage] = useState(10)  
    //Posicion del ultimo pais
    const LastCountry = currentPage * countriesPage  

    if(LastCountry===10){
        var FirstCountry = 1;
    }
    else{
        FirstCountry = LastCountry -countriesPage
    }
    // Se divide el array de acuerdo a la cantidad de paises necesarios (9)
    const currentCountries = allCountries.slice(FirstCountry-1, LastCountry-1)

    const [order, setOrder] = useState('')

    const paginado = (totalPages)=>{
        setCurrentPage(totalPages);
    }
  
    

    useEffect(() => {
        //setIsLoading(true)
        dispatch(getCountries(),
        dispatch(getActivities()));
        //setIsLoading(false)
    }, [dispatch, ]) //Si alguno de estos valores cambia, se vuelve a ejecutar

    // if(isLoading){
    //     return <div>Cargando...</div>
    // }

    //cargar nuevamente
     const handleClick = (event) => {
        event.preventDefault();
        dispatch(getCountries())
     }

     function handleOrderPopulation(e){ //MAYOR O MENOR
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
        // Se toma como payload el value de la option que elija el usuario
        dispatch(filterByActivity(event.target.value))
        console.log(event.target.value)
    }

    function handleFiltermayor(e){
        // Se toma como payload el value de la option que elija el usuario
        //dispatch(filterPopulation())
            //(event.target.value))
        //console.log(event.target.value)

        e.preventDefault();
        dispatch(filterPopulation(e.target.value))
        setCurrentPage(1)
        setOrder(`Ordenado ${e.target.value}`)
    }

   


    return (
         <React.Fragment>
        <div className={styles.wallpaper}>
               
                {/*<Link to='/'>
                <button className={styles.title}>Países del mundo</button>
    </Link>*/}
                <div className={styles.center}>
                    <Link to='/activity' className={styles.button50} role="button">Crea tu actividad!</Link>
                </div>     
            <SearchBar  setCurrentPage ={setCurrentPage}/>          


         <div className={styles.reloadButton}>
            <button className={styles1.reload} onClick={event => handleClick(event)}>Cargar paises nuevamente</button>
        </div>   
        <div>



            <div className={styles.selectGap}>
            <select onChange={(e)=> handleOrderPopulation(e)} className={styles1.select}>
                {/** Deben ser filtrados ascendente y descendente por orden alfabetico y por cantidad de poblacion
                 */}
               <option hidden value="all">Ordenar por poblacion</option>
                    <option value="low">Descendente</option>
                    <option value="high">Ascendente</option>
            </select> 
            <select onChange={event => handleSort(event)} className={styles1.select}>
                {/** Deben ser filtrados ascendente y descendente por orden alfabetico y por cantidad de poblacion
                 */}
                <option hidden value="all">Ordenar por nombre</option> 
                <option value="asc">Ascendente</option>
                <option value="desc">Descendente</option>
            </select>
            <select onChange={event => handleFilterContinent(event)} className={styles1.select}>
                {/* filtrar por continente y por tipo de actividad turística */}
                <option value="All">Todos</option>
                <option value="Africa">Africa</option>
                <option value="North America">America del Norte</option>
                <option value="South America">America del Sur</option>
                <option value="Antarctica">Antartica</option>
                <option value="Asia">Asia</option>
                <option value="Europe">Europa</option>
                <option value="Oceania">Oceania</option>
            </select>

            <select onChange={event => handleFilterActivity(event)} className={styles1.select}>
                <option value="All">Todas</option>
                { allActivities && allActivities.map(activity => (
                    <option value={activity.name} key={activity.id}>{activity.name}</option>
                ))} 
            </select >
            
            </div> 
          <div>
            <select onChange={event => handleFiltermayor(event)} >
            <option value="All">Todos</option>
            <option value="mayor ">mayor</option>
            </select>
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
            />

        </div>
        </div>
        </React.Fragment>
    )
    
}




/*      <header className={styles.titleContainer}> 
    </header>


    {/* Se hace el map sobre el nuevo array de countries, para renderizar solo los 
            necesarios por pagina */
            //{ isLoading ? <img src='../images/loading.gif' alt='Cargando...'/> :  }*/
            
            
            ///pagindo preivs y next 

            /*
   const prev = (event) => {
         event.preventDefault();
   
         if(currentPage <= 1){
            setCurrentPage(1)
         } else {
             setCurrentPage(currentPage - 9)
         }
     }

     const next = (event) => {
       event.preventDefault();
 
        if(currentCountries < 9){
            return;
        } else {
            setCurrentPage(currentPage + 9)
        }
     }


             <button onClick={(event) => {prev(event)}}
            disabled={currentPage <= 1 }>Prev</button>

            <button onClick={(event) => {next(event)}}
            disabled={currentCountries < 9 }>Next</button> 
          
          
          
          
          
          filtro nuevo
            <div>  
      <label>Filtro Habitantes: </label>
      <button onClick={e => handleFilterHabitantes(e)}>FiltroNuevo
      </button>
      </div>
        */

