import React from "react";
import "./Input.css";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  reset: () => void;
};

const Input: React.FC<InputProps> = (props) => {
  const { reset, ...rest } = props;
  return (
    <div className="inputContainer">
      <input className="modern-input" {...rest} />
      {rest?.value && (
        <p className="close" onClick={reset}>
          x
        </p>
      )}
    </div>
  );
};

export default Input;
