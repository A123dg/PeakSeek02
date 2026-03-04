using p4w.Core.Dtos;
using p4w.Core.Interfaces;
using p4w.Core.Paginations;

namespace p4w.Service.Services;

public sealed class TaskService(ITaskRepository repository) : ITaskService
{
    public async Task<PagedResult<TaskDto>> GetAsync(int pageNumber, int pageSize)
    {
        var items = await repository.GetAsync(pageNumber, pageSize);
        var totalCount = await repository.CountAsync();

        return new PagedResult<TaskDto>
        {
            Items = items
                .Select(x => new TaskDto
                {
                    Id = x.Id,
                    Title = x.Title,
                    IsCompleted = x.IsCompleted
                })
                .ToList(),
            TotalCount = totalCount,
            PageNumber = pageNumber,
            PageSize = pageSize
        };
    }
}
