import CheckRadio from "./check-radio";


function InputAvatar({ name = 'image', user }) {

    const avatares = Array.from({ length: 80 }, (_, index) =>
        `/images/avatar-${String(index).padStart(2, '0')}.png`
    );

    return (
        <div className='grid place-items-center grid-cols-[repeat(auto-fill,minmax(40px,1fr))]'>
            {/* Avatares 00 .. 79 */}
            {avatares.map((avatar, index) => (
                <CheckRadio key={index}
                    name={name}
                    defaultValue={avatar}
                    className="size-14 has-checked:col-span-4 has-checked:row-span-3 has-checked:-order-1 has-checked:size-36 has-checked:bg-green-200 px-2 py-1 rounded-md"
                >
                    <img src={avatar} alt="Imagen de usuario" />
                </CheckRadio>
            ))}
            {/* por defecto */}
            <CheckRadio key={80}
                name={name}
                defaultValue={user?.image || '/images/avatar-80.png'}
                defaultChecked={true}
                className="size-14 has-checked:col-span-4 has-checked:row-span-3 has-checked:-order-1 has-checked:size-36 has-checked:bg-green-200 px-2 py-1 rounded-md"
            >
                <img src={user?.image || '/images/avatar-80.png'} alt='avatar' />
            </CheckRadio>
        </div>
    );
}

export default InputAvatar;