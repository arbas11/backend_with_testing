const httpMocks = require("node-mocks-http");
const bcrypt = require('bcrypt');

const { getMerchantByid} = require("./merchant");

const mockFindOneMerchant = jest.fn();
jest.mock("../storage", () => {
    return {
        models: {
            merchants: {
                findOne: () => mockFindOneMerchant()
            },
        },
    };
});


// testing getMerchantByid
test("getMerchantByid all data from registered merchant", async () => {
    const request = httpMocks.createRequest({
        method: "GET",
        url: "/merchant/1",
        params: {
            id: 1,
        },
    });
    const response = httpMocks.createResponse();
    mockFindOneMerchant.mockResolvedValue({
        id: "1",
        name: "test1",
    });

    await getMerchantByid(request, response);

    expect(response.statusCode).toEqual(200);
    expect(response._getJSONData()).toEqual({
        id: "1",
        name: "test1",
    });
});
test("getMerchantByid returns 404 for not registered merchant", async () => {
    const request = httpMocks.createRequest({
      method: "GET",
      url: "/merchant/2",
      params: {
        id: 2,
      },
    });
    const response = httpMocks.createResponse();
   
    mockFindOneMerchant.mockResolvedValue(null);
   
    await getMerchantByid(request, response);
   
    expect(response.statusCode).toEqual(404);
    expect(response._getJSONData()).toEqual({
        register: "unsuccessfully",
        item: "something wrong with request"
    });
   });

