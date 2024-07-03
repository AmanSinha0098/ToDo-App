using Microsoft.EntityFrameworkCore;
using ToDo.Repository.Context;
using ToDo.Repository.Interface;

namespace ToDo.Repository
{
    public class Repository<T>: IRepository<T> where T : class
    {
        private readonly AppDbContext _context;

        public Repository(AppDbContext context)
        {
            _context = context;
        }
        public bool Delete(string id)
        {
            var T = _context.tasks.Find(id);

            if (T != null)
            {
                T.IsDeleted = true;
                T.ModifiedOn = DateTime.Now;
                _context.SaveChanges();
                return true;
            }

            return false;
        }

        public List<T> Get()
        {
            return _context.Set<T>().ToList();
        }

        public T Get(string id)
        {
            return _context.Set<T>().Find(id);
        }

        public void Insert(T data)
        {
            _context.Set<T>().Add(data);
            _context.SaveChanges();
        }

        public void Update(T data)
        {
            _context.Entry(data).State = EntityState.Modified;
            _context.SaveChanges();
        }
    }
}
