import { Link } from "react-router-dom"

function ErrorPage() {
    return (
        <>
        <h1>Error Occured</h1>
        <Link to="/">Click here to go back home</Link>
        </>
    )
}

export default ErrorPage;