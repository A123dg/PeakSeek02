using System;
using System.Collections.Generic;

namespace p4w.Core.Models
{
    public partial class User
    {
        public User()
        {
            Comments = new HashSet<Comment>();
            MediaLinks = new HashSet<MediaLink>();
            Reports = new HashSet<Report>();
            Reviews = new HashSet<Review>();
        }

        public Guid Id { get; set; }
        public Guid RoleId { get; set; }
        public string? GoogleUserId { get; set; }
        public string UserName { get; set; } = null!;
        public string Email { get; set; } = null!;
        public DateTime? DateOfBirth { get; set; }
        public string Password { get; set; } = null!;
        public int Status { get; set; }
        public DateTime CreatedAt { get; set; }

        public virtual Role Role { get; set; } = null!;
        public virtual ICollection<Comment> Comments { get; set; }
        public virtual ICollection<MediaLink> MediaLinks { get; set; }
        public virtual ICollection<Report> Reports { get; set; }
        public virtual ICollection<Review> Reviews { get; set; }
    }
}

