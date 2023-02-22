import React, {useState,useRef} from 'react';




const Asdasdasd = () => {
    const [count,setCount] = useState<number>(0)
    const asd = useRef<any>(null)
    function upload (){

    }   
    return (
        <div>
            <input ref={asd} type='file' onChange={upload} />
        </div>
    );
};

export default Asdasdasd;