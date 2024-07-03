using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ToDo.DTOModels;

namespace ToDo.Services.Interface
{
    public interface ITaskServices
    {
        public DTOModels.Task Get(string id);
        public List<DTOModels.Task> Get(string UserId, string state);
        //public List<DTOModels.Task> GetByUser_Id(string id);
        public void Add(DTOModels.Task employee,string userId);
        public void Delete(string id);
        public void Update(DTOModels.Task task);

        public Kpi taskKpi(string userId);

    }
}
