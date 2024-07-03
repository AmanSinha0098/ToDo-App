using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ToDo.Services.Helper
{
    public class MappingProfiles:Profile
    {
        public MappingProfiles() {
            CreateMap<Models.User, DTOModels.User>();
            CreateMap<DTOModels.User, Models.User>();

            CreateMap<Models.Task, DTOModels.Task>();
            CreateMap<DTOModels.Task, Models.Task>();
        }
    }
}
