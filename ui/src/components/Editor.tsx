import styled from 'styled-components';
import { useEffect } from 'react';
import useEditor from '../store/editor';

const EditorDiv = styled.div`
  display: grid;
  grid-auto-rows: min-content;
  grid-template-columns: 0fr 1fr;
`;

const LineSpan = styled.span`
  font-family: 'Cascadia Code PL', Consolas, ui-monospace, monospace;
  font-weight: bold;
  text-align: right;

  background: grey;
  color: white;
  border-right: 1px solid black;
  padding: 0 2px;
`;

const TextP = styled.p`
  font-family: 'Cascadia Code PL', Consolas, ui-monospace, monospace;
  font-kerning: none;
  line-break: anywhere;
  word-break: break-all;

  white-space: break-spaces;

  margin-block: 0;
`;

export default function Editor() {
  const editor = useEditor();
  const content = new TextDecoder().decode(editor.data).split('\n');

  useEffect(() => {
    editor.read();
  }, []);

  return (
    <EditorDiv>
      {content.map((line, no) => (
        <>
          <LineSpan>{no + editor.line}</LineSpan>
          <TextP>{line}</TextP>
        </>
      ))}
    </EditorDiv>
  );
}
