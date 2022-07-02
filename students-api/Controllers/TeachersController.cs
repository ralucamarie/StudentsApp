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
public class TeachersController: ControllerBase
{
    private readonly AppDbContext _studentDbContext;
    public TeachersController(AppDbContext studentDbContext)
    {
        _studentDbContext = studentDbContext;
    }

	
[HttpGet, Authorize]
public async Task<IActionResult> Get(int? id)
{
	var query = _studentDbContext.Teachers.Include(c => c.Classes).AsQueryable();
	if ( id.HasValue){
		query=query.Where(teacherItem=>teacherItem.Id==id);
	}
	
	var teachers =await query.ToListAsync();   

	return Ok(teachers);
}

[HttpPost]
public async Task<IActionResult> Post(students_api.Models.Teachers payload)
{
	_studentDbContext.Teachers.Add(payload);
	await _studentDbContext.SaveChangesAsync();
	return Ok(payload);
}





[HttpPut]
public async Task<IActionResult> Put(students_api.Models.Teachers payload)
{
	_studentDbContext.Teachers.Update(payload);
	await _studentDbContext.SaveChangesAsync();
	return Ok(payload);
}

[HttpDelete]
public async Task<IActionResult> Delete(int id)
{
	var teacherToDelete = await _studentDbContext.Teachers.FindAsync(id);
	if (teacherToDelete == null)
	{
		return NotFound();
	}
	_studentDbContext.Teachers.Remove(teacherToDelete);
	await _studentDbContext.SaveChangesAsync();
	return Ok();
}

}