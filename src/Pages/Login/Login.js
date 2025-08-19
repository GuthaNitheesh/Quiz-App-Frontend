import { AuthLogin, Navbar } from "../../components/index";


export const Login=()=>{
    return(
        <>
        <Navbar route="login"></Navbar>
        <AuthLogin></AuthLogin>
        </>
    )
}