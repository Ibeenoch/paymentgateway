import { IconButton, Typography } from '@material-ui/core';
import { PaymentOutlined } from '@material-ui/icons';
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

interface IPayment {
    name: string;
    email: string;
    amount: string;
}

const Payment: React.FC = () => {
    const [form, setForm] = useState<IPayment>({ name: '', email: '', amount: ''})

    const navigate = useNavigate()
    const { email, name, amount } = form;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement> ) => {
        const { name, value } = e.target;
        setForm({...form, [name]: value })
        console.log(form)
    }
const userExist = localStorage.getItem('user');
const user = userExist ? JSON.parse(userExist): null;

    useEffect(() => {
        if(user !== null){
            form.name = user?.name;
            form.email = user?.email;
            // const {name, email } = user;
            // setForm({ name: user.name, email: user.email })
        }
    }, [navigate])

     const handleSubmit = async(e: React.FormEvent ) => {
        e.preventDefault();
        const url = 'http://localhost:3030';

        await axios.get(`${url}/payment?name=${name}&email=${email}&amount=${amount}`, {
            headers: {
                'X-Requested-with': 'XMLHttpRequest'
            }
        }).then((response) => {
          console.log(typeof response)
           console.log('datalogin', response )
           console.log(response.data.data.authorization_url)
             window.location.href = response.data.data.authorization_url;
        })
    }


    return (
        <div style={{  display: 'flex', justifyContent: 'center', alignItems:'center', background: 'gray', height: '100vh' }}>
            <div style={{ background: 'white' }}>
                <Typography variant='h5' style={{  textAlign: 'center', padding: '10px', }} > <PaymentOutlined /> Make Your Payment</Typography>
                <form onSubmit={handleSubmit} style={{ padding: '20px'}}>
                                     
                    <div style={{ padding:'15px' }} >
                        <input type="name" value={form.name} name='name' onChange={handleChange} style={{ fontSize: '1rem', padding: '7px', border: 'none', borderBottom: '1px solid gray',  }}  placeholder='Enter your full name' />
                    </div>
                    <div style={{ padding:'15px' }} >
                        <input type="email" value={form.email} name='email' onChange={handleChange} style={{ fontSize: '1rem', padding: '7px', border: 'none', borderBottom: '1px solid gray',  }}  placeholder='Enter your email' />
                    </div>
                    <div style={{ padding:'15px' }} >
                        <input type="amount" value={form.amount} name='amount' onChange={handleChange} style={{ fontSize: '1rem', padding: '7px', border: 'none', borderBottom: '1px solid gray',  }}  placeholder='Enter your amount' />
                    </div>
                   
                    <div style={{display: 'flex', justifyContent: 'center',}}>
                    <button type="submit" style={{ width: '120px', background: 'black', color: 'white', padding: '15px 25px', cursor: 'pointer' }}>Pay</button>
                    </div>
                    <p></p>
                    
                </form>
            </div>
        </div>
    )
}

export default Payment
