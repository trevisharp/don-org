using System;
using System.Collections.Generic;

namespace DonOrgBack.Model;

public partial class Imagem
{
    public int Id { get; set; }

    public byte[] Foto { get; set; }

    public virtual ICollection<Post> Posts { get; } = new List<Post>();

    public virtual ICollection<Usuario> Usuarios { get; } = new List<Usuario>();
}
