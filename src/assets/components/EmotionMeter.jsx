import '../Style/EmotionMeter.css';

function EmotionMeter({ emotions, selectedEmotion }) {
  return (
    <div className="emotion-meter">
      {emotions.map((emotion, index) => (
        <div
          key={index}
          className={`emotion-item ${selectedEmotion === emotion.name ? 'active' : ''}`}
          style={{ backgroundColor: emotion.color }}
        >
          {emotion.name}
        </div>
      ))}
    </div>
  );
}

export default EmotionMeter;