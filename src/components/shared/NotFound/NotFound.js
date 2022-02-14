import * as React from 'react';
import ErrorNotFoundImage from '../../../assets/images/image-not-found.png';

const NotFound = () =>(
<img style={{
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: '3rem'
    }} src={ErrorNotFoundImage}></img>
)

export default NotFound;