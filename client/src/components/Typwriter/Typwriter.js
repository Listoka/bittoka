import React from 'react';
import './Typwriter.css';
import Typist from 'react-typist';
import 'react-typist/dist/Typist.css';

// https://www.npmjs.com/package/react-typist#onTypingDone for documentation
const Typwriter = ({ children }) => {
    return (
        <Typist>
            <Typist.Delay ms={2000} />
            is ...
            <Typist.Backspace count={3} delay={1500} />
            <Typist.Delay ms={1500} />
            in development
            <Typist.Backspace count={14} delay={3000} />
            <Typist.Delay ms={1500} />
            a collaborative effort
            <Typist.Backspace count={22} delay={3000} />
            <Typist.Delay ms={1500} />
            a place to share my story
        </Typist>
    );
};

export default Typwriter;
