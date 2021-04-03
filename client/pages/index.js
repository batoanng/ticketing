import buildClient from '../apis/build-client';

const LandingPage = ({ currentUser }) => {
    return
        currentUser ? (<h1>You are sign in</h1>): (<h1>You are NOT sign in</h1>)
    ;
}

LandingPage.getInitialProps = async context => {
    const { data } = buildClient(context).get(`/api/users/currentuser`);
    return data;
}

export default LandingPage;
