import React, {
    ReactElement,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import { EditorState, convertToRaw } from 'draft-js';
import Editor from '@draft-js-plugins/editor';
import createMentionPlugin, {
    defaultSuggestionsFilter,
} from '@draft-js-plugins/mention';
import editorStyles from './SimpleMentionEditor.module.css';
import mentions from './Mentions';
import '@draft-js-plugins/mention/lib/plugin.css';
import { BsSend } from "react-icons/bs";
// import { useSendMessageToBot } from '../../../hooks/useSendMessage';


export default function SimpleMentionEditor() {
    // const ref = useRef < Editor > (null);
    const [editorState, setEditorState] = useState(() =>
        EditorState.createEmpty()
    );

    const [open, setOpen] = useState(false);
    const [suggestions, setSuggestions] = useState(mentions);

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

    const onExtractData = () => {
        const contentState = editorState.getCurrentContent();
        const raw = convertToRaw(contentState);
        console.log(raw);

        let datas = [];
        for (let key in raw.blocks) {
            const ent = raw.blocks[key];
            datas.push(ent.text);
        }
        console.log(datas);
    };

    const onExtractMentions = () => {
        // const contentState = editorState.getCurrentContent();
        // const raw = convertToRaw(contentState);
        // let mentionedUsers = [];
        // for (let key in raw.entityMap) {
        //     const ent = raw.entityMap[key];
        //     if (ent.type === "mention") {
        //         mentionedUsers.push(ent.data.mention.name);
        //     }
        // }
        // console.log(mentionedUsers);
    };

    const onExtractRemainingData = () => {
        const contentState = editorState.getCurrentContent();
        const raw = convertToRaw(contentState);
        console.log(raw);

        let datas = [];
        for (let key in raw.blocks) {
            const ent = raw.blocks[key];
            datas.push(ent.text);
        }
        console.log(datas);

        let mentionedUsers = [];
        for (let key in raw.entityMap) {
            const ent = raw.entityMap[key];
            if (ent.type === "mention") {
                mentionedUsers.push(ent.data.mention.name);
            }
        }
        console.log(mentionedUsers);

    };


    // const { loading, sendMessage } = useSendMessageToBot();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const contentState = editorState.getCurrentContent();
        const raw = convertToRaw(contentState);
        const blocks = raw.blocks

        const texts = []
        blocks.map(text => {
            texts.push(text.text)
        })
        // if (!message) return;
        // await sendMessage(texts);
        // setMessage("");

        // console.log(texts);

        // useSendMessageToBot
    }


    return (
        <form onSubmit={handleSubmit}
            className={editorStyles.editor}
            // style={{ display: 'flex', alignItems: 'center' }}
        >

            <Editor
                editorKey={'editor'}
                editorState={editorState}
                onChange={setEditorState}
                plugins={plugins}
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
                <BsSend />
            </button>
        </form>
    );
}