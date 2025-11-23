const { createContext, useState, useContext } = require("react");


const GameResultContext = createContext();

export const GameResultProvider = ({ children }) => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [finishTime, setFinishTime] = useState(0);
    const [quizTitle, setQuizTitle] = useState("");
    const [quizExp, setQuizExp] = useState(0);

    const openModal = ({ quizTitle, quizExp, time}) => {
        setQuizTitle(quizTitle);
        setQuizExp(quizExp);
        setIsModalOpen(true);
        setFinishTime(finishTime);
    }

    const closeModal = () => setIsModalOpen(false);

    return (
        <GameResultContext.Provider
            value={{ isModalOpen, quizTitle, quizExp, finishTime, openModal, closeModal }}
        >
            {children}
        </GameResultContext.Provider>
    )
}

export const useGameResult = () => useContext(GameResultContext);