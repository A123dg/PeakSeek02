using Microsoft.Extensions.DependencyInjection;
using p4w.Core.Interfaces.Services.Auth;
using p4w.Core.Interfaces.Services.Cloudinary;
using p4w.Service.Services.Auth;
using p4w.Service.Services.CloudinaryService;

namespace p4w.Service;

public static class DependencyInjection
{
    public static IServiceCollection AddServices(this IServiceCollection services)
    {
        services.AddScoped<IAuthService, AuthService>();
        services.AddScoped<IJwtService, JwtService>();
        services.AddScoped<IUserService, UserService>();
        services.AddScoped<ICloudinaryService, CloudinaryService>();

        return services;
    }
}
