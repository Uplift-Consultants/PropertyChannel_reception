"use client"

import { useDispatch, useSelector } from "react-redux";
import { useGetAgentsQuery } from "@lib/slices/agentApiSlice";
import { useUpdateAgentsMutation } from "@lib/slices/propertyApiSlice";
import Skeleton from "react-loading-skeleton";

export default function ManageAgents({onClose}) {

    const { data, isLoading: loadingAgents } = useGetAgentsQuery();
    const [updateAgents, { isLoading: updatingAgents, isSuccess }] = useUpdateAgentsMutation();

    const dispatch = useDispatch();

    return(
        <div className="wrapper agents">
            <div className="header">
                <button onClick={onClose}>Close</button>
            </div>
            <div className="content">

            </div>
            <div className="footer">
                <button type="button">Update</button>
            </div>
        </div>
    )
}