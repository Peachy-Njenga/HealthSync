import React from 'react';

const ProgressBar = ({ completionPercentage }) => {
    const containerStyle = {
        height: '2px',
        width: '100%',
        // backgroundColor: '#ffffff',
        borderRadius: '5px',
        margin: '10px 0'
    };

    const fillerStyle = {
        height: '100%',
        width: `${completionPercentage}%`,
        backgroundColor: completionPercentage === 100 ? '#4caf50' : '#3b5998',
        borderRadius: 'inherit',
        textAlign: 'right'
    };

    return (
        <div style={containerStyle} className='bg-gray-100'>
            <div style={fillerStyle}></div>
        </div>
    );
};

export default ProgressBar;
