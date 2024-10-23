import '../Style/Thoughts.css';

function Preaching({ emotion }) {
	const tips = {
		stressed: ['Take a break', 'Talk with friends or relatives', 'Visit an expert', 'Practice deep breathing', 'Engage in physical activity', 'Try meditation'],
		sad: ['Go for a walk', 'Listen to music', 'Talk to someone you trust', 'Engage in a hobby', 'Write down your thoughts', 'Watch a light-hearted movie'],
		tired: ['Take a short nap', 'Drink water', 'Stretch or do light exercise', 'Step outside for fresh air', 'Get a good night’s sleep', 'Reduce screen time'],
		calm: ['Practice mindfulness', 'Read a book', 'Enjoy some quiet time', 'Take a nature walk', 'Savor a cup of tea or coffee', 'Write in a journal'],
		excited: ['Channel your energy into a creative project', 'Share your excitement with friends', 'Plan an activity you’ve been looking forward to', 'Celebrate your achievements', 'Exercise to release pent-up energy', 'Make a to-do list for the next exciting step'],
		bored: ['Try learning something new', 'Start a new hobby', 'Watch a documentary or read a book', 'Call a friend or family member', 'Do some housework or organize your space', 'Challenge yourself with a puzzle or brain game'],
		happy: ['Share your happiness with others', 'Write down what you are grateful for', 'Capture the moment with a photo or journal entry', 'Do something nice for someone else', 'Celebrate the moment with a small reward', 'Keep doing what makes you happy'],
	};

	function getRandomTips(tipsArray) {
		const shuffled = tipsArray.sort(() => 0.5 - Math.random());
		return shuffled.slice(0, 2);
	}

	const selectedTips = getRandomTips(tips[emotion]);

	return (
		<div className="preaching">
			<p>You seem to be {emotion} now</p>
			<p>Please go through these tips:</p>
			<ul>
				{selectedTips.map((tip, index) => (
					<li key={index}>{tip}</li>
				))}
			</ul>
		</div>
	);
}

export default Preaching;
