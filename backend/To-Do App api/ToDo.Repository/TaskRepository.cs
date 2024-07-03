using Microsoft.EntityFrameworkCore;
using ToDo.Repository.Context;
using ToDo.Repository.Interface;

namespace ToDo.Repository
{
    public class TaskRepository : Repository<Models.Task>, ITaskRepository

    {
        private readonly AppDbContext _context;
        public TaskRepository(AppDbContext context) : base(context)
        {
            _context = context;
        }

       
        public List<Models.Task> GetActiveTasks(string id)
        {
            return _context.tasks.OrderBy(e => e.Id)
                   .Include(e => e.User)
                   .Where(t => t.IsDeleted == false)
                   .Where(t => t.User_Id == id)
                   .Where(t=>t.CreatedOn.Date == DateTime.Now.Date)
                   .Where(t => t.IsCompleted == false)
                   .ToList();
        }
        public List<Models.Task> GetCompletedTasks(string id)
        {
            return _context.tasks.OrderBy(e => e.Id)
                    .Include(e => e.User)
                    .Where(t => t.IsDeleted == false)
                    .Where(t => t.User_Id == id)
                    .Where(t => t.CompletedOn.HasValue && t.CompletedOn.Value.Date == DateTime.Now.Date)
                    .Where(t => t.IsCompleted == true)
                    .ToList();
        }

        public List<Models.Task> GetTodaysTasks(string id)
        {
            return _context.tasks.OrderBy(e => e.Id)
                    .Include(e => e.User)
                    .Where(t => t.IsDeleted == false)
                    .Where(t => t.User_Id == id)
                    .Where(t => t.CreatedOn.Date == DateTime.Now.Date)
                    .ToList();
        }
        public List<Models.Task> GetAllTasks(string id)
        {
            return _context.tasks.OrderBy(e => e.Id)
                    .Include(e => e.User)
                    .Where(t => t.IsDeleted == false)
                    .Where(t => t.User_Id == id)
                    .ToList();
        }
        public List<Models.Task> GetPendingTasks(string id)
        {
            return _context.tasks
                .Include(e => e.User)
                .Where(t => t.IsDeleted == false)
                .Where(t => t.User_Id == id)
                .Where(t => t.IsCompleted == false)
                .Where(t=>t.CreatedOn.Date < DateTime.Now.Date)
                .ToList();
        }

    }
}
