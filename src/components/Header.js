import { login, logout } from '../firebase';
import { Link } from 'react-router-dom';

function Header(props) {
  return (
    <nav className="nav">
      <Link to="/">
        <div> People App</div>
      </Link>
      <ul>
        { props.user ?
          <>
            <li>Welcome, {props.user.displayName}</li>
            <li>
              <img 
                src={props.user.photoURL} 
                alt={props.user.displayName} 
              />
            </li>
            <li>
              <button onClick={logout}>Logout</button>
            </li>
          </>
          :
          <li>
            <button onClick={login}>Login</button>
          </li>
        }
      </ul>
    </nav>
  )
}

export default Header;
