'use server';

import brcryptjs from 'bcryptjs';
export const registerUser = async (name: string, email: string, password: string) => {

    try {
        const user = await prisma?.user.create({
            data: {
                name: name,
                email: email.toLowerCase(),
                password: brcryptjs.hashSync(password),
            },
            select: {
                id: true,
                email: true,
                name: true
            }
        })

        return {
            ok: true,
            user,
        }
    } catch (error) {
        console.log(error)

        return {
            ok: false,
            message: 'No se pudo crear el usuario.'
        }
    }


}