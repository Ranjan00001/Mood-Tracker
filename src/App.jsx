import React, { useState } from 'react';
import EmotionMeter from '../src/assets/components/EmotionMeter';
import GraphBar from '../src/assets/components/GraphBar';
import Preaching from './assets/components/Thought';
import './App.css';

function App() {
	const emotions = [
		{ name: 'calm', color: '#D3D3D3' },
		{ name: 'excited', color: '#808080' },
		{ name: 'sad', color: '#FF6666' },
		{ name: 'stressed', color: '#FF3333' },
		{ name: 'tired', color: '#66CC99' },
		{ name: 'relaxed', color: '#336666' },
		{ name: 'bored', color: '#A9A9A9' },
	];
	const [currentMood, setCurrentMood] = useState('stressed');
	const [todayData, setTodayData] = useState({
		calm: 1,
		excited: 1,
		sad: 1,
		stressed: 1,
		tired: 1,
		relaxed: 1,
		bored: 1,
	});

	const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	const dayIndex = new Date().getDay()
	const today = daysOfWeek[dayIndex]
	const yesterday = daysOfWeek[(dayIndex - 1 + 7) % 7]
	const dayBeforeYesterday = daysOfWeek[(dayIndex - 2 + 7) % 7]
	const dayBefBefYesterday = daysOfWeek[(dayIndex - 3 + 7) % 7]
	const previousGraphData = [
		{
			day: dayBefBefYesterday,
			moods: { calm: 3, excited: 5, sad: 4, stressed: 6, tired: 8, relaxed: 2, bored: 7 },
		},
		{
			day: dayBeforeYesterday,
			moods: { calm: 6, excited: 2, sad: 3, stressed: 7, tired: 5, relaxed: 6, bored: 4 },
		},
		{
			day: yesterday,
			moods: { calm: 5, excited: 8, sad: 7, stressed: 3, tired: 4, relaxed: 4, bored: 6 },
		},
	];

	// Handler to update today's mood data when an emotion meter is changed
	const handleMeterChange = (emotionName, value) => {
		setTodayData(prevData => ({
			...prevData,
			[emotionName]: value, // Update only the selected emotion's value (1-8)
		}));
		const maxKey = value > todayData[currentMood] ? emotionName : currentMood
		setCurrentMood(maxKey)
	};

	// Combine today's data with previous days
	const combinedGraphData = [
		...previousGraphData,
		{ day: 'Today', moods: todayData },
	];

	return (
		<div className='main'>
			<h1 className='header'>Your daily Mood Tracker</h1>
			<div className="app-container">
				{/* Left section: List of emotion meters */}
				<div className="left-section">
					{emotions.map(emotion => (
						<EmotionMeter
							key={emotion.name}
							emotion={emotion}
							value={todayData[emotion.name]}
							onMeterChange={handleMeterChange}
						/>
					))}
				</div>

				{/* Center section: Thought/Preaching section */}
				<div className="center-section">
					<Preaching emotion={currentMood} />
				</div>

				{/* Right section: Graph of emotion data */}
				<div className="right-section">
					<GraphBar emotions={emotions} graphData={combinedGraphData} />
				</div>
			</div>
		</div>
	);
}

export default App;
