export const getQuiz = async (location, options) => {
    const response = await fetch(location, options)
    if (!response.ok) throw new Error("GetPost Fetching Error")
    const datas = await response.json()
    return datas
}