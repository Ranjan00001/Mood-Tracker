import React, { useState, useEffect } from 'react';
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
        { name: 'happy', color: '#336666' },
        { name: 'bored', color: '#A9A9A9' },
    ];

    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayIndex = new Date().getDay();
    const today = daysOfWeek[dayIndex];
    const yesterday = daysOfWeek[(dayIndex - 1 + 7) % 7];
    const dayBeforeYesterday = daysOfWeek[(dayIndex - 2 + 7) % 7];
    const dayBefBefYesterday = daysOfWeek[(dayIndex - 3 + 7) % 7];

    const [allEntries, setAllEntries] = useState([
        {
            day: dayBefBefYesterday,
            moods: { calm: 3, excited: 5, sad: 4, stressed: 6, tired: 8, happy: 2, bored: 7 },
        },
        {
            day: dayBeforeYesterday,
            moods: { calm: 6, excited: 2, sad: 3, stressed: 7, tired: 5, happy: 6, bored: 4 },
        },
        {
            day: yesterday,
            moods: { calm: 5, excited: 8, sad: 7, stressed: 3, tired: 4, happy: 4, bored: 6 },
        },
    ]);

    // Separate state to handle today's entries (with multiple half-hour logs)
    const [todayEntries, setTodayEntries] = useState([]);

    const [todayData, setTodayData] = useState({
        calm: 1,
        excited: 1,
        sad: 1,
        stressed: 1,
        tired: 1,
        happy: 1,
        bored: 1,
    });

    const [currentMood, setCurrentMood] = useState('stressed');
    const [selectedDateTime, setSelectedDateTime] = useState(new Date().toISOString().slice(0, 16)); // Default current date and time

    // Handle mood changes and update today's data
    const handleMeterChange = (emotionName, value) => {
        setTodayData(prevData => {
            const updatedData = { ...prevData, [emotionName]: value };
            const maxKey = Object.keys(updatedData).reduce((a, b) => updatedData[a] > updatedData[b] ? a : b);
            setCurrentMood(maxKey);
            return updatedData;
        });
    };

    // Handle date-time selection and reset values for new entry or load previous entry
    const handleDateTimeChange = (event) => {
        const newDateTime = event.target.value;
        setSelectedDateTime(newDateTime);

        const existingEntry = todayEntries.find(entry => entry.dateTime === newDateTime);

        if (existingEntry) {
            // Load existing data for the selected date-time
            setTodayData(existingEntry.moods);
        } else {
            // Reset to default values for new date-time
            setTodayData({
                calm: 1,
                excited: 1,
                sad: 1,
                stressed: 1,
                tired: 1,
                happy: 1,
                bored: 1,
            });
            setCurrentMood('stressed');
        }
    };

    // Automatically save each change in mood or date-time
    useEffect(() => {
        const saveEntry = () => {
            setTodayEntries(prevEntries => {
                const updatedEntries = [...prevEntries];
                const existingIndex = updatedEntries.findIndex(entry => entry.dateTime === selectedDateTime);

                if (existingIndex !== -1) {
                    // Update the existing entry for this date-time
                    updatedEntries[existingIndex] = { dateTime: selectedDateTime, moods: todayData };
                } else {
                    // Create a new entry for this date-time
                    updatedEntries.push({ dateTime: selectedDateTime, moods: todayData });
                }

                return updatedEntries;
            });
        };

        saveEntry();
    }, [todayData, selectedDateTime]);

    // Compute average values for today's entries
    const computeDailyAverage = () => {
        if (todayEntries.length === 0) return {};

        const totalMoods = todayEntries.reduce((totals, entry) => {
            Object.keys(entry.moods).forEach(emotion => {
                totals[emotion] = (totals[emotion] || 0) + entry.moods[emotion];
            });
            return totals;
        }, {});

        const averageMoods = {};
        Object.keys(totalMoods).forEach(emotion => {
            averageMoods[emotion] = Math.round(totalMoods[emotion] / todayEntries.length);
        });

        return averageMoods;
    };

    const getGraphData = () => {
		const todayDate = selectedDateTime.split('T')[0]; // Extract today's date in 'YYYY-MM-DD'
		const averageTodayMoods = computeDailyAverage();
	
		// Add today's average moods as a new entry, if applicable
		const graphData = [...allEntries];
		if (Object.keys(averageTodayMoods).length > 0) {
			const existingIndex = graphData.findIndex(entry => entry.day === todayDate);
			if (existingIndex !== -1) {
				graphData[existingIndex] = { day: todayDate, moods: averageTodayMoods };
			} else {
				graphData.push({ day: todayDate, moods: averageTodayMoods });
			}
		}
	
		// Sort the entries by date in ascending order
		const sortedGraphData = graphData.sort((a, b) => new Date(a.day) - new Date(b.day));
	
		// Get only the last three days of data for the graph
		const recentGraphData = sortedGraphData.slice(-4);
	
		return recentGraphData;
	};
	

    const combinedGraphData = getGraphData();

    return (
        <>
            <h1 className='header'>Your Daily Mood Tracker</h1>

            {/* DateTime Picker */}
            <div className="date-selector">
                <label htmlFor="datetime-picker">Select Date & Time for Entry: </label>
                <input
                    type="datetime-local"
                    id="datetime-picker"
                    value={selectedDateTime}
                    onChange={handleDateTimeChange}
                    max={new Date().toISOString().slice(0, 16)}
                    step="1800" // Allow half-hour increments
                />
            </div>

            <div className="app-container">
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

                <div className="center-section">
                    <Preaching emotion={currentMood} />
                </div>

                <div className="right-section">
                    <GraphBar emotions={emotions} graphData={combinedGraphData} />
                </div>
            </div>
        </>
    );
}

export default App;
