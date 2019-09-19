import React from 'react';

const Rank =({name, entries})=>{
    return(
        <div>
        <div className='white f3'>
            {`Welcome ${name}, you've made `}
        </div>
        <div className='white f3'>
            { `${entries} entries`}
        </div>
        </div>
    )
}


export default Rank;