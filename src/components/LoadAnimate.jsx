import { useState } from 'react'

const LoadAnimate = () => {
    const [welcomeText, setWelcomeText] = useState('Downloading messages...')

    setTimeout(() => {
        setWelcomeText('Loading messages...')
    }, 900);
 
    
  return (
    <div className='container' style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <div className='animate-container'>
        <h1>Flimzy</h1>
        <div className='animate-progress'>
            <div className="animate-progress-inner" ></div>
        </div>
        <p className='animate-blinker'>{welcomeText}</p>
        </div>
    </div>
  )
}

export default LoadAnimate