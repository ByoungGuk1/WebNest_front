import { createContext, useEffect, useState } from "react";

export const MyTestValueContext = createContext()

export const MyTestValueProvider = ({children}) => {

  // 초기값을 제공하고 provider에게 값을 넘긴 후 useContext로 사용.

  const [myData1, setMyData1] = useState(["초기값1", "초기값2", "초기값3"]);
  const [myData2, setMyData2] = useState({value1: "초기값1", value2: "초기값2", value3: "초기값3"});
  const [myError, setMyError] = useState(null);
  const [isMyLoading, setIsMyLoading] = useState(false)
  const [isUpdate, setIsUpdate] = useState(false)

  const value = {
    state: {myData1: myData1, myData2: myData2},
    actions: {setMyData1: setMyData1, setMyData2: setMyData2},
    error: {myError: myError, setMyError: setMyError},
    loading: {isMyLoading: isMyLoading, setIsMyLoading: setIsMyLoading}
  }

  // 데이터를 요청 후 초기값을 전달하는 것도 가능하다.
  useEffect(() => {
    const getDatas = async () => {
      const response = await fetch("백엔드 경로", {
        method: "메서드 타입",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "객체의 키값": "데이터 전송"
        })
      })

      if(!response.ok) throw new Error("Catch에서 잡을 수 있도록 처리")
      const datas = await response.json()
      return datas
    }

    getDatas()
      .then((res) => { console.log("성공 시 로직") })
      .catch((error) => { console.error("실패 시 로직")})

  }, [isUpdate])


  return (
    <MyTestValueContext.Provider value={value}>
      {children}
    </MyTestValueContext.Provider>
  )

}