import React from "react";
import { ABOUT_US_INFO } from '../appConstants'

const AboutUs = () => {
    return (
        <div className="about-us-container">

            <h3>Description:</h3>
            {ABOUT_US_INFO.ABOUT_US_TEXT}

            <h3 className="mt-4">How to use?</h3>

            {ABOUT_US_INFO.LOGIN_INFO_1}
            <br />
            OR
            <br />
            {ABOUT_US_INFO.LOGIN_INFO_2}
            <br />
            <br />
            Email: {ABOUT_US_INFO.CREDENTIAL}
            <br />
            Password: {ABOUT_US_INFO.CREDENTIAL}

        </div>
    )
}

export default AboutUs;
