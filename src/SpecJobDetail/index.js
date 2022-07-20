import {useResource} from "react-request-hook";
import {useEffect} from "react";
import {Spin} from "antd";
import ResponsiveAppBar from "../AppBar";
import './index.css'
import * as React from "react";

import JobBar from "./JobBar";
import ProgressBar from "./ProgressBar";
import ApplicationDetail from "./ApplicationDetail";

export default function SpecJobDetail(props) {

    const id = props.id;
    const [job, getJob] = useResource(() => ({
        url: `/get-specific-job/${id}`,
        method: 'GET'
    }))
    useEffect(() => getJob(), [getJob])
    return (
        <>
            {job.isLoading || !job.data ? <Spin/> :
                <>
                    <ResponsiveAppBar/>
                    <JobBar jobData={job.data.data}/>
                    <ProgressBar jobData={job.data.data}  />
                    <ApplicationDetail jobData={job.data.data}/>
                </>
            }

        </>
    )


}