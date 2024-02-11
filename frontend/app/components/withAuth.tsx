// withAuth.tsx

import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/Auth.Context"; // Importa el hook useAuth desde tu archivo AuthProvider
import toast from "react-hot-toast";
import Loading from "./Loading";

const withAuth = (WrappedComponent: React.ComponentType) => {
    const Wrapper = (props: any) => {
        const { isAuthenticated, loading } = useAuth(); // Obtén el estado de autenticación del contexto

        const router = useRouter();

        if (loading) {
            return <Loading></Loading>; // Muestra un indicador de carga mientras se verifica la autenticación
        }

        if (!isAuthenticated && !loading) {
            toast.error("Debes iniciar sesión para acceder a esta página");
            router.push("/Users/Login"); // Redirecciona al usuario a la página de inicio de sesión si no está autenticado
        }

        return <WrappedComponent {...props} />;
    };

    return Wrapper;
};

export default withAuth;
