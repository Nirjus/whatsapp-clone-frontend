import React, { useRef } from 'react'

const ContextMenue = ({options, cordinates, contextMenue, setContextMenue}) => {
    const contextMenueRef = useRef(null);
    React.useEffect(() => {
           const handleOutsideClick = (event) => {
            if(event.target.id !== "context-opener"){
                if(contextMenueRef.current && !contextMenueRef.current.contains(event.target)){
                    setContextMenue(false)
                }
            }
           };
           document.addEventListener("click", handleOutsideClick);

           return () => {
            document.removeEventListener("click", handleOutsideClick);
           }
    },[setContextMenue])
    const handleClick = (e, callBack) => {
       e.stopPropagation();
       setContextMenue(false);
       callBack();
    }
  return (
    <div className={`bg-[#38434e] fixed p-2 rounded z-[100] shadow-md shadow-[#313131]`}
    ref={contextMenueRef}
    style={{
        top: cordinates.y,
        left: cordinates.x
    }}
    >
        <ul>
            {
                options.map(({name, callBack}) => (
                    <li key={name} onClick={(e) => handleClick(e,callBack)}
                    className=' cursor-pointer px-3 py-2 hover:bg-[#0000003d] hover:duration-500 rounded'
                    >
                       <span className=' text-white'>{name}</span>
                    </li>
                ))
            }
        </ul>
    </div>
  )
}

export default ContextMenue