import logo from './logo.svg';
import './App.scss';
import {BrowserRouter as Router,Routes, Route, Link} from 'react-router-dom'

function App() {
  return (
    <Router>
    <div className='app'>
      <h1>ROUTING BÁSICO</h1>
      {/* Enlaces para movernos entre rutas */}
      <Link to="/">Home</Link><br/>
      <Link to="/contact">Contact</Link><br/>
      <Link to="/user">User</Link><br/>
      <Link to="/error404">Error 404</Link>
      {/* Rutas globales de la web */}
        <Routes>        
            {/*Se utiliza exact cuando queremos que la ruta sea estrictamente como está escrita*/}
            <Route exact path="/" element={<Home/>}/>
            <Route exact path="/contact" element={<Contact/>}/>
            <Route exact path="/user" element={<User/>}/>
            {/* Error 404 */}
            <Route path="*" element={<Error404/>}/>
        </Routes>
      
    </div>
    </Router>
  );
}

function Home() {
  return <h2>Home</h2>
}

function Contact(){
  return <h2>Contact</h2>
}

function User(){
  return <h2>User</h2>
}
function Error404(){
  return <h2>Error 404</h2>
}

export default App;
