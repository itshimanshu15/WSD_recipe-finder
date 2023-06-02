using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication1.Models
{
    public class Dish
    {
        public int DishId { get; set; }
        public string DishName { get; set; }
        public string Category { get; set; }

        public string Recipe { get; set; }

        public string  PhotoFileName { get; set; }
    }
}
