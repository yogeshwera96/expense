import { useState } from "react";
import styled from 'styled-components';
import { useLogin } from "../hooks/useLogin";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, error, isLoading} = useLogin();
    const [isLoggedIn, setIsLoggedIn] = useState(false);  // New state to track login status

    const handleSubmit = async (e) => {
        e.preventDefault();

        const success = await login(email, password);

        if (success) {
            setIsLoggedIn(true);  // Set the login state to true on successful login
        }
    };

    return (
        <>
            {isLoggedIn ? (
                <SuccessMessage>You're logged in successfully!</SuccessMessage>
            ) : (
                <LoginForm onSubmit={handleSubmit}>
                    <h3>Log in</h3>

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

                    <Button disabled={isLoading}>Log in</Button>
                    {error && <ErrorMessage>{error}</ErrorMessage>}
                </LoginForm>
            )}
        </>
    );
};

export default Login;

// Styled Components
const LoginForm = styled.form`
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

const ErrorMessage = styled.div`
    color: red;
    margin-top: 1rem;
`;

const SuccessMessage = styled.div`
    max-width: 400px;
    margin: auto;
    padding: 2rem;
    border: 1px solid #4CAF50;
    border-radius: 10px;
    background: #e0ffe0;
    text-align: center;
    font-size: 1.2rem;
    color: #4CAF50;
`;
