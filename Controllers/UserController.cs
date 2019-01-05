using AngularJsWorkShop.ViewModels;
using System.Web.Http;

namespace AngularJSWorkShopApplication.Controllers
{
    public class UserController : ApiController
    {
        [HttpPost]
        public IHttpActionResult SaveUser(UserDetails userdetails)
        {
            return Ok(true);
        }

        [HttpGet]
        public IHttpActionResult Login(string username,string password)
        {
            return Ok(true);
        }
    }
}

