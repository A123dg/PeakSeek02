using System;
using System.Collections.Generic;

namespace p4w.Core.Models
{
    public partial class Location
    {
        public Location()
        {
            Reviews = new HashSet<Review>();
        }

        public Guid Id { get; set; }
        public string LocationName { get; set; } = null!;
        public string? Description { get; set; }
        public string Address { get; set; } = null!;
        public TimeSpan? OpeningHours { get; set; }
        public TimeSpan? ClosingHours { get; set; }
        public int Type { get; set; }
        public int Status { get; set; }

        public virtual ICollection<Review> Reviews { get; set; }
    }
}

