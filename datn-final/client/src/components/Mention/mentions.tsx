import React, { useMemo, useCallback, useRef, useEffect, useState } from 'react'
import { Editor, Transforms, Range, createEditor, Descendant } from 'slate'
import { withHistory } from 'slate-history'
import {
    Slate,
    Editable,
    ReactEditor,
    withReact,
    useSelected,
    useFocused,
} from 'slate-react'

import { MentionElement } from './custom-type'

const MentionExample = () => {
    const ref = useRef<HTMLDivElement | null>()
    const [target, setTarget] = useState<Range | undefined>()
    const [index, setIndex] = useState(0)
    const [search, setSearch] = useState('')
    const renderElement = useCallback(props => <Element {...props} />, [])
    const renderLeaf = useCallback(props => <Leaf {...props} />, [])
    const editor = useMemo(
        () => withMentions(withReact(withHistory(createEditor()))),
        []
    )

    const chars = CHARACTERS.filter(c =>
        c.toLowerCase().startsWith(search.toLowerCase())
    ).slice(0, 10)

    const onKeyDown = useCallback(
        event => {
            if (target && chars.length > 0) {
                switch (event.key) {
                    case 'ArrowDown':
                        event.preventDefault()
                        const prevIndex = index >= chars.length - 1 ? 0 : index + 1
                        setIndex(prevIndex)
                        break
                    case 'ArrowUp':
                        event.preventDefault()
                        const nextIndex = index <= 0 ? chars.length - 1 : index - 1
                        setIndex(nextIndex)
                        break
                    case 'Tab':
                    case 'Enter':
                        event.preventDefault()
                        Transforms.select(editor, target)
                        insertMention(editor, chars[index])
                        setTarget(null)
                        break
                    case 'Escape':
                        event.preventDefault()
                        setTarget(null)
                        break
                }
            }
        },
        [chars, editor, index, target]
    )

    useEffect(() => {
        if (target && chars.length > 0) {
            const el = ref.current
            const domRange = ReactEditor.toDOMRange(editor, target)
            const rect = domRange.getBoundingClientRect()
            el.style.top = `${rect.top + window.pageYOffset + 24}px`
            el.style.left = `${rect.left + window.pageXOffset}px`
        }
    }, [chars.length, editor, index, search, target])

    return (
        <Slate
            editor={editor}
            initialValue={initialValue}
            onChange={(value) => {

                const isAstChange = editor.operations.some(
                    op => 'set_selection' !== op.type
                )
                if (isAstChange) {
                    // Save the value to Local Storage.
                    const content = JSON.stringify(value)
                    localStorage.setItem('content', content)
                }


                const { selection } = editor

                if (selection && Range.isCollapsed(selection)) {
                    const [start] = Range.edges(selection)
                    const wordBefore = Editor.before(editor, start, { unit: 'word' })
                    const before = wordBefore && Editor.before(editor, wordBefore)
                    const beforeRange = before && Editor.range(editor, before, start)
                    const beforeText = beforeRange && Editor.string(editor, beforeRange)
                    const beforeMatch = beforeText && beforeText.match(/^@(\w+)$/)
                    const after = Editor.after(editor, start)
                    const afterRange = Editor.range(editor, start, after)
                    const afterText = Editor.string(editor, afterRange)
                    const afterMatch = afterText.match(/^(\s|$)/)

                    if (beforeMatch && afterMatch) {
                        setTarget(beforeRange)
                        setSearch(beforeMatch[1])
                        setIndex(0)
                        return
                    }
                }

                setTarget(null)
            }}
        >
            {target && chars.length > 0 && (
                <>
                    <div>
                        <div
                            ref={ref}
                            style={{
                                // top: '10000px', // Hiển thị phía trên
                                // left: '0', // Để phía trái
                                // bottom: 'auto', // Loại bỏ bottom
                                // position: 'absolute',
                                zIndex: 1,
                                padding: '3px',
                                background: 'white',
                                borderRadius: '4px',
                                boxShadow: '0 1px 5px rgba(0,0,0,.2)',
                                width:"200px"
                                // position: "absolute",
                                // top: "-40px", /* Hiển thị phía trên chữ @ */
                                // left: "0",
                                // background- color: "white",
                                // border-radius: "4px",
                                // box-shadow: "0 1px 5px rgba(0,0,0,.2)",
                                // padding: "8px",
                                // z-index: "999",
                            }}
                            data-cy="mentions-portal"
                        >
                            {chars.map((char, i) => (
                                <div
                                    key={char}
                                    onClick={() => {
                                        Transforms.select(editor, target)
                                        insertMention(editor, char)
                                        setTarget(null)
                                    }}
                                    style={{
                                        padding: '1px 3px',
                                        borderRadius: '3px',
                                        background: i === index ? '#B4D5FF' : 'transparent',
                                    }}
                                >
                                    {char}
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            )
            }
            <Editable
                renderElement={renderElement}
                renderLeaf={renderLeaf}
                onKeyDown={onKeyDown}
                placeholder="Enter some text..."
                style={{ position: 'relative' }}
            />
        </Slate >
    )
}

const withMentions = editor => {
    const { isInline, isVoid, markableVoid } = editor

    editor.isInline = element => {
        return element.type === 'mention' ? true : isInline(element)
    }

    editor.isVoid = element => {
        return element.type === 'mention' ? true : isVoid(element)
    }

    editor.markableVoid = element => {
        return element.type === 'mention' || markableVoid(element)
    }

    return editor
}

const insertMention = (editor, character) => {
    const mention: MentionElement = {
        type: 'mention',
        character,
        children: [{ text: '' }],
    }
    Transforms.insertNodes(editor, mention)
    Transforms.move(editor)
}

// Borrow Leaf renderer from the Rich Text example.
// In a real project you would get this via `withRichText(editor)` or similar.
const Leaf = ({ attributes, children, leaf }) => {
    if (leaf.bold) {
        children = <strong>{children}</strong>
    }

    if (leaf.code) {
        children = <code>{children}</code>
    }

    if (leaf.italic) {
        children = <em>{children}</em>
    }

    if (leaf.underline) {
        children = <u>{children}</u>
    }

    return <span {...attributes}>{children}</span>
}

const Element = props => {
    const { attributes, children, element } = props
    switch (element.type) {
        case 'mention':
            return <Mention {...props} />
        default:
            return <p {...attributes}>{children}</p>
    }
}

const Mention = ({ attributes, children, element }) => {
    const selected = useSelected()
    const focused = useFocused()
    const style: React.CSSProperties = {
        padding: '3px 3px 2px',
        margin: '0 1px',
        verticalAlign: 'baseline',
        display: 'inline-block',
        borderRadius: '4px',
        backgroundColor: '#eee',
        fontSize: '0.9em',
        boxShadow: selected && focused ? '0 0 0 2px #B4D5FF' : 'none',
    }
    // See if our empty text child has any styling marks applied and apply those
    if (element.children[0].bold) {
        style.fontWeight = 'bold'
    }
    if (element.children[0].italic) {
        style.fontStyle = 'italic'
    }
    return (
        <span
            {...attributes}
            contentEditable={false}
            data-cy={`mention-${element.character.replace(' ', '-')}`}
            style={style}
        >
            @{element.character}
            {children}
        </span>
    )
}

const initialValue: Descendant[] = [
    {
        type: 'paragraph',
        children: [
            {
                text: 'This example shows how you might implement a simple ',
            },
            {
                text: '@-mentions',
                bold: true,
            },
            {
                text: ' feature that lets users autocomplete mentioning a user by their username. Which, in this case means Star Wars characters. The ',
            },
            {
                text: 'mentions',
                bold: true,
            },
            {
                text: ' are rendered as ',
            },
            {
                text: 'void inline elements',
                code: true,
            },
            {
                text: ' inside the document.',
            },
        ],
    },
    {
        type: 'paragraph',
        children: [
            { text: 'Try mentioning characters, like ' },
            {
                type: 'mention',
                character: 'R2-D2',
                children: [{ text: '', bold: true }],
            },
            { text: ' or ' },
            {
                type: 'mention',
                character: 'Mace Windu',
                children: [{ text: '' }],
            },
            { text: '!' },
        ],
    },
]

const CHARACTERS = [
    'chi tiêu',
    'kế hoạch',
]

export default MentionExample
