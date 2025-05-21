export const Alert = ({ message }) => {
  if (message === null){
    return null
   }
   return (
    <div className='alert'>
      {message}
    </div>
    )
}
  
export const Error = ({ message }) => {
  if (message === null){
    return null
  }
  return (
    <div className='error'>
      {message}
    </div>
    )
}