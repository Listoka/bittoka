import React from 'react';
import { Container } from '../Widgets';

export const CategoryDescription = props => {
    return (
        <Container>
          <h2 className='font-header mb-3'>{props.displayName}</h2>
          <p className='font-paragraph mb-3'>{props.description}</p>
        </Container>
    );
};