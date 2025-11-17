import React, { useState } from 'react';
import S from './style';
import { useSelector } from 'react-redux';

const CodeEditor = ({ quizLanguage, quizId, quizExpectation }) => {

    const getUsers = useSelector((state) => state.user);
    const currentUser = getUsers.currentUser
    const { id } = currentUser

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

    const editorLanguage = addEditorLanguage(quizLanguage)
    const className = "Solution"
    const defaultClassValue = "public class " + className + "{ \n " +
        "   public static void main(String[] args)" + "{ \n\n" +
        "    } \n" +
        "}"
    const [result, setResult] = useState(null)
    const [quizSubmitCode, setQuizSubmitCode] = useState(() => {
        return quizLanguage === "JAVA" ? defaultClassValue : "";
    }); // 코드입력칸
    const [output, setOutput] = useState('');

    // 자바스크립티티코드 핸들러
    function jsHandleRun(quizSubmitCode) {
        let logs = [];
        setQuizSubmitCode(quizSubmitCode)
        const originalLog = console.log;
        console.log = (...args) => {
            logs.push(args.join(' '));
            setResult(args.join(' '))
        };
        try {
            eval(quizSubmitCode)
            setOutput(logs.join('\n') || '결과 없음');
        } catch (err) {
            setOutput("에러 발생: " + err.message);
        } finally {
            console.log = originalLog;
        }
    }
    // 자바스크립트 채점
    async function jsCompleteHandleRun() {
        console.log("채점부분", quizSubmitCode)
        // code = console.log("hello".length)
        // result = 5
        if(result != quizExpectation){
            alert("기댓값과 일치하지 않습니다!")
            setResult("")
            setOutput("기댓값과 일치하지 않습니다.")
            return;
        } 
        if(result === quizExpectation){
            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/quiz/js-success`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        "quizId": quizId,
                        "userId": id,
                        "quizSubmitCode": result,
                        "quizSubmitResultCode": quizSubmitCode
                    })
                })
                if(!response.ok) throw new Error("서버 오류 ")
                const jsData = await response.json();
                setOutput("문제풀이 성공")
                alert(jsData.message)
            } catch (err) {
                setOutput("실행 실패" + err.message || "알 수 없는 오류")
            }
        }
    }


    // 자바코드 핸들러
    async function javaHandleRun(quizSubmitCode) {
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/quiz/java-expectation`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "quizSubmitCode": quizSubmitCode,
                    "quizId": quizId,
                    "quizSubmitError": null,
                    "className": className,
                    "userId": id,
                })
            }
            )
            const javaData = await response.json();
            if (!response.ok) {
                const resMessage = javaData.message || `서버 오류 : ${response.status}`
                setOutput(resMessage);
                return;
            }
            setOutput(javaData.data || "실행 성공")
        } catch (err) {
            setOutput("실행 실패: " + err.message || "알 수 없는 오류")
        }
    }
    // 자바코드 채점

    async function javaCompleteHandleRun(quizSubmitCode) {
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/quiz/java-success`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "quizSubmitCode": quizSubmitCode,
                    "quizId": quizId,
                    "className": className,
                    "userId": id
                })
            })
            const getExp = await response.json();
            if (!response.ok) {
                const resMessage = getExp.message || `서버 오류 : ${response.status}`
                setOutput(resMessage);
                return;
            }
            setOutput("문제풀이 성공")
            alert(getExp.message)
        } catch (err) {
            setOutput("실행 실패: " + err.message || "알 수 없는 오류")
        }
    }

    // SQL코드 핸들러
    async function sqlHandleRun(quizSubmitCode) {
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/quiz/sql-expectation`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "quizId": quizId,
                    "quizSubmitCode": quizSubmitCode,
                    "userId": id
                })
            })
            const sqlData = await response.json()
            if (!response.ok) {
                const resMessage = sqlData?.message || `서버 오류 : ${response.status}`
                setOutput(resMessage)
                return;
            }
            setOutput(sqlData.message || "요청 성공")
        } catch (err) {
            setOutput("서버 오류 : " + err.message || "알 수 없는 오류")
        }
    }
    // SQL코드 채점
    async function slqSuccessHandleRun(quizSubmitCode) {
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/quiz/sql-success`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "quizSubmitCode": quizSubmitCode,
                    "quizId": quizId,
                    "userId": id
                })
            })
            const getExp = await response.json();
            if (!response.ok) {
                const resMessage = getExp.message || `서버 오류: ${response.status}`
                setOutput(resMessage);
                return;
            }
            setOutput("문제풀이 성공")
            alert(getExp.message)
        } catch (err) {
            setOutput("서버 오류 : " + err.message || "알 수 없는 오류")
        }
    }

    const handleRun = async (quizSubmitCode, quizLanguage) => {
        switch ((quizLanguage || '').toUpperCase()) {
            case 'JS':
                jsHandleRun(quizSubmitCode)
                break;
            case 'JAVA':
                javaHandleRun(quizSubmitCode)
                break;
            case 'ORACLE':
                sqlHandleRun(quizSubmitCode)
                break;
            default:
                setOutput('지원하지 않는 언어입니다')
        }
    }
    const successHandleRun = async (quizSubmitCode, quizLanguage, result) => {
        switch ((quizLanguage || '').toUpperCase()) {
            case 'JAVA':
                javaCompleteHandleRun(quizSubmitCode)
                break;
            case 'ORACLE':
                slqSuccessHandleRun(quizSubmitCode)
                break;
            case 'JS':
                jsCompleteHandleRun(result)
                break;
            default:
                setOutput('잘못된 요청입니다')
        }
    }

    const addReset = () => {
        setQuizSubmitCode('');
        setOutput('');
    }
    return (
        <div>
            <S.StyledEditor
                height="600px"
                defaultLanguage={editorLanguage}
                value={quizSubmitCode}
                onChange={(value) => setQuizSubmitCode(value)}
                theme='vs-dark'
                options={{
                    fontSize: 18,
                    lineHeight: 30,
                    minimap: { enabled: false },
                    wordWrap: 'on',
                    scrollBeyondLastLine: false,
                }}
            />
            {/* 조건에따라 맞는 이벤트함수 실행 -> 코드실행 버튼 클릭시 스위치문으로 해당 문제의 언어 전달 
                ex) "JAVA" -> 패치보내는 이벤트함수 실행, "JS" -> 콘솔값 가로채는 함수 실행, "ORACLE" -> 패치보내는 이벤트함수 실행
            */}
            <S.OutputBox>
                <S.OutputTitle>실행 결과</S.OutputTitle>
                <S.OutputContent>{output}</S.OutputContent>
                <S.ButtonWrap>
                    <S.RunButton onClick={addReset}>초기화</S.RunButton>
                    <S.RunButton onClick={() => handleRun(quizSubmitCode, quizLanguage)}>코드실행</S.RunButton>
                    <S.RunButton onClick={() => successHandleRun(quizSubmitCode, quizLanguage)}>제출하기</S.RunButton>
                </S.ButtonWrap>
            </S.OutputBox>

        </div>
    );
};

export default CodeEditor;