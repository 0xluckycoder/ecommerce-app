## Online Shopping App

I'm building full stack ecommerce app for my portfolio. this project is still under development.

## Features

- Payment integration
- Guest users purchase products without login (they hv to enter all the details)
- Users can create accounts so they dont have to enter all the details when purchasing a product
- Admin Dashboard
  - statistics about sales and users
  - google analytics integration

### Todo

There is more todo i'll add those later.

FrontEnd

- [x] - Design the app state
- [x] - Auth state
- [x] - Cart state
- [x] - auth actions with API
- [x] - product showcase
- [x] - Login / Register UI Components
- [ ] - Save Cart Items in Local Storage
- [ ] - Login Register Errors (Bootstrap alert)
- [ ] - User Profile UI
- [ ] - Static admin profile UI
- [ ] - Admin product Upload Form UI
- [ ] - Search Suggestions UI

Backend

- [ ] - GET request to Search products

- [ ] - POST request to register users
    - [ ] - validate fields with Joi
    - [ ] - hash password and generate accessToken

- [ ] - GET request to get single user (user profile)
    [ ] - generate a new accessTokens

- [ ] - POST request to upload products (Admin Role)
    - [ ] - validate fields with Joi
    - [ ] - cut images with sharp library