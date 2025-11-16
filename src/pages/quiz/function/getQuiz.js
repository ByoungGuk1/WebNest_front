import { redirect } from "react-router-dom"

export const getQuiz = async (location, options) => {
    const response = await fetch(location, options)
    if (!response.ok) throw new Error("GetPost Fetching Error")
    const datas = await response.json()
    return datas
}

export const clickTitle = (e, isSolved) => {
    if(isSolved){
        e.preventDefault();
        alert("이미 해결한 문제 입니다!")
    }
}