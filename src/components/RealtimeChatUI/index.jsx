import { useEffect, useRef, useState } from "react";
import supabase from "../../supabase/client";
import style from "../RealtimeChatUI";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime'

function RealtimeChat({ game }) {
    const [messages, setMessages] = useState([]);
    const [loadingInitial, setLoadingInitial] = useState(false);
    const [error, setError] = useState("");
    const messageRef = useRef(null);
    dayjs.extend(relativeTime);

    function scrollSmoothToBottom() {
        if (messageRef.current) {
            messageRef.current.scrollTop = messageRef.current.scrollHeight;
        }
    };

    const getInitialMessages = async () => {
        setLoadingInitial(true);
        if (messages.lenght) return;

        const { data, error } = await supabase
            .from("Messages")
            .select()
            .eq('game_id', game.id)

        if (error) {
            setError(error.message);
            return;
        }

        setLoadingInitial(false);
        setMessages(data);

    }


    useEffect(() => {


        getInitialMessages();
        const channel = supabase
            .channel("Messages")
            .on(
                'postgres_changes',
                { event: '*', schema: 'public', table: 'Messages' },
                () => getInitialMessages()
            )
            .subscribe();

        return () => {
            if (channel) {
                supabase.removeChannel(channel);
            }

            channel.unsubscribe();
        }

    }, []);


    useEffect(() => {
        scrollSmoothToBottom();

    }, [messages]);

    if (loadingInitial) {
        return <progress> </progress>
    }


    return (
        <div className={style.messages} ref={messageRef}>
            {error && <article>{error}</article>}
            {messages && messages.map(message => (
                <article key={message.id} className={style.chat_message}>
                    <p className={style.chat_username}>{message.profile_username}</p>
                    <div>
                        <small className={style.message}>{message.content}</small>
                        <p className={style.timestamps}>{dayjs().to(dayjs(message.created_at))}</p>
                    </div>

                </article>
            ))}

        </div>
    )
}

export default RealtimeChat;