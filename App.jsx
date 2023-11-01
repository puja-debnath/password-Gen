import { useCallback, useEffect, useState,useRef } from 'react'

function App() {
  const [length, setlength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [characterAllowed, setcharacterAllowed] = useState(false)
  const [password, setpassword] = useState("")

  const passwordGeneretor = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwwxyz"

    if(numberAllowed) str +="1234567890"
    if(characterAllowed) str += "!@#$%^&*()_+{}:"

    for(let i = 1; i<= length; i++){
      let char = Math.floor(Math.random() * str.length + 1);
      pass +=str.charAt(char);
    }
    setpassword(pass);
  },
  [length,numberAllowed,characterAllowed,setpassword])


    
  const passRef = useRef(null);
  const copyPassword = useCallback(() => {
   passRef.current?.select();
   passRef.current?.setSelectionRange(0,10)

    window.navigator.clipboard.writeText(password)
  },[password])

useEffect(() => {
  passwordGeneretor()
},[length,numberAllowed,characterAllowed,passwordGeneretor])
  return (
    <>
     <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-16 py-5 my-8 
     text-orange-500 bg-gray-800' >
      <h1 className='text-white text-center'>Password generator</h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-4  px-30 '>
         <input 
         type='text'
         placeholder='password'
         value={password}
         className='outline-none w-full py-1 px-10'
         readOnly
         ref={passRef}
         />
         <button
         onClick={copyPassword}
         
         className=' outline-none shrink-0 text-white bg-blue-400 px-2 py-3' >Copy</button>
      </div>
      <div className='flex text-sm gap-x-2 '>
        <div className='fles items-center gap-x-1'>
         <input type='range'
         min={8}
         max={20}
         value={length}
         className='cursor-pointer'        
         onChange={(e) => setlength(e.target.value)}
         />
         <lebel>Length:{ length}</lebel>
        </div>
        <div className='flex items-center gap-x-1'>
        <input 
         type='checkbox'
         defaultChecked={numberAllowed}
         id="numberInput"
         onChange={() => setNumberAllowed((prev) => !prev)}       
        />
        <lebel htmlFor="numberInput">Numbers</lebel>
        </div>

        <div className='flex items-center gap-x-1'>
        <input 
         type='checkbox'
         defaultChecked={characterAllowed}
         id="characterInput"
         onChange={ () => 
            setcharacterAllowed((prev) => !prev)}       
        />
        <lebel htmlFor="characterInput">Characters</lebel>
        </div>
      </div>
     </div>
     
    </>
  )
}

export default App
