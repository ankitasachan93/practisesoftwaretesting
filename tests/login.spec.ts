import {expect, test} from '@playwright/test'
import { LoginPage } from '../lib/pages/loginpage'
import { registerUser } from '../lib/datafactory/register'

test.describe('Login Flow' , () =>{
    let loginpage : LoginPage

    test.beforeEach(async({page})=>{
        loginpage = new LoginPage(page)
        await loginpage.goto();

    })
    test('Login FLow', async({page})=>{
        
        let email = 'customer@practicesoftwaretesting.com'
        let password = 'welcome01'
        await loginpage.login(email,password);
    })

    test('Login with newely registered user', async({page, request})=>{
        const email = `test${Date.now()}@test.com`
        console.log(email)
        const password = 'A@nkita1234512345'
        await registerUser(request, email, password);
        await loginpage.login(email,password);
        expect( page.locator('[data-test="nav-menu"]')).toBe("Ankita Sachan")

    })

    test.describe('Home page with customer01 no auth', () =>{
        test('Search assertion', async({page})=>{
        //Search for Thor Hammer
        await page.goto("https://practicesoftwaretesting.com/");
        await page.locator('[data-test="search-query"]').fill("Thor Hammer");
        await page.locator('[data-test="search-submit"]').click()


        //Check the result in grid(assertion)
        expect( page.locator('h5:has-text("Thor Hammer")'))
    })
                       
    })

    test.describe("Home page with customer01 with auth", () =>{
        test.use({storageState: ".auth/customer01.json"});
        test.beforeEach(async({page})=>{
            await page.goto("https://practicesoftwaretesting.com/");
        })

        test("check the customer01 is signed in", async({page})=>{
            await expect(page.getByTestId("nav-sign-in")).not.toBeVisible(); 

        })
    })

    
})