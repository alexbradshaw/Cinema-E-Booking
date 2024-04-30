import IconButton from "./IconButton";

const Confirm = ({ check, no, type, disabled }) => {
    return (
        <div className="confirm">
            <IconButton click={check} icon={"fluent:checkmark-12-filled"} type={type} style={{"backgroundColor":"green"}} disabled={disabled} />
            <IconButton click={no} icon={"octicon:x-12"} style={{"marginLeft": "5px", "backgroundColor":"red"}} disabled={disabled} />
        </div>
    );
}

export default Confirm;