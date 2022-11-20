using API.Dto;
using API.Entities;
using API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace API.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly UserManager<User> _user;
        private readonly TokenService _tokenService;
        public AccountController(UserManager<User> user, TokenService tokenService)
        {
            _user = user;
            _tokenService = tokenService;
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto login)
        {
            var user = await _user.FindByNameAsync(login.UserName);
            if(user==null || !await _user.CheckPasswordAsync(user, login.Password))
            {
                return Unauthorized();
            }
            else
            {
                return new UserDto
                {
                    Email = user.Email,
                    Token = await _tokenService.GenerateToken(user)
                };
            }
        }

        [HttpPost("register")]
        public async Task<ActionResult> Register(RegisterDto register)
        {
            var user = new User
            {
                UserName = register.UserName,
                Email = register.Email
            };

            var result = await _user.CreateAsync(user,register.Password);

            if (!result.Succeeded)
            {
                foreach(var error in result.Errors)
                {
                    ModelState.AddModelError(error.Code,error.Description);
                }
                return ValidationProblem();
            }
            else
            {
                await _user.AddToRoleAsync(user,"Member");
                return StatusCode(201);
            }
        }

        [Authorize]
        [HttpGet("currentUser")] 
        public async Task<ActionResult<UserDto>> GetCurrentUser()
        {
            var user = await _user.FindByNameAsync(User.Identity.Name);
            return new UserDto
            {
                Email = user.Email,
                Token = await _tokenService.GenerateToken(user)
            };
        } 
    }
}
