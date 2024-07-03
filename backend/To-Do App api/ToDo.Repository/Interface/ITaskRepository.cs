using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ToDo.Repository.Interface
{
    public interface ITaskRepository :IRepository<Models.Task>
    {
        public List<Models.Task> GetAllTasks(string id);

        public List<Models.Task> GetActiveTasks(string id);
        public List<Models.Task> GetCompletedTasks(string id);
        public List<Models.Task> GetTodaysTasks(string id);
        public List<Models.Task> GetPendingTasks(string id);
    }
}
