import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { Button } from 'reactstrap';
import { DynamicTableContent } from '../../../types/ui';
import { DynamicTable } from '../../ui/DynamicTable';
import { useLocation, useNavigate } from 'react-router-dom';
import { deletePaciente, getPacientes } from '../../../helpers/paciente';
import { Paciente } from '../../../types/paciente';
import { NoDataMessage } from '../../ui/NoDataMessage';
import { LoadingMessage } from '../../ui/LoadingMessage';

const formatTable = (rows: Paciente[], navigate: (id: string) => void, deleteAction: (id: string) => void): JSX.Element[] => {
  return rows.map(({email, nombre, id, telefono}, index) => (
    <tr key={index}>
      <td>{index+1}</td>
      <td>{nombre}</td>
      <td>{email}</td>
      <td>{telefono}</td>
      <td>
        <Button onClick={() => navigate(id)} className="me-3" color='info'><i className="fa fa-pen"></i></Button>
        <Button onClick={() => deleteAction(id)} color='danger'><i className="fa fa-trash"></i></Button>
      </td>
    </tr>
  ));
};

const setTableData = (data: Paciente[], navigate: (id: string) => void, deleteAction: (id: string) => void): DynamicTableContent => {
  const tableData: DynamicTableContent = {
    headers: [
      { key: 'index', label: '#' },
      { key: 'name', label: 'Nombre' },
      { key: 'email', label: "Email" },
      { key: 'phone', label: 'Teléfono' },
      { key: 'tools', label: 'Herramientas' }
    ],
    rows: formatTable(data, navigate, deleteAction)
  }
  return tableData;
}

export const PacientesPage = () => {
  const navigate = useNavigate();
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  const navigateToPaciente = (id: string): void => {
    navigate(`${pathname}/${id}`);
  }
  
  const navigateToNew = (): void => {
    navigate(`${pathname}/nuevo`);
  }

  const deleteButton = (id: string): void => {
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
      if(result.isConfirmed) {
        deletePaciente(id).then(res => {
          Swal.fire({
            title: 'Eliminado',
            text: 'Este registro ha sido eliminado',
            icon: 'success',
          }).then((result) => {
            if(result.isConfirmed) {
              setPacientes(pacientes.filter(item => item.id !== id));
            }
          })
        });
      }
    })
  }

  const { headers, rows } = setTableData(pacientes, navigateToPaciente, deleteButton);

  useEffect(() => {
    getPacientes().then(res => {
      if (res) {
        setTimeout(() => {
          setPacientes(res);
          setLoading(false);
        }, 200);
      }
    });
  }, [])
  
  return (
    <div className='container'>
      <h1>Pacientes</h1>
      <hr/>
      <Button color="primary" onClick={navigateToNew}>Agregar</Button>
      {
        loading ? <LoadingMessage/> : pacientes.length === 0 ? <NoDataMessage/> : <DynamicTable headers={headers} rows={rows}/>
      }
    </div>
  )
}