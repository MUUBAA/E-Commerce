namespace Server.Data.Exceptions
{
    public class  InvalidAuthException(string message) : Exception(message) { }
    
    public class UserProfilingException(string message) : Exception(message) { }
}
