import React, { useState, useEffect, useContext } from 'react'
import { UserContext } from '../components/UserContext'
import { useHistory } from "react-router-dom";
const Logout = () => {

    const { toggleCheck, setToggleCheck } = useContext(UserContext)
    const history = useHistory()
    
    const logout = () => {
        sessionStorage.removeItem('token')
        setToggleCheck(!toggleCheck)
        history.push('/')

    }

    useEffect(() => { logout() }, [])

    return null
}

export default Logout