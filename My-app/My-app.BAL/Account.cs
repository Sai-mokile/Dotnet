using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using Newtonsoft.Json;

namespace My_app.BAL
{
    public class Account
    {
        private readonly IConfiguration _configuration;
        private readonly string _connection;

        public Account(IConfiguration configuration)
        {
            _configuration = configuration;
            _connection = _configuration.GetConnectionString("SaiString");
        }

        public string getData(string userUid)
        {
            string result = "";

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
                            // Convert the DataTable to a JSON string
                            result = JsonConvert.SerializeObject(dt);
                        }
                    }
                }
            }
            // InsertUserAccount
            catch (Exception ex)
            {
                // Handle exceptions here
                result = "Error: " + ex.Message;
            }

            return result;
        }

      public string CreateUserAccount(string UserName, string Email, string Password, string Phone)
{
    string result = "";

    try
    {
        using (SqlConnection conn = new SqlConnection(_connection))
        {
            using (SqlCommand cmd = new SqlCommand("InsertUserAccount", conn))
            {
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@UserName", UserName);
                cmd.Parameters.AddWithValue("@Email", Email);
                cmd.Parameters.AddWithValue("@Password", Password);
                cmd.Parameters.AddWithValue("@Phone", Phone);

                conn.Open();
                int rowsAffected = cmd.ExecuteNonQuery();

                if (rowsAffected > 0)
                {
                    result = "Account created successfully";
                }
                else
                {
                    result = "Failed to create account";
                }
            }
        }
    }
    catch (Exception ex)
    {
        result = "Error: " + ex.Message;
    }

    return result;
}
    }

    
}