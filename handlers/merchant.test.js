const httpMocks = require("node-mocks-http");

const { getMerchantByid } = require("./merchant");

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
    
    // console.log('ini jest.mock', jest.mock())
    mockFindOneMerchant.mockResolvedValue(null);
   
    await getMerchantByid(request, response);
   
    expect(response.statusCode).toEqual(404);
    expect(response._getJSONData()).toEqual({
        register: "unsuccessfully",
        item: "something wrong with request"
    });
   });

//  // testing registerMerchant
// test("registerMerchant", async () => {
//     const request = httpMocks.createRequest({
//         method: "POST",
//         url: "/merchant/register",
//         body: {
//             id: "ario",
//             user_password: "password"
//         },
//     });
//     const { user_password } = request.body;
//     const hash = await bcrypt.hash(user_password, 10);
//     const response = httpMocks.createResponse();
//     console.log(response)
//     await registerMerchant(request, response);
//     mockCreateMerchant.mockReturnValue(
//         {
//             merchants: {
//             id: "ario",
//             user_password: hash
//              }
//         }      
//     );
//     console.log(mockCreateMerchant.mockReturnValue.merchants)
//     expect(response.statusCode).toEqual(200);
//     expect(response._getJSONData()).toEqual({
//         register: "successfully",
//         acsess: "/merchant/:id/product",
//         item: {
//             name: "ario",
//             password: hash
//         }
//     });
// });


// // test("registerMerchant returns 400 for bad request", async () => {
// //     const request = httpMocks.createRequest({
// //       method: "POST",
// //       url: "/merchant/register",
// //       body: {
// //         name: "ario",
// //         user_password: "password"
// //       },
// //     });
// //     const { user_password } = request.body;
// //     const hash = await bcrypt.hash(user_password, 10);
// //     const response = httpMocks.createResponse();
   
// //     mockCreateMerchant.mockResolvedValue(null);
   
// //     await registerMerchant(request, response);
   
// //     expect(response.statusCode).toEqual(404);
// //     expect(response._getData()).toEqual('data and salt arguments required');
// //    });
   
