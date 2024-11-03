import { toast } from "react-toastify";

//to get random id
window.getRandomId =()=> Math.random().toString(36).slice(2);

// Email Validator function using regex
window.IsEmail = email =>  /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email) 

//React Toastifi message

window.toastify = (msg, type) => {
    switch (type) {
        case "success":
            return toast.success(msg);
        case "error":
            return toast.error(msg);
        case "warning":
            return toast.warning(msg);
        case "info":
            return toast.info(msg);

        default:
            return toast(msg)
    }
}



// Create message by using antd message
// import { message } from "antd"

// window.tostify = (msg, type) => {
//     switch (type) {
//         case "success":
//             return message.success(msg)
//         case "error":
//             return message.error(msg)
//         default:
//             return message.info("default message")

//     }
// }
