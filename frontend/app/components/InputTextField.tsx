const InputTextField = ({
    label,
    register,
    name,
    errors,
    loading,
    isNumber,
}: {
    label: string;
    register: any;
    name: string;
    errors: any;
    loading: boolean;
    isNumber?: boolean;
}) => {
    return (
        <div className="flex flex-col">
            <label className="block mb-1 text-sm font-medium text-gray-900">
                {label}
            </label>

            <input
                disabled={loading}
                {...register(name)}
                type={isNumber ? "number" : "text"}
                id={name}
                className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500
                                    focus:border-red-500 block w-full p-2.5 "
                step={isNumber ? "any" : undefined}
            />
            {errors[name] && (
                <span className="text-red-500 text-xs italic">
                    {errors[name].message as string}
                </span>
            )}
        </div>
    );
};

export default InputTextField;
