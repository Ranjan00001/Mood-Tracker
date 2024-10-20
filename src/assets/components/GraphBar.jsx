import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js';

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend
);

const GraphBar = () => {
	const moods = {
		calm: '#D3D3D3',
		excited: '#808080',
		sad: '#FF6666',
		stressed: '#FF3333',
		tired: '#66CC99',
		relaxed: '#87CEEB',
		bored: '#FFD700',
	};

	const graphData = [
		{
			day: 'Sunday',
			moods: { calm: 16, excited: 5, sad: 23, stressed: 7, tired: 15, relaxed: 10, bored: 9 },
		},
		{
			day: 'Monday',
			moods: { calm: 21, excited: 13, sad: 5, stressed: 15, tired: 25, relaxed: 8, bored: 13 },
		},
		{
			day: 'Tuesday',
			moods: { calm: 18, excited: 7, sad: 10, stressed: 12, tired: 20, relaxed: 15, bored: 18 },
		},
	];

	const labels = graphData.map(item => item.day);

	const datasets = Object.keys(moods).map(emotion => {
		const emotionPercentage = graphData.map(item => item.moods[emotion] || 0);
		return {
			label: emotion,
			data: emotionPercentage,
			backgroundColor: moods[emotion],
			barPercentage: 0.8,
		};
	});

	const options = {
		plugins: {
			legend: {
				display: false,
			},
		},
		responsive: true,
		scales: {
			x: {
				stacked: true,
			},
			y: {
				stacked: true,
				beginAtZero: true,
			},
		},
	};

	return (
		<div>
			<Bar data={{labels, datasets}} options={options} />
		</div>
	);
};

export default GraphBar;
