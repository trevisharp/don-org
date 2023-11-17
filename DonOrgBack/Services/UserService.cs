using System.Linq;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace DonOrgBack.Services;

using DTO;
using Model;

public class UserService : IUserService
{
    DonOrgDbContext ctx;
    public UserService(DonOrgDbContext ctx)
        => this.ctx = ctx;

    public async Task Create(UserData data)
    {
        Usuario usuario = new Usuario();
        
        usuario.Nome = data.Login;
        usuario.Senha = data.Password; // ??
        usuario.Salt = "?????";

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