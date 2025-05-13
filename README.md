# == Assignment description ==

Create a client-side only rendered Nuxt 3 application that allows people to sign up for a product. The form should contain fields for email and password, which should be required and show an error if no value is entered. The password field should have a way to make the password visible. The user should be able to choose to receive occasional product updates and announcements. Once signed up, they should be presented with a success page.

Please use the Provet Cloud Design System ([https://provetcloud.design/]) appropriately.

Read https://provetcloud.design/web-components/#installation-1 to learn how to use the Provet components in Vue. Please, use TypeScript

---

Looking forward to seeing what you will come up with! Please keep in mind that we're looking for a Senior Frontend Engineer, so the solution should demonstrate such seniority level. Think holistically, outside of the box and do what a Senior would do, you should deliver a concrete solutions that ticks all the boxes, those mentioned in this email and those that you need to think of yourself.

# == TODO ==

## Feature - Login form

    # Username and password
    # Input validation with concise error messages
    # Bruteforce prevention

## Feature - Create account form

    # Username, check availability
    # Password requirements. Atleast 8-12 characters

## Jest or Cypress tests

    == Login ==
    # Should have unclickable "login" button if no credentials are filled in.
    # Should display error on invalid credentials.
    # Should navigate to "create account" on link click.

    == Create account ==
    # Should have unclickable "create account" button if no credentials are filled in.
    # Should require password restrictions such as 8-12 characters minimum.

# == Comments ==

- Using documented slots in <provet-input /> results in error
