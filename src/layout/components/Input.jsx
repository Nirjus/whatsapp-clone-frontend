import  TextField  from '@mui/material/TextField'
import React from 'react'

const Input = ({name, state, setState, label= false}) => {
  return (
    <div className=' flex gap-1 flex-col'>

        <div>
            <TextField type='text' name={name} value={state} onChange={(e) => setState(e.target.value)}
              label={name} variant={"filled"} color="success" error={label && state === "" ? true : false} helperText={label && state === "" && `${name} is required`}
            />
        </div>
    </div>
  )
}

export default Input