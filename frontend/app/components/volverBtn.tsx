import { useRouter } from "next/navigation";
const VolverButton = () => {
    const router = useRouter();
    return (
        <button
            className="border-2 bg-white border-gray-400 text-red-500 hover:text-red-700
             hover:border-slate-600 uppercase text-xs xl:text-base font-bold py-2 px-4 rounded"
            onClick={() => router.back()}
        >
            Volver
        </button>
    );
};

export default VolverButton;
