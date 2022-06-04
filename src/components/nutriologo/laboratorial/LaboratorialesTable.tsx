import React, { useState, useEffect } from 'react';
import moment from 'moment';
import 'moment/locale/es-mx';
import { Laboratorial } from '../../../types/nutriologo/laboratorial';
import { Button } from 'reactstrap';
import { DynamicTableContent } from '../../../types/ui';
import { getLaboratoriales } from '../../../helpers/nutriologo/laboratorial';
import { DynamicTable } from '../../ui/DynamicTable';
import { NoDataMessage } from '../../ui/NoDataMessage';
import { LaboratorialModal } from './LaboratorialModal';

interface Props {
  pacienteId: string;
}

const formatTable = (rows: Laboratorial[], navigate: (id: string) => void): JSX.Element[] => {
  return rows.map(({id, fecha, glucosa, trigliceridos}, index) => (
    <tr key={index}>
      <td>{index+1}</td>
      <td>{moment(fecha).format('LL')}</td>
      <td>{glucosa}</td>
      <td>{trigliceridos}</td>
      <td>
        <Button onClick={() => navigate(id)} className="me-3" color='info'><i className="fa fa-pen"></i></Button>
      </td>
    </tr>
  ));
};

const setTableData = (data: Laboratorial[], navigate: (id: string) => void): DynamicTableContent => {
  const tableData: DynamicTableContent = {
    headers: [
      { key: 'index', label: '#' },
      { key: 'fecha', label: 'Fecha' },
      { key: 'glucosa', label: "Glucosa" },
      { key: 'trigliceridos', label: 'Trigliceridos' },
      { key: 'tools', label: 'Herramientas' }
    ],
    rows: formatTable(data, navigate)
  }
  return tableData;
}

export const LaboratorialesTable = ({ pacienteId }: Props) => {
  const [laboratoriales, setLaboratoriales] = useState<Laboratorial[]>([]);
  const [open, setOpen] = useState(false);
  const [antropometricoId, setID] = useState('');

  const openLaboratorial = (id: string) => {
    setOpen(true);
    setID(id);
  };

  const { headers, rows } = setTableData(laboratoriales, openLaboratorial);

  useEffect(() => {
    getLaboratoriales(pacienteId).then(res => {
      if (res) {
        setLaboratoriales(res);
      }
    });
  }, [pacienteId])
  
  return (
    <div>
      <h1>Laboratoriales</h1>
      <hr/>
      {
        laboratoriales.length === 0 ? (
          <div>
            <Button color='primary' onClick={() => setOpen(true)}>Agregar</Button>
            <LaboratorialModal isOpen={open} setOpen={setOpen} id={'nuevo'} pacienteId={pacienteId}
                          laboratoriales={laboratoriales} setLaboratoriales={setLaboratoriales}/>
            <NoDataMessage/>
          </div>
        ) : (
          <div>
            <Button color='primary' onClick={() => {setOpen(true); setID('nuevo')}}>Agregar</Button>
            <DynamicTable headers={headers} rows={rows}/>
            <LaboratorialModal isOpen={open} setOpen={setOpen} id={antropometricoId} pacienteId={pacienteId}
                              laboratoriales={laboratoriales} setLaboratoriales={setLaboratoriales}/>
          </div>
        )
      }
    </div>
  )
}
