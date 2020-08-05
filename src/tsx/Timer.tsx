import * as React from "react";
import '../css/Timer.css';

type Props = {
    startTimeInSeconds: number;
}

type State = {
    timeRemainingInSeconds: number;
}

export default class Timer extends React.Component<Props, State> {
    private timer: any;

    constructor(props: Props) {
        super(props);
        this.state = {
            timeRemainingInSeconds: props.startTimeInSeconds
        };
    }

    decrementTimeRemaing = () => {
        if (this.state.timeRemainingInSeconds > 0) {
            this.setState({
                timeRemainingInSeconds: this.state.timeRemainingInSeconds - 1
            });
        } else {
            clearInterval(this.timer!);
        }
    }

    componentDidMount() {
        this.timer = setInterval(() => {
            this.decrementTimeRemaing();
        }, 1000);
    }

    render() {
        return (
            <div className="row">
                <div className="col-8 offset-2">
                    <div className="countdown-timer">
                        <div className="countdown-timer__circle">
                            <svg>
                                <circle
                                    r="480"
                                    cx="520"
                                    cy="520"
                                    style={{
                                        animation: `countdown-animation ${this.props
                                            .startTimeInSeconds}s linear`
                                    }}
                                />
                            </svg>
                        </div>
                        <div className="countdown-timer__text">
                            {this.state.timeRemainingInSeconds}s
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}