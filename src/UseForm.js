import {useState} from 'react'

const UseForm = (initialValues) => {
    const [values, setValues] = useState(initialValues || {})  
  
    const handleChange = (event) => {
      const {name, value} = event.target
      setValues({ 
        ...values, 
        [name]: value
      })
    }
  
    const resetForm = () => {
      setValues(initialValues)
    }
  
    return {values, handleChange, resetForm}
  }

export default UseForm