import React, {useState, useEffect} from "react";

import {connect} from "react-redux";

import {CLEAN_ALERT} from "../../redux/types";

import styles from "./alert.module.scss";

const Alert = ({alert, reset}) => {

    // tricky? :/
    const [firstMount, setFirstMount] = useState(true);
    const [phase, setPhase] = useState("init");

    const [timeouts, setTimeouts] = useState({});

    const DISPLAY_TIME = 2000;  // 1 second animations (enter/exit), 1 standing
    const EXIT_TIME = 500; // must be in sync with css (refactor?)

    useEffect(() => {
        if(firstMount && alert.msg){
            setFirstMount(false);
        };
                
        if (Object.keys(timeouts).length > 0){
            clearTimeout(timeouts.startTimeout);
            clearTimeout(timeouts.exitTimeout);
            clearTimeout(timeouts.resetTimeout);
        };

        animateAlert();
    }, [alert.msg]);

    const animateAlert = () => {
        setPhase("init");
        timeouts.startTimeout = setTimeout(() => setPhase("starting"), 60);
        timeouts.exitTimeout = setTimeout(() => setPhase("ending"), (DISPLAY_TIME - EXIT_TIME))
        timeouts.resetTimeout = setTimeout(() => {
            setTimeouts({});
            setPhase("init");
            reset();
        }, DISPLAY_TIME);
    }

    const alertClasses = () => {
        // remove animation classes on first mount or 
        // if there's no alert message (which is removed through 
        // CLEAN ALERT action type dispatch).
        const isDisplayed = !firstMount && alert.msg;
        
        let phaseClass;
        
        switch(phase){
            case "init":
                    phaseClass = null;
                    break;
            case "starting":
                    phaseClass = styles.enter;
                    break;
            case "ending":
                    phaseClass = styles.exit;
                    break;
            default:
                    phaseClass = null;
        };
        // alert class is used for general style
        // alert type (error/success) is used to characterize alert
        // phaseClass animate the alert component
        return [styles.alert, styles[alert.type], isDisplayed && phaseClass].join(" ");
    };

    return (
        <div id="wrapper" className={styles.wrapper}>
            <div  className={alertClasses()}>
                {alert.msg}
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    alert: state.alert
});

const mapDispatchToProps = dispatch => ({
    reset: () => dispatch({type: CLEAN_ALERT}),
});

export default connect(mapStateToProps, mapDispatchToProps)(Alert);