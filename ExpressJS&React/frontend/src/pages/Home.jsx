import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { handleError, handleSuccess } from '../utils';
import { ToastContainer } from 'react-toastify'

function Home() {
    const [loggedInUser, setLoggedInUser] = useState('')
    const [products, setProducts] = useState([{}])
    const navigate = useNavigate()

    useEffect(() => {
        setLoggedInUser(localStorage.getItem('loggedInUser'))
        fetchProducts()
    }, [])

    const handleLogout = (e) => {
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        localStorage.removeItem('loggedInUser')
        handleSuccess('User Logged Out')
        setTimeout(() => {
            navigate('/login')
        }, 1000)
    }

    const fetchProducts = async () => {
        try {
            const url = "http://localhost:8000/products"
            const headers = {
                headers: {
                    'Authorization': localStorage.getItem('accessToken')
                }
            }
            const response = await fetch(url, headers)
            const result = await response.json().then()
            setProducts(result)
        } catch (err) {
            handleError(err)
        }
    }

    return (
        <div>
            <h1>{loggedInUser}</h1>
            <button onClick={handleLogout}> Logout </button>
            <div>
                {
                    products && products?.map((item, index) => { return (
                        <ul key={index}>
                            <span>{item.name} - {item.price}$</span>
                        </ul>
                    )})
                }
            </div>
            <ToastContainer />
        </div>

    )
}

export default Home