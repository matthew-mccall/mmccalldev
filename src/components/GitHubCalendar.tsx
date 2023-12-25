'use client'

import GitHubCalendar from "react-github-calendar";
import { useContext } from "react";
import { ThemeContext } from "@mmccalldev/components/ThemeProvider";

const selectLastHalfYear = (contributions: any[]) => {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    const shownMonths = 6;

    return contributions.filter((activity: { date: string | number | Date; }) => {
        const date = new Date(activity.date);
        const monthOfDay = date.getMonth();

        return (
            date.getFullYear() === currentYear &&
            monthOfDay > currentMonth - shownMonths &&
            monthOfDay <= currentMonth
        );
    });
};

export default function GitHubCalendarWrapper() {
    let theme = useContext(ThemeContext)
    return (
        <>
            <div className="d-none d-md-block">
                <GitHubCalendar username={"matthew-mccall"} colorScheme={theme} />
            </div>
            <div className="d-md-none">
                <GitHubCalendar username={"matthew-mccall"} colorScheme={theme} transformData={selectLastHalfYear} />
            </div>
        </>
    )
}