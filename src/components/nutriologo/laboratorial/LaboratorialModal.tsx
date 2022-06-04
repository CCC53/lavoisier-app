import React, { useEffect } from 'react'
import Swal from 'sweetalert2';
import { useForm } from '../../../hooks/useForm';
import { Laboratorial } from '../../../types/nutriologo/laboratorial';
import { addLaboratorial, getLaboratorialByID, updateLaboratorial } from '../../../helpers/nutriologo/laboratorial';
import { Button, Col, Form, FormGroup, Input, Label, Modal, ModalBody, ModalHeader, Row } from 'reactstrap';

interface Props {
  isOpen: boolean;
  id: string;
  pacienteId: string;
  setOpen: (isOpen: boolean) => void;
  laboratoriales: Laboratorial[];
  setLaboratoriales: (data: any) => void;
}

export const LaboratorialModal = ({ isOpen, id, pacienteId, setOpen, laboratoriales, setLaboratoriales }: Props) => {
  const initialState = {
    fecha: '',
    glucosa: '',
    insulina: '',
    trigliceridos: '',
    colesterolTotal: '',
    hdl: '',
    ldl: ''
  }
  const [formValues, handleInputChange, loadData, reset] = useForm(initialState);
  const { fecha, glucosa, insulina, trigliceridos, colesterolTotal, hdl, ldl } = formValues;

  const toggleModal = () => {
    setOpen(!isOpen);
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const formData = {
      fecha, 
      glucosa: Number(glucosa),
      insulina: Number(insulina),
      trigliceridos: Number(trigliceridos),
      colesterolTotal: Number(colesterolTotal),
      hdl: Number(hdl),
      ldl: Number(ldl),
      pacienteId
    }
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por favor...'
    });
    Swal.showLoading();
    if (id === 'nuevo') {
      addLaboratorial(formData).then(res => {
        if (res) {
          Swal.close();
          displayMessage('Laboratorial agregado correctamente');
          setOpen(false);
          setLaboratoriales([...laboratoriales, res]);
        }
      });
    } else {
      updateLaboratorial(id, formData).then(res => {
        if (res) {
          Swal.close();
          displayMessage('Antropometrico actualizado correctamente');
          setOpen(false);
        }
      });
    }
  }

  const displayMessage = (message: string): void => {
    Swal.fire({
      icon: 'success',
      title: message,
      showConfirmButton: true,
    });
  }

  useEffect(() => {
    if (id && id === 'nuevo') {
      reset(initialState);
    } else {
      getLaboratorialByID(id).then(res => {
        if (res) {
          const data = {
            id: res.id,
            fecha: res.fecha,
            glucosa: String(res.glucosa),
            insulina: String(res.insulina),
            trigliceridos: String(res.trigliceridos),
            colesterolTotal: String(res.colesterolTotal),
            hdl: String(res.hdl),
            ldl: String(res.ldl)
          }
          loadData(data);
        }
      });
    }
  }, [id]);
  
  return (
    <Modal isOpen={isOpen} toggle={toggleModal} centered size='lg'>
      <ModalHeader>Laboratorial</ModalHeader>
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
                <Input type='number' name='glucosa' onChange={handleInputChange} value={glucosa}/>
                <Label>Glucosa</Label>
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup floating>
                <Input type='number' name='insulina' onChange={handleInputChange} value={insulina}/>
                <Label>Insulina</Label>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={4}>
              <FormGroup floating>
                <Input type='number' name='trigliceridos' onChange={handleInputChange} value={trigliceridos}/>
                <Label>Trigliceridos</Label>
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup floating>
                <Input type='number' name='colesterolTotal' onChange={handleInputChange} value={colesterolTotal}/>
                <Label>Colesterol Total</Label>
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup floating>
                <Input type='number' name='hdl' onChange={handleInputChange} value={hdl}/>
                <Label>HDL</Label>
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup floating>
                <Input type='number' name='ldl' onChange={handleInputChange} value={ldl}/>
                <Label>LDL</Label>
              </FormGroup>
            </Col>
          </Row>
          <Button color='primary'>Guardar</Button>
        </Form>
      </ModalBody>
    </Modal>
  )
}