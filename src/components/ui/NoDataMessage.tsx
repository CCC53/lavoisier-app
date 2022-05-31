import React from 'react';

export const NoDataMessage = () => {
  return (
    <div className="alert alert-warning text-center mt-3 animated fadeIn faster">
        <h4 className="alert-heading">No hay registros</h4>
        <p>
            <i className="fa fa-exclamation fa-2x"></i>
        </p>
    </div>
  )
}