using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace APIPRO.Models
{
    public class TodoContext : DbContext
    {
        public TodoContext(DbContextOptions<TodoContext> options)
           : base(options)
        {
        }

        public DbSet<Movie> Movie { get; set; }
        public DbSet<Timings> Timings { get; set; }
        public DbSet<UserAdmin> UserAdmin { get; set; }
    }
}
