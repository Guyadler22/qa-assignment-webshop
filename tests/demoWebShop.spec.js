import { test, expect } from '@playwright/test';
import {variables } from './variables.js';

test.describe('Registration and cart',  () => {

    test('Registration and add products', async ({page}) => {

        const password = "123456";
        const email = `user_${Date.now()}@gmail.com`;
        let selectedProductName;
        let selectedProductPrice;

        await test.step('Open website', async () => {
            await page.goto('https://demowebshop.tricentis.com');
            await expect(page).toHaveTitle('Demo Web Shop');
        });

        await test.step('Register new user', async () => {
            await page.locator(variables.form.register).getByText("Register").click();
            await expect(page).toHaveTitle('Demo Web Shop. Register');
        });

        await test.step('Fill personal details', async () => {
            await page.locator(variables.form.genderMale).click();
            await expect(page.locator(variables.form.genderMale)).toBeChecked();
            await page.locator(variables.form.firstName).fill("11");
            await page.locator(variables.form.lastName).fill("22");
            await page.locator(".inputs").getByLabel("email:").fill(email);
        });

        await test.step('Fill password fields', async () => {
            await page.locator(variables.form.password).fill(password);
            await page.locator(variables.form.confirmPassword).fill(password);
        });

        await test.step('Click on register again', async () => {
            await expect(page.locator(variables.form.registerButton)).toBeVisible();
            await page.locator(variables.form.registerButton).click();
            await expect(page.locator(variables.form.registrationResult)).toHaveText('Your registration completed');
        });

        await test.step('Click continue', async () => {
            await page.locator('input[type="button"][value="Continue"]').click();
        });

        await test.step('Validate email in header', async () => {
            await expect(page.locator("a.account").filter({hasText: email})).toHaveText(email);
        });

        await test.step('Click on digital downloads', async () => {
            await page.getByRole('link', {name:'digital downloads'}).first().click();
        });

        await test.step('Add to cart random product', async () => {
            const products = page.locator(variables.shoppingCart.productItem);
            const count = await products.count();

            const randomIndex = Math.floor(Math.random() * count);
            const randomProduct = products.nth(randomIndex);

            selectedProductName = await randomProduct.locator(variables.shoppingCart.itemTitle).innerText();
            selectedProductPrice = await randomProduct.locator('.prices').innerText();


            await randomProduct.getByRole('button', {name: 'Add to cart'}).click();
            await expect(page.locator(variables.shoppingCart.notificationBar)).toBeVisible()
        });

        await test.step('Click on Shopping cart', async () => {
            await page.locator(".cart-label").getByText('Shopping cart').click();
            await expect(page.getByRole('button',{name: 'checkout'})).toBeVisible();
        });

        await test.step('Validate product in cart', async () => {
            const cartRow = page.locator(variables.shoppingCart.cartRow).first();

            const cartProductName = await cartRow.locator('a.product-name').innerText();
            const cartProductPrice = await cartRow.locator('.product-unit-price').innerText();

            expect(cartProductName).toBe(selectedProductName);
            expect(cartProductPrice).toBe(selectedProductPrice);
        });

        await test.step('Logout', async () => {
            await page.locator(".ico-logout").getByText("Log out").click();
            await expect(page.locator(".ico-login").filter({hasText: "Log in"})).toBeVisible();
        });
    });
});
