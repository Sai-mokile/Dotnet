using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Data;
using System.Data.SqlClient;
using Newtonsoft.Json;
using My_app.BAL;
using Microsoft.AspNetCore.Http;



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
   [Route("signup")]
[HttpPost]
public string SignUp(IFormCollection frmcl)
{
    string email = frmcl["Email"];
    string name = frmcl["name"];
    string phone = frmcl["phone"];
    string password = frmcl["password"];
    
    // Call the CreateUserAccount method and store the result
    string res = _account.CreateUserAccount(name, email, password, phone);

    // Return the result
    return res;
}
    [Route("login")]
[HttpGet]
public IActionResult Login(string emailOrPhone, string password)
{
    var result = _account.AuthenticateUser(emailOrPhone, password);

    if (result.Code == 1)
    {
        HttpContext.Session.SetString("Email", result.Email);
        HttpContext.Session.SetString("UserName", result.UserName);
        // HttpContext.Session.SetBoolean("Auth", true); // Corrected method name to SetBoolean
        HttpContext.Session.SetString("Phone", result.Phone);
result.Message = "Looged in successfully";

    }

    return Ok(result);
}


}
}



         
    
 