import React from 'react';

const HeadingText = ({ text } : {text : string}) => {
    
    const textStyle = {
        color: 'black',
        fontWeight: 'bold',
        textDecoration: 'underline'
    };

    return (
        <h3 style={textStyle}>{text}</h3>
    );
};

export default HeadingText;