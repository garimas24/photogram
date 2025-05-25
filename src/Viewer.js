// import React, { useEffect } from 'react';

// function Viewer({ data, current, setCurrent, exit }) {
// useEffect(() => {
// const timer = setTimeout(() => {
// if (current < data.length - 1) setCurrent(current + 1);
// else exit();
// }, 5000);

// return () => clearTimeout(timer);
// }, [current, data.length, exit, setCurrent]);

// const goBack = () => {
// if (current > 0) setCurrent(current - 1);
// };

// const goForward = () => {
// if (current < data.length - 1) setCurrent(current + 1);
// else exit();
// };


// return (
// <div className="overlay">
// <div className="viewer">
// <div className="zone left" onClick={goBack} />

// <img src={data[current].url} alt="current-story" className="story-full" />
// <div className="zone right" onClick={goForward} />
// <img src='{data}[current}.url'
// alt='story'
// className='story-full fade'/>
// </div>
// </div>

// );
// }

// export default Viewer;



import React, { useEffect, useState, useRef } from 'react';

function Viewer({ data, current, setCurrent, exit }) {
const [progress, setProgress] = useState(0);
const intervalRef = useRef(null);

const duration = 5000;
const updateInterval = 50;

// Function to start the progress bar and auto-advance timer
const startProgress = () => {
let timePassed = 0;
setProgress(0);

intervalRef.current = setInterval(() => {
timePassed += updateInterval;
setProgress((timePassed / duration) * 100);

if (timePassed >= duration) {
clearInterval(intervalRef.current);
if (current < data.length - 1) {
setCurrent(current + 1);
} else {
exit();
}
}
}, updateInterval);
};

// Reset timer and progress whenever current story changes
useEffect(() => {
clearInterval(intervalRef.current);
startProgress();
return () => clearInterval(intervalRef.current);
}, [current]);

const goBack = () => {
clearInterval(intervalRef.current);
if (current > 0) {
setCurrent(current - 1);
}
};

const goForward = () => {
clearInterval(intervalRef.current);
if (current < data.length - 1) {
setCurrent(current + 1);
} else {
exit();
}
};

return (
<div className="overlay">
<div className="viewer">
<div className="progress-bar">
<div
className="progress-fill"
style={{ width: `${progress}%` }}
/>
</div>
<div className="zone left" onClick={goBack}></div>
<img src={data[current].url} alt="story" className="story-full" />
<div className="zone right" onClick={goForward}></div>
</div>
</div>
);
}

export default Viewer;