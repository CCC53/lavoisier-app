import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Col, Form, FormGroup, Input, Label, Row } from 'reactstrap';
import { useForm } from '../../hooks/useForm';
import { useFetchCitas } from '../../hooks/useFetchCitas';
import { addPago, getPagoByID } from '../../helpers/pago';
import Swal from 'sweetalert2';

export const PagoPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formValues, handleInputChange, loadData] = useForm({
    monto: '',
    metodoPago: '',
    tipoPago: 0,
    cantidadRecibida: '',
    cambio: '',
    citaId: ''
  });
  const { monto, metodoPago, tipoPago, cantidadRecibida, cambio, citaId } = formValues;
  const selectItems = useFetchCitas();

  const displayMessage = (message: string): void => {
    Swal.fire({
      icon: 'success',
      title: message,
      showConfirmButton: true,
    });
  }

  const goBack = () => {
    navigate('/recepcionista/pagos');
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por favor...'
    });
    Swal.showLoading();
    if(id && id === 'nuevo') {
      const formData = {
        metodoPago,
        cantidadRecibida: Number(cantidadRecibida),
        monto: Number(monto),
        tipoPago: Number(tipoPago),
        citaId
      }
      addPago(formData).then(res => {
        if(res) {
          Swal.close();
          displayMessage('Pago registrado correctamente');
          navigate(`/recepcionista/pagos/${res.id}`);
        }
      });
    }
  }

  useEffect(() => {
    if (id && id !== 'nuevo') {
      getPagoByID(id).then(res => {
        if(res) {
          const { cambio, metodoPago, cantidadRecibida, monto, cita, tipoPago } = res;
          const { id } = cita;
          loadData({ cambio: String(cambio), metodoPago, cantidadRecibida: String(cantidadRecibida), monto: String(monto), citaId: id, tipoPago });
        }
      });
    } 
  }, [id]);

  return (
    <div className='container'>
      <h1>Pago</h1>
      <hr/>
      <Button color='danger' onClick={goBack}>
        <i className="fa fa-arrow-left"></i> Regresar
      </Button>
      <div className='form'>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={4}>
              <FormGroup floating>
                <Input type='number' placeholder='Monto a pagar' name='monto' value={monto} onChange={handleInputChange}/>
                <Label>Monto a pagar</Label>
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup floating>
                <Input type='select' name='metodoPago' value={metodoPago} onChange={handleInputChange}>
                  <option value={''}>Seleccione una opcion</option>
                  <option value={'E'}>Efectivo</option>
                  <option value={'T'}>Tarjeta de credito/debito</option>
                </Input>
                <Label>Metodo de pago</Label>
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup floating>
                <Input type='select' name='tipoPago' value={tipoPago} onChange={handleInputChange}>
                  <option value={0}>Seleccione una opcion</option>
                  <option value={1}>Primera cita</option>
                  <option value={2}>Cita posterior</option>
                </Input>
                <Label>Tipo de pago</Label>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={4}>
              <FormGroup floating>
                <Input type='number' placeholder='Cantidad recibida' name='cantidadRecibida' value={cantidadRecibida} onChange={handleInputChange}/>
                <Label>Cantidad recibida</Label>
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup floating>
                <Input type='select' name='citaId' value={citaId} onChange={handleInputChange}>
                  {
                    selectItems.map(({ label, value }, index) => (
                      <option key={index} value={value}>{label}</option>
                    ))
                  }
                </Input>
                <Label>Cita a correspondiente</Label>
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup floating>
                <Input disabled name='cambio' value={cambio} onChange={handleInputChange}/>
                <Label>{'Cambio (campo autogenerado)'}</Label>
              </FormGroup>
            </Col>
          </Row>
          {
            id === 'nuevo' && <Button color='primary'>Registrar</Button>
          }
        </Form>
      </div>
    </div>
  )
}