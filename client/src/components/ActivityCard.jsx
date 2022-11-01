import {React} from 'react';
import styles from './ActivityCard.module.css';

export default function ActivityCard (activity) {

  return (
        <div className={styles.card}>
        {activity && (
             
                <p key={activity.id}>
            <p><strong>Activity: </strong>{activity.name}</p>
            <p><strong>Difficulty: </strong>{activity.difficulty}</p>
            <p><strong>Duration: </strong>{activity.duration}</p>
            <p><strong>Season: </strong>{activity.season}</p>
            </p> 
            
            )  }       
        </div>
        
    );
};