using System.ComponentModel.DataAnnotations;
namespace p4w.Api.Dtos.Auth;
public class RegisterRequest {
    [Required]
    [EmailAddress]
    public string Email { get; set; } = null!;
    [Required]
    public string UserName { get; set; } = null!;
    public string DateOfBirth { get; set; } = null!;
}   