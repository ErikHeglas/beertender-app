using Microsoft.EntityFrameworkCore;
using BeerTenderAPI.Models;

namespace BeerTenderAPI.Data
{
    public class BeerContext :DbContext
    {
        public BeerContext(DbContextOptions<BeerContext> options)
            : base(options)
        {
        }

        public DbSet<Beer> Beers { get; set; }
    }
}
