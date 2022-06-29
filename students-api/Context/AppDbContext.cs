using Microsoft.EntityFrameworkCore;
using students_api.Models;
using System;    
using System.Runtime.InteropServices; 
 
namespace  students_api.Context;
 
public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
 
    }
    public DbSet<students_api.Models.Student>? Student { get; set; }
    public DbSet<LoginModel>? LoginModels { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<LoginModel>().HasData(new LoginModel
        {
            Id = 1,
            UserName = "johndoe",
            Password = "def@123"
        });

        modelBuilder.Entity<Student>()
        .HasData(
            new Student
            {
                Id = Guid.NewGuid().ToString(),
                Name = "John Doe",
                Age = 30,
                Gender = "Male",
            },
            new Student
            {
                Id = Guid.NewGuid().ToString(),
                Name = "Jane Doe",
                Age = 25,
                Gender = "Female"
            }
        );

        
    }
}