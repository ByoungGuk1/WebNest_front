import { useEffect, useRef, useState } from 'react';

const useDropDown = () => {
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef(null);

    const removeHandler = () => setIsOpen((prev) => !prev)
    const open = () => setIsOpen(true);
    const close = () => setIsOpen(false);

    useEffect(() => {
        const drop = (e) => {
            if(ref.current && !ref.current.contains(e.target)){
                setIsOpen(false)
            }
        }
            window.addEventListener("click", drop)
        return () => {
            window.removeEventListener("click", drop)
        };
    }, []);
    return [isOpen, ref, removeHandler, close];
};

export default useDropDown;