import { useState } from "react";
import { Link } from "react-router-dom";

function Index(props) {
  const [person, setPerson] = useState({
    name: "",
    image: "",
    title: ""
  });

  // What are the events a form and form inputs can trigger?
  // Submit & On Change
  // MERGE
  const handleChange = (event) => {
    setPerson((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  }

  const handleSubmit = (event) => { 
    event.preventDefault();
    props.createPeople(person);
    setPerson({
      name: '',
      image: '',
      title: '',
    });
  }


  const loaded = () => {
    return props.people.map((person) => (
      <div key={person._id} className="person">
        <Link to={`/people/${person._id}`}>
          <h1>{person.name}</h1>
        </Link>
        <h3>{person.title}</h3>
      </div>
    )
  )};

  const loading = () => {
    return <h1>Loading...</h1>;
  };
    
  return (
    <>
      {
        !props.user ?
        <h2>Please Login</h2>
        :
        <section className="person-section">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={person.name}
              name="name"
              placeholder="name"
              onChange={handleChange}
            />
            <input
              type="text"
              value={person.image}
              name="image"
              placeholder="image URL"
              onChange={handleChange}
            />
            <input
              type="text"
              value={person.title}
              name="title"
              placeholder="title"
              onChange={handleChange}
            />
            <input type="submit" value="Create Person" />
          </form>
          {props.people ? loaded() : loading()}
        </section>
      }
    </>
    
  );
}

export default Index;
