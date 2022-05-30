import React from 'react'
import { Link } from 'react-router-dom';
import { Button, Form, Input } from 'reactstrap'
import { useForm } from '../../hooks/useForm';
import { initLogin, decodeToken } from '../../helpers/auth';

export const LoginPage = () => {

  const initialState = {
    email: '',
    password: ''
  }
  const [formValues, handleInputChange] = useForm(initialState);
  const { email, password  } = formValues;
  
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    initLogin(email, password).then(res => {
      if (res) {
        const { personal } = decodeToken(res.token);
        const { rol } = personal;
        if (rol === 'N') {
          window.location.reload();
        } else if (rol === 'R') {
          window.location.reload();
        }
      }
    });
  }
  return (
    <div>
      <h4>Iniciar sesión</h4>
      <Form onSubmit={handleSubmit}>
        <Input className='mt-3 mb-3' type='email' placeholder='Email' name='email' value={email} onChange={handleInputChange}/>
        <Input className='mb-3' type='password' placeholder='Contraseña' name='password' value={password} onChange={handleInputChange}/>
        <div className="d-grid gap-2">
          <Button className='mb-3' color='success' type='submit'>Ingresar</Button>
        </div>
        <Link to="/auth/registro" className="accountLink">Agregar personal nuevo</Link>
      </Form>
    </div>
  )
}