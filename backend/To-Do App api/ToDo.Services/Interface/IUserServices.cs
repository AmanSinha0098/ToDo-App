using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ToDo.Services.Interface
{
    public interface IUserServices
    {
        public DTOModels.User Get(string id);
        public List<DTOModels.User> Get();
        public void Add(DTOModels.User user);
    }
}
