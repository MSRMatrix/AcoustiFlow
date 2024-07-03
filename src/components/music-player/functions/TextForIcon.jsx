const TextForIcon = ({text, showText}) => {
    return(
        <>
    <div className={`hover-text ${showText}`}>
        <p>{text}</p>
    </div>
        </>
    )
}

export default TextForIcon;