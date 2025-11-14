using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Server.Data.Contract.CartItems;
using Server.Data.Dto;
using Server.Data.Entities.CartItems;
using Server.Services.CartServices;
using Server.Utils;

namespace Server.Controllers.CartController
{
    [Authorize]
    [ApiController]
    public class CartController(ICartServices cartServices) : BaseController
    {
        [HttpPost]
        [Route("cart/add")]
        public ActionResult <GenericApiResponse<string>> AddToCart(CartItemAdd contract)
        {
            cartServices.AddToCart(contract);
            return Ok(new GenericApiResponse<string>(true, "Item added to cart successfully", null));
        }

        [HttpGet]
        [Route("cart/get-by-id")]
        public ActionResult<GenericApiResponse<CartItems>> GetCartItemById(int id)
        {
            var item = cartServices.GetCartItem(id);
            return Ok(new GenericApiResponse<CartItems>(true, "Cart item fetched successfully", item));
        }

        [HttpPost]
        [Route("cart/get-all")]
        public ActionResult<GenericApiResponse<PaginationResponse<CartItemDto>>> GetCartItems(CartItemContract contract)
        {
            var items = cartServices.GetCartItems(contract);
            return Ok(new GenericApiResponse<PaginationResponse<CartItemDto>>(true, "Cart items fetched successfully", items));
        }

        [HttpDelete]
        [Route("cart/remove")]
        public ActionResult<GenericApiResponse<string>> RemoveFromCart(int id)
        {
            cartServices.RemoveFromCart(id);
            return Ok(new GenericApiResponse<string>(true, "Item removed from cart successfully", null));
        }
    }
}
