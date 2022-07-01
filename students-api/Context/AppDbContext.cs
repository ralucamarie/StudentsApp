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
    public DbSet<Classes>? Classes { get; set; }

    public DbSet<Teachers>? Teachers { get; set; }

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
                Id = 10000,
                Name = "John Doe",
                Age = 30,
                Gender = "Male",
            },
            new Student
            {
                Id = 10001,
                Name = "Jane Doe",
                Age = 25,
                Gender = "Female"
            }
        );

        modelBuilder.Entity<Classes>()
        .HasData(
            new Classes
            {
                Id = 10000,
                Name = "Introducere in zbor",
                Credits = 3,
                
            },
            new Classes
            {
                Id = 10001,
                Name = "Arta pescuitului de fluturi",
                Credits = 5,
            },
            new Classes
            {
                Id = 10002,
                Name = "Curs avansat de teoria miscarii",
                Credits = 5,
            }
        );

        modelBuilder.Entity<Teachers>()
        .HasData(
            new Teachers
            {
                Id = 10000,
                Name = "Doctorul Who",
                Title = "Doctor",
                
            },
            new Teachers
            {
                Id = 10001,
                Name = "Mihai Costea",
                Title = "Assistent",
            },
            new Teachers
            {
                Id = 10002,
                Name = "Lavinia Cretu",
                Title = "Proffessor",
            }
        );



        
    }
}