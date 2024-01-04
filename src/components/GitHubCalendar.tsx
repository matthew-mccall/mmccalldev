'use client'

import GitHubCalendar from "react-github-calendar";
import {useContext, useEffect, useState} from "react";
import { ThemeContext } from "@mmccalldev/components/ThemeProvider";
import {Activity} from "react-activity-calendar";

const selectLastHalfYear = (contributions: Array<Activity>) => {
    // Check whether the contribution is in the last 6 months accounting for new years
    const now = new Date()
    const sixMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 6, now.getDate())

    return contributions.filter((contribution) => {
        const date = new Date(contribution.date)
        return date.getTime() > sixMonthsAgo.getTime()
    })
};

export default function GitHubCalendarWrapper() {

    const theme = useContext(ThemeContext)
    const [useLastHalfYear, setUseLastHalfYear] = useState(false)

    // check whether the viewport is at least lg
    useEffect(() => {
        if (typeof window !== 'undefined') {
            setUseLastHalfYear(window.innerWidth <= 992)
            window.addEventListener('resize', () => {
                setUseLastHalfYear(window.innerWidth <= 992)
            })
        }
    }, [])

    return <GitHubCalendar username={"matthew-mccall"} colorScheme={theme} transformData={useLastHalfYear ? selectLastHalfYear : undefined} hideColorLegend={useLastHalfYear} />
}