import React from 'react'
import Picker from 'emoji-picker-react'

const EmojiPicker = ({setMessage, setStatusText}) => {

    const onEmojiClick = (event, emojiObject) => {
        setMessage(msg=> msg + emojiObject.emoji)
        setStatusText(msg=> msg + emojiObject.emoji)
        console.log('happened')
      };
      
    
      return (
        <div style={{width: '90%', position: 'absolute', left: 60, bottom: '8vh'}} >
          <Picker pickerStyle={{width: '100%', background: 'gray', fontSize: 40}} disableSearchBar onEmojiClick={onEmojiClick} />
        </div>
      );
}

export default EmojiPicker