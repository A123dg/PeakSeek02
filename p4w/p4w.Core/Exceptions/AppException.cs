namespace p4w.Core.Exceptions;

public sealed class AppException : Exception
{
    public AppException(string message) : base(message)
    {
    }
}
