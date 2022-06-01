import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, Input } from 'reactstrap';
import Swal from 'sweetalert2';
import { initRegister } from '../../helpers/auth';
import { useForm } from '../../hooks/useForm';

export const RegisterPage = () => {
  const initialState = {
    nombre: '',
    telefono: '',
    rol: '',
    email: '',
    password: ''
  }
  const [formValues, handleInputChange] = useForm(initialState);
  const { nombre, telefono, rol, email, password } = formValues;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por favor...'
    });
    Swal.showLoading();
    initRegister(formValues).then(res => {
      if (res) {
        Swal.close();
        window.location.reload();
      }
    });
  }

  return (
    <div>
      <h4>Registro</h4>
      <Form onSubmit={handleSubmit}>
        <Input className='mt-3 mb-3' type='text' placeholder='Nombre' name='nombre' value={nombre} onChange={handleInputChange}/>
        <Input className='mb-3' type='text' placeholder='Telefono' name='telefono' value={telefono} onChange={handleInputChange}/>
        <Input className='mb-3' type='select' placeholder='Rol' name='rol' value={rol} onChange={handleInputChange}>
            <option value={''}>Seleccione un rol</option>
            <option value={'N'}>Nutriologo</option>
            <option value={'R'}>Recepcionista</option>
        </Input>
        <Input className='mb-3' type='email' placeholder='Email' name='email' value={email} onChange={handleInputChange}/>
        <Input className='mb-3' type='password' placeholder='Contraseña' name='password' value={password} onChange={handleInputChange}/>
        <div className="d-grid gap-2">
          <Button className='mb-3' color='success' type='submit'>Registrar</Button>
        </div>
        <Link to="/auth/login" className="accountLink">¿Ya está registrado?</Link>
      </Form>
    </div>
  )
}
