import React, { useEffect, useRef } from 'react'
import MessageText from './MessageText'

const MessageBody = ({
    msgLoad,
    messages,
    colorPallete,
    replyMode,
    labelAll,
    setLabelAll,
    selectedLabel,
    setSelectedLabel,
    setReplyMode,
    setMessages
}) => {

    const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth", bottom: 0 })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages]);

    return (
        <div className="right-container" style={{ backgroundImage: colorPallete && `linear-gradient(to bottom, ${colorPallete},gray, url('images/background.jpg')` }} ref={messagesEndRef} >
            <p><i className="fa fa-lock" aria-hidden="true"></i>Messages are end-to-end encrypted. No one outside of this chat, not even whatsApp, can read or listen to them. Click to learn more.</p>

            {msgLoad ? <p>Loading...</p> : messages.map(msg => (
                <MessageText
                    // ref={messagesEndRef}
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
        </div>
    )
}

export default MessageBody