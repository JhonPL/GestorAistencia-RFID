import { AuthProvider } from "./auth/context";
import { AppRouter } from "./router/AppRouter"


export const RfidApp = () => {
    return (  
        <AuthProvider>
        <AppRouter />
        </AuthProvider>
    );
}