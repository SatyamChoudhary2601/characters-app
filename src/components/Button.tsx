import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonProps> = ({ children, style, ...props }) => {
  const defaultStyles: React.CSSProperties = {
    backgroundColor: "#1a73e8",
    color: "white",
    border: "none",
    borderRadius: "8px",
    padding: "10px 20px",
    fontSize: "16px",
    cursor: "pointer",
    transition: "background-color 0.3s, box-shadow 0.3s",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
  };

  const hoverStyles: React.CSSProperties = {
    backgroundColor: "#005cb2",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
  };

  const disabledStyles: React.CSSProperties = {
    backgroundColor: "#a0a0a0",
    cursor: "not-allowed",
    boxShadow: "none",
  };

  const [isHovered, setIsHovered] = React.useState(false);

  const combinedStyles = {
    ...defaultStyles,
    ...(props.disabled ? disabledStyles : isHovered ? hoverStyles : {}),
    ...style,
  };

  return (
    <button
      style={combinedStyles}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
