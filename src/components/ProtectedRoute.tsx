import React, { FC } from 'react'
import Redirected from './Redirected';
import { Navigate } from 'react-router-dom'
interface IChild {
    child: React.FC<{}>;
}

const ProtectedRoute: FC<IChild> = ({ child: Component }) => {
    const user = localStorage.getItem('user');
    
    if(user) return <Component />;
    return <Navigate to='/login' />;
    
}

export default ProtectedRoute
