import React from 'react'
import notfoundImg from '../../Assets/images/error.svg'
function NotFound() {
    return (
        <div className='text-center'>
            <img className='w-50' src={notfoundImg} alt="" />
        </div>
    )
}

export default NotFound