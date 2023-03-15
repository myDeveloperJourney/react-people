import { useEffect, useState, useCallback } from 'react';
import { Routes, Route } from 'react-router-dom';
import Index from '../pages/Index';
import Show from '../pages/Show';


function Main(props) {
  const [people, setPeople] = useState(null);

  const API_URL = 'https://people-api-v1.herokuapp.com/people';

  const getPeople = useCallback(async () => {
    try {
      const token = await props.user.getIdToken();
      const response = await fetch(API_URL, {
          method: 'GET',
          headers: {
            'Authorization': 'Bearer ' + token
          }
      });
      const data = await response.json();
      setPeople(data);
    } catch (error) {
      console.log(error)
    }
  }, [props.user]);

  
  const createPeople = async (person) => {
    try {
      if(props.user) {
        const token = await props.user.getIdToken();
        await fetch(API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'Application/json',
            'Authorization': 'Bearer ' + token
          },
          body: JSON.stringify(person),
        });
        getPeople();
      }
    } catch (error) {
      // TODO: Add a task we wish to perform in the event of an error
    }
  }

  useEffect(() => {
    if(props.user) {
      getPeople();
    } else {
      setPeople(null);
    }
  }, [props.user, getPeople]); 
  // based on this config; it will run one time as soon as the component mounts to the DOM

  return (
    <main>
      <Routes>
        <Route path="/" element={<Index user={props.user} people={people} createPeople={createPeople}/>} />
        <Route path="/people/:id" element={<Show />} />
      </Routes>
    </main>
  )
}

export default Main;
