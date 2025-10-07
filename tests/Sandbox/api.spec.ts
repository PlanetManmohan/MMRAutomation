import { test, expect } from "@playwright/test"


// https://playwright.dev/docs/api/class-apirequestcontext
test('API GET test', async ({request}) => {

    const apiURL = "https://api.practicesoftwaretesting.com";
    const response = await request.get(apiURL + "/products");
    expect(response.status()).toBe(200);

    const body=await response.json();
    expect(body.data.length).toBe(9);
    //expect(body.data.total).toBe(50);
});

test('API POST test', async ({request}) => {

    const apiURL = "https://api.practicesoftwaretesting.com";
    const response = await request.post(apiURL + "/users/login", {
        data:{
            email:"customer@practicesoftwaretesting.com",
            password:"welcome01"
        },
    });
    expect(response.status()).toBe(200);

    
    const body=await response.json();
    expect(body.access_token).toBeTruthy();
    //expect(body.data.total).toBe(50);
});