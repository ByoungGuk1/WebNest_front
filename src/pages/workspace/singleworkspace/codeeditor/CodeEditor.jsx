import { Editor } from '@monaco-editor/react';
import React, { useState } from 'react';
import S from './style';

const CodeEditor = ({ quizLanguage, id }) => {

    const addEditorLanguage = (lang) => {
        switch (lang?.toUpperCase()) {
            case 'JS':
            case 'JAVASCRIPT':
                return 'javascript';
            case 'JAVA':
                return 'java';
            case 'ORACLE':
            case 'SQL':
                return 'sql';
            default:
                return 'text';
        }
    }

    const language = addEditorLanguage(quizLanguage);
    const [code, setCode] = useState(); // 코드입력칸
    const [output, setOutput] = useState('');
    const [data, setData] = useState(false);


    // 초기화버튼
    const addReset = () => {
        setCode('');
        setOutput('');
    }
    // 컨트롤러로 실행결과 보낼요청 그 결과값이나 에러메세지 보내주면됨 백엔드에서
    // 코드를 받고 컨트롤러에서 받은 코드와 DB에 저장된 기댓값이랑 다르면 ERROR, 가트면 SUCCESS
    const handleRun = async () => {

        if (language === "javascript") {
            let logs = [];

            const originalLog = console.log;

            console.log = (...args) => {
                logs.push(args.join(' '));
            };
            try {
                eval(code);
                setOutput(logs.join('\n') || '결과 없음');
            } catch (err) {
                setOutput("에러 발생: " + err.message);
            }
            console.log = originalLog;
        }else{
            setOutput('')
            setCode('')
        }
    }
    return (
        <div>
            <S.StyledEditor
                height="600px"
                defaultLanguage={language}
                value={code}
                onChange={(value) => setCode(value)}
                theme='vs-dark'
                options={{
                    fontSize: 18,
                    lineHeight: 30,
                    minimap: { enabled: false },
                    wordWrap: 'on',
                    scrollBeyondLastLine: false,
                }}
            />
            <S.OutputBox>
                <S.OutputTitle>실행 결과</S.OutputTitle>
                <S.OutputContent>{output}</S.OutputContent>
                <S.ButtonWrap>
                    <S.RunButton onClick={addReset}>초기화</S.RunButton>
                    <S.RunButton onClick={handleRun}>코드 실행</S.RunButton>
                    <S.RunButton >제출 후 채점하기</S.RunButton>
                </S.ButtonWrap>
            </S.OutputBox>

        </div>
    );
};

export default CodeEditor;