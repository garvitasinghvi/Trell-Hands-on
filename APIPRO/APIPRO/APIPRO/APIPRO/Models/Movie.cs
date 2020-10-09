using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace APIPRO.Models
{
    public class Movie
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string MovieDesc { get; set; }
        public string MovieDirector { get; set; }
        public double MovieDuration { get; set; }
    }
}
