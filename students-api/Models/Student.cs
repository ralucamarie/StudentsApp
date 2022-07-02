using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace students_api.Models;
 
public class Student
{
    public Student() 
    {
        this.Classes = new HashSet<Classes>();
    }
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [Key]
    public int Id { get; set; }
    public string? Name { get; set; }
    public int Age { get; set; }
    public string? Gender { get; set; }
public virtual ICollection<Classes> Classes { get; set; }}