const InputButton = ({
    label,
    loading,
}: {
    label: string;
    loading: boolean;
    isEditing?: boolean;
    type?: string;
}) => {
    return (
        <button
            disabled={loading}
            type="submit"
            className="bg-red-600 hover:bg-red-700 text-white font-bold  py-2 px-6 rounded-lg"
        >
            {label}
        </button>
    );
};

export default InputButton;
