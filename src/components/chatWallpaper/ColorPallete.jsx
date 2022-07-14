import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setColorPallete } from '../../redux/appSlice'

const ColorPallete = ({color}) => {
    const dispatch = useDispatch()
    const {colorPallete} = useSelector(state=> state.app)

  return (
    <div  onClick={()=> dispatch(setColorPallete(color))} className='color-panel'
     style={{background: color, border: color===colorPallete && '6px solid white'}}>
        {color===colorPallete && 'Default'}
    </div>
  )
}

export default ColorPallete