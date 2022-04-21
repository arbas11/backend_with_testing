const httpMocks = require("node-mocks-http");
const request = require('supertest');
const app = require('../app')
const { models } = require('../storage')


const { getMerchantByid, registerMerchant } = require("./merchant");

const mockFindOneMerchant = jest.fn();
const mockCreateMerchant = jest.fn();

beforeEach(() => {
    mockFindOneMerchant.mockReset()
  })

jest.mock("../storage", () => {
    return {
        models: {
            merchants:
            {
                findOne: () => mockFindOneMerchant(),
                createOne: ()=>mockCreateMerchant()
            }

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

test("testing register merchant return status 200", async () =>{
    const response = await request(app).post("/merchant/register").send({
        "id" : "test5",
        "user_name" : "toko5",
        "user_password" : "password",
        "address" : "jalan no 5",
        "phone_num" : "08555555555"
    })

    console.log(response)

    expect(response.statusCode).toBe(200);
});
// test("registerMerchant", async () => {
//     const request = httpMocks.createRequest({
//         method: "POST",
//         url: "/merchant/register",
//         body: {
//             id: "test1",
//             user_name: "toko1",
//             user_password: "password",
//             address: "jalan no 1",
//             phone_num: "081111111111111"
//         },
//     });
//     mockCreateMerchant.mockResolvedValue(
//         {
//             id: "test1",
//             user_name: "toko1",
//             user_password: "password",
//             address: "jalan no 1",
//             phone_num: "081111111111111"
//         }
//     )
//     const response = httpMocks.createResponse();

//     await registerMerchant(request, response);

//     expect(response.statusCode).toEqual(200);
//     expect(response._getJSONData()).toEqual({
//         register: "successfully",
//         acsess: "/merchant/:id/product",
//         register: "successfully",
//         acsess: "/merchant/:id/product",
//         id : request.body.id,
//         user_name : request.body.user_name,
//         address : request.body.address,
//         phone_num : request.body.phone_num,
//         })
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
   
