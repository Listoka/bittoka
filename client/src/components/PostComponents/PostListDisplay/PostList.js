import React from 'react';
import { Container } from '../../Widgets';

export const PostList = ({children}) => {
    return (
        <Container className='postList'>
            {children}
            {/*Perhaps 20-30 displayed per page with 5-10 visible on a normal screen */}
        </Container>
    );
};