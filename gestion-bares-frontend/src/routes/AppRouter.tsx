import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { EditUser } from '../features/app/admin/users/EditUser';
import { UserDetails } from '../features/app/admin/users/UserDetails';
import { UsersManagement } from '../features/app/admin/users/UsersManagement';
import { App } from '../features/app/App';
import { EditMyAccount } from '../features/app/my-account/EditMyAccount';
import { MyAccount } from '../features/app/my-account/MyAccount';
import { LogIn } from '../features/auth/LogIn';
import { SignUp } from '../features/auth/SignUp';
import { Home } from '../features/home/Home';
import { NotFound } from '../features/not-found/NotFound';
import { ProtectedRoute } from './ProtectedRoute';

export const AppRouter = () => {

    const renderMultiRoutes = ({ element: Element, paths, ...rest }: { element: React.ReactElement; paths: string[];[key: string]: unknown }) => paths.map((path: string) => {
        return {
            ...rest,
            path, element: Element
        }
    });

    const router = createBrowserRouter([
        ...renderMultiRoutes({ paths: ['/home', '/'], element: <Home /> }),
        { path: '/login', element: <LogIn /> },
        { path: '/signup', element: <SignUp /> },
        { path: '*', element: <NotFound /> },

        {
            element: <ProtectedRoute allowedRoles={["ADMIN", "STAFF", "CUSTOMER"]} />,
            children: [
                {
                    element: <App />,
                    children: [
                        { path: "/account", element: <MyAccount /> },
                        { path: "/account/edit", element: <EditMyAccount /> },
                        // Rutas para todos los usuarios
                    ]
                }
            ]
        },
        {
            element: <ProtectedRoute allowedRoles={["ADMIN"]} />,
            children: [
                {
                    element: <App />,
                    children: [
                        { path: "/admin/users", element: <UsersManagement /> },
                        { path: "/admin/users/:id", element: <UserDetails /> },
                        { path: "/admin/users/edit/:id", element: <EditUser /> },
                        // Rutas para administradores
                    ]
                }
            ]
        },
        {
            element: <ProtectedRoute allowedRoles={["STAFF"]} />,
            children: [
                {
                    element: <App />,
                    children: [
                        // Rutas para staffs
                    ]
                }
            ]
        },
        {
            element: <ProtectedRoute allowedRoles={["CUSTOMER"]} />,
            children: [
                {
                    element: <App />,
                    children: [
                        // Rutas para customers
                    ]
                }
            ]
        },
    ]);

    return <RouterProvider router={router} />;
};
