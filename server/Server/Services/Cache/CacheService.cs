using Microsoft.Extensions.Caching.Memory;

namespace Server.Services.Cache
{
    public interface ICacheService
    {
        T GetCache<T>(string cacheKey) where T : class;
        T GetOrAddCache<T>(string cacheKey, Func<T> get, CacheSetting cacheSetting = null) where T : class;
        void SetCache<T>(string cacheKey, T item, CacheSetting cacheSetting = null) where T : class;
        void ClearCache(string cacheKey);
    }
    public class CacheService(IMemoryCache memoryCache) : ICacheService
    {
        private readonly IMemoryCache _memoryCache;

        public void ClearCache(string cacheKey)
        {
            _memoryCache.Remove(cacheKey);
        }
        public T GetCache<T>(string cacheKey) where T : class
        {
           if ( _memoryCache.TryGetValue(cacheKey, out T cachedValue))
            {
                 return cachedValue;
            }
            ;
            return null;
        }
        public T GetOrAddCache<T>(string cacheKey, Func<T> get, CacheSetting cacheSetting = null) where T : class
        {
           var cachedValue = GetCache<T>(cacheKey);
            if (cachedValue != null)
            {
                return cachedValue;
            }
            var newValue = get();
            if (newValue != null) 
            { 
                if (cacheSetting != null)
                {
                    var cacheEntryOptions = new MemoryCacheEntryOptions
                    {
                        AbsoluteExpirationRelativeToNow = cacheSetting.AbsoluteExpiration,
                        SlidingExpiration = cacheSetting.SlidingExpiration
                    };
                    _memoryCache.Set(cacheKey, newValue, cacheEntryOptions);
                }
                else
                {
                    SetCache<T>(cacheKey, newValue, CacheSetting.CacheForThreeHourAndExtendByHalfAndHour);
                }

            }
            return newValue;
        }
        public async Task<T> GetOrAddCacheAsync<T>(string cacheKey, Func<Task<T>> getAsync, CacheSetting cacheSetting = null) where T : class
        {
            var cachedValue = GetCache<T>(cacheKey);
            if (cachedValue != null)
            {
                return cachedValue;
            }
            var newValue = await getAsync();
            if (newValue != null)
            {
                if (cacheSetting != null)
                {
                    var cacheEntryOptions = new MemoryCacheEntryOptions
                    {
                        AbsoluteExpirationRelativeToNow = cacheSetting.AbsoluteExpiration,
                        SlidingExpiration = cacheSetting.SlidingExpiration
                    };
                    _memoryCache.Set(cacheKey, newValue, cacheEntryOptions);
                }
                else
                {
                    SetCache<T>(cacheKey, newValue, CacheSetting.CacheForThreeHourAndExtendByHalfAndHour);
                }
            }
            return newValue;
        }
        public void SetCache<T>(string cacheKey, T item, CacheSetting cacheSetting = null) where T : class
        {
            if (cacheSetting != null)
            {
                var cacheEntryOptions = new MemoryCacheEntryOptions
                {
                    AbsoluteExpirationRelativeToNow = cacheSetting.AbsoluteExpiration,
                    SlidingExpiration = cacheSetting.SlidingExpiration
                };
                _memoryCache.Set(cacheKey, item, cacheEntryOptions);
            }
            else
            {
                _memoryCache.Set(cacheKey, item);
            }
        }
    }
}
