using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Data;
using System.Data.SqlClient;
using Newtonsoft.Json;



namespace My_app.Controllers{
[ApiController]
 [Route("api/[controller]")]

public class AccountController : Controller
{
    private readonly IConfiguration _configuration;
    private readonly string _connection;

    public AccountController(IConfiguration configuration)
    {
        _configuration = configuration;
        _connection = _configuration.GetConnectionString("SaiString");
    }

[Route("getdata")]
    public JsonResult GetData()
    {
         var userUid = "";
        string read = "";
        List<DataTable> dtList = new List<DataTable>();

        try
        {
            using (SqlConnection conn = new SqlConnection(_connection))
            {
                using (SqlCommand cmd = new SqlCommand("sp_NewlyAddedProjects", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@UserUid", userUid);

                    conn.Open();
                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        DataTable dt = new DataTable();
                        dt.Load(reader);
                        dtList.Add(dt);

                        // Convert the DataTable to a JSON string (you can customize this as needed)
                        read = JsonConvert.SerializeObject(dt);
                    }
                }
            }
        }
        catch (Exception ex)
        {
            // Handle exceptions here
            read = "Error: " + ex.Message;
        }

        return Json(read);
    }
}
}



         
    
 