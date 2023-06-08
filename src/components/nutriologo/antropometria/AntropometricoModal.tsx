import React, { useEffect } from 'react';
import { Button, Col, Form, FormGroup, Input, Label, Modal, ModalBody, ModalHeader, Row } from 'reactstrap';
import { useForm } from '../../../hooks/useForm';
import { addAntropometrico, getAntropometricoByID, updateAntropometrico } from '../../../helpers/nutriologo/antropometria';
import Swal from 'sweetalert2';
import { Antropometria } from '../../../types/nutriologo/antropometria';
import { validateEmptyAntropometico } from '../../../validators/nutriologo';

interface Props {
    isOpen: boolean;
    id: string;
    pacienteId: string;
    setOpen: (isOpen: boolean) => void;
    antropometricos: Antropometria[];
    setAntropometricos: (data: any) => void;
}

export const AntropometricoModal = ({ isOpen, setOpen, id, pacienteId, antropometricos, setAntropometricos }: Props) => {
  const initialState = {
    fecha: '',
    peso: '',
    talla: '',
    imc: '',
    cintura: '',
    cBrazo: '',
    pTriceps: '',
    pAbdominal: '',
    porcentajeGrasa: ''
  }
  const [formValues, handleInputChange, loadData, reset] = useForm(initialState);
  const { fecha, peso, talla, imc, cintura, cBrazo, pTriceps, pAbdominal, porcentajeGrasa } = formValues;

  const toggleModal = () => {
    setOpen(!isOpen);
  }
  const displayMessage = (message: string): void => {
    Swal.fire({
      icon: 'success',
      title: message,
      showConfirmButton: true,
    });
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const formData = {
      fecha,
      peso: Number(peso),
      talla: Number(talla),
      imc: Number(imc),
      cintura: Number(cintura),
      cBrazo: Number(cBrazo),
      pTriceps: Number(pTriceps),
      pAbdominal: Number(pAbdominal),
      porcentajeGrasa,
      pacienteId
    }
    Swal.fire({
        allowOutsideClick: false,
        icon: 'info',
        text: 'Espere por favor...'
      });
    Swal.showLoading();
    if (id === 'nuevo') {
        addAntropometrico(formData).then(res => {
            if (res) {
               Swal.close();
               displayMessage('Antropometrico agregado correctamente');
               setOpen(false);
               setAntropometricos([...antropometricos, res]);
            }
        });
    } else {
        updateAntropometrico(id, formData).then(res => {
            if (res) {
                Swal.close();
                displayMessage('Antropometrico actualizado correctamente');
                setOpen(false);
            }
        });
    }
  }

  useEffect(() => {
    if (id && id === 'nuevo') {
        reset(initialState);
    } else {
        getAntropometricoByID(id).then(res => {
            if (res) {
                const data = {
                    id: res.id,
                    fecha: res.fecha,
                    peso: String(res.peso),
                    talla: String(res.talla),
                    imc: String(res.imc),
                    cintura: String(res.cintura),
                    cBrazo: String(res.cBrazo),
                    pTriceps: String(res.pTriceps),
                    pAbdominal: String(res.pAbdominal),
                    porcentajeGrasa: res.porcentajeGrasa
                }
                loadData(data);
            }
        });
    }
  }, [id])
  
  return (
    <Modal isOpen={isOpen} toggle={toggleModal} centered size='lg'>
        <ModalHeader>Antropometrico</ModalHeader>
        <ModalBody>
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col md={4}>
                       <FormGroup floating>
                        <Input type='date' name='fecha' onChange={handleInputChange} value={fecha}/>
                        <Label>Fecha</Label>
                        </FormGroup>
                    </Col>
                    <Col md={4}>
                       <FormGroup floating>
                        <Input type='number' name='peso' onChange={handleInputChange} value={peso}/>
                        <Label>Peso</Label>
                        </FormGroup>
                    </Col>
                    <Col md={4}>
                       <FormGroup floating>
                        <Input type='number' name='talla' onChange={handleInputChange} value={talla}/>
                        <Label>Talla</Label>
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col md={4}>
                       <FormGroup floating>
                        <Input type='number' name='imc' onChange={handleInputChange} value={imc}/>
                        <Label>IMC</Label>
                        </FormGroup>
                    </Col>
                    <Col md={4}>
                       <FormGroup floating>
                        <Input type='number' name='cintura' onChange={handleInputChange} value={cintura}/>
                        <Label>Cintura</Label>
                        </FormGroup>
                    </Col>
                    <Col md={4}>
                       <FormGroup floating>
                        <Input type='number' name='cBrazo' onChange={handleInputChange} value={cBrazo}/>
                        <Label>C. Brazo</Label>
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col md={4}>
                       <FormGroup floating>
                        <Input type='number' name='pTriceps' onChange={handleInputChange} value={pTriceps}/>
                        <Label>P. Triceps</Label>
                        </FormGroup>
                    </Col>
                    <Col md={4}>
                       <FormGroup floating>
                        <Input type='number' name='pAbdominal' onChange={handleInputChange} value={pAbdominal}/>
                        <Label>P. Abdominal</Label>
                        </FormGroup>
                    </Col>
                    <Col md={4}>
                       <FormGroup floating>
                        <Input type='text' name='porcentajeGrasa' onChange={handleInputChange} value={porcentajeGrasa}/>
                        <Label>Porcentaje de Grasa</Label>
                        </FormGroup>
                    </Col>
                </Row>
                <Button color='primary' disabled={validateEmptyAntropometico(formValues)}>Guardar</Button>
            </Form>
        </ModalBody>
    </Modal>
  )
}