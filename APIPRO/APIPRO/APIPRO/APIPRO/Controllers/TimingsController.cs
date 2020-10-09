using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using APIPRO.Models;


namespace APIPRO.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TimingsController : ControllerBase
    {
        private readonly TodoContext _context;


        public TimingsController(TodoContext context)
        {
            _context = context;
        }

        // GET: api/Timings
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Timings>>> GetTimings()
        {

            return await _context.Timings.ToListAsync();
        }

        // GET: api/Timings/5
        [HttpGet("{name}")]
        public async Task<ActionResult<Timings>> GetTimings(string name)
        {
            var todoItem = await _context.Timings.FindAsync(name);

            if (todoItem == null)
            {
                return NotFound();
            }

            return todoItem;
        }

        // PUT: api/Timings/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTimings(long id, Timings todoItem)
        {
            if (id != todoItem.Id)
            {
                return BadRequest();
            }

            _context.Entry(todoItem).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TimingsExists(id))
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

        // POST: api/Timings
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Timings>> PostTimings(Timings todoItem)
        {
            _context.Timings.Add(todoItem);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTimings", new { id = todoItem.Id }, todoItem);
        }

        // DELETE: api/Timings/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Timings>> DeleteTimings(int id)
        {
            var todoItem = await _context.Timings.FindAsync(id);
            if (todoItem == null)
            {
                return NotFound();
            }

            _context.Timings.Remove(todoItem);
            await _context.SaveChangesAsync();

            return todoItem;
        }

        private bool TimingsExists(long id)
        {
            return _context.Timings.Any(e => e.Id == id);
        }
    }
}
