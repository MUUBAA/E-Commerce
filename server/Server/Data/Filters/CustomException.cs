using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Server.Data.Exceptions;
using Server.Utils;
using static Server.Data.Exceptions.DataExceptions;

namespace Server.Data.Filters
{
    public class CustomException : IExceptionFilter
    {
        public void OnException(ExceptionContext context)
        {
            if (context.Exception is NotFoundException)
            {
                var notFoundException = context.Exception as NotFoundException;
                var response = new GenericApiResponse<Exception>(false, notFoundException.Message);

                context.Result = new ObjectResult(response)
                {
                    StatusCode = 404
                };
            }
            else if (context.Exception is InvalidAuthException)
            {
                var invalidAuthException = context.Exception as InvalidAuthException;
                var response = new GenericApiResponse<Exception>(false, invalidAuthException.Message);
                context.Result = new ObjectResult(response)
                {
                    StatusCode = 401
                };
            }
            else
            {
                var response = new GenericApiResponse<Exception>(false, context.Exception.Message);
                context.Result = new ObjectResult(response)
                {
                    StatusCode = 400
                };
            }

        }
    }
}
