'use client';

import { changeUserRole } from '@/actions';
import { IUser } from '@/interfaces'

interface Props {
    users: IUser[],
}


export const UsersTable = ({ users }: Props) => {
    return (
        <table className="w-full sm:w-5/6 lg:w-2/3 ">
            <thead className="bg-gray-200 border-b">
                <tr>
                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                        #Id
                    </th>
                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                        Nombre completo
                    </th>
                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                        Rol Actual
                    </th>
                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                        Opciones
                    </th>
                </tr>
            </thead>
            <tbody>

                {
                    users.map(user => {

                        return (
                            <tr key={user.id} className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">

                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    {user.id.split('-').at(-1)}
                                </td>
                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                    {`${user.name}`}
                                </td>

                                <td className="flex items-center text-sm  text-gray-900 font-light px-6 pt-4 whitespace-nowrap">


                                    <select
                                        value={user.role}
                                        onChange={(e) => changeUserRole(user.id, e.target.value)}
                                        className=' w-full p-2 text-sm text-gray-900 px-5 py-2 border shadow-md transition-all focus:shadow-blue-300 fade-in  bg-gray-200 rounded mb-5 outline-none'>
                                        <option value='admin'>Administrador</option>
                                        <option value='user'>Cliente</option>
                                    </select>

                                </td>

                                <td className="text-sm  text-gray-900 font-light px-6 ">

                                </td>



                            </tr>
                        )
                    })
                }

            </tbody>
        </table>
    )
}
