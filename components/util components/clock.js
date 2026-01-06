import { Component } from 'react'

export default class Clock extends Component {
    constructor() {
        super();
        this.month_list = ["Janvier", "Février", "Mars", "Avril", "Mai", "Junin", "Julliet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
        this.day_list = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
        this.state = {
            hour_12: false,
            current_time: new Date()
        };
    }

    componentDidMount() {
        this.update_time = setInterval(() => {
            this.setState({ current_time: new Date() });
        }, 10 * 1000);
    }

    componentWillUnmount() {
        clearInterval(this.update_time);
    }

    render() {
        const { current_time } = this.state;

        let day = this.day_list[current_time.getDay()];
        let hour = current_time.getHours();
        let minute = current_time.getMinutes();
        let month = this.month_list[current_time.getMonth()];
        let date = current_time.getDate().toLocaleString();
        

        if (minute.toLocaleString().length === 1) {
            minute = "0" + minute
        }
        if (hour.toLocaleString().length === 1) {
            hour = "0" + hour
        }

        if (this.state.hour_12 && hour > 12) hour -= 12;

        let display_time;
        if (this.props.onlyTime) {
            display_time = hour + ":" + minute + " " + meridiem;
        }
        else if (this.props.onlyDay) {
            display_time = day + " " + month + " " + date;
        }
        else display_time = day + " " + date + " " + month + " " + hour + ":" + minute;
        return <span>{display_time}</span>;
    }
}
