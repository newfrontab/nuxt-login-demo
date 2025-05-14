# == Assignment description ==

Create a client-side only rendered Nuxt 3 application that allows people to sign up for a product. The form should contain fields for email and password, which should be required and show an error if no value is entered. The password field should have a way to make the password visible. The user should be able to choose to receive occasional product updates and announcements. Once signed up, they should be presented with a success page.

Please use the Provet Cloud Design System ([https://provetcloud.design/]) appropriately.

Read https://provetcloud.design/web-components/#installation-1 to learn how to use the Provet components in Vue. Please, use TypeScript

---

Looking forward to seeing what you will come up with! Please keep in mind that we're looking for a Senior Frontend Engineer, so the solution should demonstrate such seniority level. Think holistically, outside of the box and do what a Senior would do, you should deliver a concrete solutions that ticks all the boxes, those mentioned in this email and those that you need to think of yourself.

# == Comments ==

## In this project I've completed

    == Feature Sign flow ==
    # Added a Sign in flow using email and password.
        # Includes an SSO flow using a Google provider.
    # Added a Sign up flow with a success page.
    # Designed the above mentioned flows using "Provet Cloud" framework.
    # Sign in Session management. Users are remembered once they sinced in.
        # Configuring life span of user credentials where skipped. Just took them as they came with Firebase SDK.

    == Firebase API ==
    # Connected frontend application to Firebase API. It reduces a lot of scope for the task, considering I wanted to build something real instead of faking async API calls.

### Obstructions of the task

    # Slots in <provet-input/> doesn't work when using as instructed in the documentation, resulting in a suboptimal solution.

## Further improvements - I'm skipping this because it's too much of a time investment for a potential interview

    == High priority ==
    # Add a "confirm identity" email. User gets an email with a clickable link which confirms their identity and logs them into the site.
    # E2E and unit testing. Sign up/in processes are usually critical to businesses and worth confirming they work.  
    # Complement with tooltips further explaining the checkboxes and what they mean to the user.
    # More frontend safety measures.
        # Honey pots
        # Google captcha
        # Brute force / spam prevention / Timeout on X tries

    == Minor==
    # More SSO methods such as Facebook, X (formely Twitter), Microsoft etc.
    # Connecting the occasional product email functionality for real.
