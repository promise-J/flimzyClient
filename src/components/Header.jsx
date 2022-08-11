import React from 'react'
import {Link} from 'react-router-dom'

const Header = () => {
    return (
        <header>
            <div className="headerLeft">
                <Link to='/'><div className="logo">F</div></Link>
            </div>
            <div className="headerRight">
                <Link to='/starting'><button>Sign up</button></Link>
                <Link to='/signup'><button>Already have account</button></Link>
            </div>
        </header>
    )
}

export default Header