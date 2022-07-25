import {useResource} from "react-request-hook";
import {useEffect} from "react";
import {Spin} from "antd";
import ResponsiveAppBar from "../AppBar";
import './index.css'
import * as React from "react";

import JobBar from "./JobBar";
import ProgressBar from "./ProgressBar";
import JobDesc from "./JobDesc";



export default function JobItemDetail(props) {

    const id = props.id;
    const [job, getJob] = useResource(() => ({
        url: `/queryJobItem/${id}`,
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
                    <JobDesc jobData={job.data.data}/>
                </>
            }

        </>
    )


}