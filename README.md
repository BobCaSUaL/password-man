# password-man
A simple password manager

TODO:
 - [x] login form
 - [x] password list as a tree (internal are categories, leaf are password payload)
 - [ ] password should be shown also if required
 - [ ] tree JSON encription with aes.
 - [ ] possibility of choose the encription algoritm from "crypto-js"
 - [ ] possibility to encript categories with different keys

Proposal:
 - [ ] integration with google "2-Step Verification"

The password payload should contains:
 - [ ] the service name (bettere if suggested from a list),
 - [ ] an icon (better if automatic generated),
 - [ ] username and password,
 - [ ] optionally a link (better if autocomputed from the service name)
 - [ ] optionally a security question (better if suggested from a list)
 - [ ] if the security question is specified than a security anskwer is required
