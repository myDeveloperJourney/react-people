import { auth } from './firebase';
import { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Main from './components/Main';

function App() {
  const [ user, setUser ] = useState(null);

  useEffect(() => {
    // think of this as an event listener
    auth.onAuthStateChanged(user => setUser(user));
    // the "event" is when a user logs in or logs out with Google firebase
  }, []);

  return (
    <div className="App">
      <Header user={user} />
      <Main user={user} />
    </div>
  );
}

export default App;
