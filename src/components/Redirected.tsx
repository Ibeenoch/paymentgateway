import React, { useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'

const Redirected = () => {
    const [count, setCount] = useState(5);
    const navigate = useNavigate();

    useEffect(() => {
        const interval = setInterval(() => {
            setCount((curr) => --curr );
            if(count === 0){
                navigate('/login')
            }
        }, 1000)
    }, [count, navigate])

    return (
        <div>
            <h5>Redirecting you in {count}...</h5>
        </div>
    )
}

export default Redirected
