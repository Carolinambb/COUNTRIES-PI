import {React, useEffect} from 'react';
import { useParams } from 'react-router';
import { getCountry} from '../actions'
import { useDispatch, useSelector } from 'react-redux';
import ActivityCard from './ActivityCard'
import styles from './CountryDetail.module.css'
import { Link } from 'react-router-dom';

import styles1 from './Button.module.css'

const CountryDetail = () => {
    
    const {countryId} = useParams();
    const dispatch = useDispatch();
  
    
    useEffect(() => {
        dispatch(getCountry(countryId));
      }, [dispatch, countryId]);

    const country = useSelector((state) => state.country)


    return (
        <div className={styles.background}>
            
        <div className={styles.detailsContainer}>
            <div className={styles1.flex}>
            <Link to='/home'>
                <button className={styles1.back}>Go back</button>
            </Link>
            </div>
           <img src={country.flags} alt={country.name} className={`${styles.col} ${styles.countryImage}`}/>
           <div className={`${styles.col} ${styles.countryDetails}`}>
             <p className={styles.firstItem}><strong>Country:</strong> {country.name}</p>
             <p><strong>Continent: </strong>{country.continent}</p>
             <p><strong>Capital:</strong> {country.capital}</p>
             <p><strong>Subregion:</strong> {country.subregion}</p>
             <p><strong>Area:</strong> {country.area} km2</p>
             <p><strong>Population:</strong> {country.population} </p>
             
             <div className={styles.activities}>
             <div className={styles.actContainer}>
             {country.activities && country.activities.map((activity) => 
            
            <ActivityCard 
                name={activity.name} 
                difficulty={activity.difficulty}
                duration={activity.duration}
                season={activity.season}
                 />)}
             </div>
             </div>
            </div>  
        </div>
        </div>
    );
}

export default CountryDetail;
