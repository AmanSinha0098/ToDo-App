using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using ToDo.DTOModels;
using ToDo.Services.Interface;

namespace ToDo.Controllers
{
    [ApiController]
    [Route("/user")]
    public class AuthController: ControllerBase
    {
        private readonly IConfiguration _config;
        private readonly IUserServices _userServices;
        public AuthController(IConfiguration config, IUserServices userServices)
        {
            _config = config;
            _userServices = userServices;
        }

        [HttpGet("/data")]
        public IActionResult Get()
        {
            var users = _userServices.Get();           
            return Ok(users);
        }

        [HttpPost]
        public IActionResult Login([FromBody] User userLogin)
        {
            User user = AuthenticateUser(userLogin);
            if (user != null)
            {
                var token = GenerateToken(user);
                //var response = new
                //{
                //    name = userLogin.Username,
                //    Token = token,
                //};
                return Ok(token);
            }
            return NotFound("User not found");
        }


        [HttpPost("register")]
        public IActionResult Add([FromBody] User user)
        {

            
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                var users = _userServices.Get().FirstOrDefault(o => o.Username.ToLower() == user.Username.ToLower());
                if (users == null)
                {
                    user.Password = HashPassword(user.Password);
                    _userServices.Add(user);
                    return NoContent();
                }
                else
                {
                    return Conflict("User already exsist");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
        private string GenerateToken(User user)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user!.Id.ToString()!),
            };
            var token = new JwtSecurityToken(
             issuer: _config["Jwt:Issuer"],
             audience: _config["Jwt:Audience"],
             claims: claims,
             expires: DateTime.Now.AddDays(1),
             signingCredentials: credentials);
            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        private User? AuthenticateUser(User userLogin)
        {
            var hashedPassword = HashPassword(userLogin.Password);
            var currentUser = _userServices.Get().FirstOrDefault(o => o.Username.ToLower() == userLogin.Username.ToLower() && o.Password == hashedPassword);
            if (currentUser != null)
            {
                return currentUser;
            }
            return null;
        }

        private string HashPassword(string password)
        {
            using (var sha = SHA256.Create())
            {
                var asBytedArray = Encoding.UTF8.GetBytes(password);
                var hashedPassword = sha.ComputeHash(asBytedArray);
                return Convert.ToBase64String(hashedPassword);
            }
        }

    }
}
