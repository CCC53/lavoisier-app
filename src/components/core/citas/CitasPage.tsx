import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, ButtonGroup, ButtonToolbar, Col, Input } from 'reactstrap';
import { DynamicTable } from '../../ui/DynamicTable';
import { getAllCitas, deleteCita } from '../../../helpers/cita';
import { Cita } from '../../../types/cita';
import { DynamicTableContent } from '../../../types/ui';
import Swal from 'sweetalert2';
import { NoDataMessage } from '../../ui/NoDataMessage';
import { LoadingMessage } from '../../ui/LoadingMessage';
import { useForm } from '../../../hooks/useForm';
import moment from 'moment';
import 'moment/locale/es-mx';

moment.locale('es-mx');

const formatTable = (rows: Cita[], navigate: (id: string) => void, deleteAction: (id: string) => void): JSX.Element[] => {
  return rows.map(({fecha, horario, id, motivo}, index) => (
    <tr key={index}>
      <td>{index+1}</td>
      <td>{motivo}</td>
      <td>{moment(fecha).format('LL')}</td>
      <td>{horario}</td>
      <td>
        <Button onClick={() => navigate(id)}  className="me-3" color='info'><i className="fa fa-pen"></i></Button>
        <Button onClick={() => deleteAction(id)} color='danger'><i className="fa fa-trash"></i></Button>
      </td>
    </tr>
  ));
};

const setTableData = (data: Cita[], navigate: (id: string) => void, deleteAction: (id: string) => void) => {
  const tableData: DynamicTableContent = {
    headers: [
      { key: 'index', label: '#' },
      { key: 'motivo', label: 'Motivo' },
      { key: 'date', label: "Fecha" },
      { key: 'horario', label: 'Horario' },
      { key: 'tools', label: 'Herramientas' },
    ],
    rows: formatTable(data, navigate, deleteAction)
  }
  return tableData;
}

export const CitasPage = () => {

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [citas, setCitas] = useState<Cita[]>([]);
  const [data, setData] = useState<Cita[]>([]);
  const [backup, setBackup] = useState<Cita[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [formValues, handleInputChange] = useForm({
    search: ''
  })
  const { search } = formValues;
  
  const navigateToCita = (id: string) => {
    navigate(`${pathname}/${id}`);
  }

  const navigateToNew = () => {
    navigate(`${pathname}/nuevo`);
  }

  const deleteButton = (id: string) => {
    Swal.fire({
      title: '¿Desea eliminar este registro?',
      text: "No podrá revertir esto",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteCita(id).then(res => {
          Swal.fire({
            title: 'Eliminado',
            text: 'Este registro ha sido eliminado',
            icon: 'success'
          }).then((result) => {
            if(result.isConfirmed) {
              setCitas(citas.filter(item => item.id !== id));
            }
          })
        });
      }
    })
  }

  const handleSearch = () => {
    setCitas(citas.filter(item => item.horario === search));
  };

  const handleCloseSearch = () => {
    setCitas(data);
  }

  const filterNextCitas = () => {
    setCitas(
      backup.filter( ({fecha}) => {
        const nextDate = moment().add(1, 'days');
        const fechaCita = moment(fecha);
        return nextDate.get('D') === fechaCita.get('D') && nextDate.get('M') === fechaCita.get('M');
      })
    );
  }

  const filterAllCitas = () => {
    setCitas(data);
  }

  const filterTodayCitas = () => {
    setCitas(backup.filter(({fecha}) => {
      const today = moment();
      const fechaCita = moment(fecha);
      return today.get('D') === fechaCita.get('D') && today.get('M') === fechaCita.get('M');
    }));
  };

  const { headers, rows } = setTableData(citas, navigateToCita, deleteButton);
  
  useEffect(() => {
    getAllCitas().then(res => {
      if (res) {
        setTimeout(() => {
          setCitas(res);
          setData(res);
          setBackup(res);
          setLoading(false);
        }, 200);
      }
    });
  }, []);
  
  return (
    <div className='container'>
      <h1>Citas</h1>
      <hr/>
      <div className='subHeader'>
        <Button color="primary" onClick={navigateToNew}>Agregar</Button>
        <Col md={3}>
          <Input placeholder='Buscar' name='search' type='time' value={search} onChange={handleInputChange}/>
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
      <div className='filterContainer'>
        <ButtonToolbar>
          <ButtonGroup>
            <Button outline={true} color='info' onClick={filterTodayCitas}>Citas de hoy</Button>
            <Button outline={true} color='info' onClick={filterAllCitas}>Todas las citas</Button>
            <Button outline={true} color='info' onClick={filterNextCitas}>Citas del dia siguiente</Button>
          </ButtonGroup>
        </ButtonToolbar>
      </div>
      {
        loading ? <LoadingMessage/> : citas.length === 0 ? <NoDataMessage/> : <DynamicTable headers={headers} rows={rows}/>
      }
    </div>
  )
}
