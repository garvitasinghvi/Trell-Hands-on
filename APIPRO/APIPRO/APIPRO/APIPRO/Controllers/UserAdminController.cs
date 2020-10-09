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
    public class UserAdminController : ControllerBase
    {
        private readonly TodoContext _context;


        public UserAdminController(TodoContext context)
        {
            _context = context;
        }

        // GET: api/UserAdmin
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserAdmin>>> GetUserAdmin()
        {

            return await _context.UserAdmin.ToListAsync();
        }

        // GET: api/UserAdmin/5
        [HttpGet("{name}")]
        public async Task<ActionResult<UserAdmin>> GetUserAdmin(string name)
        {
            var todoItem = await _context.UserAdmin.FindAsync(name);

            if (todoItem == null)
            {
                return NotFound();
            }

            return todoItem;
        }

        // PUT: api/UserAdmin/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUserAdmin(long id, UserAdmin todoItem)
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
                if (!UserAdminExists(id))
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

        // POST: api/UserAdmin
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<UserAdmin>> PostUserAdmin(UserAdmin todoItem)
        {
            _context.UserAdmin.Add(todoItem);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUserAdmin", new { id = todoItem.Id }, todoItem);
        }

        // DELETE: api/UserAdmin/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<UserAdmin>> DeleteUserAdmin(int id)
        {
            var todoItem = await _context.UserAdmin.FindAsync(id);
            if (todoItem == null)
            {
                return NotFound();
            }

            _context.UserAdmin.Remove(todoItem);
            await _context.SaveChangesAsync();

            return todoItem;
        }

        private bool UserAdminExists(long id)
        {
            return _context.UserAdmin.Any(e => e.Id == id);
        }
    }
}
