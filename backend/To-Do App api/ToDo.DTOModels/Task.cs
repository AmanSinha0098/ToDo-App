using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ToDo.DTOModels
{
    public class Task
    {
        public string? Id { get; set; } = null;
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public bool IsCompleted { get; set; } = false;
        public string? User_Id { get; set; } = string.Empty;
        public DateTime? CreatedOn { get; set; }
    }
}
