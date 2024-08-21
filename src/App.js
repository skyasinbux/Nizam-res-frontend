import React from 'react';
import {Routes,Route} from 'react-router-dom';
import { Home, PartyOrder} from './container';
import { Navbar } from './components';
import './App.css';
import TbBooking from './container/TbBooking/TbBooking';
import Footer from '../src/container/Home/Footer';
import Menu from '../src/container/Home/Menu';







const App = () => (
  <>
  <div>
  <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/book' element={<TbBooking/>} />
        <Route path='/order' element={<PartyOrder/>} />
        <Route path='/menu' element={<Menu/>} />

      </Routes>
  <Footer/>
  </div>
  </>

);

export default App;
