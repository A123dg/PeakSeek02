using p4w.Core.Dtos.Comment;
using p4w.Core.Dtos.Location;
using p4w.Core.Dtos.Review;

namespace p4w.Core.Interfaces.Services.Location;

public interface ILocationService
{
    Task<List<LocationCardDto>> GetLocationsAsync(string? search, int? type);
    Task<LocationDetailDto> GetLocationDetailAsync(Guid locationId);
    Task<List<ReviewDto>> GetLocationReviewsAsync(Guid locationId);
    Task<List<CommentDto>> GetReviewCommentsAsync(Guid reviewId);
    Task<ReviewDto> CreateReviewAsync(Guid userId, CreateReviewRequest request);
    Task<CommentDto> CreateCommentAsync(Guid userId, CreateCommentRequest request);
    Task<List<AdminLocationDto>> GetAdminLocationsAsync(string? search, int? type, int? status);
    Task<AdminLocationDto> GetAdminLocationDetailAsync(Guid locationId);
    Task<AdminLocationDto> CreateAdminLocationAsync(AdminUpsertLocationRequest request);
    Task<AdminLocationDto> UpdateAdminLocationAsync(Guid locationId, AdminUpsertLocationRequest request);
    Task<AdminLocationDto> HideAdminLocationAsync(Guid locationId);
    Task<List<AdminReviewDto>> GetAdminReviewsAsync(string? search, int? status, int? minRating);
    Task<AdminReviewDto> GetAdminReviewDetailAsync(Guid reviewId);
    Task<AdminReviewDto> UpdateAdminReviewStatusAsync(Guid reviewId, AdminUpdateReviewStatusRequest request);
    Task<AdminReviewDto> HideAdminReviewAsync(Guid reviewId);
}
