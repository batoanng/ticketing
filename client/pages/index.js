import axios from 'axios';
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();
const AUTH_SERVICE = publicRuntimeConfig.REACT_APP_AUTH_SERVICE ? publicRuntimeConfig.REACT_APP_AUTH_SERVICE : '';

const LandingPage = ({ currentUser }) => {
    console.log(currentUser)
    return (
        <div className='container'>
            haha
        </div>
    );
}

LandingPage.getInitialProps = async ({req}) => {
    if (typeof window === "undefined") {
        // This is called from server, which is inside a pod
        // Need to call to another namespace
        const { data } = await axios.get(
            `http://ingress-nginx.ingress-nginx.svc.cluster.local/api/users/currentuser`,
            {
                // Define the host to go to correct server and get the cookie
                headers: req.headers
            }
        );
        return data;
    } else {
        // This is called from browser
        const { data } = await axios.get(`/api/users/currentuser`);
        return data
    }
}

export default LandingPage;
