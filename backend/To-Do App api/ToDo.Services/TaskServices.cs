using AutoMapper;
using ToDo.DTOModels;
using ToDo.Repository.Interface;
using ToDo.Services.Interface;

namespace ToDo.Services
{
    public class TaskServices : ITaskServices
    {


        ITaskRepository _taskRepo;
        IMapper mapper;
        public TaskServices(ITaskRepository taskRepo, IMapper mapper)
        {
            this._taskRepo = taskRepo;
            this.mapper = mapper;
        }

        public void Add(DTOModels.Task task, string userId)
        {
            Models.Task newTask = mapper.Map<Models.Task>(task);
            newTask.User_Id = userId;
            newTask.ModifiedOn = DateTime.Now;
            newTask.CreatedOn = DateTime.Now;
            _taskRepo.Insert(newTask);

        }
        public void Delete(string id)
        {
            _taskRepo.Delete(id);
        }

        public DTOModels.Task Get(string id)
        {
            return mapper.Map<DTOModels.Task>(_taskRepo.Get().FirstOrDefault(e => e.Id == id));
        }

        public List<DTOModels.Task> Get(string userId, string state)
        {
            if (state.ToLower() == "all")
            {
                return mapper.Map<List<DTOModels.Task>>(_taskRepo.GetTodaysTasks(userId));
            }
            else if (state.ToLower() == "active")
            {
                return mapper.Map<List<DTOModels.Task>>(_taskRepo.GetActiveTasks(userId));
            }
            else if(state.ToLower() == "completed")
            {
                return mapper.Map<List<DTOModels.Task>>(_taskRepo.GetCompletedTasks(userId));
            }
            else
            {
                return mapper.Map<List<DTOModels.Task>>(_taskRepo.GetPendingTasks(userId));
            }

        }

        public Kpi taskKpi(string userId)
        {
            List<Models.Task> tasks = _taskRepo.GetAllTasks(userId);
            int totalTasks = tasks.Count;
            int completedTasks = tasks.Count(t => t.IsCompleted);
            int activeTasks = totalTasks - completedTasks;
            double completedPercentage = Math.Ceiling((double)completedTasks / totalTasks * 100);
            double activePercentage = Math.Floor((double)activeTasks / totalTasks * 100);
            Kpi kpi = new Kpi();
            kpi.Active = (int)activePercentage;
            kpi.Completed = (int)completedPercentage;
            return kpi;
        }

        public void Update(DTOModels.Task task)
        {
            Models.Task newTask = mapper.Map<Models.Task>(task);
            if(newTask.IsCompleted==true)
            {
                newTask.CompletedOn= DateTime.Now;
            }
            else
            {
                newTask.CompletedOn = null;
            }
            newTask.ModifiedOn = DateTime.Now;
            _taskRepo.Update(newTask);
        }

    }
}
