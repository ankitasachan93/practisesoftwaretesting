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
        await expect(page.getByTestId("nav-menu")).toContainText("Ankita Sachan");

    })                          


    test.describe('Home page search for Thor Hammer', () =>{
        test('Search assertion', async({page})=>{
            
            await page.goto("https://practicesoftwaretesting.com/")
            
            const productGrid = page.locator(".col-md-9");
            await page.getByTestId("search-query").fill("Thor Hammer");
            await page.getByTestId("search-submit").click();
            await expect(productGrid.getByRole("link")).toHaveCount(7);
            await expect(page.getByAltText("Thor Hammer")).toBeVisible();
    })
                       
    })

    test.describe("Navigating to landing page", () =>{

        test("visual Test ", async({page})=>{
            await page.waitForLoadState("networkidle")
            await expect(page).toHaveScreenshot("Home-page-no-auth.png") //screenshot block
        })

        test("Login with no auth", async({page})=>{
            await page.goto("https://practicesoftwaretesting.com/")
        });

    })

    test.describe("Home page with customer01 with auth", () =>{
        test.use({storageState: ".auth/customer01.json"});
        test.beforeEach(async({page})=>{

            await page.goto("https://practicesoftwaretesting.com/");
            
        })
        test("visual Test ", async({page})=>{
            await page.waitForLoadState("networkidle")
            await expect(page).toHaveScreenshot("Home-page-auth.png") //screenshot block
        })

        test("check the customer01 is signed in", async({page})=>{
            await expect(page.getByTestId("nav-sign-in")).not.toBeVisible(); 
            await expect(page.getByTestId("nav-menu")).toContainText("Jane Doe");

        })
    })

    
})