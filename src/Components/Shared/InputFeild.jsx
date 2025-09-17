import React from 'react'

const InputFeild = ({
    label,
    id,
    type,
    errors,
    register,
    required,
    message,
    className,
    min,
    value,
    placeHolder
}) => {
  return (
    <div className='flex flex-col gap-1 w-full' >
        <label 
            htmlFor="id"
            className={`${className ? className : ""} font-semibold text-sm text-slate-800`}
        >
            {label}
        </label>
        <input 
            type={type}  
            id={id}
            placeholder={placeHolder}
            className={`${className ? className : ""} 
            px-2 py-2 border outline-none bg-transparent text-slate-800 rounded-md 
            ${errors[id]?.message ? "border-red-500" : "border-slate-700"}`}
            {...register(id,{
                required: {value:required, message},
                minLength: min 
                            ? {value:min, message:`Minimun ${min} character are required`} 
                            : null,
                pattern: type === "email"
                    ?   {
                        value: /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+com+$/,
                        message: "Invalid Email"
                    }
                    : type === "url"
                    ? {
                        value: /^(https?:\/\/)?(([a-zA-Z0-9\u00a1-\uffff-]+\.)+[a-zA-Z\u00a1-\uffff]{2,})(:\d{2,5})?(\/[^\s]*)?$/,
                        message: "Please enter a valid url"
                    }
                    : null,
            })}            
        />

        {errors[id]?.message && (
            <p className='text-sm font-semibold text-rose-600 mt-0' >
                {errors[id]?.message}
            </p>
        )}
    </div>
  )
}

export default InputFeild