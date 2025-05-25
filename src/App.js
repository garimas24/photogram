
import React, { useState, useEffect } from 'react';
import Viewer from './Viewer';
import './App.css';

function App() {
    const [items, setItems] = useState([]);
    const [activeIdx, setActiveIdx] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch('/stories.json')
            .then(res => res.json())
            .then(data => {
                setItems(data);
                setIsLoading(false);
            });
    }, []);

    const open = idx => setActiveIdx(idx);
    const close = () => setActiveIdx(null);

    return (
        <div className="container">
            <header>Story Preview</header>

            {isLoading ? (
                <p>Preparing stories...</p>
            ) : (
                <section className="story-strip">
                    {items.map((story, i) => (
                        <img
                            src={story.url}
                            key={story.id}
                            alt="story-thumbnail"
                            onClick={() => open(i)}
                            className="mini"
                        />
                    ))}
                </section>
            )}

            {activeIdx !== null && (
                <Viewer
                    data={items}
                    current={activeIdx}
                    setCurrent={setActiveIdx}
                    exit={close}
                />
            )}
        </div>
    );
}

export default App;
