using API.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace API.Services
{
    public class TokenService
    {
        private readonly UserManager<User> _userMgr;
        private readonly IConfiguration _configuration;
        public TokenService(UserManager<User> userMgr, IConfiguration configuration)
        {
            _userMgr = userMgr;
            _configuration = configuration;
        }

        public async Task<string> GenerateToken(User user)
        {
            //Generate Claims
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Email,user.Email),
                new Claim(ClaimTypes.Name, user.UserName)
            };

            var roles = await _userMgr.GetRolesAsync(user);
            foreach(var role in roles)
            {
                claims.Add(new Claim(ClaimTypes.Role,role));
            }

            //Generate Key
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWTSettings:TokenKey"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512);

            var tokenOptions = new JwtSecurityToken(
                issuer:null,
                audience:null,
                claims:claims,
                expires:System.DateTime.Now.AddDays(10),
                signingCredentials:creds);

            return new JwtSecurityTokenHandler().WriteToken(tokenOptions);
        }


    }
}
