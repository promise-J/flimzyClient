import React, { useEffect, useRef } from 'react'
import MessageText from './MessageText'

const MessageBody = ({
    // uploadImage,
    messages,
    replyMode,
    labelAll,
    setLabelAll,
    selectedLabel,
    setSelectedLabel,
    setReplyMode,
    setMessages,
    searchMessage
}) => {
    

    const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages]);

    // <div className="right-container" style={{ backgroundImage: colorPallete && `linear-gradient(to bottom, ${colorPallete},gray, url('images/background.jpg')` }} ref={messagesEndRef} >
    return (
        <div className="right-container" ref={messagesEndRef} >
        {/* <div className="right-container" style={{ background:  colorPallete }} ref={messagesEndRef} > */}
            <p><i className="fa fa-lock" aria-hidden="true"></i>Welcome! This is the begining of your chat. You can report any activity to flimzy app. We trust you have a nice time.</p>

            {/* {msgLoad ? <p>Loading...</p> :  */}
            {messages.filter(msg=> msg.content.toLowerCase().includes(searchMessage)).map(msg => (
                <MessageText
                    key={msg._id}
                    msg={msg}
                    labelAll={labelAll}
                    setLabelAll={setLabelAll}
                    selectedLabel={selectedLabel}
                    setSelectedLabel={setSelectedLabel}
                    setMessages={setMessages}
                    replyMode={replyMode}
                    setReplyMode={setReplyMode}
                />
            ))
            }
            <div ref={messagesEndRef} />
        </div>
    )
}

export default MessageBody