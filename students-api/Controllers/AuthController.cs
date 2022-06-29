#nullable disable
using students_api.Models;
using students_api.Context;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using students_api.Services;

 
namespace students_api.Controllers;


[Route("api/[controller]")]
[ApiController]
public class AuthController : ControllerBase
{
    private readonly AppDbContext _appContext;
    private readonly ITokenService _tokenService;

    public AuthController(AppDbContext appContext, ITokenService tokenService)
    {
        _appContext = appContext ?? throw new ArgumentNullException(nameof(appContext));
        _tokenService = tokenService ?? throw new ArgumentNullException(nameof(tokenService));
    }

    [HttpPost, Route("login")]
    public IActionResult Login([FromBody] LoginModel loginModel)
    {
        if (loginModel is null)
        {
            return BadRequest("Invalid client request");
        }

        var user = _appContext.LoginModels.FirstOrDefault(u => 
            (u.UserName == loginModel.UserName) && (u.Password == loginModel.Password));
        if (user is null)
            return Unauthorized();

        var claims = new List<Claim>
        {
            new Claim(ClaimTypes.Name, loginModel.UserName),
            new Claim(ClaimTypes.Role, "Manager")
        };
        var accessToken = _tokenService.GenerateAccessToken(claims);
        var refreshToken = _tokenService.GenerateRefreshToken();

        user.RefreshToken = refreshToken;
        user.RefreshTokenExpiryTime = DateTime.Now.AddDays(7);

        _appContext.SaveChanges();

        return Ok(new AuthenticatedResponse
        {
            Token = accessToken,
            RefreshToken = refreshToken
        });
    }
}