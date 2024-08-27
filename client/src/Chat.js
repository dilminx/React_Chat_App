import React, { useEffect, useState } from 'react';

const Chat = ({ socket, userName, room }) => {
    const [currentMsg, setCurrentMsg] = useState("");
    const [messages, setMessages] = useState([]); // State to hold all messages

    const sendMsg = async () => {
        if (currentMsg !== "") {
            const msgData = {
                room: room,
                author: userName,
                message: currentMsg,
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
            };
            await socket.emit("send_Msg", msgData);
            setMessages((prevMessages) => [...prevMessages, msgData]); // Add sent message to messages
            setCurrentMsg(""); // Clear the input field after sending the message
        }
    };

    useEffect(() => {
        socket.on("recived_Msg", (data) => {
            setMessages((prevMessages) => [...prevMessages, data]); // Add received message to messages
        });
    }, [socket]);

    return (
        <div className="flex flex-col items-center h-screen bg-gray-100">
            <div className="w-full max-w-xl">
                <div className="flex items-center justify-between p-4 bg-blue-500 text-white">
                    <h1 className="text-lg font-semibold">Live Chat</h1>
                    <span className="text-sm">{userName}</span>
                </div>
                <div className="flex-grow p-4 space-y-4 overflow-y-auto bg-white border border-gray-300 rounded-lg shadow-inner max-h-[70vh]">
                    {messages.map((msg, index) => (
                        <div
                            key={index}
                            className={`p-2 my-2 rounded-lg ${
                                msg.author === userName ? 'bg-blue-100 self-end' : 'bg-gray-200'
                            }`}
                        >
                            <div className="font-semibold">
                                {msg.author}{' '}
                                <span className="text-xs text-gray-500">({msg.time})</span>
                            </div>
                            <div>{msg.message}</div>
                        </div>
                    ))}
                </div>
                <div className="flex items-center p-4 bg-gray-200">
                    <input
                        type="text"
                        className="flex-grow p-2 border border-gray-300 rounded-l-lg focus:outline-none"
                        placeholder="Type your message..."
                        value={currentMsg}
                        onChange={(e) => setCurrentMsg(e.target.value)}
                    />
                    <button
                        className="px-4 py-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600"
                        onClick={sendMsg}
                    >
                        &#9658;
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Chat;
