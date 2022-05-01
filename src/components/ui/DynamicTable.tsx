import React from 'react';
import { Table } from 'reactstrap';
import { DynamicTableContent } from '../../types/ui';

export const DynamicTable = ({headers, rows}:DynamicTableContent) => {

  return (
    <Table striped className="table">
      <thead>
        <tr>
          {
            headers.map(({key, label}) => <th key={key}>{label}</th>)
          }
        </tr>
      </thead>
      <tbody>
          {
            rows
          }
      </tbody>
    </Table>
  )
}