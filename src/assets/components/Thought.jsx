import '../Style/Thoughts.css';

function Preaching({ emotion }) {
  const tips = {
    stressed: ['Take a break', 'Talk with friends or relatives', 'Visit an expert'],
    sad: ['Go for a walk', 'Listen to music', 'Talk to someone you trust'],
    // Add more tips for other emotions...
  };

  return (
    <div className="preaching">
      <p>You seem to be highly {emotion}</p>
      <p>Please go through these tips:</p>
      <ul>
        {tips[emotion].map((tip, index) => (
          <li key={index}>{tip}</li>
        ))}
      </ul>
    </div>
  );
}

export default Preaching;
