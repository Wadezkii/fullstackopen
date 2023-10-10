import React from 'react';
import { DiaryEntry } from '../../part9/flight-diary/src/types'; // Adjust the import path

interface DiaryEntryProps {
  diary: DiaryEntry;
}

const DiaryEntryComponent: React.FC<DiaryEntryProps> = ({ diary }) => {
  return (
    <div>
      <h3>Diary Entry</h3>
      <p><strong>Date:</strong> {diary.date}</p>
      <p><strong>Weather:</strong> {diary.weather}</p>
      <p><strong>Visibility:</strong> {diary.visibility}</p>
      <p><strong>Comment:</strong> {diary.comment}</p>
    </div>
  );
};

export default DiaryEntryComponent;
