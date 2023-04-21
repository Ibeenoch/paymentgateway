import { IconButton, Typography } from '@material-ui/core'
import {  LockOutlined, Looks, RemoveRedEyeOutlined, Watch } from '@material-ui/icons'
import { error } from 'console'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const SignUp : React.FC = (): any => {
    const [message, setMessage] = useState<any>()
const navigate = useNavigate();

    interface IRegister {
        name: string,
        email: string,
        password: string,
    }

    const [form, setForm] = useState<IRegister>({ name: '', email: '', password: '',});
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm({...form, [name]: value })
        console.log(form)
    }
    const { name, email, password } = form;

     const handleSubmit = (e: React.FormEvent ) => {
        e.preventDefault();
        const url = 'http://localhost:3030'
        const formdata = { name, email, password }
        const options = {
            method: 'POST',
            headers: {
                 'Content-Type': 'application/json',
                 'Accept': 'application/json',
            },
            body: JSON.stringify(formdata)
        }
        const res =  fetch(`${url}/create`, options)
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            console.log('dataregister', data )
            localStorage.setItem('user', JSON.stringify(data));
            
            setForm({ name: '', email: '', password: ''})
            if(data.message){
                navigate('/')
            }
            
        }).catch((err) => {
            console.log(err);
            
        })
      
    }

    const togglePassword = () => {
        const pass1 = document.querySelector('#x') as HTMLElement;
        const newType = pass1?.getAttribute('type') === 'password' ? 'text' : 'password';
        pass1?.setAttribute('type', newType)

    } 
    

    return ( 
        <div style={{  display: 'flex', justifyContent: 'center', alignItems:'center', background: 'gray', height: '100vh' }}>
            <div style={{ background: 'white' }}>
                <Typography variant='h5' style={{  textAlign: 'center', padding: '10px', }} > <LockOutlined /> Sign up</Typography>
                <form onSubmit={handleSubmit} style={{ padding: '20px'}}>
                    <div style={{ padding:'15px',  }} >
                        <input type="text" value={form.name} name='name' onChange={handleChange} style={{ fontSize: '1rem', padding: '7px', border: 'none', borderBottom: '1px solid gray'}} placeholder='Enter your full name' />
                    </div>
                    <div style={{ padding:'15px' }} >
                        <input type="email" value={form.email} name='email' onChange={handleChange} style={{ fontSize: '1rem', padding: '7px', border: 'none', borderBottom: '1px solid gray',  }}  placeholder='Enter your email' />
                    </div>
                    <div style={{ padding:'15px' }} >
                        <input id='x' type="password" value={form.password} name='password'  onChange={handleChange} style={{ fontSize: '1rem', padding: '7px', border: 'none', borderBottom: '1px solid gray'}} placeholder='Password' />
                        <IconButton><RemoveRedEyeOutlined onClick={togglePassword}  style={{ position: 'absolute', cursor: 'pointer', }} /></IconButton>  
                    </div>
                    
                        <p>Already a member please? <Link to='/login'> Log in</Link> </p>
                    
                    
                    <div style={{display: 'flex', justifyContent: 'center',}}>
                    <button type="submit" style={{ width: '120px', background: 'black', color: 'white', padding: '15px 25px', cursor: 'pointer' }}>Register</button>
                    </div>
                    <p style={{ color: 'red'}}> </p>
                    
                </form>
            </div> 
        </div>
        
    )
}

export default SignUp;


