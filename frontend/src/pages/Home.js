// src/Components/Home/Home.js
import React from 'react';
import styled from 'styled-components';

function Home() {
    return (
        <HomeStyled>
            <h1>Welcome to the Expenses Tracker</h1>
            <p>Track your income and expenses efficiently</p>
            {/* Add any other components or stats you want here */}
        </HomeStyled>
    );
}

const HomeStyled = styled.div`
    padding: 2rem;
    text-align: center;
    h1 {
        color: #222260;
        font-size: 2.5rem;
        margin-bottom: 1.5rem;
    }
    p {
        color: rgba(34, 34, 96, 0.7);
        font-size: 1.2rem;
    }
`;

export default Home;
