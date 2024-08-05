using Microsoft.EntityFrameworkCore;
using BeerTenderAPI.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Add CORS policy
builder.Services.AddCors(options =>
{
    options.AddPolicy(
        "AllowAngularLocalHost",
        builder =>
        {
            builder.WithOrigins("http://localhost:4200").AllowAnyHeader().AllowAnyMethod();
        }
    );
});

// Add the database context
builder.Services.AddDbContext<BeerContext>(
    options => options.UseSqlite(builder.Configuration.GetConnectionString("BeerContext"))
);

var app = builder.Build();

// Use CORS
app.UseCors("AllowAngularLocalHost");

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthorization();

app.MapControllers();

app.Run();
