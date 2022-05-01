import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'reactstrap';
import { DynamicTable } from '../../ui/DynamicTable';
import { getAllCitas, deleteCita } from '../../../helpers/cita';
import { Cita } from '../../../types/cita';
import { DynamicTableContent } from '../../../types/ui';
import Swal from 'sweetalert2';

const formatTable = (rows: Cita[], navigate: (id: string) => void, deleteAction: (id: string) => void): JSX.Element[] => {
  return rows.map(({fecha, horario, id, motivo}, index) => (
    <tr key={index}>
      <td>{index+1}</td>
      <td>{motivo}</td>
      <td>{fecha}</td>
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
  const [citas, setCitas] = useState<Cita[]>([]);
  
  const navigateToCita = (id: string) => {
    navigate(`/citas/${id}`);
  }

  const navigateToNew = async() => {
    navigate('/citas/nuevo');
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
        setCitas(citas.filter(item => item.id !== id));
        deleteCita(id).then(res => {
          Swal.fire(
            'Eliminado',
            'Este registro ha sido eliminado',
            'success'
          )
        });
      }
    })
  }

  const { headers, rows } = setTableData(citas, navigateToCita, deleteButton);
  
  useEffect(() => {
    getAllCitas().then(res => res && setCitas(res));
  }, []);
  
  return (
    <div className='container'>
      <h1>Citas</h1>
      <hr/>
      <Button color="primary" onClick={navigateToNew}>Agregar</Button>
      <DynamicTable headers={headers} rows={rows}/>
    </div>
  )
}
