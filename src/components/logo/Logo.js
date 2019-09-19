import React from 'react';
import Tilt from 'react-tilt'
import './Logo.css'
import brain from './brain.png'
const Logo =()=>{
    return(
        <div className='ma5 mt2'>
            <Tilt className="Tilt" options={{ max : 30 }} style={{ height: 105, width: 105 }} >
                <div className="Tilt-inner pa3"><img alt='logo' src={brain} style={{paddingTop: '4px'}}/></div>                
            </Tilt>
        </div>
    );
}


export default Logo;