import React from "react";
import "./loop.css";

const Loop = ({ loop, setLoop }) => {
    const loopFunction = () => {
        setLoop((prevMode) => !prevMode);
    };

    return (
        <>
            <button className="loop-button" onClick={loopFunction}>
                {loop && <div className="stop-shuffle">/</div>}
                <i className="fa-solid fa-repeat"></i>
            </button>
        </>
    );
};

export default Loop;
