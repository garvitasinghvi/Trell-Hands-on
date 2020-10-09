using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace APIPRO.Models
{
    public class Timings
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTimeOffset? StartTime { get; set; }
        public DateTimeOffset? EndTime { get; set; }
        public int Price { get; set; }
        public int TotalTickets { get; set; }
        public int AvailableTickets { get; set; }
    }
}
