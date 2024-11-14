import React from "react";

const IconButton = ({
  icon: Icon,
  text = null,
  onClick,
  type = "button",
  fontSize,
  ...props
}) => {
  return (
    <div
      onClick={onClick}
      type={type}
      className={`flex items-center gap-2 ${
        fontSize ? `text-${fontSize}` : "text-xl"
      } text-text hover:bg-primary rounded-md p-3 hover:text-white cursor-pointer ${
        props.disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
      {...props}
    >
      <Icon />
      {text && <p>{text}</p>}
    </div>
  );
};

export default IconButton;
