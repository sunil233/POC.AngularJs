using AngularJsWorkShop.ViewModels;
using System.Collections.Generic;
using System.Web.Http;

public class ProductsController : ApiController
{
    // GET api/<controller>

    [HttpGet]
    public List<Products> GetProducts()
    {
        var listProducts = new List<Products>()
           {
               new Products(){ ProductId="1",ProductName="Books", ProductCode="B001",Price=21.00m,Quantity=12,Description="This product is for Books"},
               new Products(){ ProductId="2",ProductName="Computer",ProductCode="C002",Price=300.00m,Quantity=5,Description="This product is for Computer"},
               new Products(){ ProductId="3",ProductName="Mobiles",ProductCode="M003",Price=200.00m,Quantity=6,Description="This product is for Mobiles"},
               new Products(){ ProductId="4",ProductName="Camera & Photo",ProductCode="P004",Price=460.00m,Quantity=4,Description="This product is for Camera & Photo"}
           };
        return listProducts;
    }

    /// <summary>
    /// Method to Save products
    /// </summary>
    /// <param name="products"></param>
    [HttpPost]
    public void SaveProducts(List<Products> products)
    {
        var myproducts = products;
        //TO DO:
    }
}