import React, { useEffect, useState } from 'react'
import { Button } from 'reactstrap'
import { useNavigate } from 'react-router-dom';
import { getAllPagos } from '../../helpers/recepcionista/pago';
import { LoadingMessage } from '../ui/LoadingMessage';
import { NoDataMessage } from '../ui/NoDataMessage';
import { DynamicTable } from '../ui/DynamicTable';
import { DynamicTableContent } from '../../types/ui';
import { Pago } from '../../types/recepcionista/pago';

const formatTable = (rows: Pago[], navigate: (id: string) => void): JSX.Element[] => {
  return rows.map(({id, tipoPago, metodoPago}, index) => (
    <tr key={index}>
      <td>{index+1}</td>
      <td>{tipoPago === 1 ? 'Primera cita' : 'Cita posterior'}</td>
      <td>{metodoPago === 'E' ? 'Efectivo' : 'Tarjeta de credito/debito'}</td>
      <td>
        <Button onClick={() => navigate(id)} className="me-3" color='info'><i className="fa fa-eye"></i></Button>
      </td>
    </tr>
  ))
}

const setTableData = (data: Pago[], navigate: (id: string) => void): DynamicTableContent => {
  const tableData: DynamicTableContent = {
    headers: [
      { key: 'index', label: '#' },
      { key: 'tipoPago', label: 'Tipo de pago' },
      { key: 'metodoPago', label: "Metodo de pago" },
      { key: 'tools', label: 'Herramientas' }
    ],
    rows: formatTable(data, navigate)
  }
  return tableData;
}

export const PagosPage = () => {
  const navigate = useNavigate();
  const [pagos, setPagos] = useState<Pago[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  
  const navigateToNew = () => {
    navigate('/recepcionista/pagos/nuevo');
  }

  const navigateToPago = (id: string): void => {
    navigate(`/recepcionista/pagos/${id}`);
  }

  const { headers, rows } = setTableData(pagos, navigateToPago);

  useEffect(() => {
    getAllPagos().then(res => {
      if(res) {
        setTimeout(() => {
          setPagos(res);
          setLoading(false);
        }, 200);
      }
    });
  }, []);

  return (
    <div className='container'>
      <h1>Pagos</h1>
      <hr/>
      <Button color="primary" onClick={navigateToNew}>Agregar</Button>
      {
        loading ? <LoadingMessage/> : pagos.length === 0 ? <NoDataMessage/> : <DynamicTable headers={headers} rows={rows}/>
      }
    </div>
  )
}