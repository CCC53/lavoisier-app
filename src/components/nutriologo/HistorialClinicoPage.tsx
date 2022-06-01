import React, { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Card, CardBody, CardText, CardTitle, Col, Form, FormGroup, Input, Label, Row } from 'reactstrap';
import Swal from 'sweetalert2';
import { addHistorialClinico, getHistorialByID, alimentacionFileUpload, updateHistorial } from '../../helpers/historialClinico';
import { useFetchPacientes } from '../../hooks/useFetchPacientes';
import { useForm } from '../../hooks/useForm';
import { fileUploadResponse } from '../../types/historialClinico';

const displayMessage = (message: string): void => {
  Swal.fire({
    icon: 'success',
    title: message,
    showConfirmButton: true,
  });
}

export const HistorialClinicoPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const selectItems = useFetchPacientes();
  const [alimentacion, setAlimentacion] = useState('');
  const [formValues, handleInputChange, loadData] = useForm({
    enfermedadesCardiovasculares: '',
    enfermedadesPulmonares: '',
    enfermedadesMetabolicas: '',
    tabaquismo: '',
    alcoholismo: '',
    sedentarismo: '',
    drogas: '',
    cafe: '',
    pacienteId: '',
  });
  const { enfermedadesCardiovasculares, enfermedadesPulmonares, enfermedadesMetabolicas, tabaquismo, alcoholismo, sedentarismo,
          drogas, cafe, pacienteId } = formValues;

  const goBack = () => {
    navigate('/nutriologo/historial-clinico');
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por favor...'
    });
    Swal.showLoading();
    addHistorialClinico(formValues).then(res => {
      if (res) {
        Swal.close();
        displayMessage('Historial Clinico registrado correctamente');
        navigate(`/nutriologo/historial-clinico/${res.id}`);
      }
    });
  }
  
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files && e.currentTarget.files[0];
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por favor...'
    });
    Swal.showLoading();
    if (file) {
      alimentacionFileUpload(file).then(res => {
        if (res) {
          setAlimentacion(res.url);
          Swal.close();
        }
      });
    }
  }

  const handleUpload = () => {
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por favor...'
    });
    Swal.showLoading();
    if (id && id !== 'nuevo') {
      updateHistorial(id, {alimentacion}).then(res => {
        if (res) {
          Swal.close();
          displayMessage('Formato de alimentacion registrado correctamente');
        }
      });
    }
  }

  useEffect(() => {
    if (id && id !== 'nuevo') {
      getHistorialByID(id).then(res => {
        if (res) {
          loadData(res);
          res.alimentacion && setAlimentacion(res.alimentacion);
        }
      });
    }
  }, [id]);
  

  return (
    <div className='container'>
      <h1>Historial Clinico</h1>
      <hr/>
      <Button color='danger' onClick={goBack}>
        <i className="fa fa-arrow-left"></i> Regresar
      </Button>
      <div className='form'>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={3}>
              <FormGroup floating>
                <Input name='enfermedadesCardiovasculares' type='select' onChange={handleInputChange} value={enfermedadesCardiovasculares}>
                  <option value={''}>Seleccione una opcion</option>
                  <option value={'Si'}>Si</option>
                  <option value={'No'}>No</option>
                </Input>
                <Label>Enfermedades Cardiovasculares</Label>
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup floating>
                <Input name='enfermedadesMetabolicas' type='select' onChange={handleInputChange} value={enfermedadesMetabolicas}>
                  <option value={''}>Seleccione una opcion</option>
                  <option value={'Si'}>Si</option>
                  <option value={'No'}>No</option>
                </Input>
                <Label>Enfermedades Metabolicas</Label>
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup floating>
                <Input name='enfermedadesPulmonares' type='select' onChange={handleInputChange} value={enfermedadesPulmonares}>
                  <option value={''}>Seleccione una opcion</option>
                  <option value={'Si'}>Si</option>
                  <option value={'No'}>No</option>
                </Input>
                <Label>Enfermedades Pulmonares</Label>
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup floating>
                <Input name='tabaquismo' type='select' onChange={handleInputChange} value={tabaquismo}>
                  <option value={''}>Seleccione una opcion</option>
                  <option value={'Si'}>Si</option>
                  <option value={'No'}>No</option>
                </Input>
                <Label>Tabaquismo</Label>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={3}>
              <FormGroup floating>
                <Input name='alcoholismo' type='select' onChange={handleInputChange} value={alcoholismo}>
                  <option value={''}>Seleccione una opcion</option>
                  <option value={'Si'}>Si</option>
                  <option value={'No'}>No</option>
                </Input>
                <Label>Alcoholismo</Label>
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup floating>
                <Input name='sedentarismo' type='select' onChange={handleInputChange} value={sedentarismo}>
                  <option value={''}>Seleccione una opcion</option>
                  <option value={'Si'}>Si</option>
                  <option value={'No'}>No</option>
                </Input>
                <Label>Sedentarismo</Label>
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup floating>
                <Input name='drogas' type='select' onChange={handleInputChange} value={drogas}>
                  <option value={''}>Seleccione una opcion</option>
                  <option value={'Si'}>Si</option>
                  <option value={'No'}>No</option>
                </Input>
                <Label>Drogas</Label>
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup floating>
                <Input name='cafe' type='select' onChange={handleInputChange} value={cafe}>
                  <option value={''}>Seleccione una opcion</option>
                  <option value={'Si'}>Si</option>
                  <option value={'No'}>No</option>
                </Input>
                <Label>Cafe</Label>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={4}>
              <FormGroup floating>
                <Input name='pacienteId' type='select' onChange={handleInputChange} value={pacienteId}>
                  {
                    selectItems.map(({value, label}, index) => (
                      <option value={value} key={index}>{label}</option>
                    ))
                  }
                </Input>
                <Label>Paciente Correspondiente</Label>
              </FormGroup>
            </Col>
          </Row>
          <Button color='primary' hidden={id !== 'nuevo' ? true : false}>Registrar</Button>
        </Form>
        {
          id !== 'nuevo' && (
            <div>
            <h2>Alimentacion</h2>
            <Col md={4}>
              <FormGroup floating>
                <Input type='file' onChange={handleFileChange}/>
                <Label>Agregar archivo de alimentacion</Label>
              </FormGroup>
              <Button color='primary' onClick={handleUpload}>Cargar</Button>
            </Col>
            <Card body className='mt-4'>
              <CardBody>
                <CardTitle tag="h5">Documento de alimentacion</CardTitle>
                <CardText>Dieta establecida</CardText>
                <a href={alimentacion} target={'_blank'}>Ver documento</a>
              </CardBody>
            </Card>
          </div>
          )
        }
      </div>
    </div>
  )
}
