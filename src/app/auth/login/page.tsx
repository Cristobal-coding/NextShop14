import { titleFont } from '@/config/fonts';
import Link from 'next/link';

export default function LoginPage() {
    return (
        <div className="flex w-full  items-start justify-center min-h-screen">

            <div className='w-full md:w-2/3 lg:w-2/4 pt-16'>
                <h1 className={`${titleFont.className} text-4xl mb-5`}>Ingresa</h1>

                <div className="flex flex-col">


                    <label htmlFor="email">Correo electrónico</label>
                    <input
                        className="px-5 py-2 border bg-gray-200 rounded mb-5"
                        type="email" />


                    <label htmlFor="password">Contraseña</label>
                    <input
                        className="px-5 py-2 border bg-gray-200 rounded mb-5"
                        type="password" />


                    <button

                        className="btn-primary">
                        Ingresar
                    </button>


                    {/* divisor l ine */}
                    <div className="flex items-center my-5">
                        <div className="flex-1 border-t border-gray-500"></div>
                        <div className="px-2 text-gray-800">O</div>
                        <div className="flex-1 border-t border-gray-500"></div>
                    </div>

                    <Link
                        href="/auth/register"
                        className="btn-secondary text-center">
                        Registrate aqui
                    </Link>

                </div>
            </div>
        </div>
    );
}