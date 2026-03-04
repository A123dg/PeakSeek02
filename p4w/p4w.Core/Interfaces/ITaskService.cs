using p4w.Core.Dtos;
using p4w.Core.Paginations;

namespace p4w.Core.Interfaces;

public interface ITaskService
{
    Task<PagedResult<TaskDto>> GetAsync(int pageNumber, int pageSize);
}
