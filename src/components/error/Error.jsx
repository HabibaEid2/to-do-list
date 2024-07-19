import { Alert } from "react-bootstrap"
import warningImg from './../../images/warning.png';

export const Error = (props) => {
    return (
       <Alert variant={"danger"}>
            {props.message}
            <img style={{ marginLeft: "5px" }} src={warningImg} alt="warning image" />
        </Alert>
    )
}