import PropTypes from "prop-types";

function DefaultInput({
  inputType = "text",
  inputName = "",
  inputPlaceholder = "",
  className = "",
  ...rest
}) {
  return (
    <input
      required
      type={inputType}
      name={inputName}
      placeholder={inputPlaceholder}
      className={`w-full p-2 border border-gray-300 rounded-md text-black font-normal text-base focus:outline-none focus:ring-2 focus:ring-blue-400 ${className}`}
      {...rest}
    />
  );
}

DefaultInput.propTypes = {
  inputType: PropTypes.string,
  inputName: PropTypes.string,
  inputPlaceholder: PropTypes.string,
  className: PropTypes.string,
};

export default DefaultInput;
