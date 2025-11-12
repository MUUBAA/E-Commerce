using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Server.Data.Contract.Users;
using Server.Data.Dto;
using Server.Data.Entities.Users;
using Server.Services;
using Server.Utils;

namespace Server.Controllers.UserController
{
    [Authorize]
    [ApiController]
    public class UserController(IUserService userService, IUserContext userContext) : BaseController
    {
        private readonly IUserService _userService = userService;
        private readonly IUserContext _userContext = userContext;

        [HttpPost]
        [Route("/users/create")]
        public IActionResult CreateUser([FromBody] UserContract request)
        {
            var response = _userService.createUser(request);
            return Ok(new GenericApiResponse<string>(true, response ? "User Created sucessfully" : "Failed to create user"));
        }
        [HttpPut]
        [Route("/users/update")]
        public ActionResult<GenericApiResponse<string>> UpdateUser([FromBody] UserUpdate request)
        {
            var response = _userService.updateUser(request);
            return Ok(new GenericApiResponse<string>(true, response ? "User Updated sucessfully" : "Failed to update user"));
        }
        [HttpGet]
        [Route("/users/getById")]
        public IActionResult GetUser([FromQuery] int id)
        {
            var response = _userService.GetUserById(id);
            return Ok(new GenericApiResponse<User>(true, "success", response));
        }
        [HttpGet]
        [Route("/users/getUserByEmail")]
        public ActionResult<GenericApiResponse<UserDto>> GetUserByEmail([FromQuery] string email)
        {
            var response = _userService.GetUserByEmail(email);
            return Ok(new GenericApiResponse<UserDto>(true, "success", response));
        }

        [HttpPut]
        [Route("/users/address")]
        public IActionResult UpdateAddress([FromBody] UpdateAddressRequest request)
        {
            var ok = _userService.updateUserAddress(request.Address);
            return Ok(new GenericApiResponse<string>(ok, ok ? "Address updated" : "Failed to update address"));
        }
      }
    }
