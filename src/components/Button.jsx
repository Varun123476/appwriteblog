function Button({
  children,
  type = "button",
  bgColor = "bg-orange-500",
  textColor = "text-white",
  className = "",
  ...props
}) {
  return (
    <button
      type={type}
      className={`
        px-5 py-2.5 rounded-lg font-semibold text-sm
        transition-all duration-200
        hover:opacity-90 active:scale-95
        disabled:opacity-50 disabled:cursor-not-allowed
        ${bgColor} ${textColor} ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;