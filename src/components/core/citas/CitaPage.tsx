import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Button, Input, Form, Row, Col, FormGroup, Label } from 'reactstrap';
import { useForm } from '../../../hooks/useForm';
import { useFetchPacientes } from '../../../hooks/useFetchPacientes';
import { addCita, getCitaByID, updateCita } from '../../../helpers/core/cita';
import Swal from 'sweetalert2';
import { getPagoByCita } from '../../../helpers/recepcionista/pago';
import { PagoQueryBuilder } from '../../../types/recepcionista/pago';
import { valdiateCitaEmptyData } from '../../../validators/core';

export const CitaPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [pago, setPago] = useState<PagoQueryBuilder>();
  const [ , rol, ruta, ] = pathname.split('/');
  const [formValues, handleInputChange, loadData] = useForm({
    motivo: '',
    fecha: '',
    horario: '',
    paciente: ''
  });
  const { motivo, fecha, horario, paciente } = formValues;
  const selectItems = useFetchPacientes();

  const displayMessage = (message: string): void => {
    Swal.fire({
      icon: 'success',
      title: message,
      showConfirmButton: true,
    });
  }
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por favor...'
    });
    Swal.showLoading();
    if (id && id !== 'nuevo') {
      updateCita(id, formValues).then(res => {
        if (res) {
          Swal.close();
          displayMessage('Cita ha sido actualizada correctamente');
        }
      });
    } else {
      addCita(formValues).then(res => {
        if (res) {
          Swal.close();
          displayMessage('Cita registrada correctamente');
          navigate(`/${rol}/${ruta}/${res.id}`);
        }
      });
    }
  }

  const goBack = () => {
    navigate(`/${rol}/${ruta}`);
  }
  
  useEffect(() => {
    if (id && id !== 'nuevo') {
      getCitaByID(id).then(res => {
        if (res) {
          const { fecha, horario, motivo, paciente } = res;
          loadData({ motivo, fecha, horario, paciente: paciente.id });
        }
      });
      if (rol === 'recepcionista') {
        getPagoByCita(id).then(res => {
          if (res) {
            setPago(res)
          }
        });
      }
    }
  }, [id]);

  
  return (
    <div className='container'>
      <h1>Cita</h1>
      <hr/>
      <Button color='danger' onClick={goBack}>
        <i className="fa fa-arrow-left"></i> Regresar
      </Button>
      <div className="form">
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md="6">
              <FormGroup floating>
                <Input placeholder='Motivo de la cita' name='motivo' onChange={handleInputChange} value={motivo} />
                <Label>Motivo de la cita</Label>
              </FormGroup>
            </Col>
            <Col md="6">
              <FormGroup floating>
                <Input type='date' name='fecha' onChange={handleInputChange} value={fecha} />
                <Label>Fecha de la cita</Label>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md="6">
              <FormGroup floating>
                <Input type='time' name='horario' onChange={handleInputChange} value={horario} />
                <Label>Hora de la cita</Label>
              </FormGroup>
            </Col>
            <Col md="6">
              <FormGroup floating>
                <Input  type='select' name='paciente' onChange={handleInputChange} value={paciente}>
                  {
                    selectItems.map(({value, label}, index) => (
                      <option value={value} key={index}>{label}</option>
                    ))
                  }
                </Input>
                <Label>Paciente</Label>
              </FormGroup>
            </Col>
          </Row>
          <Button color='primary' disabled={valdiateCitaEmptyData(formValues)}>Registrar</Button>
        </Form>
      </div>
      {
        rol === 'recepcionista' && (
          pago ? <div className='paymentContainer'>
            <h1>Pago</h1>
            <hr/>
            <Button color='success' onClick={() => navigate(`/recepcionista/pagos/${pago.id}`)}>Consultar pago</Button>
          </div>
          : id !== 'nuevo' && (
            <div className='paymentContainer'>
              <h1>Pago</h1>
              <hr/>
              <Button color='danger' onClick={() => navigate('/recepcionista/pagos/nuevo')}>Registrar pago</Button>
            </div>
          )
        )
      }
    </div>
  )
}