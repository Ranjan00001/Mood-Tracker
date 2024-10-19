import React, { useState } from 'react';
import EmotionMeter from '../src/assets/components/EmotionMeter';
import Preaching from '../src/assets/components/Thought';
import GraphBar from '../src/assets/components/GraphBar';
import './App.css';

function App() {
  const emotions = [
    { name: 'calm', color: '#D3D3D3' },
    { name: 'excite', color: '#808080' },
    { name: 'sad', color: '#FF6666' },
    { name: 'stressed', color: '#FF3333' },
    { name: 'tired', color: '#66CC99' },
    { name: 'relaxed', color: '#336666' },
    { name: 'bored', color: '#A9A9A9' }
  ];

  const graphData = [
    {
      day: 'Sunday',
      moods: [
        { emotion: 'calm', percentage: 16, color: '#D3D3D3' },
        { emotion: 'excite', percentage: 5, color: '#808080' },
        { emotion: 'sad', percentage: 23, color: '#FF6666' },
        { emotion: 'stressed', percentage: 7, color: '#FF3333' },
        { emotion: 'tired', percentage: 15, color: '#66CC99' }
      ]
    },
    {
      day: 'Monday',
      moods: [
        { emotion: 'calm', percentage: 21, color: '#D3D3D3' },
        { emotion: 'excite', percentage: 13, color: '#808080' },
        { emotion: 'sad', percentage: 5, color: '#FF6666' },
        { emotion: 'stressed', percentage: 15, color: '#FF3333' },
        { emotion: 'tired', percentage: 25, color: '#66CC99' }
      ]
    },
    // Add more data for other days...
  ];

  const [selectedEmotion, setSelectedEmotion] = useState('stressed');

  return (
    <div className="app-container">
      <div className="left-section">
        <EmotionMeter
          emotions={emotions}
          selectedEmotion={selectedEmotion}
        />
      </div>
      <div className="center-section">
        <Preaching emotion={selectedEmotion} />
      </div>
      <div className="right-section">
        <GraphBar data={graphData} />
      </div>
    </div>
  );
}

export default App;
