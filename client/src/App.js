import './App.css';
import React, { useEffect, useState } from 'react';
import { Router } from "@reach/router";
import io from 'socket.io-client';

import TriviaList from './components/TriviaHome';
import TriviaForm from './components/TriviaForm';
import Update from './components/EditTrivia';
import PlayTrivia from './components/PlayTrivia';
import Navigation from './components/Navigation';
import Home from './view/Home';
import { GlobalContext } from './context/GlobalContext';
import Login from './components/Login';
import Register from './components/Register';
import Admin from './view/Admin';
import Winner from './components/Winner';
import Footer from './components/Footer';

function App() {

  const [userId, setuserId] = useState("")
  const [userInfo, setuserInfo] = useState("")
  const [TriviaList, setTriviaList] = useState({})
  const [socket] = useState(() => io(':8001'));
  const [toggle, setToggle] = useState(false)
  const [activeQuestion, setActiveQuestion] = useState(0)

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Socket connected. Your id is: ' + socket.id);
    })
    return () => socket.disconnect(true);
  }, []);

  return (
    <GlobalContext.Provider value={{userId, setuserId, userInfo, setuserInfo, TriviaList, setTriviaList, activeQuestion, setActiveQuestion}}>
      <div className="App">
        <Navigation />
        <Router>
          <Home path="/" />
          <TriviaForm path="/new" />
          <TriviaList path="/list" />
          <Update path="/trivias/:id/edit" />
          <PlayTrivia path="/game" socket={socket} />
          <Login path="/login" />
          <Register path='/Register' />
          <Admin path="/admin" />
          <Winner path="/winner" socket={socket}/>
        </Router>
        <Footer />
      </div>
    </GlobalContext.Provider>
  );
}

export default App;
