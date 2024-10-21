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

const GraphBar = ({ emotions, graphData }) => {
	const labels = graphData.map(item => item.day);

	const datasets = emotions.map(emotion => {
		const emotionPercentage = graphData.map(item => item.moods[emotion.name] || 0);
		return {
			label: emotion.name,
			data: emotionPercentage,
			backgroundColor: emotion.color,
			barPercentage: 0.5,
			hoverBackgroundColor: 'rgba(0, 0, 0, 0.8)',
		};
	});

	const options = {
		plugins: {
			legend: {
				display: false,
			},
			tooltip: {
				enabled: true,
			},
		},
		responsive: true,
		maintainAspectRatio: false,
		scales: {
			x: {
				stacked: true,
			},
			y: {
				stacked: true,
				beginAtZero: true,
				max: 56
			},
		},
	};

	return (
		<div className="graph-container">
			<Bar data={{ labels, datasets }} options={options} height={300} width={300} />
		</div>
	);
};

export default GraphBar;
