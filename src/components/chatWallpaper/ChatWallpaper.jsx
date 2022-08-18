import React from 'react'
import { BiArrowBack } from 'react-icons/bi'
import { useDispatch, useSelector } from 'react-redux'
import { setLeftView } from '../../redux/appSlice'
import './chatWallpaper.css'
import ColorPallete from './ColorPallete'
const colorArray = [
    'black', 'purple', 'orange', 'gold', 'crimson', 'lime'
]

const ChatWallpaper = () => {

    const dispatch = useDispatch()
    const {themeBg} = useSelector(state=> state.app)

    return (
        <div className='left setting chatWallpaper'>
            <div className="setting-header" style={{background: themeBg.bg}}>
                <BiArrowBack className='icon' onClick={() => dispatch(setLeftView('setting'))} style={{ cursor: 'pointer' }} />
                <h4>Set Chat Wallpaper</h4>
            </div>
            <div className="setting-header-offset"></div>
            <div style={{margin: '5px 20%'}}>
                <input type="checkbox" />
                <span style={{marginLeft: 12, color: themeBg.color, opacity: .5}}>Add WhatsApp Doodles</span>
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