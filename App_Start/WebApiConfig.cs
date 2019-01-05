using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web.Http;
using Newtonsoft.Json.Serialization;
using System.Web.Http.Routing;
using System.Net.Http.Headers;

namespace AngularJSWorkShopApplication
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            config.Routes.MapHttpRoute(
                "DefaultApiWithId",
                "api/{controller}/{id}",
                new { id = RouteParameter.Optional },
                new { id = @"\d+" }
            );

            config.Routes.MapHttpRoute(
                "DefaultWithAction",
                "api/{controller}/{action}"
            );

            config.Routes.MapHttpRoute(
                "DefaultApiGet",
                "api/{controller}",
                new { action = "Get" },
                new { httpMethod = new HttpMethodConstraint(HttpMethod.Get) }
            );

            config.Routes.MapHttpRoute(
                "DefaultApiPost",
                "api/{controller}",
                new { action = "Post" },
                new { httpMethod = new HttpMethodConstraint(HttpMethod.Post) }
            );

            config.Routes.MapHttpRoute(
                "DefaultApiPut",
                "api/{controller}",
                new { action = "Put" },
                new { httpMethod = new HttpMethodConstraint(HttpMethod.Put) }
            );

            config.Routes.MapHttpRoute(
                "DefaultApiDelete",
                "api/{controller}",
                new { action = "Delete" },
                new { httpMethod = new HttpMethodConstraint(HttpMethod.Delete) }
            );
            //Sets default to JsonFormatter
            config.Formatters.JsonFormatter.SupportedMediaTypes.Add(new MediaTypeHeaderValue("text/html"));
        }
    }
}
