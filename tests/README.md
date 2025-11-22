 # 1. Test Purpose

The purpose of this test is to validate the main end to end user flow of the application, including user registration, 
automatic login, navigating to the Digital Downloads category, selecting a random product, adding it to the shopping cart, 
and verifying that the correct product appears in the cart.  
This serves as a standard sanity test to ensure the core functionality of the website works properly without issues.

# 2. Preconditions

- The website is available.
- No user is logged in before the test starts.
- A unique email address is generated dynamically on each execution to avoid conflicts with existing accounts.

# 3. Steps to Execute + Expected Results

## Open the website
- **Action:** Navigate to the website.  
- **Expected:** Page title is “Demo Web Shop”.

## Register a new user
- **Action:** Click “Register”.  
- **Expected:** Registration page loads with title “Demo Web Shop. Register”.

## Fill personal details
- Select “Male” checkbox.  
  **Expected:** Checkbox is selected.  
- Fill first name and last name.  
- Fill a dynamically generated email address.

## Fill password fields
- Enter password and confirm password.

## Complete registration
- **Action:** Click “Register”.  
- **Expected:** “Continue” button appears.  
- **Expected:** Message “Your registration completed” is displayed.

## Continue to home page
- **Action:** Click “Continue”.  
- **Expected:** User is redirected to the home page.

## Validate login
- **Expected:** The user’s email appears in the header.

## Navigate to Digital Downloads
- **Action:** Click the first “Digital Downloads” link.  
- **Expected:** Category page loads successfully.

## Select a random product & add to cart
- Locate all available products.  
- Generate a random index.  
- Save product name and price (some products have the same name).  
- Add the product to the cart.  
- **Expected:** A success notification is displayed.

## Validate shopping cart
- Navigate to “Shopping cart”.  
- **Expected:** “Checkout” button is visible.  
- Read product name and price from the first row in the cart.  
- **Expected:**  
  - Product name matches the selected product.  
  - Product price matches the selected product.

## Logout
- **Action:** Click “Log out”.  
- **Expected:** “Log in” link appears, indicating successful logout.

# 4. Post-Conditions

- At the end of the test, the user session is terminated via Logout,  
  ensuring that the automation environment is clean and ready for the next test run.

# 5. Validation Criteria

The test is considered successful if:

- The test can be executed multiple consecutive times without failures, demonstrating stability and reliability.  
- No unexpected errors occur during the workflow.
