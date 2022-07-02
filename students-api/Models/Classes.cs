using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace students_api.Models;
 
public class Classes
{
    public Classes()
    {
        this.Students = new HashSet<Student>();
    }
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [Key]
    public int Id { get; set; }
    public string? Name { get; set; }
    public int? Credits { get; set; }
     public virtual ICollection<Student> Students { get; set; }

}