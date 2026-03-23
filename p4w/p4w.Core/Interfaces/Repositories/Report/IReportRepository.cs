using p4w.Core.Dtos.Report;
using p4w.Core.Models;

namespace p4w.Core.Interfaces.Repositories.Report;

public interface IReportRepository
{
    Task AddAsync(Core.Models.Report report);
    Task<Core.Models.Report?> GetByIdAsync(Guid reportId);
    Task<List<ReportDto>> GetReportsAsync(string? targetType, int? status, string? search);
    Task<ReportDto?> GetReportDetailAsync(Guid reportId);
    Task UpdateAsync(Core.Models.Report report);
    Task<bool> TargetExistsAsync(string targetType, string targetId);
}
