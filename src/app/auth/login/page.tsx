import { titleFont } from '@/config/fonts';
import Link from 'next/link';
import { LoginForm } from './ui/LoginForm';

export default function LoginPage() {
    return (
        <div className="flex w-full  items-start justify-center min-h-screen">

            <div className='w-full sm:w-2/4 md:w-5/12  xl:w-1/5 pt-16'>
                <h1 className={`${titleFont.className} text-4xl mb-5`}>Ingresa</h1>

                <LoginForm />
            </div>
        </div>
    );
}