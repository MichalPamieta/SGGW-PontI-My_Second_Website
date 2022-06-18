using Microsoft.AspNetCore.Mvc;
using Strona_Internetowa_PWI.Models;
using System.Data;
using System.Diagnostics;

namespace Strona_Internetowa_PWI.Controllers
{
    public class HomeController : Controller
    {
        /*
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }
        */
        public IActionResult Index()
        {
            return View();
        }

        private readonly DataTable _dataTable = new();

        [HttpPost]
        public IActionResult CalculatorResult(string inputVal)
        {
            try
            {
                var result = Math.Round(Convert.ToDouble(_dataTable.Compute(inputVal, "")), 8).ToString();

                return Json(new { success = true, result });
            }
            catch (DivideByZeroException)
            {
                return Json(new { success = false, message = "Nie można dzielić przez 0!" });
            }
            catch (Exception)
            {
                return Json(new { success = false, message = "Wprowadzono niepoprawne wyrażenie!" });
            }
        }


        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}