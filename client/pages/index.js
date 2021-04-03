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

LandingPage.getInitialProps = async () => {
    if (typeof window === "undefined") {
        // This is called from server
    } else {
        // This is called from browser
    }

    const res = await axios.get(`${AUTH_SERVICE}/api/users/currentuser`);

    return res.data;
}

export default LandingPage;
