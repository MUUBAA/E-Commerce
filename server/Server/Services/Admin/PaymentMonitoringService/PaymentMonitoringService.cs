using Microsoft.EntityFrameworkCore;
using Server.Data.Dto.Admin;
using Server.Data.Entities.Payments;
using Server.Data.Repositories;

namespace Server.Services.Admin.PaymentMonitoringService
{
    public interface IPaymentMonitoringService
    {
        List<Payments> GetPayments(PaymentMonitoringFilterDto filter);
    }
    public class PaymentMonitoringService : IPaymentMonitoringService
    {
        private readonly Repository _db;
        public PaymentMonitoringService(Repository db)
        {
            _db = db;
        }

        public List<Data.Entities.Payments.Payments> GetPayments(PaymentMonitoringFilterDto filter)
        {
            var query = _db.Payments.AsNoTracking().AsQueryable();
            if (!string.IsNullOrWhiteSpace(filter.Status))
            {
                query = query.Where(p => p.Status.ToLower() == filter.Status.ToLower());
            }
            if (filter.From.HasValue)
            {
                query = query.Where(p => p.CreatedAt >= filter.From.Value);
            }
            if (filter.To.HasValue)
            {
                query = query.Where(p => p.CreatedAt <= filter.To.Value);
            }
            return query.OrderByDescending(p => p.CreatedAt).ToList();
        }
    }
}
