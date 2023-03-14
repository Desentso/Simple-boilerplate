/*
  This example requires Tailwind CSS v2.0+ 
  
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/

function makeid(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export default function TextInput({
  label,
  name,
  type = "text",
  onChange,
  defaultValue,
  value,
  id = makeid(8),
  placeholder,
  error,
}) {

  const _onChange = (e) => {
    onChange(e.target.value)
  }

  return (
    <div>
      <label
        htmlFor={id}
        className={"block text-sm font-medium text-gray-700"}
      >
        {label}
      </label>
      <div className="mt-1">
        <input
          type={type}
          name={name}
          onChange={_onChange}
          value={value}
          defaultValue={defaultValue}
          id={id}
          className={
            "shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md"
            + (error ? " border-red-600" : "")
          }
          placeholder={placeholder}
        />
      </div>
      {error && <p className="text-red-600">{error}</p>}
    </div>
  )
}
