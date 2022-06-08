import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Button, Col, Form, FormGroup, Input, Label, Row } from 'reactstrap';
import { useForm } from '../../../hooks/useForm';
import { DynamicTable } from '../../ui/DynamicTable';
import { DynamicTableContent } from '../../../types/ui';
import Swal from 'sweetalert2';
import { NoDataMessage } from '../../ui/NoDataMessage';
import moment from 'moment';
import 'moment/locale/es-mx';
import { getHistorialByPaciente } from '../../../helpers/nutriologo/historialClinico';
import { updatePaciente, addPaciente, getPacienteByID } from '../../../helpers/core/paciente';
import { Cita } from '../../../types/core/cita';
import { HistorialClinico } from '../../../types/nutriologo/historialClinico';
import { AntropometicosTable } from '../../nutriologo/antropometria/AntropometicosTable';
import { LaboratorialesTable } from '../../nutriologo/laboratorial/LaboratorialesTable';

moment.locale('es-mx');

const formatTable = (citas: Cita[]) => {
  return citas.map(({ fecha, horario, motivo }, index) => (
    <tr key={index}>
      <td>{index+1}</td>
      <td>{motivo}</td>
      <td>{moment(fecha).format('LL')}</td>
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
  const { pathname } = useLocation();
  const [ , rol, ruta, ] = pathname.split('/');
  const [citas, setCitas] = useState<Cita[]>([]);
  const [historial, setHistorial] = useState<HistorialClinico>();
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
      showConfirmButton: true,
    });
  }

  const goBack = () => {
    navigate(`/${rol}/${ruta}`);
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
      updatePaciente(id, formValues).then(res => {
        if (res) {
          Swal.close();
          displayMessage(`${formValues.nombre} ha sido actualizado correctamente`);
        }
      });
    } else {
      addPaciente(formValues).then(res => {
        if (res) {
          Swal.close();
          displayMessage('Paciente registrado correctamente');
          navigate(`/${rol}/${ruta}/${res.id}`);
        }
      });
    }
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
      if (rol === 'nutriologo') {
        getHistorialByPaciente(id).then(res => {
          if (res) {
            setHistorial(res);
          }
        });
      }
    }
  }, [id]);
  
  return (
    <div className='container'>
      <h1>{ id !== 'nuevo' ? `${nombre}` : 'Nuevo paciente' }</h1>
      <hr/>
      <Button color='danger' onClick={goBack}>
        <i className="fa fa-arrow-left"></i> Regresar
      </Button>
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
        rol === 'recepcionista' && (
          id !== 'nuevo' && (
            <div className='citasContainer'>
              <h1>Historial de citas</h1>
              <hr/>
              {
                citas.length === 0 ? <NoDataMessage/> : <DynamicTable headers={headers} rows={rows} />
              }
            </div>
          )
        )
      }
      {
        rol === 'nutriologo' && (
          id !== 'nuevo' && (
            historial ? (
              <div className='paymentContainer'>
                <h1>Historial Clinico</h1>
                <hr/>
                <Button color='success' onClick={() => navigate(`/nutriologo/historial-clinico/${historial.id}`)}>Consultar historial clinico</Button>
              </div>
            )
          : (
            <div className='paymentContainer'>
              <h1>Historial Clinico</h1>
              <hr/>
              <Button color='danger' onClick={() => navigate('/nutriologo/historial-clinico/nuevo')}>Agregar historial clinico</Button>
            </div>
            )
          )
        )
      }
      {
        rol === 'nutriologo' && (
         id && id !== 'nuevo' && <AntropometicosTable pacienteId={id}/>
        )
      }
      {
        rol === 'nutriologo' && (
          id && id !== 'nuevo' && <LaboratorialesTable pacienteId={id}/>
        )
      }
    </div>
  )
}