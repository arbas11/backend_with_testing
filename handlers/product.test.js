const httpMocks = require("node-mocks-http");

const { getProductByID, getAllProduct, updateProduct } = require("./product");

const mockFindOneProduct = jest.fn();
const mockFindAllProduct = jest.fn();
const mockUpdateProduct = jest.fn();

jest.mock("../storage", () => {
    return {
        models: {
            products: {
                findOne: () => mockFindOneProduct(),
                findAll: () => mockFindAllProduct(),
                updateData: () => mockUpdateProduct()
            },
        },
    };
});
beforeEach(() => {
    mockFindOneProduct.mockReset()
    mockUpdateProduct.mockReset()
    mockFindAllProduct.mockReset()
  })
// console.log('ini mock find one setelah jest.fn()', mockFindOneProduct)
// console.log('ini jest.mock.models', jest.mock.models)

//test getproductByID
test("getProductById returns an existing product from merchant", async () => {
    const request = httpMocks.createRequest({
        method: "GET",
        url: "/merchant/1/product/2",
        params: {
            id: 1,
            prodid: 2
        },
    });
    // console.log('ini request setelah httpmocks.createrequest',request)
    const response = httpMocks.createResponse();
    mockFindOneProduct.mockResolvedValue({
        "products" :{
            "id": 1,
            "name": "test1"
     } });
    //  console.log('ini response setelah httpmocks.createrequest',response)
    await getProductByID(request, response);

    expect(response.statusCode).toEqual(200);
    expect(response._getJSONData()).toEqual({
        "products" :{
            "id": 1,
            "name": "test1"
    }});
    })

test("getProductById returns 404 when a product id does not exists", async () => {
    const request = httpMocks.createRequest({
      method: "GET",
      url: "/merchant/2/product/2",
      params: {
        id: 2,
        prodid:2
      },
    });
    const response = httpMocks.createResponse();
   
    mockFindOneProduct.mockResolvedValue(null);
   
    await getProductByID(request, response);
   
    expect(response.statusCode).toEqual(404);
    expect(response._getJSONData()).toEqual({
        item: "Product doesn't exist"
    });
   });
   
   //test getAllProduct
   test("getAllProduct all products from merchant using merchant id", async () => {
    const request = httpMocks.createRequest({
        method: "GET",
        url: "/merchant/1/product",
        params: {
            id: 1,
        },
    });
    const response = httpMocks.createResponse();
    mockFindAllProduct.mockResolvedValue({
        "products" :{
            "id": 1,
            "name": "test1"
     } });

    await getAllProduct(request, response);

    expect(response.statusCode).toEqual(200);
    expect(response._getJSONData()).toEqual({
        "products" :{
            "id": 1,
            "name": "test1"
    }});
    })

test("getAllProduct return 404 when a product id does not exists", async () => {
    const request = httpMocks.createRequest({
      method: "GET",
      url: "/merchant/2/product",
      params: {
        id: 2
      },
    });
    const response = httpMocks.createResponse();
   
    mockFindAllProduct.mockResolvedValue(null);
   
    await getAllProduct(request, response);
   
    expect(response.statusCode).toEqual(404);
    expect(response._getJSONData()).toEqual({
        item: "wrong user id or unauthorized user"
    });
   });

   // testing update product
// test("updateProduct successful", async () => {
//     const req = httpMocks.createRequest({
//         method: "POST",
//         url: "/merchant/:id/product/:prodid",
//         body: {
//             id: 1,
//             name: "test2"
//         },
//     });
//     // console.log('ini request', req)
//     mockUpdateProduct.mockResolvedValue({
//         "products" :{
//             "id": 1,
//             "name": "test1"
//      } });
//     const res = httpMocks.createResponse();
    
//     await updateProduct(req,res)

//     expect(res.statusCode).toEqual(200);
//     expect(res._getJSONData()).toEqual({
//         "instruction": {
//             "status": "sucessfully update"
//         },
//         "product": {
//             "product": [
//                 1
//             ]
//         }
//     });

// });