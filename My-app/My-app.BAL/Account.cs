using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using Newtonsoft.Json;
using My_app.DAL;

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

public Users AuthenticateUser(string emailOrPhone, string password)
{
    Users obj = new Users();

    try
    {
        using (SqlConnection conn = new SqlConnection(_connection))
        {
            using (SqlCommand cmd = new SqlCommand("AuthenticateUser", conn))
            {
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@EmailOrPhone", emailOrPhone);
                cmd.Parameters.AddWithValue("@Password", password);

                conn.Open();

                using (SqlDataReader reader = cmd.ExecuteReader())
                {
                    if (reader.HasRows)
                    {
                        while (reader.Read())
                        {
                           obj.Code = reader.IsDBNull(reader.GetOrdinal("Code")) ? 0 : reader.GetInt32(reader.GetOrdinal("Code"));
                           obj.Email = reader.IsDBNull(reader.GetOrdinal("Email")) ? string.Empty : reader.GetString(reader.GetOrdinal("Email"));
                           obj.UserName = reader.IsDBNull(reader.GetOrdinal("UserName")) ? string.Empty : reader.GetString(reader.GetOrdinal("UserName"));
                           obj.Phone = reader.IsDBNull(reader.GetOrdinal("Phone")) ? string.Empty : reader.GetString(reader.GetOrdinal("Phone"));
                            // obj.Message = reader.IsDBNull(reader.GetOrdinal("Message")) ? string.Empty : reader.GetString(reader.GetOrdinal("Message"));
                            
                           
                        }
                    }
                    else
                    {
                        obj.Code = 1; // Set custom error code for invalid credentials
                        obj.Message = "Invalid email/phone or password";
                    }
                }
            }
        }
    }
    catch (Exception ex)
    {
        obj.Code =1; // Set error code for exception
        obj.Message = "Error: " + ex.Message;
    }

    return obj;
}


    }
    

    
}