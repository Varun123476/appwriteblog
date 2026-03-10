import { useId, forwardRef } from 'react';


const Select = forwardRef(function Select(
  { label, options = [], className = "", error = "", ...props },
  ref
) {
  const id = useId();

  return (
    <div className="w-full mb-4">
      {label && (
        <label
          htmlFor={id}
          className="block mb-1.5 text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      )}
      <select
        id={id}
        ref={ref}
        className={`
          w-full px-4 py-2.5 rounded-lg border text-sm
          bg-white text-gray-900
          border-gray-300 outline-none
          transition duration-150
          focus:ring-2 focus:ring-orange-400 focus:border-orange-400
          disabled:bg-gray-100 disabled:cursor-not-allowed
          ${error ? "border-red-500 focus:ring-red-400" : ""}
          ${className}
        `}
        {...props}
      >
        {options?.map((opt) => (
          <option key={opt} value={opt}>
            {opt.charAt(0).toUpperCase() + opt.slice(1)}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
});

export default Select;
