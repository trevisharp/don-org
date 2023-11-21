using System.Linq;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace DonOrgBack.Services;

using DTO;
using Model;

public class UserService : IUserService
{
    DonOrgDbContext ctx;
    ISecurityService security;
    public UserService(DonOrgDbContext ctx, ISecurityService security)
    {
        this.ctx = ctx;
        this.security = security;
    }

    public async Task Create(UserData data)
    {
        Usuario usuario = new Usuario();
        var salt = await security.GenerateSalt();

        usuario.Nome = data.Login;
        usuario.Senha = await security.HashPassword(
            data.Password, salt
        );
        usuario.Salt = salt;

        this.ctx.Add(usuario);
        await this.ctx.SaveChangesAsync();
    }

    public async Task<Usuario> GetByLogin(string login)
    {
        var query =
            from u in this.ctx.Usuarios
            where u.Nome == login
            select u;
        
        return await query.FirstOrDefaultAsync();
    }
}