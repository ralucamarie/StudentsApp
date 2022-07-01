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
public class ClassesController: ControllerBase
{
    private readonly AppDbContext _studentDbContext;
    public ClassesController(AppDbContext studentDbContext)
    {
        _studentDbContext = studentDbContext;
    }

	
[HttpGet, Authorize]
public async Task<IActionResult> Get(string? name)
{
	var query = _studentDbContext.Classes.AsQueryable();
	if ( !String.IsNullOrEmpty(name)){
		query=query.Where(classItem=>classItem.Name.Contains(name));
	}
	
	var classList =await query.ToListAsync();   

	return Ok(classList);
}

[HttpPost]
public async Task<IActionResult> Post(students_api.Models.Classes payload)
{
	_studentDbContext.Classes.Add(payload);
	await _studentDbContext.SaveChangesAsync();
	return Ok(payload);
}





[HttpPut]
public async Task<IActionResult> Put(students_api.Models.Classes payload)
{
	_studentDbContext.Classes.Update(payload);
	await _studentDbContext.SaveChangesAsync();
	return Ok(payload);
}

[HttpDelete]
public async Task<IActionResult> Delete(int id)
{
	var classToDelete = await _studentDbContext.Classes.FindAsync(id);
	if (classToDelete == null)
	{
		return NotFound();
	}
	_studentDbContext.Classes.Remove(classToDelete);
	await _studentDbContext.SaveChangesAsync();
	return Ok();
}

}