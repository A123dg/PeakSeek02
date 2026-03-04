using p4w.Core.Interfaces;
using p4w.Core.Models;

namespace p4w.Data.Repositories;

public sealed class InMemoryTaskRepository : ITaskRepository
{
    private readonly List<TaskItem> _items =
    [
        new() { Id = Guid.NewGuid(), Title = "Create API layer", IsCompleted = true },
        new() { Id = Guid.NewGuid(), Title = "Create Core layer", IsCompleted = true },
        new() { Id = Guid.NewGuid(), Title = "Create Data layer", IsCompleted = true },
        new() { Id = Guid.NewGuid(), Title = "Create Service layer", IsCompleted = false }
    ];

    public Task<IReadOnlyList<TaskItem>> GetAsync(int pageNumber, int pageSize)
    {
        var items = _items
            .Skip((pageNumber - 1) * pageSize)
            .Take(pageSize)
            .ToList();

        return Task.FromResult<IReadOnlyList<TaskItem>>(items);
    }

    public Task<int> CountAsync() => Task.FromResult(_items.Count);
}
