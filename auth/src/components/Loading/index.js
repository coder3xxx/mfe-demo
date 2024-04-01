import React from 'react';
import { AtomSpinner } from 'react-epic-spinners';
import './styles.css';

export default function () {
  return (
    <div className="loading-effect">
      <AtomSpinner color="#1890FF" />
    </div>
  );
};
