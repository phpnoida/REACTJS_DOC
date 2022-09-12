const TextError=(props)=>{
    console.log('props',props)
    return (
        <div className='error'>
            {props.children}
        </div>
    )

}
export default TextError;