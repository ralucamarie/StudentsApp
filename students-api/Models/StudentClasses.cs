using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace students_api.Models;

[Table("StudentClasses")]
    public class StudentClasses
    {        
        public Student? Student { get; set; }
        public int StudentId { get; set; }
        public Classes? Classes { get; set; }
        public int ClassesId { get; set; }                
    }