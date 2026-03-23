using Microsoft.EntityFrameworkCore;
using p4w.Core.Constants.Statuses;
using p4w.Core.Dtos.Comment;
using p4w.Core.Dtos.Location;
using p4w.Core.Dtos.Review;
using p4w.Core.Interfaces.Repositories.LocationRepo;
using p4w.Core.Models;
using p4w.Data.Persistence;

namespace p4w.Data.Repositories.Location;

public class LocationRepository : ILocationRepository
{
    private readonly AppDbContext _context;

    public LocationRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<LocationCardDto>> GetLocationsAsync(string? search, int? type)
    {
        IQueryable<Core.Models.Location> query = _context.Locations
            .Include(x => x.Reviews)
            .Where(x => x.Status == LocationStatuses.Active);

        if (!string.IsNullOrWhiteSpace(search))
        {
            var normalizedSearch = search.Trim();
            query = query.Where(x => x.LocationName.Contains(normalizedSearch) || x.Address.Contains(normalizedSearch));
        }

        if (type.HasValue)
        {
            query = query.Where(x => x.Type == type.Value);
        }

        return await query
            .OrderByDescending(x => x.Reviews.Where(r => r.Status == ReviewStatuses.Active).Any() ? x.Reviews.Where(r => r.Status == ReviewStatuses.Active).Max(r => r.CreatedAt) : DateTime.MinValue)
            .Select(x => new LocationCardDto
            {
                Id = x.Id,
                LocationName = x.LocationName,
                Description = x.Description,
                Address = x.Address,
                AddressLink = x.AddressLink,
                Type = x.Type,
                OpeningHours = x.OpeningHours.HasValue ? x.OpeningHours.Value.ToString(@"hh\:mm\:ss") : null,
                ClosingHours = x.ClosingHours.HasValue ? x.ClosingHours.Value.ToString(@"hh\:mm\:ss") : null,
                AverageRating = x.Reviews.Where(r => r.Status == ReviewStatuses.Active).Any() ? Math.Round(x.Reviews.Where(r => r.Status == ReviewStatuses.Active).Average(r => r.Rating), 1) : 0,
                ReviewCount = x.Reviews.Count(r => r.Status == ReviewStatuses.Active)
            })
            .ToListAsync();
    }

    public async Task<LocationDetailDto?> GetLocationDetailAsync(Guid locationId)
    {
        var location = await _context.Locations
            .Include(x => x.Reviews)
                .ThenInclude(x => x.Comments)
            .Include(x => x.Reviews)
                .ThenInclude(x => x.User)
                    .ThenInclude(x => x.MediaLinks)
                        .ThenInclude(x => x.Media)
            .FirstOrDefaultAsync(x => x.Id == locationId && x.Status == LocationStatuses.Active);

        if (location == null)
        {
            return null;
        }

        return new LocationDetailDto
        {
            Id = location.Id,
            LocationName = location.LocationName,
            Description = location.Description,
            Address = location.Address,
            AddressLink = location.AddressLink,
            Type = location.Type,
            OpeningHours = location.OpeningHours.HasValue ? location.OpeningHours.Value.ToString(@"hh\:mm\:ss") : null,
            ClosingHours = location.ClosingHours.HasValue ? location.ClosingHours.Value.ToString(@"hh\:mm\:ss") : null,
            AverageRating = location.Reviews.Where(x => x.Status == ReviewStatuses.Active).Any() ? Math.Round(location.Reviews.Where(x => x.Status == ReviewStatuses.Active).Average(r => r.Rating), 1) : 0,
            ReviewCount = location.Reviews.Count(x => x.Status == ReviewStatuses.Active),
            RecentReviews = location.Reviews
                .Where(x => x.Status == ReviewStatuses.Active)
                .OrderByDescending(x => x.CreatedAt)
                .Take(5)
                .Select(x => new ReviewDto
                {
                    Id = x.Id,
                    UserId = x.UserId,
                    UserName = x.User.UserName,
                    AvatarUrl = x.User.MediaLinks
                        .Where(m => m.EntityType == "avatar")
                        .OrderBy(m => m.SortOrder)
                        .Select(m => m.Media.Url)
                        .FirstOrDefault() ?? string.Empty,
                    Rating = x.Rating,
                    Content = x.Content,
                    CreatedAt = x.CreatedAt,
                    CommentCount = x.Comments.Count(c => c.Status == CommentStatuses.Active)
                })
                .ToList()
        };
    }

    public async Task<List<ReviewDto>> GetLocationReviewsAsync(Guid locationId)
    {
        return await _context.Reviews
            .Include(x => x.User)
                .ThenInclude(x => x.MediaLinks)
                    .ThenInclude(x => x.Media)
            .Include(x => x.Comments)
            .Where(x => x.LocationId == locationId && x.Status == ReviewStatuses.Active)
            .OrderByDescending(x => x.CreatedAt)
            .Select(x => new ReviewDto
            {
                Id = x.Id,
                UserId = x.UserId,
                UserName = x.User.UserName,
                AvatarUrl = x.User.MediaLinks
                    .Where(m => m.EntityType == "avatar")
                    .OrderBy(m => m.SortOrder)
                    .Select(m => m.Media.Url)
                    .FirstOrDefault() ?? string.Empty,
                Rating = x.Rating,
                Content = x.Content,
                CreatedAt = x.CreatedAt,
                CommentCount = x.Comments.Count(c => c.Status == CommentStatuses.Active)
            })
            .ToListAsync();
    }

    public async Task<List<CommentDto>> GetReviewCommentsAsync(Guid reviewId)
    {
        return await _context.Comments
            .Include(x => x.User)
                .ThenInclude(x => x.MediaLinks)
                    .ThenInclude(x => x.Media)
            .Where(x => x.ReviewId == reviewId && x.Status == CommentStatuses.Active)
            .OrderByDescending(x => x.CreatedAt)
            .Select(x => new CommentDto
            {
                Id = x.Id,
                UserId = x.UserId,
                UserName = x.User.UserName,
                AvatarUrl = x.User.MediaLinks
                    .Where(m => m.EntityType == "avatar")
                    .OrderBy(m => m.SortOrder)
                    .Select(m => m.Media.Url)
                    .FirstOrDefault() ?? string.Empty,
                ParentId = x.ParentId,
                Content = x.Content,
                CreatedAt = x.CreatedAt
            })
            .ToListAsync();
    }

    public async Task<Core.Models.Location?> GetLocationEntityAsync(Guid locationId)
    {
        return await _context.Locations.FirstOrDefaultAsync(x => x.Id == locationId && x.Status == LocationStatuses.Active);
    }

    public async Task<Review?> GetReviewEntityAsync(Guid reviewId)
    {
        return await _context.Reviews
            .Include(x => x.User)
                .ThenInclude(x => x.MediaLinks)
                    .ThenInclude(x => x.Media)
            .Include(x => x.Comments)
            .FirstOrDefaultAsync(x => x.Id == reviewId && x.Status == ReviewStatuses.Active);
    }

    public async Task<Comment?> GetCommentEntityAsync(Guid commentId)
    {
        return await _context.Comments.FirstOrDefaultAsync(x => x.Id == commentId && x.Status == CommentStatuses.Active);
    }

    public async Task<Core.Models.Location?> GetLocationEntityForAdminAsync(Guid locationId)
    {
        return await _context.Locations.FirstOrDefaultAsync(x => x.Id == locationId);
    }

    public async Task<Review?> GetReviewEntityForAdminAsync(Guid reviewId)
    {
        return await _context.Reviews
            .Include(x => x.User)
                .ThenInclude(x => x.MediaLinks)
                    .ThenInclude(x => x.Media)
            .Include(x => x.Comments)
            .Include(x => x.Location)
            .FirstOrDefaultAsync(x => x.Id == reviewId);
    }

    public async Task AddReviewAsync(Review review)
    {
        _context.Reviews.Add(review);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateReviewAsync(Review review)
    {
        _context.Reviews.Update(review);
        await _context.SaveChangesAsync();
    }

    public async Task AddCommentAsync(Comment comment)
    {
        _context.Comments.Add(comment);
        await _context.SaveChangesAsync();
    }

    public async Task<List<AdminLocationDto>> GetAdminLocationsAsync(string? search, int? type, int? status)
    {
        IQueryable<Core.Models.Location> query = _context.Locations;

        if (!string.IsNullOrWhiteSpace(search))
        {
            var normalizedSearch = search.Trim();
            query = query.Where(x => x.LocationName.Contains(normalizedSearch) || x.Address.Contains(normalizedSearch));
        }

        if (type.HasValue)
        {
            query = query.Where(x => x.Type == type.Value);
        }

        if (status.HasValue)
        {
            query = query.Where(x => x.Status == status.Value);
        }

        return await query
            .OrderByDescending(x => x.Id)
            .Select(x => new AdminLocationDto
            {
                Id = x.Id,
                LocationName = x.LocationName,
                Description = x.Description,
                Address = x.Address,
                AddressLink = x.AddressLink,
                Type = x.Type,
                OpeningHours = x.OpeningHours.HasValue ? x.OpeningHours.Value.ToString(@"hh\:mm\:ss") : null,
                ClosingHours = x.ClosingHours.HasValue ? x.ClosingHours.Value.ToString(@"hh\:mm\:ss") : null,
                Status = x.Status,
                StatusName = x.Status == LocationStatuses.Pending
                    ? "pending"
                    : x.Status == LocationStatuses.Approved
                        ? "approved"
                        : x.Status == LocationStatuses.Rejected
                            ? "rejected"
                            : x.Status == LocationStatuses.Active
                                ? "active"
                                : "inactive"
            })
            .ToListAsync();
    }

    public async Task<List<AdminReviewDto>> GetAdminReviewsAsync(string? search, int? status, int? minRating)
    {
        IQueryable<Review> query = _context.Reviews
            .Include(x => x.User)
            .Include(x => x.Location);

        if (!string.IsNullOrWhiteSpace(search))
        {
            var normalizedSearch = search.Trim();
            query = query.Where(x => x.User.UserName.Contains(normalizedSearch) || x.Content.Contains(normalizedSearch) || x.Location.LocationName.Contains(normalizedSearch));
        }

        if (status.HasValue)
        {
            query = query.Where(x => x.Status == status.Value);
        }

        if (minRating.HasValue)
        {
            query = query.Where(x => x.Rating >= minRating.Value);
        }

        return await query
            .OrderByDescending(x => x.CreatedAt)
            .Select(x => new AdminReviewDto
            {
                Id = x.Id,
                UserId = x.UserId,
                UserName = x.User.UserName,
                LocationId = x.LocationId,
                LocationName = x.Location.LocationName,
                Rating = x.Rating,
                Content = x.Content,
                Status = x.Status,
                StatusName = x.Status == ReviewStatuses.Active ? "active" : "inactive",
                CreatedAt = x.CreatedAt
            })
            .ToListAsync();
    }

    public async Task<AdminReviewDto?> GetAdminReviewDetailAsync(Guid reviewId)
    {
        return await _context.Reviews
            .Include(x => x.User)
            .Include(x => x.Location)
            .Where(x => x.Id == reviewId)
            .Select(x => new AdminReviewDto
            {
                Id = x.Id,
                UserId = x.UserId,
                UserName = x.User.UserName,
                LocationId = x.LocationId,
                LocationName = x.Location.LocationName,
                Rating = x.Rating,
                Content = x.Content,
                Status = x.Status,
                StatusName = x.Status == ReviewStatuses.Active ? "active" : "inactive",
                CreatedAt = x.CreatedAt
            })
            .FirstOrDefaultAsync();
    }

    public async Task AddLocationAsync(Core.Models.Location location)
    {
        _context.Locations.Add(location);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateLocationAsync(Core.Models.Location location)
    {
        _context.Locations.Update(location);
        await _context.SaveChangesAsync();
    }

    public async Task<AdminLocationDto?> GetAdminLocationDetailAsync(Guid locationId)
    {
        return await _context.Locations
            .Where(x => x.Id == locationId)
            .Select(x => new AdminLocationDto
            {
                Id = x.Id,
                LocationName = x.LocationName,
                Description = x.Description,
                Address = x.Address,
                AddressLink = x.AddressLink,
                Type = x.Type,
                OpeningHours = x.OpeningHours.HasValue ? x.OpeningHours.Value.ToString(@"hh\:mm\:ss") : null,
                ClosingHours = x.ClosingHours.HasValue ? x.ClosingHours.Value.ToString(@"hh\:mm\:ss") : null,
                Status = x.Status,
                StatusName = x.Status == LocationStatuses.Pending
                    ? "pending"
                    : x.Status == LocationStatuses.Approved
                        ? "approved"
                        : x.Status == LocationStatuses.Rejected
                            ? "rejected"
                            : x.Status == LocationStatuses.Active
                                ? "active"
                                : "inactive"
            })
            .FirstOrDefaultAsync();
    }
}
