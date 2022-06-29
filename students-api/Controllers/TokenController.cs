namespace students_api.Controllers;

using students_api.Context;
using students_api.Models;
using students_api.Services;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;



[Route("api/[controller]")]
[ApiController]
public class TokenController : ControllerBase
{
    private readonly AppDbContext _appContext;
    private readonly ITokenService _tokenService;

    public TokenController(AppDbContext appContext, ITokenService tokenService)
    {
        this._appContext = appContext ?? throw new ArgumentNullException(nameof(appContext));
        this._tokenService = tokenService ?? throw new ArgumentNullException(nameof(tokenService));
    }

    [HttpPost]
    [Route("refresh")]
    public IActionResult Refresh(TokenApiModel tokenApiModel)
    {
        if (tokenApiModel is null)
            return BadRequest("Invalid client request");

        string accessToken = tokenApiModel.AccessToken;
        string refreshToken = tokenApiModel.RefreshToken;

        var principal = _tokenService.GetPrincipalFromExpiredToken(accessToken);
        var username = principal.Identity.Name; //this is mapped to the Name claim by default

        var user = _appContext.LoginModels.SingleOrDefault(u => u.UserName == username);

        if (user is null || user.RefreshToken != refreshToken || user.RefreshTokenExpiryTime <= DateTime.Now)
            return BadRequest("Invalid client request");

        var newAccessToken = _tokenService.GenerateAccessToken(principal.Claims);
        var newRefreshToken = _tokenService.GenerateRefreshToken();

        user.RefreshToken = newRefreshToken;
        _appContext.SaveChanges();

        return Ok(new AuthenticatedResponse()
        {
            Token = newAccessToken,
            RefreshToken = newRefreshToken
        });
    }

    [HttpPost, Authorize]
    [Route("revoke")]
    public IActionResult Revoke()
    {
        var username = User.Identity.Name;

        var user = _appContext.LoginModels.SingleOrDefault(u => u.UserName == username);
        if (user == null) return BadRequest();

        user.RefreshToken = null;

        _appContext.SaveChanges();

        return NoContent();
    }
}