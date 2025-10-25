import { useState } from "react";

// setValue((prev) => ({
//   ...prev,
//   // key에 변수를 사용하기 위한 문법 [key]: value
//   [e.target.name]: e.target.value,
// }));

const useInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);

  const onChangeValue = (e) => {
    setValue(e.target.value);
  };

  return [value, setValue, onChangeValue];
};

export default useInput;
