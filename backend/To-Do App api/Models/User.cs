using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models
{
    public class User
    {
        [Key]
        public string Id { get; set; }
        public string Username { get; set; } =string.Empty;
        //public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public virtual ICollection<Task>? tasks { get; set; }

    }
}
