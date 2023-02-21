import { AuthContext } from "@/contexts/AuthContext";
import { api } from "@/services/api";
import { useContext, useEffect } from "react";

export default function Dashboard() {
    const { user } = useContext(AuthContext);

    useEffect(() => {
        api.get('/me')
            .then(response => console.log(response))
            .catch(err => console.error(err))
    }, [])

    return (
        <h1>Dashboard: {user?.email}</h1>
    )
}