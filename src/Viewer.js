import React, { useEffect } from 'react';

function Viewer({ data, current, setCurrent, exit }) {
useEffect(() => {
const timer = setTimeout(() => {
if (current < data.length - 1) setCurrent(current + 1);
else exit();
}, 5000);

return () => clearTimeout(timer);
}, [current, data.length, exit, setCurrent]);

const goBack = () => {
if (current > 0) setCurrent(current - 1);
};

const goForward = () => {
if (current < data.length - 1) setCurrent(current + 1);
else exit();
};

return (
<div className="overlay">
<div className="viewer">
<div className="zone left" onClick={goBack} />
<img src={data[current].url} alt="current-story" className="story-full" />
<div className="zone right" onClick={goForward} />
<img src='{data}[current}.url'
alt='story'
className='story-full fade'/>
</div>
</div>
);
}

export default Viewer;
