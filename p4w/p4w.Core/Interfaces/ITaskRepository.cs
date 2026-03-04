using p4w.Core.Models;

namespace p4w.Core.Interfaces;

public interface ITaskRepository
{
    Task<IReadOnlyList<TaskItem>> GetAsync(int pageNumber, int pageSize);
    Task<int> CountAsync();
}
