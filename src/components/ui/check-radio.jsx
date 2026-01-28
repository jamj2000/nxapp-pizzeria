// Es necesario instalar tailwind-merge:  npm install tailwind-merge
import { twMerge } from "tailwind-merge";


export default function CheckRadio({
    name,
    defaultValue,
    defaultChecked = false,
    className,
    children
}) {

    const defaultClassName = "hover:bg-blue-50 has-checked:bg-blue-200 has-checked:text-blue-800 px-2 py-1 text-gray-500 border border-gray-300 rounded"
    const newClassName = twMerge(defaultClassName, className)

    return (
        <label className={newClassName} >
            <input
                type='radio'
                name={name}
                defaultValue={defaultValue}
                defaultChecked={defaultChecked}
                className='hidden' />
            {children}
        </label >
    )
}
