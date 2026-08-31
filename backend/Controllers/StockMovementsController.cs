using Microsoft.AspNetCore.Mvc;
using StockControl.Api.Models;
using StockControl.Api.Services;

namespace StockControl.Api.Controllers;

[ApiController]
[Route("api/stock-movements")]
public class StockMovementsController : ControllerBase
{
    private readonly StockService _stockService;

    public StockMovementsController(StockService stockService)
    {
        _stockService = stockService;
    }

    [HttpPost]
    public async Task<ActionResult<StockMovementDto>> Create(StockMovementRequest request)
    {
        var (movement, error) = await _stockService.RegisterMovementAsync(request);
        if (error is not null || movement is null)
        {
            return BadRequest(new ApiError(error ?? "No se pudo registrar el movimiento."));
        }

        var newStock = movement.Product?.CurrentStock ?? 0;
        return CreatedAtAction(nameof(Create), new { id = movement.Id }, new StockMovementDto(
            movement.Id,
            movement.ProductId,
            movement.Type,
            movement.Quantity,
            movement.Date,
            movement.Description,
            newStock));
    }
}
