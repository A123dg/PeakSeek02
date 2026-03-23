using p4w.Core.Dtos.Report;

namespace p4w.Core.Interfaces.Services.Report;

public interface IReportService
{
    Task<ReportDto> CreateReportAsync(Guid userId, CreateReportRequest request);
    Task<List<ReportDto>> GetReportsAsync(string? targetType, int? status, string? search);
    Task<ReportDto> GetReportDetailAsync(Guid reportId);
    Task<ReportDto> UpdateReportStatusAsync(Guid reportId, UpdateReportStatusRequest request);
}
