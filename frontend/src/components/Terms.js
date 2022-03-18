import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import MetaData from './layouts/MetaData'

const Terms = () => {


    return (

        <Fragment>

        <MetaData title={'Terms & Conditions'} />

        <img src="../../images/terms.jpg" alt="Terms and Conditions" />

        <div className="container">

            <div className="breadcrumbs">
                <Link to="/">
                    <small>Home</small>
                </Link>
                &nbsp;/&nbsp;                            
                <span>
                    <small>Terms & Conditions</small>
                </span>
            </div>

            <div className="wrapper parent">

                <aside>

                    <h6>Technical Data</h6>
                    <ul>
                        <li>
                            <Link className="link-active" to="/terms">Terms & Conditions</Link>
                        </li>
                        <li>
                            <Link to="/privacy">Privacy Policy</Link>
                        </li>                       
                    </ul>

                </aside>

                <article>

                    <h1>Terms & Conditions</h1>

                   <small>
                   {process.env.REACT_APP_SITE_NAME} owns and operate this website. This document governs your relationship with {process.env.REACT_APP_SITE_NAME} and our website {process.env.REACT_APP_DOMAIN}. Access to and use of this website and the products and services available through this website are subject to the following terms, conditions and notices. By using our services, you are agreeing to all of the terms of service, as may be updated by us from time to time. You should check this page regularly to take notice of any changes we may have made to the terms of service. Access to this website is permitted on a temporary basis, and we reserve the right to withdraw or amend the services without notice. We will not be liable if for any reason this website is unavailable at any time or for any period. From time to time, we may restrict access to some parts or all of this website. This website may contain links to other websites, which are not operated by {process.env.REACT_APP_SITE_NAME}. We, {process.env.REACT_APP_SITE_NAME}, have no control over the linked sites and accept no responsibility for them or for any loss or damage that may arise from your use of them. Your use of any linked sites will be subject to the terms of use and service contained within each such site.
                   </small>
                    <h4>Privacy policy</h4>
                    <small>
                    Our privacy policy, which sets out how we will use your information, can be found at our privacy policy page. By using this website, you consent to the processing described therein and warrant that all data provided by you is accurate.
                    </small>
                    <h4>Prohibitions</h4>
                    <small>
                    You must not misuse this website. You will not: commit or encourage a criminal offense; transmit or distribute a virus, trojan, worm, logic bomb or any other material which is malicious, technologically harmful, in breach of confidence or in any way offensive or obscene; hack into any aspect of the service; corrupt data; cause annoyance to other users; infringe upon the rights of any other person’s proprietary rights; send any unsolicited advertising or promotional material, commonly referred to as “spam”; or attempt to affect the performance or functionality of any computer facilities of or accessed through this website. Breaching this provision would constitute a criminal offense and {process.env.REACT_APP_SITE_NAME} will report any such breach to the relevant law enforcement authorities and disclose your identity to them. We will not be liable for any loss or damage caused by a distributed denial-of-service attack, viruses or other technologically harmful material that may infect your computer equipment, computer programs, data or other proprietary material due to your use of this website or to your downloading of any material posted on it, or on any website linked to it.
                    </small>
                    <h4>Intellectual property, software and content</h4>
                    <small>
                    The intellectual property rights in all software and content (including photographic images) made available to you on or through this website remains the property of {process.env.REACT_APP_SITE_NAME} or its licensors and are protected by copyright laws and treaties around the world. All such rights are reserved by {process.env.REACT_APP_SITE_NAME} and its licensors. You may store, print and display the content supplied solely for your own personal use. You are not permitted to publish, manipulate, distribute or otherwise reproduce, in any format, any of the content or copies of the content supplied to you or which appears on this website nor may you use any such content in connection with any business or commercial enterprise unless you are providing quality resources, blog articles or reviews of {process.env.REACT_APP_SITE_NAME} products and services, to which separate rules apply, that can be found here on our media page.
                    </small>
                    <h4>Terms of sale</h4>
                    <small>
                    By placing an order you are offering to purchase a product on and subject to the following terms and conditions. All orders are subject to availability and confirmation of the order price. Dispatch times may vary according to availability and subject to any delays resulting from postal delays or force majeure for which we will not be responsible. In order to contract with {process.env.REACT_APP_SITE_NAME} you must be over 18 years of age and possess a valid credit or debit card issued by a bank acceptable to us. {process.env.REACT_APP_SITE_NAME} retains the right to refuse any request made by you. If your order is accepted we will inform you by email and we will confirm the identity of the party which you have contracted with. This will usually be {process.env.REACT_APP_SITE_NAME} or may in some cases be a third party. Where a contract is made with a third party {process.env.REACT_APP_SITE_NAME} is not acting as either agent or principal and the contract is made between yourself and that third party and will be subject to the terms of sale which they supply you. When placing an order you undertake that all details you provide to us are true and accurate, that you are an authorized user of the credit or debit card used to place your order and that there are sufficient funds to cover the cost of the goods. The cost of foreign products and services may fluctuate. All prices advertised are subject to such changes.
                    </small>
                    <h4>(a) Our Contract</h4>
                    <small>
                    When you place an order, you will receive an acknowledgement e-mail confirming receipt of your order: this email will only be an acknowledgement and will not constitute acceptance of your order. A contract between us will not be formed until we send you confirmation by e-mail that the goods which you ordered have been dispatched to you. Only those goods listed in the confirmation e-mail sent at the time of dispatch will be included in the contract formed.
                    </small>
                    <h4>(b) Pricing and Availability</h4>
                    <small>
                    Whilst we try and ensure that all details, descriptions and prices which appear on this website are accurate, errors may occur. If we discover an error in the price of any goods which you have ordered we will inform you of this as soon as possible and give you the option of reconfirming your order at the correct price or cancelling it. If we are unable to contact you we will treat the order as cancelled. If you cancel and you have already paid for the goods, you will receive a full refund. Delivery costs will be charged in addition; such additional charges are clearly displayed where applicable and included in the ‘total cost’. This does not apply to coupon codes or special offers you may have missed when making your order!
                    </small>
                    <h4>(c) Payment</h4>
                    <small>
                    Upon receiving your order we carry out a standard authorization check on your payment card to ensure there are sufficient funds to fulfill the transaction. Your card will be debited upon authorisation being received. The monies received upon the debiting of your card shall be treated as a deposit against the value of the goods you wish to purchase. Once the goods have been dispatched and you have been sent a confirmation email the monies paid as a deposit shall be used as consideration for the value of goods you have purchased as listed in the confirmation email.
                    </small>
                    <h4>Disclaimer of liability</h4>
                    <small>
                    The material displayed on this website is provided without any guarantees, conditions or warranties as to its accuracy. Unless expressly stated to the contrary to the fullest extent permitted by law {process.env.REACT_APP_SITE_NAME} and its suppliers, content providers and advertisers hereby expressly exclude all conditions, warranties and other terms which might otherwise be implied by statute, common law or the law of equity and shall not be liable for any damages whatsoever, including but without limitation to any direct, indirect, special, consequential, punitive or incidental damages, or damages for loss of use, profits, data or other intangibles, damage to goodwill or reputation, or the cost of procurement of substitute goods and services, arising out of or related to the use, inability to use, performance or failures of this website or the linked sites and any materials posted thereon, irrespective of whether such damages were foreseeable or arise in contract, tort, equity, restitution, by statute, at common law or otherwise. This does not affect {process.env.REACT_APP_SITE_NAME}‘s liability for death or personal injury arising from its negligence, fraudulent misrepresentation, misrepresentation as to a fundamental matter or any other liability which cannot be excluded or limited under applicable law.
                    </small>
                    <h4>Linking to this website</h4>
                    <small>
                    You may link to our home page, provided you do so in a way that is fair and legal and does not damage our reputation or take advantage of it, but you must not establish a link in such a way as to suggest any form of association, approval or endorsement of your website, products or opinions on our part where none exists. You must not establish a link from any website that is not owned by you. This website must not be framed on any other site. We reserve the right to withdraw linking permission without notice.
                    </small>
                    <h4>Disclaimer as to ownership of trade marks, images of personalities and third party copyright</h4>
                    <small>
                    Except where expressly stated to the contrary all persons (including their names and images), third party trade marks and content, services and/or locations featured on this website are in no way associated, linked or affiliated with {process.env.REACT_APP_SITE_NAME} and you should not rely on the existence of such a connection or affiliation. Any trade marks/names featured on this website are owned by the respective trade mark owners. Where a trade mark or brand name is referred to it is used solely to describe or identify the products and services and is in no way an assertion that such products or services are endorsed by or connected to {process.env.REACT_APP_DOMAIN}.
                    </small>
                    <h4>Indemnity</h4>
                    <small>
                    You agree to indemnify, defend and hold harmless {process.env.REACT_APP_SITE_NAME}, its directors, officers, employees, consultants, agents, and affiliates, from any and all third party claims, liability, damages and/or costs (including, but not limited to, legal fees) arising from your use this website, {process.env.REACT_APP_SITE_NAME} products or recommendations found therein.
                    </small>
                    <h4>Variation</h4>
                    <small>
                    {process.env.REACT_APP_SITE_NAME} shall have the right in its absolute discretion at any time and without notice to amend, remove or vary the Services and/or any page, service or product on this website.
                    </small>
                    <h4>Invalidity</h4>
                    <small>
                    If any part of the terms of service is unenforceable (including any provision in which we exclude our liability to you) the enforceability of any other part of the terms of service will not be affected all other clauses remaining in full force and effect. So far as possible where any clause/sub-clause or part of a clause/sub-clause can be severed to render the remaining part valid, the clause shall be interpreted accordingly. Alternatively, you agree that the clause shall be rectified and interpreted in such a way that closely resembles the original meaning of the clause /sub-clause as is permitted by law.
                    </small>
                    <h4>Complaints</h4>
                    <small>
                    We operate a complaints handling procedure which we will use to try to resolve disputes when they first arise, please let us know if you have any complaints or comments.
                    FEEDBACK @ {process.env.REACT_APP_SITE_NAME}
                    </small>
                    <h4>Waiver</h4>
                    <small>
                    If you breach these conditions and we take no action, we will still be entitled to use our rights and remedies in any other situation where you breach these conditions.
                    </small>
                    <h4>Entire agreement</h4>
                    <small>
                    The above terms of service constitute the entire agreement of the parties and supersede any and all preceding and contemporaneous agreements between you and {process.env.REACT_APP_SITE_NAME}. Any waiver of any provision of the Terms of Service will be effective only if in writing and signed by a Director of {process.env.REACT_APP_SITE_NAME}
                    </small>

                </article>  

            </div>
        </div>

        </Fragment>

    )

}

export default Terms
