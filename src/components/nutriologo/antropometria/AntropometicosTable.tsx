import React, { useState, useEffect } from 'react';
import moment from 'moment';
import 'moment/locale/es-mx';
import { Button } from 'reactstrap';
import { DynamicTableContent } from '../../../types/ui';
import { Antropometria } from '../../../types/nutriologo/antropometria';
import { getAntropometricos } from '../../../helpers/nutriologo/antropometria';
import { DynamicTable } from '../../ui/DynamicTable';
import { NoDataMessage } from '../../ui/NoDataMessage';
import { AntropometricoModal } from './AntropometricoModal';

interface Props {
  pacienteId: string;
}

const formatTable = (rows: Antropometria[], navigate: (id: string) => void): JSX.Element[] => {
  return rows.map(({id, fecha, peso, talla}, index) => (
    <tr key={index}>
      <td>{index+1}</td>
      <td>{moment(fecha).format('LL')}</td>
      <td>{peso}</td>
      <td>{talla}</td>
      <td>
        <Button onClick={() => navigate(id)} className="me-3" color='info'><i className="fa fa-pen"></i></Button>
      </td>
    </tr>
  ));
};

const setTableData = (data: Antropometria[], navigate: (id: string) => void): DynamicTableContent => {
  const tableData: DynamicTableContent = {
    headers: [
      { key: 'index', label: '#' },
      { key: 'fecha', label: 'Fecha' },
      { key: 'peso', label: "Peso" },
      { key: 'talla', label: 'Talla' },
      { key: 'tools', label: 'Herramientas' }
    ],
    rows: formatTable(data, navigate)
  }
  return tableData;
}

export const AntropometicosTable = ({ pacienteId }: Props) => {
  const [antropometricos, setAntropometricos] = useState<Antropometria[]>([]);
  const [open, setOpen] = useState(false);
  const [antropometricoId, setID] = useState(''); 

  const openAntropometrico = (id: string) => {
    setOpen(true);
    setID(id);
  }

  const { headers, rows } = setTableData(antropometricos, openAntropometrico);

  useEffect(() => {
    getAntropometricos(pacienteId).then(res => {
      if (res) {
        setAntropometricos(res);
      }
    });
  }, [pacienteId])
  
  return (
    <div>
      <h1>Antropometria</h1>
      <hr/>
      {
        antropometricos.length === 0 ? (
          <div>
            <Button color='primary' onClick={() => setOpen(true)}>Agregar</Button>
            <AntropometricoModal isOpen={open} setOpen={setOpen} id={'nuevo'} pacienteId={pacienteId}
                          antropometricos={antropometricos} setAntropometricos={setAntropometricos}/>
            <NoDataMessage/>
          </div>
        ) : (
          <div>
            <Button color='primary' onClick={() => {setOpen(true); setID('nuevo')}}>Agregar</Button>
            <DynamicTable headers={headers} rows={rows}/>
            <AntropometricoModal isOpen={open} setOpen={setOpen} id={antropometricoId} pacienteId={pacienteId}
                                antropometricos={antropometricos} setAntropometricos={setAntropometricos}/>
          </div>
        )
      }
    </div>
  )
}