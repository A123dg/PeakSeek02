using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using p4w.Api.Configurations;
using p4w.Api.Handlers;
using p4w.Core.Settings;
using System.Text;

LoadDotEnv(Path.Combine(Directory.GetCurrentDirectory(), ".env"));

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddExceptionHandler<GlobalExceptionHandler>();
builder.Services.AddProblemDetails();
builder.Services.AddApplicationContainer(builder.Configuration);
builder.Services.AddSwaggerSetup();

var jwtSection = builder.Configuration.GetSection("Jwt");
var jwtIssuer = jwtSection["Issuer"] ?? throw new InvalidOperationException("JWT issuer is missing.");
var jwtAudience = jwtSection["Audience"] ?? throw new InvalidOperationException("JWT audience is missing.");
var jwtKey = jwtSection["Key"] ?? throw new InvalidOperationException("JWT key is missing.");

builder.Services
    .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey)),
            ValidateIssuer = true,
            ValidIssuer = jwtIssuer,
            ValidateAudience = true,
            ValidAudience = jwtAudience,
            ValidateLifetime = true,
            ClockSkew = TimeSpan.Zero
        };
    });
    builder.Services.Configure<CloudinarySetting>(options =>
{
    options.CloudName = Environment.GetEnvironmentVariable("CLOUDINARY_CLOUD_NAME")!;
    options.ApiKey    = Environment.GetEnvironmentVariable("CLOUDINARY_API_KEY")!;
    options.ApiSecret = Environment.GetEnvironmentVariable("CLOUDINARY_API_SECRET")!;
});



builder.Services.AddAuthorization();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseExceptionHandler();
app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

app.Run();

static void LoadDotEnv(string envFilePath)
{
    if (!File.Exists(envFilePath))
    {
        return;
    }

    foreach (var line in File.ReadAllLines(envFilePath))
    {
        var trimmedLine = line.Trim();
        if (string.IsNullOrWhiteSpace(trimmedLine) || trimmedLine.StartsWith("#"))
        {
            continue;
        }

        var separatorIndex = trimmedLine.IndexOf('=');
        if (separatorIndex <= 0)
        {
            continue;
        }

        var key = trimmedLine[..separatorIndex].Trim();
        var value = trimmedLine[(separatorIndex + 1)..].Trim().Trim('"');

        if (string.IsNullOrWhiteSpace(Environment.GetEnvironmentVariable(key)))
        {
            Environment.SetEnvironmentVariable(key, value);
        }
    }
}
