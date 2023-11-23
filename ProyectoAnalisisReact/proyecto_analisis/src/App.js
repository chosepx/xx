import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import SignUp from './SignUp';
import EditUser from './EditUser';
import ShowUsers from './ShowUsers';

import RegisterProduct from './RegisterProduct';
import EditProduct from './EditProduct';
import ShowProducts from './ShowProducts';
import ReparacionesView from './Reparaciones';
import AgregarReparacionForm from './AgregarReparacion';
import EditarReparacion from './EditarReparacion';

import Home from './Home';
import RegisterUser from './RegisterUser';
import Navbar from './NavBar';
import Footer from './Footer';
import ListaCitas from './ListaCitas';
import AgregarCita from './AgregarCita';
import EditarCita from './EditarCita';

function App() {

  const [isLogin,setIsLogin]=useState(false);
  const [isSignUp,setIsSignup]=useState(false);
  const [isAdmin,setIsAdmin]=useState(false);

  return (

    <>  
    <Router>
    <Navbar isLogin={isLogin} isSignUp={isSignUp} isAdmin= {isAdmin}/>
     <Routes>      
        <Route path="/" element={<Login setIsLogin={setIsLogin} setIsSignup={setIsSignup} setIsAdmin= {setIsAdmin}/>} /> 
        <Route path="/login" element={<Login setIsLogin={setIsLogin} setIsSignup={setIsSignup} setIsAdmin= {setIsAdmin}/>} /> 
        <Route path="/signup" element={<SignUp setIsLogin={setIsLogin} setIsSignup={setIsSignup} setIsAdmin= {setIsAdmin}/>} />
        <Route path="/EditUser/:id" element={<EditUser />} />

        

        <Route path="/ShowUsers" element={<ShowUsers setIsLogin={setIsLogin} setIsSignup={setIsSignup} setIsAdmin= {setIsAdmin}/>} />


        <Route path="/registerProduct" element={<RegisterProduct/>} />
        <Route path="/EditProduct/:code" element={<EditProduct />} />
        <Route path="/ShowProducts" element={<ShowProducts />} />



        <Route path="/reparaciones" element={<ReparacionesView />} />
        <Route path="/agregarReparacion" element={<AgregarReparacionForm />} />
        <Route path="/editarReparacion/:id" element={<EditarReparacion />} />


        <Route path="/citas" element={<ListaCitas />} />
        <Route path="/agregarCita" element={<AgregarCita />} />
        <Route path="/editarCita/:id" element={<EditarCita />} />


        <Route path="/Home" element={<Home setIsLogin={setIsLogin} setIsSignup={setIsSignup} setIsAdmin= {setIsAdmin}/>} />
        <Route path="/registerUser" element={<RegisterUser/>} />


      </Routes>
      <Footer />
    </Router>
    </>
    
  );
}

export default App;
