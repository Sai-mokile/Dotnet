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
    try
    {
        // Call the AuthenticateUser method and store the result
        string result = _account.AuthenticateUser(emailOrPhone, password);

        if (result == "Login successful")
        {
            return Ok(result); // HTTP 200 OK
        }
        else
        {
            return Unauthorized(result); // HTTP 401 Unauthorized
        }
    }
    catch (Exception ex)
    {
        // Log the exception (ex) here
        return StatusCode(500, "Internal server error: " + ex.Message); // HTTP 500 Internal Server Error
    }
}

}


}



         
    
 