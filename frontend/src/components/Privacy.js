import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import MetaData from './layouts/MetaData'

const Privacy = () => {


    return (

        <Fragment>

            <MetaData title={'Privacy Policy'} />

            <img src="../../images/privacy.jpg" alt="Terms and Conditions" />

            <div className="container">

                <div className="breadcrumbs">
                    <Link to="/">
                        <small>Home</small>
                    </Link>
                    &nbsp;/&nbsp;                            
                    <span>
                        <small>Privacy Policy</small>
                    </span>
                </div>

                <div className="wrapper parent">

                    <aside>

                        <h6>Technical Data</h6>
                        <ul>
                            <li>
                                <Link to="/terms">Terms & Conditions</Link>
                            </li>
                            <li>
                                <Link className="link-active" to="/privacy">Privacy Policy</Link>
                            </li>                            
                        </ul>

                    </aside>

                    <article>

                        <h1>Privacy Policy</h1>

                        <small>
                        {process.env.REACT_APP_SITE_NAME} operates {process.env.REACT_APP_DOMAIN}. This page informs you of our policies regarding the collection, use and disclosure of Personal Information we receive from users of the Site. We use your Personal Information only for providing and improving this web site and our customer service. By using this site, you agree to the collection and use of information in accordance with this policy.
                        </small>
                        <h4>Information collection and use</h4>
                        <small>
                        While using our web site, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you. Personally identifiable information may include, but is not limited to your name, email address or shipping location.
                        </small>
                        <h4>Log data</h4>
                        <small>
                        Like many site operators, we collect information that your browser sends whenever you visit our web site. This Log Data may include information such as your computer’s Internet Protocol (“IP”) address, browser type, browser version, the pages of our Site that you visit, the time and date of your visit, the time spent on those pages and other statistics. In addition, we may use third party services such as Google Analytics that collect, monitor and analyze this information.
                        </small>
                        <h4>Communications</h4>
                        <small>
                        We may use your Personal Information to contact you with special offers, newsletters, marketing or promotional materials and other information if you have made a purchase from us. We will never ask you for your password or credit card details via email, if anyone claiming to be a representative of {process.env.REACT_APP_SITE_NAME} contacts you directly, do not disclose your personal information to them.
                        </small>
                        <h4>Cookies</h4>
                        <small>
                        Cookies are files with small amount of data, which may include an anonymous unique identifier. Cookies are sent to your browser from a web site and stored on your computer’s hard drive. Like many sites, we use “cookies” to collect information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Site.
                        </small>
                        <h4>Pixels</h4>
                        <small>
                        Facebook Pixel: Conversion tracking helps us measure return on investment of our Facebook ads by reporting on the actions people take after viewing them. We create pixels to help us better market our products to interested parties. No personal information is contained in or collected by cookies or pixels used on this website.
                        </small>
                        <h4>Security</h4>
                        <small>
                        The security of your Personal Information is important to us, but remember that no method of transmission over the Internet, or method of electronic storage, is 100% secure. While we strive to use commercially acceptable means to protect your Personal Information, we cannot guarantee its absolute security. We do not store Credit Card information on our website. Any purchase information pertaining to payment details is stored via our secure payment gateway providers, which include Paypal
                        </small>
                        <h4>Changes to this privacy policy</h4>
                        <small>
                        This Privacy Policy is effective as of 21/01/2020 and will remain in effect except with respect to any changes in its provisions in the future, which will be in effect immediately after being posted on this page. We reserve the right to update or change our Privacy Policy at any time and you should check this Privacy Policy periodically. Your continued use of the Service after we post any modifications to the Privacy Policy on this page will constitute your acknowledgment of the modifications and your consent to abide and be bound by the modified Privacy Policy. If we make any material changes to this Privacy Policy, we will notify you either through the email address you have provided us, or by placing a prominent notice on our website.
                        </small>

                    </article>  

                </div>
            </div>
        </Fragment>
        
    )
}

export default Privacy
