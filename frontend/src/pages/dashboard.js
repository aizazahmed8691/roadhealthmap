import React from "react";
import Header from "../components/header.js";
// import Map from "../components/map.js";
import TaskCalendar from "../components/calender.js";
import { Grid } from '@material-ui/core';

const Dashboard = () => {
    return (
        <div>
        <Header/>
        <TaskCalendar/>
        </div>
    )
}

export default Dashboard;
