/*
    Este componente debe ser refactorizado para que sea reutilizable.
    Actualmente las opciones del select solo reciben code y name (Para los paises)
    TODO --> Hacer que las opciones del select puedan recibir cualquier propiedad
*/

const InputSelectField = ({ label, register, name, errors, loading, options }: {
    label: string,
    register: any,
    name: string,
    errors: any,
    loading: boolean,
    options: any
}) => {
    return (
        <div className="flex flex-col">
            <label className="block mb-1 text-sm font-medium text-gray-900">
                {label}
            </label>

            <select
                disabled={loading}
                {...register(name)}
                id={name}
                className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500
                                    focus:border-red-500 block w-full p-2.5 "
            >
                <option value="">Selecciona una opción</option>
                {options.map((option: any) => (
                    <option key={option.code} value={option.code}>{option.name}</option>
                ))}
            </select>
            {
                errors[name] && (
                    <span className="text-red-500 text-xs italic">{errors[name].message as string}</span>
                )
            }
        </div>
    )
}

export default InputSelectField;