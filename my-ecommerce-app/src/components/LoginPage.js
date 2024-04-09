import React, { useState } from 'react';
import Header from "./Header.js";
import LoginForm from "./LoginForm.js";
import SignupForm from "./SignupForm.js";
import Footer from "./Footer.js";

const Loginpage = () => {
    const [showLogin, setShowLogin] = useState(true);

    const switchForm = () => {
        setShowLogin(!showLogin);
    };

	return (
		<div>
			<Header />
			{showLogin ? ( 
                <LoginForm switchToSignupForm={switchForm} />
            ) : (
                <SignupForm switchToLoginForm={switchForm} />
            )}
			<Footer />
		</div>
	);
}

export default Loginpage;
