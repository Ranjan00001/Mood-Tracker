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

    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayIndex = new Date().getDay();
    const today = daysOfWeek[dayIndex];
    const yesterday = daysOfWeek[(dayIndex - 1 + 7) % 7];
    const dayBeforeYesterday = daysOfWeek[(dayIndex - 2 + 7) % 7];
    const dayBefBefYesterday = daysOfWeek[(dayIndex - 3 + 7) % 7];

    const [allEntries, setAllEntries] = useState([
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
    ]);

    const [todayData, setTodayData] = useState({
        calm: 1,
        excited: 1,
        sad: 1,
        stressed: 1,
        tired: 1,
        relaxed: 1,
        bored: 1,
    });

    const [currentMood, setCurrentMood] = useState('stressed');
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

    const handleMeterChange = (emotionName, value) => {
        setTodayData(prevData => {
            const updatedData = { ...prevData, [emotionName]: value };
            const maxKey = Object.keys(updatedData).reduce((a, b) => updatedData[a] > updatedData[b] ? a : b);
            setCurrentMood(maxKey);
            return updatedData;
        });
    };

    const handleDateChange = (event) => {
        const newDate = event.target.value;
        setSelectedDate(newDate);

        const existingEntry = allEntries.find(entry => entry.day === newDate);

        if (existingEntry) {
            setTodayData(existingEntry.moods);
        } else {
            setTodayData({
                calm: 1,
                excited: 1,
                sad: 1,
                stressed: 1,
                tired: 1,
                relaxed: 1,
                bored: 1,
            });
            setCurrentMood('stressed');
        }
    };

    const saveEntry = () => {
        setAllEntries(prevEntries => {
            const updatedEntries = [...prevEntries];
            const existingIndex = updatedEntries.findIndex(entry => entry.day === selectedDate);

            if (existingIndex !== -1) {
                updatedEntries[existingIndex] = { day: selectedDate, moods: todayData };
            } else {
                updatedEntries.push({ day: selectedDate, moods: todayData });
            }

            return updatedEntries;
        });
    };

    const getLatestEntries = () => {
        const latestEntries = allEntries.slice(-3);

        const todayEntryExists = latestEntries.find(entry => entry.day === selectedDate);
        if (!todayEntryExists) {
            latestEntries.push({ day: selectedDate, moods: todayData });
        }

        return latestEntries;
    };

    const combinedGraphData = getLatestEntries();

    return (
        <>
            <h1 className='header'>Your Daily Mood Tracker</h1>

            {/* Date Picker */}
            <div className="date-selector">
                <label htmlFor="date-picker">Select a Date for Entry: </label>
                <input
                    type="date"
                    id="date-picker"
                    value={selectedDate}
                    onChange={handleDateChange}
                    max={new Date().toISOString().split('T')[0]}
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

                    <button onClick={saveEntry} style={{ cursor:'pointer', borderRadius:'25px', padding:'3px 10px'}}>Save</button>
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
