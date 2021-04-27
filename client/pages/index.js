const LandingPage = ({ currentUser }) => {
	return currentUser ? (
		<h1>You are sign in</h1>
	) : (
		<h1>You are NOT sign in</h1>
	);
};

LandingPage.getInitialProps = async (context) => {
	return {};
};

export default LandingPage;
