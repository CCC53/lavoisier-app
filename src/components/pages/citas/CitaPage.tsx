import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Input, Form, Row, Col, FormGroup, Label } from 'reactstrap';
import { useForm } from '../../../hooks/useForm';
import { useFetchPacientes } from '../../../hooks/useFetchPacientes';
import { addCita, getCitaByID, updateCita } from '../../../helpers/cita';
import Swal from 'sweetalert2';

export const CitaPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
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
      showConfirmButton: false,
      timer: 1500
    });
  }
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (id && id !== 'nuevo') {
      updateCita(id, formValues).then(res => {
        if (res) {
          displayMessage('Cita ha sido actualizada correctamente');
        }
      });
    } else {
      addCita(formValues).then(res => {
        if (res) {
          displayMessage('Cita registrada correctamente');
          navigate(`/citas/${res.id}`);
        }
      });
    }
  }

  const goBack = () => {
    navigate('/citas');
  }
  
  useEffect(() => {
    if (id && id !== 'nuevo') {
      getCitaByID(id).then(res => {
        if (res) {
          const { fecha, horario, motivo, paciente } = res;
          loadData({ motivo, fecha, horario, paciente: paciente.id });
        }
      });
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
          <Button color='primary'>Registrar</Button>
        </Form>
      </div>
    </div>
  )
}