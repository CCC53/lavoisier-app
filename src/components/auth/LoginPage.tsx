import React from 'react'
import { Link } from 'react-router-dom';
import { Button, Form, Input } from 'reactstrap'
import { useForm } from '../../hooks/useForm';
import { initLogin } from '../../helpers/auth';
import Swal from 'sweetalert2';
import { validateLoginEmptyData, validateEmail, validatePassword } from '../../validators/auth';

export const LoginPage = () => {
  const initialState = {
    email: '',
    password: ''
  }
  const [formValues, handleInputChange, ,reset] = useForm(initialState);
  const { email, password  } = formValues;
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();    
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por favor...'
    });
    Swal.showLoading();
    initLogin(email, password).then(res => {
      if (res) {
        Swal.close();
        window.location.reload();
      } else {
        Swal.close();
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Usuario o contraseña incorrectos'
        });
        reset(initialState);
      }
    });
  }

  return (
    <div>
      <h4>Iniciar sesión</h4>
      <Form onSubmit={handleSubmit}>
        <div className="input-group">
          <Input className='input' type='email' placeholder='Email' name='email' value={email} onChange={handleInputChange}/>
          <span className='alert' hidden={validateEmail(email)}>Ingrese un email válido</span>
        </div>
        <div className="input-group">
          <Input className='input' type='password' placeholder='Contraseña' name='password' value={password} onChange={handleInputChange}/>
          <span className='alert' hidden={validatePassword(password)}>La contraseña debe ser de mínimo 5 caracteres</span>
        </div>
        <div className="d-grid gap-2">
          <Button className='mb-3' color='success' type='submit' disabled={validateLoginEmptyData(email, password)}>Ingresar</Button>
        </div>
        <Link to="/auth/registro" className="accountLink">Agregar personal nuevo</Link>
      </Form>
    </div>
  )
}