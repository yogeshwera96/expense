import { useState } from "react";
import styled from 'styled-components';
import { useSignup } from "../hooks/useSignup";

const Signup = () => {
    const [ username, setUsername ] = useState(' ')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { signup, error, isLoading} = useSignup()

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        await signup(email, password, username);  // Pass username as an argument
    };
    return (
        <SignupForm onSubmit={handleSubmit}>
            <h3>Sign up</h3>
            <label>username:</label>
            <Input
                type="username"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
            />

            <label>Email:</label>
            <Input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
            />

            <label>Password:</label>
            <Input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            />

            <Button disabled={isLoading}>Sign up</Button>
            {error && <div className="error">{error}</div>}
        </SignupForm>
    );
};

export default Signup;

// Styled Components
const SignupForm = styled.form`
    max-width: 400px;
    margin: auto;
    padding: 2rem;
    border: 1px solid #ddd;
    border-radius: 10px;
    background: #fff;
    text-align: center;

    h3 {
        margin-bottom: 1rem;
    }

    label {
        display: block;
        margin-bottom: 0.5rem;
        text-align: left;
        font-weight: bold;
    }
`;

const Input = styled.input`
    width: 100%;
    padding: 0.75rem;
    margin-bottom: 1rem;
    border-radius: 5px;
    border: 1px solid #ddd;
    font-size: 1rem;

    &:focus {
        border-color: #6c63ff;
        outline: none;
    }
`;

const Button = styled.button`
    width: 100%;
    padding: 0.75rem;
    background: #6c63ff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1rem;
    font-weight: bold;

    &:hover {
        background-color: #5750f0;
    }
`;
