import React from 'react'
import { useDispatch } from 'react-redux'
import { setShowTheme } from '../../redux/appSlice'
import './modal.css'

const ThemeModal = () => {
    const dispatch = useDispatch()
  return (
    <div className='themeModal'>
        <div className="theme1">
            <p>Choose a theme</p>
        </div>
        <div className="theme2">
            <div>
                <input name='theme' type="radio" />
                <span>Light</span>
            </div>
            <div>
                <input name='theme' type="radio" />
                <span>Dark</span>
            </div>
            <div>
                <input name='theme' type="radio" />
                <span>System Default</span>
            </div>
        </div>
        <div className="theme3">
            <div>
                <button onClick={() => dispatch(setShowTheme(false))}>Cancel</button>
                <button onClick={() => dispatch(setShowTheme(false))}>Ok</button>
            </div>
        </div>
    </div>
  )
}

export default ThemeModal