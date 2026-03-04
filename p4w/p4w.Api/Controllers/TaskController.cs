using Microsoft.AspNetCore.Mvc;
using p4w.Core.Interfaces;

namespace p4w.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public sealed class TaskController(ITaskService taskService) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> Get([FromQuery] int pageNumber = 1, [FromQuery] int pageSize = 10)
    {
        var result = await taskService.GetAsync(pageNumber, pageSize);
        return Ok(result);
    }
}
