import { AuthContext } from "@/contexts/AuthContext";
import { useCan } from "@/hooks/useCan";
import { setupAPIClient } from "@/services/api";
import { api } from "@/services/apiClient";
import { withSSRAuth } from "@/utils/withSSRAuth";
import { useContext, useEffect } from "react";

export default function Dashboard() {
    const { user, signOut, isAuthenticated } = useContext(AuthContext);

    const userCanSeeMetrics = useCan({
        permissions: ['metrics.list']
    });

    useEffect(() => {
        api.get('/me')
            .then(response => console.log(response))
            .catch(err => console.error(err))
    }, [])

    return (
        <>
            <h1>Dashboard: {user?.email}</h1>

            <button onClick={signOut} >Sign Out</button>

            { userCanSeeMetrics && <div>Métricas</div> }
        </>

    )
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
    const apiClient = setupAPIClient(ctx); 
    const response = await apiClient.get('/me');


    return {
        props: {}
    }
})