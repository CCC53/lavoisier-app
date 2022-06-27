import React from 'react';
import { Spinner } from 'reactstrap';

export const LoadingMessage = () => {
  return (
    <div className='loading'>
      <div>
        <Spinner color="primary" type="grow"/>
        <Spinner color="primary" type="grow"/>
        <Spinner color="primary" type="grow"/>
        <Spinner color="primary" type="grow"/>
        <Spinner color="primary" type="grow"/>
        <Spinner color="primary" type="grow"/>
      </div>
      <span>Espere por favor</span>
    </div>
  )
}
