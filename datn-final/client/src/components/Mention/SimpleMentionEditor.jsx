import React, {
    ReactElement,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import { EditorState, convertToRaw, RichUtils, getDefaultKeyBinding } from 'draft-js';
import Editor from '@draft-js-plugins/editor';
import createMentionPlugin, {
    defaultSuggestionsFilter,
} from '@draft-js-plugins/mention';
import editorStyles from './SimpleMentionEditor.module.css';
import mentions from './Mentions';
import '@draft-js-plugins/mention/lib/plugin.css';
// import { BsSend } from "react-icons/bs";
// import { useSendMessageToBot } from '../../../hooks/useSendMessage';
// import io from "socket.io-client";
import { ChatState } from '../../Context/ChatProvider';
import axios from 'axios';

// import { useToast } from "@chakra-ui/react";
const ENDPOINT = "http://localhost:5000"; // "https://talk-a-tive.herokuapp.com"; -> After deployment
var socket, selectedChatCompare;



export default function SimpleMentionEditor({ fetchAgain, setFetchAgain }) {
    // const ref = useRef < Editor > (null);

    // const toast = useToast();

    const [editorState, setEditorState] = useState(() =>
        EditorState.createEmpty()
    );

    const [open, setOpen] = useState(false);
    const [suggestions, setSuggestions] = useState(mentions);

    // const handleKeyCommand = (command, editorState) => {
    //     const newState = RichUtils.handleKeyCommand(editorState, command);
    //     if (newState) {
    //         setEditorState(newState);
    //         return 'handled';
    //     }
    //     return 'not-handled';
    // };

    // const keyBindingFn = (e) => {
    //     if (e.keyCode === 50 /* @ key */) {
    //         return 'mention';
    //     }
    //     return getDefaultKeyBinding(e);
    // };

    const { MentionSuggestions, plugins } = useMemo(() => {
        const mentionPlugin = createMentionPlugin();
        // eslint-disable-next-line no-shadow
        const { MentionSuggestions } = mentionPlugin;
        // eslint-disable-next-line no-shadow
        const plugins = [mentionPlugin];
        return { plugins, MentionSuggestions };
    }, []);

    const onOpenChange = useCallback((open) => {
        setOpen(open);
    }, []);
    const onSearchChange = useCallback(({ value }) => {
        setSuggestions(defaultSuggestionsFilter(value, mentions));
    }, []);


    const { selectedChat, setSelectedChat, user, notification, setNotification } =
        ChatState();

    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [newMessage, setNewMessage] = useState("");
    const [socketConnected, setSocketConnected] = useState(false);
    const [istyping, setIsTyping] = useState(false);


    const fetchMessages = async () => {
        if (!selectedChat) return;

        // try {
        //     const config = {
        //         headers: {
        //             Authorization: `Bearer ${user.token}`,
        //         },
        //     };

        //     setLoading(true);

        //     const { data } = await axios.get(
        //         `/api/message/${selectedChat._id}`,
        //         config
        //     );
        //     setMessages(data);
        //     setLoading(false);

        //     socket.emit("join chat", selectedChat._id);
        // } catch (error) {
        //     toast({
        //         title: "Error Occured!",
        //         description: "Failed to Load the Messages",
        //         status: "error",
        //         duration: 5000,
        //         isClosable: true,
        //         position: "bottom",
        //     });
        // }
    };

    // useEffect(() => {
    //     socket = io(ENDPOINT);
    //     socket.emit("setup", user);
    //     socket.on("connected", () => setSocketConnected(true));
    //     socket.on("typing", () => setIsTyping(true));
    //     socket.on("stop typing", () => setIsTyping(false));

    //     // eslint-disable-next-line
    // }, []);

    // useEffect(() => {
    //     fetchMessages();

    //     selectedChatCompare = selectedChat;
    //     // eslint-disable-next-line
    // }, [selectedChat]);

    // useEffect(() => {
    //     socket.on("message recieved", (newMessageRecieved) => {
    //         if (
    //             !selectedChatCompare || // if chat is not selected or doesn't match current chat
    //             selectedChatCompare._id !== newMessageRecieved.chat._id
    //         ) {
    //             if (!notification.includes(newMessageRecieved)) {
    //                 setNotification([newMessageRecieved, ...notification]);
    //                 setFetchAgain(!fetchAgain);
    //             }
    //         } else {
    //             setMessages([...messages, newMessageRecieved]);
    //         }
    //     });
    // });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const contentState = editorState.getCurrentContent();
        const raw = convertToRaw(contentState);
        // console.log(raw);
        const blocks = raw.blocks

        const mentions = [];

        raw.blocks.forEach(block => {
            block.entityRanges.forEach(entityRange => {
                const entity = raw.entityMap[entityRange.key];
                if (entity.type === 'mention') {
                    mentions.push({
                        username: entity.data.mention.name,
                        startOffset: entityRange.offset,
                        endOffset: entityRange.offset + entityRange.length
                    });
                }
            });
        });
        console.log(mentions);


        // console.log(blocks);

        const texts = []
        blocks.map(text => {
            texts.push(text.text)
        })

        const newMessage = texts.join("\n").replace(",", "")
        // ok

        // socket.emit("stop typing", selectedChat._id);
        // try {
        //     const config = {
        //         headers: {
        //             "Content-type": "application/json",
        //             Authorization: `Bearer ${user.token}`,
        //         },
        //     };
        //     setNewMessage("");
        //     setEditorState(EditorState.createEmpty())
        //     const { data } = await axios.post(
        //         "/api/message",
        //         {
        //             content: newMessage,
        //             chatId: selectedChat,
        //         },
        //         config
        //     );
        //     socket.emit("new message", data);
        //     setMessages([...messages, data]);
        // } catch (error) {
        //     toast({
        //         title: "Error Occured!",
        //         description: "Failed to send the Message",
        //         status: "error",
        //         duration: 5000,
        //         isClosable: true,
        //         position: "bottom",
        //     });
        // }

    }




    return (
        <form onSubmit={handleSubmit}
            className={editorStyles.editor}
        >

            <Editor
                editorKey={'editor'}
                editorState={editorState}
                onChange={setEditorState}
                plugins={plugins}
            // handleKeyCommand={handleKeyCommand}
            // keyBindingFn={keyBindingFn}
            />

            <MentionSuggestions
                open={open}
                onOpenChange={onOpenChange}
                suggestions={suggestions}
                onSearchChange={onSearchChange}
                onAddMention={() => {
                    // get the mention object selected
                }}
            />

            <button type='submit' >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                </svg>

            </button>
        </form>
    );
}