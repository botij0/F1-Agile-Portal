// withAuth.tsx

import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/Auth.Context"; // Importa el hook useAuth desde tu archivo AuthProvider
import toast from "react-hot-toast";
import Loading from "./Loading";

const withAdmin = (WrappedComponent: React.ComponentType) => {
    const Wrapper = (props: any) => {
        const { loading, isAdmin } = useAuth(); // Obtén el estado de autenticación del contexto

        const router = useRouter();

        if (loading) {
            return <Loading></Loading>; // Muestra un indicador de carga mientras se verifica la autenticación
        }

        if (!isAdmin) {
            toast.error("No tienes permisos para acceder a esta página");
            router.push("/"); // Redirecciona al usuario a la página de inicio de sesión si no está autenticado
        } else {
            return <WrappedComponent {...props} />;
        }
    };

    return Wrapper;
};

export default withAdmin;
