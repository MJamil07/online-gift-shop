import React from 'react';

const HeadingText = ({ text } : {text : string}) => {
    
    const colors = ['#FF5733', '#C70039', '#900C3F','#FF5733', '#FF5733'];

    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const textStyle = {
        color: randomColor,
        fontWeight: 'bold',
        textDecoration: 'underline', 
    };

    return (
        <span style={textStyle}>{text}</span>
    );
};

export default HeadingText;