import { test, expect,APIRequestContext } from "@playwright/test";

test("GET/Product",async({request})=>{

    const apiUrl = "https://api.practicesoftwaretesting.com"
    const response = await request.get(`${apiUrl}/products`);

    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.data.length).toBe(9);
    expect(body.total).toBe(50);
    

})

test('Post/User/login', async({request})=>{

    const payload = {email: "customer@practicesoftwaretesting.com", password: "welcome01"}
    const response = await request.post("https://api.practicesoftwaretesting.com/users/login", {
        data: payload
    });


    const body = await response.json()
    expect(response.status()).toBe(200);
    expect(body.access_token).toBeTruthy();

})

