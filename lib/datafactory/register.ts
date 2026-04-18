import { expect, APIRequestContext} from "@playwright/test";

export async function registerUser(request:APIRequestContext,email:string, password:string) {
 
const apiUrl= process.env.API_URL
const response = await request.post(`${apiUrl}/users/register`,{
                data:
                    {
                    first_name:"Ankita",
                    last_name:"Sachan",
                    dob:"2001-03-05",
                    phone:"0212512623",
                    email:email,
                    password:password,
                    address:{
                        street:"kanuka",
                        city:"Auckland",
                        state:"acukland",
                        country:"NZ",
                        postal_code:"0632"
                     }
                    
                }
}
                
)

    expect(response.status()).toBe(201)
    return response.status();
}