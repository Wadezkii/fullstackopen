import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DiaryList: React.FC = () => {
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/diaries');
        setDiaryEntries(response.data);
      } catch (error) {
        console.error('Error fetching diary entries:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Diary Entries</h2>
      <ul>
        {diaryEntries.map((entry) => (
          <li key={entry.id}>
            <strong>Date:</strong> {entry.date}
            <br />
            <strong>Weather:</strong> {entry.weather}
            <br />
            <strong>Visibility:</strong> {entry.visibility}
            <br />
            <strong>Comment:</strong> {entry.comment}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DiaryList;
