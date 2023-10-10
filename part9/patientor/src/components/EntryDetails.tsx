import React from 'react';
import { Entry } from '../types';
import { Icon } from '@mui/material';

interface EntryDetailsProps {
  entry: Entry;
}

const EntryDetails: React.FC<EntryDetailsProps> = ({ entry }) => {
  switch (entry.type) {
    case 'Hospital':
      return (
        <div>
          <Icon>hospital_icon</Icon>
          <h3>Hospital Entry</h3>
          <p>Description: {entry.description}</p>
        </div>
      );
    case 'OccupationalHealthcare':
      return (
        <div>
          <Icon>occupational_healthcare_icon</Icon>
          <h3>Occupational Healthcare Entry</h3>
          <p>Description: {entry.description}</p>
         
        </div>
      );
    default:
      return null;
    }
};

export default EntryDetails;
