import React, { useState, useMemo } from 'react';
import styled from "styled-components";
import bg from './img/bg.png';
import { MainLayout } from './styles/Layouts';
import Orb from './Components/Orb/Orb';
import Navigation from './Components/Navigation/Navigation';
import Dashboard from './Components/Dashboard/Dashboard';
import Income from './Components/Income/Income';
import Expenses from './Components/Expenses/Expenses';
import Home from './pages/Home'; // Import the Home component
import { useGlobalContext } from './context/globalContext';
import { useAuthContext } from './context/AuthContext';
import backgroundImage from '../src/img/background.jpg'


function App() {
  const { user } = useAuthContext();  // Get user authentication status
  const [active, setActive] = useState(1);  // Set 1 as Home initially

  const global = useGlobalContext();
  console.log(global);

  // Function to conditionally render components based on active state
  const displayData = () => {
    switch (active) {
      case 1:
        return <Home />;  // Home is always visible
      case 2:
        return user ? <Dashboard /> : <p>You must be logged in to view the dashboard</p>;  // Dashboard visible only if logged in
      case 3:
        return user ? <Income /> : <p>You must be logged in to view income</p>;  // Income visible only if logged in
      case 4: 
        return user ? <Expenses /> : <p>You must be logged in to view expenses</p>;  // Expenses visible only if logged in
      default: 
        return <Home />;  // Default to Home
    }
  };

  const orbMemo = useMemo(() => {
    return <Orb />;
  }, []);

  return (

    
    <AppStyled bg={bg} className="App">
      {orbMemo}
      <MainLayout>
        <Navigation active={active} setActive={setActive} />
        <main>
          
          {displayData()}
        </main>
      </MainLayout>
    </AppStyled>
  );
} 

const AppStyled = styled.div`
  height: 100vh;
  background-image: url(${props => props.bg});
  position: relative;
  main{
  
  
  
    flex: 1;
    background: rgba(252, 246, 249, 0.78);
    border: 3px solid #FFFFFF;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    overflow-x: hidden;
    &::-webkit-scrollbar{
      width: 0;
    }
  }
    p {
    padding: 10px;
    text-align: center;
    }
`;

export default App;
