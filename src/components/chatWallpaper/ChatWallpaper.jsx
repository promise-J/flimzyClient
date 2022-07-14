import React from 'react'
import { BiArrowBack } from 'react-icons/bi'
import { useDispatch } from 'react-redux'
import { setLeftView } from '../../redux/appSlice'
import './chatWallpaper.css'
import ColorPallete from './ColorPallete'
const colorArray = [
    'black', 'rgb(15,36,36)',
    'rgb(18,38,31)', 'rgb(17,36,28)',
    'rgb(17,30,39)', 'rgb(15,34,36)',
    'rgb(14,33,37)', 'rgb(31,29,37)',
    'rgb(33,33,33)', 'rgb(31,33,28)',
    'rgb(35,35,27)', 'rgb(38,36,25)',
    'rgb(38,15,16)', 'rgb(38,23,23)',
    'rgb(38,31,23)', 'rgb(10,29,37)',
    'rgb(13,21,35)', 'rgb(13,15,17)'
]

const ChatWallpaper = () => {

    const dispatch = useDispatch()

    return (
        <div className='left setting chatWallpaper'>
            <div className="setting-header" style={{background: 'rgb(32,44,51)'}}>
                <BiArrowBack className='icon' onClick={() => dispatch(setLeftView('setting'))} style={{ cursor: 'pointer' }} />
                <h4>Set Chat Wallpaper</h4>
            </div>
            <div className="setting-header-offset"></div>
            <div style={{margin: '5px 20%'}}>
                <input type="checkbox" />
                <span style={{marginLeft: 12, color: 'white', opacity: .5}}>Add WhatsApp Doodles</span>
            </div>
            <div className="color-panels">
                {
                    colorArray.map((color, idx)=>(
                        <ColorPallete color={color} key={idx} />
                    ))
                }
            </div>
        </div>
    )
}

export default ChatWallpaper