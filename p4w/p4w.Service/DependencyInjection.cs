using Microsoft.Extensions.DependencyInjection;
using p4w.Core.Interfaces;
using p4w.Service.Services;

namespace p4w.Service;

public static class DependencyInjection
{
    public static IServiceCollection AddServices(this IServiceCollection services)
    {
        services.AddScoped<ITaskService, TaskService>();
        return services;
    }
}
