import NavBar from "../components/NavBar";
import { Switch, Route } from "react-router-dom";
import EventInfo from "../components/EventInfo";
import HomePage from "./HomePage";
import SignUpForm from "../components/SignUpForm";

function Sportify() {
    return (
        <div>
            <NavBar />

            {/* set routing */}
            <Switch>
                <Route exact path="/" component={HomePage} />
                <Route exact path="/eventInfo" component={EventInfo} />
                <Route exact path="/signUpFrom" component={SignUpForm} />
            </Switch>
        </div>
    )
}

export default Sportify;