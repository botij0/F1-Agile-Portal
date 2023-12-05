

const InputButton = ({ label, loading }: {
    label: string,
    loading: boolean,
    isEditing?: boolean
    type?: string
}) => {
    return (
        <button

            disabled={loading}
            type="submit" className="bg-gray-800  text-white px-4 py-2 rounded-md hover:bg-gray-950">
            {
                label
            }
        </button>
    )
}

export default InputButton;