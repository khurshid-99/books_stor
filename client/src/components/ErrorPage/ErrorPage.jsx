import { useRouteError, Link } from "react-router";

const ErrorPage = () => {
    const error = useRouteError();
    console.error(error);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-secondary text-rich-black font-poppins-regular p-4">
            <div className="text-center space-y-6 max-w-md w-full">
                <h1 className="text-9xl font-poppins-bold text-orange">404</h1>

                <div className="space-y-2">
                    <h2 className="text-3xl font-poppins-semibold">
                        Page Not Found
                    </h2>
                    <p className="text-lg text-gray-600 font-poppins-light">
                        {error?.statusText || error?.message || "Something went wrong. The page you are looking for might have been removed or is temporarily unavailable."}
                    </p>
                </div>

                <Link
                    to="/"
                    className="inline-block px-8 py-3 bg-orange text-white font-poppins-medium rounded-lg hover:bg-orange-light transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 duration-200"
                >
                    Back to Home
                </Link>
            </div>

            {/* Optional: Add a subtle decorative element */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange to-orange-light opacity-50"></div>
        </div>
    );
};

export default ErrorPage;
