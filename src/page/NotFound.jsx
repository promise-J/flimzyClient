import React from 'react'
import './notFound.css'
import {Link} from 'react-router-dom'

const NotFound = () => {
    return (
        <div className='notFound'>
            <div className="notFoundWrapper">
            <div className="notFoundLeft">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7OW4wGYWuG19sGKFs8kdDZjha1g7S2S5pdA&usqp=CAU" alt="not found" />
            </div>
            <div className="notFoundRight">
              <h1>Seems you were lost using Flimzy App</h1>
              <Link className='link' to='/chat'>
              <button>Go Back</button>
              </Link>
            </div>
            </div>
        </div>
    )
}

export default NotFound