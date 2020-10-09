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
    public class MovieController : ControllerBase
    {
        private readonly TodoContext _context;
        

        public MovieController(TodoContext context)
        {
            _context = context;
        }

        // GET: api/Movie
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Movie>>> GetMovie()
        {
    
            return await _context.Movie.ToListAsync();
        }

        // GET: api/Movie/5
        [HttpGet("{name}")]
        public async Task<ActionResult<Movie>> GetMovie(string name)
        {
            var todoItem = await _context.Movie.FindAsync(name);

            if (todoItem == null)
            {
                return NotFound();
            }

            return todoItem;
        }

        // PUT: api/Movie/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMovie(long id, Movie todoItem)
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
                if (!MovieExists(id))
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

        // POST: api/Movie
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Movie>> PostMovie(Movie todoItem)
        {
            _context.Movie.Add(todoItem);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetMovie", new { id = todoItem.Id }, todoItem);
        }

        // DELETE: api/Movie/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Movie>> DeleteMovie(int id)
        {
            var todoItem = await _context.Movie.FindAsync(id);
            if (todoItem == null)
            {
                return NotFound();
            }

            _context.Movie.Remove(todoItem);
            await _context.SaveChangesAsync();

            return todoItem;
        }

        private bool MovieExists(long id)
        {
            return _context.Movie.Any(e => e.Id == id);
        }
    }
}
