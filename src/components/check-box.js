function CheckBox({ name, defaultChecked = false, className, children }) {
    return (
        <label className={className} >
            <input
                type="checkbox"
                name={name}
                defaultChecked={defaultChecked}
                className='hidden' />
            {children}
        </label >
    );
}

export default CheckBox;