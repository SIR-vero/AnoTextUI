import React, { useEffect, useState } from "react";
import { MessageList } from "./messageList";
import { BackendServices } from "../../services/Backend.services";

interface DashboardProps {}

export const Dashboard: React.FC<DashboardProps> = () => {

    const [messages, setMessages] = useState([])
    const [userId, setUserId] = useState("")

    useEffect(() => {
        BackendServices.getMessages().then((response: any) => {
            console.log(response)
            if(response.status == 200) return response.data
        }).then((data) => {
            setMessages(data.messages.map((msg: any) => msg.message_text))
            setUserId(data?.userId)
        })
    }, [])

    return <MessageList messages={messages} userId={userId}/>
}