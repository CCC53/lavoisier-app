import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Col, Input } from 'reactstrap';
import { getAllHistoriales } from '../../helpers/historialClinico';
import { useForm } from '../../hooks/useForm';
import { HistorialClinicoPopulated } from '../../types/historialClinico';
import { DynamicTableContent } from '../../types/ui';
import { DynamicTable } from '../ui/DynamicTable';
import { LoadingMessage } from '../ui/LoadingMessage';
import { NoDataMessage } from '../ui/NoDataMessage';

const formatTable = (rows: HistorialClinicoPopulated[], navigate: (id: string) => void): JSX.Element[] => {
  return rows.map(({id, paciente, sedentarismo, alcoholismo, tabaquismo}, index) => (
    <tr key={index}>
      <td>{index+1}</td>
      <td>{paciente.nombre}</td>
      <td>{sedentarismo}</td>
      <td>{alcoholismo}</td>
      <td>{tabaquismo}</td>
      <td>
        <Button onClick={() => navigate(id)} className="me-3" color='info'><i className="fa fa-eye"></i></Button>
      </td>
    </tr>
  ))
}

const setTableData = (data: HistorialClinicoPopulated[], navigate: (id: string) => void): DynamicTableContent => {
  const tableData: DynamicTableContent = {
    headers: [
      { key: 'index', label: '#' },
      { key: 'nombrePaciente', label: 'Nombre del paciente' },
      { key: 'sendentarismo', label: "Sedentarismo" },
      { key: 'alcoholismo', label: "Alcoholismo" },
      { key: 'tabaquismo', label: "Tabaquismo" },
      { key: 'tools', label: 'Herramientas' }
    ],
    rows: formatTable(data, navigate)
  }
  return tableData;
}

export const HistorialesClinicosPage = () => {
  const navigate = useNavigate();
  const [historiales, setHistoriales] = useState<HistorialClinicoPopulated[]>([]);
  const [backup, setBackup] = useState<HistorialClinicoPopulated[]>([]);
  const [loading, setLoading] = useState(true);
  const [formValues, handleInputChange] = useForm({
    search: ''
  })
  const { search } = formValues;

  const navigateToNew = () => {
    navigate('/nutriologo/historial-clinico/nuevo');
  }

  const navigateToHistorial = (id: string): void => {
    navigate(`/nutriologo/historial-clinico/${id}`);
  }

  const handleSearch = () => {
    setHistoriales(historiales.filter(item => item.paciente.nombre.toLowerCase().includes(search.toLowerCase().trim())));
  };

  const handleCloseSearch = () => {
    setHistoriales(backup);
  }

  const { headers, rows } = setTableData(historiales, navigateToHistorial);

  useEffect(() => {
    getAllHistoriales().then(res => {
      if (res) {
        setTimeout(() => {
          setHistoriales(res);
          setBackup(res);
          setLoading(false);
        }, 200);
      }
    })
  }, [])
  

  return (
    <div className='container'>
      <h1>Historiales Clinicos</h1>
      <hr/>
      <div className='subHeader'>
        <Button color="primary" onClick={navigateToNew}>Agregar</Button>
        <Col md={3}>
          <Input placeholder='Buscar' name='search' value={search} onChange={handleInputChange}/>
        </Col>
        <div className='searchContainer'>
          <Button color='success' onClick={handleSearch}>
            <i className='fa fa-search'></i>
          </Button>
          <Button color='danger' onClick={handleCloseSearch}>
            <i className='fa fa-times'></i>
          </Button>
        </div>
      </div>
      {
        loading ? <LoadingMessage/> : historiales.length === 0 ? <NoDataMessage/> : <DynamicTable headers={headers} rows={rows}/>
      }
    </div>
  )
}