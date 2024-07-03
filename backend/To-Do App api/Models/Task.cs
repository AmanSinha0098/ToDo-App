using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models
{
    public class Task
    {
        [Key]
        //public string Id { get; set; } = Guid.NewGuid().ToString();
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public string Id { get; set; } = string.Empty;

        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public bool IsCompleted { get; set; } = false;
        public string User_Id { get; set; } = string.Empty;         
        public virtual User User {  get; set; }
        public DateTime CreatedOn { get; set; }
        public DateTime? CompletedOn { get; set; } = null;
        public DateTime ModifiedOn { get; set; }
        public bool IsDeleted { get; set; } = false;


    }
}
