﻿// CitasController.cs
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProyectoAnalisis.Data;
using ProyectoAnalisis.Model;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

[Route("api/[controller]")]
[ApiController]
public class CitasController : ControllerBase
{
    private readonly AppDbContext _context;

    public CitasController(AppDbContext context)
    {
        _context = context;
    }

    // GET: api/Citas
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Cita>>> GetCitas()
    {
        return await _context.Citas.ToListAsync();
    }

    // GET: api/Citas/5
    [HttpGet("{id}")]
    public async Task<ActionResult<Cita>> GetCita(int id)
    {
        var cita = await _context.Citas.FindAsync(id);

        if (cita == null)
        {
            return NotFound();
        }

        return cita;
    }

    // POST: api/Citas
    [HttpPost]
    public async Task<ActionResult<Cita>> PostCita(Cita cita)
    {
        _context.Citas.Add(cita);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetCita), new { id = cita.Id }, cita);
    }

    // PUT: api/Citas/5
    [HttpPut("{id}")]
    public async Task<IActionResult> PutCita(int id, Cita cita)
    {
        if (id != cita.Id)
        {
            return BadRequest();
        }

        _context.Entry(cita).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!CitaExists(id))
            {
                return NotFound();
            }
            else
            {
                throw;
            }
        }

        return NoContent();
    }

    // DELETE: api/Citas/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteCita(int id)
    {
        var cita = await _context.Citas.FindAsync(id);
        if (cita == null)
        {
            return NotFound();
        }

        _context.Citas.Remove(cita);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private bool CitaExists(int id)
    {
        return _context.Citas.Any(e => e.Id == id);
    }
}

