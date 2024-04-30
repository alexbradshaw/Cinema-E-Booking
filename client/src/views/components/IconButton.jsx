import { Icon } from '@iconify/react';

const IconButton = ({ click, icon, style, type, disabled }) => {
    return (
        <button onClick={click} style={style} type={type} className='iconButton' disabled={disabled}>
            <Icon icon={icon} />
        </button>
    );
}

export default IconButton;