import buildClient from '../apis/build-client';

const LandingPage = ({ currentUser }) => {
    return currentUser ?
        (
            <div>You are sign in</div>
        ):
        (
            <div>You are NOT sign in</div>
        );
}

LandingPage.getInitialProps = async context => {
    const { data } = await buildClient(context).get(`/api/users/currentuser`);
    return data;
}

export default LandingPage;
