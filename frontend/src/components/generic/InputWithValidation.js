import DialogBox from "../dialogueBoxes/DialogBox";

const InputWithValidation = ({
    active,
    onClose,
    text,
    updateText,
    isValid,
    placeholder,
    title,
    onCancel,
    onSave,
}) => {
    return (
        <DialogBox
            active={active}
            onClose={onClose}
            header={<h1>{title}</h1>}
            content={
                <div>
                    <input
                        placeholder={placeholder}
                        text={text}
                        onChange={(e) => updateText(e.target.value)}
                        style={{
                            color: isValid ? "black" : "red",
                        }}
                    />
                    <button onClick={onCancel}>Cancel</button>
                    <button onClick={onSave}>Save</button>
                </div>
            }
        />
    );
};

export default InputWithValidation;
