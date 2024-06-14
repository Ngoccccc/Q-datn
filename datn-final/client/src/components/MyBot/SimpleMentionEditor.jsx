import { useCallback, useMemo, useState } from "react";
import { EditorState, convertToRaw } from "draft-js";
import Editor from "@draft-js-plugins/editor";
import createMentionPlugin, {
  defaultSuggestionsFilter,
} from "@draft-js-plugins/mention";
import editorStyles from "./SimpleMentionEditor.module.css";
import mentions from "./Mentions";
import "@draft-js-plugins/mention/lib/plugin.css";
import { ChatState } from "../../Context/ChatProvider";
import axios from "axios";

export default function SimpleMentionEditor({ mySelfChatId, messages, setMessages }) {
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

  const { user } = ChatState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const contentState = editorState.getCurrentContent();
    const raw = convertToRaw(contentState);
    // console.log(raw);
    const content = raw.blocks.map((block) => block.text).join("\n");

    const mentions = [];

    raw.blocks.forEach((block) => {
      block.entityRanges.forEach((entityRange) => {
        const entity = raw.entityMap[entityRange.key];
        if (entity.type === "mention") {
          mentions.push({
            username: entity.data.mention.name,
            startOffset: entityRange.offset,
            endOffset: entityRange.offset + entityRange.length,
          });
        }
      });
    });
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user?.data.token}`,
        },
      };
      setEditorState(EditorState.createEmpty());
      const { data } = await axios.post(
        "/api/message",
        {
          content,
          mentions,
          chatId: mySelfChatId,
        },
        config
      );
      // socket.emit("new message", data);
      // console.log(data);
      // setMessages([...messages, data]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={editorStyles.editor}>
      <Editor
        editorKey={"editor"}
        editorState={editorState}
        onChange={setEditorState}
        plugins={plugins}
      />

      <MentionSuggestions
        open={open}
        onOpenChange={onOpenChange}
        suggestions={suggestions}
        onSearchChange={onSearchChange}
        onAddMention={() => {}}
      />

      <button type="submit">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
          />
        </svg>
      </button>
    </form>
  );
}
