import { forwardRef, useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, type = "text", error, ...rest }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    const inputType =
      type === "password" ? (showPassword ? "text" : "password") : type;

    return (
      <div>
        <label className="text-sm font-medium text-gray-700 block mb-1">
          {label}
        </label>
        <div className="relative">
          <input
            {...rest}
            ref={ref}
            type={inputType}
            className={`w-full px-4 py-2 border ${
              error ? "border-red-500" : "border-gray-300"
            } rounded-md`}
          />
          {type === "password" && (
            <div
              className="absolute right-3 top-2.5 cursor-pointer text-gray-500"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
            </div>
          )}
        </div>
        {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
