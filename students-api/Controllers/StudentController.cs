#nullable disable
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using students_api.Models;
using students_api.Context;


namespace students_api.Controllers;
 
[ApiController]
[Route("[controller]")]
public class StudentController: ControllerBase
{
    private readonly AppDbContext _studentDbContext;
    public StudentController(AppDbContext studentDbContext)
    {
        _studentDbContext = studentDbContext;
    }

	
//get method with filter on name and age
// (Roles = "Manager")
[HttpGet, Authorize]
public async Task<IActionResult> Get(string? name, int? age, int? id)
{
	var query = _studentDbContext.Student.AsQueryable();
	if ( !String.IsNullOrEmpty(name) && !age.HasValue){
		query=query.Where(student=>student.Name.Contains(name));
	}
	if (String.IsNullOrEmpty(name) && age.HasValue){
		query=query.Where(student=>student.Age.Equals(age));
	}
	if (!String.IsNullOrEmpty(name) && age.HasValue){
		query=query.Where(student=>student.Name.Contains(name) && student.Age.Equals(age));
	}

	if(id.HasValue){
		query=query.Where(student=>student.Id == id);
	}
	
	var students =await query.ToListAsync();   

	return Ok(students);
}

[HttpPost]
public async Task<IActionResult> Post(students_api.Models.Student payload)
{
	_studentDbContext.Student.Add(payload);
	await _studentDbContext.SaveChangesAsync();
	return Ok(payload);
}





[HttpPut]
public async Task<IActionResult> Put(students_api.Models.Student payload)
{
	_studentDbContext.Student.Update(payload);
	await _studentDbContext.SaveChangesAsync();
	return Ok(payload);
}

[HttpDelete]
public async Task<IActionResult> Delete(int id)
{
	var studentToDelete = await _studentDbContext.Student.FindAsync(id);
	if (studentToDelete == null)
	{
		return NotFound();
	}
	_studentDbContext.Student.Remove(studentToDelete);
	await _studentDbContext.SaveChangesAsync();
	return Ok();
}

}