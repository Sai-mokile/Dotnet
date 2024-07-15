using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Data;
using System.Data.SqlClient;
using Newtonsoft.Json;
using My_app.BAL;



namespace My_app.Controllers{
[ApiController]
 [Route("api/[controller]")]

public class AccountController : Controller
{

 private readonly Account _account;
    public AccountController(IConfiguration configuration)
{
    _account = new Account(configuration); // Ensure 'configuration' is not null
}

[Route("getdata")]
    public JsonResult GetData()
    {

 var userUid = "";
        var read = _account.getData(userUid);
        var json = JsonConvert.SerializeObject(read);

        return Json(json);
    }
    
}
}



         
    
 