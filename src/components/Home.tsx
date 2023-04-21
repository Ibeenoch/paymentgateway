import React from 'react'
import { Link } from 'react-router-dom'

const Home: React.FC = () => {

    const handlelogout = () => {
        localStorage.removeItem('user')
    }
    
    return (
        <div style={{  display: 'flex', justifyContent: 'center', alignItems:'center', background: 'gray', height: '100vh', }}>
        <div style={{ background: 'white', width: '60%', height: '40%' }}>
            <h1 style={{ textAlign: 'center'}}>Welcome Home</h1>
            <div style={{ display: 'flex', justifyContent: 'space-between'}}>
            <Link to='/payment'>
            <button style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '120px', background: 'black', color: 'white', padding: '15px 25px', cursor: 'pointer' }}>Make Payment</button>
            </Link>
            <Link to='/login'>
            <button onClick={handlelogout} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '120px', background: 'black', color: 'white', padding: '15px 25px', cursor: 'pointer' }}>Log Out</button>
            </Link>
            </div>
        </div>
        </div>
    )
}

export default Home
