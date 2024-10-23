import React from 'react';
import '../Style/EmotionMeter.css';

function EmotionMeter({ emotion, value, onMeterChange }) {
  const handleClick = (index) => {
    onMeterChange(emotion.name, index + 1); // Pass updated value (1-8) to parent
  };

  return (
    <div className="emotion-meter-container">
      {/* Emotion name displayed above the meter */}
      <div className="emotion-label">{emotion.name}</div>

      {/* Render 8 sections and separators between them */}
      <div className="emotion-meter">
        {[...Array(3)].map((_, index) => (
          <React.Fragment key={index}>
            <div
              className={`emotion-item ${value > index ? 'active' : ''}`}
              id={index === 2 ? 'last' : (index === 0 ? 'first': '')}
              style={{ backgroundColor: value > index ? emotion.color : '#E0E0E0' }}
              onClick={() => handleClick(index)}
            />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default EmotionMeter;
