import { useState } from "react";
import { BsSend } from "react-icons/bs";
import useSendMessage from "../../hooks/useSendMessage";
import { MentionsInput, Mention } from 'react-mentions'

export const Input = () => {
    const [message, setMessage] = useState("");
    const { loading, sendMessage } = useSendMessage();

    const [mention, setMention] = useState(false);


    const handleInput = async (e) => {
        setMessage(e)
        if (e === "@") {
            setMention(true)
        }
        else {
            setMention(false)
        }

    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!message) return;
        // await sendMessage(message);
        setMessage("");
    };

    const [value, setValue] = useState("")
    console.log(value)

    const user = [
        {
            id: 1,
            display: "quynh"
        },
        {
            id: 2,
            display: "item2"
        },
    ]

    return (
        // <form className='px-4 my-3' onSubmit={handleSubmit}>
        //     <div className='w-full relative'>
        //         <input
        //             type='text'
        //             className='border text-sm rounded-lg block w-full p-2.5  bg-gray-700 border-gray-600 text-white'
        //             placeholder='Send a message'
        //             value={message}
        //             onChange={(e) => setMessage(e.target.value)}
        //         />
        //         <button type='submit' className='absolute inset-y-0 end-0 flex items-center pe-3'>
        //             {loading ? <div className='loading loading-spinner'></div> : <BsSend />}
        //         </button>
        //     </div>
        // </form>
        <div className="bg-blue-100">
                <MentionsInput value={value} onChange={(e)=>setValue(e.target.value)} >
                    <Mention
                        trigger="@"
                        data={user}
                        style="backgroundColor:#cee4e5;"
                    />

                </MentionsInput>
        </div>

    );
};

