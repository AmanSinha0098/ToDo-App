using Models;
using ToDo.Repository.Context;
using ToDo.Repository.Interface;

namespace ToDo.Repository
{
    public class UserRepository :Repository<User>,IUserRepository
    {
        private readonly AppDbContext _context;
        public UserRepository(AppDbContext context) : base(context)
        {
            _context = context;
        }
    }
}
