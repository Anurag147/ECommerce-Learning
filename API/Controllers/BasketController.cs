using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Dto;
using API.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace API.Controllers
{
        public class BasketController : BaseApiController
        {
             private readonly ILogger<BasketController> _logger;
            private readonly StoreContext _context;

            public BasketController(StoreContext context, ILogger<BasketController> logger)
            {
                _logger = logger;
                _context = context;
            }

            [HttpGet]
            public async Task<ActionResult<BasketDto>> GetBasket(){
                  var basket = await _context.Baskets
                  .Include(i=>i.Items)
                  .ThenInclude(p=>p.Product)
                  .FirstOrDefaultAsync(x=>x.BuyerId==Request.Cookies["buyerId"]);

                  if(basket==null){return NotFound();}

                  return new BasketDto{
                    Id = basket.Id,
                    BuyerId = basket.BuyerId,
                    Items = basket.Items.Select(item=>new BasketItemDto{
                        ProductId = item.ProductId,
                        Name = item.Product.Name,
                        Price = item.Product.Price,
                        PictureUrl = item.Product.PictureUrl,
                        Type= item.Product.Type,
                        Brand=item.Product.Brand,
                        Quantity=item.Quantity
                    }).ToList()
                  };
            }

            [HttpPost]
            public async Task<ActionResult<Basket>> AddItemToBasket(int productId, int quantity)
            {
                 var basket = await _context.Baskets
                  .Include(i=>i.Items)
                  .ThenInclude(p=>p.Product)
                  .FirstOrDefaultAsync(x=>x.BuyerId==Request.Cookies["buyerId"]);

                  if(basket==null){
                    basket = CreateBasket();
                  }

                  var product = await _context.Products.FindAsync(productId);
                  if(product==null){return NotFound();}

                  basket.AddItem(product,quantity); 

                  var result = await _context.SaveChangesAsync()>0;
            if (result)
            {
                var res = new BasketDto
                {
                    Id = basket.Id,
                    BuyerId = basket.BuyerId,
                    Items = basket.Items.Select(item => new BasketItemDto
                    {
                        ProductId = item.ProductId,
                        Name = item.Product.Name,
                        Price = item.Product.Price,
                        PictureUrl = item.Product.PictureUrl,
                        Type = item.Product.Type,
                        Brand = item.Product.Brand,
                        Quantity = item.Quantity
                    }).ToList()
                };
                return Ok(res);
            }

                  return BadRequest();
                  
            }

            [HttpDelete]
            public async Task<ActionResult> RemoveFromBasket(int productId, int quantity)
            {
                 var basket = await _context.Baskets
                  .Include(i=>i.Items)
                  .ThenInclude(p=>p.Product)
                  .FirstOrDefaultAsync(x=>x.BuyerId==Request.Cookies["buyerId"]);

                  if(basket==null){
                    return NotFound();
                  }

                  basket.RemoveItem(productId,quantity);
                  
                  await _context.SaveChangesAsync();

                  return Ok();
            }

            private Basket CreateBasket()
            {
                var buyerId = Guid.NewGuid().ToString();
                var cookieOptions = new CookieOptions{
                    IsEssential=true,
                    Expires=DateTime.Now.AddDays(30),
                    SameSite=SameSiteMode.None,
                    Secure=true,
                };
                Response.Cookies.Append("buyerId",buyerId,cookieOptions);
                var basket = new Basket{BuyerId=buyerId};
                _context.Baskets.Add(basket);
                return basket;       
            }
        }
}