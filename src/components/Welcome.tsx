import React from 'react'
import { Link } from 'react-router-dom'

const Welcome: React.FC = () => {

    return (
        <div>
            <h4>Welcome to my website</h4>
            <Link to='/'> 
            <button style={{ background: 'blue', border: 'none', width: '70px', borderRadius: '1rem'}}>Proceed to the Home Page</button>
            </Link>
           
        </div>
    )
}

export default Welcome
