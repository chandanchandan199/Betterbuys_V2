import {Alert} from "react-bootstrap"

const Message  = ({variant,children})=> {
    return(<>
        <Alert variant={variant}>
            {children}
        </Alert>
    </>)
}

Message.defaultProps = {
    variant:"info"
}

// Above line will be sending default props for variant in case if you dont send any while using this component]

export default Message;