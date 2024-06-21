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
                <div className="inputWithValidationContainer">
                    <p>{placeholder}</p>
                    <input
                        text={text}
                        onChange={(e) => updateText(e.target.value)}
                        style={{
                            color: isValid ? "black" : "red",
                        }}
                    />
                    <div className="buttonContainer">
                        <button onClick={onCancel}>Cancel</button>
                        <button
                            className={isValid ? "" : "invalid"}
                            onClick={onSave}
                        >
                            Save
                        </button>
                    </div>
                </div>
            }
        />
    );
};

export default InputWithValidation;
