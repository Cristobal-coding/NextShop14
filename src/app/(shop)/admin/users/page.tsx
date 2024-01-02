export const revalidate = 0;

import { Title } from "@/components";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { UsersTable } from "./ui/UsersTable";
import { getPaginatedUsers } from "@/actions";

export default async function AdminUsersPage() {

    const { ok, users = [] } = await getPaginatedUsers();

    if (!ok) {
        redirect('/auth/login');
    }

    return (
        <>

            <div className="inline-flex flex-col items-center mb-10 w-full">
                <Title title="Todas las Ordenes" />
                <UsersTable users={users} />
            </div>
        </>
    );
}