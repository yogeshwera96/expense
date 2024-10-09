import { useState } from 'react'
import { useAuthContext } from './useAuthContext'

export const useSignup = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const { dispatch } = useAuthContext()

  const signup = async (email, password, username) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/user/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, username })  // Include username
      })

     
        const json = await response.json();
     

      if (!response.ok) {
        setIsLoading(false)
        setError(json.error || 'Something went wrong')
      } else {
        // Save the user to local storage
        localStorage.setItem('user', JSON.stringify(json))

        // Update the auth context
        dispatch({ type: 'LOGIN', payload: json })

        // Update loading state
        setIsLoading(false)
      }
    } catch (err) {
      setError('Failed to sign up. Please try again later.');
      setIsLoading(false);
    }
  }

  return { signup, isLoading, error }
}
