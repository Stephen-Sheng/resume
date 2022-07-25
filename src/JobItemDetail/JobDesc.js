import React from 'react';
import Grid from "@mui/material/Grid";
import ReactTextCollapse from "react-text-collapse";
import {Tag} from "antd";
import {MapContainer,Marker, TileLayer} from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import L from "leaflet";
import icon1 from './marker-icon.png'
const icon = L.icon({ iconUrl: icon1 });
const TEXT_COLLAPSE_OPTIONS = {
    collapse: false,
    collapseText: 'show more',
    expandText: 'show less',
    minHeight: 220,
    maxHeight: 450,
    textStyle: {
        color: '#f64',
        fontSize: '14px',
        cursor:'pointer',
        textAlign:"right"
    },
}

const JobDesc = (props) => {
    const jobData = props.jobData
    let {feature,description,responsibility} = jobData;
    let featureArr = JSON.parse(feature)

    return (
        <Grid container spacing={2} style={{position:"relative",bottom:"10em"}}>
            <Grid item xs={12} style={{
                fontSize: "18px",
                fontWeight: "700",
                color: "#404040",
                textAlign: "left",
                marginLeft: "22em",
                marginTop: "2em"
            }}>
                Job Description
            </Grid>
            <Grid item xs={2.5}/>
            <Grid item xs={4} style={{marginBottom:"20px"}}>
                {featureArr.map((value,index)=>{
                    return(
                        <Tag key={index} color="#f5f8ff" style={{color: "#606060"}}>{value}</Tag>
                    )
                })}
                <div style={{fontSize:"14px",color:"#606060",lineHeight:"32px",paddingTop:"10px"}}>{responsibility}</div>
                <div style={{
                    fontSize: "18px",
                    fontWeight: "700",
                    color: "#404040",
                    textAlign: "left",
                    marginTop: "2em",
                    marginBottom:"2em"
                }}>Work Address</div>
                <MapContainer center={[40.043257, 116.273325]} zoom={13} scrollWheelZoom={false} style={{height:"178px",width:"823px"}}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={[40.043257, 116.273325]} icon={icon}>
                        {/*<Popup>*/}
                        {/*    A pretty CSS3 popup. <br /> Easily customizable.*/}
                        {/*</Popup>*/}
                    </Marker>
                </MapContainer>
            </Grid>

            <Grid item xs={1.8} />
            <Grid item xs={3.7} style={{position:"relative",top:"80px"}}>
                <ReactTextCollapse options={TEXT_COLLAPSE_OPTIONS}>
                    <p style={{lineHeight:"32px"}}>{description}</p>
                </ReactTextCollapse>
            </Grid>
            <Grid item xs={2.5} />
            <Grid item xs={5} >
            </Grid>



        </Grid>
    )
};

export default JobDesc;