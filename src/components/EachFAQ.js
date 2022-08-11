import React, { useState } from 'react'
import { MdOutlineArrowDropDown, MdOutlineArrowDropUp } from 'react-icons/md'

const EachFAQ = () => {
    const [showAns, setShowAns] = useState(false)

  return (
    <div className="fourthSectionItem">
    {!showAns ? <MdOutlineArrowDropDown onClick={()=> setShowAns(true)} style={{cursor: 'pointer', fontSize: 50, position: 'absolute', top: 0, right: 40}} /> :
    <MdOutlineArrowDropUp onClick={()=> setShowAns(false)} style={{cursor: 'pointer', fontSize: 50, position: 'absolute', top: 0, right: 40}} />}
    <h1>What is Flimzy App.</h1>
    {showAns && <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. 
        Voluptatem quis obcaecati dignissimos temporibus sed nulla facere eveniet consectetur
         sit similique rem a molestias, quam quo nobis officia fugiat ea aperiam!</p>}
</div>
  )
}

export default EachFAQ