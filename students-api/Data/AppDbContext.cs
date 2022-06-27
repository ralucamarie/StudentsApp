using Microsoft.EntityFrameworkCore;
 
namespace  students_api.Data;
 
public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
 
    }
    public DbSet<students_api.Data.Entities.Student>? Student { get; set; }
}