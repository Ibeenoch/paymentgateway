import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { IconButton, Typography } from '@material-ui/core'
import { LockOpen, RemoveRedEyeOutlined } from '@material-ui/icons'
import jwt_decode from 'jwt-decode';
import { GoogleLogin, GoogleCredentialResponse, useGoogleLogin } from '@react-oauth/google'

const Login: React.FC = () => {
    interface ILogin {
        email: string,
        password: string,
    }

    const [form, setForm] = useState<ILogin>({  email: '', password: ''});
    const navigate = useNavigate()
    const { email, password } = form;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement> ) => {
        const { name, value } = e.target;
        setForm({...form, [name]: value })
        console.log(form)
    }
     const handleSubmit = (e: React.FormEvent ) => {
        e.preventDefault();
        const url = 'http://localhost:3030'
        const formdata = {  email, password }
        const options = {
            method: 'POST',
            headers: {
                 'Content-Type': 'application/json',
                 'Accept': 'application/json',
            },
            body: JSON.stringify(formdata)
        }
        const res =  fetch(`${url}/login`, options)
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            console.log('datalogin', data )
            localStorage.setItem('user', JSON.stringify(data));
            
            setForm({  email: '', password: ''})
            if(data.message === 'successful'){
              navigate('/');  
            }
        })
    }

    const togglePassword = (): void => {
       const pass1 = document.querySelector('#x') as HTMLElement;
        const newType = pass1?.getAttribute('type') === 'password' ? 'text' : 'password';
        pass1?.setAttribute('type', newType)

    } 



    const login = useGoogleLogin({
        onSuccess: (codeResponse) => {
            console.log(codeResponse, codeResponse.access_token);
            const decodeGoogleDetails = jwt_decode(codeResponse.access_token);
            console.log(codeResponse, codeResponse.access_token);
            console.log(decodeGoogleDetails);
            return  decodeGoogleDetails;
        },
        onError: (error) => {
            console.log('login failed: ', error)
        }
    })

//     access_token
// : 
// "ya29.a0Ael9sCPUMb7zOUPDIO6o46oJh_-QGL4pmcS9lCY8dKR9F8fXkxKbHZhKrWIVnIYAvxtA-CzpRKxMR21zH51Vgj5LABhrTGiCRLdLkBCkj8lLveba4ibECWOtEtzDLSPk0y3BtnnPz6JtG4mFru0YNnOmheIOEQaCgYKAUESARASFQF4udJhxZy-X49WwHxisPqnIQ1tSA0165"
// authuser
// : 
// "0"
// expires_in
// : 
// 3599
// prompt
// : 
// "none"
// scope
// : 
// "email profile openid https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile"
// token_type
// : 
// "Bearer"
    
    return (
        <div style={{  display: 'flex', justifyContent: 'center', alignItems:'center', background: 'gray', height: '100vh' }}>
            <div style={{ background: 'white' }}>
                <Typography variant='h5' style={{  textAlign: 'center', padding: '10px', }} > <LockOpen /> Sign in</Typography>
                <form onSubmit={handleSubmit} style={{ padding: '20px'}}>
                
                    <div style={{ padding:'15px' }} >
                        <input type="email" value={form.email} name='email' onChange={handleChange} style={{ fontSize: '1rem', padding: '7px', border: 'none', borderBottom: '1px solid gray',  }}  placeholder='Enter your email' />
                    </div>
                    <div style={{ padding:'15px', }} >
                        <input id='x' type="password" value={form.password} name='password'  onChange={handleChange} style={{ fontSize: '1rem', padding: '7px', border: 'none', borderBottom: '1px solid gray'}} placeholder='Password' />
                        <IconButton style={{  }}><RemoveRedEyeOutlined onClick={togglePassword}  style={{ position: 'absolute', cursor: 'pointer',  }} /></IconButton>  
                    </div>
                        <p>Not a member please? <Link to='/register'> Sign up</Link> </p>
                    
                    
                    <div style={{display: 'flex', justifyContent: 'center',}}>
                    <button type="submit" style={{ width: '120px', background: 'black', color: 'white', padding: '15px 25px', cursor: 'pointer' }}>Login</button>
                    </div>
                    <p></p>
                    
                    </form>

                    <button type="button" onClick={() => login()}>Sign in with Google</button>
                    
                
            </div>
        </div>
    )
}

export default Login



// import React, { useState } from 'react'

// const Login: React.FC = () => {
//     interface InitialState {
//         email: string,
//         password: string,
//     }
//     const [form, setForm] = useState<InitialState> ({ email: '', password: '' })
    
//     const handleChange = (e: React.ChangeEvent<HTMLInputElement> ) => {
//         const { name, value } = e.target;
//         setForm({...form, [name]: value})
//         console.log(form)
//     }
    
//     const { email, password } = form;

//     const handleSubmit = (e: React.FormEvent ) => {
//         e.preventDefault();
//         const data = { email, password }
//         console.log('formData:  ', data)
//     }

//      return (
//         <div>
//             <form onSubmit={handleSubmit} >
//                 <input type="email" value={form.email} name='email' onChange={handleChange}  placeholder='Email Address' />
//                 <input type="password"  value={form.password} name='password' onChange={handleChange}  placeholder='password'/>
//                 <button type="submit">Login</button>
//             </form>
//         </div>
//     )
// }

// export default Login


// // import React from 'react'

// // const Square = () => {
// //     const makeBox = () => {
// //         for(let i=0; i<9; i++){
// //             make(i)
// //         }
// //     }
// // const board = document.querySelector('.container') as HTMLElement

// //     const make = (i: Number): void => {

// //         const box : HTMLDivElement = document.createElement("div")
// //         box.textContent = 'X'
// //         box.style.color = 'white'
// //         board?.appendChild(box)

// //     }
    
// //     makeBox()
// //     return (
// //         <div className='container' style={{ background: 'blue'}}>
            
// //         </div>
// //     )
// // }

// // export default Square
