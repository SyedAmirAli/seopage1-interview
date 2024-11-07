import React from "react";

const Loading: React.FC<{ value?: boolean }> = ({ value = true }) => {
    if (!value) return null;

    return (
        <div className="spinner-box fixed top-0 left-0 bottom-0 right-0 w-full h-screen flex items-center justify-center z-50 bg-opacity-60 backdrop-blur-sm">
            <div className="pulse-container relative z-50">
                <div className="pulse-bubble pulse-bubble-1 bg-violet-500"></div>
                <div className="pulse-bubble pulse-bubble-2 bg-violet-500"></div>
                <div className="pulse-bubble pulse-bubble-3 bg-violet-500"></div>
            </div>
        </div>
    );
};

export default Loading;
