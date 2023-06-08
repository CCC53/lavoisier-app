import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, Input } from 'reactstrap';
import Swal from 'sweetalert2';
import { initRegister } from '../../helpers/auth';
import { useForm } from '../../hooks/useForm';
import { RegisterFields, validateEmail, validatePassword, validateRegisterEmptyData, validatePhone, validateName } from '../../validators/auth';

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
      if (typeof(res) === "string") {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: res,
          showConfirmButton: true,
        })
      } else {
        Swal.close();
        window.location.reload();
      }
    });
  }

  return (
    <div>
      <h4>Registro</h4>
      <Form onSubmit={handleSubmit}>
        <div className="input-group">
          <Input className='input' type='text' placeholder='Nombre' name='nombre' value={nombre} onChange={handleInputChange}/>
          <span className='alert' hidden={validateName(nombre)}>Ingrese un nombre válido</span>
        </div>
        <div className='input-group'>
          <Input className='input' type='tel' placeholder='Telefono' name='telefono' value={telefono} onChange={handleInputChange}/>
          <span className='alert' hidden={validatePhone(telefono)}>Ingrese un numero de telefono válido</span>
        </div>
        <Input className='mb-3' type='select' placeholder='Rol' name='rol' value={rol} onChange={handleInputChange}>
              <option value={''}>Seleccione un rol</option>
              <option value={'N'}>Nutriologo</option>
              <option value={'R'}>Recepcionista</option>
        </Input>
        <div className='input-group'>
          <Input className='input' type='email' placeholder='Email' name='email' value={email} onChange={handleInputChange}/>
          <span className='alert' hidden={validateEmail(email)}>Ingrese un email válido</span>
        </div>
        <div className="input-group">
          <Input className='input' type='password' placeholder='Contraseña' name='password' value={password} onChange={handleInputChange}/>
          <span className='alert' hidden={validatePassword(password)}>La contraseña debe ser de mínimo 5 caracteres</span>
        </div>
        <div className="d-grid gap-2">
          <Button className='mb-3' color='success' type='submit' disabled={validateRegisterEmptyData({...formValues} as RegisterFields) }>Registrar</Button>
        </div>
        <Link to="/auth/login" className="accountLink">¿Ya está registrado?</Link>
      </Form>
    </div>
  )
}