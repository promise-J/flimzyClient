import React from 'react'

const StatusIndicatorBar = ({ idx, rendIndex }) => {

    const getValue = ()=>{
        if(idx===rendIndex || rendIndex >= idx) return true
    }


    return (
        <div className="single-progress">
            <div style={{
                // animation: (getValue() && rendIndex===0) && 'statusSlide linear 2s',
             width: getValue() && '100%'}} className="single-progress-inner"></div>
        </div>
    )
}

export default StatusIndicatorBar