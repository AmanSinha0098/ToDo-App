using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using ToDo.DTOModels;
using ToDo.Services.Interface;

namespace ToDo.Controllers
{
    [ApiController]
    [Route("/Task")]
    public class TaskController : ControllerBase
    {
        readonly ITaskServices _taskServices;
        public TaskController(ITaskServices taskServices)
        {
            _taskServices = taskServices;
        }

        [HttpGet("")]
        [Authorize]
        public IActionResult GetFilteredData([FromQuery] string state)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            Console.WriteLine("username : ", userId);
            var tasks = _taskServices.Get(userId, state);
            return Ok(tasks);
        }

        [HttpPost]
        [Authorize]
        public IActionResult Add([FromBody] DTOModels.Task task)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                _taskServices.Add(task, userId);
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
            //return NoContent();
        }

        [HttpPut("{id}")]
        [Authorize]
        public IActionResult Update([FromBody] DTOModels.Task task, string id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                task.User_Id = userId;
                _taskServices.Update(task);
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }


        [HttpDelete("{id}")]
        [Authorize]
        public IActionResult Delete(string id)
        {
            _taskServices.Delete(id);
            return NoContent();
        }

        [HttpGet("kpi")]
        [Authorize]
        
        public IActionResult kpi()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var kpi=_taskServices.taskKpi(userId);
            return Ok(kpi);
        }
    }
}
