import React from 'react';
import styles from './Paginado.module.css'
export default function Paginado ({currentPage, setCurrentPage, countriesPage, allCountries,paginado}) {
    const pageNumbers = [];

        for(let i=1; i<=Math.ceil(allCountries / countriesPage); i++){
            pageNumbers.push(i);
        }
    
        function prevPage() {
            setCurrentPage(currentPage - 1);
          }
          function nextPage() {
            setCurrentPage(currentPage + 1);
          }
    
    return(
        <nav className={styles.pageNumbers}>
            <button disabled={currentPage <= 1} onClick={prevPage}>
       Previous
      </button>
            <ul className={styles.paginado}>

                {pageNumbers &&
                    pageNumbers.map(number => (
                        <li className={styles.numbers} key={number}> 
                            <button onClick={() => paginado(number)} className={styles.number}>{number}</button>
                        </li>
                    ))
                }     
              
            </ul>
            <button  disabled={currentPage >=  28} onClick={nextPage}>
        Next
      </button>
        </nav>
    )
}