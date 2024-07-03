using AutoMapper;

using ToDo.Repository.Interface;
using ToDo.Services.Interface;

namespace ToDo.Services
{
    public class UserServices :IUserServices
    {
        private readonly IUserRepository _userRepo;
        private readonly IMapper _mapper;
        public UserServices(IUserRepository userRepository, IMapper mapper)
        {
            _userRepo = userRepository;
            _mapper = mapper;
        }
        public DTOModels.User Get(string id)
        {
            return _mapper.Map<DTOModels.User>(_userRepo.Get(id));
        }
        public List<DTOModels.User> Get()
        {
            return _mapper.Map<List<DTOModels.User>>(_userRepo.Get());
        }
        public void Add(DTOModels.User user)
        {
            Models.User newUser = _mapper.Map<Models.User>(user);
            newUser.Id = Guid.NewGuid().ToString();
            _userRepo.Insert(newUser);

        }
    }
}
