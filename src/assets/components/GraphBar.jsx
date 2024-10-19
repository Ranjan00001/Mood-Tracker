import '../Style/GraphBar.css';

function GraphBar({ data }) {
  return (
    <div className="graph-container">
      {data.map((dayData, index) => (
        <div key={index} className="day-bar">
          {dayData.moods.map((mood, i) => (
            <div
              key={i}
              className="mood-segment"
              style={{ height: `${mood.percentage}%`, backgroundColor: mood.color }}
            >
              {mood.percentage > 10 ? `${mood.percentage}%` : null}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default GraphBar;
