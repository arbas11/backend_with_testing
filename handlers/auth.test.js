const httpMocks = require("node-mocks-http");

//ini models dari auth { merchants: merchants, products: products }
const hasilmodels = [
    {
        "id": "arbas",
        "user_password": "$2b$10$TrhJJ9bwJeA4Oj52tVH0aOEEz19Gjn8hgwhWCcX6aoVFAtl8.iE5K",
        "user_name": "tokoku",
        "address": "jalanin aja dulu",
        "phone_num": "0811167540",
        "createdAt": "2022-02-26T11:34:48.000Z",
        "updatedAt": "2022-02-26T11:34:48.000Z"
    },
    {
        "id": "test1",
        "user_password": "$2b$10$WPYlddDv3vCk5tWa4fX3T.hkOqaSP4X3ATyllGtCOsH2yT.JzoL7K",
        "user_name": "toko1",
        "address": "jalan no 1",
        "phone_num": "11111111111",
        "createdAt": "2022-02-26T12:03:31.000Z",
        "updatedAt": "2022-02-26T12:03:31.000Z"
    },
    {
        "id": "test2",
        "user_password": "$2b$10$aMlSHtXy27b1Wb5G7HUMTeBrGTeiX1StrDxInKk/ruqF5R9lXXUDq",
        "user_name": "toko2",
        "address": "jalan no 2",
        "phone_num": "22222222222",
        "createdAt": "2022-02-26T13:39:09.000Z",
        "updatedAt": "2022-02-26T13:39:09.000Z"
    }
]
const { login } = require("./auth");

const mockFindOne = jest.fn();
jest.mock("../storage", () => {
    return {
        models: {
            merchants: {
                findOne: ()=>mockFindOne()
            }
        },
    }
});

// testing getMerchantByid
test("login successful", async () => {
    const req = httpMocks.createRequest({
        method: "POST",
        url: "/merchant/login",
        body: {
            id: "arbas",
            password: "password"
        },
    });
    mockFindOne.mockResolvedValue(
        {
            "id": "arbas",
            "user_password": "$2b$10$TrhJJ9bwJeA4Oj52tVH0aOEEz19Gjn8hgwhWCcX6aoVFAtl8.iE5K"
        }
    )
    const res = httpMocks.createResponse();
    res.cookie(()=>res.cookie('uid', id))
    await login(req,res)
    const { id } = req.body
    expect(res.statusCode).toEqual(200);
    expect(res._getJSONData()).toEqual({
            login: "successfully",
            acsess: "/merchant/:id/product",
            id: id
            });

});
test("login failed not valid request", async () => {
    const req = httpMocks.createRequest({
        method: "POST",
        url: "/merchant/login",
        body: {
            id: "arbas"
        },
    });
    mockFindOne.mockResolvedValue(
        {
            "id": "arbas",
            "user_password": "$2b$10$TrhJJ9bwJeA4Oj52tVH0aOEEz19Gjn8hgwhWCcX6aoVFAtl8.iE5K",
        }
    )
    const res = httpMocks.createResponse();
    res.cookie(()=>res.cookie('uid', id))
    const { id, password } = req.body
    await login(req,res)
    expect(res._getJSONData()).toEqual({ error: "something wrong with the request" });
    expect(res.statusCode).toEqual(400);
});
test("login failed wrong id or password", async () => {
    const req = httpMocks.createRequest({
        method: "POST",
        url: "/merchant/login",
        body: {
            id: "arbas",
            password:"pass"
        },
    });
    mockFindOne.mockResolvedValue(
        {
            "id": "arbas",
            "user_password": "$2b$10$TrhJJ9bwJeA4Oj52tVH0aOEEz19Gjn8hgwhWCcX6aoVFAtl8.iE5K",
        }
    )
    const res = httpMocks.createResponse();
    res.cookie(()=>res.cookie('uid', id))
    const { id, password } = req.body
    await login(req,res)
    expect(res._getJSONData()).toEqual({ error: "wrong id or password try again" });
    expect(res.statusCode).toEqual(400);
});