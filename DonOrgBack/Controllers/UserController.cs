using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Cors;
using System.Collections.Generic;

namespace DonOrgBack.Controllers;

using DTO;
using Services;

[ApiController]
[Route("user")]
public class UserController : ControllerBase
{
    [HttpPost("login")]
    [EnableCors("DefaultPolicy")]
    public async Task<IActionResult> Login(
        [FromBody]UserData user,
        [FromServices]IUserService service,
        [FromServices]ISecurityService security)
    {
        var loginUser = await service
            .GetByLogin(user.Login);
        
        if (loginUser == null)
            return Unauthorized("Usuário não existe.");
        
        var password = await security.HashPassword(
            user.Password, loginUser.Salt
        );
        var realPassword = loginUser.Senha;
        if (password != realPassword)
            return Unauthorized("Senha incorreta.");
        
        return Ok();
    }

    [HttpPost("register")]
    [EnableCors("DefaultPolicy")]
    public async Task<IActionResult> Create(
        [FromBody]UserData user,
        [FromServices]IUserService service)
    {
        var errors = new List<string>();
        if (user is null || user.Login is null)
            errors.Add("É necessário informar um login.");
        if (user.Login.Length < 5)
            errors.Add("O Login deve conter ao menos 5 caracteres.");

        if (errors.Count > 0)
            return BadRequest(errors);

        await service.Create(user);
        return Ok();
    }

    [HttpDelete]
    [EnableCors("DefaultPolicy")]
    public IActionResult DeleteUser()
    {
        throw new NotImplementedException();
    }

    [HttpGet("image")]
    [EnableCors("DefaultPolicy")]
    public IActionResult GetImage()
    {
        throw new NotImplementedException();
    }

    [HttpPut("image")]
    [EnableCors("DefaultPolicy")]
    public IActionResult AddImage()
    {
        throw new NotImplementedException();
    }

    [HttpDelete("image")]
    [EnableCors("DefaultPolicy")]
    public IActionResult RemoveImage()
    {
        throw new NotImplementedException();
    }
}