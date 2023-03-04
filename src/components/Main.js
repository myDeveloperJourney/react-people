import { useEffect, useState, useRef } from 'react';
import { Routes, Route } from 'react-router-dom';
import Index from '../pages/Index';
import Show from '../pages/Show';

function Main(props) {
  const [people, setPeople] = useState(null);

  const API_URL = 'http://localhost:3001/people'

  const getPeople = async () => {
    
    try {
      if(props.user) {
        const token = await props.user.getIdToken();
        const response = await fetch(API_URL, {
          method: 'GET',
          headers: {
            'Authorization': 'Bearer ' + token
          }
        });
        const data = await response.json();
        setPeople(data);
      }
    } catch (error) {
      // we can handle the error now
      // ex. make modal pop up to tell user something went wrong
    }
  }
  
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

  // create the mutable reference
  const getPeopleRef = useRef(); // { current: undefined }

  useEffect(() => {
    getPeopleRef.current = getPeople;
    // set the mutable reference to the object that needs to persist between renders
  });

  useEffect(() => {
    if(props.user) {
      getPeopleRef.current();
    } else {
      setPeople(null);
    }
  }, [props.user]); 
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
