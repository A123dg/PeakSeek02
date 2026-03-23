namespace p4w.Core.Dtos.User;

public class UserProfileDto
{
    public string Email { get; set; } = null!;
    public string UserName { get; set; } = null!;
    public DateTime? DateOfBirth { get; set; }
    public string MediaLinkUrl { get; set; } = string.Empty;
    public RecentLocationDto? RecentLocation { get; set; }
}
