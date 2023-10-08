'use client'

import GitHubCalendar from "react-github-calendar";
import {useContext} from "react";
import {ThemeContext} from "@mmccalldev/components/ThemeProvider";

export default function GitHubCalendarWrapper() {
    let theme = useContext(ThemeContext)
    return (<GitHubCalendar username={"matthew-mccall"} colorScheme={theme} />)
}