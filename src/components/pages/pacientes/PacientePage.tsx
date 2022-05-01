import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Col, Form, FormGroup, Input, Label, Row } from 'reactstrap';
import { addPaciente, getPacienteByID, updatePaciente } from '../../../helpers/paciente';
import { useForm } from '../../../hooks/useForm';
import { DynamicTable } from '../../ui/DynamicTable';
import { Cita } from '../../../types/cita';
import { DynamicTableContent } from '../../../types/ui';
import Swal from 'sweetalert2';

const formatTable = (citas: Cita[]) => {
  return citas.map(({ fecha, horario, motivo }, index) => (
    <tr key={index}>
      <td>{index+1}</td>
      <td>{motivo}</td>
      <td>{fecha}</td>
      <td>{horario}</td>
    </tr>
  ));
}

const setTableData = (data: Cita[]) => {
  const tableData: DynamicTableContent = {
    headers: [
      { key: 'index', label: '#' },
      { key: 'motivo', label: 'Motivo' },
      { key: 'fecha', label: "Fecha" },
      { key: 'horario', label: 'Horario' },
    ],
    rows: formatTable(data)
  }
  return tableData;
}

export const PacientePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [citas, setCitas] = useState<Cita[]>([]);
  const [formValues, handleInputChange, loadData] = useForm({
    nombre: '',
    nacimiento: '',
    sexo: '',
    telefono: '',
    email: ''
  });

  const { nombre, nacimiento, sexo, telefono, email } = formValues;
  const { headers, rows } = setTableData(citas);

  const displayMessage = (message: string): void => {
    Swal.fire({
      icon: 'success',
      title: message,
      showConfirmButton: false,
      timer: 1500
    });
  }
  
  useEffect(() => {
    if (id && id !== 'nuevo') {
      getPacienteByID(id).then(res => {
        if (res) {
          const { nombre, nacimiento, email, sexo, telefono, citas } = res;
          loadData({ nombre, nacimiento, sexo, telefono, email });
          setCitas(citas);
        }
      });
    }
  }, [id]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (id && id !== 'nuevo') {
      updatePaciente(id, formValues).then(res => {
        if (res) {
          displayMessage(`${formValues.nombre} ha sido actualizado correctamente`);
        }
      });
    } else {
      addPaciente(formValues).then(res => {
        if (res) {
          displayMessage('Paciente registrado correctamente');
          navigate(`/pacientes/${res.id}`);
        }
      });
    }
  }
  
  return (
    <div className='container'>
      <h1>{ id !== 'nuevo' ? `${nombre}` : 'Nuevo paciente' }</h1>
      <hr/>
      <div className="form">
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md="4">
            < FormGroup floating>
                <Input placeholder='Nombre del paciente' name='nombre' onChange={handleInputChange} value={nombre} />
                <Label>Nombre del paciente</Label>
              </FormGroup>
            </Col>
            <Col md="4">
              <FormGroup floating>
                <Input placeholder='Fecha de nacimiento' name='nacimiento' type='date' onChange={handleInputChange} value={nacimiento} />
                <Label>Fecha de nacimiento</Label>
              </FormGroup>
            </Col>
            <Col md="3">
              <FormGroup floating>
                <Input placeholder='Sexo' name='sexo' type='select' onChange={handleInputChange} value={sexo}>
                  <option value={''}>Seleccione una opcion</option>
                  <option value={'M'}>Masculino</option>
                  <option value={'F'}>Femenino</option>
                  <option value={'O'}>Otro</option>
                </Input>
                <Label>Sexo</Label>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md="5">
              <FormGroup floating>
                <Input placeholder='Número de teléfono' name='telefono' onChange={handleInputChange} value={telefono} />
                <Label>Número de teléfono</Label>
              </FormGroup>
            </Col>
            <Col md="6">
              <FormGroup floating>
                <Input placeholder='Email' name='email' type='email' onChange={handleInputChange} value={email} />
                <Label>Email</Label>
              </FormGroup>
            </Col>
          </Row>
          <Button color='primary'>Registrar</Button>
        </Form>
      </div>
      {
        id !== 'nuevo' && (
          <div className='citasContainer'>
            <h1>Historial de citas</h1>
            <hr/>
            <DynamicTable headers={headers} rows={rows} />
          </div>
        )
      }
    </div>
  )
}