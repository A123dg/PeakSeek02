using Microsoft.AspNetCore.Diagnostics;
using p4w.Core.Exceptions;

namespace p4w.Api.Handlers;

public sealed class GlobalExceptionHandler(ILogger<GlobalExceptionHandler> logger) : IExceptionHandler
{
    public async ValueTask<bool> TryHandleAsync(HttpContext httpContext, Exception exception, CancellationToken cancellationToken)
    {
        logger.LogError(exception, "Unhandled exception");

        var status = exception is AppException
            ? StatusCodes.Status400BadRequest
            : StatusCodes.Status500InternalServerError;

        httpContext.Response.StatusCode = status;
        await httpContext.Response.WriteAsJsonAsync(new { message = exception.Message }, cancellationToken);
        return true;
    }
}
