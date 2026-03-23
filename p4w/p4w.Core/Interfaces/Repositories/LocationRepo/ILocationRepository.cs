

using p4w.Core.Dtos.Comment;
using p4w.Core.Dtos.Location;
using p4w.Core.Dtos.Review;
using p4w.Core.Models;

namespace p4w.Core.Interfaces.Repositories.LocationRepo;

public interface ILocationRepository
{
    Task<List<LocationCardDto>> GetLocationsAsync(string? search, int? type);
    Task<LocationDetailDto?> GetLocationDetailAsync(Guid locationId);
    Task<List<ReviewDto>> GetLocationReviewsAsync(Guid locationId);
    Task<List<CommentDto>> GetReviewCommentsAsync(Guid reviewId);
    Task<Location?> GetLocationEntityAsync(Guid locationId);
    Task<Review?> GetReviewEntityAsync(Guid reviewId);
    Task<Comment?> GetCommentEntityAsync(Guid commentId);
    Task<Location?> GetLocationEntityForAdminAsync(Guid locationId);
    Task<Review?> GetReviewEntityForAdminAsync(Guid reviewId);
    Task AddReviewAsync(Review review);
    Task UpdateReviewAsync(Review review);
    Task AddCommentAsync(Comment comment);
    Task<List<AdminLocationDto>> GetAdminLocationsAsync(string? search, int? type, int? status);
    Task<List<AdminReviewDto>> GetAdminReviewsAsync(string? search, int? status, int? minRating);
    Task<AdminLocationDto?> GetAdminLocationDetailAsync(Guid locationId);
    Task<AdminReviewDto?> GetAdminReviewDetailAsync(Guid reviewId);
    Task AddLocationAsync(p4w.Core.Models.Location location);
    Task UpdateLocationAsync(p4w.Core.Models.Location location);
}
