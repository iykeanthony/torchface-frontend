import React from 'react';
import './ImageLinkForm.css'

const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
    return (
        <div>
            <p>
                {'This Magic Brain App will detect any face on your picture. Give it a try!'}
            </p>
            <div className='center'>
                <div className='center form pa3 br3 shadow-5'>
                    <input type='text' onChange={onInputChange} placeholder='Paste Image Link' className='f4 bg-light-grey no-border pa2 w-75 center' />
                    <button onClick={onButtonSubmit} className='w-25 grow f4 link ph3 pv2 dib white bg-color no-border'>Detect Face</button>
                </div>
            </div>
        </div>
    )
}


export default ImageLinkForm;